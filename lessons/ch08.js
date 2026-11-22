/* 08 ERP ③ 자재 · 구매 · 재고 · 출고 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_MRP = `<svg viewBox="0 0 700 270" role="img" aria-label="MRP 계산 흐름: 생산계획의 박스 수를 BOM 으로 전개해 총소요를 구하고, 현재고와 발주잔을 빼고 안전재고를 더해 부족분을 구한 뒤 발주 단위로 올려 발주 제안을 만든다">
  ${ARROW('c08a1')}
  <rect x="10" y="20" width="150" height="60" rx="12" class="p1s"/><text x="85" y="46" text-anchor="middle" class="tx-b">생산계획</text><text x="85" y="66" text-anchor="middle" class="tx-m">레드 박스 20개</text>
  <rect x="200" y="20" width="150" height="60" rx="12" class="p2s"/><text x="275" y="46" text-anchor="middle" class="tx-b">BOM 전개</text><text x="275" y="66" text-anchor="middle" class="tx-m">박스 1 = 공작물 4 + 박스 1</text>
  <rect x="390" y="20" width="150" height="60" rx="12" class="p3s"/><text x="465" y="46" text-anchor="middle" class="tx-b">총소요</text><text x="465" y="66" text-anchor="middle" class="tx-m">공작물 80 · 박스 20</text>
  <line x1="162" y1="50" x2="196" y2="50" class="ln" stroke-width="2" marker-end="url(#c08a1)"/>
  <line x1="352" y1="50" x2="386" y2="50" class="ln" stroke-width="2" marker-end="url(#c08a1)"/>
  <rect x="120" y="120" width="460" height="56" rx="12" class="card-bg"/>
  <text x="350" y="145" text-anchor="middle" class="tx-b">부족 = 총소요 − (현재고 + 발주잔) + 안전재고</text>
  <text x="350" y="165" text-anchor="middle" class="tx-m">0 보다 작으면 부족 없음(✔)</text>
  <line x1="465" y1="82" x2="420" y2="116" class="ln" stroke-width="2" marker-end="url(#c08a1)"/>
  <rect x="200" y="205" width="300" height="56" rx="12" class="p1"/>
  <text x="350" y="230" text-anchor="middle" class="tx-w">발주 제안 = 부족분을 발주 단위(100개)로 올림</text>
  <text x="350" y="250" text-anchor="middle" class="tx-w">→ 부족분 구매 발주 → 입고</text>
  <line x1="350" y1="178" x2="350" y2="201" class="ln" stroke-width="2" marker-end="url(#c08a1)"/>
</svg>`;

  const FIG_STOCK = `<svg viewBox="0 0 700 250" role="img" aria-label="재고가 움직이는 네 가지 경우: 구매 입고로 늘고, 생산 때 자재 출고로 줄고, 완제품 입고로 늘고, 고객 출고로 준다. 재고 조정은 실사 차이를 맞춘다">
  ${ARROW('c08a2')}
  <rect x="270" y="85" width="160" height="80" rx="14" class="p1"/><text x="350" y="120" text-anchor="middle" class="tx-w">재고</text><text x="350" y="142" text-anchor="middle" class="tx-w">(현재고)</text>
  <rect x="10" y="20" width="200" height="56" rx="12" class="p2s"/><text x="110" y="44" text-anchor="middle" class="tx-b">입고 (+)</text><text x="110" y="64" text-anchor="middle" class="tx-m">구매 발주 입고 · 완제품 입고</text>
  <rect x="490" y="20" width="200" height="56" rx="12" class="p4s"/><text x="590" y="44" text-anchor="middle" class="tx-b">자재 출고 (−)</text><text x="590" y="64" text-anchor="middle" class="tx-m">생산에 쓴 공작물 · 박스</text>
  <rect x="490" y="175" width="200" height="56" rx="12" class="p5s"/><text x="590" y="199" text-anchor="middle" class="tx-b">고객 출고 (−)</text><text x="590" y="219" text-anchor="middle" class="tx-m">완제품 박스 출고</text>
  <rect x="10" y="175" width="200" height="56" rx="12" class="p3s"/><text x="110" y="199" text-anchor="middle" class="tx-b">재고 조정 (±)</text><text x="110" y="219" text-anchor="middle" class="tx-m">실사 차이 · 파손</text>
  <line x1="212" y1="55" x2="268" y2="100" class="ln" stroke-width="2" marker-end="url(#c08a2)"/>
  <line x1="432" y1="100" x2="488" y2="55" class="ln" stroke-width="2" marker-end="url(#c08a2)"/>
  <line x1="432" y1="150" x2="488" y2="195" class="ln" stroke-width="2" marker-end="url(#c08a2)"/>
  <line x1="212" y1="200" x2="268" y2="155" class="ln" stroke-width="2" marker-end="url(#c08a2)"/>
</svg>`;

  const FIG_SHIP = `<svg viewBox="0 0 700 200" role="img" aria-label="자동 출고 흐름: 적재함이 출고되면 MES 실적이 등록되고, 검사 LOT 이 합격이면 생산계획과 연결된 수주 라인으로 ERP 출고가 만들어져 확정된다">
  ${ARROW('c08a3')}
  <rect x="5" y="60" width="120" height="70" rx="12" class="p1s"/><text x="65" y="90" text-anchor="middle" class="tx-b">적재함 출고</text><text x="65" y="110" text-anchor="middle" class="tx-m">5박스 · LOT</text>
  <rect x="150" y="60" width="120" height="70" rx="12" class="p2s"/><text x="210" y="90" text-anchor="middle" class="tx-b">MES 실적</text><text x="210" y="110" text-anchor="middle" class="tx-m">적재함 1개 = 1건</text>
  <rect x="295" y="60" width="120" height="70" rx="12" class="p3s"/><text x="355" y="90" text-anchor="middle" class="tx-b">검사 LOT</text><text x="355" y="110" text-anchor="middle" class="tx-m">합격 / 불합격</text>
  <rect x="440" y="60" width="120" height="70" rx="12" class="p4s"/><text x="500" y="90" text-anchor="middle" class="tx-b">ERP 출고</text><text x="500" y="110" text-anchor="middle" class="tx-m">수주 라인 연결</text>
  <rect x="585" y="60" width="110" height="70" rx="12" class="p1"/><text x="640" y="90" text-anchor="middle" class="tx-w">출고 확정</text><text x="640" y="110" text-anchor="middle" class="tx-w">재고 −</text>
  <line x1="127" y1="95" x2="146" y2="95" class="ln" stroke-width="2" marker-end="url(#c08a3)"/>
  <line x1="272" y1="95" x2="291" y2="95" class="ln" stroke-width="2" marker-end="url(#c08a3)"/>
  <line x1="417" y1="95" x2="436" y2="95" class="ln" stroke-width="2" marker-end="url(#c08a3)"/>
  <line x1="562" y1="95" x2="581" y2="95" class="ln" stroke-width="2" marker-end="url(#c08a3)"/>
  <text x="355" y="160" text-anchor="middle" class="tx-m">불합격이면 출고하지 않습니다(품질 판정 대기) · 수주와 연결되지 않은 계획이면 자동 출고하지 않습니다</text>
</svg>`;

  // ---------------------------------------------------------------- 실습 블록
  const LAB_MRP = `<div class="lab" data-lab="ch08-1-a">
  <div class="lab-head"><span class="lab-badge">실습 8-1</span><b>MRP 표 읽기 — 무엇이 얼마나 부족한가</b><span class="lab-meta">⏱ 12분 · 화면: ERP → 자재(MRP) · 구매</span></div>
  <p class="lab-goal">MRP 표의 열을 하나씩 읽고, 부족한 자재와 그 이유를 말할 수 있게 합니다.</p>
  <p class="lab-pre">6차시에서 예시 기준정보 · 수주를 가져왔고, 7차시에서 생산계획서를 하나 이상 만든 상태.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">ERP</span> → 왼쪽 <span class="ui">⛁ 자재(MRP) · 구매</span> 를 엽니다.</div>
      ${SHOT('erp_materials', 'ERP 자재(MRP) · 구매 화면')}
      <div class="lab-check">위에 「자재 소요 계획(MRP)」 표, 아래에 「구매 발주」 카드가 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">표 바로 위 회색 안내문을 읽습니다: <b>BOM 전개 총소요 − (현재고 + 발주잔) + 안전재고 = 부족분 · 발주 단위 100개로 올림</b>.</div>
      <div class="lab-check">이 한 줄이 MRP 계산식 전부입니다. 아래 그림과 함께 이해합니다.</div></li>
    <li class="lab-step"><div class="lab-do">표의 열 이름을 왼쪽부터 확인합니다: <b>자재 · 구분 · 총소요 · 현재고 · 발주잔 · 안전재고 · 예상 잔량 · 부족 · 발주 제안 · 리드타임</b>.</div>
      <div class="lab-check">공작물(WP-RECT-…)은 색마다 한 줄, 박스(PK-BOX)는 한 줄입니다. 색 견본(■)으로 색을 구분합니다.</div></li>
    <li class="lab-step"><div class="lab-do">'부족' 열에서 <b>▲ 숫자</b>가 있는 줄을 모두 찾습니다. 예시 파일은 <b>그린 공작물(WP-RECT-GRN)</b> 재고를 일부러 적게 넣어 두었습니다.</div>
      <div class="lab-check">▲ 가 있는 줄은 '예상 잔량' 이 빨간 음수입니다. 없으면 '✔' 로 표시됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">부족한 줄 하나를 골라 직접 계산해 봅니다: 총소요 − (현재고 + 발주잔) + 안전재고.</div>
      <div class="lab-check">계산 결과가 '부족' 열 값과 같습니다. '발주 제안' 은 그 값을 100 단위로 올린 수입니다(예: 부족 60 → 발주 제안 100).</div>
      <div class="lab-tip">안전재고를 더하는 이유: 부족분만 사면 다음 주문 때 또 바닥나기 때문입니다.</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 위 <b>기준</b> 목록을 <span class="ui">진행 중인 모든 계획</span> 에서 특정 계획서(PS-…)로 바꿔 봅니다.</div>
      ${SHOT('ch08_mrp_mark', 'MRP 기준 선택과 부족분 구매 발주 버튼')}
      <div class="lab-check">총소요가 그 계획서 하나만큼으로 줄어듭니다. 확인 후 다시 <span class="ui">진행 중인 모든 계획</span> 으로 돌립니다.</div></li>
    <li class="lab-step"><div class="lab-do">'리드타임' 열을 보고, 오늘 발주하면 언제 들어올지 말해 봅니다.</div>
      <div class="lab-check">리드타임(일)이 길수록 미리 발주해야 합니다. 시뮬레이션에서는 입고 버튼으로 바로 입고합니다(실습 8-2).</div></li>
  </ol>
  <div class="lab-result">MRP 는 <b>생산계획 → BOM 전개 → 재고 · 발주잔 · 안전재고</b> 를 비교해 "무엇을, 얼마나 사야 하는지" 를 자동으로 계산합니다.</div>
  <div class="lab-q">레드 박스 주문이 20개 늘면 MRP 표의 어느 줄 · 어느 열이 바뀔까요?</div>
</div>`;

  const LAB_PO = `<div class="lab" data-lab="ch08-1-b">
  <div class="lab-head"><span class="lab-badge">실습 8-2</span><b>부족분 구매 발주 → 입고</b><span class="lab-meta">⏱ 10분 · 화면: ERP → 자재(MRP) · 구매 · 재고</span></div>
  <p class="lab-goal">MRP 가 계산한 부족분을 한 번에 발주하고, 입고 처리해 부족이 사라지는 것을 확인합니다.</p>
  <p class="lab-pre">실습 8-1 에서 ▲ 부족 줄이 하나 이상 있는 상태(없으면 버튼이 꺼져 있습니다 — 교사가 수주 · 계획을 더 만듭니다).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MRP 표에서 부족한 자재 이름과 '발주 제안' 수량을 활동지에 적습니다.</div>
      <div class="lab-check">예: WP-RECT-GRN · 발주 제안 100.</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 위 <span class="ui">부족분 구매 발주</span> 를 누릅니다.</div>
      <div class="lab-check">아래 「구매 발주」 목록에 새 줄이 생깁니다 — 발주번호 PO-…, 구분 <b>MRP</b>, 상태 <b>○ 접수</b>.</div>
      <div class="lab-tip">부족한 자재가 여러 개면 자재마다 한 줄씩 생깁니다. 공급처 · 금액 · 납기는 기준정보의 공급사 · 단가 · 리드타임으로 채워집니다.</div></li>
    <li class="lab-step"><div class="lab-do">다시 MRP 표를 봅니다.</div>
      <div class="lab-check">그 자재의 '발주잔' 이 발주 수량만큼 늘고 '부족' 이 ✔ 로 바뀝니다 — 아직 창고에 들어오지 않았어도 "이미 주문했다" 로 계산합니다.</div></li>
    <li class="lab-step"><div class="lab-do">구매 발주 목록에서 방금 만든 발주 줄 오른쪽의 <span class="ui">입고</span> 를 누릅니다.</div>
      ${SHOT('ch08_po_receive', '구매 발주 목록과 입고 버튼')}
      <div class="lab-check">'입고' 열 수량이 채워지고 상태가 <b>✔ 입고 완료</b> 로 바뀝니다. 입고 · 취소 버튼이 사라집니다.</div></li>
    <li class="lab-step"><div class="lab-do">MRP 표를 다시 봅니다.</div>
      <div class="lab-check">'발주잔' 이 줄고 그만큼 '현재고' 가 늘었습니다. 부족은 여전히 ✔ 입니다.</div></li>
    <li class="lab-step"><div class="lab-do">왼쪽 <span class="ui">▣ 재고</span> 를 열어 오른쪽 「재고 이력 (최근 50건)」 맨 위를 봅니다.</div>
      <div class="lab-check">방금 자재가 구분 <b>입고</b>, 수량 <b>+100</b>(발주 수량), 참조 PO-… 로 기록되어 있습니다.</div></li>
  </ol>
  <div class="lab-result">MRP → <b>부족분 구매 발주(접수)</b> → <b>입고(입고 완료)</b> → 재고 증가. 7차시에서 "자재 부족으로 릴리스 보류" 된 생산오더는 이렇게 입고한 뒤 다시 릴리스합니다.</div>
</div>`;

  const LAB_MANUAL = `<div class="lab" data-lab="ch08-1-c">
  <div class="lab-head"><span class="lab-badge">실습 8-3</span><b>수동 발주와 발주 취소</b><span class="lab-meta">⏱ 6분 · 화면: ERP → 자재(MRP) · 구매</span></div>
  <p class="lab-goal">MRP 와 상관없이 담당자가 직접 발주하는 방법과, 잘못 낸 발주를 취소하는 방법을 익힙니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">「구매 발주」 카드의 <b>자재</b> 목록에서 <b>PK-BOX</b>(포장 박스)를 고르고 <b>수량</b>에 50 을 적습니다.</div>
      ${SHOT('ch08_po_form', '구매 발주 카드의 수동 발주 입력')}
      <div class="lab-check">자재 · 수량 칸이 채워졌습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">수동 발주</span> 를 누릅니다.</div>
      <div class="lab-check">목록에 새 줄이 생기고 구분이 <b>수동</b>, 상태가 <b>○ 접수</b> 입니다.</div></li>
    <li class="lab-step"><div class="lab-do">이 발주가 "실수였다" 고 가정하고 그 줄의 <span class="ui">취소</span> 를 누릅니다.</div>
      <div class="lab-check">상태가 <b>■ 취소</b> 로 바뀌고 버튼이 사라집니다. MRP 의 PK-BOX '발주잔' 도 원래대로 돌아옵니다.</div>
      <div class="lab-tip">취소는 '접수' 상태에서만 할 수 있습니다. 이미 입고한 발주는 취소할 수 없고, 필요하면 재고 조정으로 맞춥니다.</div></li>
    <li class="lab-step"><div class="lab-do">MRP 발주와 수동 발주가 각각 언제 쓰이는지 활동지에 한 줄씩 적습니다.</div>
      <div class="lab-check">예) MRP 발주: 계획에 맞춘 정기 구매 / 수동 발주: 단가 할인 대량 구매, 예비품, 급한 보충.</div></li>
  </ol>
  <div class="lab-result">발주는 <b>MRP(자동 계산)</b> 와 <b>수동</b> 두 가지이며, 둘 다 같은 목록에서 입고 · 취소로 관리합니다.</div>
</div>`;

  const LAB_STOCK = `<div class="lab" data-lab="ch08-2-a">
  <div class="lab-head"><span class="lab-badge">실습 8-4</span><b>재고 현황 · 이력 읽기 — 적재함 하나의 흔적</b><span class="lab-meta">⏱ 10분 · 화면: ERP → 재고</span></div>
  <p class="lab-goal">적재함 하나가 출고될 때 재고에 어떤 기록이 남는지 이력에서 찾아 설명합니다.</p>
  <p class="lab-pre">설비가 적재함을 한 번 이상 출고한 상태(생산이 돌고 있으면 됩니다).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">ERP → <span class="ui">▣ 재고</span> 를 엽니다. 왼쪽 「재고 현황」 표의 열 <b>코드 · 품명 · 유형 · 현재고</b> 를 확인합니다.</div>
      ${SHOT('erp_inventory', 'ERP 재고 화면')}
      <div class="lab-check">유형은 <b>원자재</b>(공작물) · <b>포장재</b>(박스) · <b>완제품</b>(FG-BOX4-색) 세 가지입니다. 현재고가 음수면 ⚠ 표시가 붙습니다.</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 「재고 이력 (최근 50건)」 에서 <b>참조</b> 열이 같은 적재함 LOT(CR-…)인 줄들을 찾습니다.</div>
      <div class="lab-check">같은 LOT 으로 보통 세 줄이 있습니다: 완제품 <b>입고 +5</b>, 공작물 <b>자재 출고 −20</b>, 박스 <b>자재 출고 −5</b>.</div></li>
    <li class="lab-step"><div class="lab-do">세 숫자가 왜 5 · 20 · 5 인지 BOM 으로 설명해 봅니다(적재함 = 5박스, 박스 1 = 공작물 4 + 박스 1).</div>
      <div class="lab-check">5박스 × 공작물 4 = 20, 5박스 × 박스 1 = 5. MES 실적 확인 때 쓴 자재를 빼고(GI) 만든 완제품을 넣습니다(GR).</div></li>
    <li class="lab-step"><div class="lab-do">이력에서 구분이 <b>고객 출고</b> 인 줄을 찾아 수량과 참조(출고 번호 · LOT)를 봅니다.</div>
      <div class="lab-check">완제품이 고객에게 나가며 −5 가 기록되어 있습니다(실습 8-6 의 자동 출고).</div></li>
    <li class="lab-step"><div class="lab-do">현재고 표에서 완제품 FG-BOX4-RED 의 수를 적고, 1분 뒤 다시 봅니다.</div>
      <div class="lab-check">생산 중이면 입고와 출고가 거의 같이 일어나 완제품 재고는 크게 늘지 않습니다 — 수주에 맞춰 만들고 바로 보내기 때문입니다.</div></li>
  </ol>
  <div class="lab-result">재고는 <b>입고(+) · 자재 출고(−) · 고객 출고(−) · 재고 조정(±)</b> 네 가지로만 움직이고, 모든 움직임은 참조 번호와 함께 이력에 남습니다.</div>
  <div class="lab-q">검사에서 불합격한 적재함은 재고 이력에 어떻게 남을까요? (10차시에서 확인)</div>
</div>`;

  const LAB_ADJ = `<div class="lab" data-lab="ch08-2-b">
  <div class="lab-head"><span class="lab-badge">실습 8-5</span><b>재고 조정 — 실사 차이 맞추기</b><span class="lab-meta">⏱ 6분 · 화면: ERP → 재고</span></div>
  <p class="lab-goal">창고에서 직접 센 수량(실사)과 ERP 수량이 다를 때 재고 조정으로 맞추고, 기록이 남는 것을 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">「재고 현황」 위 입력줄에서 <b>품목</b> = PK-BOX, <b>증감 수량(±)</b> = 10, <b>사유</b> = 실사 차이(실습) 를 입력합니다.</div>
      ${SHOT('ch08_inventory_mark', '재고 조정 입력줄과 버튼')}
      <div class="lab-check">증감 수량이 0 이면 <span class="ui">재고 조정</span> 버튼이 꺼져 있습니다. 10 을 넣으면 켜집니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">재고 조정</span> 을 누릅니다.</div>
      <div class="lab-check">PK-BOX 현재고가 10 늘고, 이력 맨 위에 구분 <b>재고 조정</b>, 수량 <b>+10</b>, 참조 '실사 차이(실습)' 가 생깁니다.</div></li>
    <li class="lab-step"><div class="lab-do">실습 데이터를 원래대로 돌리기 위해 같은 품목에 <b>−10</b>, 사유 '실습 되돌림' 으로 한 번 더 조정합니다.</div>
      <div class="lab-check">현재고가 원래 값으로 돌아오고, 이력에는 +10 과 −10 두 줄이 모두 남아 있습니다.</div>
      <div class="lab-tip">기록은 지워지지 않습니다. 그래서 재고 조정에는 반드시 <b>사유</b>를 적습니다(감사 · 추적용).</div></li>
    <li class="lab-step"><div class="lab-do">MRP 표에서 PK-BOX 의 '현재고' 가 같은 값인지 확인합니다.</div>
      <div class="lab-check">재고 화면과 MRP 의 현재고가 같습니다 — 둘은 같은 재고 데이터를 씁니다.</div></li>
  </ol>
  <div class="lab-result">재고 조정은 "숫자를 고치는 것" 이 아니라 <b>차이를 기록으로 남기는 거래</b>입니다. 되돌릴 때도 반대 조정을 하나 더 남깁니다.</div>
</div>`;

  const LAB_SHIP = `<div class="lab" data-lab="ch08-2-c">
  <div class="lab-head"><span class="lab-badge">실습 8-6</span><b>출고 현황과 출고 등록</b><span class="lab-meta">⏱ 10분 · 화면: ERP → 출고 · 영업 · 수주</span></div>
  <p class="lab-goal">자동으로 확정된 출고를 읽고, 수주 라인을 골라 출고를 직접 등록 · 확정하는 방법을 익힙니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">ERP → <span class="ui">⇪ 출고</span> 를 엽니다. 「출고 현황」 의 열 <b>출고번호 · 수주번호 · 수량 · LOT · 상태 · 출고 시각</b> 을 확인합니다.</div>
      ${SHOT('erp_shipments', 'ERP 출고 화면')}
      <div class="lab-check">대부분의 줄이 수량 5, LOT 에 적재함 번호(CR-…), 상태 <b>✔ 확정</b> 입니다 — 적재함이 출고될 때 자동으로 만들어진 출고입니다.</div></li>
    <li class="lab-step"><div class="lab-do">아래 그림으로 자동 출고 흐름을 확인합니다. 그리고 출고 한 줄의 LOT 번호를 적어 둡니다.</div>
      <div class="lab-check">자동 출고 조건: ① 검사 LOT 합격 ② 그 작업지시의 생산계획이 <b>수주 라인과 연결</b>(미출고 수주로 작성한 계획) ③ 수주 잔량이 남아 있음.</div></li>
    <li class="lab-step"><div class="lab-do">「출고 등록」 의 <b>수주 라인 (잔량)</b> 목록을 펼쳐 봅니다.</div>
      ${SHOT('ch08_shipments_mark', '출고 등록 입력줄')}
      <div class="lab-check">잔량이 남은 수주 라인만 '수주번호 · 품목 · 잔량 n' 형태로 나옵니다. 모두 출고됐으면 목록이 비어 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">(교사 안내에 따라) 잔량이 있는 라인 하나를 고르고 <b>수량(박스)</b> 1, <b>적재함 LOT (선택)</b> 은 비운 채 <span class="ui">출고 등록</span> 을 누릅니다.</div>
      <div class="lab-check">출고 현황에 새 줄이 생기고 상태가 <b>◔ 출고 대기</b>, 오른쪽에 <span class="ui">출고 확정</span> 버튼이 있습니다.</div>
      <div class="lab-tip">잔량보다 많이 적으면 "수주 잔량 초과" 오류가 납니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">출고 확정</span> 을 누릅니다.</div>
      <div class="lab-check">상태가 ✔ 확정, 출고 시각이 찍힙니다. 완제품 재고가 모자라면 확정되지 않고 오류가 나며, 아무것도 바뀌지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do">ERP → <span class="ui">₩ 영업 · 수주</span> 에서 그 수주의 출고 수량 · 상태를 확인합니다.</div>
      <div class="lab-check">출고 수량이 늘었고, 다 나가면 상태가 <b>✔ 출고 완료</b>, 일부면 <b>◑ 부분 출고</b> 입니다.</div></li>
  </ol>
  <div class="lab-result">보통은 <b>적재함 출고 → MES 실적 → ERP 출고 확정</b> 이 자동으로 이어지고, 수동 출고는 <b>등록(출고 대기) → 확정</b> 두 단계입니다. 확정할 때 재고와 수주 잔량이 함께 줄어듭니다.</div>
</div>`;

  const LAB_GRAPH = `<div class="lab" data-lab="ch08-2-d">
  <div class="lab-head"><span class="lab-badge">실습 8-7</span><b>ERP↔MES 연동 그래프로 문서 따라가기</b><span class="lab-meta">⏱ 10분 · 화면: ERP → ERP↔MES 연동</span></div>
  <p class="lab-goal">수주 하나가 계획 · 생산오더 · 작업지시 · 적재함 · 출고로 이어지는 실제 문서 사슬을 그래프에서 따라갑니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">ERP → <span class="ui">⇄ ERP↔MES 연동</span> 을 엽니다. 오른쪽 위가 <span class="ui">모듈 흐름</span> 인 상태에서 그래프를 훑어봅니다.</div>
      ${SHOT('erp_graph', '연동 그래프 모듈 흐름')}
      <div class="lab-check">ERP(영업 · 계획 · 자재 · 재고 · 출고) · MES · 현장 설비 · 예지보전 AI 가 노드로, 그 사이 데이터가 화살표로 그려져 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">노드 하나(예: 생산오더)에 마우스를 올려 봅니다.</div>
      <div class="lab-check">그 노드와 직접 연결된 노드 · 화살표만 강조되고 나머지는 흐려집니다.</div></li>
    <li class="lab-step"><div class="lab-do">노드를 <b>클릭</b>합니다.</div>
      <div class="lab-check">그래프 아래에 그 노드의 <b>들어오는 데이터</b> · <b>나가는 데이터</b> 목록이 나옵니다(예: 생산계획 → 릴리스 → 생산오더).</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 위를 <span class="ui">문서 추적(최근)</span> 으로 바꿉니다.</div>
      ${SHOT('ch08_graph_docs', '연동 그래프 문서 추적')}
      <div class="lab-check">수주(SO-…) → 생산계획서(PS-…) → 생산오더(PRO-…) → 작업지시(WO-…) → 설비 · 적재함 → 출고(SH-…) 처럼 실제 번호가 이어집니다.</div></li>
    <li class="lab-step"><div class="lab-do">출고(SH-…) 노드 하나를 클릭해 들어오는 데이터를 확인하고, 실습 8-6 에서 적어 둔 LOT 과 같은 적재함이 있는지 찾아봅니다.</div>
      <div class="lab-check">출고가 어느 적재함 · 어느 수주에서 왔는지 그래프로 확인했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">구매 발주(PO-…)가 그래프에 어떻게 연결되는지도 찾아봅니다.</div>
      <div class="lab-check">구매 → 자재(입고)로 이어집니다. 실습 8-2 에서 만든 발주를 찾을 수 있습니다.</div></li>
  </ol>
  <div class="lab-result">연동 그래프는 ERP 와 MES 가 <b>문서 번호로 이어져 있다</b>는 것을 보여 줍니다. 문제가 생긴 출고 하나에서 거꾸로 수주 · 계획 · 설비까지 찾아갈 수 있습니다.</div>
</div>`;

  const QUIZ1 = [
    { q: 'MRP 의 부족분 계산식으로 옳은 것은?',
      options: ['총소요 + 현재고 − 안전재고', '총소요 − (현재고 + 발주잔) + 안전재고', '현재고 − 발주잔', '안전재고 × 2'], answer: 1,
      explain: '화면 안내문 그대로 "BOM 전개 총소요 − (현재고 + 발주잔) + 안전재고 = 부족분" 입니다.' },
    { q: '부족분 구매 발주를 누른 직후 MRP 표에서 일어나는 일은?',
      options: ['현재고가 바로 늘어난다', '발주잔이 늘어 부족이 ✔ 로 바뀐다', '안전재고가 0 이 된다', '총소요가 줄어든다'], answer: 1,
      explain: '아직 입고 전이지만 이미 주문한 수량(발주잔)을 가용 수량으로 계산합니다.' },
    { q: '구매 발주의 <b>취소</b> 버튼이 보이는 상태는?',
      options: ['입고 완료', '취소', '접수', '부분 입고'], answer: 2,
      explain: '취소는 접수(OPEN) 상태에서만 할 수 있습니다.' },
    { q: '부족 60 개, 발주 단위 100 개일 때 MRP 의 발주 제안 수량은?',
      options: ['60', '80', '100', '160'], answer: 2,
      explain: '부족분을 발주 단위(100개)로 올리므로 100 입니다.' },
  ];
  const QUIZ2 = [
    { q: '적재함 하나(5박스)의 실적이 확인될 때 공작물의 재고 이력에 남는 기록은?',
      options: ['입고 +5', '자재 출고 −20', '고객 출고 −5', '재고 조정 +20'], answer: 1,
      explain: '박스 1개에 공작물 4개이므로 5박스 × 4 = 20 개가 자재 출고(GI)됩니다.' },
    { q: '재고 조정에 대한 설명으로 옳은 것은?',
      options: ['잘못된 이력을 지운다', '증감 수량과 사유를 남기는 거래이며, 되돌릴 때도 반대 조정을 남긴다', '증감 수량 0 으로도 실행된다', 'MRP 와는 다른 재고를 쓴다'], answer: 1,
      explain: '재고 조정은 기록으로 남는 거래입니다. 0 이면 버튼이 꺼집니다.' },
    { q: '적재함 출고 때 ERP 출고가 자동으로 확정되지 <b>않는</b> 경우는?',
      options: ['검사 LOT 이 합격일 때', '생산계획이 수주 라인과 연결되어 있을 때', '검사 LOT 이 불합격일 때', '수주 잔량이 남아 있을 때'], answer: 2,
      explain: '불합격 LOT 은 출고하지 않고 품질 판정을 기다립니다.' },
    { q: '연동 그래프에서 노드를 <b>클릭</b>하면 나타나는 것은?',
      options: ['노드가 삭제된다', '그 노드의 들어오는 데이터 · 나가는 데이터 목록', '새 수주 입력창', 'MES 화면으로 이동'], answer: 1,
      explain: '마우스를 올리면 연결만 강조되고, 클릭하면 아래에 들어오는 · 나가는 데이터가 나옵니다.' },
  ];

  // ---------------------------------------------------------------- 구매 · 재고 개념
  const BUYC_ARR = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const BUYC_FIG_P2P = `<svg viewBox="0 0 720 190" role="img" aria-label="구매 프로세스: 구매 요청, 구매 발주, 입고, 송장 검증, 대금 지급. 이 플랫폼은 발주 제안, 구매 발주, 입고까지 다룬다">
  ${BUYC_ARR('c08x1')}
  <rect x="10" y="40" width="120" height="56" rx="10" class="p2s"/><text x="70" y="64" text-anchor="middle" class="tx-b">구매 요청</text><text x="70" y="84" text-anchor="middle" class="tx-m">(PR · MRP 제안)</text>
  <rect x="155" y="40" width="120" height="56" rx="10" class="p2"/><text x="215" y="64" text-anchor="middle" class="tx-w">구매 발주</text><text x="215" y="84" text-anchor="middle" class="tx-w">(PO)</text>
  <rect x="300" y="40" width="120" height="56" rx="10" class="p2"/><text x="360" y="64" text-anchor="middle" class="tx-w">입고</text><text x="360" y="84" text-anchor="middle" class="tx-w">(검수 · 재고 +)</text>
  <rect x="445" y="40" width="120" height="56" rx="10" class="card-bg"/><text x="505" y="64" text-anchor="middle" class="tx-b">송장 검증</text><text x="505" y="84" text-anchor="middle" class="tx-m">(발주 · 입고 · 송장)</text>
  <rect x="590" y="40" width="120" height="56" rx="10" class="card-bg"/><text x="650" y="64" text-anchor="middle" class="tx-b">대금 지급</text><text x="650" y="84" text-anchor="middle" class="tx-m">(회계)</text>
  <line x1="132" y1="68" x2="151" y2="68" class="ln" stroke-width="2" marker-end="url(#c08x1)"/>
  <line x1="277" y1="68" x2="296" y2="68" class="ln" stroke-width="2" marker-end="url(#c08x1)"/>
  <line x1="422" y1="68" x2="441" y2="68" class="ln" stroke-width="2" marker-end="url(#c08x1)"/>
  <line x1="567" y1="68" x2="586" y2="68" class="ln" stroke-width="2" marker-end="url(#c08x1)"/>
  <rect x="10" y="118" width="410" height="34" rx="8" class="p1s"/><text x="215" y="140" text-anchor="middle" class="tx">이 플랫폼: MRP 발주 제안 → 부족분 구매 발주 · 수동 발주 → 입고</text>
  <rect x="445" y="118" width="265" height="34" rx="8" class="card-bg"/><text x="577" y="140" text-anchor="middle" class="tx-m">회계 단계 — 교육용 범위 밖</text>
  <text x="360" y="180" text-anchor="middle" class="tx-m">"구매에서 지급까지(Procure to Pay)" — ERP 의 대표적인 문서 흐름</text>
</svg>`;
  const BUYC_CONTENT = [
    { type: 'h', text: '구매는 어떤 순서로 이루어질까' },
    { type: 'figure', html: BUYC_FIG_P2P, caption: '구매 요청 → 구매 발주 → 입고 → 송장 검증 → 대금 지급' },
    { type: 'p', html: '실제 회사에서는 필요한 부서가 <b>구매 요청</b>을 올리고, 구매 담당자가 공급사를 정해 <b>구매 발주(PO)</b> 를 냅니다. 물건이 도착하면 수량 · 품질을 확인해 <b>입고</b>하고(이때 재고가 늘어남), 공급사의 송장(청구서)을 발주 · 입고와 맞춰 본 뒤 <b>대금</b>을 지급합니다. 이 플랫폼에서는 MRP 의 발주 제안이 구매 요청 역할을 하고, 발주와 입고까지를 직접 해 봅니다.' },
    { type: 'h', text: '재고 관리의 기본 용어' },
    { type: 'table', head: ['용어', '뜻', '이 플랫폼에서'], rows: [
      ['리드타임', '발주해서 입고될 때까지 걸리는 시간', '품목마다 기준정보에(예: 공작물 3일 · 포장박스 2일)'],
      ['안전재고', '수요 변동 · 입고 지연에 대비해 늘 남겨 두는 양', '품목마다 기준정보에(예: 공작물 80) — MRP 가 부족 계산에 더함'],
      ['발주잔', '발주했지만 아직 들어오지 않은 양', 'MRP 표의 발주잔 열'],
      ['로트 크기(발주 단위)', '한 번에 주문하는 묶음 단위', 'MRP 발주 제안은 100개 단위로 올림'],
      ['재주문점', '재고가 이 수준 아래로 내려가면 주문하는 기준(리드타임 동안 쓸 양 + 안전재고)', '이 플랫폼은 재주문점 대신 MRP(계획 기반)로 계산'],
    ] },
    { type: 'callout', kind: 'info', title: '재주문점 방식과 MRP 방식', html: '<b>재주문점 방식</b>은 "재고가 줄면 채운다" 처럼 과거 사용량을 보고 주문합니다. <b>MRP 방식</b>은 "앞으로 만들 계획에 무엇이 얼마나 필요한가" 를 계산해 주문합니다. 제품 구성(BOM)이 분명하고 계획이 있는 제조업에서는 MRP 가 기본이고, 나사 · 소모품처럼 값싸고 자주 쓰는 품목은 재주문점으로 관리하기도 합니다.' },
  ];
  const BUYC_SLIDES = [
    { layout: 'diagram', title: '구매에서 지급까지(Procure to Pay)', html: BUYC_FIG_P2P,
      notes: '<p>💬 "온라인 쇼핑으로 비유하면?" 장바구니(요청) → 결제 · 주문(발주) → 택배 수령 · 확인(입고) → 카드 명세서 확인(송장 검증) → 결제 대금 출금(지급).</p><p>오늘 실습 범위는 발주 제안 → 발주 → 입고.</p>' },
    { layout: 'table', title: '재고 관리 기본 용어', head: ['용어', '한 줄 뜻'], rows: [
      ['리드타임', '발주 → 입고까지 걸리는 시간'], ['안전재고', '늘 남겨 두는 여유분'], ['발주잔', '주문했지만 아직 안 온 양'], ['로트 크기', '한 번에 주문하는 단위(100개)'], ['재주문점', '이 아래로 줄면 주문']],
      notes: '<p>기준정보(6차시)에서 본 안전재고 · 리드타임이 MRP 에서 어떻게 쓰이는지 연결합니다.</p>' },
  ];
  const STOCKC_CONTENT = [
    { type: 'h', text: '공장의 재고는 네 가지' },
    { type: 'table', head: ['종류', '뜻', '이 플랫폼의 품목'], rows: [
      ['원자재', '생산에 들어가는 재료 · 부품', '공작물 WP-RECT-색 5종'],
      ['포장재', '포장에 쓰는 자재', '포장박스 PK-BOX'],
      ['재공품(WIP)', '만드는 중인 물건', '컨베이어 위 공작물 · 채우는 중인 박스 · 쌓는 중인 적재함(재고 화면에는 나오지 않음)'],
      ['완제품', '다 만들어 팔 수 있는 물건', '박스 완제품 FG-BOX4-색 5종'],
    ], caption: 'ERP 개요의 "재고 금액" = 품목별 수량 × 단가의 합 — 재고는 회사의 돈이 물건으로 묶여 있는 것입니다' },
    { type: 'p', html: '재고는 너무 적으면 생산이 멈추고(자재 부족) 납기를 놓치며, 너무 많으면 돈이 묶이고 보관 비용 · 품질 저하 위험이 생깁니다. ERP 는 <b>재고를 정확한 숫자로 보여 주고, 모든 증감을 거래 기록으로 남겨</b> 이 균형을 잡도록 돕습니다.' },
  ];
  const STOCKC_SLIDES = [
    { layout: 'table', title: '재고의 네 가지 종류', head: ['종류', '이 플랫폼'], rows: [
      ['원자재', '공작물 5색'], ['포장재', '포장박스'], ['재공품(WIP)', '라인 위의 공작물 · 박스'], ['완제품', '박스 완제품 5색']],
      notes: '<p>💬 "재고가 많으면 좋은 걸까?" — 돈이 묶이고 보관 · 품질 위험. 적으면 생산이 멈춤. ERP 는 정확한 숫자와 거래 기록으로 균형을 잡게 해 줍니다.</p>' },
  ];
  PY_COURSE.addChapter({
    id: 'ch08', no: '08', title: 'ERP ③ 자재 · 구매 · 재고 · 출고', subtitle: 'MRP · Purchasing · Inventory · Shipping',
    summary: 'MRP 로 부족 자재를 찾아 구매 발주 · 입고하고, 재고 이력 · 재고 조정 · 출고와 ERP↔MES 연동 그래프를 직접 다룹니다.',
    goals: ['MRP 표를 읽고 부족분 · 발주 제안을 설명할 수 있다',
      '부족분 구매 발주 · 수동 발주 · 입고 · 취소를 할 수 있다',
      '재고 이력으로 적재함 하나의 자재 출고 · 완제품 입고 · 고객 출고를 추적할 수 있다',
      '출고 등록 · 확정과 자동 출고, 연동 그래프의 문서 사슬을 설명할 수 있다'],
    sections: [
      {
        id: 'ch08-1', title: 'MRP 와 구매', minutes: 50,
        goals: ['MRP 계산식과 표의 각 열을 설명한다', '부족분 구매 발주 → 입고를 수행한다', '수동 발주 · 취소를 수행한다'],
        flow: [['도입 — 공작물이 모자라면?', 4], ['개념 — 구매 프로세스 · 재고 용어', 7], ['MRP 개념', 6], ['실습 8-1 MRP 읽기', 11], ['실습 8-2 발주 · 입고', 9], ['실습 8-3 수동 발주', 6], ['정리 · 퀴즈', 7]],
        content: [
          { type: 'p', html: '7차시에서 생산을 시작하려는데 "자재 가용성 부족 — 릴리스 보류" 가 뜬 적이 있나요? 공장은 자재가 없으면 아무것도 만들 수 없습니다. 그래서 ERP 에는 <mark>MRP(Material Requirements Planning, 자재 소요 계획)</mark> 가 있습니다. MRP 는 <b>생산계획을 보고 필요한 자재를 계산</b>하고, 모자라면 무엇을 얼마나 사야 하는지 알려 줍니다.' },
          ...BUYC_CONTENT,
          { type: 'h', text: 'MRP 는 이렇게 계산합니다' },
          { type: 'figure', html: FIG_MRP, caption: '생산계획 → BOM 전개 → 총소요 → 부족분 → 발주 제안(100개 단위)' },
          { type: 'table', head: ['열', '뜻', '읽는 법'], rows: [
            ['총소요', '진행 중인 계획의 박스 수 × BOM', '이번 계획에 필요한 전체 양'],
            ['현재고', '지금 창고에 있는 수량', '재고 화면의 현재고와 같음'],
            ['발주잔', '주문했지만 아직 안 들어온 수량', '입고하면 현재고로 옮겨 감'],
            ['안전재고', '항상 남겨 둘 최소 수량(기준정보)', '부족분 계산에 더함'],
            ['예상 잔량', '현재고 + 발주잔 − 총소요', '빨간 음수면 모자람'],
            ['부족 · 발주 제안', '부족분과 100 단위로 올린 발주 수량', '▲ 표시된 줄이 사야 할 자재'],
            ['리드타임', '발주에서 입고까지 걸리는 날', '길수록 미리 주문'],
          ] },
          { type: 'callout', kind: 'info', title: '예시 파일의 "일부러 부족한" 자재', html: '6차시에서 가져온 예시 기준정보는 <b>그린 공작물(WP-RECT-GRN)</b> 의 기초 재고를 일부러 적게 넣었습니다. 그린 제품을 계획하면 MRP 에 ▲ 부족이 나오고, 생산 시작 때 자재 부족으로 릴리스가 보류됩니다. 이 차시에서 그 문제를 구매 → 입고로 해결합니다.' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_MRP },
          { type: 'figure', html: LAB_PO },
          { type: 'figure', html: LAB_MANUAL },
          { type: 'callout', kind: 'more', title: '실제 기업의 MRP', html: '실제 ERP 는 MRP 를 밤마다 돌려 <b>구매 요청</b>을 만들고, 구매 담당자가 검토해 <b>구매 발주</b>로 바꾸며, 공급사가 납품하면 <b>입고 검사</b>를 거쳐 재고로 넣습니다. 이 플랫폼은 그 흐름을 "부족분 구매 발주 → 입고" 두 번의 클릭으로 줄여 보여 줍니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 예시 기준정보 · 수주를 가져오고(6차시), 그린이 포함된 계획서를 만들어 두면(7차시) MRP 에 부족이 나타납니다. 부족이 하나도 없으면 <span class="ui">부족분 구매 발주</span> 가 꺼져 있으니, 수주를 하나 더 넣어 부족을 만듭니다.</li><li><b>자주 막히는 곳</b>: 발주 직후 "현재고가 안 늘었다" — 입고 전이라 발주잔만 늘었다는 것을 표의 두 열로 비교해 보여 줍니다.</li><li><b>여러 학생이 같은 서버</b>를 쓰면 한 학생의 발주가 모두의 MRP 를 바꿉니다. 모둠별로 한 명만 버튼을 누르게 하거나, 교사 시연 후 관찰만 하게 합니다.</li><li><b>확인 기준</b>: 실습 8-1 에서 부족 줄 하나를 계산식으로 설명, 실습 8-2 에서 상태가 접수 → 입고 완료로 바뀐 것을 캡처 제출.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: 'MRP 와 구매', subtitle: '무엇을, 얼마나, 언제 살까', notes: '<p>💬 도입: "레드 박스 20개를 만들려면 공작물이 몇 개 필요할까요?" → 80. 이 계산을 모든 자재에 대해 자동으로 하는 것이 MRP 라고 연결합니다.</p>' },
          ...BUYC_SLIDES,
          { layout: 'diagram', title: 'MRP 계산 흐름', html: FIG_MRP, notes: '<p>그림의 예(레드 20박스 → 공작물 80 · 박스 20)를 판서합니다. 안전재고를 왜 더하는지 질문합니다.</p>' },
          { layout: 'table', title: 'MRP 표의 열', head: ['열', '뜻'], rows: [['총소요', '계획 × BOM'], ['현재고 · 발주잔', '있는 것 · 오는 중'], ['안전재고', '남겨 둘 최소량'], ['부족 · 발주 제안', '사야 할 양(100 단위)'], ['리드타임', '입고까지 일수']],
            notes: '<p>실습 8-1 의 3단계를 화면으로 함께 짚습니다.</p>' },
          { layout: 'diagram', title: '화면 — 자재(MRP) · 구매', html: SHOT('ch08_mrp_mark', 'MRP 화면'), notes: '<p>오른쪽 위 기준 선택과 부족분 구매 발주 버튼 위치를 가리킵니다. 부족이 없으면 버튼이 꺼진다는 것도 알려 줍니다.</p>' },
          { layout: 'bullets', title: '실습 8-1 · MRP 읽기 (12분)', bullets: ['ERP → 자재(MRP) · 구매', '안내문의 계산식 읽기', '▲ 부족 줄 찾기(그린 공작물)', '한 줄을 직접 계산해 보기', '기준을 특정 계획서로 바꿔 보기'],
            notes: '<p>계산 결과를 짝과 맞춰 보게 합니다. 다르면 발주잔을 빠뜨린 경우가 많습니다.</p>' },
          { layout: 'bullets', title: '실습 8-2 · 발주 → 입고 (10분)', bullets: ['부족분 구매 발주 → 목록에 PO(MRP · 접수)', 'MRP: 발주잔 ↑, 부족 ✔', '입고 → 입고 완료', '재고 이력: 입고 +수량'],
            notes: '<p>시연 후 모둠 대표 한 명만 누르게 합니다(공용 서버). 나머지는 화면 변화를 관찰 · 기록합니다.</p>' },
          { layout: 'diagram', title: '구매 발주 목록', html: SHOT('ch08_po_receive', '구매 발주 목록'), notes: '<p>상태 배지(○ 접수 · ✔ 입고 완료 · ■ 취소)는 색과 글자가 함께 표시된다는 점도 짚습니다.</p>' },
          { layout: 'bullets', title: '실습 8-3 · 수동 발주와 취소 (6분)', bullets: ['자재 PK-BOX · 수량 50 → 수동 발주', '구분 = 수동, 상태 = 접수', '취소 → 상태 취소', '취소는 접수 상태에서만'],
            notes: '<p>💬 "수동 발주는 언제 쓸까?" — 대량 할인 구매, 예비품, 급한 보충.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[1].q, options: QUIZ1[1].options, answer: QUIZ1[1].answer, explain: QUIZ1[1].explain, notes: '<p>오답(현재고가 바로 늘어난다)이 많으면 실습 8-2 의 3 · 5단계를 다시 비교합니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['MRP: 총소요 − (현재고 + 발주잔) + 안전재고', '부족분 구매 발주 → 접수 → 입고 → 입고 완료', '수동 발주 · 취소(접수 상태만)', '입고 후 생산오더 다시 릴리스'],
            notes: '<p>다음 교시: 재고 이력 · 재고 조정 · 출고 · 연동 그래프.</p>' },
        ],
      },
      {
        id: 'ch08-2', title: '재고 · 출고 · 연동 그래프', minutes: 50,
        goals: ['재고 이력에서 적재함 하나의 흔적을 찾는다', '재고 조정을 사유와 함께 수행한다', '출고 등록 · 확정과 자동 출고 조건을 설명한다', '연동 그래프로 문서 사슬을 따라간다'],
        flow: [['도입 — 재고는 언제 움직이나', 5], ['개념 — 재고의 종류 · 금액', 4], ['실습 8-4 재고 이력', 10], ['실습 8-5 재고 조정', 6], ['실습 8-6 출고', 10], ['실습 8-7 연동 그래프', 10], ['정리 · 퀴즈', 5]],
        content: [
          { type: 'p', html: '재고 숫자는 저절로 바뀌지 않습니다. 반드시 <b>어떤 거래</b>가 있어야 바뀌고, 그 거래는 이력에 남습니다. 이 교시에서는 재고가 움직이는 네 가지 경우를 직접 확인하고, 마지막으로 ERP 와 MES 의 문서가 어떻게 이어져 있는지 그래프로 봅니다.' },
          ...STOCKC_CONTENT,
          { type: 'figure', html: FIG_STOCK, caption: '재고는 입고(+) · 자재 출고(−) · 고객 출고(−) · 재고 조정(±) 으로만 움직입니다' },
          { type: 'h', text: '적재함 하나가 남기는 기록' },
          { type: 'table', head: ['거래', '품목', '수량', '언제'], rows: [
            ['자재 출고(GI)', '공작물 WP-RECT-색', '−20', 'MES 실적 확인 때(5박스 × 4)'],
            ['자재 출고(GI)', '포장 박스 PK-BOX', '−5', 'MES 실적 확인 때(5박스 × 1)'],
            ['입고(GR)', '완제품 FG-BOX4-색', '+5', '검사 합격 후 실적 확인 때'],
            ['고객 출고', '완제품 FG-BOX4-색', '−5', 'ERP 출고 확정 때'],
          ], caption: '참조 열에 같은 적재함 LOT(CR-…) 이 적혀 있어 서로 이어 볼 수 있습니다' },
          { type: 'h', text: '출고 — 자동과 수동' },
          { type: 'figure', html: FIG_SHIP, caption: '적재함 출고 → MES 실적 → 검사 LOT → ERP 출고 확정(자동)' },
          { type: 'p', html: '수주로 만든 생산계획이라면 적재함이 출고될 때마다 <b>ERP 출고가 자동으로 만들어지고 확정</b>됩니다. 직접 출고할 때는 <span class="ui">출고 등록</span>(상태: 출고 대기) → <span class="ui">출고 확정</span> 두 단계이며, 확정할 때 완제품 재고와 수주 잔량이 함께 줄어듭니다. 재고가 모자라거나 잔량을 넘으면 확정되지 않습니다.' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_STOCK },
          { type: 'figure', html: LAB_ADJ },
          { type: 'figure', html: LAB_SHIP },
          { type: 'figure', html: LAB_GRAPH },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 수주로 만든 계획서를 생산 중이면 재고 이력 · 자동 출고가 계속 쌓입니다. 생산이 멈춰 있으면 이력이 적으니 수업 10분 전에 생산을 시작해 둡니다.</li><li><b>실습 8-5</b>: 공용 서버에서 여러 명이 조정하면 숫자가 뒤섞입니다. 모둠별로 다른 품목(예: 모둠 1 = PK-BOX, 모둠 2 = WP-RECT-WHT)을 정해 주고, 반드시 반대 조정으로 되돌리게 합니다.</li><li><b>실습 8-6</b>: 잔량이 남은 수주 라인이 없으면 출고 등록은 시연만 합니다. 완제품 재고가 0 이면 확정이 실패하는데, 이것도 좋은 학습 장면입니다("재고 없이 출고할 수 없다").</li><li><b>오개념</b>: "출고 = 적재함이 라인에서 나가는 것" — 현장 출고(물리)와 ERP 출고(거래)는 다른 것이며 자동 연동으로 이어진다는 점을 구분합니다.</li><li><b>확인 기준</b>: 같은 LOT 의 세 이력(−20 · −5 · +5) 설명, 연동 그래프에서 수주 → 출고 사슬 하나 캡처.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '재고 · 출고 · 연동 그래프', subtitle: '재고는 거래로만 움직인다', notes: '<p>💬 "창고 재고 숫자가 틀렸다면 무엇부터 볼까요?" → 이력. 오늘의 핵심 질문입니다.</p>' },
          ...STOCKC_SLIDES,
          { layout: 'diagram', title: '재고가 움직이는 네 가지', html: FIG_STOCK, notes: '<p>각 화살표가 실제 화면의 어느 버튼 · 어느 자동 처리에서 생기는지 연결합니다.</p>' },
          { layout: 'table', title: '적재함 하나의 흔적', head: ['거래', '수량'], rows: [['공작물 자재 출고', '−20'], ['박스 자재 출고', '−5'], ['완제품 입고', '+5'], ['고객 출고', '−5']],
            notes: '<p>BOM(박스 1 = 공작물 4 + 박스 1)과 적재함 5박스로 숫자를 유도하게 합니다.</p>' },
          { layout: 'diagram', title: '화면 — 재고', html: SHOT('erp_inventory', 'ERP 재고'), notes: '<p>오른쪽 이력의 참조 열에서 CR-… 를 찾아보게 합니다(실습 8-4).</p>' },
          { layout: 'bullets', title: '실습 8-4 · 8-5 (16분)', bullets: ['재고 현황: 유형 · 현재고', '이력: 같은 LOT 세 줄 찾기', '재고 조정 +10(사유) → −10 되돌림', '이력은 지워지지 않는다'],
            notes: '<p>모둠별 품목을 정해 주고 되돌림까지 확인합니다.</p>' },
          { layout: 'diagram', title: '자동 출고 흐름', html: FIG_SHIP, notes: '<p>자동 출고 조건 세 가지를 판서: 합격, 수주와 연결된 계획, 잔량.</p>' },
          { layout: 'bullets', title: '실습 8-6 · 출고 (10분)', bullets: ['출고 현황: 자동 확정된 줄 읽기', '수주 라인 선택 → 수량 1 → 출고 등록', '출고 대기 → 출고 확정', '수주 화면에서 출고 수량 확인'],
            notes: '<p>잔량이 없으면 시연만. 재고 부족 오류도 의미 있는 결과임을 설명합니다.</p>' },
          { layout: 'diagram', title: '연동 그래프 — 문서 추적', html: SHOT('ch08_graph_docs', '연동 그래프 문서 추적'), notes: '<p>수주 하나를 골라 출고까지 손가락으로 따라가 보게 합니다. 노드를 클릭하면 아래에 들어오는 · 나가는 데이터가 나옵니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[2].q, options: QUIZ2[2].options, answer: QUIZ2[2].answer, explain: QUIZ2[2].explain, notes: '<p>불합격 LOT 은 10차시에서 자세히 다룹니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['재고 = 입고 · 자재 출고 · 고객 출고 · 재고 조정', '조정도 기록 — 사유 필수, 되돌림도 기록', '출고: 자동(적재함) / 수동(등록 → 확정)', '연동 그래프로 수주 → 출고 문서 사슬 확인'],
            notes: '<p>다음 차시: MES — 생산오더 · 공정 · 디스패치 · 작업지시 · 실적.</p>' },
        ],
      },
    ],
  });
})();
