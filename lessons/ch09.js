/* 09 MES ① 생산 실행 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_L4L3 = `<svg viewBox="0 0 700 260" role="img" aria-label="ERP 가 생산오더를 릴리스하면 MES 가 받아 설비별 작업지시와 라우팅 공정을 만들고, 설비가 생산한 적재함마다 실적과 검사 LOT 을 ERP 로 확인한다">
  ${ARROW('c09a1')}
  <rect x="10" y="20" width="680" height="70" rx="14" class="p1s"/>
  <text x="30" y="48" class="tx-b">ERP (계획 · 자재)</text>
  <text x="30" y="72" class="tx-m">생산계획서 → 생산오더(PRO) → 자재 가용성 → 릴리스</text>
  <rect x="10" y="110" width="680" height="70" rx="14" class="p2s"/>
  <text x="30" y="138" class="tx-b">MES (실행)</text>
  <text x="30" y="162" class="tx-m">작업지시(WO, 설비 · 순서) · 공정 5단계 · 디스패치 · 실적 · 검사 LOT</text>
  <rect x="10" y="200" width="680" height="50" rx="14" class="p3s"/>
  <text x="30" y="230" class="tx-b">설비(셀) — 계획 따라 운전: 작업지시가 시작되면 기동, 마지막 작업지시가 끝나면 대기</text>
  <line x1="520" y1="92" x2="520" y2="106" class="ln" stroke-width="2" marker-end="url(#c09a1)"/>
  <text x="530" y="104" class="tx-m">다운로드</text>
  <line x1="640" y1="108" x2="640" y2="94" class="ln" stroke-width="2" marker-end="url(#c09a1)"/>
  <text x="560" y="194" class="tx-m"> </text>
  <line x1="350" y1="182" x2="350" y2="196" class="ln" stroke-width="2" marker-end="url(#c09a1)"/>
  <text x="648" y="104" class="tx-m">실적 확인</text>
</svg>`;

  const FIG_OPS = `<svg viewBox="0 0 700 150" role="img" aria-label="라우팅 RT-BOX4 의 공정 다섯 단계: 투입, 비전, 픽 포장, 적재, 출하 검사">
  ${ARROW('c09a2')}
  <rect x="5" y="40" width="120" height="66" rx="12" class="p1s"/><text x="65" y="68" text-anchor="middle" class="tx-b">① 투입</text><text x="65" y="88" text-anchor="middle" class="tx-m">컨베이어 공급</text>
  <rect x="148" y="40" width="120" height="66" rx="12" class="p2s"/><text x="208" y="68" text-anchor="middle" class="tx-b">② 비전</text><text x="208" y="88" text-anchor="middle" class="tx-m">카메라 A 검출</text>
  <rect x="291" y="40" width="120" height="66" rx="12" class="p3s"/><text x="351" y="68" text-anchor="middle" class="tx-b">③ 픽 · 포장</text><text x="351" y="88" text-anchor="middle" class="tx-m">델타 · 박스 4개</text>
  <rect x="434" y="40" width="120" height="66" rx="12" class="p4s"/><text x="494" y="68" text-anchor="middle" class="tx-b">④ 적재</text><text x="494" y="88" text-anchor="middle" class="tx-m">UR3 · 적재함</text>
  <rect x="577" y="40" width="118" height="66" rx="12" class="p5s"/><text x="636" y="68" text-anchor="middle" class="tx-b">⑤ 출하 · 검사</text><text x="636" y="88" text-anchor="middle" class="tx-m">검사 LOT</text>
  <line x1="127" y1="73" x2="144" y2="73" class="ln" stroke-width="2" marker-end="url(#c09a2)"/>
  <line x1="270" y1="73" x2="287" y2="73" class="ln" stroke-width="2" marker-end="url(#c09a2)"/>
  <line x1="413" y1="73" x2="430" y2="73" class="ln" stroke-width="2" marker-end="url(#c09a2)"/>
  <line x1="556" y1="73" x2="573" y2="73" class="ln" stroke-width="2" marker-end="url(#c09a2)"/>
  <text x="350" y="135" text-anchor="middle" class="tx-m">적재함이 출고될 때마다 공정별 완료 수량(박스)이 늘어납니다</text>
</svg>`;

  const FIG_WO = `<svg viewBox="0 0 700 170" role="img" aria-label="작업지시 상태: 대기에서 진행, 진행에서 완료, 대기나 진행에서 중단">
  ${ARROW('c09a3')}
  <rect x="30" y="50" width="140" height="56" rx="12" class="card-bg"/><text x="100" y="76" text-anchor="middle" class="tx-b">○ 대기</text><text x="100" y="95" text-anchor="middle" class="tx-m">설비 대기열</text>
  <rect x="280" y="50" width="140" height="56" rx="12" class="p1s"/><text x="350" y="76" text-anchor="middle" class="tx-b">▶ 진행</text><text x="350" y="95" text-anchor="middle" class="tx-m">설비 운전 중</text>
  <rect x="530" y="20" width="140" height="56" rx="12" class="p2s"/><text x="600" y="46" text-anchor="middle" class="tx-b">✔ 완료</text><text x="600" y="65" text-anchor="middle" class="tx-m">목표 수량 달성</text>
  <rect x="530" y="100" width="140" height="56" rx="12" class="p5s"/><text x="600" y="126" text-anchor="middle" class="tx-b">■ 중단</text><text x="600" y="145" text-anchor="middle" class="tx-m">사람이 멈춤</text>
  <line x1="172" y1="78" x2="276" y2="78" class="ln" stroke-width="2" marker-end="url(#c09a3)"/>
  <text x="224" y="70" text-anchor="middle" class="tx-m">시작</text>
  <line x1="422" y1="70" x2="526" y2="48" class="ln" stroke-width="2" marker-end="url(#c09a3)"/>
  <text x="474" y="50" text-anchor="middle" class="tx-m">완료</text>
  <line x1="422" y1="88" x2="526" y2="128" class="ln" stroke-width="2" marker-end="url(#c09a3)"/>
  <text x="474" y="125" text-anchor="middle" class="tx-m">중단</text>
</svg>`;

  // ---------------------------------------------------------------- 실습 블록
  const LAB_PRO = `<div class="lab" data-lab="ch09-1-a">
  <div class="lab-head"><span class="lab-badge">실습 9-1</span><b>생산오더 수신함 — 공정 5단계 읽기</b><span class="lab-meta">⏱ 12분 · 화면: MES → 생산오더 · 공정</span></div>
  <p class="lab-goal">ERP 가 내려보낸 생산오더 하나를 펼쳐, 작업지시 · 공정 진행 · 자재 소요 · 검사 LOT 을 읽습니다.</p>
  <p class="lab-pre">7차시에서 생산계획서를 확정하고 ▶ 생산 시작을 해 생산오더가 MES 로 내려온 상태.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">MES</span> → 왼쪽 <span class="ui">⚑ 생산오더 · 공정</span> 을 엽니다.</div>
      ${SHOT('mes_pro', 'MES 생산오더 · 공정 목록')}
      <div class="lab-check">「ERP 생산오더 수신 · 작업지시 · 공정 진행」 카드에 PRO-… 카드가 줄지어 있습니다. 카드마다 품목(FG-BOX4-색), 상태, 양품/목표 박스, 작업지시 건수가 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">카드 위 안내문을 읽고, 생산오더 하나의 <b>제목 줄(▼)</b>을 눌러 펼칩니다.</div>
      ${SHOT('mes_pro_open', '펼친 생산오더')}
      <div class="lab-check">그 생산오더의 작업지시(WO-…)가 나오고, 각각 <b>설비 #n · 순서 · 양품/목표 · 라우팅 RT-BOX4 · 계획 시각</b> 이 보입니다.</div>
      <div class="lab-tip">설비 배정에서 한 색을 두 설비로 나눴다면 작업지시가 두 건입니다(7차시).</div></li>
    <li class="lab-step"><div class="lab-do">작업지시 아래의 공정 칸 다섯 개를 왼쪽부터 읽습니다.</div>
      <div class="lab-check">투입 → 비전 → 픽 · 포장 → 적재 → 출하 · 검사. 칸마다 작업장 · 완료/목표 수량 · 표준 시간(분)이 적혀 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">생산이 진행 중인 작업지시라면 1~2분 뒤 다시 봅니다.</div>
      <div class="lab-check">적재함 하나가 출고될 때마다 다섯 공정의 완료 수량이 함께 늘어납니다.</div></li>
    <li class="lab-step"><div class="lab-do">공정 아래 <b>자재 소요(박스당)</b> 와 <b>검사 LOT n건 (불합격 m)</b> 표시를 찾습니다.</div>
      <div class="lab-check">박스 1개에 공작물 4 · 박스 1 이 든다는 BOM 이 작업지시에 함께 내려와 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">화면을 아래로 내려 「검사 LOT(적재함 출하 검사)」 표를 봅니다.</div>
      ${SHOT('ch09_pro_inspect', '검사 LOT 표')}
      <div class="lab-check">검사 번호 · 시각 · 작업지시 · 적재함 LOT · <b>판정(합격/불합격)</b> · 측정값이 적재함마다 한 줄씩 있습니다. (10차시에서 자세히)</div></li>
  </ol>
  <div class="lab-result">MES 는 ERP 의 생산오더를 받아 <b>설비별 작업지시 + 라우팅 공정 5단계</b> 로 펼치고, 적재함마다 공정 수량 · 검사 결과를 쌓습니다.</div>
  <div class="lab-q">공정 다섯 개 중 예지보전 AI 가 지켜보는 설비가 쓰이는 공정은 어디일까요?</div>
</div>`;

  const LAB_DISPATCH = `<div class="lab" data-lab="ch09-1-b">
  <div class="lab-head"><span class="lab-badge">실습 9-2</span><b>디스패치 보드 — 설비 · 순서 바꾸기</b><span class="lab-meta">⏱ 12분 · 화면: MES → 디스패치 보드</span></div>
  <p class="lab-goal">설비별 작업 대기열을 읽고, 대기 중인 작업지시를 끌어 놓아 설비나 순서를 바꿔 봅니다.</p>
  <p class="lab-pre"><b>대기(○)</b> 상태 작업지시가 2건 이상 있어야 옮길 수 있습니다. 없으면 교사가 생산계획서를 하나 더 만들어 생산 시작합니다(설비 수를 적게 잡으면 대기열이 생깁니다).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MES → <span class="ui">▦ 디스패치 보드</span> 를 엽니다.</div>
      ${SHOT('mes_dispatch', '디스패치 보드')}
      <div class="lab-check">설비 #1 ~ #n 과 <b>미배정</b> 칸이 나란히 있습니다. 칸 머리에 설비 상태 · 지금 생산 색 · <b>n건 · 남은 분</b> 이 있습니다. 꺼 둔 설비는 '⏻ 사용 안 함' 입니다.</div></li>
    <li class="lab-step"><div class="lab-do">카드 맨 위 표시를 읽습니다.</div>
      <div class="lab-check">진행 중이면 <b>▶ 진행</b>, 대기 중이면 <b>#1 · #2 …</b>(순서)입니다. 카드에는 품목 · 양품/목표 박스 · 우선순위 · 남은 분 · 계획 시각이 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">칸 위 안내문을 읽습니다: 대기 중인 카드를 끌어 옮기면 <b>바로 저장</b>되고, 설비는 <b>맨 위부터</b> 생산합니다. <b>진행 중(▶)인 작업은 옮길 수 없습니다.</b></div>
      <div class="lab-check">▶ 진행 카드에 마우스를 올리면 '진행 중', 대기 카드에는 '끌어서 옮기기' 안내가 뜹니다.</div></li>
    <li class="lab-step"><div class="lab-do">한 설비 안에서 #2 카드를 끌어 #1 카드 위에 놓습니다.</div>
      <div class="lab-check">두 카드의 번호가 바뀝니다. 지금 작업이 끝나면 이 설비는 새 #1 부터 만듭니다.</div></li>
    <li class="lab-step"><div class="lab-do">대기 카드 하나를 다른 설비 칸(빈 곳이나 다른 카드 위)으로 끌어 놓습니다.</div>
      <div class="lab-check">카드가 그 설비로 옮겨지고, 두 칸의 'n건 · 남은 분' 이 다시 계산됩니다. 그 설비가 쉬고 있었다면 곧 이 작업지시를 시작합니다.</div>
      <div class="lab-tip">다른 색을 옮기면 그 설비는 색을 바꿔(품목 전환) 생산합니다.</div></li>
    <li class="lab-step"><div class="lab-do">▶ 진행 카드를 끌어 보려고 해 봅니다.</div>
      <div class="lab-check">끌리지 않습니다 — 이미 설비에서 돌고 있는 작업은 디스패치로 옮길 수 없습니다.</div></li>
    <li class="lab-step"><div class="lab-do">ERP → <span class="ui">▤ 생산계획 · 배정</span> 의 계획서 배정표와 비교해 봅니다.</div>
      <div class="lab-check">계획서는 처음 배정안, 디스패치 보드는 <b>현장에서 바꾼 실제 순서</b>입니다. 현장 사정(설비 고장 · 급한 주문)에 맞춰 MES 에서 조정하는 것이 디스패치입니다.</div></li>
  </ol>
  <div class="lab-result">디스패치 보드는 "어느 설비가 무엇을 어떤 순서로 만들지" 를 현장에서 바로 바꾸는 화면입니다. 대기 중인 작업만 옮길 수 있고, 바꾸면 즉시 설비 운전에 반영됩니다.</div>
</div>`;

  const LAB_FILE = `<div class="lab" data-lab="ch09-1-c">
  <div class="lab-head"><span class="lab-badge">실습 9-3</span><b>배정 저장(파일)과 불러오기</b><span class="lab-meta">⏱ 6분 · 화면: MES → 디스패치 보드</span></div>
  <p class="lab-goal">지금의 설비 배정을 파일로 저장해 두었다가 다시 불러오는 방법을 익힙니다(교대 인수인계 · 백업).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">디스패치 보드 오른쪽 위 <span class="ui">배정 저장(파일)</span> 을 누릅니다.</div>
      ${SHOT('ch09_dispatch_file', '배정 저장(파일) 버튼')}
      <div class="lab-check">브라우저가 <code>dispatch_날짜시각.json</code> 파일을 내려받습니다.</div></li>
    <li class="lab-step"><div class="lab-do">실습 9-2 처럼 대기 카드 하나의 순서를 바꿉니다.</div>
      <div class="lab-check">보드의 순서가 저장한 파일과 달라졌습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">배정 불러오기…</span> 를 누르고 방금 내려받은 파일을 고릅니다.</div>
      <div class="lab-check">보드가 파일에 저장된 배정(설비 · 순서)으로 돌아갑니다. 이미 진행 중이거나 끝난 작업지시는 그대로입니다.</div></li>
    <li class="lab-step"><div class="lab-do">이 기능을 언제 쓰면 좋을지 활동지에 두 가지 적습니다.</div>
      <div class="lab-check">예) 교대 전 배정을 저장해 다음 조에 전달, 배정을 실수로 바꿨을 때 되돌리기.</div></li>
  </ol>
  <div class="lab-result">배정 파일은 "이 시점의 디스패치" 를 기록합니다. 생산계획서 파일(7차시)과 마찬가지로 다른 사람과 공유하거나 되돌릴 때 씁니다.</div>
</div>`;

  const LAB_WO = `<div class="lab" data-lab="ch09-2-a">
  <div class="lab-head"><span class="lab-badge">실습 9-4</span><b>작업지시 추적과 "계획 따라 운전"</b><span class="lab-meta">⏱ 12분 · 화면: MES → 작업지시 · 공장 라인</span></div>
  <p class="lab-goal">작업지시의 상태가 바뀔 때 설비가 어떻게 움직이는지 관찰합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MES → <span class="ui">▤ 작업지시</span> 를 엽니다. 「작업지시 진행 현황」 의 열을 확인합니다.</div>
      ${SHOT('mes_wo', 'MES 작업지시 진행 현황')}
      <div class="lab-check">작업지시 · 품목 · 설비(#n · 순서) · 생산계획 · 계획 시작 · 목표 · 양품 · 불량 · 진척 막대 · 상태 · 시작 · 완료 열이 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">상태별로 작업지시를 하나씩 찾습니다: <b>○ 대기</b>, <b>진행</b>, <b>✔ 완료</b>(있으면 <b>■ 중단</b>).</div>
      <div class="lab-check">아래 상태 그림과 비교합니다. 대기 줄에는 <span class="ui">시작</span> · <span class="ui">중단</span>, 진행 줄에는 <span class="ui">완료</span> · <span class="ui">중단</span> 버튼이 있습니다.</div>
      <div class="lab-tip">이 버튼은 예외 처리용입니다. 평소에는 MES 연동이 설비 대기열 순서대로 작업지시를 자동으로 시작 · 완료합니다. 실습에서는 누르지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do">진행 중인 작업지시의 설비 번호를 적고, <span class="ui">공장 라인</span> 에서 그 설비를 봅니다.</div>
      ${SHOT('line_page', '공장 라인')}
      <div class="lab-check">그 설비는 운전 중이고, 공급되는 공작물 색이 작업지시 품목 색과 같습니다.</div></li>
    <li class="lab-step"><div class="lab-do">작업지시의 진척 막대와 양품 수를 1~2분 간격으로 두 번 기록합니다.</div>
      <div class="lab-check">적재함이 출고될 때마다 양품이 5박스씩 늘어납니다(실적 1건 = 적재함 1개).</div></li>
    <li class="lab-step"><div class="lab-do">목표에 거의 다다른 작업지시가 있으면 끝날 때까지 지켜봅니다.</div>
      <div class="lab-check">목표를 채우면 상태가 ✔ 완료, 완료 시각이 찍히고, 그 설비는 대기열의 다음 작업지시를 시작합니다. 대기열이 비었으면 설비는 <b>대기</b>로 멈춥니다.</div></li>
    <li class="lab-step"><div class="lab-do">관찰한 규칙을 한 문장으로 적습니다.</div>
      <div class="lab-check">"작업지시가 시작되면 그 설비가 기동하고, 마지막 작업지시가 끝나면 대기한다" — 이것이 <b>계획 따라 운전</b>입니다.</div></li>
  </ol>
  <div class="lab-result">설비는 사람이 일일이 기동하지 않아도 <b>MES 작업지시를 따라</b> 움직입니다. 작업지시 없이 공장 라인의 기동 버튼으로 돌린 생산은 실적이 작업지시에 연결되지 않습니다(보류).</div>
</div>`;

  const LAB_RESULT = `<div class="lab" data-lab="ch09-2-b">
  <div class="lab-head"><span class="lab-badge">실습 9-5</span><b>생산 실적 읽기와 수동 실적 등록</b><span class="lab-meta">⏱ 10분 · 화면: MES → 생산 실적</span></div>
  <p class="lab-goal">자동으로 쌓이는 실적과 ERP 반영 상태를 읽고, 수동 실적 등록 방법을 익힙니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MES → <span class="ui">✔ 생산 실적</span> 을 엽니다. 아래 「생산 실적」 표를 봅니다.</div>
      ${SHOT('mes_results', 'MES 생산 실적')}
      <div class="lab-check">시각 · 작업오더 · 적재함 LOT · 양품 · 불량 · <b>ERP 반영</b> 열이 있습니다. 대부분 '✔ 반영됨' 입니다.</div></li>
    <li class="lab-step"><div class="lab-do">'ERP 반영' 열에서 <b>미반영</b> 인 줄이 있는지 찾습니다.</div>
      <div class="lab-check">미반영 줄에는 <span class="ui">재전송</span> 버튼이 있습니다. ERP 연결이 잠시 끊겼을 때 생기며, 동기화 주기마다 자동으로 다시 보냅니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 「실적 수동 등록」 카드의 안내문을 읽습니다.</div>
      ${SHOT('ch09_results_mark', '실적 수동 등록 카드')}
      <div class="lab-check">"라인이 가동 중이면 적재함 출고 때 실적이 자동 등록됩니다. 아래는 수동 보고용(실적 1건 = 적재함 1개)" 이라고 적혀 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>진행 중 작업오더</b> 목록을 펼쳐 봅니다.</div>
      <div class="lab-check">진행(RUNNING) 중인 작업지시만 '번호 (양품/목표)' 로 나옵니다. 진행 중인 것이 없으면 비어 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">(교사 시연) 진행 중 작업오더를 고르고 양품 5 · 불량 0 으로 <span class="ui">실적 등록</span> 을 누릅니다.</div>
      <div class="lab-check">표 맨 위에 새 실적이 생기고, 작업지시의 양품이 5 늘며, ERP 에 실적 확인(자재 출고 · 완제품 입고)이 반영됩니다.</div>
      <div class="lab-tip">수동 실적은 실제로 수량과 재고를 바꿉니다. 실습에서는 교사가 한 번만 시연합니다.</div></li>
  </ol>
  <div class="lab-result">실적은 보통 <b>적재함 출고 때 자동 등록</b>되고 ERP 로 확인됩니다. 수동 등록은 라인 밖에서 만든 수량을 보고할 때 쓰며, 미반영 실적은 재전송으로 맞춥니다.</div>
</div>`;

  const LAB_MASTER = `<div class="lab" data-lab="ch09-2-c">
  <div class="lab-head"><span class="lab-badge">실습 9-6</span><b>MES 기준정보 예시 가져오기</b><span class="lab-meta">⏱ 8분 · 화면: MES → 기준정보 · 가져오기</span></div>
  <p class="lab-goal">작업장 · 라우팅 · 근무 달력 · 검사 계획을 예시 파일로 검증하고 내용을 읽습니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MES → <span class="ui">⇩ 기준정보 · 가져오기</span> 를 엽니다.</div>
      ${SHOT('mes_master', 'MES 기준정보 화면')}
      <div class="lab-check">「라우팅(공정 순서)」 · 「근무 달력 · 검사 계획」 · 「작업장(설비 × 공정 역할) · 능력」 카드와 아래 「MES 데이터 가져오기」 카드가 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">「MES 데이터 가져오기」 에서 <span class="ui">📄 예시: MES 기준정보(작업장 · 라우팅 · 근무 달력 · 검사 계획)</span> 를 누릅니다.</div>
      ${SHOT('ch09_master_example', 'MES 예시 기준정보 검증 결과')}
      <div class="lab-check">「검증 결과 · mes_master.example.json」 이 나오고 항목마다 신규 · 변경 · 동일 · 교체 건수가 보입니다. <b>아직 반영되지 않았습니다.</b></div></li>
    <li class="lab-step"><div class="lab-do">검증 결과 아래 안내문을 읽고, 이미 같은 내용이 들어가 있다면(모두 '동일') <span class="ui">적용</span> 을 누르지 않아도 됩니다. 처음이면 <span class="ui">적용</span> 을 누릅니다.</div>
      <div class="lab-check">같은 파일을 다시 적용해도 중복되지 않습니다(코드 기준). 적용하면 「가져오기 이력」 에 한 줄이 생깁니다.</div></li>
    <li class="lab-step"><div class="lab-do">「라우팅(공정 순서)」 카드에서 RT-BOX4 의 공정 다섯 개와 박스당 표준 시간(초)을 읽습니다.</div>
      <div class="lab-check">투입 · 비전 · 픽 · 포장 · 적재 · 출하 · 검사 — 실습 9-1 에서 본 공정 칸과 같습니다.</div></li>
    <li class="lab-step"><div class="lab-do">「근무 달력 · 검사 계획」 카드에서 근무일 · 가용 시간과 검사 항목을 읽습니다.</div>
      <div class="lab-check">검사 계획(적재함 단위): 적재함 박스 수 1~5, 박스당 공작물 4개, 불량률(픽 실패) 15 % 이하. 근무 달력은 표시 · 가용 시간 참고용이며, 시뮬레이션은 근무 외 시간에도 돌아갑니다.</div></li>
  </ol>
  <div class="lab-result">MES 기준정보는 <b>생산오더를 공정으로 펼치는 규칙(라우팅)</b> 과 <b>적재함 검사 기준(검사 계획)</b> 입니다. 이것이 있어야 9-1 의 공정 칸과 10차시의 검사 LOT 이 만들어집니다.</div>
</div>`;

  const QUIZ1 = [
    { q: 'MES 생산오더 카드를 펼치면 보이는 공정 다섯 단계의 순서로 옳은 것은?',
      options: ['비전 → 투입 → 적재 → 픽 · 포장 → 출하 · 검사', '투입 → 비전 → 픽 · 포장 → 적재 → 출하 · 검사', '투입 → 픽 · 포장 → 비전 → 출하 · 검사 → 적재', '적재 → 투입 → 비전 → 픽 · 포장 → 출하 · 검사'], answer: 1,
      explain: '라우팅 RT-BOX4 의 순서입니다: 컨베이어 투입 → 카메라 검출 → 델타 픽 · 포장 → UR3 적재 → 출하 검사.' },
    { q: '디스패치 보드에서 끌어 옮길 수 <b>없는</b> 카드는?',
      options: ['#1 대기 카드', '#3 대기 카드', '▶ 진행 카드', '미배정 칸의 대기 카드'], answer: 2,
      explain: '진행 중인 작업은 이미 설비에서 돌고 있어 옮길 수 없습니다.' },
    { q: '디스패치 보드에서 대기 카드를 다른 설비로 옮기면?',
      options: ['저장 버튼을 눌러야 반영된다', '바로 저장되고 그 설비가 대기열 순서대로 생산한다', 'ERP 계획서가 삭제된다', '다음 날부터 반영된다'], answer: 1,
      explain: '옮기는 즉시 저장되고, 설비는 맨 위부터 생산합니다.' },
    { q: '<span class="ui">배정 저장(파일)</span> 의 쓰임으로 알맞은 것은?',
      options: ['설비를 끈다', '현재 디스패치 배정을 파일로 남겨 공유하거나 되돌린다', 'AI 모델을 저장한다', '수주를 내보낸다'], answer: 1,
      explain: '배정 불러오기… 로 같은 파일을 읽으면 그 시점의 설비 · 순서로 돌아갑니다.' },
  ];
  const QUIZ2 = [
    { q: '"계획 따라 운전" 에 대한 설명으로 옳은 것은?',
      options: ['설비는 항상 켜져 있다', '작업지시가 시작되면 설비가 기동하고, 마지막 작업지시가 끝나면 대기한다', '사람이 매번 라인 기동을 눌러야 한다', 'AI 가 설비를 켜고 끈다'], answer: 1,
      explain: 'MES 연동이 설비별 대기열 순서대로 작업지시를 시작 · 완료하며 설비를 움직입니다.' },
    { q: 'MES 실적 1건은 무엇 하나에 해당할까요?',
      options: ['공작물 1개', '박스 1개', '적재함 1개', '작업지시 1개'], answer: 2,
      explain: '적재함(5박스)이 출고될 때마다 실적 1건이 등록됩니다.' },
    { q: '실적 표의 ERP 반영이 "미반영" 일 때 할 수 있는 것은?',
      options: ['실적을 삭제한다', '재전송 버튼으로 다시 보낸다(자동 재시도도 됨)', '작업지시를 중단한다', '설비를 재시작한다'], answer: 1,
      explain: 'ERP 연결이 잠시 끊긴 경우로, 재전송하거나 동기화 주기마다 자동으로 다시 보냅니다.' },
    { q: 'MES 검사 계획의 기준에 <b>포함되지 않는</b> 것은?',
      options: ['적재함 박스 수 1~5', '박스당 공작물 4개', '불량률(픽 실패) 15 % 이하', '모터 진동 RMS 0.2 g 이하'], answer: 3,
      explain: '검사 계획은 적재함 단위 품질 기준입니다. 진동은 예지보전에서 다룹니다.' },
  ];

  PY_COURSE.addChapter({
    id: 'ch09', no: '09', title: 'MES ① 생산 실행', subtitle: 'Production Orders · Dispatch · Work Orders · Results',
    summary: 'ERP 에서 내려온 생산오더를 MES 에서 공정 · 작업지시로 읽고, 디스패치 보드로 설비 · 순서를 바꾸며, 작업지시 · 실적 · MES 기준정보를 직접 다룹니다.',
    goals: ['생산오더의 작업지시 · 공정 5단계 · 검사 LOT 을 읽을 수 있다',
      '디스패치 보드에서 대기 작업지시의 설비 · 순서를 바꾸고 배정을 파일로 저장 · 불러올 수 있다',
      '작업지시 상태와 "계획 따라 운전" 을 설명할 수 있다',
      '생산 실적과 ERP 반영, MES 기준정보 가져오기를 할 수 있다'],
    sections: [
      {
        id: 'ch09-1', title: '생산오더 · 공정 · 디스패치', minutes: 50,
        goals: ['생산오더를 펼쳐 작업지시 · 공정 · 검사 LOT 을 읽는다', '디스패치 보드에서 순서와 설비를 바꾼다', '배정 파일을 저장 · 불러온다'],
        flow: [['도입 — ERP 와 MES 의 역할', 6], ['개념 — 공정 5단계', 6], ['실습 9-1 생산오더', 12], ['실습 9-2 디스패치', 12], ['실습 9-3 배정 파일', 6], ['정리 · 퀴즈', 8]],
        content: [
          { type: 'p', html: 'ERP 가 "무엇을 얼마나 언제까지" 만들지 정하면, <mark>MES(Manufacturing Execution System, 생산 실행 시스템)</mark> 는 "어느 설비가 어떤 순서로 어떻게" 만들지 실행하고 기록합니다. 이 차시에서는 ERP 에서 내려온 생산오더가 MES 에서 어떻게 펼쳐지고, 현장에서 순서를 어떻게 조정하는지 다룹니다.' },
          { type: 'figure', html: FIG_L4L3, caption: 'ERP(계획) → MES(실행) → 설비. 실적은 거꾸로 올라가 ERP 에서 확인됩니다' },
          { type: 'h', text: '라우팅 — 박스가 만들어지는 다섯 공정' },
          { type: 'figure', html: FIG_OPS, caption: '라우팅 RT-BOX4: 생산오더를 받으면 작업지시마다 이 다섯 공정이 만들어집니다' },
          { type: 'table', head: ['MES 화면', '하는 일', '이 차시 실습'], rows: [
            ['⚑ 생산오더 · 공정', 'ERP 생산오더 수신, 작업지시 · 공정 진행, 검사 LOT', '실습 9-1'],
            ['▦ 디스패치 보드', '설비별 대기열, 끌어 놓아 설비 · 순서 변경, 배정 파일', '실습 9-2 · 9-3'],
            ['▤ 작업지시', '작업지시 상태 · 진척', '다음 교시'],
            ['✔ 생산 실적', '적재함 단위 실적 · ERP 반영', '다음 교시'],
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_PRO },
          { type: 'figure', html: LAB_DISPATCH },
          { type: 'figure', html: LAB_FILE },
          { type: 'callout', kind: 'more', title: '📘 더 알아보기 — 디스패칭', html: '실제 공장의 MES 에서 <b>디스패칭(dispatching)</b> 은 "지금 이 설비에 다음으로 무엇을 넣을지" 를 정하는 일입니다. 계획(ERP)은 하루 · 주 단위로 세우지만, 현장은 설비 고장 · 급한 주문 · 자재 도착 같은 사정으로 분 단위로 바뀌기 때문에 MES 에서 다시 조정합니다. 13차시의 AI 생산계획은 이 배정 초안을 대화로 만들어 줍니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 실습 9-2 에는 <b>대기 작업지시가 2건 이상</b> 필요합니다. 수업 직전에 ERP 에서 색 3~4 가지 · 설비 2대로 계획서를 만들어 생산 시작하면(7차시) 설비마다 대기열이 생깁니다. 모든 작업지시가 끝나 있으면 카드를 옮길 수 없습니다.</li><li><b>공용 서버 주의</b>: 디스패치 변경은 모든 학생 화면과 설비에 즉시 반영됩니다. 교사가 시연하고, 학생은 모둠 대표만 한 번씩 옮기게 합니다.</li><li><b>자주 막히는 곳</b>: 카드가 안 끌림 → 진행(▶) 카드이거나, 브라우저 창이 너무 좁은 경우. 창을 넓히고 대기 카드를 끌게 합니다.</li><li><b>발문</b>: "계획서 배정과 디스패치 보드가 다르면 무엇이 맞나?" → 지금 현장은 디스패치 보드.</li><li><b>확인 기준</b>: 공정 5단계를 순서대로 말하기, 디스패치에서 순서를 바꾼 전/후 캡처.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: '생산오더 · 공정 · 디스패치', subtitle: 'ERP 가 정하고, MES 가 실행한다', notes: '<p>💬 "계획대로만 공장이 돌아갈까요?" — 고장 · 급주문 같은 예를 끌어내 디스패치의 필요성으로 연결합니다.</p>' },
          { layout: 'diagram', title: 'ERP → MES → 설비', html: FIG_L4L3, notes: '<p>위로 올라가는 실적 확인(자재 출고 · 완제품 입고)은 8차시 재고 이력과 연결됩니다.</p>' },
          { layout: 'diagram', title: '공정 5단계(라우팅)', html: FIG_OPS, notes: '<p>각 공정이 3D 라인의 어느 장비인지 짚습니다: 컨베이어 · 카메라 A · 델타 · UR3 · 적재함.</p>' },
          { layout: 'diagram', title: '화면 — 생산오더 펼치기', html: SHOT('mes_pro_open', '펼친 생산오더'), notes: '<p>제목 줄의 ▼ 를 누르는 시연. 작업지시 · 공정 칸 · 자재 소요 · 검사 LOT 건수를 차례로 가리킵니다.</p>' },
          { layout: 'bullets', title: '실습 9-1 · 생산오더 (12분)', bullets: ['MES → 생산오더 · 공정', '카드 펼치기(▼) → 작업지시', '공정 5칸 읽기 · 1~2분 뒤 다시', '자재 소요 · 검사 LOT 표'],
            notes: '<p>생산 중인 오더를 고르면 숫자가 늘어나는 것을 볼 수 있습니다.</p>' },
          { layout: 'diagram', title: '화면 — 디스패치 보드', html: SHOT('mes_dispatch', '디스패치 보드'), notes: '<p>칸 머리(n건 · 남은 분), 카드의 #순서 / ▶ 진행 표시를 설명합니다.</p>' },
          { layout: 'bullets', title: '실습 9-2 · 9-3 (18분)', bullets: ['대기 카드: 순서 바꾸기 · 다른 설비로', '▶ 진행 카드는 못 옮김', '바로 저장 → 설비 운전에 반영', '배정 저장(파일) → 바꾸기 → 배정 불러오기…'],
            notes: '<p>공용 서버이므로 모둠 대표만 조작. 옮긴 뒤 공장 라인에서 그 설비의 색이 바뀌는지도 함께 봅니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[1].q, options: QUIZ1[1].options, answer: QUIZ1[1].answer, explain: QUIZ1[1].explain, notes: '<p>왜 못 옮기는지(이미 설비에서 생산 중) 이유까지 말하게 합니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['생산오더 → 작업지시(설비 · 순서) + 공정 5단계', '공정 수량은 적재함 출고마다 증가', '디스패치: 대기 작업만, 바꾸면 즉시 반영', '배정 파일로 저장 · 되돌리기'],
            notes: '<p>다음 교시: 작업지시 상태 · 계획 따라 운전 · 실적 · MES 기준정보.</p>' },
        ],
      },
      {
        id: 'ch09-2', title: '작업지시와 생산 실적', minutes: 50,
        goals: ['작업지시 상태와 버튼의 의미를 설명한다', '계획 따라 운전을 관찰한다', '생산 실적 · ERP 반영 · 수동 실적 등록을 이해한다', 'MES 기준정보를 예시 파일로 가져온다'],
        flow: [['도입 — 설비는 언제 움직이나', 5], ['개념 — 작업지시 상태', 5], ['실습 9-4 작업지시', 12], ['실습 9-5 실적', 10], ['실습 9-6 기준정보', 8], ['정리 · 퀴즈', 10]],
        content: [
          { type: 'p', html: '4차시에서 "처음 켜면 설비가 움직이지 않는 것이 정상" 이라고 했습니다. 그렇다면 설비는 언제 움직일까요? 답은 <b>작업지시</b>입니다. 이 플랫폼의 설비는 MES 작업지시를 따라 기동하고 멈춥니다. 이 교시에서는 작업지시의 상태, 생산 실적, MES 기준정보를 다룹니다.' },
          { type: 'figure', html: FIG_WO, caption: '작업지시 상태 — 대기 → 진행 → 완료, 필요하면 중단' },
          { type: 'table', head: ['상황', '설비', '작업지시'], rows: [
            ['생산 시작 직후', '대기열 맨 위 작업지시의 설비가 기동', '○ 대기 → 진행'],
            ['적재함 출고', '계속 운전', '양품 +5, 실적 1건'],
            ['목표 수량 달성', '다음 작업지시로(품목이 다르면 품목 전환)', '✔ 완료'],
            ['대기열이 빔', '대기(정지)', '—'],
            ['라인 기동 버튼으로 직접 운전', '운전(작업지시 없음)', '실적 보류'],
          ], caption: '계획 따라 운전(설비 · 작업지시 연동)' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_WO },
          { type: 'figure', html: LAB_RESULT },
          { type: 'figure', html: LAB_MASTER },
          { type: 'callout', kind: 'warn', title: '작업지시 버튼은 신중하게', html: '작업지시 화면의 <span class="ui">시작</span> · <span class="ui">완료</span> · <span class="ui">중단</span> 은 실제 생산 흐름을 바꿉니다. 예를 들어 진행 중인 작업을 <b>중단</b>하면 그 설비는 멈추고 다음 작업으로 넘어갑니다. 현장에서는 감독자 확인 후 사용하는 예외 처리 기능입니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 진행 중인 작업지시가 있어야 실습 9-4 · 9-5 가 의미 있습니다. 목표 수량이 작은(예: 5~10박스) 계획을 하나 섞어 두면 수업 중에 "완료 → 다음 작업" 장면을 볼 수 있습니다.</li><li><b>실습 9-5</b>: 수동 실적 등록은 교사만 한 번 시연합니다(실제 수량 · 재고 변경). 시연 후 8차시 재고 이력에 같은 LOT 의 기록이 생긴 것을 함께 확인하면 ERP 연결이 잘 보입니다.</li><li><b>실습 9-6</b>: 이미 시드로 MES 기준정보가 들어 있으면 검증 결과가 모두 「동일」 입니다. 이때는 적용하지 않고 검증 화면만 읽게 합니다.</li><li><b>오개념</b>: "작업지시 = 생산오더" 가 아닙니다. 생산오더(ERP)는 품목 · 수량 단위, 작업지시(MES)는 설비 단위이며 하나의 생산오더가 여러 작업지시로 나뉠 수 있습니다.</li><li><b>확인 기준</b>: 계획 따라 운전 규칙 한 문장, 실적 1건 = 적재함 1개 설명.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '작업지시와 생산 실적', subtitle: '설비는 작업지시를 따라 움직인다', notes: '<p>💬 "처음 켰을 때 설비가 왜 멈춰 있었을까요?" — 작업지시가 없었기 때문.</p>' },
          { layout: 'diagram', title: '작업지시 상태', html: FIG_WO, notes: '<p>버튼(시작 · 완료 · 중단)은 예외 처리용이고, 평소에는 MES 연동이 자동으로 상태를 바꾼다는 점을 강조합니다.</p>' },
          { layout: 'table', title: '계획 따라 운전', head: ['상황', '설비'], rows: [['작업지시 시작', '기동'], ['적재함 출고', '양품 +5'], ['목표 달성', '다음 작업 · 품목 전환'], ['대기열 빔', '대기'], ['기동 버튼 직접 운전', '실적 보류']],
            notes: '<p>마지막 줄: 작업지시 없이 돌린 생산은 실적을 어디에 붙일지 몰라 보류됩니다.</p>' },
          { layout: 'diagram', title: '화면 — 작업지시', html: SHOT('mes_wo', '작업지시 진행 현황'), notes: '<p>진척 막대와 상태 배지를 읽는 법을 시연합니다.</p>' },
          { layout: 'bullets', title: '실습 9-4 · 작업지시 (12분)', bullets: ['상태별 작업지시 찾기', '진행 작업 → 공장 라인에서 그 설비 확인', '양품 변화 두 번 기록', '완료 → 다음 작업 / 대기 관찰'],
            notes: '<p>목표가 작은 작업지시가 끝나는 장면을 함께 봅니다.</p>' },
          { layout: 'diagram', title: '화면 — 생산 실적', html: SHOT('mes_results', '생산 실적'), notes: '<p>ERP 반영 열: 반영됨 / 미반영(재전송).</p>' },
          { layout: 'bullets', title: '실습 9-5 · 9-6 (18분)', bullets: ['실적 표: 적재함 LOT · ERP 반영', '실적 수동 등록: 진행 중 작업오더만(교사 시연)', 'MES 기준정보 예시 → 검증 → (필요하면) 적용', '라우팅 · 검사 계획 읽기'],
            notes: '<p>검사 계획 세 기준(박스 수 · 박스당 4개 · 불량률 15 %)을 판서해 두면 10차시에 다시 씁니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[0].q, options: QUIZ2[0].options, answer: QUIZ2[0].answer, explain: QUIZ2[0].explain, notes: '<p>"AI 가 설비를 켠다" 를 고른 학생에게 3차시 원칙(AI 는 권고)을 다시 상기시킵니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['작업지시: 대기 → 진행 → 완료(중단)', '계획 따라 운전: 작업지시 = 설비 기동 신호', '실적 1건 = 적재함 1개, ERP 반영 확인', 'MES 기준정보 = 라우팅 · 검사 계획 · 작업장 · 근무 달력'],
            notes: '<p>다음 차시: 품질 · 검사 LOT · LOT 추적 · 대시보드.</p>' },
        ],
      },
    ],
  });
})();
