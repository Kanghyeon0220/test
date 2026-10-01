/* ==========================================================================
   Lemonade For All — 공통 스크립트
   1) 공통 헤더/푸터 삽입   2) 모바일 메뉴   3) 한/영 전환
   4) data.js 내용 렌더링 (소식·사진·정산·팀·후원 정보)   5) 사진 라이트박스
   ========================================================================== */
(function () {
  'use strict';

  var D = window.LFA_DATA || {};
  var EN = window.LFA_EN || {};

  /* ---------- 언어 ---------- */
  function readLang() {
    try { return localStorage.getItem('siteLang') === 'en' ? 'en' : 'ko'; } catch (e) { return 'ko'; }
  }
  function saveLang(v) {
    try { localStorage.setItem('siteLang', v); } catch (e) { /* 저장 불가 환경은 무시 */ }
  }
  var lang = readLang();

  // {ko, en} 객체 → 현재 언어 문자열
  function t(o) {
    if (o == null) return '';
    if (typeof o === 'string') return o;
    return o[lang] != null ? o[lang] : (o.ko || '');
  }

  // 스크립트가 만드는 UI 문구
  var UI = {
    skip: { ko: '본문 바로가기', en: 'Skip to content' },
    navAbout: { ko: '단체 소개', en: 'About' },
    navActivity: { ko: '활동', en: 'Our Work' },
    navTrans: { ko: '투명성', en: 'Transparency' },
    navDonate: { ko: '후원하기', en: 'Donate' },
    mainNav: { ko: '주 메뉴', en: 'Main menu' },
    menuOpen: { ko: '메뉴 열기', en: 'Open menu' },
    menuClose: { ko: '메뉴 닫기', en: 'Close menu' },
    toEn: { ko: 'Switch to English', en: 'Switch to English' },
    toKo: { ko: '한국어로 보기', en: '한국어로 보기' },
    home: { ko: 'Lemonade For All 홈', en: 'Lemonade For All home' },
    footerDesc: { ko: '모든 기부금의 흐름을 공개하는 청소년 주도 비영리 단체', en: 'A youth-led non-profit that shows where every donation goes' },
    footerNav: { ko: '하단 메뉴', en: 'Footer menu' },
    more: { ko: '더 보기', en: 'Read more' },
    less: { ko: '접기', en: 'Show less' },
    all: { ko: '전체', en: 'All' },
    cambodia: { ko: '캄보디아', en: 'Cambodia' },
    campaign: { ko: '캠페인', en: 'Campaign' },
    team: { ko: '팀 활동', en: 'Team' },
    pending: { ko: '정산 중', en: 'Pending' },
    statusPending: { ko: '정산 내역 정리 중', en: 'Accounts being finalized' },
    statusDone: { ko: '정산 완료', en: 'Accounts finalized' },
    item: { ko: '항목', en: 'Item' },
    qty: { ko: '수량', en: 'Quantity' },
    amount: { ko: '금액', en: 'Amount' },
    proof: { ko: '증빙', en: 'Proof' },
    receipt: { ko: '영수증', en: 'Receipt' },
    total: { ko: '합계', en: 'Total' },
    raised: { ko: '총 모금액', en: 'Total raised' },
    donors: { ko: '후원자', en: 'Donors' },
    people: { ko: '명', en: '' },
    recipient: { ko: '전달처', en: 'Recipient' },
    partner: { ko: '협력 기관', en: 'Partner' },
    date: { ko: '전달일', en: 'Date' },
    carry: { ko: '다음 사업 이월', en: 'Carried over' },
    pendingNote: {
      ko: '금액이 확정되는 대로 영수증과 함께 이 표에 공개합니다.',
      en: 'Amounts will be published here with receipts as soon as they are finalized.'
    },
    close: { ko: '닫기', en: 'Close' },
    prev: { ko: '이전 사진', en: 'Previous photo' },
    next: { ko: '다음 사진', en: 'Next photo' },
    copy: { ko: '복사', en: 'Copy' },
    copied: { ko: '복사됨', en: 'Copied' },
    copyEmail: { ko: '이메일 주소 복사', en: 'Copy email address' },
    mailDonate: { ko: '계좌 안내 요청하기', en: 'Request account details' },
    accountByMail: {
      ko: '계좌 정보는 이메일로 안내해 드립니다. 아래 버튼을 누르면 문의 메일이 바로 작성됩니다.',
      en: 'We send our bank details by email. The button below opens a pre-written request.'
    },
    bank: { ko: '은행', en: 'Bank' },
    holder: { ko: '예금주', en: 'Account holder' },
    accNo: { ko: '계좌번호', en: 'Account no.' },
    subjMoney: { ko: '[후원 문의] 계좌 안내 요청', en: '[Donation] Bank details request' },
    subjGoods: { ko: '[물품 후원 문의]', en: '[Goods donation inquiry]' },
    subjVolunteer: { ko: '[봉사 신청]', en: '[Volunteer application]' },
    bodyVolunteer: {
      ko: '이름:\n학교/소속:\n연락처:\n참여하고 싶은 활동 (캠페인 기획 / 콘텐츠 제작 / 현장 봉사):\n',
      en: 'Name:\nSchool/Organization:\nContact:\nWhat would you like to help with (campaign planning / content / field work):\n'
    }
  };
  function ui(k) { return t(UI[k]); }

  function email() { return (D.org && D.org.emailUser) + '@' + (D.org && D.org.emailDomain); }
  function mailto(subjectKey, bodyKey) {
    var q = '?subject=' + encodeURIComponent(ui(subjectKey));
    if (bodyKey) q += '&body=' + encodeURIComponent(ui(bodyKey));
    return 'mailto:' + email() + q;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtDate(d) {
    if (!d) return '';
    var p = d.split('-');
    if (lang === 'en') {
      var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+p[1] - 1];
      return p[2] ? m + ' ' + (+p[2]) + ', ' + p[0] : m + ' ' + p[0];
    }
    return p.join('.');
  }
  function won(n) {
    if (n == null) return '';
    return lang === 'en' ? '₩' + n.toLocaleString('en-US') : n.toLocaleString('ko-KR') + '원';
  }

  /* ---------- 공통 헤더 / 푸터 ---------- */
  var page = document.body.getAttribute('data-page') || '';
  var NAV = [
    { key: 'navAbout', href: 'about.html', page: 'about' },
    { key: 'navActivity', href: 'activity.html', page: 'activity' },
    { key: 'navTrans', href: 'transparency.html', page: 'transparency' },
    { key: 'navDonate', href: 'donate.html', page: 'donate', cta: true }
  ];

  function renderHeader() {
    var h = document.getElementById('siteHeader');
    if (!h) return;
    var open = h.classList.contains('nav-open');
    var links = NAV.map(function (n) {
      var cur = n.page === page ? ' aria-current="page"' : '';
      return '<li><a href="' + n.href + '"' + cur + (n.cta ? ' class="nav-cta"' : '') + '>' + ui(n.key) + '</a></li>';
    }).join('');
    h.innerHTML =
      '<a class="skip-link" href="#main">' + ui('skip') + '</a>' +
      '<div class="header-inner">' +
        '<a href="index.html" class="logo"><img src="images/logo-dark.png" alt="' + ui('home') + '" width="480" height="152"></a>' +
        '<nav class="main-nav" aria-label="' + ui('mainNav') + '"><ul id="navList">' + links + '</ul></nav>' +
        '<div class="header-actions">' +
          '<button type="button" class="lang-btn" lang="' + (lang === 'ko' ? 'en' : 'ko') + '" aria-label="' + (lang === 'ko' ? ui('toEn') : ui('toKo')) + '">' + (lang === 'ko' ? 'EN' : 'KO') + '</button>' +
          '<button type="button" class="menu-btn" aria-controls="navList" aria-expanded="' + open + '" aria-label="' + (open ? ui('menuClose') : ui('menuOpen')) + '"><span aria-hidden="true"></span></button>' +
        '</div>' +
      '</div>';
    h.querySelector('.lang-btn').addEventListener('click', function () {
      lang = lang === 'ko' ? 'en' : 'ko';
      saveLang(lang);
      renderAll();
    });
    h.querySelector('.menu-btn').addEventListener('click', function () { setMenu(!h.classList.contains('nav-open')); });
    h.querySelectorAll('#navList a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  }

  function setMenu(open) {
    var h = document.getElementById('siteHeader');
    if (!h) return;
    h.classList.toggle('nav-open', open);
    var b = h.querySelector('.menu-btn');
    b.setAttribute('aria-expanded', open);
    b.setAttribute('aria-label', open ? ui('menuClose') : ui('menuOpen'));
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', function (e) {
    var h = document.getElementById('siteHeader');
    if (h && h.classList.contains('nav-open') && !h.contains(e.target)) setMenu(false);
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 860) setMenu(false); });

  function renderFooter() {
    var f = document.getElementById('siteFooter');
    if (!f) return;
    var social = (D.org.social || []).map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>';
    }).join('');
    var year = new Date().getFullYear();
    var since = (D.org.founded || '').slice(0, 4);
    f.innerHTML =
      '<div class="footer-inner">' +
        '<a href="index.html" class="footer-logo"><img src="images/logo-light.png" alt="' + ui('home') + '" width="480" height="152" loading="lazy"></a>' +
        '<p class="footer-desc">' + ui('footerDesc') + '</p>' +
        '<p class="footer-contact"><a href="mailto:' + email() + '">' + email() + '</a></p>' +
        (social ? '<p class="footer-social">' + social + '</p>' : '') +
        '<nav aria-label="' + ui('footerNav') + '"><ul class="footer-links">' +
          NAV.map(function (n) { return '<li><a href="' + n.href + '">' + ui(n.key) + '</a></li>'; }).join('') +
        '</ul></nav>' +
        (D.org.legalStatus ? '<p class="footer-legal">' + esc(t(D.org.legalStatus)) + '</p>' : '') +
        '<p class="footer-copy">© ' + (since && since < year ? since + '–' + year : year) + ' Lemonade For All</p>' +
      '</div>';
  }

  /* ---------- 정적 문구 번역 (HTML 안의 한국어가 원문) ---------- */
  function applyStatic() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (el.dataset.ko === undefined) el.dataset.ko = el.innerHTML;
      var v = EN[el.getAttribute('data-i18n')];
      el.innerHTML = lang === 'en' && v != null ? v : el.dataset.ko;
    });
    // 속성 번역: data-i18n-attr="content:key; aria-label:key2"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); if (p.length < 2) return;
        var attr = p[0].trim(), key = p[1].trim(), store = 'ko' + attr.replace(/[^a-z]/gi, '');
        if (el.dataset[store] === undefined) el.dataset[store] = el.getAttribute(attr) || '';
        el.setAttribute(attr, lang === 'en' && EN[key] != null ? EN[key] : el.dataset[store]);
      });
    });
    document.documentElement.lang = lang;
  }

  /* ---------- data.js 렌더링 ---------- */
  function each(sel, fn) { document.querySelectorAll(sel).forEach(fn); }
  function hideIfEmpty() {
    each('[data-requires]', function (el) {
      var v = D, path = el.getAttribute('data-requires').split('.');
      path.forEach(function (k) { v = v == null ? v : v[k]; });
      el.hidden = v == null || (Array.isArray(v) && v.length === 0);
    });
  }

  function renderStats() {
    each('[data-render="stats"]', function (el) {
      el.innerHTML = (D.stats || []).map(function (s) {
        return '<div class="stat-item"><p class="stat-num">' + esc(s.value) + '</p><p class="stat-label">' + esc(t(s.label)) + '</p></div>';
      }).join('');
    });
  }

  function sortedNews() {
    return (D.news || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }
  function renderNews() {
    each('[data-render="news"]', function (el) {
      var limit = +el.getAttribute('data-limit') || 0;
      var list = sortedNews();
      if (limit) list = list.slice(0, limit);
      el.innerHTML = list.map(function (n, i) {
        var body = esc(t(n.body));
        var long = body.length > (lang === 'en' ? 220 : 110);
        var id = 'news-' + n.date + '-' + i;
        return '<li class="news-item">' +
          '<div class="news-meta"><time datetime="' + n.date + '">' + fmtDate(n.date) + '</time>' +
          (n.tag ? '<span class="tag tag-' + n.tag + '">' + ui(n.tag) + '</span>' : '') + '</div>' +
          '<h3 class="news-title">' + esc(t(n.title)) + '</h3>' +
          '<p class="news-body' + (long ? ' clamp' : '') + '" id="' + id + '">' + body + '</p>' +
          (long ? '<button type="button" class="link-btn" aria-expanded="false" aria-controls="' + id + '">' + ui('more') + '</button>' : '') +
          '</li>';
      }).join('');
      el.querySelectorAll('.link-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          var p = document.getElementById(b.getAttribute('aria-controls'));
          var open = b.getAttribute('aria-expanded') !== 'true';
          p.classList.toggle('clamp', !open);
          b.setAttribute('aria-expanded', open);
          b.textContent = open ? ui('less') : ui('more');
        });
      });
    });
  }

  /* 사진 + 라이트박스 */
  var gFilter = 'all', gVisible = [], gIndex = 0, dlg = null;
  function renderGallery() {
    var grid = document.querySelector('[data-render="gallery"]');
    if (!grid) return;
    var items = (D.gallery || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    var tags = ['all'].concat(items.map(function (g) { return g.tag; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; }));
    var filterBox = document.querySelector('[data-render="gallery-filter"]');
    if (filterBox) {
      filterBox.innerHTML = tags.length > 2 ? tags.map(function (tg) {
        return '<button type="button" class="filter-btn" aria-pressed="' + (tg === gFilter) + '" data-filter="' + tg + '">' + ui(tg) + '</button>';
      }).join('') : '';
      filterBox.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () { gFilter = b.getAttribute('data-filter'); renderGallery(); });
      });
    }
    gVisible = items.filter(function (g) { return gFilter === 'all' || g.tag === gFilter; });
    grid.innerHTML = gVisible.map(function (g, i) {
      var cap = esc(t(g.caption));
      return '<li><figure class="gallery-item"><button type="button" data-index="' + i + '">' +
        '<img src="' + esc(g.src) + '" alt="' + cap + '" loading="lazy"></button>' +
        '<figcaption>' + cap + (g.date ? ' · ' + fmtDate(g.date) : '') + '</figcaption></figure></li>';
    }).join('');
    grid.querySelectorAll('button[data-index]').forEach(function (b) {
      b.addEventListener('click', function () { openLightbox(+b.getAttribute('data-index')); });
    });
  }
  function ensureDialog() {
    if (dlg) return dlg;
    dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.innerHTML =
      '<button type="button" class="lb-close"></button>' +
      '<button type="button" class="lb-prev">&#8249;</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button type="button" class="lb-next">&#8250;</button>';
    document.body.appendChild(dlg);
    dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
    dlg.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
    dlg.querySelector('.lb-next').addEventListener('click', function () { step(1); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
    dlg.addEventListener('close', function () {
      document.body.classList.remove('no-scroll');
      var b = document.querySelector('[data-render="gallery"] button[data-index="' + gIndex + '"]');
      if (b) b.focus();
    });
    return dlg;
  }
  function showSlide() {
    var g = gVisible[gIndex]; if (!g) return;
    var img = dlg.querySelector('img');
    img.src = g.src; img.alt = t(g.caption);
    dlg.querySelector('figcaption').textContent = t(g.caption) + (g.date ? ' · ' + fmtDate(g.date) : '');
    dlg.querySelector('.lb-close').setAttribute('aria-label', ui('close'));
    dlg.querySelector('.lb-prev').setAttribute('aria-label', ui('prev'));
    dlg.querySelector('.lb-next').setAttribute('aria-label', ui('next'));
    var multi = gVisible.length > 1;
    dlg.querySelector('.lb-prev').hidden = !multi;
    dlg.querySelector('.lb-next').hidden = !multi;
  }
  function step(d) { gIndex = (gIndex + d + gVisible.length) % gVisible.length; showSlide(); }
  function openLightbox(i) {
    ensureDialog(); gIndex = i; showSlide();
    document.body.classList.add('no-scroll');
    dlg.showModal();
    dlg.querySelector('.lb-close').focus();
  }

  function renderAllocation() {
    each('[data-render="allocation"]', function (el) {
      el.innerHTML = (D.allocation || []).map(function (a) {
        return '<li class="alloc-item"><p class="alloc-pct">' + a.pct + '%</p>' +
          '<div class="alloc-bar" aria-hidden="true"><span style="width:' + a.pct + '%"></span></div>' +
          '<p class="alloc-label">' + esc(t(a.label)) + '</p></li>';
      }).join('');
    });
  }

  function renderLedger() {
    each('[data-render="ledger"]', function (el) {
      el.innerHTML = (D.ledger || []).map(function (L) {
        var amounts = L.items.map(function (i) { return i.amount; });
        var complete = amounts.every(function (a) { return a != null; });
        var total = complete ? amounts.reduce(function (s, a) { return s + a; }, 0) : null;
        var rows = L.items.map(function (i) {
          return '<tr><th scope="row">' + esc(t(i.name)) + '</th>' +
            '<td>' + (i.qty != null ? esc(i.qty) : '–') + '</td>' +
            '<td>' + (i.amount != null ? won(i.amount) : '<span class="pending">' + ui('pending') + '</span>') + '</td>' +
            '<td>' + (i.receipt ? '<a href="' + esc(i.receipt) + '" target="_blank" rel="noopener">' + ui('receipt') + '</a>' : '–') + '</td></tr>';
        }).join('');
        var facts = [
          ['date', fmtDate(L.date)],
          ['recipient', t(L.recipient)],
          ['partner', t(L.partner)],
          ['raised', L.raised != null ? won(L.raised) : null],
          ['donors', L.donors != null ? L.donors + ui('people') : null],
          ['carry', L.carryOver != null ? won(L.carryOver) : null]
        ].filter(function (f) { return f[1]; });
        return '<article class="ledger">' +
          '<div class="ledger-head"><h3>' + esc(t(L.title)) + '</h3>' +
          '<span class="badge ' + (complete ? 'badge-done' : 'badge-pending') + '">' + ui(complete ? 'statusDone' : 'statusPending') + '</span></div>' +
          '<dl class="facts">' + facts.map(function (f) { return '<div><dt>' + ui(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl>' +
          '<div class="table-wrap"><table><thead><tr><th scope="col">' + ui('item') + '</th><th scope="col">' + ui('qty') + '</th><th scope="col">' + ui('amount') + '</th><th scope="col">' + ui('proof') + '</th></tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
          (total != null ? '<tfoot><tr><th scope="row">' + ui('total') + '</th><td></td><td>' + won(total) + '</td><td></td></tr></tfoot>' : '') +
          '</table></div>' +
          (complete ? '' : '<p class="note">' + ui('pendingNote') + '</p>') +
          '</article>';
      }).join('');
    });
  }

  function renderReports() {
    each('[data-render="reports"]', function (el) {
      el.innerHTML = (D.reports || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }).map(function (r) {
        return '<li><a href="' + esc(r.file) + '" target="_blank" rel="noopener">' + esc(t(r.title)) + '</a> <time datetime="' + r.date + '">' + fmtDate(r.date) + '</time></li>';
      }).join('');
    });
  }

  function renderTeam() {
    each('[data-render="team"]', function (el) {
      el.innerHTML = (D.team || []).map(function (m) {
        return '<li class="team-card"><p class="team-name">' + esc(t(m.name)) + '</p><p class="team-role">' + esc(t(m.role)) + '</p>' +
          (m.school ? '<p class="team-school">' + esc(t(m.school)) + '</p>' : '') + '</li>';
      }).join('');
    });
  }

  function copyText(text, btn) {
    function done() { var o = btn.textContent; btn.textContent = ui('copied'); setTimeout(function () { btn.textContent = o; }, 1500); }
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, function () { prompt('', text); }); }
    else {
      var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { prompt('', text); }
      document.body.removeChild(ta);
    }
  }

  function renderDonate() {
    var acc = D.donate && D.donate.bankAccount;
    each('[data-render="account"]', function (el) {
      if (acc) {
        el.innerHTML = '<dl class="account"><div><dt>' + ui('bank') + '</dt><dd>' + esc(acc.bank) + '</dd></div>' +
          '<div><dt>' + ui('holder') + '</dt><dd>' + esc(acc.holder) + '</dd></div>' +
          '<div><dt>' + ui('accNo') + '</dt><dd><span class="acc-num">' + esc(acc.number) + '</span> <button type="button" class="chip-btn" data-copy="' + esc(acc.number) + '">' + ui('copy') + '</button></dd></div></dl>';
      } else {
        el.innerHTML = '<p>' + ui('accountByMail') + '</p>' +
          '<a class="btn btn-primary" href="' + mailto('subjMoney') + '">' + ui('mailDonate') + '</a>' +
          '<button type="button" class="chip-btn" data-copy="' + email() + '">' + ui('copyEmail') + '</button>';
      }
    });
    each('[data-mail]', function (a) {
      var kind = a.getAttribute('data-mail');
      if (kind === 'volunteer' && D.donate && D.donate.volunteerFormUrl) {
        a.href = D.donate.volunteerFormUrl; a.target = '_blank'; a.rel = 'noopener';
      } else {
        a.href = kind === 'volunteer' ? mailto('subjVolunteer', 'bodyVolunteer') : kind === 'goods' ? mailto('subjGoods') : 'mailto:' + email();
      }
    });
    each('[data-email-text]', function (s) { s.textContent = email(); });
    each('[data-render="impact"]', function (el) {
      el.innerHTML = ((D.donate && D.donate.impact) || []).map(function (i) {
        return '<li><strong>' + esc(i.amount) + '</strong><span>' + esc(t(i.what)) + '</span></li>';
      }).join('');
    });
    each('[data-render="receipt-note"]', function (el) { el.textContent = t(D.donate && D.donate.receiptNote); });
    each('[data-copy]', function (b) {
      if (b.dataset.bound) return;
      b.dataset.bound = '1';
      b.addEventListener('click', function () { copyText(b.getAttribute('data-copy'), b); });
    });
  }

  function renderAll() {
    renderHeader();
    renderFooter();
    applyStatic();
    renderStats();
    renderNews();
    renderGallery();
    renderAllocation();
    renderLedger();
    renderReports();
    renderTeam();
    renderDonate();
    hideIfEmpty();
    document.documentElement.classList.remove('i18n-wait');
  }

  renderAll();
})();
