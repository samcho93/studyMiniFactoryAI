/* 07 ERP ② 생산계획과 생산오더 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_PLAN = `<svg viewBox="0 0 720 200" role="img" aria-label="생산계획서 상태: 작성, 확정, 생산 지시됨, 완료">
  ${ARROW('c07a1')}
  <rect x="10" y="60" width="150" height="70" rx="12" class="card-bg"/><text x="85" y="90" text-anchor="middle" class="tx-b">✎ 작성</text><text x="85" y="112" text-anchor="middle" class="tx-m">DRAFT · 편집 · 배정</text>
  <rect x="195" y="60" width="150" height="70" rx="12" class="p2s"/><text x="270" y="90" text-anchor="middle" class="tx-b">✔ 확정</text><text x="270" y="112" text-anchor="middle" class="tx-m">검토 완료 표시</text>
  <rect x="380" y="60" width="160" height="70" rx="12" class="p1s"/><text x="460" y="90" text-anchor="middle" class="tx-b">➜ 생산 지시됨</text><text x="460" y="112" text-anchor="middle" class="tx-m">생산오더 · MES 작업지시</text>
  <rect x="575" y="60" width="135" height="70" rx="12" class="p3s"/><text x="642" y="90" text-anchor="middle" class="tx-b">✔ 완료</text><text x="642" y="112" text-anchor="middle" class="tx-m">계획 수량 생산</text>
  <line x1="161" y1="95" x2="192" y2="95" class="ln" stroke-width="2" marker-end="url(#c07a1)"/>
  <line x1="346" y1="95" x2="377" y2="95" class="ln" stroke-width="2" marker-end="url(#c07a1)"/>
  <line x1="541" y1="95" x2="572" y2="95" class="ln" stroke-width="2" marker-end="url(#c07a1)"/>
  <text x="270" y="42" text-anchor="middle" class="tx-m">생산 계획 완료(확정)</text>
  <text x="460" y="42" text-anchor="middle" class="tx-m">▶ 생산 시작</text>
  <path d="M270,132 C270,170 85,170 85,134" class="ln" fill="none" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#c07a1)"/>
  <text x="178" y="186" text-anchor="middle" class="tx-m">확정 후 편집하면 다시 작성 중</text>
</svg>`;

  const FIG_PRO = `<svg viewBox="0 0 720 230" role="img" aria-label="생산 시작을 누르면 계획 줄마다 생산오더가 생기고, 자재 가용성 확인 후 MES 로 릴리스된다. 부족하면 릴리스 보류">
  ${ARROW('c07a2')}
  <rect x="10" y="20" width="150" height="60" rx="10" class="p1"/><text x="85" y="46" text-anchor="middle" class="tx-w">▶ 생산 시작</text><text x="85" y="66" text-anchor="middle" class="tx-w">계획서(줄 n개)</text>
  <rect x="200" y="20" width="150" height="60" rx="10" class="p2s"/><text x="275" y="46" text-anchor="middle" class="tx-b">생산오더 n개</text><text x="275" y="66" text-anchor="middle" class="tx-m">PRO-…(생성)</text>
  <rect x="390" y="20" width="150" height="60" rx="10" class="p3s"/><text x="465" y="46" text-anchor="middle" class="tx-b">자재 가용성</text><text x="465" y="66" text-anchor="middle" class="tx-m">ATP 확인 · 예약</text>
  <rect x="580" y="20" width="130" height="60" rx="10" class="p1s"/><text x="645" y="46" text-anchor="middle" class="tx-b">MES 로 릴리스</text><text x="645" y="66" text-anchor="middle" class="tx-m">작업지시 · 공정</text>
  <rect x="390" y="140" width="320" height="60" rx="10" class="p5s"/><text x="550" y="166" text-anchor="middle" class="tx-b">✖ 자재 부족 → 릴리스 보류</text><text x="550" y="186" text-anchor="middle" class="tx-m">부족분 구매 발주(8차시) 또는 부족해도 릴리스(감사 기록)</text>
  <line x1="161" y1="50" x2="197" y2="50" class="ln" stroke-width="2" marker-end="url(#c07a2)"/>
  <line x1="351" y1="50" x2="387" y2="50" class="ln" stroke-width="2" marker-end="url(#c07a2)"/>
  <line x1="541" y1="50" x2="577" y2="50" class="ln" stroke-width="2" marker-end="url(#c07a2)"/>
  <line x1="465" y1="82" x2="465" y2="137" class="ln" stroke-width="2" marker-end="url(#c07a2)"/>
  <text x="560" y="105" text-anchor="middle" class="tx-m">충분</text>
  <text x="440" y="115" text-anchor="end" class="tx-m">부족</text>
  <text x="200" y="130" class="tx-m">생산오더 상태: 생성 → 생산 지시됨 → 생산 중</text>
  <text x="200" y="152" class="tx-m">→ 기술적 완료(TECO) → 종료(마감)</text>
</svg>`;

  // ---------------------------------------------------------------- 실습 7-1
  const LAB_EDIT = `<div class="lab" data-lab="ch07-1-a">
  <div class="lab-head"><span class="lab-badge">실습 7-1</span><b>생산계획서 만들고 편집하기</b><span class="lab-meta">⏱ 12분 · 화면: ERP → 생산계획 · 배정</span></div>
  <p class="lab-goal">새 계획서를 만들어 화이트 10박스 · 레드 10박스로 편집하고 저장합니다.</p>
  <p class="lab-pre">ERP 기준정보 · 수주가 들어 있는 상태(6차시)</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">ERP 왼쪽 <span class="ui">▤ 생산계획 · 배정</span> 을 엽니다. 왼쪽 <b>생산계획서</b> 목록을 살펴봅니다.</div>
      ${SHOT('ch07_plans_list', '생산계획서 목록 강조')}
      <div class="lab-check">계획서마다 이름 · 상태 배지(✎ 작성 · ✔ 확정 · ➜ 생산 지시됨 · ✔ 완료), 번호(PS-…) · 출처(직접 작성 · 예제 · AI 계획 · 파일 · 수주 기준) · 총 박스 · 설비 대수가 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">목록 위의 만드는 방법 네 가지를 확인합니다: <span class="ui">+ 새 계획서</span>, 예제 불러오기(선택 + <span class="ui">불러오기</span>), <span class="ui">미출고 수주로 작성</span>, <span class="ui">파일 불러오기…</span>.</div>
      <div class="lab-check">AI 로 만드는 방법(<b>AI 생산계획</b> 화면)도 있습니다 — 13차시.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">+ 새 계획서</span> 를 누릅니다.</div>
      ${SHOT('ch07_new_plan', '새 계획서 — 화이트 10박스')}
      <div class="lab-check">"새 생산계획 (오늘 날짜)" 계획서가 <b>✎ 작성</b> 상태로 열리고, 화이트(FG-BOX4-WHT) 10박스 한 줄과 설비 배정 결과가 이미 계산되어 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">계획서 이름을 "<b>내 첫 생산계획</b>" 으로 바꾸고, <b>가용 시간(설비 1대, 시간)</b> 이 8 인지 확인합니다.</div>
      <div class="lab-check">이름 칸 아래에 "저장하지 않은 변경이 있습니다." 가 나타납니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">+ 품목 추가</span> 를 누릅니다.</div>
      ${SHOT('ch07_add_line', '품목 추가 — 레드 10박스 줄과 편집 저장 강조')}
      <div class="lab-check">레드(FG-BOX4-RED) 10박스 줄이 추가됩니다. 줄마다 <b>제품(색) · 수량(박스) · 우선순위 · 납기</b> 를 바꿀 수 있고, 오른쪽 ✕ 로 줄을 지웁니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">편집 저장</span> 을 누릅니다.</div>
      <div class="lab-check">"저장하지 않은 변경" 문구가 사라지고, 목록의 계획서가 20박스로 바뀝니다. <b>편집을 저장하기 전에는 다시 배정 · 확정 · 생산 시작이 비활성</b>입니다.</div></li>
    <li class="lab-step"><div class="lab-do">(선택) <span class="ui">미출고 수주로 작성</span> 을 눌러 계획서를 하나 더 만들어 봅니다.</div>
      <div class="lab-check">미출고 수주의 잔량이 색별 줄로 들어오고, <b>수주</b> 열에 수주번호가 채워집니다. 수주에서 온 줄은 색을 바꿀 수 없습니다. 이번 실습은 첫 계획서로 계속합니다.</div></li>
  </ol>
  <div class="lab-result">생산계획서는 <b>무엇을(색) · 얼마나(박스) · 어떤 순서로(우선순위 · 납기)</b> 만들지 적은 문서입니다. 편집 → 저장해야 다음 단계로 넘어갈 수 있습니다.</div>
</div>`;

  // ---------------------------------------------------------------- 실습 7-2
  const LAB_ALLOC = `<div class="lab" data-lab="ch07-1-b">
  <div class="lab-head"><span class="lab-badge">실습 7-2</span><b>설비 배정 바꿔 보기</b><span class="lab-meta">⏱ 13분 · 화면: ERP → 생산계획 · 배정</span></div>
  <p class="lab-goal">설비 수 · 품목 전환 시간 · 가용 시간을 바꿔 다시 배정하고, 예상 소요 시간이 어떻게 바뀌는지 비교합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">계획서 아래 <b>설비 배정</b> 카드를 봅니다. 배지 <b>필요 설비 n대</b>, "현재 사용 중 4대", <b>✔ 가용 시간 안</b> 과 막대 그래프를 읽습니다.</div>
      <div class="lab-check">설비 수가 <b>자동</b>일 때 화이트 · 레드 두 색이면 필요 설비가 1대로 나오기도 합니다(시간이 충분하면 한 설비가 색을 바꿔 가며 생산). 막대마다 색 · 박스 수, 품목 전환 구간이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">막대 아래 줄에서 <b>박스 1개 사이클</b>, 시간당 박스 수, 총 소요 · 완료 예상 시간을 찾아 적습니다.</div>
      <div class="lab-check">박스 1개는 약 8.24초(시간당 약 437박스)로 계산됩니다. 20박스면 몇 분이면 끝납니다.</div></li>
    <li class="lab-step"><div class="lab-do">카드 오른쪽 위 <b>설비 수</b>를 <span class="ui">2대 고정</span> 으로 바꿉니다.</div>
      ${SHOT('ch07_realloc_set', '설비 수 2대 고정과 다시 배정 강조')}
      <div class="lab-check">아직 결과는 그대로입니다. 설정을 바꾼 뒤에는 <span class="ui">다시 배정</span> 을 눌러야 계산됩니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">다시 배정</span> 을 누릅니다.</div>
      ${SHOT('ch07_realloc_done', '2대로 다시 배정한 결과')}
      <div class="lab-check"><b>필요 설비 2대</b>, 설비 #1 = 화이트 10, 설비 #2 = 레드 10 으로 나뉘고, 완료 예상 시간이 1대일 때보다 짧아집니다. 한 설비가 한 색만 만들어 품목 전환이 없어집니다.</div></li>
    <li class="lab-step"><div class="lab-do">설비 수를 <span class="ui">1대 고정</span> 으로, <b>품목 전환(분)</b> 을 20 으로 바꾸고 <span class="ui">다시 배정</span> 합니다.</div>
      <div class="lab-check">설비 1대가 화이트 → 레드로 색을 바꾸며 20분 전환 구간이 막대에 생기고, 완료 시간이 그만큼 늘어납니다.</div></li>
    <li class="lab-step"><div class="lab-do">위쪽 <b>가용 시간</b> 을 0.1(6분)로 바꾸고 <span class="ui">편집 저장</span> → <span class="ui">다시 배정</span> 합니다.</div>
      <div class="lab-check">배지가 <b>✖ 가용 시간 초과</b> 로 바뀌고, 아래에 "설비를 늘리거나 수량 · 납기를 조정하세요" 같은 ⚠ 경고가 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">가용 시간을 8 로, 품목 전환을 5 로, 설비 수를 <span class="ui">2대 고정</span> 으로 되돌리고 <span class="ui">편집 저장</span> → <span class="ui">다시 배정</span> 합니다.</div>
      <div class="lab-check">설비 2대 · ✔ 가용 시간 안 상태가 됩니다. 다음 실습은 이 상태로 시작합니다.</div></li>
  </ol>
  <div class="lab-result">설비 배정은 <b>한 설비 = 한 번에 한 색</b>, 긴 작업부터 덜 바쁜 설비에, 색을 바꾸면 전환 시간이 든다는 규칙으로 계산됩니다. 설비를 늘리면 빨라지지만, 그만큼 설비를 더 돌려야 합니다.</div>
  <div class="lab-q">색이 5가지인 주문을 설비 2대로 만들면 어떤 일이 생길까요? (힌트: 품목 전환)</div>
</div>`;

  // ---------------------------------------------------------------- 실습 7-3
  const LAB_RELEASE = `<div class="lab" data-lab="ch07-1-c">
  <div class="lab-head"><span class="lab-badge">실습 7-3</span><b>확정 → 생산 시작 → 현장 확인</b><span class="lab-meta">⏱ 15분 · 화면: ERP → MES → 공장 라인</span></div>
  <p class="lab-goal">계획을 확정하고 생산을 시작해, MES 작업지시와 공장 라인 설비가 계획대로 움직이는 것을 확인합니다.</p>
  <p class="lab-pre">실습 7-2 를 마친 계획서(화이트 10 · 레드 10, 설비 2대 배정)</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">설비 배정 카드 아래 <span class="ui">생산 계획 완료(확정)</span> 을 누릅니다.</div>
      ${SHOT('ch07_confirm_dialog', '계획 확정 대화상자')}
      <div class="lab-check">"생산 계획을 확정할까요?" 창에 "확정 후에도 편집하면 다시 작성 중으로 돌아갑니다" 라고 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">확정</span> 을 누릅니다.</div>
      ${SHOT('ch07_confirmed', '확정 상태와 생산 시작 버튼 강조')}
      <div class="lab-check">계획서 배지가 <b>✔ 확정</b> 으로 바뀝니다. 확정은 "검토를 마쳤다" 는 표시이며 아직 생산은 시작되지 않았습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">▶ 생산 시작</span> 을 누르고 창의 설명을 끝까지 읽습니다.</div>
      ${SHOT('ch07_release_dialog', '생산 시작 대화상자')}
      <div class="lab-check">"계획 줄마다 생산오더를 만들고 BOM 자재 가용성(ATP)을 확인 · 예약한 뒤 MES 로 내려보냅니다 … 작업지시 2건 …". 필요 설비가 현재 사용 중보다 많으면 "사용 설비를 n대 → m대로 늘리기" 체크가 함께 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">생산 시작</span> 을 누릅니다.</div>
      ${SHOT('ch07_released', '생산 시작 후 — 생산 지시됨')}
      <div class="lab-check">배지가 <b>➜ 생산 지시됨</b>, 계획 줄의 <b>작업지시</b> 열에 WO-… 번호가 채워지고, 아래에 "✔ (시각) 생산 시작 — 「생산오더」와 MES 디스패치 보드에서 진행을 볼 수 있습니다." 가 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">MES</span> → <span class="ui">▦ 디스패치 보드</span> 를 엽니다.</div>
      ${SHOT('ch07_dispatch_after', 'MES 디스패치 보드 — 설비별 작업지시')}
      <div class="lab-check">설비 #1 · #2 칸에 방금 만든 작업지시(화이트 · 레드)가 <b>▶ 진행</b> 으로 들어가 있고, 진행 수량 · 예상 시간이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">공장 라인</span> 을 열고 설비 탭을 봅니다.</div>
      ${SHOT('ch07_line_after', '공장 라인 — 설비 #1 · #2 운전')}
      <div class="lab-check">설비 #1 은 화이트, 설비 #2 는 레드로 <b>▶ 운전</b> 중입니다. 사람이 기동을 누르지 않아도 <b>작업지시가 시작된 설비만</b> 자동으로 기동했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">몇 분 뒤 ERP 생산계획 화면으로 돌아와 계획 줄의 <b>생산</b> 열 숫자가 늘어나는지 봅니다.</div>
      <div class="lab-check">적재함이 출고될 때마다 생산 수량이 올라갑니다(적재함 = 5박스). 마지막 작업지시가 끝나면 설비는 다시 대기합니다.</div></li>
  </ol>
  <div class="lab-result">ERP 의 <b>확정</b>은 사람의 검토, <b>생산 시작</b>은 MES · 현장으로 내려보내는 명령입니다. 이후 작업지시 진행은 MES(9차시)가, 설비 운전은 PLC 가 맡습니다.</div>
</div>`;

  // ---------------------------------------------------------------- 실습 7-4
  const LAB_PRO = `<div class="lab" data-lab="ch07-2-a">
  <div class="lab-head"><span class="lab-badge">실습 7-4</span><b>생산오더 추적하기</b><span class="lab-meta">⏱ 12분 · 화면: ERP → 생산오더</span></div>
  <p class="lab-goal">생산 시작으로 생긴 생산오더(PRO)의 상태 · 진척 · 자재 소요 · 실적 확인을 읽습니다.</p>
  <p class="lab-pre">실습 7-3 에서 생산을 시작한 상태</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">ERP 왼쪽 <span class="ui">⚑ 생산오더</span> 를 엽니다.</div>
      ${SHOT('ch07_pro_list', '생산오더 목록과 상세')}
      <div class="lab-check">왼쪽 표에 오더 · 상태 · 품목 · 진척(확인 수량/목표) · 납기 · 수주가 보이고, 맨 위에 방금 만든 화이트 · 레드 오더가 <b>생산 중</b> 또는 <b>생산 지시됨</b> 입니다.</div></li>
    <li class="lab-step"><div class="lab-do">표의 상태 배지를 모두 찾아 뜻을 적습니다: <b>생성 · 생산 지시됨 · 생산 중 · 기술적 완료 · 종료</b>.</div>
      <div class="lab-check">목표 수량을 모두 채우면 자동으로 <b>✔ 기술적 완료(TECO)</b>, 정리가 끝나면 <span class="ui">마감</span> 으로 <b>종료</b>합니다. 자재 부족으로 내려가지 못한 오더는 <b>생성</b> 으로 남습니다.</div></li>
    <li class="lab-step"><div class="lab-do">레드 오더를 클릭해 오른쪽 상세를 엽니다. 요약 줄(목표 · 확인 · 불합격 · 납기 · 수주 · 계획)과 <b>MES 작업지시</b> 번호를 읽습니다.</div>
      <div class="lab-check">이 생산오더가 어느 계획서 · 작업지시와 연결되는지 번호로 따라갈 수 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>자재(BOM 스냅샷 · 예약 · 출고)</b> 표를 읽습니다.</div>
      <div class="lab-check">WP-RECT-RED 단위당 4 · 소요 40, PK-BOX 단위당 1 · 소요 10. <b>출고(GI)</b> 는 지금까지 실제로 쓴 자재, <b>남은 예약</b> 은 앞으로 쓸 몫입니다.</div></li>
    <li class="lab-step"><div class="lab-do">상세 오른쪽 위 <span class="ui">자재 가용성 확인</span> 을 누릅니다.</div>
      ${SHOT('ch07_pro_atp', '자재 가용성(ATP) 표')}
      <div class="lab-check"><b>자재 가용성(ATP) · 시각</b> 카드에 자재별 소요 · 현재고 · 다른 오더 예약 · 가용 · 발주잔 · 부족(✔ 또는 ✖ 수량)이 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">적재함이 한 번 출고된 뒤 상세 아래 <b>실적 확인(MES → ERP) · 자재 이동</b> 표를 봅니다.</div>
      <div class="lab-check">확인 번호(CF-…) · 작업지시 · 적재함 LOT · 검사(✔ 합격) · <b>입고(GR)</b> 박스 수 · <b>자재 출고(GI)</b> 가 한 줄씩 쌓입니다.</div></li>
    <li class="lab-step"><div class="lab-do">왼쪽 아래 <b>자재 예약(릴리스된 오더의 남은 소요)</b> 카드에서 PK-BOX 의 현재고 · 예약 · 가용을 확인합니다.</div>
      <div class="lab-check">가용 = 현재고 − 예약. 가용이 음수면 ✖ 로 표시되어 곧 자재가 모자란다는 뜻입니다.</div></li>
  </ol>
  <div class="lab-result">생산오더는 ERP 가 "자재를 확보하고 MES 에 일을 맡긴 기록" 입니다. MES 가 적재함마다 실적을 확인하면 <b>자재 출고(GI) · 완제품 입고(GR)</b> 가 이 오더에 자동으로 기록됩니다.</div>
</div>`;

  // ---------------------------------------------------------------- 실습 7-5
  const LAB_SHORT = `<div class="lab" data-lab="ch07-2-b">
  <div class="lab-head"><span class="lab-badge">실습 7-5</span><b>자재 부족으로 릴리스가 보류되는 경우</b><span class="lab-meta">⏱ 12분 · 화면: ERP → 생산계획 · 배정</span></div>
  <p class="lab-goal">재고가 모자란 그린 제품을 생산 시작해 보고, 「자재 가용성 부족 — 릴리스 보류」 표를 읽습니다. (해결은 8차시에서 구매 → 입고로)</p>
  <p class="lab-pre">예시 기준정보의 그린 공작물(WP-RECT-GRN)은 일부러 적게 들어 있습니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">▤ 생산계획 · 배정</span> 에서 <span class="ui">+ 새 계획서</span> 를 누릅니다.</div>
      <div class="lab-check">화이트 10박스 줄 하나가 있는 새 계획서가 열립니다.</div></li>
    <li class="lab-step"><div class="lab-do">줄의 제품(색)을 <b>그린 (FG-BOX4-GRN)</b> 으로, 수량을 <b>15</b> 로 바꾸고 <span class="ui">편집 저장</span> 합니다.</div>
      <div class="lab-check">계획서가 그린 15박스로 바뀌고 설비 배정이 다시 계산됩니다. 그린 15박스 = 그린 공작물 60개 필요.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">▶ 생산 시작</span> → 창의 <span class="ui">생산 시작</span> 을 누릅니다.</div>
      ${SHOT('ch07_shortage', '자재 가용성 부족 — 릴리스 보류')}
      <div class="lab-check">계획서 아래에 빨간 <b>✖ 자재 가용성 부족 — 릴리스 보류</b> 카드가 나오고, WP-RECT-GRN 줄이 빨갛게 표시됩니다(소요 60 · 가용 40 · 부족 20 처럼). 계획서는 생산 지시되지 않았습니다.</div>
      <div class="lab-tip">다른 사람이 이미 구매 발주를 했다면 <b>발주잔</b> 칸에 수량이 보입니다. 발주잔은 아직 입고되지 않은 수량이라 가용에 더하지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do">표의 열을 하나씩 읽고 활동지에 적습니다: <b>소요 · 현재고 · 다른 오더 예약 · 가용 · 발주잔 · 부족</b>.</div>
      <div class="lab-check">가용 = 현재고 − 다른 오더 예약, 부족 = 소요 − 가용. PK-BOX 는 ✔(충분)입니다.</div></li>
    <li class="lab-step"><div class="lab-do">카드 아래 두 버튼 <span class="ui">부족분 구매 발주</span> 와 <span class="ui">부족해도 릴리스</span> 의 차이를 확인만 합니다(<b>지금은 누르지 않음</b>).</div>
      <div class="lab-check">구매 발주는 부족분을 100 단위로 올려 발주하고, 입고 후 다시 릴리스합니다(8차시). 부족해도 릴리스는 확인 창과 감사 기록이 남는 예외 처리입니다 — 생산 중 자재가 떨어질 위험이 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">⚑ 생산오더</span> 를 열어 그린 오더의 상태를 봅니다.</div>
      <div class="lab-check">그린 생산오더가 <b>생성</b> 상태로 남아 있을 수 있습니다. 자재가 준비되면 오더 상세의 <span class="ui">릴리스(MES 로)</span> 또는 계획서의 <span class="ui">▶ 생산 시작</span> 으로 다시 내려보냅니다.</div></li>
  </ol>
  <div class="lab-result">ERP 는 자재가 모자라면 <b>생산을 시작하지 않고 멈춰서</b> 부족 내역을 보여 줍니다. 현장에서 생산 도중 자재가 떨어지는 것보다, 시작 전에 막는 편이 훨씬 손실이 적기 때문입니다.</div>
  <div class="lab-q">"부족해도 릴리스" 는 어떤 상황에서라면 써도 될까요? 누가 결정해야 할까요?</div>
</div>`;

  // ---------------------------------------------------------------- 실습 7-6
  const LAB_FILE = `<div class="lab" data-lab="ch07-2-c">
  <div class="lab-head"><span class="lab-badge">실습 7-6</span><b>계획서 파일 내보내기 · 불러오기</b><span class="lab-meta">⏱ 8분 · 화면: ERP → 생산계획 · 배정</span></div>
  <p class="lab-goal">계획서를 파일로 저장해 공유하고, 파일로 다시 불러와 새 계획서를 만듭니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">실습 7-5 의 그린 계획서를 연 상태에서 오른쪽 위 <span class="ui">내보내기(파일)</span> 를 누릅니다.</div>
      ${SHOT('ch07_export_mark', '내보내기(파일) 버튼 강조')}
      <div class="lab-check">브라우저의 다운로드 폴더에 계획서 JSON 파일이 저장됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">파일을 메모장으로 열어 봅니다.</div>
      <div class="lab-check">맨 앞에 형식 이름 <code>minifactory.schedule.v1</code>, 그 아래 계획서 이름 · 가용 시간 · 줄(제품 · 수량 · 우선순위 · 납기)이 들어 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">왼쪽 목록 위 <span class="ui">파일 불러오기…</span> 를 눌러 방금 저장한 파일을 고릅니다.</div>
      ${SHOT('ch07_import_mark', '파일 불러오기 버튼 강조')}
      <div class="lab-check">같은 내용의 계획서가 <b>새 번호</b>(PS-…)로 하나 더 생기고 출처가 <b>파일</b> 로 표시됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">연습으로 만든 그린 계획서 두 개 중 하나를 열어 <span class="ui">삭제</span> → 확인 창의 <span class="ui">삭제</span> 로 지웁니다.</div>
      <div class="lab-check">작성 중(✎) · 확정(✔) 계획서만 삭제할 수 있습니다. 생산 지시된 계획서에는 삭제 버튼이 없습니다.</div></li>
  </ol>
  <div class="lab-result">계획서 파일은 다른 반 · 다른 PC 와 계획을 주고받거나, 강사가 같은 실습 조건을 학생에게 나눠 줄 때 씁니다.</div>
</div>`;

  const QUIZ1 = [
    { q: '계획서를 편집한 뒤 <span class="ui">다시 배정</span> 버튼이 눌리지 않는 이유는?',
      options: ['권한이 없어서', '편집 내용을 아직 저장하지 않아서', '설비가 운전 중이라서', 'AI 키가 없어서'], answer: 1,
      explain: '"먼저 편집 저장하세요" — 저장하지 않은 변경이 있으면 다시 배정 · 확정 · 생산 시작이 비활성입니다.' },
    { q: '설비 배정의 규칙으로 <b>틀린</b> 것은?',
      options: ['설비 1대는 한 번에 한 색만 만든다', '색을 바꾸면 품목 전환 시간이 든다', '긴 작업부터 덜 바쁜 설비에 배정한다', '설비를 늘리면 언제나 품목 전환이 늘어난다'], answer: 3,
      explain: '설비를 늘리면 색별로 설비를 나눌 수 있어 오히려 전환이 줄어듭니다.' },
    { q: '<span class="ui">생산 계획 완료(확정)</span> 을 누르면?',
      options: ['곧바로 설비가 기동한다', '검토를 마친 계획으로 표시된다(생산은 아직)', '계획서가 삭제된다', '자재가 구매된다'], answer: 1,
      explain: '확정은 검토 완료 표시입니다. 생산은 ▶ 생산 시작을 눌러야 시작됩니다.' },
    { q: '생산을 시작한 뒤 공장 라인에서 기동하는 설비는?',
      options: ['모든 설비', '작업지시가 시작된(배정된) 설비만', '설비 #1 만', '아무 설비도 기동하지 않는다'], answer: 1,
      explain: '작업지시가 시작된 설비만 자동으로 기동하고, 마지막 작업지시가 끝나면 대기합니다.' },
  ];
  const QUIZ2 = [
    { q: '생산 시작 시 자재가 부족하면 ERP 는?',
      options: ['그래도 MES 로 내려보낸다', '릴리스를 보류하고 부족 내역(ATP 표)을 보여 준다', '자동으로 다른 색으로 바꾼다', '계획서를 삭제한다'], answer: 1,
      explain: '「자재 가용성 부족 — 릴리스 보류」 표가 나오고, 구매 발주 또는 감사 기록이 남는 강제 릴리스를 고릅니다.' },
    { q: 'ATP 표의 <b>가용</b> 계산으로 알맞은 것은?',
      options: ['현재고 + 발주잔', '현재고 − 다른 오더 예약', '소요 − 현재고', '현재고 × 4'], answer: 1,
      explain: '이미 다른 오더가 예약한 몫을 빼야 실제로 쓸 수 있는 양입니다. 발주잔은 아직 들어오지 않아 더하지 않습니다.' },
    { q: '생산오더의 <b>기술적 완료(TECO)</b> 는 언제 되나?',
      options: ['생산 시작 직후', '목표 수량의 실적 확인이 모두 끝났을 때', '자재를 구매할 때', '계획서를 확정할 때'], answer: 1,
      explain: 'MES 실적 확인으로 목표를 채우면 자동으로 TECO, 정리 후 마감하면 종료입니다.' },
    { q: '계획서 <span class="ui">내보내기(파일)</span> 의 쓰임으로 알맞은 것은?',
      options: ['설비를 정지한다', '계획을 다른 PC · 반과 공유하거나 백업한다', '수주를 삭제한다', 'AI 키를 저장한다'], answer: 1,
      explain: 'JSON 파일(minifactory.schedule.v1)로 저장해 파일 불러오기로 다시 만들 수 있습니다.' },
  ];

  // ---------------------------------------------------------------- 생산계획 개념(계획의 층 · 생산 방식)
  const PLANC_ARR = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const PLANC_FIG = `<svg viewBox="0 0 720 330" role="img" aria-label="생산계획의 층: 수요, 판매 운영 계획, 기준 생산계획, 자재 소요 계획과 능력 계획, 생산오더, 작업 일정과 디스패칭">
  ${PLANC_ARR('c07x1')}
  <rect x="20" y="14" width="300" height="40" rx="9" class="p1s"/><text x="170" y="39" text-anchor="middle" class="tx-b">수요 — 수주 · 수요 예측</text>
  <rect x="20" y="72" width="300" height="40" rx="9" class="p2s"/><text x="170" y="97" text-anchor="middle" class="tx-b">판매 · 운영 계획(S&amp;OP) · 월</text>
  <rect x="20" y="130" width="300" height="40" rx="9" class="p2"/><text x="170" y="155" text-anchor="middle" class="tx-w">기준 생산계획(MPS) · 주 · 일</text>
  <rect x="20" y="188" width="140" height="40" rx="9" class="p3s"/><text x="90" y="213" text-anchor="middle" class="tx-b">MRP 자재</text>
  <rect x="180" y="188" width="140" height="40" rx="9" class="p3s"/><text x="250" y="213" text-anchor="middle" class="tx-b">능력 계획 설비</text>
  <rect x="20" y="246" width="300" height="40" rx="9" class="p4s"/><text x="170" y="271" text-anchor="middle" class="tx-b">생산오더 → (MES) 작업 일정 · 디스패칭</text>
  <line x1="170" y1="54" x2="170" y2="68" class="ln" stroke-width="2" marker-end="url(#c07x1)"/>
  <line x1="170" y1="112" x2="170" y2="126" class="ln" stroke-width="2" marker-end="url(#c07x1)"/>
  <line x1="120" y1="170" x2="95" y2="184" class="ln" stroke-width="2" marker-end="url(#c07x1)"/>
  <line x1="220" y1="170" x2="245" y2="184" class="ln" stroke-width="2" marker-end="url(#c07x1)"/>
  <line x1="170" y1="228" x2="170" y2="242" class="ln" stroke-width="2" marker-end="url(#c07x1)"/>
  <text x="350" y="39" class="tx-m">고객 주문 · 앞으로 팔릴 양</text>
  <text x="350" y="97" class="tx-m">이번 달 대략 얼마나(제품군 단위)</text>
  <text x="350" y="148" class="tx">무엇을 · 얼마나 · 언제 만들까(품목 단위)</text>
  <text x="350" y="166" class="tx-m">이 플랫폼: <tspan class="tx-b">생산계획서</tspan></text>
  <text x="350" y="206" class="tx-m">자재가 있나(8차시 MRP) · 설비가 감당하나</text>
  <text x="350" y="224" class="tx-m">이 플랫폼: 자재 가용성(ATP) · <tspan class="tx-b">설비 배정</tspan></text>
  <text x="350" y="264" class="tx-m">이 플랫폼: 생산오더(PRO) → MES 작업지시 ·</text>
  <text x="350" y="282" class="tx-m">디스패치 보드(9차시)</text>
  <text x="20" y="318" class="tx-m">위에서 아래로 갈수록 기간은 짧아지고 계획은 구체적이 됩니다.</text>
</svg>`;
  const PLANC_CONTENT = [
    { type: 'h', text: '생산계획은 여러 층으로 세운다' },
    { type: 'p', html: '공장의 계획은 한 번에 정해지지 않습니다. "이번 달에 대략 얼마나 팔릴까" 에서 시작해 "이번 주 · 오늘 어떤 품목을 몇 개" 로, 다시 "이 설비에서 몇 시부터 무엇을" 로 점점 구체적으로 내려옵니다. 위층 계획이 아래층 계획의 입력이 됩니다.' },
    { type: 'figure', html: PLANC_FIG, caption: '생산계획의 층 — 이 플랫폼의 생산계획서는 기준 생산계획(MPS)에, 설비 배정은 능력 계획에 해당합니다' },
    { type: 'table', head: ['계획', '기간 · 단위', '답하는 질문', '이 플랫폼'], rows: [
      ['판매 · 운영 계획(S&amp;OP)', '월 · 제품군', '팔 양과 만들 수 있는 양을 맞추면?', '— (수주 잔량 · 개요 화면으로 감을 잡음)'],
      ['기준 생산계획(MPS)', '주 · 일 · 품목', '무엇을 얼마나 언제 만들까?', '<span class="ui">▤ 생산계획 · 배정</span> 의 계획서(품목 · 수량 · 우선순위 · 납기)'],
      ['자재 소요 계획(MRP)', '일 · 자재', '자재가 충분한가, 무엇을 살까?', '<span class="ui">⛁ 자재(MRP) · 구매</span>, 생산오더의 자재 가용성(ATP)'],
      ['능력 계획', '시간 · 설비', '설비가 그 양을 시간 안에 만들 수 있나?', '설비 배정(필요 설비 수 · 설비별 부하 · 가용 시간 안 완료 여부)'],
      ['생산오더 · 일정 계획', '분 · 설비', '어느 설비에서 어떤 순서로?', '<span class="ui">⚑ 생산오더</span> → MES 작업지시 · 디스패치 보드'],
    ] },
    { type: 'h', text: '주문을 받고 만들까, 미리 만들어 둘까 — 생산 방식' },
    { type: 'table', head: ['방식', '뜻', '장점 · 단점', '예'], rows: [
      ['재고 생산(MTS, Make to Stock)', '수요를 예측해 미리 만들어 창고에 둔다', '납품이 빠름 / 재고 비용 · 안 팔릴 위험', '생수 · 과자 같은 표준 제품'],
      ['주문 생산(MTO, Make to Order)', '주문을 받은 뒤 만든다', '재고 부담 적음 / 납기가 길어짐', '맞춤 가구 · 특수 장비'],
      ['주문 조립(ATO, Assemble to Order)', '부품은 미리, 조립은 주문 후', '둘의 절충', '옵션을 고르는 PC · 자동차'],
    ], caption: '이 플랫폼은 고객 수주로 계획을 세우는 주문 생산(MTO) 흐름이 중심이며, 계획을 세울 때 완제품 재고를 보고 수량을 조정할 수 있습니다' },
    { type: 'callout', kind: 'tip', title: '계획은 "능력" 을 넘으면 안 됩니다', html: '아무리 좋은 계획도 설비가 감당하지 못하면 납기를 놓칩니다. 그래서 ERP 는 계획(MPS)을 세운 뒤 반드시 <b>자재(MRP)</b> 와 <b>능력(설비 · 시간)</b> 을 확인합니다. 이 플랫폼에서 계획서를 만들면 바로 아래에 나오는 <b>설비 배정</b>(필요 설비 수 · 예상 소요 · 가용 시간 안 완료 여부 · 경고)이 그 능력 확인입니다.' },
  ];
  const PLANC_SLIDES = [
    { layout: 'diagram', title: '생산계획의 층', html: PLANC_FIG,
      notes: '<p>💬 "여행 계획도 달 → 주 → 하루 일정 순으로 세우죠?" 비유로 시작합니다.</p><p>이 플랫폼에서 학생이 다루는 곳: 생산계획서 = MPS, 설비 배정 = 능력 계획, 생산오더 = 실행 지시.</p>' },
    { layout: 'table', title: '생산 방식 — MTS · MTO · ATO', head: ['방식', '핵심'], rows: [
      ['재고 생산(MTS)', '예측해 미리 만든다'], ['주문 생산(MTO)', '주문 받고 만든다 — 이 플랫폼'], ['주문 조립(ATO)', '부품은 미리, 조립은 주문 후']],
      notes: '<p>💬 "편의점 삼각김밥과 맞춤 양복은 어떤 방식일까?" 이 플랫폼은 수주에서 계획을 만드는 MTO 중심임을 확인합니다.</p>' },
  ];
  PY_COURSE.addChapter({
    id: 'ch07', no: '07', title: 'ERP ② 생산계획과 생산오더', subtitle: 'Production Plan · Production Order',
    summary: '생산계획서를 만들고 설비를 배정해 확정 · 생산 시작하며, 생산오더와 자재 가용성을 확인합니다.',
    goals: ['생산계획서를 만들고 편집 · 저장할 수 있다',
      '설비 수 · 품목 전환 · 가용 시간을 바꿔 설비 배정을 비교할 수 있다',
      '확정 → 생산 시작으로 MES · 현장이 움직이는 과정과 생산오더 · 자재 가용성을 설명할 수 있다'],
    sections: [
      {
        id: 'ch07-1', title: '생산계획서와 설비 배정', minutes: 50,
        goals: ['계획서를 만들고 편집한다', '설비 배정 조건을 바꿔 비교한다', '확정 · 생산 시작 후 MES · 라인을 확인한다'],
        flow: [['도입 — 계획이 없으면', 4], ['개념 — 생산계획의 층 · 생산 방식', 8], ['개념 — 계획서 · 배정', 5], ['실습 7-1 계획서', 9], ['실습 7-2 배정', 11], ['실습 7-3 생산 시작', 10], ['정리 · 퀴즈', 3]],
        content: [
          { type: 'figure', html: SHOT('erp_plans', 'ERP 생산계획 · 배정 화면'), caption: '생산계획 · 배정 — 왼쪽 계획서 목록, 오른쪽 계획서 내용 · 설비 배정' },
          { type: 'p', html: '<mark>생산계획서</mark>는 "오늘 어떤 색을 몇 박스, 어떤 순서로 만들지" 를 적은 문서입니다. 이 플랫폼의 ERP 는 계획서를 받으면 <b>설비 몇 대로 · 설비마다 무엇을 · 어떤 순서로</b> 만들지 자동으로 배정하고, 사람이 검토 · 확정한 뒤 <b>생산 시작</b>을 누르면 생산오더와 MES 작업지시를 만듭니다.' },
          ...PLANC_CONTENT,
          { type: 'figure', html: FIG_PLAN, caption: '계획서 상태 — 작성 → 확정 → 생산 지시됨 → 완료' },
          { type: 'h', text: '설비 배정은 어떻게 계산될까' },
          { type: 'table', head: ['규칙', '설명'], rows: [
            ['한 설비 = 한 번에 한 색', '다른 색으로 바꾸면 품목 전환 시간(기본 5분)이 듭니다'],
            ['필요 설비 수', '색 가짓수와 (총 소요 시간 ÷ 설비 1대 가용 시간) 중 큰 값 — <b>자동</b>일 때. 지정하면 그 대수로 고정'],
            ['긴 작업 나누기', '한 색이 가용 시간보다 길고 남는 설비가 있으면 여러 설비로 나눔'],
            ['배정 순서', '긴 작업부터 가장 덜 바쁜 설비로(같은 색을 하던 설비 우선)'],
            ['설비 안 순서', '우선순위(1 긴급) → 납기 → 큰 작업'],
            ['박스 1개 시간', '사이클 × 4개 ÷ 효율(정지 · 미픽 손실 반영) ≈ 8.24초'],
          ], caption: '이 배정 계산은 AI 생산계획(13차시)에서도 그대로 쓰입니다 — AI 는 요청을 이해해 이 계산을 불러 줍니다' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_EDIT },
          { type: 'figure', html: LAB_ALLOC },
          { type: 'figure', html: LAB_RELEASE },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 설비 4대 · 모두 준비 상태. 실습 7-3 은 실제로 설비를 돌립니다(20박스 ≈ 수 분).</li><li><b>공용 서버 주의</b>: 반 전체가 한 서버를 쓰면 7-3 은 <b>모둠 대표 1~2팀만</b> 생산 시작하고 나머지는 화면으로 함께 봅니다. 모두 생산 시작하면 작업지시가 설비 대기열에 길게 쌓입니다(MES 디스패치 보드에서 확인 가능 — 9차시 소재로 활용).</li><li><b>자주 막히는 곳</b>: 다시 배정이 회색 → 편집 저장을 안 함 / 생산 시작 후 자재 부족 표가 나옴 → 7-5 의 상황(다른 색으로 바꾸거나 8차시 방법으로 해결).</li><li><b>배정 결과</b>: 자동일 때 필요 설비가 1대로 나오는 것은 정상(시간이 충분하면 한 설비로 처리). 2대 고정으로 비교하게 합니다.</li><li><b>확인 기준</b>: 7-2 의 1대/2대/전환 20분/가용 6분 결과 표, 7-3 의 작업지시 번호와 운전 설비 번호.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: '생산계획서와 설비 배정', subtitle: 'ERP ② — 계획 → 배정 → 확정 → 생산 시작', notes: '<p>지난 차시의 수주가 오늘 계획이 됩니다.</p>' },
          ...PLANC_SLIDES,
          { layout: 'diagram', title: '계획서 상태', html: FIG_PLAN, notes: '<p>확정 ≠ 생산 시작. 확정 후 편집하면 다시 작성 중.</p>' },
          { layout: 'table', title: '설비 배정 규칙', head: ['규칙', '내용'], rows: [['한 설비 한 색', '색 바꾸면 전환 5분'], ['필요 설비 수', 'max(색 수, 소요 ÷ 가용)'], ['배정', '긴 작업 → 덜 바쁜 설비'], ['순서', '우선순위 → 납기 → 큰 작업']],
            notes: '<p>💬 "색이 3개인데 설비가 2대면?" → 한 설비는 색을 바꿔야 함(전환 시간).</p>' },
          { layout: 'bullets', title: '실습 7-1 · 계획서 만들기 (10분)', bullets: ['+ 새 계획서 → 화이트 10', '이름 바꾸기 · 가용 시간 8', '+ 품목 추가 → 레드 10', '편집 저장(저장 전 다른 버튼 비활성)', '(선택) 미출고 수주로 작성'],
            notes: '<p>"저장하지 않은 변경이 있습니다" 문구를 같이 확인.</p>' },
          { layout: 'diagram', title: '설비 배정 비교', html: SHOT('ch07_realloc_done', '2대 배정 결과'),
            notes: '<p>막대의 길이 = 예상 소요. 2대로 나누면 짧아지고 전환이 없어짐.</p>' },
          { layout: 'bullets', title: '실습 7-2 · 배정 바꿔 보기 (12분)', bullets: ['자동 결과 읽기 · 박스 1개 ≈ 8.24초', '2대 고정 → 다시 배정', '1대 고정 + 전환 20분', '가용 0.1시간 → ✖ 초과 · 경고', '되돌리기: 8시간 · 5분 · 2대'],
            notes: '<p>결과를 표로 적어 비교. 마지막 단계 원복 확인.</p>' },
          { layout: 'diagram', title: '생산 시작', html: SHOT('ch07_release_dialog', '생산 시작 확인 창'),
            notes: '<p>창 설명을 소리 내어 읽기: 생산오더 → ATP 확인 · 예약 → MES 작업지시.</p>' },
          { layout: 'bullets', title: '실습 7-3 · 확정 → 생산 시작 (12분)', bullets: ['생산 계획 완료(확정) → 확정', '▶ 생산 시작 → 생산 시작', '배지 ➜ 생산 지시됨 · 작업지시 번호', 'MES 디스패치 보드 확인', '공장 라인: 배정된 설비만 운전'],
            notes: '<p>공용 서버면 대표 팀만 실행.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[3].q, options: QUIZ1[3].options, answer: QUIZ1[3].answer, explain: QUIZ1[3].explain, notes: '<p>설비가 시작과 동시에 움직이지 않는 설계와 연결.</p>' },
          { layout: 'summary', title: '정리', bullets: ['계획서: 무엇을 · 얼마나 · 어떤 순서로', '배정: 한 설비 한 색 · 전환 시간 · 긴 작업 먼저', '확정 = 검토, 생산 시작 = MES 로', '작업지시가 시작된 설비만 기동'],
            notes: '<p>다음 교시: 생산오더 · 자재 가용성 · 계획서 파일.</p>' },
        ],
      },
      {
        id: 'ch07-2', title: '생산오더와 자재 가용성', minutes: 50,
        goals: ['생산오더의 상태와 자재 소요 · 실적 확인을 읽는다', '자재 부족으로 릴리스가 보류되는 과정을 확인한다', '계획서를 파일로 내보내고 불러온다'],
        flow: [['도입 — 자재가 없다면', 5], ['개념 — 생산오더 · ATP', 8], ['실습 7-4 생산오더', 12], ['실습 7-5 자재 부족', 12], ['실습 7-6 파일', 8], ['정리 · 퀴즈', 5]],
        content: [
          { type: 'h', text: '생산오더(Production Order)' },
          { type: 'p', html: '계획서의 <span class="ui">▶ 생산 시작</span> 을 누르면 계획 줄마다 <mark>생산오더(PRO-…)</mark> 가 생깁니다. 생산오더는 "이 품목을 이만큼 만들기 위해 자재를 확보하고 현장(MES)에 맡겼다" 는 ERP 의 기록입니다. 실제 기업의 ERP(L4) → MES(L3) 구조를 그대로 따릅니다.' },
          { type: 'figure', html: FIG_PRO, caption: '생산오더 흐름 — 자재가 충분해야 MES 로 내려갑니다' },
          { type: 'table', head: ['용어', '뜻'], rows: [
            ['ATP(자재 가용성)', '지금 쓸 수 있는 자재 = 현재고 − 다른 오더가 예약한 양'],
            ['예약', '릴리스된 오더가 앞으로 쓸 자재를 미리 잡아 둔 양'],
            ['발주잔', '구매 발주했지만 아직 입고되지 않은 양(가용에 더하지 않음)'],
            ['GI(자재 출고)', '생산에 실제로 쓴 자재 — 적재함 실적마다 기록'],
            ['GR(완제품 입고)', '만든 완제품 박스가 창고에 들어온 것'],
            ['TECO', '목표 수량을 다 채운 기술적 완료, 이후 마감 → 종료'],
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_PRO },
          { type: 'figure', html: LAB_SHORT },
          { type: 'figure', html: LAB_FILE },
          { type: 'callout', kind: 'more', title: '왜 예약을 할까?', html: '두 생산오더가 같은 레드 공작물 40개를 동시에 쓰려고 하면, 둘 다 "충분하다" 고 판단했다가 생산 도중 한쪽이 멈출 수 있습니다. 그래서 먼저 릴리스된 오더가 자재를 <b>예약</b>하고, 다음 오더는 예약을 뺀 <b>가용</b>으로 판단합니다. 생산오더 화면 왼쪽 아래 <b>자재 예약</b> 카드가 그 현황입니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 7-5 가 잘 되려면 그린 공작물 재고가 부족해야 합니다(예시 기준정보 기본값). 이전 수업에서 그린을 구매 · 입고했다면 수량을 크게(예: 40박스) 잡게 합니다.</li><li><b>다음 차시 연결</b>: 7-5 에서 만든 그린 계획서 · 생성 상태 생산오더는 <b>지우지 말고</b> 8차시(구매 → 입고 → 재릴리스)에서 이어서 씁니다. 7-6 에서는 복제본 하나만 삭제합니다.</li><li><b>자주 막히는 곳</b>: 실적 확인 표가 비어 있음 → 아직 적재함이 출고되지 않음(몇 분 기다림) / 부족 표가 안 나오고 생산이 시작됨 → 그린 재고가 충분한 상태(다른 팀이 입고함).</li><li><b>확인 기준</b>: 7-4 상태 5가지 설명, 7-5 ATP 표 숫자로 부족 계산, 부족해도 릴리스의 위험 한 줄.</li><li><b>발문</b>: "생산 도중에 자재가 떨어지면 어떤 손실이 생길까?" → 설비 정지 · 미완성 제품 · 납기 지연.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '생산오더와 자재 가용성', subtitle: 'ERP ② — PRO · ATP · 릴리스 보류', notes: '<p>지난 교시에 생산 시작을 눌렀을 때 ERP 안에서 무슨 일이 일어났는지 봅니다.</p>' },
          { layout: 'diagram', title: '생산오더 흐름', html: FIG_PRO, notes: '<p>생성 → 생산 지시됨 → 생산 중 → TECO → 종료.</p>' },
          { layout: 'table', title: '용어', head: ['용어', '뜻'], rows: [['ATP', '현재고 − 다른 오더 예약'], ['발주잔', '아직 안 들어온 발주'], ['GI / GR', '자재 출고 / 완제품 입고'], ['TECO', '목표 달성 → 마감']],
            notes: '<p>GI · GR 은 실제 기업 ERP 에서도 쓰는 말입니다.</p>' },
          { layout: 'diagram', title: '생산오더 화면', html: SHOT('ch07_pro_list', '생산오더'), notes: '<p>목록 → 상세 → 자재 표 → 실적 확인 표 순서로 짚습니다.</p>' },
          { layout: 'bullets', title: '실습 7-4 · 생산오더 추적 (12분)', bullets: ['⚑ 생산오더 목록 · 상태', '상세: 목표 · 확인 · 작업지시', '자재 표: 소요 · GI · 남은 예약', '자재 가용성 확인 → ATP', '실적 확인 · 자재 예약 카드'],
            notes: '<p>적재함 출고 전이면 실적 확인 표가 비어 있는 것이 정상.</p>' },
          { layout: 'diagram', title: '릴리스 보류', html: SHOT('ch07_shortage', '자재 가용성 부족'),
            notes: '<p>💬 "가용 40, 소요 60 이면 부족은?" → 20.</p>' },
          { layout: 'bullets', title: '실습 7-5 · 자재 부족 (12분)', bullets: ['+ 새 계획서 → 그린 15 → 편집 저장', '▶ 생산 시작 → 릴리스 보류', 'ATP 표 열 읽기 · 부족 계산', '구매 발주 vs 부족해도 릴리스(누르지 않음)', '생산오더: 생성 상태'],
            notes: '<p>해결은 8차시. 계획서는 지우지 않게 합니다.</p>' },
          { layout: 'bullets', title: '실습 7-6 · 계획서 파일 (8분)', bullets: ['내보내기(파일) → JSON', '메모장: minifactory.schedule.v1', '파일 불러오기… → 새 번호 · 출처 파일', '복제본 하나 삭제'],
            notes: '<p>생산 지시된 계획서는 삭제 버튼이 없음을 확인.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[1].q, options: QUIZ2[1].options, answer: QUIZ2[1].answer, explain: QUIZ2[1].explain, notes: '<p>발주잔을 가용에 넣지 않는 이유: 아직 창고에 없음.</p>' },
          { layout: 'summary', title: '정리', bullets: ['생산 시작 → 계획 줄마다 생산오더', '자재 충분 → MES 로 릴리스, 부족 → 보류', '실적 확인마다 GI · GR 기록, 목표 달성 → TECO', '계획서는 파일로 공유'],
            notes: '<p>다음 차시: MRP · 구매 · 입고로 자재 부족 해결.</p>' },
        ],
      },
    ],
  });
})();
