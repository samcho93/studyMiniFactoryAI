/* 03 이 플랫폼으로 보는 피지컬 AI */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_MAP = `<svg viewBox="0 0 720 360" role="img" aria-label="플랫폼의 인식, 판단, 행동, 학습 구성 요소 지도">
  ${ARROW('c03a1')}
  <rect x="10" y="20" width="165" height="250" rx="14" class="p2s"/>
  <text x="92" y="48" text-anchor="middle" class="tx-b">① 인식</text>
  <text x="92" y="80" text-anchor="middle" class="tx-m">카메라 A — 공작물</text>
  <text x="92" y="100" text-anchor="middle" class="tx-m">위치 · 각도 검출</text>
  <text x="92" y="130" text-anchor="middle" class="tx-m">카메라 B — 벨트 사행</text>
  <text x="92" y="150" text-anchor="middle" class="tx-m">· 흡착 패드 · 열화상</text>
  <text x="92" y="180" text-anchor="middle" class="tx-m">센서 — 진동 · 전류</text>
  <text x="92" y="200" text-anchor="middle" class="tx-m">· 온도 · 진공 · 에어</text>
  <text x="92" y="230" text-anchor="middle" class="tx-m">PLC 입력 · 카운터</text>
  <rect x="190" y="20" width="165" height="250" rx="14" class="p3s"/>
  <text x="272" y="48" text-anchor="middle" class="tx-b">② 판단</text>
  <text x="272" y="80" text-anchor="middle" class="tx-m">이상 점수</text>
  <text x="272" y="100" text-anchor="middle" class="tx-m">(정상 학습 모델)</text>
  <text x="272" y="130" text-anchor="middle" class="tx-m">고장 유형 추정</text>
  <text x="272" y="160" text-anchor="middle" class="tx-m">설비 배정(계획)</text>
  <text x="272" y="190" text-anchor="middle" class="tx-m">LLM 도우미 · 진단</text>
  <text x="272" y="220" text-anchor="middle" class="tx-m">PLC 시퀀스 로직</text>
  <rect x="370" y="20" width="165" height="250" rx="14" class="p4s"/>
  <text x="452" y="48" text-anchor="middle" class="tx-b">③ 행동</text>
  <text x="452" y="80" text-anchor="middle" class="tx-m">컨베이어 · 델타</text>
  <text x="452" y="100" text-anchor="middle" class="tx-m">· UR3 · 진공</text>
  <text x="452" y="130" text-anchor="middle" class="tx-m">상위 명령(기동 · 정지)</text>
  <text x="452" y="160" text-anchor="middle" class="tx-m">PLC 단계 신호 D120</text>
  <text x="452" y="180" text-anchor="middle" class="tx-m">(0 정상 · 1 주의 · 2 위험)</text>
  <text x="452" y="210" text-anchor="middle" class="tx-m">정비 오더 · 작업지시</text>
  <rect x="550" y="20" width="160" height="250" rx="14" class="p5s"/>
  <text x="630" y="48" text-anchor="middle" class="tx-b">④ 학습</text>
  <text x="630" y="80" text-anchor="middle" class="tx-m">시뮬레이터</text>
  <text x="630" y="100" text-anchor="middle" class="tx-m">(디지털트윈)</text>
  <text x="630" y="130" text-anchor="middle" class="tx-m">가상 고장 = 라벨</text>
  <text x="630" y="160" text-anchor="middle" class="tx-m">특징 → 데이터셋</text>
  <text x="630" y="190" text-anchor="middle" class="tx-m">자동 학습 · 모델 등록</text>
  <text x="630" y="220" text-anchor="middle" class="tx-m">추론 기록</text>
  <line x1="177" y1="300" x2="545" y2="300" class="ln" stroke-width="2" marker-end="url(#c03a1)"/>
  <text x="360" y="292" text-anchor="middle" class="tx-m">센서 데이터 → 판단 → 물리적 행동</text>
  <path d="M630 274 C630 340 92 340 92 274" class="ln" fill="none" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#c03a1)"/>
  <text x="360" y="352" text-anchor="middle" class="tx-m">결과 데이터로 다시 학습 (닫힌 루프)</text>
</svg>`;

  const FIG_ISA = `<svg viewBox="0 0 700 330" role="img" aria-label="ISA-95 계층: L4 ERP, L3 MES, L2 감시 제어, L1 PLC, L0 센서와 구동기, 이 플랫폼의 화면 대응">
  <rect x="140" y="10" width="420" height="50" rx="10" class="p1"/>
  <text x="350" y="32" text-anchor="middle" class="tx-w">L4 기업 계획 — ERP</text>
  <text x="350" y="50" text-anchor="middle" class="tx-w">수주 · BOM · 재고 · 생산계획 · 생산오더</text>
  <rect x="115" y="72" width="470" height="50" rx="10" class="p2"/>
  <text x="350" y="94" text-anchor="middle" class="tx-w">L3 생산 운영 — MES</text>
  <text x="350" y="112" text-anchor="middle" class="tx-w">작업지시 · 디스패치 · 실적 · 검사 LOT · 정비</text>
  <rect x="90" y="134" width="520" height="50" rx="10" class="p3s"/>
  <text x="350" y="156" text-anchor="middle" class="tx-b">L2 감시 · 제어 — 대시보드 · 공장 라인 · 예지보전</text>
  <text x="350" y="174" text-anchor="middle" class="tx-m">상태 모니터링 · 상위 명령 · 이상 점수 · 알람</text>
  <rect x="65" y="196" width="570" height="50" rx="10" class="p4s"/>
  <text x="350" y="218" text-anchor="middle" class="tx-b">L1 제어 — PLC (시퀀스 · 인터락 · 안전)</text>
  <text x="350" y="236" text-anchor="middle" class="tx-m">디바이스 맵(X · Y · M · D) · 단계 신호 D120</text>
  <rect x="40" y="258" width="620" height="50" rx="10" class="p5s"/>
  <text x="350" y="280" text-anchor="middle" class="tx-b">L0 현장 — 센서 · 카메라 · 컨베이어 · 델타 · UR3</text>
  <text x="350" y="298" text-anchor="middle" class="tx-m">(이 플랫폼에서는 시뮬레이터가 대신함)</text>
  <text x="10" y="40" class="tx-m">위로</text>
  <text x="10" y="56" class="tx-m">갈수록</text>
  <text x="10" y="72" class="tx-m">느리고</text>
  <text x="10" y="88" class="tx-m">넓게</text>
  <text x="660" y="290" class="tx-m">빠르고</text>
  <text x="660" y="306" class="tx-m">좁게</text>
</svg>`;

  const FIG_SAFE = `<svg viewBox="0 0 700 300" role="img" aria-label="안전 계층: 가장 안쪽 하드와이어 안전 회로, 그 위 PLC 로직, 그 위 사람의 확인, 가장 바깥 AI 권고">
  <rect x="20" y="20" width="660" height="260" rx="18" class="p1s"/>
  <text x="350" y="46" text-anchor="middle" class="tx-b">AI — 이상 점수 · 알람 · 계획 초안 · 정비 권고 (권고만)</text>
  <rect x="70" y="62" width="560" height="200" rx="16" class="p2s"/>
  <text x="350" y="88" text-anchor="middle" class="tx-b">사람 — 확인 대화상자 · 계획 확정 · 생산 시작 · 정비 결정 (감사 로그)</text>
  <rect x="120" y="104" width="460" height="140" rx="14" class="p3s"/>
  <text x="350" y="130" text-anchor="middle" class="tx-b">PLC 로직 — 시퀀스 · 인터락 · 정지 · 감속 최종 판단</text>
  <rect x="170" y="146" width="360" height="80" rx="12" class="p4"/>
  <text x="350" y="178" text-anchor="middle" class="tx-w">하드와이어 안전 회로</text>
  <text x="350" y="200" text-anchor="middle" class="tx-w">비상정지 · 안전 펜스 · 도어 인터락</text>
  <text x="350" y="272" text-anchor="middle" class="tx-m">안쪽으로 갈수록 우선 — 바깥 계층은 안쪽을 우회 · 해제할 수 없습니다</text>
</svg>`;

  const LAB_EXPLORE = `<div class="lab" data-lab="ch03-1-a">
  <div class="lab-head"><span class="lab-badge">실습 3-1</span><b>구성 요소 탐험 지도 만들기</b><span class="lab-meta">⏱ 20분 · 화면: 공장 라인 · 예지보전 · AI 생산계획 · MES</span></div>
  <p class="lab-goal">위 지도의 ① 인식 ② 판단 ③ 행동 ④ 학습 칸에 있는 요소를 플랫폼에서 하나씩 찾아가 확인 표시를 합니다.</p>
  <p class="lab-pre">활동지에 4칸 표(인식 · 판단 · 행동 · 학습)를 그려 둡니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">① 인식 — <span class="ui">공장 라인</span> 3D 화면 오른쪽 아래 카메라 화면 두 개를 봅니다.</div>
      ${SHOT('line_twin_cell', '카메라 A · B 화면')}
      <div class="lab-check">왼쪽 <b>카메라 A</b>(공작물 검출 — 위치 · 각도)와 오른쪽 <b>카메라 B</b>(예지보전 — 벨트 사행 · 흡착 패드, 왼쪽부터)를 구분했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">① 인식 — 같은 화면 오른쪽 아래로 스크롤해 <b>센서 실시간 값</b> 패널을 찾습니다.</div>
      ${SHOT('line_full', '공장 라인 전체 화면')}
      <div class="lab-check">진동 · 전류 · 온도 · 진공 같은 값이 계속 바뀝니다. 지도의 '센서' 에 표시합니다.</div></li>
    <li class="lab-step"><div class="lab-do">② 판단 — <span class="ui">예지보전</span> → <span class="ui">📊 보전 현황</span> 에서 설비별 <b>이상 점수</b>를 확인합니다.</div>
      <div class="lab-check">설비마다 날짜별 최대 이상 점수가 나옵니다. 이 점수는 <b>정상 데이터를 학습한 모델</b>(IsolationForest + z-점수)이 5초마다 계산합니다.</div></li>
    <li class="lab-step"><div class="lab-do">② 판단 — <span class="ui">AI 생산계획</span> 화면을 열어 예시 버튼과 계획서 영역을 확인합니다(보내지 않아도 됩니다).</div>
      ${SHOT('ai_plan_empty', 'AI 생산계획 화면')}
      <div class="lab-check">계획(설비 배정)을 판단하는 AI 입니다. 키가 없으면 규칙 기반, 있으면 Claude(LLM)가 답합니다.</div></li>
    <li class="lab-step"><div class="lab-do">③ 행동 — <span class="ui">공장 라인</span> 오른쪽 <span class="ui">상위 명령</span> 패널의 버튼(<span class="ui">기동</span> · <span class="ui">일시정지</span> · <span class="ui">재개</span> · <span class="ui">정지</span> · <span class="ui">리셋</span> · <span class="ui">■ 비상정지</span>)을 확인합니다.</div>
      ${SHOT('ch03_estop_mark', '상위 명령 패널')}
      <div class="lab-check">패널 아래 문장 "명령은 확인 후 전송되며 감사 로그에 남습니다 …" 를 읽었습니다. 웹은 <b>상위 명령</b>만 보내고, 로봇을 직접 조깅하지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do">③ 행동 — <span class="ui">MES</span> → <span class="ui">🔧 정비 · 예지보전</span> 에서 정비 오더 목록을 봅니다.</div>
      ${SHOT('ch03_mes_maint', 'MES 정비 · 예지보전')}
      <div class="lab-check">예지보전 알람(판단)이 <b>정비 오더(행동)</b> 로 이어집니다. 알람마다 <span class="ui">AI 권고</span> 버튼도 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">④ 학습 — <span class="ui">예지보전</span> → <span class="ui">🗄 DB 탐색 · 내보내기</span> 에서 맨 위 데이터 흐름 칸을 왼쪽부터 읽습니다.</div>
      ${SHOT('pdm_db', '예지보전 DB 탐색')}
      <div class="lab-check">원시(sensor_reading …) → 특징(feature_window) → 라벨(fault_injection_event) → 데이터셋 → 모델(model_registry) → 추론 → 알람 → 조치 순서와 각 행 수를 확인했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">활동지 지도에 찾은 요소마다 ✔ 를 하고, 화면 이름을 함께 적습니다.</div>
      <div class="lab-check">네 칸 모두 2개 이상 ✔ 가 있습니다.</div></li>
  </ol>
  <div class="lab-result">이 플랫폼은 한 공장 안에 피지컬 AI 의 <b>인식 · 판단 · 행동 · 학습</b> 이 모두 들어 있는 축소판입니다. 카메라와 센서가 보고, 모델과 LLM 이 판단하고, PLC · 로봇 · 정비가 행동하며, 시뮬레이터와 DB 가 학습을 돕습니다.</div>
</div>`;

  const LAB_ISA = `<div class="lab" data-lab="ch03-1-b">
  <div class="lab-head"><span class="lab-badge">실습 3-2</span><b>ISA-95 계층 따라 올라가기</b><span class="lab-meta">⏱ 12분 · 화면: 공장 라인 · 대시보드 · MES · ERP</span></div>
  <p class="lab-goal">현장(L0) 에서 기업 계획(L4) 까지 화면을 차례로 열며 계층마다 다루는 정보를 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">L0 · L1 — <span class="ui">공장 라인</span> 의 3D 화면과 오른쪽 <span class="ui">PLC 상태 · 카운터</span> 를 봅니다.</div>
      <div class="lab-check">장비 움직임(L0)과 PLC 의 상태 코드 · 카운터(L1: 투입 · 양품 · 박스 내 수량 · 적재함 박스 수)가 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">L2 — <span class="ui">대시보드</span> 를 엽니다.</div>
      ${SHOT('dashboard', '대시보드')}
      <div class="lab-check">여러 설비의 상태 · OEE · 생산량을 모아 <b>감시</b>합니다.</div></li>
    <li class="lab-step"><div class="lab-do">L3 — <span class="ui">MES</span> → <span class="ui">▦ 디스패치 보드</span> 를 엽니다.</div>
      ${SHOT('mes_dispatch', 'MES 디스패치 보드')}
      <div class="lab-check">설비별 작업지시 대기열 — <b>무엇을 어느 설비에서 어떤 순서로</b> 만들지 운영합니다.</div></li>
    <li class="lab-step"><div class="lab-do">L4 — <span class="ui">ERP</span> → <span class="ui">▦ 개요</span> 를 엽니다.</div>
      ${SHOT('erp_overview', 'ERP 개요')}
      <div class="lab-check">수주 · 잔량 · 재고 금액 · 자재 부족 — <b>무엇을 얼마나 언제까지</b> 만들지 기업 단위로 봅니다.</div></li>
    <li class="lab-step"><div class="lab-do">ERP 왼쪽 <span class="ui">⇄ ERP↔MES 연동</span> 을 열어 모듈 흐름 그래프를 봅니다.</div>
      ${SHOT('erp_graph', 'ERP↔MES 연동 그래프')}
      <div class="lab-check">ERP(L4) 의 생산오더가 MES(L3) 작업지시로 내려가고, 실적이 다시 ERP 로 올라오는 흐름을 확인했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">계층별로 'AI 가 하는 일' 을 한 줄씩 적습니다.</div>
      <div class="lab-check">예) L4 AI 도우미 · AI 생산계획 / L3 MES AI 도우미 · 정비 권고 / L2 이상 점수 · 알람 / L1 단계 신호(D120)를 받아 PLC 가 판단 / L0 카메라 검출.</div></li>
  </ol>
  <div class="lab-result">AI 는 한 층에만 있지 않습니다. 현장의 인식(L0)부터 계획(L4)까지 계층마다 다른 역할로 들어가며, <b>아래 계층일수록 빠르고 안전이 중요</b>합니다.</div>
</div>`;

  const LAB_CMD = `<div class="lab" data-lab="ch03-2-a">
  <div class="lab-head"><span class="lab-badge">실습 3-3</span><b>명령 확인 단계와 감사 로그</b><span class="lab-meta">⏱ 10분 · 화면: 공장 라인</span></div>
  <p class="lab-goal">웹에서 설비를 움직이는 명령이 반드시 <b>확인 → 전송 → 기록</b>을 거치는 것을 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 위쪽에서 설비 #1 을 고르고, 오른쪽 <span class="ui">상위 명령</span> 에서 <span class="ui">설비 #1</span> 이 선택된 것을 확인합니다(<span class="ui">전체 설비 (4대)</span> 를 고르면 모든 설비에 보냅니다).</div>
      <div class="lab-check">명령 대상이 <b>설비 #1</b> 입니다.</div></li>
    <li class="lab-step"><div class="lab-do">설비 #1 이 <span class="ui">준비</span> 상태면 <span class="ui">기동</span>, <span class="ui">운전</span> 상태면 <span class="ui">일시정지</span> 를 누릅니다.</div>
      ${SHOT('line_cmd_confirm', '명령 확인 대화상자')}
      <div class="lab-check">바로 실행되지 않고 <b>확인 대화상자</b>가 열립니다. 무슨 일이 일어나는지 설명이 적혀 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">대화상자의 확인 버튼(<span class="ui">기동</span> 또는 <span class="ui">일시정지</span>)을 누릅니다.</div>
      <div class="lab-check">명령 패널 아래에 <b>"명령 접수: … → 설비 #1 (감사 로그 #번호)"</b> 문장이 나타납니다. 이 번호가 누가 · 언제 · 무엇을 보냈는지 남긴 기록입니다.</div></li>
    <li class="lab-step"><div class="lab-do">상태가 바뀌는지(<span class="ui">운전</span> ↔ <span class="ui">일시정지</span>) 확인한 뒤, 일시정지했다면 <span class="ui">재개</span> 로 되돌립니다.</div>
      <div class="lab-check">위쪽 설비 칸과 PLC 상태가 바뀝니다. 재개도 확인 대화상자를 거칩니다.</div></li>
    <li class="lab-step"><div class="lab-do">화면 위 <span class="ui">사용자</span> 칸의 이름(기본 operator)을 확인합니다.</div>
      ${SHOT('ch04_user', '사용자 칸')}
      <div class="lab-check">명령은 이 이름으로 감사 로그에 남습니다. 수업에서는 자기 이름으로 바꿔 쓰면 누가 명령했는지 구분됩니다.</div></li>
  </ol>
  <div class="lab-result">사람이 보내는 명령조차 <b>확인 단계 + 감사 로그</b>를 거칩니다. AI 의 권고는 여기서 한 단계 더 바깥에 있어, 직접 명령을 보내지 않습니다.</div>
</div>`;

  const LAB_ESTOP = `<div class="lab" data-lab="ch03-2-b">
  <div class="lab-head"><span class="lab-badge">실습 3-4</span><b>비상정지와 복구 (시뮬레이터)</b><span class="lab-meta">⏱ 12분 · 화면: 공장 라인</span></div>
  <p class="lab-goal">시뮬레이터의 가상 비상정지 입력으로 라인이 즉시 멈추고, 해제 → 리셋 → 기동 순서로만 복구된다는 것을 체험합니다.</p>
  <p class="lab-pre">설비 #1 이 운전 중이면 효과가 잘 보입니다. 여러 명이 같은 서버를 쓰면 교사 지시에 따라 한 명만 합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">오른쪽 <span class="ui">상위 명령</span> 의 <span class="ui">■ 비상정지</span> 를 누릅니다.</div>
      ${SHOT('ch03_estop_confirm', '비상정지 확인 대화상자')}
      <div class="lab-check">"설비 #1 비상정지 누름 (시뮬레이터)" 대화상자가 열리고, 시뮬레이터의 비상정지 입력(X0)을 끊는다고 설명합니다.</div></li>
    <li class="lab-step"><div class="lab-do">대화상자의 <span class="ui">비상정지</span> 를 누릅니다.</div>
      <div class="lab-check">라인 · 로봇이 즉시 멈춥니다. 오른쪽 <b>안전 · 인터락</b> 칸이 '비상정지 눌림' 으로 바뀌고, 버튼은 <span class="ui">⟲ 비상정지 해제</span> 로 바뀝니다.</div></li>
    <li class="lab-step"><div class="lab-do">이 상태에서 <span class="ui">기동</span> 을 눌러 봅니다.</div>
      <div class="lab-check">비상정지가 눌린 동안에는 라인이 움직이지 않습니다 — PLC 인터락이 막습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">⟲ 비상정지 해제</span> → 대화상자의 <span class="ui">당겨서 해제</span> 를 누릅니다.</div>
      <div class="lab-check">"라인은 이상(ERROR) 상태로 남으며, 원인을 확인한 뒤 리셋 · 기동해야 합니다" — 해제만으로는 다시 돌지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">리셋</span> → 확인 을 누릅니다.</div>
      <div class="lab-check">상태가 <span class="ui">준비</span> 로 돌아옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">필요하면 <span class="ui">기동</span> 으로 다시 운전합니다(실습 전 상태가 준비였다면 그대로 둡니다).</div>
      <div class="lab-check">실습 전 상태로 복구했습니다.</div></li>
  </ol>
  <div class="lab-result">비상정지 → 해제 → <b>원인 확인</b> → 리셋 → 기동. 이 순서는 사람이 원인을 확인하도록 일부러 만든 절차입니다. <b>실제 장비</b>의 비상정지는 현장 버튼(하드와이어 안전 회로)으로만 누르고 해제하며, 웹은 대신 소프트웨어 정지 명령만 보낼 수 있습니다.</div>
</div>`;

  const LAB_AIONLY = `<div class="lab" data-lab="ch03-2-c">
  <div class="lab-head"><span class="lab-badge">실습 3-5</span><b>"AI 는 권고만" 확인하기</b><span class="lab-meta">⏱ 10분 · 화면: AI 생산계획 · ERP · MES · 공장 라인</span></div>
  <p class="lab-goal">AI 가 만든 결과가 사람의 확인 없이 설비를 움직이지 않는다는 것을 직접 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">AI 생산계획</span> 에서 예시 <span class="prompt">그린 40 설비 2대 6시간</span> 을 보냅니다.</div>
      ${SHOT('ai_plan_result', 'AI 생산계획 결과')}
      <div class="lab-check">계획서 초안이 만들어지고, 답변 끝에 "검토 후 [계획 확정] → [생산 시작] 을 눌러 주세요" 라고 안내합니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 으로 가서 설비 상태를 확인합니다.</div>
      <div class="lab-check">계획서가 생겼어도 설비 상태는 그대로입니다 — AI 초안만으로는 생산이 시작되지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">ERP</span> → <span class="ui">▤ 생산계획 · 배정</span> 에서 방금 계획서의 상태를 봅니다.</div>
      ${SHOT('erp_plans', 'ERP 생산계획 · 배정')}
      <div class="lab-check">상태가 <b>작성</b>(DRAFT)입니다. <span class="ui">생산 계획 완료(확정)</span> 과 <span class="ui">▶ 생산 시작</span> 은 사람이 눌러야 합니다(7차시). 이번에는 누르지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> 화면 오른쪽 아래 <span class="ui">✦ AI 도우미</span> 를 열고 <span class="prompt">설비 1번 기동해 줘</span> 라고 보냅니다.</div>
      <div class="lab-check">AI 도우미는 설비 상태를 알려 주거나 어느 화면에서 무엇을 누르면 되는지 안내할 뿐, 설비를 기동하지 않습니다(AI 에게 설비를 움직이는 도구가 없습니다).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 위쪽 제목 옆의 <b>모드</b> 표시를 확인합니다.</div>
      <div class="lab-check">"모드: 시뮬레이션" — 지금 보는 모든 동작은 시뮬레이터 검증입니다. 실장비 연동은 코드 · 문서까지 있지만 <b>실장비에서는 아직 검증하지 않았습니다(미검증)</b>.</div></li>
  </ol>
  <div class="lab-result">AI 는 <b>조회 · 초안 · 권고</b>까지, 확정 · 생산 시작 · 정지는 <b>사람과 PLC</b> 가 합니다. 그리고 어떤 결과가 시뮬레이션에서만 확인된 것인지 정직하게 표시하는 것도 안전한 피지컬 AI 의 일부입니다.</div>
  <div class="lab-q">AI 가 "베어링 위험" 이라고 알렸는데 실제 설비 소리는 정상이라면 어떻게 해야 할까요?</div>
</div>`;

  const QUIZ1 = [
    { q: '이 플랫폼에서 <b>카메라 B</b> 의 역할은?',
      options: ['공작물 위치 · 각도 검출', '벨트 사행 · 흡착 패드 상태 등 예지보전용 촬영', '작업자 출입 감시', '바코드 읽기'], answer: 1,
      explain: '카메라 A 는 피킹용 공작물 검출, 카메라 B 는 예지보전용(벨트 사행 · 흡착 패드 · 마모 · 열화상)입니다.' },
    { q: '예지보전의 판단(AI)이 PLC 로 전달하는 것은?',
      options: ['로봇 관절 각도', '정상 · 주의 · 위험 단계 신호(D120)', '비상정지 해제 신호', '컨베이어 속도 설정값'], answer: 1,
      explain: 'AI 는 단계 신호(0 정상 · 1 주의 · 2 위험)만 전달하고, 정지 · 감속은 PLC 로직이 최종 판단합니다.' },
    { q: 'ISA-95 계층에서 <b>MES</b> 가 속한 계층은?',
      options: ['L0', 'L1', 'L3', 'L4'], answer: 2, explain: 'L4 ERP(기업 계획), L3 MES(생산 운영), L2 감시 · 제어, L1 PLC, L0 현장 장비입니다.' },
    { q: '예지보전 DB 탐색 화면의 데이터 흐름 순서로 알맞은 것은?',
      options: ['모델 → 원시 → 알람 → 특징', '원시 → 특징 → 라벨 → 데이터셋 → 모델 → 추론 → 알람 → 조치', '알람 → 조치 → 원시 → 모델', '라벨 → 원시 → 조치 → 특징'], answer: 1,
      explain: '원시 데이터에서 특징을 뽑고, 고장 이력(라벨)과 묶어 학습 · 추론하고, 알람과 정비 조치로 이어집니다.' },
  ];
  const QUIZ2 = [
    { q: '공장 라인에서 <span class="ui">기동</span> 을 눌렀을 때 일어나는 일로 옳은 것은?',
      options: ['즉시 실행되고 기록은 남지 않는다', '확인 대화상자를 거쳐 전송되고 감사 로그 번호가 남는다', 'AI 가 판단해 거절할 수 있다', '3D 로봇을 끌어서 움직인다'], answer: 1,
      explain: '모든 상위 명령은 확인 단계와 감사 로그를 거칩니다.' },
    { q: '시뮬레이터에서 비상정지를 해제한 뒤 라인을 다시 돌리는 순서는?',
      options: ['해제만 하면 자동으로 다시 돈다', '해제 → 원인 확인 → 리셋 → 기동', '기동 → 해제 → 리셋', 'AI 도우미에게 재가동을 부탁한다'], answer: 1,
      explain: '해제 후에도 라인은 이상(ERROR) 상태로 남습니다. 원인을 확인하고 리셋 · 기동해야 합니다.' },
    { q: 'AI 생산계획이 계획서 초안을 만든 직후의 상태로 옳은 것은?',
      options: ['설비가 바로 생산을 시작한다', '계획서는 작성(DRAFT) 상태이고, 확정 · 생산 시작은 사람이 누른다', 'MES 작업지시가 자동으로 시작된다', '비상정지가 걸린다'], answer: 1,
      explain: 'AI 는 초안까지만 만듭니다.' },
    { q: '안전 계층에서 <b>가장 우선</b>하는 것은?',
      options: ['AI 권고', '사람의 확인', 'PLC 로직', '하드와이어 안전 회로(비상정지 · 도어 인터락)'], answer: 3,
      explain: '안전은 하드웨어가 책임집니다. 웹 · AI 는 이를 우회하거나 해제할 수 없습니다.' },
  ];

  PY_COURSE.addChapter({
    id: 'ch03', no: '03', title: '이 플랫폼으로 보는 피지컬 AI', subtitle: 'Platform anatomy & safety',
    summary: '플랫폼을 인식 · 판단 · 행동 · 학습으로 해부하고, AI 는 권고 · 사람과 PLC 가 결정하는 안전한 피지컬 AI 원칙을 화면에서 확인합니다.',
    goals: ['플랫폼 구성 요소를 인식 · 판단 · 행동 · 학습으로 분류할 수 있다',
      'ISA-95 계층(L0~L4)에 플랫폼 화면을 대응시킬 수 있다',
      '명령 확인 · 감사 로그 · 비상정지 복구 · AI 권고 원칙을 직접 확인할 수 있다'],
    sections: [
      {
        id: 'ch03-1', title: '플랫폼 구조 — 인식 · 판단 · 행동 · 학습', minutes: 50,
        goals: ['플랫폼의 피지컬 AI 구성 요소를 네 가지로 나눈다', '각 요소가 있는 화면을 찾아간다', 'ISA-95 계층과 화면을 대응시킨다'],
        flow: [['도입 — 지난 차시 루프 복습', 5], ['개념 — 구성 지도 · 계층', 10], ['실습 3-1 탐험 지도', 20], ['실습 3-2 계층 따라가기', 12], ['정리 · 퀴즈', 3]],
        content: [
          { type: 'figure', html: SHOT('hero_delta', '델타 셀 3D'), caption: '델타 셀 — 카메라 · 센서 · 로봇 · PLC 가 한 작업대에 모여 있습니다' },
          { type: 'p', html: '이 강좌의 실습 프로그램 이름은 <b>miniPythicalAI</b> — 작은(mini) 공장에서 <b>피지컬 AI</b> 를 배운다는 뜻을 담고 있습니다. 설비 1대는 작업대 하나에 <b>컨베이어 · 카메라 A/B · 델타 로봇 · 박스 라인 · UR3 · 적재함 · PLC</b> 가 모두 들어 있고, 최대 4대까지 늘릴 수 있습니다. 하드웨어가 없어도 <b>시뮬레이터</b>가 PLC · 로봇 · 카메라 · 센서를 대신해 공장 전체가 돌아갑니다.' },
          { type: 'h', text: '인식 · 판단 · 행동 · 학습 지도' },
          { type: 'figure', html: FIG_MAP, caption: '플랫폼의 피지컬 AI 구성 — 결과 데이터가 다시 학습으로 돌아오는 닫힌 루프' },
          { type: 'table', head: ['단계', '구성 요소', '어디서 보나'], rows: [
            ['① 인식', '카메라 A(공작물 위치 · 각도), 카메라 B(벨트 사행 · 흡착 패드 · 마모 · 열화상), 진동 · 전류 · 온도 · 진공 · 에어 센서', '공장 라인(카메라 · 센서 실시간 값), 예지보전 DB'],
            ['② 판단', '이상 점수(정상 데이터로 학습한 모델), 고장 유형 추정, 생산계획 설비 배정, LLM(AI 도우미 · AI 로 분석하기 · 정비 권고), PLC 시퀀스', '예지보전, AI 생산계획, ERP · MES AI 도우미'],
            ['③ 행동', '컨베이어 · 델타 · UR3 · 진공, 상위 명령(기동 · 정지 …), PLC 단계 신호 D120(0 정상 · 1 주의 · 2 위험), 정비 오더 · 작업지시', '공장 라인, MES 정비 · 작업지시'],
            ['④ 학습', '시뮬레이터(디지털트윈), 가상 고장(라벨), 특징 → 데이터셋 → 자동 학습 → 모델 등록, 추론 기록', '가상 고장, 예지보전 DB 탐색'],
          ] },
          { type: 'callout', kind: 'info', title: '디지털트윈 = 데이터 공장', html: '이 플랫폼의 시뮬레이터는 3D 화면만 그리는 것이 아니라 <b>AI 가 배울 데이터를 만들어 내는 공장</b>이기도 합니다. 설비가 돌아가는 동안 5초마다 특징이 쌓이고, 가상 고장 이력이 라벨이 되며, 정상 데이터가 충분히(120 윈도우) 모이면 모델이 <b>자동으로 학습 · 등록</b>됩니다.' },
          { type: 'h', text: 'ISA-95 — 공장 시스템의 층' },
          { type: 'figure', html: FIG_ISA, caption: '국제 표준 ISA-95 의 계층 — 이 플랫폼의 화면이 각 층에 대응합니다' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_EXPLORE },
          { type: 'figure', html: LAB_ISA },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 예지보전 DB 에 데이터가 있어야 실습 3-1 의 7단계가 의미 있습니다. 전날 설비를 30분 이상 돌려 두세요.</li><li><b>개념 연결</b>: 2차시의 "인식 → 판단 → 행동" 루프를 칠판에 다시 그리고, 이번에는 플랫폼의 이름표를 붙입니다.</li><li><b>자주 막히는 곳</b>: 센서 실시간 값 패널은 공장 라인 오른쪽 맨 아래에 있어 스크롤해야 보입니다.</li><li><b>확인 기준</b>: 실습 3-1 지도 4칸 각 2개 이상, 실습 3-2 계층별 AI 역할 5줄.</li><li><b>심화 발문</b>: "판단이 PLC(L1)에 가까울수록 왜 더 빨라야 할까?"</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: '플랫폼 구조 — 인식 · 판단 · 행동 · 학습', subtitle: 'miniPythicalAI 해부하기', notes: '<p>이름의 뜻(mini + Physical AI)부터 소개합니다.</p>' },
          { layout: 'diagram', title: '설비 1대의 구성', html: SHOT('hero_delta', '델타 셀'), notes: '<p>컨베이어 · 카메라 A/B · 델타 · 박스 라인 · UR3 · 적재함 · PLC 를 3D 에서 가리키며 소개합니다.</p>' },
          { layout: 'diagram', title: '인식 · 판단 · 행동 · 학습 지도', html: FIG_MAP, notes: '<p>아래 점선 화살표(결과 → 학습)를 강조: 닫힌 루프.</p>' },
          { layout: 'table', title: '어디서 보나', head: ['단계', '화면'], rows: [['인식', '공장 라인 카메라 · 센서'], ['판단', '예지보전 · AI 생산계획 · AI 도우미'], ['행동', '상위 명령 · MES 정비 · 작업지시'], ['학습', '가상 고장 · 예지보전 DB']],
            notes: '<p>실습 3-1 의 길잡이 표입니다.</p>' },
          { layout: 'bullets', title: '디지털트윈 = 데이터 공장', bullets: ['5초마다 특징 저장', '가상 고장 이력 = 라벨', '정상 120 윈도우 → 자동 학습 · 등록', '추론 · 알람 기록까지 DB 로'],
            notes: '<p>11~12차시에서 이 흐름을 자세히 봅니다.</p>' },
          { layout: 'diagram', title: 'ISA-95 계층', html: FIG_ISA, notes: '<p>💬 "ERP 와 PLC 중 더 빨리 반응해야 하는 것은?" → PLC. 위로 갈수록 느리고 넓게.</p>' },
          { layout: 'bullets', title: '실습 3-1 · 탐험 지도 (20분)', bullets: ['인식: 카메라 A/B · 센서 실시간 값', '판단: 이상 점수 · AI 생산계획', '행동: 상위 명령 · 정비 오더', '학습: DB 데이터 흐름 · 행 수'],
            notes: '<p>모둠별로 다른 순서로 돌게 하면 같은 화면에 몰리지 않습니다.</p>' },
          { layout: 'bullets', title: '실습 3-2 · 계층 따라가기 (12분)', bullets: ['L0 · L1 공장 라인 · PLC', 'L2 대시보드', 'L3 MES 디스패치', 'L4 ERP 개요 · 연동 그래프'],
            notes: '<p>연동 그래프에서 생산오더가 작업지시로 내려가는 선을 손으로 따라가게 합니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[1].q, options: QUIZ1[1].options, answer: QUIZ1[1].answer, explain: QUIZ1[1].explain, notes: '<p>"AI 는 단계만, 결정은 PLC" — 다음 교시 안전 원칙의 예고.</p>' },
          { layout: 'summary', title: '정리', bullets: ['인식: 카메라 A/B · 센서', '판단: 이상 점수 · 배정 · LLM', '행동: 명령 · 로봇 · 정비 · D120', '학습: 시뮬레이터 · 가상 고장 · 자동 학습', 'ISA-95 L0~L4 에 화면이 대응'],
            notes: '<p>다음 시간: 이 구조를 안전하게 쓰는 원칙.</p>' },
        ],
      },
      {
        id: 'ch03-2', title: '안전한 피지컬 AI 설계 원칙', minutes: 50,
        goals: ['안전 계층(하드와이어 · PLC · 사람 · AI)을 설명한다', '명령 확인 · 감사 로그 · 비상정지 복구를 직접 해 본다', 'AI 가 권고만 한다는 것과 검증 표기의 의미를 확인한다'],
        flow: [['도입 — AI 가 틀리면?', 5], ['개념 — 안전 계층 · 원칙', 10], ['실습 3-3 명령 확인', 10], ['실습 3-4 비상정지 복구', 12], ['실습 3-5 AI 는 권고만 · 정리', 13]],
        content: [
          { type: 'p', html: '피지컬 AI 는 틀렸을 때 물리적 비용이 큽니다. 그래서 이 플랫폼은 처음부터 "<b>AI 는 권고하고, 사람과 PLC 가 결정하며, 안전은 하드웨어가 책임진다</b>" 는 원칙으로 설계되었습니다. 이번 교시에는 이 원칙이 화면 곳곳에 어떻게 구현되어 있는지 직접 확인합니다.' },
          { type: 'figure', html: FIG_SAFE, caption: '안전 계층 — 안쪽이 우선이며, 바깥 계층은 안쪽을 우회할 수 없습니다' },
          { type: 'table', head: ['원칙', '플랫폼에서의 구현', '확인할 곳'], rows: [
            ['1. 안전은 하드웨어가', '비상정지 · 안전 펜스 · 도어 인터락은 하드와이어(PLC 안전 회로). 웹 · AI 는 우회 · 해제 불가', '공장 라인 안전 · 인터락(읽기 전용)'],
            ['2. AI 는 권고만', '이상 점수 · 알람 · 계획 초안 · 정비 권고까지. 정지 · 감속은 PLC 가 최종 판단', 'AI 생산계획 → 계획서 작성 상태'],
            ['3. 웹은 상위 명령만', '기동 · 일시정지 · 재개 · 정지 · 리셋. 로봇 조깅(수동 이동)은 팬던트에서만', '상위 명령 패널'],
            ['4. 확인 · 감사', '모든 명령은 확인 대화상자 → 감사 로그(누가 · 언제 · 무엇)', '명령 접수 문장(감사 로그 #)'],
            ['5. 3D 는 읽기 전용', '3D 모델을 끌어도 실제 장비는 움직이지 않음', '3D 화면 아래 안내 문구'],
            ['6. 기본은 시뮬레이션', 'HW_MODE=sim 이 기본. 실장비 명령은 real 모드 + 안전 점검 후에만', '공장 라인 "모드: 시뮬레이션"'],
            ['7. 정직한 검증 표기', '시뮬레이션에서만 확인한 것은 "시뮬레이션 검증", 실장비는 "미검증"', '문서 · 보고'],
          ] },
          { type: 'callout', kind: 'warn', title: '실장비에서는 다릅니다', html: '이 실습의 비상정지는 <b>시뮬레이터의 가상 입력</b>입니다. 실제 장비의 비상정지는 <b>현장의 비상정지 버튼(하드와이어)</b>으로만 누르고 해제합니다. 웹 화면은 대신 소프트웨어 정지 명령을 보낼 수 있을 뿐이며, 위급하면 반드시 현장 버튼을 누릅니다. 또한 이 플랫폼의 PLC · UR3 · 델타 · 카메라 실장비 연동은 코드와 문서까지 준비되어 있지만 <b>실장비에서 검증하지 않았습니다</b>.' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_CMD },
          { type: 'figure', html: LAB_ESTOP },
          { type: 'figure', html: LAB_AIONLY },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 한 서버를 여러 학생이 함께 쓰면 비상정지 실습은 <b>교사 시연 + 모둠 대표 1명</b>으로 진행합니다. 다른 학생의 실습이 갑자기 멈출 수 있습니다. 학생마다 실행본이 있으면 각자 해도 됩니다.</li><li><b>복구 확인</b>: 실습 3-4 후 모든 설비가 <span class="ui">준비</span> 또는 <span class="ui">운전</span> 상태인지, 안전 · 인터락이 모두 ✓ 인지 확인합니다.</li><li><b>AI 도우미 답</b>: 키가 없으면 규칙 기반 도우미가 설비 상태를 알려 주고, 키가 있으면 Claude 가 "직접 기동할 수 없으니 공장 라인에서 …" 처럼 안내합니다. 어느 쪽이든 설비는 움직이지 않습니다.</li><li><b>발문</b>: "AI 가 위험이라고 했는데 현장은 정상이라면?" → 근거 데이터 확인 · 현장 점검 · 오탐이면 기록(모델 개선 자료).</li><li><b>확인 기준</b>: 감사 로그 번호를 적었는가, 비상정지 복구 순서를 말할 수 있는가.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '안전한 피지컬 AI 설계 원칙', subtitle: 'AI 는 권고, 결정은 사람과 PLC', notes: '<p>💬 "AI 가 틀려서 로봇이 잘못 움직이면 누구 책임일까?" 로 시작합니다.</p>' },
          { layout: 'diagram', title: '안전 계층', html: FIG_SAFE, notes: '<p>양파 그림: 안쪽이 우선. AI 는 가장 바깥.</p>' },
          { layout: 'table', title: '일곱 가지 원칙', head: ['원칙', '구현'], rows: [['하드웨어 안전', '하드와이어 · 우회 불가'], ['AI 는 권고', '정지 · 감속은 PLC'], ['상위 명령만', '조깅은 팬던트'], ['확인 · 감사', '대화상자 · 로그'], ['3D 읽기 전용', '시점만 변경'], ['기본 시뮬레이션', 'HW_MODE=sim'], ['정직한 표기', '시뮬레이션 검증 / 미검증']],
            notes: '<p>각 원칙을 확인할 화면을 함께 말합니다.</p>' },
          { layout: 'diagram', title: '명령 확인 대화상자', html: SHOT('line_cmd_confirm', '명령 확인'), notes: '<p>시연: 기동 → 확인 → "명령 접수 … (감사 로그 #)" 문장을 가리킵니다.</p>' },
          { layout: 'diagram', title: '비상정지 (시뮬레이터)', html: SHOT('ch03_estop_confirm', '비상정지 확인'), notes: '<p>실장비는 현장 버튼만 — 반드시 구분해서 말합니다.</p>' },
          { layout: 'bullets', title: '복구 순서', bullets: ['■ 비상정지 → 즉시 정지 · 인터락', '⟲ 비상정지 해제(당겨서 해제)', '이상(ERROR) 상태 유지 → 원인 확인', '리셋 → 준비 → 기동'],
            notes: '<p>"왜 해제만으로 다시 돌지 않게 만들었을까?" → 사람이 원인을 확인하도록.</p>' },
          { layout: 'bullets', title: '실습 3-3 ~ 3-5 (35분)', bullets: ['3-3 명령 확인 · 감사 로그 번호', '3-4 비상정지 → 해제 → 리셋 (대표 1명)', '3-5 AI 계획 초안 → 설비 그대로 → 작성 상태', 'AI 도우미에게 기동 부탁 → 안 움직임'],
            notes: '<p>공용 서버라면 3-4 는 교사 시연으로 대체합니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[3].q, options: QUIZ2[3].options, answer: QUIZ2[3].answer, explain: QUIZ2[3].explain, notes: '<p>정답 후 안전 계층 그림으로 다시 돌아가 확인.</p>' },
          { layout: 'summary', title: '정리', bullets: ['안전은 하드웨어, 결정은 PLC · 사람, AI 는 권고', '명령은 확인 + 감사 로그', '비상정지 복구: 해제 → 원인 확인 → 리셋 → 기동', '시뮬레이션 검증과 실장비 미검증을 정직하게 구분'],
            notes: '<p>다음 차시부터 Part 2 — 설치와 화면 둘러보기.</p>' },
        ],
      },
    ],
  });
})();
