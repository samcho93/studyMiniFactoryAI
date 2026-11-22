/* 15 사례 실습 ① 생산 · 계획 */
(function () {
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;

  // 사례 공통 흐름 그림
  const FIG_CASE = `<svg viewBox="0 0 700 150" role="img" aria-label="사례 실습의 흐름: 상황 파악, 데이터 확인, AI 에게 묻기와 초안, 사람이 검토와 결정, 실행과 확인">
  ${ARROW('c15a1')}
  <rect x="5" y="40" width="120" height="66" rx="12" class="p1s"/><text x="65" y="68" text-anchor="middle" class="tx-b">① 상황 파악</text><text x="65" y="90" text-anchor="middle" class="tx-m">무엇이 문제?</text>
  <rect x="148" y="40" width="120" height="66" rx="12" class="p2s"/><text x="208" y="68" text-anchor="middle" class="tx-b">② 데이터 확인</text><text x="208" y="90" text-anchor="middle" class="tx-m">ERP · MES 화면</text>
  <rect x="291" y="40" width="120" height="66" rx="12" class="p3s"/><text x="351" y="68" text-anchor="middle" class="tx-b">③ AI 초안</text><text x="351" y="90" text-anchor="middle" class="tx-m">계획 · 답 · 권고</text>
  <rect x="434" y="40" width="120" height="66" rx="12" class="p4s"/><text x="494" y="68" text-anchor="middle" class="tx-b">④ 사람이 결정</text><text x="494" y="90" text-anchor="middle" class="tx-m">검토 · 수정 · 확정</text>
  <rect x="577" y="40" width="118" height="66" rx="12" class="p5s"/><text x="636" y="68" text-anchor="middle" class="tx-b">⑤ 실행 · 확인</text><text x="636" y="90" text-anchor="middle" class="tx-m">MES · 대시보드</text>
  <line x1="127" y1="73" x2="144" y2="73" class="ln" stroke-width="2" marker-end="url(#c15a1)"/>
  <line x1="270" y1="73" x2="287" y2="73" class="ln" stroke-width="2" marker-end="url(#c15a1)"/>
  <line x1="413" y1="73" x2="430" y2="73" class="ln" stroke-width="2" marker-end="url(#c15a1)"/>
  <line x1="556" y1="73" x2="573" y2="73" class="ln" stroke-width="2" marker-end="url(#c15a1)"/>
  <text x="350" y="138" text-anchor="middle" class="tx-m">모든 사례는 이 다섯 단계를 따릅니다 — AI 는 ③ 까지, ④ 결정은 사람</text>
</svg>`;

  const FIG_SHORT = `<svg viewBox="0 0 700 170" role="img" aria-label="자재 부족 해결 흐름: 생산 시작, 자재 가용성 부족으로 릴리스 보류, 부족분 구매 발주, 입고, 다시 생산 시작">
  ${ARROW('c15a2')}
  <rect x="5" y="50" width="118" height="60" rx="10" class="p1s"/><text x="64" y="78" text-anchor="middle" class="tx-b">▶ 생산 시작</text><text x="64" y="98" text-anchor="middle" class="tx-m">릴리스 시도</text>
  <rect x="146" y="50" width="130" height="60" rx="10" class="p5s"/><text x="211" y="78" text-anchor="middle" class="tx-b">릴리스 보류</text><text x="211" y="98" text-anchor="middle" class="tx-m">자재 가용성 부족</text>
  <rect x="299" y="50" width="118" height="60" rx="10" class="p2s"/><text x="358" y="78" text-anchor="middle" class="tx-b">구매 발주</text><text x="358" y="98" text-anchor="middle" class="tx-m">100개 단위 올림</text>
  <rect x="440" y="50" width="110" height="60" rx="10" class="p3s"/><text x="495" y="78" text-anchor="middle" class="tx-b">입고</text><text x="495" y="98" text-anchor="middle" class="tx-m">재고 증가</text>
  <rect x="573" y="50" width="122" height="60" rx="10" class="p1"/><text x="634" y="78" text-anchor="middle" class="tx-w">▶ 생산 시작</text><text x="634" y="98" text-anchor="middle" class="tx-w">MES 로 릴리스</text>
  <line x1="125" y1="80" x2="142" y2="80" class="ln" stroke-width="2" marker-end="url(#c15a2)"/>
  <line x1="278" y1="80" x2="295" y2="80" class="ln" stroke-width="2" marker-end="url(#c15a2)"/>
  <line x1="419" y1="80" x2="436" y2="80" class="ln" stroke-width="2" marker-end="url(#c15a2)"/>
  <line x1="552" y1="80" x2="569" y2="80" class="ln" stroke-width="2" marker-end="url(#c15a2)"/>
  <text x="211" y="140" text-anchor="middle" class="tx-m">생산오더는 '생성' 상태로 남음</text>
  <text x="634" y="140" text-anchor="middle" class="tx-m">같은 계획서에서 다시 누름</text>
</svg>`;

  // ================================================================ 사례 1 급주문
  const LAB_RUSH = `<div class="lab" data-lab="ch15-1-a">
  <div class="lab-head"><span class="lab-badge">사례 1</span><b>급주문 끼워 넣기</b><span class="lab-meta">⏱ 20분 · 화면: ERP · AI 생산계획 · MES · 대시보드</span></div>
  <p class="lab-goal">내일까지 필요한 급주문을 등록하고, 우선순위 1(긴급) · 납기로 계획서를 만들어 확정 · 생산 시작한 뒤 디스패치 보드와 대시보드에서 진행을 확인합니다.</p>
  <p class="lab-pre">실습 프로그램 실행, ERP 기준정보 · 수주 예시가 적용된 상태(6차시). 설비 1대 이상 사용 중.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">ERP</span> → <span class="ui">₩ 영업 · 수주</span> 를 열고 <b>수주 입력</b> 칸에 고객 · 품목(예: 블루 FG-BOX4-BLU) · 수량(예: 10박스) · 납기(내일) · 우선순위(1)를 고른 뒤 <span class="ui">수주 등록</span> 을 누릅니다.</div>
      ${SHOT('ch15_order_form', '수주 입력 칸과 수주 등록 버튼')}
      <div class="lab-check">아래 <b>수주 조회</b> 표 맨 위에 새 수주가 생기고, '우선' 칸이 1, '납기' 칸이 내일 날짜입니다.</div></li>
    <li class="lab-step"><div class="lab-do">새 수주 줄 오른쪽의 <span class="ui">생산계획서로 →</span> 를 누릅니다.</div>
      ${SHOT('ch15_order_toplan', '수주 조회 표의 생산계획서로 버튼')}
      <div class="lab-check">이 수주의 잔량으로 생산계획서 초안(작성 상태)이 만들어집니다.</div>
      <div class="lab-tip">AI 로 만들고 싶으면 <span class="ui">AI 생산계획</span> 에서 <span class="prompt">블루 10박스 급주문, 오늘 처리할 계획 세워줘</span> 처럼 요청해도 됩니다. 규칙 기반(키 없음)은 색 · 수량 · 설비 수 · 시간만 읽으므로, 우선순위 · 납기는 다음 단계처럼 표에서 직접 고칩니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">▤ 생산계획 · 배정</span> 에서 방금 만든 계획서를 고르고, 품목 표의 <b>우선순위</b>가 1 긴급, <b>납기</b>가 내일인지 확인합니다. 다르면 고친 뒤 <span class="ui">편집 저장</span>.</div>
      ${SHOT('ch15_plans_lines', '계획서 품목 표의 우선순위 칸')}
      <div class="lab-check">'저장하지 않은 변경이 있습니다' 표시가 사라졌습니다.</div></li>
    <li class="lab-step"><div class="lab-do">아래 <b>설비 배정</b> 카드에서 <b>설비 수</b>를 <span class="ui">자동</span> 으로 두고 <span class="ui">다시 배정</span> 을 누릅니다.</div>
      ${SHOT('ch15_plans_alloc', '설비 배정 카드의 다시 배정 버튼')}
      <div class="lab-check">'필요 설비 n대' 와 '가용 시간 안' 표시, 설비별 막대가 나옵니다. 긴급(1) 줄이 설비 안에서 맨 앞에 옵니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">생산 계획 완료(확정)</span> → 대화상자에서 <span class="ui">확정</span> 을 누릅니다.</div>
      <div class="lab-check">계획서 상태가 '확정' 으로 바뀝니다. (확정 뒤 다시 편집하면 작성 중으로 돌아갑니다.)</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">▶ 생산 시작</span> 을 누르고, 대화상자 내용을 읽은 뒤 <span class="ui">생산 시작</span> 을 누릅니다.</div>
      ${SHOT('ch15_release_dialog', '생산 시작 확인 대화상자')}
      <div class="lab-check">'✔ … 생산 시작' 문구가 나옵니다. 자재가 부족하면 「자재 가용성 부족 — 릴리스 보류」 표가 나오는데, 그때는 사례 2 의 방법으로 해결합니다.</div>
      <div class="lab-tip">필요 설비가 지금 쓰는 설비보다 많으면 대화상자에 '사용 설비를 n대 → m대로 늘리기' 체크가 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> → <span class="ui">▦ 디스패치 보드</span> 에서 급주문의 작업지시 카드를 찾습니다.</div>
      ${SHOT('mes_dispatch', 'MES 디스패치 보드')}
      <div class="lab-check">급주문 카드가 어느 설비 대기열의 몇 번째인지 확인합니다. 앞에 다른 <b>대기</b> 작업지시가 있으면 카드를 끌어 맨 위로 옮길 수 있습니다(진행 중인 카드는 옮길 수 없음).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">대시보드</span> 에서 계획서 진행률과 설비 가동 간트를 봅니다.</div>
      ${SHOT('dashboard', '대시보드')}
      <div class="lab-check">급주문 계획서의 진행률이 올라가고, 간트에 해당 작업지시 띠가 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">끝나면 <span class="ui">ERP</span> → <span class="ui">⇪ 출고</span> 와 <span class="ui">₩ 영업 · 수주</span> 에서 급주문의 '출고' 수량이 늘었는지 확인합니다(적재함이 출고될 때마다 자동 반영).</div>
      <div class="lab-check">수주 조회 표의 '출고' 칸이 늘고, 다 채우면 상태가 출고 완료로 바뀝니다.</div></li>
  </ol>
  <div class="lab-result">수주(ERP) → 계획서(우선순위 · 납기) → 배정 → <b>사람이 확정 · 시작</b> → MES 대기열 → 대시보드로 이어지는 급주문 처리 흐름을 끝까지 따라갔습니다. 긴급 우선순위는 같은 설비 안의 순서를 앞당기고, 디스패치 보드에서 사람이 한 번 더 조정할 수 있습니다.</div>
  <div class="lab-q">급주문 때문에 원래 계획의 다른 주문이 늦어진다면, 누구에게 무엇을 알려야 할까요?</div>
</div>`;

  // ================================================================ 사례 2 자재 부족
  const LAB_SHORT = `<div class="lab" data-lab="ch15-1-b">
  <div class="lab-head"><span class="lab-badge">사례 2</span><b>자재 부족 해결 — 그린 공작물</b><span class="lab-meta">⏱ 20분 · 화면: AI 생산계획 · ERP 자재(MRP) · 구매</span></div>
  <p class="lab-goal">그린 제품 계획을 생산 시작하려다 공작물이 부족해 릴리스가 보류되는 상황을 만들고, 구매 발주 → 입고 → 다시 생산 시작으로 해결합니다.</p>
  <p class="lab-pre">ERP 기준정보 예시 적용(그린 공작물 재고가 일부러 적게 들어 있음). 화면의 숫자는 그동안의 실습 데이터에 따라 다를 수 있습니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">ERP</span> 오른쪽 아래 <span class="ui">✦ AI 도우미</span> 를 열고 예시 버튼 <span class="prompt">자재 부족 품목은?</span> 을 보냅니다.</div>
      ${SHOT('erp_ai_answer', 'ERP AI 도우미 답변')}
      <div class="lab-check">부족 품목 목록에 <code>WP-RECT-GRN</code>(그린 공작물)이 있는지 확인합니다. AI 는 조회만 하고 발주는 하지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">AI 생산계획</span> 에서 <span class="prompt">그린 15 만들자</span> 를 보냅니다.</div>
      ${SHOT('ch15_ai_green', '그린 15 계획 초안')}
      <div class="lab-check">계획서 초안이 오른쪽에 열립니다. 그린 박스 15개 = 공작물 60개가 필요합니다(박스 1개 = 공작물 4개).</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 계획서에서 <span class="ui">▶ 생산 시작</span> → 대화상자 <span class="ui">생산 시작</span> 을 누릅니다.</div>
      ${SHOT('ch15_shortage', '자재 가용성 부족 — 릴리스 보류 표')}
      <div class="lab-check">빨간 「자재 가용성 부족 — 릴리스 보류」 표가 나오고 <code>WP-RECT-GRN</code> 줄의 소요 · 가용 · 부족(✕) 수량이 보입니다. 생산은 시작되지 않았습니다.</div>
      <div class="lab-tip">이때 계획 줄마다 만들어진 <b>생산오더</b>는 '생성' 상태로 남아 있다가, 입고 뒤 다시 생산 시작하면 그대로 이어 씁니다.</div></li>
    <li class="lab-step"><div class="lab-do">표 아래 <span class="ui">부족분 구매 발주</span> 를 누릅니다.</div>
      <div class="lab-check">"구매 발주 n건을 만들었습니다. 「자재(MRP) · 구매」에서 입고 처리한 뒤 다시 릴리스하세요." 문구가 나옵니다. 발주 수량은 부족분을 100개 단위로 올린 값입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">ERP</span> → <span class="ui">⛁ 자재(MRP) · 구매</span> 를 열어 위쪽 <b>자재 소요 계획(MRP)</b> 표에서 그린 공작물의 총소요 · 현재고 · 발주잔 · 안전재고 · 부족을 읽습니다.</div>
      ${SHOT('ch15_materials_mrp', 'MRP 표와 부족분 구매 발주 버튼')}
      <div class="lab-check">방금 발주한 수량이 '발주잔' 에 들어가 있습니다. MRP 의 부족은 <b>안전재고까지</b> 포함해 계산하므로 릴리스 보류 표의 부족보다 클 수 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">아래 <b>구매 발주</b> 표에서 그린 공작물 발주 줄의 <span class="ui">입고</span> 를 누릅니다(공급처에서 물건이 도착했다고 가정).</div>
      ${SHOT('ch15_materials_po', '구매 발주 표의 입고 버튼')}
      <div class="lab-check">발주 상태가 '입고 완료' 로 바뀌고, <span class="ui">▣ 재고</span> 에서 그린 공작물 재고가 늘었습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">▤ 생산계획 · 배정</span> 에서 같은 그린 계획서를 고르고 <span class="ui">▶ 생산 시작</span> → <span class="ui">생산 시작</span> 을 다시 누릅니다.</div>
      <div class="lab-check">이번에는 보류 표 없이 '✔ … 생산 시작' 이 나옵니다. <span class="ui">⚑ 생산오더</span> 에서 그린 생산오더가 릴리스 상태로 바뀐 것을 확인합니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">✦ AI 도우미</span> 에 <span class="prompt">자재 부족 품목은?</span> 을 다시 물어 1단계 답과 비교합니다.</div>
      <div class="lab-check">그린 공작물의 부족이 줄었거나 사라졌습니다(다른 계획이 남아 있으면 여전히 부족으로 나올 수 있음 — 이유를 설명할 수 있으면 성공).</div></li>
  </ol>
  <div class="lab-result">ERP 는 생산을 시작하기 전에 <b>자재 가용성(ATP)</b>을 확인해 부족하면 릴리스를 막습니다. 해결은 사람이 합니다 — 구매 발주 · 입고 처리 · 다시 생산 시작. <span class="ui">부족해도 릴리스</span> 는 감사 기록이 남는 예외 처리로, 생산 중 자재가 떨어질 위험을 감수할 때만 씁니다.</div>
  <div class="lab-q">입고가 3일 뒤라면 그사이 그린 대신 무엇을 먼저 생산하면 좋을까요? 어떤 화면을 보고 정하겠습니까?</div>
</div>`;

  // ================================================================ 사례 3 다색 소량
  const LAB_MULTI = `<div class="lab" data-lab="ch15-2-a">
  <div class="lab-head"><span class="lab-badge">사례 3</span><b>다색 소량 주문 — 품목 전환과 설비 수</b><span class="lab-meta">⏱ 20분 · 화면: AI 생산계획 · ERP 생산계획</span></div>
  <p class="lab-goal">5색을 5박스씩 만드는 주문에서 품목 전환(색 교체)이 어디서 생기는지 보고, 설비 수 · 전환 시간을 바꿔 가며 가장 알맞은 배정을 고릅니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">AI 생산계획</span> 에 <span class="prompt">화이트 5, 레드 5, 옐로 5, 그린 5, 블루 5 만들자</span> 를 보냅니다.</div>
      ${SHOT('ch15_ai_multi', '5색 소량 계획 초안과 설비 배정')}
      <div class="lab-check">답변에 '색 5종을 설비 4대로 생산: 일부 설비는 품목 전환(색 교체)이 필요' 경고가 나옵니다. 설비 배정 그림에서 한 설비에 두 색이 있고 사이에 빗금(전환 시간)이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">배정 결과를 표로 적습니다: 설비 · 색 · 박스 · 예상 시간. 맨 아래 '완료 예상' 시간도 적습니다.</div>
      <div class="lab-check">한 설비만 두 색(전환 1회 포함)이라 그 설비가 가장 늦게 끝납니다 — 이것이 <b>완료 예상(가장 늦게 끝나는 설비)</b> 입니다.</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 계획서의 <b>설비 배정</b> 카드에서 <b>설비 수</b>를 <span class="ui">2대 고정</span> 으로 바꾸고 <span class="ui">다시 배정</span> 합니다.</div>
      <div class="lab-check">설비 2대가 5색을 나눠 맡아 전환이 여러 번 생기고, 완료 예상이 길어집니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>품목 전환(분)</b> 을 5 → 15 로 바꾸고 <span class="ui">다시 배정</span> 합니다(청소 · 공급 색 교체가 오래 걸리는 공장이라고 가정).</div>
      <div class="lab-check">빗금 구간이 길어지고 완료 예상이 더 늘어납니다. 소량 다품종에서는 <b>전환 시간</b>이 생산 시간보다 커질 수 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">설비 수를 <span class="ui">4대 고정</span>, 전환 15분으로 다시 배정해 2대일 때와 비교합니다.</div>
      <div class="lab-check">4대에서는 전환이 1회로 줄어 완료 예상이 짧아집니다.</div></li>
    <li class="lab-step"><div class="lab-do">다음 표를 채워 결론을 냅니다: <b>설비 수 / 전환 시간 / 전환 횟수 / 완료 예상 / 가용 시간 안?</b> (2대 · 4대 × 5분 · 15분, 네 줄)</div>
      <div class="lab-check">네 줄이 모두 채워지고 "설비를 늘리면 전환이 줄어 빨리 끝나지만, 설비마다 가동률은 낮아진다" 같은 결론이 적혔습니다.</div></li>
    <li class="lab-step"><div class="lab-do">고른 조건으로 설비 수를 맞춘 뒤 <span class="ui">생산 계획 완료(확정)</span> 까지 누릅니다(생산 시작은 강사 안내에 따릅니다).</div>
      <div class="lab-check">계획서가 확정 상태이고, 배정 그림이 고른 조건과 같습니다.</div></li>
  </ol>
  <div class="lab-result">설비 1대는 한 번에 한 색만 만들기 때문에, 색이 설비보다 많으면 <b>품목 전환</b>이 생깁니다. AI(배정 알고리즘)는 같은 색을 하던 설비를 우선해 전환을 줄이지만, 설비 수 · 전환 시간을 정하는 것은 사람의 판단입니다.</div>
</div>`;

  // ================================================================ 사례 4 설비 증설
  const LAB_CELLS = `<div class="lab" data-lab="ch15-2-b">
  <div class="lab-head"><span class="lab-badge">사례 4</span><b>설비 증설 판단 — 1대 · 2대 · 3대 · 4대 비교</b><span class="lab-meta">⏱ 20분 · 화면: AI 생산계획</span></div>
  <p class="lab-goal">같은 주문(레드 120박스, 가용 15분)을 설비 수만 바꿔 배정해 보고, 납기를 지키는 <b>최소 설비 수</b>를 근거와 함께 결정합니다.</p>
  <p class="lab-pre">실제 공장이라면 몇 시간짜리 계획이지만, 실습에서는 시간을 짧게(0.25시간 = 15분) 잡아 차이가 잘 보이게 합니다. 박스 1개는 약 8.2초(설비 1대 기준)입니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">AI 생산계획</span> 에 <span class="prompt">레드 120 설비 1대 0.25시간</span> 을 보냅니다.</div>
      ${SHOT('ch15_ai_cap1', '설비 1대 배정 결과 — 가용 시간 초과')}
      <div class="lab-check">'설비 1대 가동 · 예상 소요 17분 / 가용 15분 · ⚠ 가용 시간 초과', 설비 #1 가동 110 % 가 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="prompt">레드 120 설비 2대 0.25시간</span> 을 보냅니다.</div>
      ${SHOT('ch15_ai_cap2', '설비 2대 배정 결과')}
      <div class="lab-check">레드 120 이 60 + 60 으로 <b>나뉘어</b> 두 설비가 동시에 만들고, '가용 시간 안 완료' 가 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="prompt">레드 120 설비 3대 0.25시간</span> 을 보냅니다.</div>
      ${SHOT('ch15_ai_cap3', '설비 3대 배정 결과')}
      <div class="lab-check">여전히 2대만 쓰고 '설비 #3 는 배정된 작업이 없습니다' 경고가 나옵니다. 이미 가용 시간 안이라 더 나누지 않기 때문입니다.</div></li>
    <li class="lab-step"><div class="lab-do">마지막으로 <span class="prompt">레드 120 0.25시간</span> (설비 수 말하지 않기)을 보내 AI 가 자동으로 고른 설비 수를 봅니다.</div>
      <div class="lab-check">자동 배정도 2대를 고릅니다 — 필요 설비 수 = 총 소요 ÷ 가용 시간을 올림한 값입니다.</div></li>
    <li class="lab-step"><div class="lab-do">결정표를 만듭니다: <b>설비 수 / 완료 예상 / 가용 시간 안? / 설비별 가동률 / 쓰지 않는 설비</b> (1~4대).</div>
      <div class="lab-check">1대 ✕(110 %), 2대 ✔(약 55 %), 3대 ✔(1대 놀음), 4대 ✔(2대 놀음)처럼 채워졌습니다.</div></li>
    <li class="lab-step"><div class="lab-do">주문이 레드 240박스로 두 배가 되면 몇 대가 필요할지 먼저 예상해 적고, <span class="prompt">레드 240 0.25시간</span> 으로 확인합니다.</div>
      <div class="lab-check">예상과 AI 배정 결과(필요 설비 수 · 가용 시간 안 여부)가 같은지 비교했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">결정 문장을 씁니다: "이 주문은 설비 __대면 충분하다. 근거: ___. 더 늘리면 ___."</div>
      <div class="lab-check">근거에 완료 예상 · 가용 시간 · 놀고 있는 설비가 들어갔습니다.</div></li>
  </ol>
  <div class="lab-result">설비를 늘리면 언제나 빨라지는 것이 아니라, <b>필요한 만큼까지만</b> 효과가 있습니다. AI 는 계산과 배정을 해 주고, "설비를 몇 대 돌릴지 · 증설할지" 는 비용 · 인력까지 생각해 사람이 정합니다.</div>
  <div class="lab-q">설비를 놀리지 않으려면 남는 설비에 무엇을 맡길 수 있을까요? (예: 다음 주문 미리 생산, 정비)</div>
</div>`;

  // ================================================================ 사례 5 납기 지연 위험
  const LAB_LATE = `<div class="lab" data-lab="ch15-3-a">
  <div class="lab-head"><span class="lab-badge">사례 5</span><b>납기 지연 위험 대응</b><span class="lab-meta">⏱ 20분 · 화면: ERP 개요 · AI 도우미 · 생산계획</span></div>
  <p class="lab-goal">납기가 임박했거나 지난 수주를 찾아, 계획을 다시 세우고(우선순위 · 설비 나누기 · 가용 시간), 고객 · 현장에 알릴 내용을 정리합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">ERP</span> → <span class="ui">▦ 개요</span> 에서 <b>납기 임박(2일)</b> 칸의 숫자와 그 아래 '지연 n건' 을 읽습니다.</div>
      ${SHOT('ch15_overview_due', 'ERP 개요의 납기 임박 칸')}
      <div class="lab-check">납기 임박 건수와 지연 여부를 적었습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">✦ AI 도우미</span> 에서 <span class="prompt">미출고 수주와 납기 임박 알려줘</span> 를 보냅니다.</div>
      ${SHOT('ch15_erp_ai_due', 'AI 도우미 — 미출고 수주와 납기')}
      <div class="lab-check">수주번호 · 납기 · 품목별 잔량이 나옵니다. 납기가 가장 빠른 수주를 표시해 둡니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">₩ 영업 · 수주</span> 의 수주 조회 표에서 같은 수주의 '수량 · 출고 · 납기 · 상태' 를 찾아 AI 의 답과 비교합니다.</div>
      <div class="lab-check">AI 가 말한 잔량 = 수량 − 출고 와 같습니다(같지 않으면 화면 기준으로 판단).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">▤ 생산계획 · 배정</span> 에서 <span class="ui">미출고 수주로 작성</span> 을 눌러 남은 수주 전체로 계획서를 만듭니다.</div>
      ${SHOT('ch15_plans_example', '생산계획서 목록과 작성 버튼들')}
      <div class="lab-check">수주 줄마다 우선순위 · 납기가 들어간 계획서 초안이 생깁니다.</div></li>
    <li class="lab-step"><div class="lab-do">설비 배정 결과에서 납기가 가장 빠른 수주의 작업이 <b>설비 안 첫 순서</b>인지 확인합니다. 아니면 그 줄의 우선순위를 1 로 바꾸고 <span class="ui">편집 저장</span> → <span class="ui">다시 배정</span>.</div>
      <div class="lab-check">급한 줄이 설비 막대의 맨 앞에 옵니다(설비 안 순서 = 우선순위 → 납기 → 큰 작업).</div></li>
    <li class="lab-step"><div class="lab-do">'가용 시간 초과' 가 나오면 두 가지를 차례로 시험합니다: ① 설비 수를 늘려 <span class="ui">다시 배정</span>, ② <b>가용 시간(설비 1대, 시간)</b> 을 늘려(잔업) <span class="ui">편집 저장</span> → <span class="ui">다시 배정</span>.</div>
      <div class="lab-check">어느 방법으로 '가용 시간 안' 이 되는지, 또는 둘 다 안 되는지 적었습니다.</div></li>
    <li class="lab-step"><div class="lab-do">결정한 계획을 <span class="ui">생산 계획 완료(확정)</span> → <span class="ui">▶ 생산 시작</span> 합니다(강사 안내에 따름).</div>
      <div class="lab-check">계획서가 생산 시작 상태이고 MES 디스패치 보드에 작업지시가 생겼습니다.</div></li>
    <li class="lab-step"><div class="lab-do">알릴 내용을 세 줄로 씁니다: <b>누구에게</b>(고객 · 현장 반장) / <b>무엇을</b>(예상 완료 시각 · 바뀐 순서) / <b>근거</b>(배정 결과 화면).</div>
      <div class="lab-check">예상 완료 시각을 배정 결과의 '완료 예상' 에서 가져와 적었습니다.</div>
      <div class="lab-tip">API 키를 등록한 Claude 모드라면 AI 도우미에게 안내 문구 초안을 부탁할 수도 있지만, 숫자는 반드시 화면으로 확인해 사람이 보냅니다.</div></li>
  </ol>
  <div class="lab-result">지연 위험은 <b>찾기(개요 · AI 도우미) → 확인(수주 표) → 다시 계획(우선순위 · 설비 · 시간) → 결정 · 알림</b> 순서로 다룹니다. AI 는 찾고 계산해 주지만, 잔업 · 증설 · 고객 안내는 사람의 결정입니다.</div>
</div>`;

  // ================================================================ 사례 6 주간 계획
  const LAB_WEEK = `<div class="lab" data-lab="ch15-3-b">
  <div class="lab-head"><span class="lab-badge">사례 6</span><b>주간 계획 세우고 파일로 공유하기</b><span class="lab-meta">⏱ 25분 · 화면: ERP 데이터 가져오기 · 생산계획</span></div>
  <p class="lab-goal">이번 주 고객 수주(예시)를 요일별 계획서로 나누고, 계획서를 파일로 내보내 다른 사람(다른 PC)과 공유한 뒤 불러와 첫날 계획을 확정합니다.</p>
  <p class="lab-pre">예시 수주 4건: 납기 1일(레드 20 · 화이트 10, 우선 1), 2일(블루 15, 우선 2), 2일(옐로 10 · 그린 15), 4일(화이트 10 · 레드 5).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">ERP</span> → <span class="ui">⇩ 데이터 가져오기</span> 에서 <span class="ui">📄 예시: 이번 주 고객 수주(수요)</span> 를 누르고 검증 결과를 본 뒤 <span class="ui">적용</span> 합니다(이미 적용했으면 이 단계는 건너뜁니다 — 같은 고객 주문번호는 한 번만 들어갑니다).</div>
      ${SHOT('erp_data_example', '데이터 가져오기 검증 결과')}
      <div class="lab-check">가져오기 이력에 수주 4건이 기록되었습니다.</div></li>
    <li class="lab-step"><div class="lab-do">수주를 납기별로 묶어 요일 계획을 종이에 먼저 짭니다: 1일차(납기 1일) · 2일차(납기 2일) · 3~4일차(납기 4일).</div>
      <div class="lab-check">각 날짜에 색 · 박스 수가 적혔습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">▤ 생산계획 · 배정</span> 에서 <span class="ui">+ 새 계획서</span> 를 누르고, <b>계획서 이름</b>(예: 1일차), <b>계획일</b>, 품목 줄(<span class="ui">+ 품목 추가</span> 로 색 · 수량 · 우선순위 · 납기)을 채운 뒤 <span class="ui">편집 저장</span> 합니다. 2일차 · 3일차도 같은 방법으로 만듭니다.</div>
      ${SHOT('ch15_plans_lines', '계획서 편집 표')}
      <div class="lab-check">목록에 계획서 3개가 생기고, 각각 '설비 n대' 와 색 견본이 보입니다.</div>
      <div class="lab-tip">AI 생산계획에 <span class="prompt">레드 20, 화이트 10 만들자</span> 처럼 하루치씩 요청해 초안을 만든 뒤 이름 · 계획일 · 납기만 고쳐도 됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">계획서마다 <span class="ui">다시 배정</span> 해서 '가용 시간 안' 인지 확인합니다.</div>
      <div class="lab-check">세 계획서 모두 배정 결과가 있고, 초과가 있으면 설비 수 · 시간을 조정했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">1일차 계획서를 고르고 위쪽 <span class="ui">내보내기(파일)</span> 를 누릅니다.</div>
      ${SHOT('ch15_plans_export', '내보내기(파일)와 파일 불러오기 버튼')}
      <div class="lab-check">JSON 파일(형식 <code>minifactory.schedule.v1</code>)이 내려받기 폴더에 저장되었습니다.</div></li>
    <li class="lab-step"><div class="lab-do">파일을 짝(또는 강사)에게 보냅니다(메신저 · USB · 공유 폴더). 받은 사람은 자기 PC 의 <span class="ui">▤ 생산계획 · 배정</span> 에서 <span class="ui">파일 불러오기…</span> 로 그 파일을 고릅니다.</div>
      <div class="lab-check">받은 쪽 목록에 같은 품목 · 수량의 계획서가 새로 생깁니다(새 계획서 번호).</div></li>
    <li class="lab-step"><div class="lab-do">두 사람이 같은 계획서를 보며 배정 결과가 같은지 비교합니다. 다르면 이유를 찾습니다(설비 수 고정 여부 · 전환 시간 · 사용 중 설비 수).</div>
      <div class="lab-check">차이가 없거나, 차이의 이유를 한 줄로 설명했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">1일차 계획서만 <span class="ui">생산 계획 완료(확정)</span> → <span class="ui">▶ 생산 시작</span> 합니다. 2 · 3일차는 확정만 해 둡니다.</div>
      <div class="lab-check">1일차는 생산 시작, 2 · 3일차는 확정 상태입니다. MES 디스패치 보드에는 1일차 작업지시만 있습니다.</div></li>
  </ol>
  <div class="lab-result">계획은 한 번에 다 시작하지 않고 <b>날짜별로 나눠 확정 → 그날 시작</b>합니다. 계획서 파일은 사람끼리 계획을 검토 · 공유하는 수단이고, 불러온 뒤에도 확정 · 시작은 각 현장 담당자가 합니다.</div>
  <div class="lab-q">2일차에 급주문(사례 1)이 들어오면 주간 계획의 어느 계획서를 어떻게 고치겠습니까?</div>
</div>`;

  // ================================================================ 퀴즈
  const Q1 = [
    { q: '급주문을 수주로 등록한 뒤 그 수주로 바로 계획서를 만드는 버튼은?',
      options: ['미출고 수주로 작성', '생산계획서로 →', '다시 배정', '파일 불러오기…'], answer: 1,
      explain: '수주 조회 표의 각 수주 줄 오른쪽 「생산계획서로 →」 는 그 수주의 잔량으로 계획서를 만듭니다.' },
    { q: '계획서의 우선순위를 <b>1(긴급)</b> 로 바꾸면 배정에서 무엇이 달라질까요?',
      options: ['필요 설비 수가 무조건 4대가 된다', '같은 설비 안에서 그 작업이 앞 순서로 온다', '자재 가용성 확인을 건너뛴다', '바로 생산이 시작된다'], answer: 1,
      explain: '설비 안 순서는 우선순위 → 납기 → 큰 작업 순입니다. 생산 시작은 여전히 사람이 누릅니다.' },
    { q: '「자재 가용성 부족 — 릴리스 보류」 표가 나왔을 때 정상적인 해결 순서는?',
      options: ['부족해도 릴리스 → 끝', '부족분 구매 발주 → 입고 → 같은 계획서에서 ▶ 생산 시작 다시', '계획서를 삭제하고 새로 만들기', 'AI 도우미에게 발주를 시키기'], answer: 1,
      explain: '발주 · 입고는 사람이 처리하고, 같은 계획서에서 생산 시작을 다시 누르면 남아 있던 생산오더가 릴리스됩니다. AI 도우미는 조회만 합니다.' },
    { q: 'MRP 표의 부족 수량이 릴리스 보류 표의 부족 수량보다 큰 이유로 알맞은 것은?',
      options: ['MRP 가 틀려서', 'MRP 는 진행 중인 모든 계획과 안전재고까지 포함해 계산하기 때문', '릴리스 보류 표는 재고를 두 번 세기 때문', '단위가 박스와 개로 달라서'], answer: 1,
      explain: 'MRP = 총소요 − (현재고 + 발주잔) + 안전재고. 릴리스 보류 표는 그 생산오더 하나의 가용성만 봅니다.' },
  ];
  const Q2 = [
    { q: '5색을 설비 4대로 생산할 때 생기는 일은?',
      options: ['한 색은 만들 수 없다', '한 설비가 두 색을 만들면서 품목 전환(색 교체)이 생긴다', '설비 5대가 자동으로 생긴다', '전환 시간 없이 동시에 만든다'], answer: 1,
      explain: '설비 1대는 한 번에 한 색만 만들기 때문에, 색이 설비보다 많으면 전환이 필요합니다.' },
    { q: '레드 120박스 · 가용 15분 주문을 설비 3대로 고정했을 때 결과로 맞는 것은?',
      options: ['3대가 40박스씩 나눈다', '2대만 60박스씩 쓰고 #3 은 배정 없음 경고', '가용 시간 초과', '1대만 쓴다'], answer: 1,
      explain: '2대로 나누면 이미 가용 시간 안이라 더 나누지 않습니다. 남는 설비에는 "배정된 작업이 없습니다" 경고가 나옵니다.' },
    { q: '품목 전환(분)을 5에서 15로 늘리면 일반적으로 어떻게 될까요?',
      options: ['완료 예상이 짧아진다', '전환이 있는 설비의 완료 예상이 길어진다', '필요 설비 수가 줄어든다', '아무 변화 없다'], answer: 1,
      explain: '전환이 있는 설비마다 전환 시간만큼 늦게 끝납니다. 소량 다품종에서는 이 차이가 큽니다.' },
    { q: '설비 증설 여부를 결정할 때 AI(배정)의 역할로 알맞은 것은?',
      options: ['증설을 스스로 결정해 설비를 산다', '설비 수별 완료 예상 · 가동률을 계산해 근거를 보여 준다', '비용을 무시하고 항상 4대를 권한다', '아무 역할이 없다'], answer: 1,
      explain: 'AI 는 계산 · 배정으로 근거를 만들고, 비용 · 인력을 고려한 결정은 사람이 합니다.' },
  ];
  const Q3 = [
    { q: 'ERP 개요에서 납기가 가까운 수주 수를 보여 주는 칸은?',
      options: ['수주 잔량', '납기 임박(2일)', '재고 금액', '오늘 출고'], answer: 1,
      explain: '「납기 임박(2일)」 칸과 그 아래 「지연 n건」 으로 위험을 먼저 찾습니다.' },
    { q: 'AI 도우미가 알려 준 잔량을 확인하는 가장 좋은 방법은?',
      options: ['그대로 믿는다', '수주 조회 표에서 수량 − 출고 를 직접 확인한다', 'AI 에게 한 번 더 묻는다', '대시보드만 본다'], answer: 1,
      explain: 'AI 의 숫자는 도구로 조회한 값이지만, 결정 전에는 원래 화면에서 확인하는 습관이 필요합니다.' },
    { q: '내보낸 계획서 파일을 다른 PC 에서 쓰는 방법은?',
      options: ['데이터 가져오기 → 적용', '생산계획 · 배정 → 파일 불러오기…', 'MES → 배정 불러오기…', '파일을 열기만 하면 자동 반영'], answer: 1,
      explain: '계획서 파일(minifactory.schedule.v1)은 생산계획 화면의 「파일 불러오기…」 로 새 계획서로 들어옵니다. MES 의 배정 파일과는 다릅니다.' },
    { q: '주간 계획을 날짜별 계획서로 나눠 두는 이유로 알맞은 것은?',
      options: ['한 번에 모두 생산 시작하려고', '그날 계획만 확정 · 시작하고 나머지는 변경에 대비하려고', '계획서 번호를 많이 만들려고', 'AI 가 그렇게 시켜서'], answer: 1,
      explain: '급주문 · 자재 사정이 바뀔 수 있으므로, 시작은 날짜별로 하고 뒤 계획은 고칠 여지를 둡니다.' },
  ];

  const DEBRIEF = (rows) => ({ type: 'table', head: ['단계', 'AI 가 한 일', '사람이 결정한 일'], rows });

  PY_COURSE.addChapter({
    id: 'ch15', no: '15', title: '사례 실습 ① 생산 · 계획', subtitle: 'Production & Planning Cases',
    summary: '급주문 · 자재 부족 · 다색 소량 주문 · 설비 증설 · 납기 지연 위험 · 주간 계획 등 여섯 가지 계획 사례를 처음부터 끝까지 단계별로 해결합니다.',
    goals: ['급주문 · 자재 부족 상황에서 ERP · AI 생산계획 · MES 를 이어 써서 생산을 시작할 수 있다',
      '설비 수 · 품목 전환 시간을 바꿔 배정을 비교하고 근거로 결정할 수 있다',
      '납기 위험을 찾아 다시 계획하고, 계획서를 파일로 공유 · 불러올 수 있다',
      '각 사례에서 AI 가 한 일과 사람이 결정한 일을 구분할 수 있다'],
    sections: [
      // ------------------------------------------------------------ 15-1
      {
        id: 'ch15-1', title: '급주문 끼워 넣기 · 자재 부족 해결', minutes: 50,
        goals: ['급주문을 수주 → 계획서 → 확정 · 생산 시작 → MES 까지 처리한다', '자재 가용성 부족을 구매 발주 · 입고 · 재릴리스로 해결한다', 'AI 와 사람의 역할을 사례로 설명한다'],
        flow: [['상황 소개', 5], ['사례 1 급주문', 20], ['사례 2 자재 부족', 20], ['돌아보기 · 퀴즈', 5]],
        content: [
          { type: 'p', html: 'Part 5 는 지금까지 배운 화면과 AI 기능을 <b>실제 현장 상황</b>에 맞춰 이어 쓰는 사례 실습입니다. 사례마다 <b>상황 → 목표 · 성공 기준 → 단계별 실습 → 돌아보기</b> 순서로 진행합니다.' },
          { type: 'figure', html: FIG_CASE, caption: '사례 실습의 다섯 단계 — AI 는 초안 · 계산 · 조회까지, 결정은 사람' },
          { type: 'h', text: '사례 1 — 급주문 끼워 넣기' },
          { type: 'callout', kind: 'info', title: '📖 상황', html: '<p>오후 2시, 영업 담당 김 대리에게 단골 고객의 전화가 왔습니다. "블루 박스 10개가 <b>내일 오전까지</b> 꼭 필요합니다." 공장에는 이미 오늘 계획이 돌아가고 있고, 설비는 4대입니다. 생산 관리자인 여러분이 급주문을 계획에 끼워 넣어야 합니다.</p>' },
          { type: 'table', head: ['목표', '성공 기준'], rows: [
            ['급주문을 등록하고 우선순위 1 · 납기 내일로 생산 시작', '계획서가 생산 시작 상태, MES 디스패치 보드에 급주문 작업지시가 있음'],
            ['진행을 확인', '대시보드 계획서 진행률 · 간트에서 급주문 작업이 보임']] },
          { type: 'figure', html: LAB_RUSH },
          DEBRIEF([['수주 → 계획서', '—(버튼으로 잔량 계산)', '급주문 수락 · 등록'], ['배정', '설비 수 · 순서 계산(긴급 먼저)', '우선순위 · 납기 확인'], ['시작', '—', '확정 · 생산 시작'], ['진행', '—', '디스패치 순서 조정 · 모니터링']]),
          { type: 'h', text: '사례 2 — 자재 부족 해결' },
          { type: 'callout', kind: 'info', title: '📖 상황', html: '<p>그린 박스 주문 15개를 생산하려는데, 창고 담당자가 "그린 공작물이 얼마 안 남았다" 고 합니다. 생산 시작 버튼을 눌러도 될까요? ERP 는 생산을 시작하기 전에 자재가 충분한지 확인합니다.</p>' },
          { type: 'figure', html: FIG_SHORT, caption: '자재 부족 해결 흐름 — 생산오더는 보류 동안 생성 상태로 남았다가 다시 릴리스됩니다' },
          { type: 'table', head: ['목표', '성공 기준'], rows: [
            ['부족 자재를 찾아 구매 · 입고', '구매 발주가 입고 완료, 그린 공작물 재고 증가'],
            ['그린 계획을 MES 로 릴리스', '같은 계획서에서 생산 시작 성공, 생산오더 릴리스 상태']] },
          { type: 'figure', html: LAB_SHORT },
          DEBRIEF([['부족 찾기', 'AI 도우미가 MRP 조회 · 요약', '—'], ['계획', '초안 · 배정', '그린 15 생산 결정'], ['보류', 'ERP 가 ATP 확인 후 자동 보류', '—'], ['해결', '—', '구매 발주 · 입고 처리 · 다시 생산 시작']]),
          { type: 'callout', kind: 'warn', title: '부족해도 릴리스?', html: '「부족해도 릴리스」 는 감사 기록이 남는 예외 버튼입니다. 자재가 곧 들어온다는 확신이 있고 책임자가 승인했을 때만 씁니다. 실습에서는 누르지 않습니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>준비</b>: 6차시의 ERP 기준정보 · 수주 예시가 적용되어 있어야 합니다. 그린 공작물 재고는 예시에서 일부러 적게(40개) 들어 있으나, 앞 실습에서 입고했으면 부족이 안 날 수 있습니다 → 그때는 <span class="ui">그린 40 만들자</span> 처럼 수량을 늘리면 다시 부족이 납니다.</li><li><b>초기화</b>: 한 반이 같은 서버를 쓰면 서로의 입고 · 생산이 섞입니다. 가능하면 학생 PC 마다 run.bat 으로 따로 실행하고, 처음부터 하려면 프로그램을 끄고 <code>data\\</code> 폴더를 다른 이름으로 옮깁니다(4차시).</li><li><b>예상 결과</b>: 사례 1 — 급주문 줄이 설비 막대 맨 앞, 사례 2 — 첫 시도 보류, 입고 후 성공. MRP 부족이 보류 표보다 큰 것은 정상(안전재고 · 다른 계획 포함).</li><li><b>토론 질문</b>: "급주문을 받으면 기존 고객 납기는 누가 책임지나?", "부족해도 릴리스를 누르면 어떤 위험이 있나?"</li><li><b>평가 체크리스트</b>: ① 수주 등록 · 우선순위 1 ② 생산 시작 성공 ③ 디스패치 보드에서 위치 확인 ④ 보류 표 캡처 ⑤ 발주 · 입고 ⑥ 재릴리스 성공 ⑦ AI/사람 역할 표 작성.</li></ul>' },
        ],
        practice: [],
        quiz: Q1,
        slides: [
          { layout: 'title', title: '사례 1 · 2', subtitle: '급주문 끼워 넣기 · 자재 부족 해결', notes: '<p>Part 5 시작. 지금까지 배운 화면을 상황에 맞게 이어 쓰는 시간입니다. 오늘은 계획 쪽 사례 두 개.</p>' },
          { layout: 'diagram', title: '사례 실습의 다섯 단계', html: FIG_CASE, notes: '<p>모든 사례에서 ④ 결정은 사람이 한다는 점을 먼저 판서합니다.</p>' },
          { layout: 'bullets', title: '사례 1 상황 — 내일까지 블루 10박스', bullets: ['오늘 계획이 이미 돌아가는 중', '급주문 등록 → 우선순위 1 · 납기 내일', '계획서 → 배정 → 확정 → 생산 시작', '디스패치 보드 · 대시보드로 확인'],
            notes: '<p>💬 "급주문을 받기 전에 확인해야 할 것은?" → 자재, 설비 여유, 기존 납기. 역할극: 한 명은 영업, 한 명은 생산 관리.</p>' },
          { layout: 'diagram', title: '수주 등록 → 생산계획서로', html: SHOT('ch15_order_toplan', '생산계획서로 버튼'),
            notes: '<p>시연: 수주 등록 후 「생산계획서로 →」. 규칙 기반 AI 는 우선순위 · 납기를 읽지 못하므로 표에서 확인 · 수정하게 합니다.</p>' },
          { layout: 'diagram', title: '생산 시작 확인', html: SHOT('ch15_release_dialog', '생산 시작 대화상자'),
            notes: '<p>대화상자 문장을 소리 내 읽게 합니다: 생산오더 → ATP → MES 작업지시. "누가 이 버튼을 누르나?" → 사람.</p>' },
          { layout: 'bullets', title: '사례 2 상황 — 그린 공작물이 모자라다', bullets: ['AI 도우미로 부족 품목 확인', '그린 15 계획 → 생산 시작 → 릴리스 보류', '부족분 구매 발주 → 입고', '같은 계획서에서 다시 생산 시작'],
            notes: '<p>💬 "자재가 없는데 생산을 시작하면 어떻게 될까?" → 중간에 라인이 멈춤. 그래서 ERP 가 먼저 막아 준다.</p>' },
          { layout: 'diagram', title: '자재 가용성 부족 — 릴리스 보류', html: SHOT('ch15_shortage', '릴리스 보류 표'),
            notes: '<p>표의 소요 · 현재고 · 가용 · 부족을 함께 읽습니다. 숫자는 반마다 다를 수 있다고 미리 말해 둡니다.</p>' },
          { layout: 'diagram', title: '자재 부족 해결 흐름', html: FIG_SHORT,
            notes: '<p>입고 버튼 위치(자재(MRP) · 구매 → 구매 발주 표)를 시연. 「부족해도 릴리스」 는 누르지 않게 합니다.</p>' },
          { layout: 'table', title: '돌아보기 — AI vs 사람', head: ['', 'AI', '사람'], rows: [['사례 1', '배정 · 순서 계산', '수락 · 확정 · 시작 · 순서 조정'], ['사례 2', '부족 조회 · 요약, ATP 보류', '발주 · 입고 · 재시작']],
            notes: '<p>모둠별로 표를 채워 발표. "AI 가 다 할 수 있게 하면 좋을까?" 토론 2분.</p>' },
          { layout: 'quiz', title: '확인 문제', q: Q1[2].q, options: Q1[2].options, answer: Q1[2].answer, explain: Q1[2].explain, notes: '<p>오답이 많으면 해결 흐름 슬라이드로 돌아갑니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['급주문: 수주 → 계획서(우선 1 · 납기) → 확정 · 시작 → MES', '자재 부족: 보류 → 발주 · 입고 → 다시 생산 시작', 'AI 는 조회 · 계산 · 초안, 결정은 사람'],
            notes: '<p>다음 시간: 다색 소량 주문 · 설비 증설 판단.</p>' },
        ],
      },
      // ------------------------------------------------------------ 15-2
      {
        id: 'ch15-2', title: '다색 소량 주문 · 설비 증설 판단', minutes: 50,
        goals: ['품목 전환이 생기는 조건을 배정 결과에서 찾는다', '설비 수 · 전환 시간을 바꿔 배정을 비교한다', '최소 설비 수를 근거와 함께 결정한다'],
        flow: [['상황 소개', 5], ['사례 3 다색 소량', 20], ['사례 4 설비 증설', 20], ['돌아보기 · 퀴즈', 5]],
        content: [
          { type: 'h', text: '사례 3 — 다색 소량 주문' },
          { type: 'callout', kind: 'info', title: '📖 상황', html: '<p>신제품 홍보용으로 <b>다섯 가지 색을 5박스씩</b> 만들어 달라는 주문이 들어왔습니다. 양은 적은데 색이 많습니다. 설비 1대는 한 번에 한 색만 만들 수 있고, 색을 바꿀 때마다 공급 공작물을 교체하는 <b>품목 전환</b> 시간이 듭니다.</p>' },
          { type: 'table', head: ['목표', '성공 기준'], rows: [
            ['전환이 생기는 곳 찾기', '배정 그림에서 빗금(전환) 구간과 그 설비를 짚을 수 있음'],
            ['조건별 비교 후 선택', '설비 2 · 4대 × 전환 5 · 15분 표 완성, 선택한 조건으로 확정']] },
          { type: 'figure', html: LAB_MULTI },
          DEBRIEF([['배정', '같은 색 하던 설비 우선, 긴 작업부터 덜 바쁜 설비로', '—'], ['비교', '조건마다 다시 계산', '설비 수 · 전환 시간 조건 설정'], ['결정', '—', '조건 선택 · 확정']]),
          { type: 'h', text: '사례 4 — 설비 증설 판단' },
          { type: 'callout', kind: 'info', title: '📖 상황', html: '<p>공장장이 묻습니다. "레드 120박스 주문이 정해진 시간 안에 끝나려면 설비를 몇 대 돌려야 하나? 4대 다 돌리면 되지 않나?" 근거를 표로 만들어 보고해야 합니다.</p>' },
          { type: 'table', head: ['목표', '성공 기준'], rows: [
            ['설비 1~4대 배정 비교', '네 가지 결과를 같은 표에 정리'],
            ['최소 설비 수 결정 · 보고', '근거(완료 예상 · 가용 시간 · 놀고 있는 설비)가 든 결정 문장']] },
          { type: 'figure', html: LAB_CELLS },
          DEBRIEF([['계산', '필요 설비 수 · 나누기 · 완료 예상', '—'], ['비교', '조건별 결과 · 경고', '비교 조건 선택'], ['결정', '—', '설비 수 · 증설 여부(비용 · 인력 고려)']]),
          { type: 'callout', kind: 'more', title: '📘 더 알아보기 — 배정 규칙 다시 보기', html: '<ul><li>필요 설비 수 = max(색 가짓수, 총 소요 ÷ 가용 시간) — 설비 수를 말하면 그 값으로 고정</li><li>한 색이 가용 시간보다 길고 남는 설비가 있으면 그 색을 나눔</li><li>긴 작업부터 가장 덜 바쁜 설비로(같은 색을 하던 설비 우선)</li><li>설비 안 순서: 우선순위 → 납기 → 큰 작업, 색이 바뀌면 전환 시간 추가</li></ul>자세한 원리는 13차시(AI 생산계획)에서 다룹니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>준비</b>: AI 생산계획만 쓰므로 데이터 상태에 영향을 덜 받습니다. 계획서 초안이 많이 생기지만 생산 시작을 누르지 않으면 설비는 움직이지 않습니다.</li><li><b>예상 결과</b>: 사례 3 — 자동(4대)에서 한 설비만 두 색 · 전환 1회. 2대 고정이면 전환 여러 번. 사례 4 — 1대 초과(약 17분/15분, 가동 110 %), 2대 가능(60+60), 3대 · 4대는 놀고 있는 설비 경고. 240박스(약 33분)는 3대 필요(80박스씩 약 11분).</li><li><b>자주 막히는 곳</b>: 문장에 "설비 2대" 를 넣지 않으면 자동 배정 → 비교가 안 됨. 시간은 "0.25시간" 처럼 숫자 + 시간.</li><li><b>토론 질문</b>: "놀고 있는 설비가 있으면 손해일까?", "전환 시간을 줄이는 현장 방법은?(같은 색 몰아 만들기, 교체 표준화)"</li><li><b>평가 체크리스트</b>: ① 전환 위치 표시 ② 사례 3 비교표 4줄 ③ 사례 4 결정표 4줄 ④ 240박스 예측 · 확인 ⑤ 결정 문장에 근거 3가지.</li></ul>' },
        ],
        practice: [],
        quiz: Q2,
        slides: [
          { layout: 'title', title: '사례 3 · 4', subtitle: '다색 소량 주문 · 설비 증설 판단', notes: '<p>지난 시간 정리: 결정은 사람. 오늘은 "어떤 조건이 좋은지" 를 비교로 결정합니다.</p>' },
          { layout: 'bullets', title: '사례 3 상황 — 5색 × 5박스', bullets: ['설비 1대 = 한 번에 한 색', '색 5종 > 설비 4대 → 전환 발생', '설비 수 · 전환 시간을 바꿔 비교', '조건 선택 → 확정'],
            notes: '<p>💬 "색을 바꿀 때 실제 공장에서는 무슨 일을 할까?" → 공급 공작물 교체, 확인 검사.</p>' },
          { layout: 'diagram', title: '5색 배정 결과', html: SHOT('ch15_ai_multi', '5색 배정 결과'),
            notes: '<p>빗금 구간이 전환 시간임을 짚습니다. 설비 #1 이 가장 늦게 끝남 = 완료 예상.</p>' },
          { layout: 'table', title: '비교표 (예시 칸)', head: ['설비 수', '전환(분)', '전환 횟수', '완료 예상', '가용 안?'], rows: [['4대', '5', '1', '?', '?'], ['4대', '15', '1', '?', '?'], ['2대', '5', '?', '?', '?'], ['2대', '15', '?', '?', '?']],
            notes: '<p>학생이 직접 다시 배정하며 채웁니다. 정답 숫자는 데이터 · 버전에 따라 조금 다를 수 있으니 경향을 봅니다.</p>' },
          { layout: 'bullets', title: '사례 4 상황 — 레드 120 · 가용 15분', bullets: ['설비 1 · 2 · 3대로 각각 요청', '자동(설비 수 없이)도 요청', '결정표: 완료 예상 · 가동률 · 놀고 있는 설비', '240박스로 늘면?'],
            notes: '<p>박스 1개 ≈ 8.2초 → 120박스 ≈ 16.5분. 💬 "그럼 몇 대면 될까?" 먼저 예상하게 합니다.</p>' },
          { layout: 'two', title: '1대 vs 2대', left: { title: '1대', html: SHOT('ch15_ai_cap1', '1대 배정') }, right: { title: '2대', html: SHOT('ch15_ai_cap2', '2대 배정') },
            notes: '<p>1대: 가용 시간 초과(110 %). 2대: 60 + 60 으로 나뉘어 가능.</p>' },
          { layout: 'diagram', title: '3대로 늘리면?', html: SHOT('ch15_ai_cap3', '3대 배정'),
            notes: '<p>#3 에 배정 없음 경고. "더 늘린다고 더 빨라지지 않는다" 가 오늘의 핵심.</p>' },
          { layout: 'table', title: '돌아보기 — AI vs 사람', head: ['', 'AI', '사람'], rows: [['사례 3', '전환 줄이는 배정 계산', '설비 수 · 전환 조건 선택'], ['사례 4', '필요 설비 수 · 나누기', '증설 여부(비용 · 인력)']],
            notes: '<p>AI 는 "몇 대면 되는지" 계산, 사람은 "몇 대를 돌릴지" 결정.</p>' },
          { layout: 'quiz', title: '확인 문제', q: Q2[1].q, options: Q2[1].options, answer: Q2[1].answer, explain: Q2[1].explain, notes: '<p>실습 결과 화면과 연결해 설명합니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['색 > 설비 → 품목 전환', '전환 시간이 크면 소량 다품종은 느려진다', '설비는 필요한 만큼까지만 효과', '비교 → 근거 → 결정'],
            notes: '<p>다음 시간: 납기 지연 위험 · 주간 계획.</p>' },
        ],
      },
      // ------------------------------------------------------------ 15-3
      {
        id: 'ch15-3', title: '납기 지연 위험 · 주간 계획 세우기', minutes: 50,
        goals: ['납기 위험 수주를 개요 · AI 도우미 · 수주 표로 찾고 확인한다', '우선순위 · 설비 · 가용 시간을 조정해 다시 계획한다', '날짜별 계획서를 만들고 파일로 공유 · 불러온다'],
        flow: [['상황 소개', 5], ['사례 5 납기 위험', 20], ['사례 6 주간 계획', 20], ['돌아보기 · 퀴즈', 5]],
        content: [
          { type: 'h', text: '사례 5 — 납기 지연 위험 대응' },
          { type: 'callout', kind: 'info', title: '📖 상황', html: '<p>월요일 아침 회의. 공장장이 "이번 주 납기 늦을 주문 있나?" 하고 묻습니다. 생산 관리자는 5분 안에 위험한 주문을 찾고, 다시 계획해서 대응 방안을 보고해야 합니다.</p>' },
          { type: 'table', head: ['목표', '성공 기준'], rows: [
            ['위험 수주 찾기 · 확인', '납기 임박 · 지연 수주 목록과 잔량을 화면으로 확인'],
            ['다시 계획 · 보고', '급한 수주가 설비 첫 순서, 가용 시간 안 계획 확정, 3줄 보고']] },
          { type: 'figure', html: LAB_LATE },
          DEBRIEF([['찾기', 'AI 도우미가 수주 · 납기 조회 · 요약', '—'], ['확인', '—', '수주 표로 잔량 검증'], ['다시 계획', '배정 · 완료 예상 계산', '우선순위 · 설비 수 · 잔업 결정'], ['알림', '(Claude 모드) 문구 초안', '내용 확인 · 발송']]),
          { type: 'h', text: '사례 6 — 주간 계획 세우고 공유하기' },
          { type: 'callout', kind: 'info', title: '📖 상황', html: '<p>이번 주 고객 수주 4건이 들어왔습니다. 생산 관리자는 납기에 맞춰 <b>요일별 계획</b>을 세우고, 계획서를 야간 담당자에게 <b>파일로 넘겨</b> 검토받은 뒤 첫날 계획만 시작해야 합니다.</p>' },
          { type: 'table', head: ['목표', '성공 기준'], rows: [
            ['요일별 계획서 3개', '이름 · 계획일 · 품목 · 우선순위 · 납기가 채워지고 배정 결과 있음'],
            ['파일로 공유 · 불러오기', '짝의 PC 에 같은 계획서가 생김'],
            ['첫날만 시작', '1일차 생산 시작, 2 · 3일차 확정']] },
          { type: 'figure', html: LAB_WEEK },
          DEBRIEF([['계획', '(선택) AI 생산계획으로 하루치 초안', '날짜 나누기 · 이름 · 납기'], ['검토', '배정 계산', '파일 공유 · 비교'], ['시작', '—', '첫날 확정 · 시작, 나머지 확정만']]),
          { type: 'callout', kind: 'warn', title: '계획서 파일과 배정 파일은 다릅니다', html: 'ERP 의 계획서 파일(<code>minifactory.schedule.v1</code>, 「내보내기(파일)」 · 「파일 불러오기…」)은 <b>무엇을 얼마나</b> 만들지, MES 디스패치 보드의 배정 파일(「배정 저장(파일)」 · 「배정 불러오기…」)은 <b>어느 설비에서 어떤 순서로</b> 만들지를 담습니다(9차시).' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>준비</b>: 예시 수주(이번 주 고객 수주)가 적용되어 있어야 납기 임박이 보입니다. 이미 다 출고되었으면 사례 1 처럼 수주를 몇 건 직접 등록해 둡니다(납기 내일 · 모레).</li><li><b>파일 공유</b>: 같은 PC 에서 혼자 하면 내보낸 파일을 그대로 다시 불러와도 됩니다(새 번호의 계획서가 생김). 이메일 · 메신저가 막힌 실습실은 공유 폴더를 씁니다.</li><li><b>예상 결과</b>: 사례 5 — 납기 1일 수주가 첫 순서, 대부분 가용 시간 안. 사례 6 — 계획서 3개, 1일차만 생산 시작.</li><li><b>토론 질문</b>: "AI 가 고객에게 직접 메일을 보내게 해도 될까?", "주간 계획을 매일 다시 세워야 하는 이유는?"</li><li><b>평가 체크리스트</b>: ① 위험 수주 목록 ② AI 답 vs 수주 표 비교 ③ 다시 배정 결과 ④ 3줄 보고 ⑤ 계획서 3개 ⑥ 파일 내보내기 · 불러오기 ⑦ 1일차만 시작.</li></ul>' },
        ],
        practice: [],
        quiz: Q3,
        slides: [
          { layout: 'title', title: '사례 5 · 6', subtitle: '납기 지연 위험 · 주간 계획 세우기', notes: '<p>계획 사례 마지막 시간. 오늘은 "찾기 → 다시 계획 → 알리기" 와 "나눠서 계획 → 공유".</p>' },
          { layout: 'bullets', title: '사례 5 상황 — 월요일 아침 회의', bullets: ['ERP 개요: 납기 임박(2일) · 지연', 'AI 도우미: 미출고 수주와 납기', '수주 표로 잔량 확인', '다시 계획 → 확정 → 3줄 보고'],
            notes: '<p>5분 타이머를 켜고 "위험 수주 찾기" 경주를 해 봅니다.</p>' },
          { layout: 'diagram', title: 'ERP 개요 — 납기 임박', html: SHOT('ch15_overview_due', 'ERP 개요'),
            notes: '<p>칸 아래 작은 글씨 "지연 n건" 을 꼭 읽게 합니다.</p>' },
          { layout: 'diagram', title: 'AI 도우미 — 미출고 수주와 납기', html: SHOT('ch15_erp_ai_due', 'AI 도우미 답'),
            notes: '<p>AI 답의 잔량을 수주 표와 비교시키는 것이 핵심(14차시 답 검증과 연결).</p>' },
          { layout: 'bullets', title: '다시 계획하는 세 가지 손잡이', bullets: ['우선순위(1 긴급) → 설비 안 순서', '설비 수 → 나눠 만들기', '가용 시간(잔업) → 하루 생산량', '어느 것을 쓸지는 비용 · 인력 · 고객 관계로 사람이 결정'],
            notes: '<p>💬 "잔업과 설비 추가 중 무엇이 더 비쌀까?" 현장 사정에 따라 다르다는 결론.</p>' },
          { layout: 'bullets', title: '사례 6 상황 — 이번 주 수주 4건', bullets: ['납기별로 묶어 요일 계획', '+ 새 계획서 · 품목 추가 · 편집 저장', '다시 배정으로 확인', '내보내기(파일) → 파일 불러오기…', '1일차만 생산 시작'],
            notes: '<p>짝 활동: 한 명이 내보내고 다른 한 명이 불러옵니다.</p>' },
          { layout: 'diagram', title: '계획서 파일 내보내기 · 불러오기', html: SHOT('ch15_plans_export', '내보내기와 불러오기 버튼'),
            notes: '<p>파일 형식 minifactory.schedule.v1. MES 배정 파일과 다르다는 것을 강조.</p>' },
          { layout: 'table', title: '돌아보기 — AI vs 사람', head: ['', 'AI', '사람'], rows: [['사례 5', '조회 · 요약 · 배정 계산', '확인 · 다시 계획 · 고객 안내'], ['사례 6', '(선택) 하루치 초안 · 배정', '날짜 나누기 · 공유 · 첫날 시작']],
            notes: '<p>Part 5 전반부 정리. 다음 차시는 설비 · 품질 · 운영 사례.</p>' },
          { layout: 'quiz', title: '확인 문제', q: Q3[2].q, options: Q3[2].options, answer: Q3[2].answer, explain: Q3[2].explain, notes: '<p>계획서 파일과 MES 배정 파일을 헷갈리는 학생이 많습니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['위험 찾기: 개요 · AI 도우미 → 수주 표로 확인', '다시 계획: 우선순위 · 설비 수 · 가용 시간', '주간 계획: 날짜별 계획서 · 파일 공유 · 첫날만 시작', 'AI 는 찾고 계산, 사람은 결정 · 소통'],
            notes: '<p>다음 차시(16): 컨베이어 이상 · 델타 흡착 · 에어 · 안전 도어 · 품질 · 인수인계 사례.</p>' },
        ],
      },
    ],
  });
})();
