/* ==========================================================================
   Lemonade For All — 사이트 데이터 (여기만 고치면 사이트 전체에 반영됩니다)
   --------------------------------------------------------------------------
   · 모든 항목은 { ko: '한국어', en: 'English' } 형태로 씁니다.
   · 값이 null 이거나 빈 배열 [] 이면 그 영역은 화면에 표시되지 않습니다.
     (빈 칸이나 "준비 중"이 노출되지 않도록 하기 위함)
   · 날짜는 'YYYY-MM-DD' 형식으로 통일합니다. 최신순 정렬은 자동입니다.
   ========================================================================== */

window.LFA_DATA = {

  /* ---------- 기본 정보 ---------- */
  org: {
    // 공식 설립일. 사이트의 모든 날짜는 이 값을 기준으로 맞춰 두었습니다.
    founded: '2025-12-23',
    // 이메일은 스팸 수집을 줄이기 위해 두 부분으로 나눠 둡니다.
    emailUser: 'lfageneralx',
    emailDomain: 'gmail.com',
    // 단체 성격을 적어 주세요. 예: { ko: '비영리 임의단체 (고유번호 000-00-00000)', en: '...' }
    legalStatus: null,
    // SNS 링크. 예: [{ label: 'Instagram', url: 'https://instagram.com/...' }]
    social: []
  },

  /* ---------- 홈 화면 실적 숫자 ---------- */
  stats: [
    { value: '113', label: { ko: '지원 시설 아동 수', en: 'Children at the supported home' } },
    { value: '200+', label: { ko: '캠페인 참여 학생', en: 'Students in our campaign' } },
    { value: '1', label: { ko: '현지 협력 기관', en: 'Local partner organization' } },
    { value: '2025', label: { ko: '설립', en: 'Founded' } }
  ],

  /* ---------- 활동 소식 (자동으로 최신순 정렬) ---------- */
  news: [
    {
      date: '2026-05',
      tag: 'campaign',
      title: { ko: '포항 지역 학교 기부 인식 캠페인', en: 'Giving Awareness Campaign at Pohang Schools' },
      body: {
        ko: '포항 지역 학교에서 공익 활동 교육 캠페인을 진행했습니다. 학생 200여 명이 참여해 기부와 나눔의 의미를 함께 이야기했습니다.',
        en: 'We ran a public-service education campaign at schools in Pohang. About 200 students took part and talked together about what giving means.'
      }
    },
    {
      date: '2026-03-17',
      tag: 'cambodia',
      title: { ko: '캄보디아 1차 물품 지원 완료', en: 'First Supply Delivery to Cambodia Completed' },
      body: {
        ko: "캄보디아 반띠민쩨이(Banteay Meanchey) 주에 있는 아동 보호시설 'Place of Rescue'에 의류와 보건 물품을 전달했습니다. 이곳에서는 아이들 113명이 생활하고 있으며, 그중 12명은 캄보디아-태국 국경 분쟁으로 보호자를 잃었습니다(협력 기관 제공 정보). 전달은 태화복지재단 캄보디아 지부와 협력해 진행했습니다.",
        en: "We delivered clothing and health supplies to 'Place of Rescue', a children's home in Banteay Meanchey Province, Cambodia. 113 children live there, 12 of whom lost their guardians in the Cambodia–Thailand border conflict (information provided by our partner). The delivery was carried out with the Cambodia branch of the Taehwa Welfare Foundation."
      }
    },
    {
      date: '2025-12-23',
      tag: 'team',
      title: { ko: '레모네이드 포 올 설립', en: 'Lemonade For All Founded' },
      body: {
        ko: '청소년이 주도하는 비영리 단체 레모네이드 포 올이 설립되었습니다. 함께해 주시는 모든 분께 감사드립니다.',
        en: 'Lemonade For All, a youth-led non-profit, was founded. Thank you to everyone who joins us.'
      }
    }
  ],

  /* ---------- 사진 (비어 있으면 '사진' 영역이 숨겨집니다) ----------
     사진 파일을 images/gallery/ 에 넣고 아래처럼 추가하세요.
     아동 보호 원칙: 아이들 얼굴이 식별되는 사진은 보호 기관 동의 없이 올리지 않습니다.
     예)
     { src: 'images/gallery/cambodia-01.jpg', date: '2026-03-17', tag: 'cambodia',
       caption: { ko: '캄보디아 물품 전달', en: 'Supply delivery in Cambodia' } },
  */
  gallery: [],

  /* ---------- 정산 내역 (투명성 페이지) ----------
     amount: 원 단위 숫자. 아직 확정되지 않았으면 null → '정산 중'으로 표시됩니다.
     receipt: 영수증 파일 경로 (예: 'reports/2026-03-receipt-clothes.pdf'), 없으면 null
  */
  ledger: [
    {
      id: 'cambodia-1',
      title: { ko: '캄보디아 1차 물품 지원', en: 'Cambodia — First Supply Delivery' },
      date: '2026-03-17',
      raised: null,          // 총 모금액
      donors: null,          // 후원자 수
      recipient: { ko: "Place of Rescue (반띠민쩨이 주)", en: 'Place of Rescue (Banteay Meanchey Province)' },
      partner: { ko: '태화복지재단 캄보디아 지부', en: 'Taehwa Welfare Foundation, Cambodia branch' },
      items: [
        { name: { ko: '의류', en: 'Clothing' }, qty: null, amount: null, receipt: null },
        { name: { ko: '보건·위생 물품', en: 'Health & hygiene supplies' }, qty: null, amount: null, receipt: null },
        { name: { ko: '국제 배송비', en: 'International shipping' }, qty: null, amount: null, receipt: null },
        { name: { ko: '운영비', en: 'Operating costs' }, qty: null, amount: null, receipt: null }
      ],
      carryOver: null        // 다음 사업으로 이월한 잔액
    }
  ],

  /* ---------- 보고서 PDF (비어 있으면 숨김) ----------
     예) { title: { ko: '2026년 1분기 재정 보고서', en: '2026 Q1 Financial Report' }, file: 'reports/2026-Q1.pdf', date: '2026-04-10' }
  */
  reports: [],

  /* ---------- 팀 소개 (비어 있으면 '팀' 영역이 숨겨집니다) ----------
     예) { name: { ko: '홍길동', en: 'Gildong Hong' }, role: { ko: '대표', en: 'Founder' }, school: { ko: '○○고등학교', en: '○○ High School' } }
  */
  team: [],

  /* ---------- 후원 정보 ---------- */
  donate: {
    // 공개 가능한 단체 명의 계좌가 있으면 적어 주세요. null 이면 '이메일로 계좌 안내' 방식으로 표시됩니다.
    // 예) { bank: '○○은행', number: '000-0000-0000-00', holder: '레모네이드 포 올' }
    bankAccount: null,
    // 봉사 신청 구글 폼 주소. null 이면 이메일 신청으로 연결됩니다.
    volunteerFormUrl: null,
    // 기부금 영수증 발급 가능 여부 안내. 모르면 null.
    receiptNote: null,
    // '1만 원이면 ○○' 같은 금액별 안내. 실제 단가를 확인한 뒤 채워 주세요.
    // 예) { amount: '10,000원', what: { ko: '위생 키트 1세트', en: 'One hygiene kit' } }
    impact: []
  },

  /* ---------- 사용 비율 (후원·투명성 페이지 공통) ---------- */
  allocation: [
    { pct: 85, label: { ko: '현장 직접 지원', en: 'Direct program support' } },
    { pct: 10, label: { ko: '운영비', en: 'Operating costs' } },
    { pct: 5, label: { ko: '교육·캠페인', en: 'Education & campaigns' } }
  ]
};
