/* 06 ERP ① 기준정보와 수주 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_ERP = `<svg viewBox="0 0 720 230" role="img" aria-label="ERP 의 흐름: 기준정보와 수주에서 생산계획, 생산오더, 자재와 구매, 재고, 출고로 이어지고 MES 와 연결된다">
  ${ARROW('c06a1')}
  <rect x="10" y="20" width="130" height="60" rx="10" class="p1"/><text x="75" y="46" text-anchor="middle" class="tx-w">기준정보</text><text x="75" y="66" text-anchor="middle" class="tx-w">품목 · BOM · 거래처</text>
  <rect x="10" y="130" width="130" height="60" rx="10" class="p1"/><text x="75" y="156" text-anchor="middle" class="tx-w">수주</text><text x="75" y="176" text-anchor="middle" class="tx-w">고객 · 수량 · 납기</text>
  <rect x="200" y="75" width="120" height="60" rx="10" class="p2s"/><text x="260" y="101" text-anchor="middle" class="tx-b">생산계획</text><text x="260" y="121" text-anchor="middle" class="tx-m">설비 배정(7차시)</text>
  <rect x="370" y="75" width="120" height="60" rx="10" class="p3s"/><text x="430" y="101" text-anchor="middle" class="tx-b">생산오더</text><text x="430" y="121" text-anchor="middle" class="tx-m">자재 가용성</text>
  <rect x="540" y="20" width="170" height="50" rx="10" class="p4s"/><text x="625" y="50" text-anchor="middle" class="tx-b">MES 작업지시(9차시)</text>
  <rect x="540" y="90" width="170" height="50" rx="10" class="p5s"/><text x="625" y="120" text-anchor="middle" class="tx-b">자재 · 구매 · 재고(8차시)</text>
  <rect x="540" y="160" width="170" height="50" rx="10" class="p2s"/><text x="625" y="190" text-anchor="middle" class="tx-b">출고 → 고객</text>
  <line x1="141" y1="55" x2="197" y2="95" class="ln" stroke-width="2" marker-end="url(#c06a1)"/>
  <line x1="141" y1="160" x2="197" y2="118" class="ln" stroke-width="2" marker-end="url(#c06a1)"/>
  <line x1="321" y1="105" x2="367" y2="105" class="ln" stroke-width="2" marker-end="url(#c06a1)"/>
  <line x1="491" y1="95" x2="537" y2="50" class="ln" stroke-width="2" marker-end="url(#c06a1)"/>
  <line x1="491" y1="110" x2="537" y2="113" class="ln" stroke-width="2" marker-end="url(#c06a1)"/>
  <line x1="491" y1="125" x2="537" y2="180" class="ln" stroke-width="2" marker-end="url(#c06a1)"/>
  <text x="75" y="222" text-anchor="middle" class="tx-m">이번 차시</text>
</svg>`;

  const FIG_BOM = `<svg viewBox="0 0 720 220" role="img" aria-label="BOM: 완제품 박스 1개는 같은 색 공작물 4개와 포장박스 1개로 만들어진다">
  ${ARROW('c06a2')}
  <rect x="250" y="15" width="220" height="60" rx="12" class="p1"/><text x="360" y="42" text-anchor="middle" class="tx-w">FG-BOX4-RED</text><text x="360" y="62" text-anchor="middle" class="tx-w">완제품 박스(레드 ×4) · BOX</text>
  <rect x="90" y="140" width="230" height="60" rx="12" class="p2s"/><text x="205" y="166" text-anchor="middle" class="tx-b">WP-RECT-RED × 4</text><text x="205" y="186" text-anchor="middle" class="tx-m">공작물 60×30×15 레드 · 원자재</text>
  <rect x="400" y="140" width="230" height="60" rx="12" class="p4s"/><text x="515" y="166" text-anchor="middle" class="tx-b">PK-BOX × 1</text><text x="515" y="186" text-anchor="middle" class="tx-m">포장박스(4구 트레이) · 포장재</text>
  <line x1="320" y1="77" x2="220" y2="137" class="ln" stroke-width="2" marker-end="url(#c06a2)"/>
  <line x1="400" y1="77" x2="500" y2="137" class="ln" stroke-width="2" marker-end="url(#c06a2)"/>
  <text x="225" y="112" text-anchor="middle" class="tx-m">소요량 4</text>
  <text x="500" y="112" text-anchor="middle" class="tx-m">소요량 1</text>
</svg>`;

  // ---------------------------------------------------------------- 실습 6-1
  const LAB_IMPORT = `<div class="lab" data-lab="ch06-1-a">
  <div class="lab-head"><span class="lab-badge">실습 6-1</span><b>예시 기준정보 가져오기 (검증 → 적용 → 이력)</b><span class="lab-meta">⏱ 12분 · 화면: ERP → 데이터 가져오기</span></div>
  <p class="lab-goal">실제 ERP 도입 때 데이터 이관을 하듯, 예시 파일의 품목 · BOM · 거래처 · 기초 재고를 <b>먼저 검증하고</b> 적용합니다.</p>
  <p class="lab-pre">실습 프로그램 실행, 위 메뉴 <b>ERP</b></p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">ERP</span> → 왼쪽 <span class="ui">⇩ 데이터 가져오기</span> 를 엽니다.</div>
      ${SHOT('erp_data_mark', 'ERP 데이터 가져오기 — 예시 버튼 강조')}
      <div class="lab-check">예시 버튼 두 개(<span class="ui">📄 예시: ERP 기준정보(품목 · BOM · 거래처 · 기초 재고)</span>, <span class="ui">📄 예시: 이번 주 고객 수주(수요)</span>)와 <b>가져오기 이력</b> 표가 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">📄 예시: ERP 기준정보(…)</span> 를 누릅니다.</div>
      ${SHOT('ch06_data_preview', '검증 결과와 적용 버튼')}
      <div class="lab-check"><b>검증 결과 · erp_master.example.json ✔ 적용 가능</b> 카드에 품목 · BOM · 고객 · 공급사 · 재고(실사)별로 <b>신규 · 변경 · 동일</b> 건수가 나옵니다.</div>
      <div class="lab-tip">검증(미리 보기)은 데이터를 바꾸지 않습니다. 아래 안내문 "아직 반영하지 않았습니다 …" 를 확인하세요.</div></li>
    <li class="lab-step"><div class="lab-do">표를 읽고 활동지에 적습니다: 품목 몇 개, BOM 몇 개, 고객 · 공급사 몇 곳, 재고(실사) 몇 줄인지.</div>
      <div class="lab-check">예시 파일은 품목 11 · BOM 5 · 고객 4 · 공급사 2 · 재고 11 줄입니다. 이미 가져온 적이 있으면 대부분 <b>동일</b>로 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">카드 오른쪽 위 <span class="ui">적용</span> 을 누릅니다.</div>
      ${SHOT('ch06_data_applied', '적용 완료와 가져오기 이력')}
      <div class="lab-check"><b>✔ 적용 완료</b> 가 표시되고, <b>가져오기 이력</b> 맨 위에 시각 · 파일명 · 사용자 · 건수가 한 줄 추가됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 예시 버튼을 한 번 더 눌러 검증 결과를 다시 봅니다(적용은 하지 않아도 됩니다).</div>
      <div class="lab-check">이번에는 거의 모두 <b>동일</b>입니다. 같은 파일을 다시 적용해도 <b>중복으로 생기지 않습니다</b>(코드 기준).</div></li>
    <li class="lab-step"><div class="lab-do">예시 버튼 옆 <span class="ui">내려받기</span> 링크로 예시 파일(JSON)을 내려받아 메모장으로 열어 봅니다(선택).</div>
      <div class="lab-check">파일 맨 앞에 형식 이름 <code>minifactory.erp-master.v1</code> 과 품목 · BOM 목록이 보입니다. 같은 형식으로 만든 파일은 <span class="ui">📂 파일 선택(JSON)…</span> 으로 가져올 수 있습니다.</div></li>
  </ol>
  <div class="lab-result">기준정보 이관은 <b>검증(미리 보기) → 적용 → 이력</b> 순서입니다. 적용 전에 무엇이 새로 생기고 바뀌는지 먼저 확인하는 습관이 실제 ERP 운영의 기본입니다.</div>
  <div class="lab-q">검증 없이 바로 적용하는 기능만 있었다면 어떤 사고가 날 수 있을까요?</div>
</div>`;

  // ---------------------------------------------------------------- 실습 6-2
  const LAB_MASTER = `<div class="lab" data-lab="ch06-1-b">
  <div class="lab-head"><span class="lab-badge">실습 6-2</span><b>품목 · BOM 읽기</b><span class="lab-meta">⏱ 13분 · 화면: ERP → 기준정보</span></div>
  <p class="lab-goal">품목 표와 BOM 표를 읽고, 완제품 박스 하나를 만들 때 필요한 자재를 계산합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">ERP 왼쪽 <span class="ui">⚙ 기준정보</span> 를 엽니다.</div>
      ${SHOT('ch06_master_forms', '기준정보 — 품목 카드와 입력 줄 강조')}
      <div class="lab-check">왼쪽 <b>품목</b> 카드(위쪽 입력 줄 + 품목 표), 오른쪽 <b>BOM (자재 구성)</b> 카드가 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">품목 표에서 <b>유형</b> 열을 보고 품목을 세 무리로 나눕니다.</div>
      <div class="lab-check">완제품 <code>FG-BOX4-색</code> 5종(단위 BOX), 원자재 공작물 <code>WP-RECT-색</code> 5종(EA), 포장재 <code>PK-BOX</code> 1종 = 11개.</div></li>
    <li class="lab-step"><div class="lab-do">원자재 · 포장재 줄의 <b>안전재고</b> 와 <b>리드타임</b> 을 읽습니다.</div>
      <div class="lab-check">공작물은 안전재고 80 · 리드타임 3일, 포장박스는 안전재고 50 · 리드타임 2일입니다(예시 값). 8차시 MRP 계산에 쓰입니다.</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 <b>BOM (자재 구성)</b> 표에서 부모 품목 <code>FG-BOX4-RED</code> 줄을 찾습니다.</div>
      ${SHOT('ch06_master_bom', 'BOM 카드 강조')}
      <div class="lab-check">구성 품목 <code>WP-RECT-RED</code> 소요량 4, <code>PK-BOX</code> 소요량 1 — 위 BOM 그림과 같습니다.</div></li>
    <li class="lab-step"><div class="lab-do">활동지에 계산합니다: <b>레드 박스 15개</b>를 만들려면 레드 공작물과 포장박스가 몇 개 필요한가?</div>
      <div class="lab-check">레드 공작물 15 × 4 = <b>60개</b>, 포장박스 15 × 1 = <b>15개</b>. 이 계산을 ERP 가 자동으로 하는 것이 <b>BOM 전개</b>입니다(7 · 8차시).</div></li>
    <li class="lab-step"><div class="lab-do">품목 카드 맨 위 입력 줄(코드 · 품명 · 유형 · 단위 · <span class="ui">품목 등록</span>)과 BOM 입력 줄(부모 품목 · 구성 품목 · 소요량 · <span class="ui">BOM 등록</span>)을 살펴만 봅니다.</div>
      <div class="lab-check">입력하고 등록 버튼을 누르면 <b>바로 저장</b>됩니다(확인 창 없음). 이번 실습에서는 누르지 않습니다.</div>
      <div class="lab-tip">새 품목은 보통 데이터 가져오기 파일로 한꺼번에 넣고, 화면 입력은 한두 개를 고칠 때 씁니다.</div></li>
  </ol>
  <div class="lab-result">완제품 1박스 = 같은 색 공작물 4개 + 포장박스 1개. BOM 은 생산계획 → 자재 소요 → 구매로 이어지는 모든 계산의 출발점입니다.</div>
</div>`;

  // ---------------------------------------------------------------- 실습 6-3
  const LAB_DEMAND = `<div class="lab" data-lab="ch06-2-a">
  <div class="lab-head"><span class="lab-badge">실습 6-3</span><b>예시 고객 수주 가져오기</b><span class="lab-meta">⏱ 8분 · 화면: ERP → 데이터 가져오기 · 영업 · 수주</span></div>
  <p class="lab-goal">이번 주 고객 수주(수요) 예시 파일을 검증 · 적용하고, 수주 목록에 들어온 것을 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">⇩ 데이터 가져오기</span> 에서 <span class="ui">📄 예시: 이번 주 고객 수주(수요)</span> 를 누릅니다.</div>
      ${SHOT('ch06_demand_preview', '수주 예시 검증 결과')}
      <div class="lab-check"><b>검증 결과 · erp_demand.example.json</b> 에 수주 4건이 나옵니다. 이미 적용한 적이 있으면 "⚠ 수주 …: 이미 있음(건너뜀)" 이 줄마다 표시됩니다.</div>
      <div class="lab-tip">수주는 <b>고객 발주 번호</b>(예: HB-2611-001) 기준으로 한 번만 들어갑니다. 같은 파일을 다시 적용해도 수주가 두 번 생기지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">적용</span> 을 누릅니다.</div>
      ${SHOT('ch06_demand_applied', '수주 적용 완료')}
      <div class="lab-check"><b>✔ 적용 완료</b>, 가져오기 이력 맨 위에 <code>erp_demand.example.json · 수주 4</code> 줄이 추가됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">왼쪽 <span class="ui">₩ 영업 · 수주</span> 를 엽니다. 아래 <b>수주 조회</b> 표를 봅니다.</div>
      ${SHOT('erp_orders', '영업 · 수주 화면')}
      <div class="lab-check">수주번호 · 고객 · 품목(색) · 수량 · 출고 · 금액 · 우선 · 납기 · 상태가 보입니다. 예시 수주는 <code>SO-DEMO-…</code> 번호이고 상태 <b>○ 접수</b>입니다.</div></li>
    <li class="lab-step"><div class="lab-do">출고가 끝난 수주(<b>✔ 출고 완료</b>)와 아직 남은 수주(<b>○ 접수</b>)를 구분해 각각 몇 건인지 셉니다.</div>
      <div class="lab-check">출고 열이 수량과 같으면 출고 완료, 0 이면 아직 미출고입니다. 미출고 수주가 생산계획의 재료가 됩니다.</div></li>
  </ol>
  <div class="lab-result">고객 수주는 <b>수요</b>입니다. 수주가 들어오면 ERP 는 "언제까지 무엇을 몇 개" 만들어야 하는지 알게 되고, 이것이 다음 차시 생산계획의 출발점이 됩니다.</div>
</div>`;

  // ---------------------------------------------------------------- 실습 6-4
  const LAB_ORDER = `<div class="lab" data-lab="ch06-2-b">
  <div class="lab-head"><span class="lab-badge">실습 6-4</span><b>수주 직접 등록하기</b><span class="lab-meta">⏱ 10분 · 화면: ERP → 영업 · 수주</span></div>
  <p class="lab-goal">전화로 받은 주문을 수주로 입력하고, 수주 목록에서 확인합니다.</p>
  <p class="lab-pre">주문 내용 — 고객: <b>새솔과학상사</b> · 품목: <b>완제품 박스(블루 ×4)</b> · 수량 <b>12박스</b> · 납기 <b>오늘부터 4일 뒤</b> · 우선순위 <b>2</b></p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">₩ 영업 · 수주</span> 맨 위 <b>수주 입력</b> 줄을 찾습니다.</div>
      <div class="lab-check">입력 칸: <b>고객 · 품목 · 수량(박스) · 납기 · 우선순위</b> 와 <span class="ui">수주 등록</span> 버튼.</div></li>
    <li class="lab-step"><div class="lab-do"><b>고객</b>에서 새솔과학상사, <b>품목</b>에서 완제품 박스(블루 ×4)를 고릅니다.</div>
      <div class="lab-check">품목 목록에는 <b>완제품</b>(박스 5색)만 나옵니다. 공작물 같은 원자재는 수주할 수 없습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>수량(박스)</b> 12, <b>납기</b>는 달력에서 날짜 선택, <b>우선순위</b> 2 를 고릅니다.</div>
      ${SHOT('ch06_order_form', '수주 입력 줄 — 값 입력 후 수주 등록 강조')}
      <div class="lab-check">우선순위는 1(긴급) ~ 5. 숫자가 작을수록 먼저 만듭니다(설비 배정에 반영).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">수주 등록</span> 을 누릅니다.</div>
      ${SHOT('ch06_order_added', '새 수주가 목록 맨 위에 추가됨')}
      <div class="lab-check"><b>수주 조회</b> 표 맨 위에 새 수주(SO-0000…)가 <b>○ 접수</b> 상태로 생기고, 금액이 단가 × 수량으로 계산되어 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">새 수주 줄 오른쪽 끝의 <span class="ui">생산계획서로 →</span> 버튼을 확인만 합니다(누르지 않음).</div>
      ${SHOT('ch06_order_toplan', '생산계획서로 버튼 강조')}
      <div class="lab-check">이 버튼은 이 수주의 잔량으로 생산계획서를 만들어 줍니다 — 7차시에서 사용합니다. 출고 완료 수주는 버튼이 흐리게 비활성입니다.</div></li>
  </ol>
  <div class="lab-result">수주는 고객 · 품목 · 수량 · 납기 · 우선순위로 이루어지고, 등록하면 바로 ERP 전체(개요 · 생산계획 · AI 도우미)에서 보입니다.</div>
  <div class="lab-q">같은 고객이 같은 날 같은 주문을 두 번 전화했다면 직접 입력과 파일 가져오기 중 어느 쪽이 중복을 막아 줄까요?</div>
</div>`;

  // ---------------------------------------------------------------- 실습 6-5
  const LAB_OVERVIEW = `<div class="lab" data-lab="ch06-2-c">
  <div class="lab-head"><span class="lab-badge">실습 6-5</span><b>ERP 개요로 미출고 · 납기 확인하기</b><span class="lab-meta">⏱ 10분 · 화면: ERP → 개요 · AI 도우미</span></div>
  <p class="lab-goal">ERP 개요 화면의 숫자로 "지금 무엇이 급한지" 를 파악하고, AI 도우미의 답과 비교합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">ERP 왼쪽 <span class="ui">▦ 개요</span> 를 엽니다. 맨 위 숫자 칸들을 읽습니다.</div>
      ${SHOT('ch06_overview_mark', 'ERP 개요 — 색상별 수주 잔량 강조')}
      <div class="lab-check">진행 중 수주 · 수주 잔량(박스) · 납기 임박 · 재고 금액 · 자재 부족 품목 · 오늘 출고 칸이 보입니다. 방금 등록한 블루 12박스 때문에 수주 잔량이 늘었습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>색상별 수주 잔량</b> 막대에서 가장 많이 남은 색을 찾습니다.</div>
      <div class="lab-check">막대 길이와 숫자로 색별 남은 박스 수를 비교할 수 있습니다. 생산계획을 세울 때 가장 먼저 보는 정보입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>납기 임박</b> 칸의 건수를 확인하고, <span class="ui">수주 보기 →</span> 를 눌러 해당 수주를 수주 표에서 찾습니다.</div>
      <div class="lab-check">납기가 가까운(2일 이내) 미출고 수주입니다. 지연 건수도 함께 표시됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">개요 화면 오른쪽 아래 <span class="ui">✦ AI 도우미</span> 를 열고 예시 버튼 <span class="prompt">미출고 수주와 납기 임박 알려줘</span> 를 눌러 보냅니다.</div>
      ${SHOT('erp_ai_answer', 'ERP AI 도우미 답변')}
      <div class="lab-check">AI 가 수주 데이터를 조회해 미출고 수주 · 잔량 · 납기를 요약합니다. API 키가 없으면 "규칙 기반 도우미" 로 답하지만 조회한 숫자는 같습니다.</div></li>
    <li class="lab-step"><div class="lab-do">AI 답의 숫자(미출고 건수 · 잔량)를 개요 화면 숫자와 비교해 맞는지 확인하고 <span class="ui">✕ 닫기</span> 합니다.</div>
      <div class="lab-check">숫자가 같다면 AI 가 실제 데이터를 조회했다는 뜻입니다. <b>AI 의 답은 항상 화면으로 검증</b>합니다(14차시).</div></li>
  </ol>
  <div class="lab-result">ERP 개요는 영업 · 생산 · 자재 · 출고 상황을 한눈에 보여 줍니다. 같은 질문을 AI 도우미에게 말로 물어볼 수도 있지만, 답은 화면의 숫자로 확인합니다.</div>
</div>`;

  const QUIZ1 = [
    { q: '데이터 가져오기에서 예시 버튼을 누르면 일어나는 일은?',
      options: ['바로 데이터가 저장된다', '검증(미리 보기) 결과만 보여 주고, 「적용」을 눌러야 반영된다', '기존 데이터가 모두 지워진다', 'MES 로 바로 전송된다'], answer: 1,
      explain: '검증 → 적용 → 이력 순서입니다. 검증은 데이터를 바꾸지 않습니다.' },
    { q: '완제품 <code>FG-BOX4-RED</code> 10박스를 만들 때 필요한 레드 공작물 수는?',
      options: ['10개', '20개', '40개', '50개'], answer: 2, explain: 'BOM: 박스 1 = 공작물 4 + 포장박스 1 → 10 × 4 = 40개.' },
    { q: '같은 기준정보 파일을 두 번 적용하면?',
      options: ['품목이 두 배가 된다', '코드 기준으로 비교해 중복이 생기지 않는다', '오류가 나서 적용되지 않는다', '이전 데이터가 삭제된다'], answer: 1,
      explain: '코드(수주는 고객 발주 번호) 기준이라 다시 적용해도 중복되지 않습니다.' },
    { q: '품목 표의 <b>리드타임</b>이 뜻하는 것은?',
      options: ['생산에 걸리는 시간', '구매 발주 후 입고까지 걸리는 기간', '출고 후 배송 기간', '검사 시간'], answer: 1,
      explain: '자재를 주문하면 들어오기까지 걸리는 기간입니다. MRP(8차시)에서 발주 시점을 정할 때 씁니다.' },
  ];
  const QUIZ2 = [
    { q: '수주 입력의 <b>품목</b> 목록에 나오는 것은?',
      options: ['모든 품목', '완제품(박스 5색)만', '공작물만', '포장박스만'], answer: 1, explain: '고객은 완제품을 주문합니다. 공작물 · 포장박스는 자재입니다.' },
    { q: '우선순위 1 의 의미는?',
      options: ['가장 낮음', '긴급 — 가장 먼저 생산', '취소 예정', '출고 완료'], answer: 1,
      explain: '1 = 긴급. 설비 배정에서 같은 설비 안의 순서를 정할 때 우선순위가 먼저 반영됩니다.' },
    { q: 'ERP 개요의 <b>색상별 수주 잔량</b>이 가장 쓸모 있는 때는?',
      options: ['재고 조정할 때', '생산계획을 세울 때 어떤 색을 얼마나 만들지 정할 때', '품목을 등록할 때', '로봇을 정비할 때'], answer: 1,
      explain: '남은 수요를 색별로 보여 주므로 계획 수량을 정하는 출발점이 됩니다.' },
    { q: 'AI 도우미가 "미출고 수주 3건" 이라고 답했다. 가장 먼저 할 일은?',
      options: ['그대로 믿고 보고한다', '영업 · 수주 화면이나 개요의 숫자로 맞는지 확인한다', 'AI 키를 지운다', '수주를 모두 삭제한다'], answer: 1,
      explain: 'AI 의 답은 항상 원래 화면의 데이터로 검증합니다.' },
  ];

  PY_COURSE.addChapter({
    id: 'ch06', no: '06', title: 'ERP ① 기준정보와 수주', subtitle: 'Master Data · Sales Orders',
    summary: '예시 파일로 품목 · BOM · 거래처 · 재고와 고객 수주를 불러오고, 기준정보와 수주를 직접 등록 · 조회합니다.',
    goals: ['기준정보(품목 · BOM · 거래처 · 재고)의 의미와 관계를 설명할 수 있다',
      '데이터 가져오기로 예시 파일을 검증 → 적용하고 이력을 확인할 수 있다',
      '수주를 직접 등록하고 ERP 개요에서 미출고 · 납기 상황을 읽을 수 있다'],
    sections: [
      {
        id: 'ch06-1', title: '기준정보 가져오기와 조회', minutes: 50,
        goals: ['ERP 의 흐름과 기준정보의 역할을 말한다', '예시 기준정보를 검증 → 적용한다', 'BOM 으로 필요한 자재를 계산한다'],
        flow: [['도입 — ERP 란', 7], ['개념 — 기준정보 · BOM', 10], ['실습 6-1 가져오기', 13], ['실습 6-2 품목 · BOM', 13], ['정리 · 퀴즈', 7]],
        content: [
          { type: 'figure', html: SHOT('erp_overview', 'ERP 개요 화면'), caption: 'ERP — 왼쪽 메뉴: 개요 · 영업 · 수주 · 생산계획 · 생산오더 · 자재 · 재고 · 출고 · 기준정보 · 데이터 가져오기 · 연동' },
          { type: 'p', html: '<mark>ERP(Enterprise Resource Planning)</mark> 는 회사의 영업 · 생산계획 · 자재 · 재고 · 출고를 하나의 데이터로 관리하는 시스템입니다. 공장 현장을 직접 움직이지는 않지만 "무엇을 · 얼마나 · 언제까지" 만들지 정해 <b>MES</b>(현장 실행, 9차시)에 내려보냅니다. 이 플랫폼의 ERP 는 실제 기업처럼 <b>기준정보 → 수주 → 생산계획 → 생산오더 → MES</b> 순서로 움직입니다.' },
          { type: 'figure', html: FIG_ERP, caption: 'ERP 의 흐름 — 이번 차시는 맨 왼쪽(기준정보 · 수주)' },
          { type: 'h', text: '기준정보(마스터 데이터)' },
          { type: 'table', head: ['기준정보', '내용', '이 플랫폼의 예'], rows: [
            ['품목', '회사가 다루는 모든 물건 — 코드 · 이름 · 유형 · 단위 · 단가 · 안전재고 · 리드타임', '완제품 FG-BOX4-색 5종, 공작물 WP-RECT-색 5종, 포장박스 PK-BOX'],
            ['BOM', '완제품 하나를 만드는 데 필요한 자재와 수량', 'FG-BOX4-RED = WP-RECT-RED × 4 + PK-BOX × 1'],
            ['거래처', '고객(수주) · 공급사(구매)', '고객 4곳 · 공급사 2곳'],
            ['기초 재고', '시작할 때 창고에 있는 수량(실사)', '공작물 · 포장박스 · 완제품 재고'],
          ] },
          { type: 'figure', html: FIG_BOM, caption: 'BOM(Bill of Materials) — 색만 다르고 구조는 5색 모두 같습니다' },
          { type: 'callout', kind: 'info', title: '왜 파일로 가져올까?', html: '실제 회사가 ERP 를 새로 도입하면 기존 엑셀 · 시스템의 품목 수천 개를 한 번에 옮겨야 합니다(데이터 이관). 그래서 이 플랫폼도 <b>파일 → 검증(미리 보기) → 적용 → 이력</b> 순서를 그대로 따릅니다. 예시 파일에는 학습용으로 <b>그린 공작물을 일부러 적게</b> 넣어 두었습니다 — 7 · 8차시에서 자재 부족을 직접 겪어 봅니다.' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_IMPORT },
          { type: 'figure', html: LAB_MASTER },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 처음 설치한 상태라면 기준정보가 시드(예시와 같은 값)로 들어 있어 검증 결과가 대부분 <b>동일</b>로 나옵니다. "신규" 가 보이게 하고 싶으면 새 데이터 폴더(data\\ 를 다른 이름으로 옮긴 뒤 실행)로 시작합니다.</li><li><b>공용 서버</b>: 적용은 여러 번 해도 중복이 생기지 않으므로 학생 모두 해도 안전합니다. 반면 품목 등록 · BOM 등록은 바로 저장되므로 이번 차시에서는 누르지 않게 합니다.</li><li><b>자주 막히는 곳</b>: 예시 버튼을 눌렀는데 "적용" 이 없음 → 검증 오류가 있는 경우(파일 형식) / 이력이 안 보임 → 화면을 아래로 스크롤.</li><li><b>확인 기준</b>: 6-1 건수 표, 6-2 레드 15박스 자재 계산(공작물 60 · 포장박스 15).</li><li><b>발문</b>: "BOM 이 틀려 있으면 어떤 일이 생길까?" → 자재가 모자라거나 남음, 원가 계산 오류.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: '기준정보 가져오기와 조회', subtitle: 'ERP ① — 품목 · BOM · 거래처 · 재고', notes: '<p>3부 ERP · MES 의 시작. 오늘은 ERP 의 "기초 공사" 인 기준정보를 다룹니다.</p>' },
          { layout: 'diagram', title: 'ERP 의 흐름', html: FIG_ERP, notes: '<p>💬 "주문이 들어왔는데 BOM 이 없다면 무엇을 알 수 없을까?" → 필요한 자재 · 원가.</p>' },
          { layout: 'table', title: '기준정보 네 가지', head: ['기준정보', '예'], rows: [['품목', 'FG-BOX4-색 · WP-RECT-색 · PK-BOX'], ['BOM', '박스 = 공작물 4 + 포장박스 1'], ['거래처', '고객 4 · 공급사 2'], ['기초 재고', '실사 수량']],
            notes: '<p>품목 코드 규칙(FG = 완제품, WP = 공작물, PK = 포장재)을 짚습니다.</p>' },
          { layout: 'diagram', title: 'BOM', html: FIG_BOM, notes: '<p>즉석 퀴즈: 블루 7박스 → 블루 공작물 28 · 포장박스 7.</p>' },
          { layout: 'diagram', title: '검증 → 적용 → 이력', html: SHOT('ch06_data_preview', '검증 결과'),
            notes: '<p>"검증은 저장하지 않는다" 를 강조. 신규 · 변경 · 동일 용어 설명.</p>' },
          { layout: 'bullets', title: '실습 6-1 · 기준정보 가져오기 (13분)', bullets: ['ERP → ⇩ 데이터 가져오기', '📄 예시: ERP 기준정보 → 검증 결과 읽기', '적용 → 이력 확인', '다시 검증 → 모두 동일(중복 없음)', '(선택) 내려받기로 파일 열어 보기'],
            notes: '<p>교사 시연 후 학생 진행. 단계마다 ☑ 체크.</p>' },
          { layout: 'bullets', title: '실습 6-2 · 품목 · BOM (13분)', bullets: ['⚙ 기준정보: 품목 표 · BOM 표', '유형별 분류: 완제품 · 원자재 · 포장재', '안전재고 · 리드타임 읽기', 'FG-BOX4-RED BOM 확인', '레드 15박스 자재 계산'],
            notes: '<p>등록 버튼은 바로 저장 — 누르지 않도록 다시 안내.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[1].q, options: QUIZ1[1].options, answer: QUIZ1[1].answer, explain: QUIZ1[1].explain, notes: '<p>BOM 계산을 손으로 한 번 더.</p>' },
          { layout: 'summary', title: '정리', bullets: ['ERP = 무엇을 · 얼마나 · 언제까지', '기준정보: 품목 · BOM · 거래처 · 기초 재고', '이관: 검증 → 적용 → 이력, 중복 없음', '박스 1 = 공작물 4 + 포장박스 1'],
            notes: '<p>다음 교시: 수주 가져오기 · 직접 등록 · 개요.</p>' },
        ],
      },
      {
        id: 'ch06-2', title: '수주 등록과 조회', minutes: 50,
        goals: ['예시 수주를 가져오고 중복 방지 규칙을 확인한다', '수주를 직접 등록한다', 'ERP 개요 · AI 도우미로 미출고 · 납기를 파악하고 검증한다'],
        flow: [['도입 — 주문이 들어오면', 5], ['실습 6-3 예시 수주', 9], ['실습 6-4 직접 등록', 12], ['실습 6-5 개요 · AI 도우미', 14], ['정리 · 퀴즈', 10]],
        content: [
          { type: 'h', text: '수주(Sales Order)란' },
          { type: 'p', html: '<mark>수주</mark>는 고객에게서 받은 주문입니다. 수주 한 건에는 <b>고객 · 품목(완제품) · 수량 · 납기 · 우선순위</b> 가 들어 있고, 출고가 끝나기 전까지 <b>잔량</b>(수량 − 출고)이 남습니다. ERP 는 미출고 수주의 잔량을 모아 생산계획을 세우고(7차시), 적재함이 출고되면 수주의 출고 수량을 자동으로 늘립니다.' },
          { type: 'table', head: ['수주 상태', '뜻'], rows: [['○ 접수', '아직 모두 출고되지 않음(잔량 있음)'], ['✔ 출고 완료', '수량만큼 출고됨']] },
          { type: 'table', head: ['입력 방법', '언제 쓰나', '중복 방지'], rows: [
            ['데이터 가져오기(파일)', '여러 건을 한꺼번에(고객 발주서 묶음, 다른 시스템에서 옮길 때)', '고객 발주 번호 기준 1회만'],
            ['영업 · 수주 화면 입력', '전화 · 메일로 받은 한두 건', '없음 — 같은 내용을 두 번 누르면 두 건'],
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_DEMAND },
          { type: 'figure', html: LAB_ORDER },
          { type: 'figure', html: LAB_OVERVIEW },
          { type: 'callout', kind: 'more', title: '📘 더 알아보기 — 수주에서 출고까지', html: '이 플랫폼에서는 출고 단위가 <b>적재함(박스 5개)</b>입니다. 생산이 끝난 적재함이 출고될 때마다 MES 실적 → ERP 입고 · 출고 확정이 자동으로 일어나 수주의 출고 수량이 늘어납니다. 출고 화면(<span class="ui">⇪ 출고</span>)에서 직접 출고를 등록할 수도 있습니다(8차시).' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 6-4 의 고객 · 품목은 예시 기준정보에 있는 값입니다. 다른 고객 · 색으로 바꿔도 됩니다.</li><li><b>공용 서버 주의</b>: 6-4 는 누를 때마다 수주가 하나씩 생깁니다. 반 전체가 한 서버를 쓰면 수주가 30건 늘어나므로, 모둠당 1건만 등록하게 하거나 학생마다 수량을 다르게 해 자기 수주를 찾게 합니다. 지우는 기능은 없으므로 연습용 수주는 7차시 계획 · 생산에 그대로 활용합니다.</li><li><b>자주 막히는 곳</b>: 수주 등록이 안 됨 → 고객 · 품목을 고르지 않음(필수) / 납기를 비워도 등록됨(납기 없음 표시 "-").</li><li><b>AI 도우미</b>: 키가 없으면 규칙 기반 답(앞에 안내 문구). 숫자 비교 단계가 핵심이므로 어느 모드든 그대로 진행합니다.</li><li><b>확인 기준</b>: 자기 수주번호를 적어 냄, 개요 숫자와 AI 답 비교 결과(일치/불일치) 한 줄.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '수주 등록과 조회', subtitle: 'ERP ① — 수요가 들어오는 곳', notes: '<p>지난 교시: 기준정보. 오늘은 수요(수주).</p>' },
          { layout: 'table', title: '수주 한 건', head: ['항목', '예'], rows: [['고객', '새솔과학상사'], ['품목', '완제품 박스(블루 ×4)'], ['수량 · 납기', '12박스 · 4일 뒤'], ['우선순위', '2 (1 = 긴급)']],
            notes: '<p>잔량 = 수량 − 출고. 잔량이 생산계획의 재료.</p>' },
          { layout: 'two', title: '파일 가져오기 vs 직접 입력', left: { title: '파일', bullets: ['여러 건 한꺼번에', '고객 발주 번호로 중복 방지'] }, right: { title: '직접 입력', bullets: ['한두 건', '바로 저장 — 두 번 누르면 두 건'] },
            notes: '<p>💬 "실수로 두 번 등록되면 공장에서는 무슨 일이?" → 과잉 생산.</p>' },
          { layout: 'bullets', title: '실습 6-3 · 예시 수주 (9분)', bullets: ['📄 예시: 이번 주 고객 수주 → 검증', '"이미 있음(건너뜀)" 의미', '적용 → 이력', '영업 · 수주: 접수 / 출고 완료 세기'],
            notes: '<p>이미 적용된 서버면 건너뜀 경고가 나오는 것이 정상.</p>' },
          { layout: 'diagram', title: '수주 직접 등록', html: SHOT('ch06_order_form', '수주 입력'), notes: '<p>필수: 고객 · 품목. 우선순위 1~5.</p>' },
          { layout: 'bullets', title: '실습 6-4 · 직접 등록 (12분)', bullets: ['고객 · 품목(완제품만) 선택', '수량 · 납기 · 우선순위', '수주 등록 → 목록 맨 위', '생산계획서로 → 버튼 확인(7차시)'],
            notes: '<p>공용 서버면 모둠당 1건.</p>' },
          { layout: 'diagram', title: 'ERP 개요', html: SHOT('ch06_overview_mark', 'ERP 개요'), notes: '<p>숫자 칸 하나씩 읽기: 진행 중 수주 · 잔량 · 납기 임박 · 재고 금액 · 자재 부족 · 오늘 출고.</p>' },
          { layout: 'bullets', title: '실습 6-5 · 개요 · AI 도우미 (14분)', bullets: ['개요 숫자 읽기', '색상별 수주 잔량 · 납기 임박', '✦ AI 도우미: 「미출고 수주와 납기 임박 알려줘」', 'AI 답 ↔ 화면 숫자 비교'],
            notes: '<p>"AI 의 답은 화면으로 검증한다" 가 오늘의 핵심 습관.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[3].q, options: QUIZ2[3].options, answer: QUIZ2[3].answer, explain: QUIZ2[3].explain, notes: '<p>14차시(AI 도우미)의 복선.</p>' },
          { layout: 'summary', title: '정리', bullets: ['수주 = 고객 · 품목 · 수량 · 납기 · 우선순위', '파일은 중복 방지, 직접 입력은 즉시 저장', '개요: 잔량 · 납기 임박 · 자재 부족', 'AI 도우미 답은 화면으로 검증'],
            notes: '<p>다음 차시: 생산계획서와 설비 배정, 생산오더.</p>' },
        ],
      },
    ],
  });
})();
