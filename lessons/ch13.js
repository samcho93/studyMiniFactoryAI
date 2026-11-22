/* 13 AI 생산계획 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_FLOW = `<svg viewBox="0 0 720 330" role="img" aria-label="AI 생산계획의 흐름: 사람의 요청 문장, AI 가 조회 도구와 계획 초안 도구를 사용, 서버가 설비를 배정, 사람이 확정과 생산 시작">
  ${ARROW('c13a1')}
  <rect x="10" y="20" width="150" height="70" rx="12" class="p1s"/>
  <text x="85" y="48" text-anchor="middle" class="tx-b">① 사람의 요청</text>
  <text x="85" y="70" text-anchor="middle" class="tx-m">"레드 20, 블루 10"</text>
  <rect x="200" y="20" width="160" height="70" rx="12" class="p2"/>
  <text x="280" y="48" text-anchor="middle" class="tx-w">② AI</text>
  <text x="280" y="70" text-anchor="middle" class="tx-w">규칙 기반 또는 Claude</text>
  <rect x="400" y="10" width="150" height="40" rx="10" class="p3s"/>
  <text x="475" y="35" text-anchor="middle" class="tx">조회: ERP 요약 · 수주</text>
  <rect x="400" y="60" width="150" height="40" rx="10" class="p3s"/>
  <text x="475" y="85" text-anchor="middle" class="tx">조회: 재고 · MRP</text>
  <rect x="570" y="20" width="140" height="70" rx="12" class="p4s"/>
  <text x="640" y="48" text-anchor="middle" class="tx-b">③ 계획 초안</text>
  <text x="640" y="70" text-anchor="middle" class="tx-m">작성 도구 호출</text>
  <line x1="162" y1="55" x2="196" y2="55" class="ln" stroke-width="2" marker-end="url(#c13a1)"/>
  <line x1="362" y1="45" x2="396" y2="32" class="ln" stroke-width="1.5" marker-end="url(#c13a1)"/>
  <line x1="362" y1="65" x2="396" y2="80" class="ln" stroke-width="1.5" marker-end="url(#c13a1)"/>
  <line x1="552" y1="55" x2="566" y2="55" class="ln" stroke-width="2" marker-end="url(#c13a1)"/>
  <rect x="440" y="140" width="270" height="80" rx="12" class="card-bg"/>
  <text x="575" y="166" text-anchor="middle" class="tx-b">④ 서버의 설비 배정 규칙</text>
  <text x="575" y="188" text-anchor="middle" class="tx-m">설비 수 · 긴 작업 먼저 · 색 전환 5분</text>
  <text x="575" y="206" text-anchor="middle" class="tx-m">긴 색은 나눠 여러 설비로</text>
  <line x1="640" y1="92" x2="640" y2="136" class="ln" stroke-width="2" marker-end="url(#c13a1)"/>
  <rect x="200" y="140" width="200" height="80" rx="12" class="p5s"/>
  <text x="300" y="166" text-anchor="middle" class="tx-b">⑤ 계획서 초안(작성)</text>
  <text x="300" y="188" text-anchor="middle" class="tx-m">설비별 색 · 수량 · 순서</text>
  <text x="300" y="206" text-anchor="middle" class="tx-m">예상 시간 · 경고</text>
  <line x1="438" y1="180" x2="404" y2="180" class="ln" stroke-width="2" marker-end="url(#c13a1)"/>
  <rect x="10" y="140" width="150" height="80" rx="12" class="p1"/>
  <text x="85" y="170" text-anchor="middle" class="tx-w">⑥ 사람</text>
  <text x="85" y="192" text-anchor="middle" class="tx-w">검토 · 편집 · 재배정</text>
  <line x1="198" y1="180" x2="164" y2="180" class="ln" stroke-width="2" marker-end="url(#c13a1)"/>
  <rect x="10" y="255" width="220" height="56" rx="12" class="p1s"/>
  <text x="120" y="280" text-anchor="middle" class="tx-b">⑦ 생산 계획 완료(확정)</text>
  <text x="120" y="298" text-anchor="middle" class="tx-m">사람이 누름</text>
  <rect x="270" y="255" width="200" height="56" rx="12" class="p1s"/>
  <text x="370" y="280" text-anchor="middle" class="tx-b">⑧ ▶ 생산 시작</text>
  <text x="370" y="298" text-anchor="middle" class="tx-m">사람이 누름</text>
  <rect x="510" y="255" width="200" height="56" rx="12" class="p4s"/>
  <text x="610" y="280" text-anchor="middle" class="tx-b">⑨ MES 작업지시</text>
  <text x="610" y="298" text-anchor="middle" class="tx-m">설비가 계획대로 기동</text>
  <line x1="85" y1="222" x2="85" y2="251" class="ln" stroke-width="2" marker-end="url(#c13a1)"/>
  <line x1="232" y1="283" x2="266" y2="283" class="ln" stroke-width="2" marker-end="url(#c13a1)"/>
  <line x1="472" y1="283" x2="506" y2="283" class="ln" stroke-width="2" marker-end="url(#c13a1)"/>
</svg>`;

  const FIG_ALLOC = `<svg viewBox="0 0 720 300" role="img" aria-label="설비 배정 규칙: 필요한 설비 수 정하기, 긴 색 나누기, 긴 작업부터 가장 한가한 설비에, 색이 바뀌면 전환 5분, 설비 안 순서">
  <rect x="10" y="10" width="340" height="130" rx="14" class="p1s"/>
  <text x="25" y="38" class="tx-b">1. 설비 몇 대?</text>
  <text x="25" y="62" class="tx">필요 설비 = 둘 중 큰 값</text>
  <text x="25" y="84" class="tx-m">· 색 가짓수 (한 설비는 한 번에 한 색)</text>
  <text x="25" y="104" class="tx-m">· 총 소요 시간 ÷ 가용 시간(설비 1대)</text>
  <text x="25" y="126" class="tx-m">최대 4대, "설비 N대" 라고 하면 그 수로 고정</text>
  <rect x="370" y="10" width="340" height="130" rx="14" class="p2s"/>
  <text x="385" y="38" class="tx-b">2. 너무 긴 색은 나누기</text>
  <text x="385" y="62" class="tx">한 색이 가용 시간을 넘고</text>
  <text x="385" y="84" class="tx">남는 설비가 있으면 여러 설비로</text>
  <text x="385" y="108" class="tx-m">예) 레드 4000 → 2000 (1/2) + 2000 (2/2)</text>
  <rect x="10" y="155" width="340" height="135" rx="14" class="p3s"/>
  <text x="25" y="183" class="tx-b">3. 긴 작업부터 배정</text>
  <text x="25" y="207" class="tx">가장 덜 바쁜 설비에 넣기</text>
  <text x="25" y="229" class="tx-m">같은 색을 하던 설비를 우선(전환 줄이기)</text>
  <text x="25" y="251" class="tx-m">색이 바뀌면 품목 전환 5분(빗금 구간)</text>
  <text x="25" y="273" class="tx-m">박스 1개 ≈ 8.24초 · 설비 1대 시간당 ≈ 437박스</text>
  <rect x="370" y="155" width="340" height="135" rx="14" class="p4s"/>
  <text x="385" y="183" class="tx-b">4. 설비 안의 순서</text>
  <text x="385" y="207" class="tx">우선순위(1 = 가장 급함)</text>
  <text x="385" y="229" class="tx">→ 납기가 빠른 것</text>
  <text x="385" y="251" class="tx">→ 큰 작업</text>
  <text x="385" y="273" class="tx-m">결과: 완료 예상 · 가용 시간 안/초과 · 경고</text>
</svg>`;

  const FIG_READ = `<svg viewBox="0 0 720 230" role="img" aria-label="설비 배정 차트 읽는 법: 색 막대는 작업, 빗금은 품목 전환, 빨간 점선은 가용 시간 한계, 가동 퍼센트">
  <text x="20" y="28" class="tx-b">설비 배정 차트 읽는 법</text>
  <text x="20" y="66" class="tx">설비 #1</text>
  <rect x="100" y="48" width="150" height="28" rx="5" class="p5s"/>
  <text x="110" y="67" class="tx">화이트 10</text>
  <rect x="250" y="48" width="70" height="28" class="card-bg"/>
  <line x1="255" y1="74" x2="275" y2="50" class="ln"/><line x1="275" y1="74" x2="295" y2="50" class="ln"/><line x1="295" y1="74" x2="315" y2="50" class="ln"/>
  <rect x="320" y="48" width="120" height="28" rx="5" class="p2"/>
  <text x="330" y="67" class="tx-w">블루 10</text>
  <text x="20" y="116" class="tx">설비 #2</text>
  <rect x="100" y="98" width="480" height="28" rx="5" class="p1"/>
  <text x="110" y="117" class="tx-w">레드 4000</text>
  <line x1="540" y1="38" x2="540" y2="140" class="ln" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="545" y="152" class="tx-m">가용 시간 한계</text>
  <text x="600" y="117" class="tx-m">가동 114 %</text>
  <text x="20" y="186" class="tx-m">■ 색 막대 = 작업(색 · 박스 수)   ▨ 빗금 = 품목 전환(색 교체)   ┆ 빨간 점선 = 가용 시간</text>
  <text x="20" y="210" class="tx-m">막대가 점선을 넘으면 「✖ 가용 시간 초과」 — 설비를 늘리거나 수량 · 시간을 조정합니다.</text>
</svg>`;

  // ---------------------------------------------------------------- 실습 13-1
  const LAB_FIRST = `<div class="lab" data-lab="ch13-1-a">
  <div class="lab-head"><span class="lab-badge">실습 13-1</span><b>첫 계획 초안 만들기</b><span class="lab-meta">⏱ 12분 · 화면: AI 생산계획</span></div>
  <p class="lab-goal">문장 하나로 생산계획서 초안을 만들고, AI 가 어떤 도구를 썼는지와 서버가 설비를 어떻게 배정했는지 읽습니다.</p>
  <p class="lab-pre">실습 프로그램 실행(run.bat). 아직 <b>확정 · 생산 시작은 누르지 않습니다</b>.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">AI 생산계획</span> 을 엽니다. 왼쪽 <b>계획 대화</b> 위쪽의 모드 표시를 봅니다.</div>
      ${SHOT('ch13_plan_page', 'AI 생산계획 첫 화면, 모드 표시 강조')}
      <div class="lab-check">키가 없으면 <b>⚙ 규칙 기반(키 없음)</b>, 키가 있으면 <b>✦ Claude · 모델 이름</b> 이 보입니다. 지금 모드를 활동지에 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">아래 입력칸에 <span class="prompt">화이트 12, 옐로 8 만들자</span> 를 쓰고 <span class="ui">보내기</span> (또는 Enter) 합니다.</div>
      <div class="lab-check">"생각하는 중…" 뒤에 답이 나옵니다. 답 첫 줄에 계획서 번호(<b>PS-…</b>)가 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">답의 내용을 읽습니다: 가동 설비 수 · 예상 소요 · 가용 시간 · 설비별 색과 수량.</div>
      ${SHOT('ch13_req_colors', '화이트 12, 옐로 8 요청 결과')}
      <div class="lab-check">설비 2대 가동 — 설비 #1 화이트 12박스, 설비 #2 옐로 8박스. 색이 2가지라 설비도 2대입니다(한 설비는 한 번에 한 색).</div></li>
    <li class="lab-step"><div class="lab-do">답 아래의 작은 글씨(<b>규칙 · 조회: 계획 초안 작성 · 계획서 보기</b>)를 찾습니다.</div>
      <div class="lab-check">AI 가 <b>어떤 도구</b>를 썼는지 보여 줍니다. 수주 기준 요청이면 'ERP 요약' 도 함께 보입니다. <span class="ui">계획서 보기</span> 를 누르면 오른쪽에 그 계획서가 열립니다.</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 계획서에서 <b>상태 배지</b>(✎ 작성)와 <b>AI 계획 · 작성 operator (AI)</b> 표시를 확인합니다.</div>
      <div class="lab-check">AI 가 만든 계획서는 출처가 'AI 계획' 이고, 상태는 <b>작성(초안)</b> 입니다. 작성자 이름 뒤에 (AI) 가 붙어 감사 기록에도 남습니다.</div></li>
    <li class="lab-step"><div class="lab-do">아래 <b>설비 배정</b> 카드에서 「필요 설비 n대」 · 「가용 시간 안」 배지와 막대 차트, 맨 아래 「박스 1개 8.24초(시간당 437.1박스)」 줄을 읽습니다.</div>
      <div class="lab-check">박스 20개 ≈ 2.7분. 가용 시간(8시간) 안에 넉넉히 끝납니다.</div></li>
    <li class="lab-step"><div class="lab-do">계획서 표에서 수량 칸을 바꿔 보기만 하고(예: 12 → 30), <b>편집 저장</b> 은 누르지 말고 원래대로 돌려놓습니다.</div>
      <div class="lab-check">AI 가 만든 초안도 사람이 <b>얼마든지 고칠 수 있는</b> 보통 계획서입니다. 고치면 「저장하지 않은 변경이 있습니다」 가 나타납니다.</div></li>
  </ol>
  <div class="lab-result">AI 생산계획은 <b>문장 → 도구 호출 → 서버의 배정 규칙 → 계획서 초안</b> 순서로 동작합니다. AI 는 숫자를 지어내지 않고, 배정 계산은 서버의 규칙이 합니다.</div>
</div>`;

  const LAB_REQ = `<div class="lab" data-lab="ch13-1-b">
  <div class="lab-head"><span class="lab-badge">실습 13-2</span><b>요청 문장 바꿔 가며 실험하기</b><span class="lab-meta">⏱ 20분 · 화면: AI 생산계획</span></div>
  <p class="lab-goal">같은 화면에서 요청 문장을 바꿔 보며, 문장의 어떤 말이 설비 수 · 시간 · 배정을 바꾸는지 확인합니다. 단계마다 결과를 활동지 표(요청 · 설비 수 · 예상 소요 · 가용 시간 안? · 경고)에 적습니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">예시 버튼 <span class="prompt">미출고 수주 전부 오늘 처리할 계획 세워줘</span> 를 누릅니다.</div>
      ${SHOT('ch13_req_orders', '미출고 수주 기준 계획')}
      <div class="lab-check">수량을 말하지 않았는데 계획이 나옵니다. 아래 줄에 <b>조회: ERP 요약</b> — AI 가 ERP 에서 색상별 수주 잔량을 읽어 수량을 채웠습니다. ERP → 개요의 「색상별 수주 잔량」 숫자와 같은지 비교합니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 답에서 ⚠ 경고 「색 5종을 설비 4대로 생산 … 품목 전환이 필요합니다」 와 차트의 <b>빗금 구간</b>을 찾습니다.</div>
      <div class="lab-check">색이 5가지인데 설비는 최대 4대라, 한 설비가 두 색을 만들고 그 사이에 <b>품목 전환 5분</b>이 들어갑니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="prompt">그린 40 설비 2대 6시간</span> 을 보냅니다.</div>
      ${SHOT('ch13_req_cells', '그린 40 설비 2대 6시간 결과')}
      <div class="lab-check">설비 수가 <b>2대 고정</b>, 가용 시간이 <b>6시간</b>이 됩니다. 그런데 색이 하나뿐이라 설비 #2 는 「배정 없음」 — 경고 「설비 #2 는 배정된 작업이 없습니다」 가 나옵니다. 고정하면 비효율도 그대로 보여 줍니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="prompt">화이트 10, 레드 10, 옐로 10, 그린 10, 블루 10 만들자</span> 를 보냅니다.</div>
      ${SHOT('ch13_req_five', '5색 요청 결과')}
      <div class="lab-check">설비 4대, 한 설비에 두 색(사이에 빗금 = 전환). 우선순위 · 납기를 말하지 않았으므로 모두 3(보통)입니다.</div></li>
    <li class="lab-step"><div class="lab-do">큰 수량 <span class="prompt">레드 4000 만들자</span> 를 보냅니다.</div>
      ${SHOT('ch13_req_split', '레드 4000 나누기 결과')}
      <div class="lab-check">레드 한 색인데 설비 2대 — <b>레드 2000 (1/2)</b> · <b>레드 2000 (2/2)</b> 로 나뉘었습니다. 한 대로는 9시간 넘게 걸려 가용 시간(8시간)을 넘기 때문입니다.</div></li>
    <li class="lab-step"><div class="lab-do">무리한 요청 <span class="prompt">레드 4000, 블루 3000 설비 2대 8시간</span> 을 보냅니다.</div>
      ${SHOT('ch13_req_over', '가용 시간 초과 결과')}
      <div class="lab-check">「✖ 가용 시간 초과」, 레드 막대가 <b>빨간 점선(8시간)</b>을 넘고 가동 114 %. 경고 「가용시간 8시간을 넘습니다(최대 9.2시간). 설비를 늘리거나 수량 · 납기를 조정하세요」.</div>
      <div class="lab-tip">AI 는 무리한 계획도 초안으로 만들어 주지만 <b>경고로 알려 줍니다</b>. 그대로 시작할지 고칠지는 사람이 정합니다.</div></li>
    <li class="lab-step"><div class="lab-do">활동지 표를 보고, 문장에서 <b>설비 수 · 시간 · 배정</b>을 바꾼 말을 각각 찾아 동그라미 칩니다.</div>
      <div class="lab-check">색 + 숫자 → 수량, "설비 N대" → 설비 수 고정, "N시간" → 가용 시간, "수주 · 주문 · 미출고 · 잔량" → 수주 잔량으로 수량 채우기.</div></li>
  </ol>
  <div class="lab-result">요청 문장의 핵심어는 <b>색 · 숫자 · 설비 N대 · N시간 · 수주</b> 입니다. 배정 결과의 경고(전환 · 빈 설비 · 시간 초과)를 읽는 것이 계획 담당자의 일입니다.</div>
  <div class="lab-q">레드 4000 을 8시간 안에 끝내려면 최소 몇 대가 필요할까요? 그 근거를 화면의 숫자로 설명해 보세요.</div>
</div>`;

  const LAB_MISS = `<div class="lab" data-lab="ch13-1-c">
  <div class="lab-head"><span class="lab-badge">실습 13-3</span><b>AI 가 잘못 알아들을 때</b><span class="lab-meta">⏱ 10분 · 화면: AI 생산계획 · ERP</span></div>
  <p class="lab-goal">규칙 기반 모드가 놓치는 문장을 직접 겪어 보고, <b>결과를 확인하는 습관</b>과 잘못 만든 초안을 정리하는 법을 익힙니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="prompt">레드와 블루 각각 10박스씩</span> 을 보냅니다.</div>
      ${SHOT('ch13_req_rules_miss', '레드와 블루 각각 10박스씩 결과')}
      <div class="lab-check">규칙 기반에서는 레드 10 · 블루 10 이 아니라 <b>미출고 수주 전체(5색 · 65박스)</b> 계획이 만들어집니다. "레드와 블루 각각" 처럼 색과 숫자가 떨어져 있으면 규칙이 숫자를 찾지 못하고, 색 · 수량이 없을 때는 수주 잔량으로 채우기 때문입니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 요청을 규칙이 알아듣게 고쳐서 <span class="prompt">레드 10, 블루 10 만들자</span> 로 다시 보냅니다.</div>
      <div class="lab-check">이번에는 레드 10 · 블루 10, 설비 2대 계획이 나옵니다. <b>"색 숫자" 를 붙여 쓰는 것</b>이 규칙 모드의 요령입니다.</div></li>
    <li class="lab-step"><div class="lab-do">잘못 만들어진 첫 번째 초안을 정리합니다. 위 메뉴 <span class="ui">ERP</span> → <span class="ui">▤ 생산계획 · 배정</span> 을 엽니다.</div>
      ${SHOT('ch13_erp_plans_ai', 'ERP 생산계획 목록의 AI 계획들')}
      <div class="lab-check">왼쪽 목록에 'AI 계획' 표시가 붙은 초안들이 보입니다. 박스 수 · 설비 수 · 색 점으로 어느 것인지 구분합니다.</div></li>
    <li class="lab-step"><div class="lab-do">65박스짜리 잘못된 초안을 골라 오른쪽 위 <span class="ui">삭제</span> → 확인 창에서 <span class="ui">삭제</span> 를 누릅니다.</div>
      <div class="lab-check">목록에서 사라집니다. <b>작성 · 확정 상태만</b> 삭제할 수 있고, 생산 시작한 계획은 지우지 못합니다.</div>
      <div class="lab-tip">다른 모둠 · 다른 학생의 계획서는 지우지 않습니다. 계획서 번호(PS-…)를 확인하세요.</div></li>
    <li class="lab-step"><div class="lab-do">(교사 시연 · Claude 모드) 같은 문장 <span class="prompt">레드와 블루 각각 10박스씩</span> 을 Claude 모드에서 보냅니다.</div>
      <div class="lab-check">Claude 는 문장의 뜻을 이해해 레드 10 · 블루 10 으로 초안을 만듭니다. 그래도 결과는 <b>사람이 확인</b>합니다.</div></li>
  </ol>
  <div class="lab-result">AI 의 답은 <b>항상 확인</b>해야 합니다. 규칙 모드는 정해진 말만 알아듣고, Claude 모드는 뜻을 더 잘 이해하지만 둘 다 초안일 뿐입니다. 잘못 만든 초안은 생산 시작 전에 지웁니다.</div>
</div>`;

  // ---------------------------------------------------------------- 실습 13-2
  const LAB_EDIT = `<div class="lab" data-lab="ch13-2-a">
  <div class="lab-head"><span class="lab-badge">실습 13-4</span><b>사람이 조건을 바꿔 다시 배정하기</b><span class="lab-meta">⏱ 15분 · 화면: AI 생산계획(오른쪽 계획서) 또는 ERP 생산계획</span></div>
  <p class="lab-goal">AI 가 만든 초안을 사람이 <b>설비 수 · 품목 전환 시간 · 가용 시간</b>을 바꿔 다시 배정하고, 차트가 어떻게 바뀌는지 읽습니다.</p>
  <p class="lab-pre">실습 13-2 에서 만든 「미출고 수주 전부」 초안(5색 · 65박스)을 엽니다(ERP → ▤ 생산계획 · 배정 목록에서 선택).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">설비 배정 카드 오른쪽 위의 <b>설비 수</b>(자동) · <b>품목 전환(분)</b>(5) · <span class="ui">다시 배정</span> 을 찾습니다.</div>
      ${SHOT('ch13_alloc_panel', '설비 배정 카드의 다시 배정 버튼')}
      <div class="lab-check">설비 수는 '자동' 또는 '1대 고정 ~ 4대 고정' 중에서 고릅니다.</div></li>
    <li class="lab-step"><div class="lab-do">설비 수를 <b>2대 고정</b>으로 바꾸고 <span class="ui">다시 배정</span> 을 누릅니다.</div>
      <div class="lab-check">설비 2대에 5색이 몰려 빗금(전환)이 여러 번 생기고 완료 예상이 늘어납니다. 상단 배지가 「필요 설비 2대」 로 바뀝니다.</div></li>
    <li class="lab-step"><div class="lab-do">품목 전환을 <b>5 → 30</b> 분으로 바꾸고 다시 <span class="ui">다시 배정</span> 합니다.</div>
      <div class="lab-check">빗금 구간이 길어지고 완료 예상이 크게 늘어납니다. 색 교체가 잦은 계획은 <b>전환 시간</b>에 민감하다는 것을 확인합니다.</div></li>
    <li class="lab-step"><div class="lab-do">계획서 위쪽 <b>가용 시간(설비 1대, 시간)</b> 을 8 → 1 로 바꿉니다(설비 2대 고정 · 전환 30분은 그대로). <span class="ui">다시 배정</span> 이 눌리지 않는 것을 확인한 뒤 <span class="ui">편집 저장</span> → <span class="ui">다시 배정</span> 순서로 누릅니다.</div>
      <div class="lab-check">편집 중에는 「먼저 편집 저장하세요」 때문에 다시 배정이 막힙니다. 저장 후 다시 배정하면 「✖ 가용 시간 초과」 와 경고가 나옵니다 — 박스는 9분이면 다 만들지만, 설비 2대에 5색을 몰아 <b>30분짜리 전환</b>이 여러 번 들어가 1시간을 넘기 때문입니다.</div></li>
    <li class="lab-step"><div class="lab-do">가용 시간을 8 로, 품목 전환을 5 로, 설비 수를 <b>자동</b>으로 되돌리고 <span class="ui">편집 저장</span> → <span class="ui">다시 배정</span> 합니다.</div>
      <div class="lab-check">처음 결과(설비 4대 · 가용 시간 안)로 돌아옵니다.</div></li>
  </ol>
  <div class="lab-result">AI 초안은 출발점입니다. 사람이 현장 사정(설비 정비 중 · 교대 시간 · 색 교체 시간)을 반영해 조건을 바꾸고 <b>다시 배정</b>하면, 같은 규칙으로 계획이 즉시 다시 계산됩니다.</div>
</div>`;

  const LAB_WHATIF = `<div class="lab" data-lab="ch13-2-b">
  <div class="lab-head"><span class="lab-badge">실습 13-5</span><b>What-if: 설비 1 ~ 4대 비교하기</b><span class="lab-meta">⏱ 15분 · 화면: AI 생산계획 · ERP 생산계획</span></div>
  <p class="lab-goal">같은 주문을 설비 1 · 2 · 3 · 4대로 각각 배정해 보고, <b>완료 예상 시간과 가용 시간 안 여부</b>를 표로 비교해 몇 대가 알맞은지 정합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">AI 생산계획에서 <span class="prompt">레드 1500, 블루 1500, 그린 1500 만들자</span> 를 보냅니다.</div>
      <div class="lab-check">색 3가지 · 4500박스 계획이 나옵니다. 처음 결과의 설비 수 · 완료 예상을 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 계획서의 설비 수를 <b>1대 고정</b> → <span class="ui">다시 배정</span>. 완료 예상 · 가용 시간 안? · 경고를 표에 적습니다.</div>
      <div class="lab-check">한 대가 세 색을 모두 만들고 전환이 2번. 가용 시간을 크게 넘습니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 방법으로 <b>2대 · 3대 · 4대 고정</b>을 차례로 배정하고 표를 채웁니다.</div>
      <div class="lab-check">2대: 한 설비가 두 색(전환 1번)을 맡아 약 7시간 — 가용 시간 안에 겨우 들어옵니다. 3대: 색마다 한 대씩, 전환이 없고 약 3.4시간. 4대: 어느 색도 8시간을 넘지 않아 나누지 않으므로 설비 #4 는 「배정 없음」 경고가 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">표를 보고 「가용 시간 안에 끝나는 가장 적은 설비 수」 에 동그라미를 칩니다. 그 수로 다시 배정해 둡니다.</div>
      <div class="lab-check">답은 2대(여유가 거의 없음), 여유를 원하면 3대. 설비를 무조건 많이 쓰는 것이 아니라 <b>필요한 만큼</b> 쓰는 것이 목표입니다(남는 설비는 다른 주문 · 정비에).</div></li>
    <li class="lab-step"><div class="lab-do">(교사 시연 · Claude 모드) 같은 대화에서 <span class="prompt">방금 계획을 설비 3대로 다시 배정해 줘</span> 와 <span class="prompt">6시간 안에 끝내려면 설비 몇 대가 필요해?</span> 를 보냅니다.</div>
      <div class="lab-check">Claude 는 <b>설비 재배정</b> 도구로 같은 계획서를 다시 계산하고, 비교 결과를 표처럼 정리해 답합니다(답 아래 '조회: 설비 재배정').</div>
      <div class="lab-tip">규칙 기반 모드에서 "다시 배정해 줘" 를 보내면 같은 계획서를 고치는 대신 <b>수주 잔량으로 새 초안</b>을 만듭니다. 규칙 모드의 재배정은 사람이 오른쪽 계획서에서 합니다(실습 13-4).</div></li>
  </ol>
  <div class="lab-result">What-if 비교는 AI 생산계획의 큰 장점입니다. 몇 초 만에 여러 안을 계산해 보고, 사람은 <b>근거(완료 시간 · 경고)를 보고 결정</b>합니다.</div>
  <div class="lab-q">설비 4대가 모두 있어도 3대만 쓰는 계획을 고르는 이유에는 무엇이 있을까요? (정비 · 다른 주문 · 에너지 …)</div>
</div>`;

  const LAB_RUN = `<div class="lab" data-lab="ch13-2-c">
  <div class="lab-head"><span class="lab-badge">실습 13-6</span><b>확정 → 생산 시작 → 진행 지켜보기</b><span class="lab-meta">⏱ 15분 · 화면: AI 생산계획 · MES · 공장 라인 · 대시보드</span></div>
  <p class="lab-goal">작은 계획 하나를 사람이 확정하고 생산을 시작한 뒤, MES 와 라인에서 계획대로 움직이는지 확인합니다.</p>
  <p class="lab-pre">교사의 안내에 따라 <b>모둠당 한 번만</b> 생산을 시작합니다(공장은 모두가 함께 씁니다).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">AI 생산계획에서 작은 요청 <span class="prompt">블루 16 만들자</span> 를 보냅니다.</div>
      <div class="lab-check">설비 1대 · 블루 16박스 · 약 2분 계획이 열립니다.</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 아래 <span class="ui">생산 계획 완료(확정)</span> 을 누릅니다.</div>
      ${SHOT('ch13_confirm_dialog', '생산 계획 확정 확인 창')}
      <div class="lab-check">「생산 계획을 확정할까요?」 확인 창 — 검토를 마친 계획으로 표시하며, 확정 후에도 편집하면 다시 작성 중으로 돌아갑니다. <span class="ui">확정</span> 을 누르면 상태가 <b>✔ 확정</b> 으로 바뀝니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">▶ 생산 시작</span> 을 누르고 확인 창의 설명을 끝까지 읽습니다.</div>
      ${SHOT('ch13_start_dialog', '생산 시작 확인 창')}
      <div class="lab-check">생산오더 생성 → BOM 자재 가용성(ATP) 확인 · 예약 → MES 로 내려보냄 → 작업지시 · 공정 → 설비가 대기열 순서로 생산. 필요 설비가 지금 쓰는 대수보다 많으면 「사용 설비를 n대 → m대로 늘리기」 체크가 함께 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">확인 창의 <span class="ui">생산 시작</span> 을 누릅니다.</div>
      <div class="lab-check">상태가 <b>생산 지시됨</b> 으로 바뀌고 「✔ … 생산 시작 — 「생산오더」와 MES 디스패치 보드에서 진행을 볼 수 있습니다」 가 나옵니다. 자재가 부족하면 「자재 가용성 부족 — 릴리스 보류」 표가 나오고 시작되지 않습니다(8 · 15차시에서 해결).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> → <span class="ui">▦ 디스패치 보드</span> 를 엽니다.</div>
      ${SHOT('mes_dispatch', 'MES 디스패치 보드')}
      <div class="lab-check">배정된 설비 칸에 블루 작업지시 카드가 진행 중(▶)으로 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 에서 그 설비 시점(<span class="ui">설비 #n</span>)을 골라 1분 정도 지켜봅니다.</div>
      <div class="lab-check">컨베이어에 <b>블루</b> 공작물이 흐르고 박스가 채워집니다. AI 가 만든 계획이 사람의 확정을 거쳐 <b>물리 설비의 움직임</b>이 되었습니다 — 피지컬 AI 의 한 바퀴입니다.</div></li>
    <li class="lab-step"><div class="lab-do">약 2~3분 뒤 <span class="ui">대시보드</span> 의 설비 가동 간트와 계획서 진행률을 봅니다.</div>
      <div class="lab-check">계획한 16박스가 끝나면 작업지시가 완료되고, 그 설비는 마지막 작업지시를 마친 뒤 대기 상태로 돌아갑니다.</div></li>
  </ol>
  <div class="lab-result">AI 는 <b>초안</b>, 사람은 <b>확정 · 시작</b>, PLC 와 설비는 <b>실행</b>. 각자의 역할이 나뉘어 있어 AI 가 틀려도 현장이 바로 움직이지 않습니다.</div>
</div>`;

  const QUIZ1 = [
    { q: 'AI 생산계획에서 <b>설비 몇 대에 무엇을 얼마나</b> 배정할지 계산하는 것은?',
      options: ['AI 가 그때그때 마음대로 정한다', '서버의 설비 배정 규칙(필요 설비 수 · 긴 작업 먼저 · 전환 5분 …)', '사용자가 직접 막대를 그린다', 'PLC 가 계산한다'],
      answer: 1, explain: 'AI 는 계획 초안 작성 도구를 부르고, 실제 배정 계산은 서버의 같은 규칙이 합니다. 그래서 누가 만들어도 같은 규칙으로 계산됩니다.' },
    { q: '「그린 40 설비 2대 6시간」 을 보냈더니 경고 「설비 #2 는 배정된 작업이 없습니다」 가 나왔습니다. 이유는?',
      options: ['그린이 재고에 없어서', '색이 하나라 한 설비로 충분한데 설비 수를 2대로 고정했기 때문', '6시간이 너무 짧아서', 'AI 가 오류를 냈기 때문'],
      answer: 1, explain: '한 설비는 한 번에 한 색만 만들고, 40박스는 짧아 나눌 필요가 없습니다. 고정한 두 번째 설비가 놀게 되어 경고가 납니다.' },
    { q: '규칙 기반 모드에서 수량을 말하지 않고 「미출고 수주 전부 처리해 줘」 라고 하면?',
      options: ['아무 계획도 만들지 않는다', 'ERP 요약에서 색상별 수주 잔량을 읽어 수량을 채운다', '모든 색을 100박스씩 만든다', '어제 계획을 복사한다'],
      answer: 1, explain: '답 아래 "조회: ERP 요약" 이 보입니다. 수주 잔량으로 수량을 채운 초안이 만들어집니다.' },
    { q: '설비 배정 차트의 <b>빗금 구간</b>이 뜻하는 것은?',
      options: ['고장 시간', '품목 전환(색 교체) 시간', '점심 시간', '가용 시간 초과'],
      answer: 1, explain: '한 설비가 다른 색으로 바꿀 때 전환 시간(기본 5분)이 들어가며, 차트에 빗금으로 표시됩니다.' },
  ];
  const QUIZ2 = [
    { q: '계획서의 가용 시간을 바꾼 직후 <span class="ui">다시 배정</span> 이 눌리지 않습니다. 어떻게 해야 할까요?',
      options: ['AI 에게 부탁한다', '먼저 편집 저장을 누른 뒤 다시 배정한다', '페이지를 새로 고친다', '계획서를 삭제한다'],
      answer: 1, explain: '저장하지 않은 변경이 있으면 「먼저 편집 저장하세요」 때문에 다시 배정이 막힙니다.' },
    { q: 'AI 생산계획의 초안이 실제 설비를 움직이게 되는 순서로 옳은 것은?',
      options: ['초안 → 설비 즉시 기동', '초안 → 사람의 확정 → 사람의 생산 시작 → MES 작업지시 → 설비 기동', '초안 → AI 의 생산 시작 → PLC', '초안 → 다음 날 자동 시작'],
      answer: 1, explain: 'AI 는 확정 · 생산 시작을 하지 않습니다. 사람이 두 단계를 눌러야 MES 작업지시가 내려가고 설비가 기동합니다.' },
    { q: '규칙 기반 모드에서 「방금 계획을 설비 3대로 다시 배정해 줘」 를 보내면 어떻게 될까요?',
      options: ['같은 계획서를 3대로 재배정한다', '색 · 수량이 없으므로 수주 잔량으로 설비 3대짜리 새 초안을 만든다', '오류가 나고 아무 일도 없다', '생산이 시작된다'],
      answer: 1, explain: '규칙 모드는 매번 새 초안을 만듭니다. 같은 계획서의 재배정은 Claude 모드의 설비 재배정 도구나, 사람이 계획서의 다시 배정으로 합니다.' },
    { q: '생산 시작 확인 창에서 「사용 설비를 2대 → 3대로 늘리기」 체크가 나타나는 경우는?',
      options: ['자재가 부족할 때', '계획의 필요 설비 수가 지금 사용 중인 설비 수보다 많을 때', '가용 시간이 남을 때', '항상 나타난다'],
      answer: 1, explain: '필요 설비가 더 많으면 생산 시작과 함께 설비 대수를 늘릴 수 있게 체크 상자가 나타납니다.' },
  ];

  PY_COURSE.addChapter({
    id: 'ch13', no: '13', title: 'AI 생산계획', subtitle: 'AI Production Planning',
    summary: '말로 지시하면 AI 가 생산계획서 초안과 설비 배정을 만드는 과정을 다양한 요청 문장으로 실습하고, 조건을 바꿔 비교한 뒤 사람이 확정 · 생산 시작합니다.',
    goals: ['AI 생산계획이 요청 문장 → 도구 → 배정 규칙 → 초안 순서로 동작함을 설명할 수 있다',
      '요청 문장으로 색 · 수량 · 설비 수 · 시간 · 수주 기준을 지정하고 결과를 검증할 수 있다',
      '조건을 바꿔 재배정 · 비교하고, 사람이 확정 · 생산 시작하는 절차를 수행할 수 있다'],
    sections: [
      {
        id: 'ch13-1', title: 'AI 로 계획 초안 만들기', minutes: 50,
        goals: ['AI 생산계획의 동작 흐름(도구 · 배정 규칙)을 설명한다', '여러 요청 문장으로 초안을 만들고 결과를 표로 정리한다', '규칙 모드의 한계를 알고 결과를 확인 · 정리한다'],
        flow: [['도입 — 계획 담당자의 아침', 5], ['개념 — 흐름 · 배정 규칙', 10], ['실습 13-1 첫 초안', 10], ['실습 13-2 문장 실험', 15], ['실습 13-3 · 정리 · 퀴즈', 10]],
        content: [
          { type: 'p', html: '아침마다 계획 담당자는 "오늘 무엇을 몇 개, 어느 설비에서, 어떤 순서로 만들까?" 를 정합니다. 주문이 많고 색이 다양할수록 계산이 복잡해집니다. 이 플랫폼의 <b>AI 생산계획</b>은 사람이 <b>말로 요청</b>하면 생산계획서 초안과 설비 배정을 몇 초 만에 만들어 줍니다. 단, <b>확정 · 생산 시작은 사람이 합니다.</b>' },
          { type: 'figure', html: SHOT('ch13_plan_page', 'AI 생산계획 화면'), caption: '위 메뉴 「AI 생산계획」 — 왼쪽 계획 대화, 오른쪽 생산계획서' },
          { type: 'h', text: 'AI 생산계획은 어떻게 동작할까?' },
          { type: 'figure', html: FIG_FLOW, caption: '요청 문장 → AI 가 도구를 골라 조회 · 초안 작성 → 서버가 배정 규칙으로 계산 → 사람이 검토 · 확정 · 시작' },
          { type: 'list', ordered: true, items: [
            '<b>요청</b>: "화이트 12, 옐로 8 만들자", "미출고 수주 전부 오늘 처리" 처럼 평소 말로 씁니다.',
            '<b>AI 의 도구 사용</b>: 필요하면 ERP 요약 · 수주 · 재고 · MRP 를 조회하고, <b>계획 초안 작성</b> 도구로 계획서를 만듭니다. 수정 요청에는 <b>설비 재배정</b> 도구를 씁니다(Claude 모드).',
            '<b>서버의 배정 규칙</b>: 몇 대를 돌릴지 · 설비별로 무엇을 얼마나 · 어떤 순서로 만들지는 AI 가 아니라 서버의 정해진 규칙이 계산합니다. AI 가 숫자를 지어내지 않게 하기 위해서입니다.',
            '<b>사람의 검토</b>: 초안의 수량 · 우선순위 · 납기 · 설비 수를 고치고 다시 배정할 수 있습니다.',
            '<b>확정 · 생산 시작</b>: 사람이 누르면 생산오더 → MES 작업지시 → 설비 기동으로 이어집니다.',
          ] },
          { type: 'table', head: ['AI 생산계획이 쓰는 도구', '화면에 보이는 이름', '하는 일'], rows: [
            ['erp_summary', 'ERP 요약', '색상별 수주 잔량 · 납기 임박 · 자재 부족'],
            ['list_sales_orders', '수주', '미출고 수주와 납기 · 우선순위'],
            ['get_inventory · get_mrp', '재고 · MRP', '완제품 · 자재 재고, 부족 자재'],
            ['list_products · get_factory_status · list_schedules', '제품 목록 · 설비 상태 · 생산계획서', '만들 수 있는 색, 설비 대수 · 상태, 기존 계획'],
            ['create_schedule_draft', '계획 초안 작성', '계획서 초안을 만들고 설비 배정을 계산(쓰기 — 초안까지만)'],
            ['reallocate_schedule', '설비 재배정', '설비 수 · 가용 시간 · 전환 시간을 바꿔 다시 계산'],
          ], caption: '답 아래 작은 글씨 "조회: …" 에 이번 답에서 쓴 도구가 표시됩니다. 확정 · 생산 시작 도구는 아예 없습니다.' },
          { type: 'h', text: '설비 배정 규칙 — 서버가 계산하는 방법' },
          { type: 'figure', html: FIG_ALLOC, caption: '설비 수 → 나누기 → 긴 작업부터 배정 → 설비 안 순서' },
          { type: 'figure', html: FIG_READ, caption: '오른쪽 「설비 배정」 차트 읽는 법' },
          { type: 'h', text: '규칙 기반 모드와 Claude 모드' },
          { type: 'table', head: ['', '⚙ 규칙 기반(키 없음)', '✦ Claude(키 등록)'], rows: [
            ['문장 이해', '"색 숫자" · "설비 N대" · "N시간" · 수주 관련 말만 찾음', '문장의 뜻을 이해("각각", "레드를 먼저", "재고 빼고")'],
            ['우선순위 · 납기', '모두 보통(3), 납기 없음', '"레드 급해", "내일까지" → 우선순위 · 납기 반영'],
            ['수정 요청', '매번 새 초안을 만듦', '같은 계획서를 설비 재배정 도구로 다시 계산'],
            ['답의 모양', '정해진 형식(설비별 색 · 수량 · 시간 · 경고)', '표처럼 요약하고 검토 포인트를 설명'],
            ['외부 연결', '없음(인터넷 불필요)', 'Anthropic API 호출(키 · 인터넷 필요)'],
            ['공통', '초안까지만 · 배정 계산은 서버 규칙 · 확정 · 시작은 사람', '같음'],
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_FIRST },
          { type: 'figure', html: LAB_REQ },
          { type: 'figure', html: LAB_MISS },
          { type: 'callout', kind: 'tip', title: '좋은 요청 문장 만들기', html: '<ul><li><b>색과 숫자를 붙여 쓰기</b>: "레드 20, 블루 10" (O) / "레드와 블루 각각 10" (규칙 모드 X)</li><li><b>조건은 숫자로</b>: "설비 2대", "6시간"</li><li><b>근거가 필요하면 수주라고 말하기</b>: "미출고 수주 전부", "주문 잔량만큼"</li><li><b>결과를 반드시 확인</b>: 답의 설비별 수량이 내가 말한 것과 같은지, 경고가 있는지</li></ul>' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: ERP 에 예시 수주(6차시)가 들어 있어야 「미출고 수주 전부」 가 동작합니다. 수주가 없으면 "만들 제품을 찾지 못했습니다" 라는 안내가 나옵니다.</li><li><b>공유 공장</b>: 이 교시는 <b>초안만</b> 만듭니다(데이터만 생기고 설비는 움직이지 않음). 초안이 많이 쌓이므로 실습 13-3 에서 각자 정리하게 합니다.</li><li><b>Claude 모드 시연</b>: 교사 PC 에만 키를 등록(14차시)해 실습 13-3 ⑤ 를 보여 주고, 규칙 모드와 같은 문장의 결과를 비교합니다. 키 화면은 학생에게 보이지 않게 합니다.</li><li><b>자주 막히는 곳</b>: 오른쪽 계획서가 비어 있음 → 답 아래 <b>계획서 보기</b> 를 누르게 합니다.</li><li><b>확인 기준</b>: 실습 13-2 표 5줄 이상(요청 · 설비 수 · 예상 소요 · 가용 시간 안 · 경고), 질문 답 "최소 2대(4000박스 ≈ 9.2시간)".</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: 'AI 로 계획 초안 만들기', subtitle: '말로 요청 → 도구 → 배정 규칙 → 초안', notes: '<p>도입 발문: "오늘 5색 65박스를 설비 4대로 만든다면 어떻게 나누겠어요?" 1분 동안 손으로 계산해 보게 한 뒤 AI 로 몇 초 만에 해 봅니다.</p>' },
          { layout: 'diagram', title: 'AI 생산계획 화면', html: SHOT('ch13_plan_page', 'AI 생산계획 화면'), caption: '왼쪽 계획 대화 · 오른쪽 계획서 · 모드 표시',
            notes: '<p>모드 배지(규칙 기반 / Claude)를 먼저 가리킵니다. 오늘 실습은 규칙 기반으로 충분합니다.</p>' },
          { layout: 'diagram', title: 'AI 생산계획의 흐름', html: FIG_FLOW,
            notes: '<p>핵심: AI 는 <b>도구</b>를 부르고, 배정 숫자는 <b>서버 규칙</b>이 계산합니다. 확정 · 시작 도구는 아예 없습니다 — 💬 "왜 그렇게 설계했을까요?"</p>' },
          { layout: 'diagram', title: '설비 배정 규칙', html: FIG_ALLOC,
            notes: '<p>1 → 4 순서로 설명. 숫자 하나: 박스 1개 약 8.24초, 설비 1대 시간당 약 437박스.</p>' },
          { layout: 'diagram', title: '첫 초안 — 화이트 12, 옐로 8', html: SHOT('ch13_req_colors', '첫 초안 결과'),
            notes: '<p>시연 후 답의 "조회: 계획 초안 작성" 과 계획서 보기를 가리킵니다. 실습 13-1 시작(10분).</p>' },
          { layout: 'table', title: '실습 13-2 · 요청 문장 실험', head: ['요청', '보면 알 수 있는 것'], rows: [
            ['미출고 수주 전부 오늘 처리', '수주 잔량으로 수량 채우기 · 5색 전환'], ['그린 40 설비 2대 6시간', '설비 · 시간 고정 · 빈 설비 경고'], ['5색 각 10', '한 설비 두 색 · 빗금'], ['레드 4000', '긴 색 나누기 (1/2) (2/2)'], ['레드 4000, 블루 3000 설비 2대 8시간', '가용 시간 초과 · 점선']],
            notes: '<p>15분. 모둠마다 표를 채워 칠판에 붙입니다. 같은 문장이면 결과도 같아야 한다는 점(규칙 계산)을 확인시킵니다.</p>' },
          { layout: 'diagram', title: '차트 읽는 법', html: FIG_READ,
            notes: '<p>빗금 = 전환, 빨간 점선 = 가용 시간, 가동 % 가 100 을 넘으면 초과.</p>' },
          { layout: 'two', title: '규칙 기반 vs Claude', left: { title: '⚙ 규칙 기반', bullets: ['색 숫자 · 설비 N대 · N시간 · 수주', '우선순위 · 납기 없음', '수정 = 새 초안', '인터넷 불필요'] }, right: { title: '✦ Claude', bullets: ['문장의 뜻 이해', '우선순위 · 납기 반영', '같은 계획서 재배정', '키 · 인터넷 필요'] },
            notes: '<p>둘 다 초안까지만, 배정은 서버 규칙이라는 공통점을 강조합니다.</p>' },
          { layout: 'diagram', title: '실습 13-3 · 잘못 알아들을 때', html: SHOT('ch13_req_rules_miss', '레드와 블루 각각 결과'),
            notes: '<p>💬 "레드 10, 블루 10 을 원했는데 65박스가 나왔다. 그대로 시작했다면?" → 확인 습관. 잘못된 초안은 ERP 에서 삭제.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[1].q, options: QUIZ1[1].options, answer: QUIZ1[1].answer, explain: QUIZ1[1].explain, notes: '<p>정답 후 "설비를 고정하면 비효율도 그대로 보여 준다" 를 판서.</p>' },
          { layout: 'summary', title: '정리', bullets: ['요청 문장 → 도구 → 서버 배정 규칙 → 초안', '핵심어: 색 숫자 · 설비 N대 · N시간 · 수주', '경고(전환 · 빈 설비 · 시간 초과)를 읽는다', 'AI 결과는 항상 확인, 잘못된 초안은 정리'],
            notes: '<p>다음 시간: 조건을 바꿔 재배정 · 비교하고, 실제로 확정 · 생산 시작까지.</p>' },
        ],
      },
      {
        id: 'ch13-2', title: '재배정 · 비교 · 확정', minutes: 50,
        goals: ['설비 수 · 전환 시간 · 가용 시간을 바꿔 다시 배정한다', '설비 대수별 what-if 를 비교해 근거로 결정한다', '확정 → 생산 시작 → MES · 라인 확인 절차를 수행한다'],
        flow: [['복습 · 도입', 5], ['실습 13-4 다시 배정', 12], ['실습 13-5 what-if', 13], ['실습 13-6 확정 · 시작', 15], ['정리 · 퀴즈', 5]],
        content: [
          { type: 'p', html: '지난 시간에는 AI 가 초안을 만드는 법을 봤습니다. 실제 계획 업무는 그다음부터입니다. 설비 하나가 정비 중이라면? 오늘은 6시간만 돌릴 수 있다면? 색 교체가 더 오래 걸린다면? 이번 교시에서는 <b>조건을 바꿔 다시 배정</b>하고, <b>여러 안을 비교</b>한 뒤, <b>사람이 확정하고 생산을 시작</b>합니다.' },
          { type: 'h', text: '다시 배정하는 두 가지 방법' },
          { type: 'table', head: ['방법', '어디서', '무엇을 바꾸나'], rows: [
            ['사람이 직접', '계획서의 <span class="ui">설비 수</span>(자동 · n대 고정) · <span class="ui">품목 전환(분)</span> · 가용 시간 · 수량 · 우선순위 · 납기 → <span class="ui">편집 저장</span> → <span class="ui">다시 배정</span>', '모든 조건'],
            ['AI 에게 부탁(Claude 모드)', '같은 대화에서 "설비 3대로 다시 배정해 줘", "전환 10분으로"', '설비 수 · 가용 시간 · 전환 시간(설비 재배정 도구)'],
          ], caption: '두 방법 모두 같은 서버 배정 규칙으로 계산합니다. 규칙 기반 모드에서는 사람이 직접 하는 방법을 씁니다.' },
          { type: 'figure', html: SHOT('ch13_alloc_panel', '설비 배정 카드'), caption: '설비 배정 카드 — 설비 수 · 품목 전환(분) · 다시 배정, 아래에 생산 계획 완료(확정) · ▶ 생산 시작' },
          { type: 'h', text: '계획서의 상태' },
          { type: 'table', head: ['상태', '뜻', '할 수 있는 일'], rows: [
            ['✎ 작성', '초안(AI 또는 사람이 작성)', '편집 · 다시 배정 · 확정 · 생산 시작 · 삭제'],
            ['✔ 확정', '검토를 마친 계획(편집하면 다시 작성으로)', '다시 배정 · 생산 시작 · 삭제'],
            ['생산 지시됨', '생산 시작 — 생산오더 · MES 작업지시가 내려감', '진행 보기(ERP 생산오더 · MES 디스패치)'],
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_EDIT },
          { type: 'figure', html: LAB_WHATIF },
          { type: 'figure', html: LAB_RUN },
          { type: 'h', text: '요청 문장 사례집 — Claude 모드에서 더 해 볼 것' },
          { type: 'table', head: ['요청 문장', '기대 결과', '확인할 곳'], rows: [
            ['<span class="prompt">레드 30 급해. 우선순위 1로, 블루 20 은 모레까지</span>', '레드 우선순위 1 · 블루 납기 +2일, 같은 설비면 레드가 먼저', '계획서 표의 우선순위 · 납기 칸'],
            ['<span class="prompt">완제품 재고는 빼고 미출고 수주만큼만 만들자</span>', '재고 조회 후 (잔량 − 재고) 만큼', '답 아래 조회: 수주 · 재고, ERP 재고 화면'],
            ['<span class="prompt">방금 계획 설비 3대로 다시 배정</span>', '같은 PS 번호, 설비 3대', '조회: 설비 재배정'],
            ['<span class="prompt">6시간 안에 끝나려면 몇 대 필요해?</span>', '대수별 재배정 비교 요약', '답의 표, 계획서 차트'],
            ['<span class="prompt">색 교체가 15분 걸려. 반영해서 다시 짜 줘</span>', '전환 15분으로 재배정', '품목 전환(분) 칸'],
            ['<span class="prompt">자재 부족한 색은 빼고 계획 세워 줘</span>', 'MRP 조회 후 부족한 색 제외 · 이유 설명', '조회: MRP, ERP 자재(MRP)'],
            ['<span class="prompt">계획 확정하고 바로 시작해</span>', '<b>거절</b> — 확정 · 시작은 화면에서 사람이 하라고 안내', '버튼은 사람만 누름'],
          ], caption: '규칙 기반 모드에서는 우선순위 · 납기 · "빼고" 같은 조건을 이해하지 못합니다. 결과를 확인하고, 필요하면 계획서를 직접 고칩니다.' },
          { type: 'callout', kind: 'warn', title: 'AI 가 계획을 시작하지 않는 이유', html: '생산 시작은 자재 예약 · 작업지시 · 설비 기동으로 이어지는 <b>물리 세계의 행동</b>입니다. 잘못 시작하면 자재가 묶이고 설비가 엉뚱한 색을 만듭니다. 그래서 이 플랫폼은 AI 에게 <b>초안 도구만</b> 주고, 확정 · 시작 버튼은 사람만 누를 수 있게 했습니다. 이것이 3차시에서 배운 "AI 는 권고, 사람과 PLC 가 결정" 원칙입니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 실습 13-6 은 실제로 설비가 돌아갑니다. 모둠 수만큼 작은 계획(16박스 내외)만 시작하게 하고, 시작 전에 교사에게 확인받게 합니다. 자재가 부족하면 8차시 방법(부족분 구매 발주 → 입고)으로 미리 채워 둡니다.</li><li><b>공유 공장</b>: 여러 모둠이 동시에 시작하면 디스패치 보드에 작업이 순서대로 쌓입니다 — 오히려 "대기열" 을 설명하기 좋은 장면입니다.</li><li><b>Claude 모드</b>: 사례집은 교사 시연용입니다. 규칙 모드 결과와 나란히 보여 주며 "더 똑똑해도 확인은 사람" 을 강조합니다.</li><li><b>자주 막히는 곳</b>: 다시 배정이 회색 → 편집 저장 먼저. 생산 시작 후 아무 일도 없음 → 자재 부족 표가 나왔는지, MES 디스패치 보드에 카드가 있는지 확인.</li><li><b>확인 기준</b>: 실습 13-5 비교 표(1대 초과 · 2대 약 7시간 · 3대 약 3.4시간 · 4대 빈 설비 경고), 선택한 대수와 근거 한 줄, 실습 13-6 디스패치 보드 · 라인 관찰 기록.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '재배정 · 비교 · 확정', subtitle: '초안에서 실제 생산까지', notes: '<p>복습 발문: "AI 가 만든 초안의 숫자는 누가 계산했나요?" → 서버의 배정 규칙.</p>' },
          { layout: 'table', title: '다시 배정하는 두 가지 방법', head: ['방법', '바꾸는 것'], rows: [['사람: 계획서에서 편집 저장 → 다시 배정', '설비 수 · 전환 · 가용 시간 · 수량 · 우선순위 · 납기'], ['AI(Claude): "설비 3대로 다시"', '설비 수 · 가용 시간 · 전환 시간']],
            notes: '<p>규칙 기반 모드에서 "다시 배정해 줘" 는 새 초안이 된다는 점을 짚습니다.</p>' },
          { layout: 'diagram', title: '설비 배정 카드', html: SHOT('ch13_alloc_panel', '설비 배정 카드'),
            notes: '<p>시연: 2대 고정 → 다시 배정 → 빗금 증가. 실습 13-4 시작(12분).</p>' },
          { layout: 'bullets', title: '실습 13-5 · What-if', bullets: ['레드 · 블루 · 그린 각 1500', '1대 · 2대 · 3대 · 4대 고정 → 다시 배정', '완료 예상 · 가용 시간 안? · 경고를 표로', '가용 시간 안의 가장 적은 대수 선택'],
            notes: '<p>💬 "4대가 있는데 3대만 쓰는 이유는?" → 정비 · 다른 주문 · 에너지 · 사람.</p>' },
          { layout: 'table', title: '계획서의 상태', head: ['상태', '뜻'], rows: [['✎ 작성', '초안'], ['✔ 확정', '검토 완료(편집하면 다시 작성)'], ['생산 지시됨', '생산오더 · MES 작업지시']],
            notes: '<p>확정 없이도 생산 시작은 가능하지만, 검토 표시를 위해 확정을 거치게 지도합니다.</p>' },
          { layout: 'diagram', title: '생산 시작 확인 창', html: SHOT('ch13_start_dialog', '생산 시작 확인 창'),
            notes: '<p>확인 창 문장을 함께 읽습니다: 생산오더 → ATP 확인 · 예약 → MES → 작업지시 → 설비. 자재 부족이면 시작되지 않음.</p>' },
          { layout: 'diagram', title: '진행 확인 — 디스패치 보드', html: SHOT('mes_dispatch', 'MES 디스패치 보드'),
            notes: '<p>실습 13-6(15분). 모둠당 한 번만 시작. 라인에서 그 색 공작물이 흐르는지 확인.</p>' },
          { layout: 'bullets', title: 'Claude 모드 사례집 (교사 시연)', bullets: ['"레드 30 급해, 우선순위 1"', '"재고는 빼고 수주만큼"', '"방금 계획 설비 3대로"', '"6시간 안에 끝나려면 몇 대?"', '"확정하고 바로 시작해" → 거절'],
            notes: '<p>마지막 문장에서 AI 가 거절하는 장면을 꼭 보여 줍니다. 규칙 모드와 결과 비교.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[1].q, options: QUIZ2[1].options, answer: QUIZ2[1].answer, explain: QUIZ2[1].explain, notes: '<p>"AI 는 초안, 사람은 확정 · 시작, 설비는 실행" 을 판서.</p>' },
          { layout: 'summary', title: '정리', bullets: ['조건(설비 수 · 전환 · 시간)을 바꿔 다시 배정', 'What-if 비교 → 근거로 결정', '확정 → 생산 시작은 사람', 'MES 디스패치 · 라인에서 실행 확인'],
            notes: '<p>다음 차시: AI 도우미 — ERP · MES 데이터를 묻고 답을 검증하기.</p>' },
        ],
      },
    ],
  });
})();
