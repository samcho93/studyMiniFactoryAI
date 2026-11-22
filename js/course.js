/* 스마트 미니팩토리로 배우는 제조 AI · 피지컬 AI — 강좌 설정
 * lectureBuilder 가 docs/curriculum.json 으로 생성합니다. (직접 고치면 다음 생성 때 덮어씀)
 * 각 차시는 lessons/<id>.js 에서 PY_COURSE.addChapter({...}) 로 등록합니다.
 */
window.PY_COURSE = {
  "title": "스마트 미니팩토리로 배우는 제조 AI · 피지컬 AI",
  "shortTitle": "제조 AI · 피지컬 AI 실습",
  "subtitle": "ERP · MES · 3D 디지털트윈 · AI 예지보전 · AI 생산계획 따라하기",
  "icon": "🏭",
  "intro": "AI 가 화면 밖으로 나와 공장 설비를 보고 · 판단하고 · 움직이는 시대 — <b>스마트 미니팩토리 통합 플랫폼(miniPythicalAI)</b> 을 직접 써 보며 <b>제조 AI</b> 와 <b>피지컬 AI</b> 를 배우는 실습 강좌입니다. 제조 AI 가 왜 필요한지, 피지컬 AI 가 로봇만이 아니라는 것부터 시작해, ERP · MES · 3D 디지털트윈으로 공장을 운영하고 <b>AI 예지보전 · AI 생산계획 · AI 도우미</b> 를 화면 캡처를 보며 <b>단계별로 따라 합니다</b>. 마지막에는 급주문 · 자재 부족 · 설비 고장 · 품질 불량 등 <b>현장 사례</b>를 처음부터 끝까지 해결합니다. 코드를 몰라도 됩니다. 학생용(문서 · 단계별 실습)과 교사용(슬라이드 · 지도안)을 함께 제공합니다.",
  "footer": "스마트 미니팩토리로 배우는 제조 AI · 피지컬 AI",
  "teacherPass": "samcho93",
  "github": {
    "user": "samcho93",
    "repo": "studyMiniFactoryAI",
    "branch": "main"
  },
  "pathway": [],
  "parts": [
    {
      "id": 1,
      "title": "Part 1. 제조 AI 와 피지컬 AI",
      "desc": "왜 지금 제조 AI 인가, 피지컬 AI 는 무엇이며 이 플랫폼과 어떻게 연결되는가"
    },
    {
      "id": 2,
      "title": "Part 2. 플랫폼 시작하기",
      "desc": "설치 · 첫 실행 · 화면 구성 · 미니공장 라인과 3D 디지털트윈"
    },
    {
      "id": 3,
      "title": "Part 3. ERP · MES 로 공장 운영하기",
      "desc": "기준정보 · 수주 → 생산계획 · 생산오더 → 자재 · 구매 → 작업지시 · 실적 → 품질 · LOT · 대시보드"
    },
    {
      "id": 4,
      "title": "Part 4. AI 로 일하기",
      "desc": "AI 예지보전 · 가상 고장 진단 · AI 생산계획 · AI 도우미"
    },
    {
      "id": 5,
      "title": "Part 5. 현장 사례 실습",
      "desc": "생산 · 계획 사례, 설비 · 품질 · 운영 사례, 하루 공장 운영 종합 미션"
    }
  ],
  "order": [
    {
      "id": "ch01",
      "no": "01",
      "part": 1,
      "title": "AI 시대, 왜 제조 AI 인가",
      "icon": "🌏"
    },
    {
      "id": "ch02",
      "no": "02",
      "part": 1,
      "title": "피지컬 AI — 로봇만이 아니다",
      "icon": "🤖"
    },
    {
      "id": "ch03",
      "no": "03",
      "part": 1,
      "title": "이 플랫폼으로 보는 피지컬 AI",
      "icon": "🏭"
    },
    {
      "id": "ch04",
      "no": "04",
      "part": 2,
      "title": "설치 · 첫 실행 · 화면 둘러보기",
      "icon": "🚀"
    },
    {
      "id": "ch05",
      "no": "05",
      "part": 2,
      "title": "공장 라인과 3D 디지털트윈",
      "icon": "🦾"
    },
    {
      "id": "ch06",
      "no": "06",
      "part": 3,
      "title": "ERP ① 기준정보와 수주",
      "icon": "📋"
    },
    {
      "id": "ch07",
      "no": "07",
      "part": 3,
      "title": "ERP ② 생산계획과 생산오더",
      "icon": "🗓"
    },
    {
      "id": "ch08",
      "no": "08",
      "part": 3,
      "title": "ERP ③ 자재 · 구매 · 재고 · 출고",
      "icon": "📦"
    },
    {
      "id": "ch09",
      "no": "09",
      "part": 3,
      "title": "MES ① 생산 실행",
      "icon": "🛠"
    },
    {
      "id": "ch10",
      "no": "10",
      "part": 3,
      "title": "MES ② 품질 · LOT · 대시보드",
      "icon": "📈"
    },
    {
      "id": "ch11",
      "no": "11",
      "part": 4,
      "title": "AI 예지보전 ① 데이터와 이상 탐지",
      "icon": "🔍"
    },
    {
      "id": "ch12",
      "no": "12",
      "part": 4,
      "title": "AI 예지보전 ② 가상 고장과 AI 진단",
      "icon": "🧪"
    },
    {
      "id": "ch13",
      "no": "13",
      "part": 4,
      "title": "AI 생산계획",
      "icon": "📅"
    },
    {
      "id": "ch14",
      "no": "14",
      "part": 4,
      "title": "AI 도우미와 AI 키",
      "icon": "💬"
    },
    {
      "id": "ch15",
      "no": "15",
      "part": 5,
      "title": "사례 실습 ① 생산 · 계획",
      "icon": "🧩"
    },
    {
      "id": "ch16",
      "no": "16",
      "part": 5,
      "title": "사례 실습 ② 설비 · 품질 · 운영",
      "icon": "🧯"
    },
    {
      "id": "ch17",
      "no": "17",
      "part": 5,
      "title": "종합 미션과 현장 적용",
      "icon": "🏁"
    }
  ],
  "chapters": {},
  "addChapter": function (ch) { this.chapters[ch.id] = ch; }
};
