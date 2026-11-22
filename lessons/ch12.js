/* 12 AI 예지보전 ② 가상 고장과 AI 진단 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_LOOP = `<svg viewBox="0 0 720 300" role="img" aria-label="가상 고장부터 해소 확인까지 예지보전 한 바퀴">
  ${ARROW('c12a1')}
  <rect x="10" y="20" width="130" height="64" rx="12" class="p2"/><text x="75" y="47" text-anchor="middle" class="tx-w">① 가상 고장</text><text x="75" y="67" text-anchor="middle" class="tx-w">블라인드 예약</text>
  <rect x="180" y="20" width="130" height="64" rx="12" class="p1s"/><text x="245" y="47" text-anchor="middle" class="tx-b">② 징후</text><text x="245" y="67" text-anchor="middle" class="tx-m">특징 변화</text>
  <rect x="350" y="20" width="130" height="64" rx="12" class="p1s"/><text x="415" y="47" text-anchor="middle" class="tx-b">③ 이상 점수</text><text x="415" y="67" text-anchor="middle" class="tx-m">1.0 넘음</text>
  <rect x="520" y="20" width="190" height="64" rx="12" class="p3s"/><text x="615" y="47" text-anchor="middle" class="tx-b">④ 알람 + 정비 오더</text><text x="615" y="67" text-anchor="middle" class="tx-m">주의 → 위험</text>
  <rect x="520" y="150" width="190" height="64" rx="12" class="p4s"/><text x="615" y="177" text-anchor="middle" class="tx-b">⑤ AI 진단 · 권고</text><text x="615" y="197" text-anchor="middle" class="tx-m">AI 로 분석하기 · AI 권고</text>
  <rect x="300" y="150" width="180" height="64" rx="12" class="p5s"/><text x="390" y="177" text-anchor="middle" class="tx-b">⑥ 사람이 판단 · 정비</text><text x="390" y="197" text-anchor="middle" class="tx-m">LOTO 후 점검 → 종료</text>
  <rect x="80" y="150" width="180" height="64" rx="12" class="p1s"/><text x="170" y="177" text-anchor="middle" class="tx-b">⑦ 해소 확인</text><text x="170" y="197" text-anchor="middle" class="tx-m">점수 1.0 아래 · 유형 공개</text>
  <line x1="141" y1="52" x2="176" y2="52" class="ln" stroke-width="2" marker-end="url(#c12a1)"/>
  <line x1="311" y1="52" x2="346" y2="52" class="ln" stroke-width="2" marker-end="url(#c12a1)"/>
  <line x1="481" y1="52" x2="516" y2="52" class="ln" stroke-width="2" marker-end="url(#c12a1)"/>
  <line x1="615" y1="85" x2="615" y2="146" class="ln" stroke-width="2" marker-end="url(#c12a1)"/>
  <line x1="519" y1="182" x2="484" y2="182" class="ln" stroke-width="2" marker-end="url(#c12a1)"/>
  <line x1="299" y1="182" x2="264" y2="182" class="ln" stroke-width="2" marker-end="url(#c12a1)"/>
  <text x="360" y="250" text-anchor="middle" class="tx">고장 내용은 숨겨져 있습니다 — 학습자는 <tspan class="tx-b">데이터와 AI 만으로</tspan> 무슨 고장인지 찾아냅니다</text>
  <text x="360" y="274" text-anchor="middle" class="tx-m">피지컬 AI 의 인식(센서) → 판단(AI) → 행동(정비) 루프를 한 바퀴 도는 실습</text>
</svg>`;

  const FIG_FAULTS = `<svg viewBox="0 0 720 260" role="img" aria-label="대상별 고장 유형과 먼저 변하는 특징">
  <rect x="10" y="10" width="345" height="240" rx="12" class="p1s"/>
  <text x="182" y="36" text-anchor="middle" class="tx-b">공급 컨베이어 (CONV)</text>
  <text x="26" y="70" class="tx-b">불균형</text><text x="110" y="70" class="tx-m">진동 RMS ↑ · 저주파 대역 ↑ · 전류 조금 ↑</text>
  <text x="26" y="110" class="tx-b">베어링 결함</text><text x="110" y="110" class="tx-m">첨도(충격) ↑ · 고주파 대역 ↑</text>
  <text x="110" y="128" class="tx-m">모터 온도 · 열화상 핫스팟 ↑</text>
  <text x="26" y="168" class="tx-b">벨트 이상</text><text x="110" y="168" class="tx-m">벨트 사행 · 마모(카메라 B) ↑</text>
  <text x="110" y="186" class="tx-m">전류 맥동 ↑ (진동은 조금만)</text>
  <text x="182" y="230" text-anchor="middle" class="tx-m">🎲 대상 '컨베이어' → 셋 중 하나</text>
  <rect x="365" y="10" width="345" height="240" rx="12" class="p3s"/>
  <text x="537" y="36" text-anchor="middle" class="tx-b">델타 로봇 (DELTA)</text>
  <text x="381" y="80" class="tx-b">진공 누설</text><text x="470" y="80" class="tx-m">흡착 진공도 약해짐 · 에어압 ↓</text>
  <text x="470" y="98" class="tx-m">픽 실패율 ↑</text>
  <text x="381" y="150" class="tx-b">흡착 패드 오염</text><text x="490" y="150" class="tx-m">패드 오염도(카메라 B) ↑</text>
  <text x="490" y="168" class="tx-m">진공 형성 느려짐 · 픽 실패 ↑</text>
  <text x="537" y="230" text-anchor="middle" class="tx-m">🎲 대상 '델타 로봇' → 둘 중 하나</text>
</svg>`;

  const FIG_DIAG = `<svg viewBox="0 0 720 280" role="img" aria-label="AI 로 분석하기: 같은 입력으로 규칙 기반 또는 Claude 가 구조화된 진단을 만든다">
  ${ARROW('c12a2')}
  <rect x="10" y="20" width="200" height="200" rx="12" class="card-bg"/>
  <text x="110" y="46" text-anchor="middle" class="tx-b">입력(설비별 요약)</text>
  <text x="24" y="76" class="tx-m">• 특징: 기준 구간 → 최근 변화(z)</text>
  <text x="24" y="100" class="tx-m">• 이상 점수: 최근 · 최대 · 추세</text>
  <text x="24" y="124" class="tx-m">• 1.0 이상 횟수 · 단계</text>
  <text x="24" y="148" class="tx-m">• 알람 · 정비 이력</text>
  <text x="24" y="182" class="tx-b">✗ 고장 정답 라벨은</text>
  <text x="24" y="202" class="tx-b">   넣지 않음</text>
  <rect x="260" y="30" width="190" height="70" rx="12" class="p1s"/><text x="355" y="60" text-anchor="middle" class="tx-b">규칙 기반</text><text x="355" y="80" text-anchor="middle" class="tx-m">키 없음 · 외부 호출 없음</text>
  <rect x="260" y="140" width="190" height="70" rx="12" class="p2"/><text x="355" y="170" text-anchor="middle" class="tx-w">Claude</text><text x="355" y="190" text-anchor="middle" class="tx-w">API 키 등록 시</text>
  <line x1="211" y1="100" x2="256" y2="70" class="ln" stroke-width="2" marker-end="url(#c12a2)"/>
  <line x1="211" y1="140" x2="256" y2="172" class="ln" stroke-width="2" marker-end="url(#c12a2)"/>
  <rect x="500" y="20" width="210" height="200" rx="12" class="p3s"/>
  <text x="605" y="46" text-anchor="middle" class="tx-b">같은 형식의 결과</text>
  <text x="514" y="76" class="tx-m">• 전체 요약 · 전체 단계</text>
  <text x="514" y="100" class="tx-m">• 설비별: 문제 · 근거</text>
  <text x="514" y="124" class="tx-m">   가능한 원인 · 권고 조치</text>
  <text x="514" y="148" class="tx-m">• 이상 근거 없는 설비</text>
  <text x="514" y="172" class="tx-m">• 데이터 메모 · 다음 단계</text>
  <text x="514" y="200" class="tx-m">(정상 · 관찰 · 주의 · 위험)</text>
  <line x1="451" y1="65" x2="496" y2="100" class="ln" stroke-width="2" marker-end="url(#c12a2)"/>
  <line x1="451" y1="175" x2="496" y2="140" class="ln" stroke-width="2" marker-end="url(#c12a2)"/>
  <text x="360" y="256" text-anchor="middle" class="tx-m">AI 는 진단 · 권고만 합니다 — 정지 · 감속은 PLC 와 사람이, 정비는 에너지 차단(LOTO) 후</text>
</svg>`;

  // ---------------------------------------------------------------- 실습 블록
  const LAB_BOOK = `<div class="lab" data-lab="ch12-1-a">
  <div class="lab-head"><span class="lab-badge">실습 12-1</span><b>블라인드 무작위 고장 예약하기</b><span class="lab-meta">⏱ 8분 · 화면: 가상 고장</span></div>
  <p class="lab-goal">설비와 대상만 골라 내용을 모르는 고장을 예약하고, 무엇이 숨겨지는지 확인합니다.</p>
  <p class="lab-pre">모둠별로 맡은 설비(교사가 배정) · 그 설비가 운전 중(공장 라인 RUNNING 또는 생산 중)</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">가상 고장</span> 을 엽니다. 맨 위 <b>무작위 고장 만들기</b> 상자를 찾습니다.</div>
      ${SHOT('ch12_sim_top', '가상 고장 화면')}
      <div class="lab-check">설비 · 대상 · 발생 시각(지금부터 초) · 블라인드(내용 숨김) · <span class="ui">🎲 무작위 고장 예약</span> 이 한 줄에 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>설비</b>에서 맡은 설비(예: <span class="ui">설비 #1</span>), <b>대상</b>에서 <span class="ui">컨베이어</span> 또는 <span class="ui">델타 로봇</span> 을 고릅니다. 발생 시각은 기본값 10 ~ 180초, <b>블라인드</b>는 체크한 그대로 둡니다.</div>
      ${SHOT('ch12_sim_form', '설비 · 대상 선택')}
      <div class="lab-check">설비 · 대상을 '무작위' 로 두면 그것까지 숨겨집니다. 처음에는 설비 · 대상을 정하고 시작합니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">🎲 무작위 고장 예약</span> 을 누르고, 지금 시각을 활동지에 적습니다.</div>
      ${SHOT('ch12_sim_booked', '예약 결과')}
      <div class="lab-check">"설비 #1에 10~180초 안에 무작위 고장이 발생합니다. 내용은 … 숨겨집니다." 문장과 <b>예약 대기 1건</b> 이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">3분쯤 뒤 아래 <b>고장 · 열화 이력 (라벨의 출처)</b> 표를 봅니다.</div>
      ${SHOT('ch12_sim_history', '고장 · 열화 이력')}
      <div class="lab-check">맡은 설비 줄에 출처 <b>무작위</b>, 유형 <b>🔒 비공개</b>, 강도 <b>?</b>, 종료 <b>진행 중</b> 이 생겼습니다. 설비 카드에는 "진행 중 n건 (비공개 1)" 이 표시됩니다.</div>
      <div class="lab-tip"><span class="ui">공개</span> 는 아직 누르지 않습니다. 오늘의 목표는 공개 버튼 없이 데이터와 AI 로 고장을 찾아내는 것입니다.</div></li>
  </ol>
  <div class="lab-result">무작위 고장은 <b>유형 · 강도(0.45~0.95) · 진행 속도(즉시 또는 30초~10분에 걸쳐 서서히) · 발생 시각</b>을 서버가 예측할 수 없는 난수로 정합니다. 현실의 고장처럼 "언제 · 무엇이" 를 모르는 상태에서 진단을 연습합니다.</div>
</div>`;

  const LAB_OBSERVE = `<div class="lab" data-lab="ch12-1-b">
  <div class="lab-head"><span class="lab-badge">실습 12-2</span><b>이상 징후 관찰 일지</b><span class="lab-meta">⏱ 20분 · 화면: 예지보전 · MES</span></div>
  <p class="lab-goal">2~3분 간격으로 같은 화면을 보며 점수 · 단계 · 근거 특징이 어떻게 변하는지 기록하고, 고장 유형을 추리합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">활동지에 표를 만듭니다: <b>시각 / 이상 점수(최근) / 단계 / 알람 · 근거 특징 / 내 추리</b>.</div>
      <div class="lab-check">5줄 이상 적을 수 있는 빈 표가 준비됐습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">예지보전</span> → <span class="ui">📊 보전 현황</span>, <b>기간</b> <span class="ui">최근 1일</span> · <b>설비</b> 맡은 설비로 고르고, 표에서 대상(공급 컨베이어 #n 또는 델타 로봇 #n) 이름을 누릅니다.</div>
      ${SHOT('ch11_overview_eq', '설비 하나의 이상 점수 추이')}
      <div class="lab-check">그래프에 맡은 장비 한 줄만 보입니다. 가장 오른쪽 점이 최근 점수입니다(화면은 15초마다 새로 고쳐짐).</div></li>
    <li class="lab-step"><div class="lab-do">첫 줄을 적습니다. 점수가 아직 낮으면 '정상' 으로 적고 2~3분 뒤 다시 봅니다.</div>
      <div class="lab-check">점수가 서서히 오르면 <b>진행형(서서히 나빠짐)</b>, 갑자기 뛰면 <b>즉시 발생</b> 고장입니다.</div></li>
    <li class="lab-step"><div class="lab-do">점수가 1.0 을 넘으면 <span class="ui">MES</span> → <span class="ui">🔧 정비 · 예지보전</span> 의 <b>예지보전 알람</b> 표에서 맡은 설비의 알람을 찾아 <b>근거 특징</b>을 적습니다.</div>
      ${SHOT('ch11_mes_alerts', '예지보전 알람 표')}
      <div class="lab-check">근거 특징 3개(z 값 큰 순서)를 적었습니다. 알람 내용에 "(○○ 의심)" 이 있으면 함께 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 <b>고장 유형별 특징</b> 그림과 근거 특징을 비교해 고장 유형을 추리합니다.</div>
      <div class="lab-check">예: 근거가 '첨도 · 고주파 대역' → 베어링 결함, '진공 · 픽 실패율' → 진공 누설, '패드 오염도' → 흡착 패드 오염.</div></li>
    <li class="lab-step"><div class="lab-do">5분 이상 지켜보며 단계가 <b>주의 → 위험</b> 으로 바뀌는 시각을 기록합니다.</div>
      <div class="lab-check">1.0 이상이 12윈도우(1분) 연속되면 위험이 됩니다. 단계가 바뀐 시각과 점수를 적었습니다.</div></li>
  </ol>
  <div class="lab-result">관찰 일지는 <b>근거를 시간 순서로 남기는 기록</b>입니다. AI 의 추정("○○ 의심")과 내 추리가 같은지, 다르면 어떤 근거 때문인지 다음 교시에 AI 진단과 비교합니다.</div>
  <div class="lab-q">점수가 1.0 근처에서 오르내리기만 하고 알람이 생기지 않는다면 어떻게 판단해야 할까요?</div>
</div>`;

  const LAB_SWITCH = `<div class="lab" data-lab="ch12-1-c">
  <div class="lab-head"><span class="lab-badge">실습 12-3</span><b>가상 하드웨어 스위치 실험</b><span class="lab-meta">⏱ 10분 · 화면: 가상 고장 · 공장 라인</span></div>
  <p class="lab-goal">에어 공급 차단 · 안전 도어 열림 같은 <b>현장 이상 신호</b>가 PLC 를 어떻게 멈추는지 보고, 원래대로 복구합니다. (AI 가 아니라 PLC 인터락이 반응하는 부분입니다)</p>
  <p class="lab-pre">맡은 설비가 운전 중. <b>실습이 끝나면 스위치를 반드시 원래대로</b> 돌립니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">가상 고장</span> 화면의 맡은 설비 카드에서 <b>가상 하드웨어 스위치</b> 네 개를 찾습니다.</div>
      ${SHOT('ch12_sim_switches', '가상 하드웨어 스위치')}
      <div class="lab-check"><span class="ui">✔ 비상정지 버튼: 정상</span> · <span class="ui">✔ 안전 도어: 닫힘</span> · <span class="ui">✔ 에어 공급: 정상</span> · <span class="ui">✔ UR 보호정지: 없음</span> 이 모두 ✔ 입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">✔ 에어 공급: 정상</span> 을 누릅니다.</div>
      <div class="lab-check">버튼이 <span class="ui">✖ 에어 공급: 차단</span> 으로 바뀝니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 에서 맡은 설비의 라인 상태와 에러를 봅니다.</div>
      ${SHOT('line_page', '공장 라인 화면')}
      <div class="lab-check">라인 상태가 <b>ERROR</b>, 에러 코드 3(에어 압력 이상)이 됩니다. 에어압이 떨어지면 델타의 진공 흡착도 할 수 없습니다.</div></li>
    <li class="lab-step"><div class="lab-do">가상 고장 화면으로 돌아가 <span class="ui">✖ 에어 공급: 차단</span> 을 다시 눌러 <b>정상</b>으로 돌립니다.</div>
      <div class="lab-check">버튼이 ✔ 로 돌아왔습니다. 하지만 라인은 아직 ERROR 입니다 — 원인이 사라져도 <b>사람이 리셋해야</b> 다시 움직입니다.</div></li>
    <li class="lab-step"><div class="lab-do">공장 라인에서 명령 <span class="ui">리셋</span> → 확인, 이어서 <span class="ui">기동</span> → 확인(생산 중이던 설비라면 교사 지시에 따름).</div>
      <div class="lab-check">ERROR → READY → RUNNING 으로 돌아왔습니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 방법으로 <span class="ui">✔ 안전 도어: 닫힘</span> 을 열었다 닫고 리셋해 봅니다(에러 코드 2). 마지막에 네 스위치가 모두 ✔ 인지 확인합니다.</div>
      <div class="lab-check">네 스위치 모두 ✔, 라인은 READY 또는 RUNNING 입니다.</div></li>
  </ol>
  <div class="lab-result">비상정지 · 도어 · 에어 · UR 보호정지는 <b>PLC 인터락</b>이 즉시 라인을 멈추는 신호입니다. AI 의 알람과 달리 기다리지 않고, 원인이 사라져도 <b>사람의 리셋</b>이 있어야 재가동합니다. 피지컬 AI 에서 안전은 AI 가 아니라 하드웨어 · PLC 의 몫입니다.</div>
</div>`;

  const LAB_ANALYZE = `<div class="lab" data-lab="ch12-2-a">
  <div class="lab-head"><span class="lab-badge">실습 12-4</span><b>✦ AI 로 분석하기</b><span class="lab-meta">⏱ 12분 · 화면: 예지보전 → AI 로 분석하기</span></div>
  <p class="lab-goal">예지보전 DB 를 AI 에게 요약 · 진단시키고, 결과의 근거를 내 관찰 일지와 비교한 뒤 메모로 남깁니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">예지보전</span> → <span class="ui">✦ AI 로 분석하기</span> 를 엽니다. <b>대상</b>을 맡은 설비(예: <span class="ui">설비 #1 전체</span> 또는 <span class="ui">델타 로봇 #1</span>), <b>기간</b>을 <span class="ui">최근 1시간</span> 으로 고릅니다.</div>
      ${SHOT('ch12_ai_scope', '대상 · 기간 선택')}
      <div class="lab-check">대상 목록에 '전체 설비 · 설비 #n 전체 · 장비 하나' 가 있고, 기간은 1시간 ~ 7일입니다.</div>
      <div class="lab-tip">버튼 옆 표시가 '규칙 기반' 이면 API 키 없이, 'Claude' 면 키가 등록된 상태입니다(14차시).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">✦ 분석하기</span> 를 누릅니다.</div>
      ${SHOT('pdm_ai_result', 'AI 로 분석하기 결과')}
      <div class="lab-check">오른쪽에 <b>분석 #번호</b> 카드가 생기고 전체 단계(정상 · 관찰 · 주의 · 위험)와 요약 문장이 나옵니다. 왼쪽 <b>분석 기록</b>에도 한 줄 추가됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">맡은 설비의 진단 상자에서 <b>근거 · 가능한 원인 · 권고 조치</b> 세 칸을 읽습니다.</div>
      <div class="lab-check">근거에는 숫자(점수 · 1.0 이상 횟수 · 특징의 기준 → 최근 변화)가 있습니다. 권고 조치 첫 줄은 "에너지 차단(LOTO) 후 점검" 입니다.</div></li>
    <li class="lab-step"><div class="lab-do">결과 아래 <b>데이터 메모</b>와 <b>다음 단계</b>를 읽습니다.</div>
      <div class="lab-check">데이터가 적거나 근거가 약하면 그 사실이 데이터 메모에 적혀 있습니다 — AI 가 "모르는 것" 을 밝히는 부분입니다.</div></li>
    <li class="lab-step"><div class="lab-do">관찰 일지(실습 12-2)의 내 추리와 AI 의 '가능한 원인' 을 비교해 같은지 다른지 적습니다.</div>
      <div class="lab-check">같으면 근거 하나를, 다르면 어떤 근거 때문에 달라졌는지 한 줄로 적었습니다.</div></li>
    <li class="lab-step"><div class="lab-do">결과 카드 아래 <b>기록(메모)</b> 칸에 점검 계획을 적고 <span class="ui">기록 저장</span> 을 누릅니다.</div>
      ${SHOT('ch12_ai_note', '기록(메모) 칸')}
      <div class="lab-check">왼쪽 분석 기록 줄 끝에 📝 표시가 생깁니다. 다음 사람이 이 분석을 열면 메모가 함께 보입니다.</div></li>
  </ol>
  <div class="lab-result">AI 로 분석하기는 <b>고장 정답 없이</b> 데이터만 보고 설비별 문제 · 근거 · 원인 · 조치를 정리합니다. 키가 없으면 규칙 기반, 있으면 Claude 가 같은 형식으로 답합니다. 결과는 기록으로 남아 정비 이력이 됩니다.</div>
</div>`;

  const LAB_FIX = `<div class="lab" data-lab="ch12-2-b">
  <div class="lab-head"><span class="lab-badge">실습 12-5</span><b>AI 권고 → 정비 오더 → 해소 확인</b><span class="lab-meta">⏱ 15분 · 화면: MES → 정비 · 예지보전 · 가상 고장 · 예지보전</span></div>
  <p class="lab-goal">AI 정비 권고를 받아 정비 오더를 처리(종료)하고, 고장이 해소되어 점수가 1.0 아래로 돌아오는지 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> → <span class="ui">🔧 정비 · 예지보전</span> 에서 맡은 설비 알람 줄의 <span class="ui">AI 권고</span> 를 누릅니다. (설비 #1 이면 <b>AI 정비 권고</b> 상자의 <span class="ui">컨베이어 상태로 권고 받기</span> · <span class="ui">델타 로봇 상태로 권고 받기</span> 도 쓸 수 있습니다)</div>
      ${SHOT('ch12_mes_advice', 'AI 정비 권고')}
      <div class="lab-check"><b>AI 정비 권고</b> 상자에 긴급도 · 요약 · <b>가능한 원인 · 권장 조치 · 재가동 전 확인</b> 세 칸이 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">권장 조치와 재가동 전 확인 항목을 활동지에 옮겨 적고, 안전과 관련된 항목에 밑줄을 긋습니다.</div>
      <div class="lab-check">에너지 차단(LOTO), 안전 회로를 우회하지 않기 같은 항목이 들어 있습니다. AI 는 <b>권고</b>만 합니다.</div></li>
    <li class="lab-step"><div class="lab-do">아래 <b>정비 오더</b> 표에서 그 설비의 정비 오더(출처 '예지보전')를 찾습니다. 없으면 위 입력줄에서 <b>설비</b>와 <b>내용</b>을 적고 <span class="ui">정비 오더 등록</span> 을 누릅니다.</div>
      ${SHOT('ch12_mes_mo_form', '정비 오더 등록')}
      <div class="lab-check">정비 오더 번호(MO-…)를 적었습니다. 상태는 <b>접수</b>입니다.</div></li>
    <li class="lab-step"><div class="lab-do">"점검 · 정비를 마쳤다" 고 가정하고, 그 정비 오더의 <span class="ui">종료</span> 를 누릅니다.</div>
      <div class="lab-check">상태가 <b>종료</b>가 되고 종료 시각이 표시됩니다. 시뮬레이터는 정비 오더가 종료되면 그 장비의 진행 중인 고장 · 열화를 끝냅니다(= 정비 수행).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">가상 고장</span> 의 <b>고장 · 열화 이력</b>에서 내 고장 줄을 봅니다.</div>
      <div class="lab-check">종료 시각이 생겼고, 🔒 비공개였던 <b>유형 · 강도</b>가 공개됐습니다. 내 추리(실습 12-2)와 AI 의 추정이 맞았는지 채점합니다.</div>
      <div class="lab-tip">정비 오더를 다른 장비로 잘못 등록했다면 고장이 끝나지 않습니다. 이력의 설비 이름과 정비 오더의 설비가 같은지 확인하세요.</div></li>
    <li class="lab-step"><div class="lab-do">3~5분 뒤 <span class="ui">📊 보전 현황</span> 추이 그래프에서 점수가 1.0 아래로 내려왔는지, MES 알람 단계가 정상으로 돌아왔는지 확인합니다.</div>
      <div class="lab-check">1.0 아래가 3윈도우 연속이면 단계가 정상으로 돌아옵니다. 고장 직후 90초는 회복 구간이라 학습에서 빠집니다.</div></li>
    <li class="lab-step"><div class="lab-do">(정비 없이 끝내야 할 때) 교사 지시가 있으면 이력의 <span class="ui">공개</span>(확인 창 → 확인) 또는 <span class="ui">종료</span> 로 고장을 직접 끝냅니다.</div>
      <div class="lab-check">공개와 종료는 감사 기록에 남습니다. 정답을 먼저 보지 않도록 실습 끝에만 씁니다.</div></li>
  </ol>
  <div class="lab-result">AI 의 권고 → 사람의 정비 → 정비 오더 종료 → 고장 해소 → 점수 정상 복귀까지 <b>예지보전 한 바퀴</b>를 돌았습니다. 마지막 확인(점수가 돌아왔나)까지 해야 정비가 끝난 것입니다.</div>
</div>`;

  const LAB_ASK = `<div class="lab" data-lab="ch12-2-c">
  <div class="lab-head"><span class="lab-badge">실습 12-6</span><b>AI 에게 묻고 진단 보고서 쓰기</b><span class="lab-meta">⏱ 8분 · 화면: MES AI 도우미 · 예지보전</span></div>
  <p class="lab-goal">MES AI 도우미에게 말로 묻고, 분석 결과와 합쳐 짧은 진단 보고서를 씁니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MES 화면 오른쪽 아래 <span class="ui">✦ AI 도우미</span> 를 열고 예시 버튼 <span class="prompt">알람과 정비 오더 정리해줘</span> 를 보냅니다.</div>
      ${SHOT('mes_ai_answer', 'MES AI 도우미 답변')}
      <div class="lab-check">설비 알람 · 정비 오더 · 예지보전 알람 건수가 정리돼 나옵니다(키가 없으면 규칙 기반 요약).</div></li>
    <li class="lab-step"><div class="lab-do">아래 문장 중 두 개를 골라 직접 보내 봅니다.
      <span class="prompt">설비 #1 예지보전 알람을 근거 특징과 함께 정리해줘</span>
      <span class="prompt">열린 정비 오더 중 가장 오래된 것은?</span>
      <span class="prompt">지금 설비별 진행 상황과 예지보전 단계는?</span>
      <span class="prompt">델타 로봇 알람이 생겼을 때 현장에서 먼저 확인할 것은?</span></div>
      <div class="lab-check">답의 숫자(건수 · 번호)를 정비 · 예지보전 화면과 비교해 같은지 확인했습니다.</div>
      <div class="lab-tip">AI 도우미는 조회 · 설명만 합니다. "정비 오더를 종료해 줘" 처럼 요청해도 직접 처리하지 않고 어느 버튼을 누르면 되는지 안내합니다.</div></li>
    <li class="lab-step"><div class="lab-do">진단 보고서를 5줄로 씁니다: <b>① 설비 · 발견 시각 ② 근거(점수 · 특징) ③ 추정 원인(AI · 나) ④ 조치(정비 오더 번호) ⑤ 확인 결과(점수 복귀 · 공개된 유형)</b>.</div>
      <div class="lab-check">다섯 줄이 모두 화면에서 확인한 숫자로 채워졌습니다.</div></li>
    <li class="lab-step"><div class="lab-do">보고서 요약을 실습 12-4 의 분석 결과 <b>기록(메모)</b> 에 붙여 넣고 <span class="ui">기록 저장</span> 합니다.</div>
      <div class="lab-check">분석 기록에 📝 가 있고, 메모에 정비 오더 번호와 확인 결과가 있습니다.</div></li>
  </ol>
  <div class="lab-result">AI 의 답은 <b>화면의 숫자로 검증</b>하고, 사람의 판단과 함께 <b>기록</b>으로 남깁니다. 이 기록이 쌓이면 다음 고장 때 더 빨리 진단할 수 있습니다.</div>
</div>`;

  const QUIZ1 = [
    { q: '🎲 무작위 고장 예약에서 학습자가 정하는 것은?',
      options: ['고장 유형과 강도', '설비와 대상(컨베이어/델타), 발생 시각 범위, 블라인드 여부', '진행 속도와 정답 공개 시각', '아무것도 정하지 않는다'], answer: 1,
      explain: '유형 · 강도 · 진행 속도 · 정확한 발생 시각은 서버가 예측할 수 없는 난수로 정합니다.' },
    { q: '블라인드 고장의 유형이 공개되는 때는?',
      options: ['예약하자마자', '정비 오더를 종료해 고장이 해소되거나, 공개 버튼을 눌렀을 때', '알람이 주의가 되면', '하루가 지나면'], answer: 1,
      explain: '해소(정비 오더 종료 · 종료 버튼) 또는 공개(감사 기록) 전까지 유형 · 강도는 🔒 비공개입니다.' },
    { q: '근거 특징이 "첨도 · 고주파 대역 에너지" 라면 가장 의심되는 고장은?',
      options: ['진공 누설', '베어링 결함', '흡착 패드 오염', '벨트 이상'], answer: 1,
      explain: '베어링 결함은 주기적인 충격을 만들어 첨도와 고주파 대역이 먼저 커집니다.' },
    { q: '가상 스위치로 에어 공급을 차단했다가 다시 정상으로 돌렸을 때 라인은?',
      options: ['자동으로 다시 RUNNING 이 된다', 'ERROR 로 남고, 사람이 리셋해야 READY 가 된다', 'AI 가 판단해 재가동한다', '설비가 삭제된다'], answer: 1,
      explain: 'PLC 인터락은 원인이 사라져도 사람의 리셋을 기다립니다. 안전은 PLC · 하드웨어가 책임집니다.' },
  ];
  const QUIZ2 = [
    { q: '✦ AI 로 분석하기의 입력에 <b>넣지 않는</b> 것은?',
      options: ['특징의 기준 대비 최근 변화', '이상 점수 통계', '알람 · 정비 이력', '고장 정답 라벨'], answer: 3,
      explain: '정답 라벨을 넣으면 AI 가 답을 "보고" 맞히게 됩니다. 데이터만으로 진단하도록 라벨은 빼고 줍니다.' },
    { q: 'API 키가 없을 때 AI 로 분석하기 · AI 권고는?',
      options: ['동작하지 않는다', '규칙 기반으로 같은 형식의 결과를 낸다', '인터넷 검색으로 답한다', '임의의 답을 만든다'], answer: 1,
      explain: '키가 없으면 외부 호출 없이 규칙 기반으로, 키가 있으면 Claude 로 같은 형식의 결과를 만듭니다.' },
    { q: '시뮬레이터에서 진행 중인 고장이 해소되는 정상적인 방법은?',
      options: ['MES 에서 그 설비의 정비 오더를 종료한다', 'AI 도우미에게 고쳐 달라고 한다', '대시보드를 새로 고친다', '알람의 확인을 누른다'], answer: 0,
      explain: '정비 오더 종료 = 정비 수행으로 보고 그 장비의 진행 중 고장 · 열화를 끝냅니다. 알람 확인은 "봤다" 는 표시일 뿐입니다.' },
    { q: '정비 오더를 종료한 뒤 꼭 해야 할 확인은?',
      options: ['아무것도 하지 않아도 된다', '이상 점수가 1.0 아래로 돌아오고 단계가 정상이 되는지 본다', '설비 대수를 줄인다', '모델을 삭제한다'], answer: 1,
      explain: '정비의 마지막 단계는 효과 확인입니다. 점수가 돌아오지 않으면 원인을 잘못 짚었을 수 있습니다.' },
  ];

  PY_COURSE.addChapter({
    id: 'ch12', no: '12', title: 'AI 예지보전 ② 가상 고장과 AI 진단', subtitle: 'Fault Simulation & AI Diagnosis',
    summary: '가상 고장을 블라인드로 일으키고, 이상 징후 관찰 → AI 로 분석하기 → AI 정비 권고 → 정비 오더 → 해소 확인까지 예지보전 한 바퀴를 직접 돌아봅니다.',
    goals: ['가상 고장 화면에서 블라인드 무작위 고장을 예약하고 가상 스위치를 다룰 수 있다',
      '관찰 기록과 근거 특징으로 고장 유형을 추리할 수 있다',
      'AI 로 분석하기 · AI 정비 권고를 받아 정비 오더를 처리하고 해소를 확인할 수 있다'],
    sections: [
      {
        id: 'ch12-1', title: '가상 고장 일으키고 관찰하기', minutes: 50,
        goals: ['무작위 고장에서 무엇이 정해지고 무엇이 숨겨지는지 설명한다', '시간 순 관찰 일지로 점수 · 단계 · 근거 특징 변화를 기록한다', '가상 스위치로 PLC 인터락과 복구 절차를 확인한다'],
        flow: [['도입 — 고장을 만드는 이유', 5], ['개념 — 고장 유형 · 블라인드', 8], ['실습 12-1 고장 예약', 7], ['실습 12-2 관찰 일지', 18], ['실습 12-3 가상 스위치', 8], ['정리 · 퀴즈', 4]],
        content: [
          { type: 'p', html: '실제 공장에서는 고장을 일부러 낼 수 없습니다. 그래서 AI 를 가르치고 시험할 <b>고장 데이터</b>가 늘 부족합니다. 이 플랫폼의 <b>가상 고장</b>은 시뮬레이터 속 설비에 고장을 일으켜, (1) AI 가 고장을 찾아내는지 시험하고 (2) 고장 이력을 <b>라벨</b>로 쌓아 고장 분류 모델을 만들 수 있게 해 줍니다. 디지털트윈이 AI 의 "연습 경기장" 이 되는 셈입니다.' },
          { type: 'figure', html: FIG_LOOP, caption: '이번 차시와 다음 교시에 돌아볼 예지보전 한 바퀴' },
          { type: 'h', text: '고장 유형 다섯 가지 — 무엇이 먼저 변할까' },
          { type: 'figure', html: FIG_FAULTS, caption: '대상(컨베이어 · 델타)을 고르면 그 대상의 유형 중 하나가 무작위로 정해집니다' },
          { type: 'table', head: ['무작위로 정해지는 것', '범위', '학습자에게'], rows: [
            ['유형', '대상의 유형 중 하나', '🔒 비공개(블라인드)'],
            ['강도', '0.45 ~ 0.95', '🔒 비공개'],
            ['진행', '즉시(약 1/3) 또는 30초 ~ 10분에 걸쳐 서서히', '🔒 비공개'],
            ['발생 시각', '정한 범위(기본 10 ~ 180초) 안 어딘가', '예약 대기 건수만 표시'],
          ], caption: '난수는 시드 없는 방식이라 같은 조건으로 예약해도 매번 다릅니다' },
          { type: 'callout', kind: 'info', title: '세 가지 고장 출처', html: '<ul><li><b>무작위</b>(🎲 무작위 고장 예약) — 학습자 실습용, 블라인드 가능</li><li><b>수동</b>(수동 고장 주입 · 교수자 · 시연용) — 유형 · 강도 · 지속 시간을 정해 바로 주입. 시연이나 데이터 준비용</li><li><b>무작위 열화</b> — 시뮬레이터가 스스로 만드는 진행형 열화(유지보수 포인트). 정비 오더를 종료하면 해소</li></ul>세 가지 모두 <b>고장 · 열화 이력</b>(fault_injection_event)에 남아 AI 학습의 라벨이 됩니다.' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_BOOK },
          { type: 'figure', html: LAB_OBSERVE },
          { type: 'figure', html: LAB_SWITCH },
          { type: 'callout', kind: 'more', title: '📘 더 알아보기 — 수동 고장 주입(교수자 · 시연용)', html: `가상 고장 화면 맨 아래 <span class="ui">수동 고장 주입 (교수자 · 시연용)</span> 을 펼치면 설비 · 고장 유형 · 강도(0.1~1.0) · 지속(초, 0 = 계속)을 정해 <span class="ui">고장 주입</span> 할 수 있습니다. 수업 전에 알람이 있는 상태를 만들어 두거나, 특정 유형(예: 진공 누설)을 시연할 때 씁니다.<div style="margin-top:8px">${SHOT('ch12_sim_manual', '수동 고장 주입')}</div>` },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 설비를 모둠 수만큼(최대 4대) 켜고 <b>모두 운전</b>시켜 둡니다(생산계획 또는 공장 라인 기동). 멈춘 설비는 점수가 나오지 않아 고장을 찾을 수 없습니다. 모델이 없는 설비는 먼저 10분 이상 정상 운전시켜 자동 학습되게 합니다.</li><li><b>배정</b>: 모둠마다 설비 하나 · 대상 하나를 정해 고장이 섞이지 않게 합니다. 무작위 열화가 켜져 있으면 다른 열화가 함께 보일 수 있으니 미리 이력의 <span class="ui">종료</span> 로 정리합니다.</li><li><b>시간</b>: 진행형 고장은 알람까지 수 분이 걸립니다. 기다리는 동안 실습 12-3(가상 스위치)을 먼저 해도 됩니다.</li><li><b>안전 지도</b>: 실습 12-3 후 네 스위치를 모두 ✔ 로 돌렸는지 반드시 확인합니다(다른 모둠 실습에 영향).</li><li><b>확인 기준</b>: 관찰 일지 5줄 이상, 근거 특징 3개, 추리한 유형과 이유 한 줄.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: '가상 고장 일으키고 관찰하기', subtitle: '정답을 숨기고, 데이터로 찾는다', notes: '<p>💬 도입: "AI 가 고장을 찾는지 시험하려면 고장이 필요한데, 진짜 공장에서 일부러 고장을 낼 수 있을까?"</p>' },
          { layout: 'diagram', title: '예지보전 한 바퀴', html: FIG_LOOP, notes: '<p>오늘은 ①~④(고장 → 징후 → 점수 → 알람), 다음 교시는 ⑤~⑦(AI 진단 → 정비 → 해소 확인).</p>' },
          { layout: 'diagram', title: '고장 유형과 먼저 변하는 특징', html: FIG_FAULTS, notes: '<p>관찰 일지에서 근거 특징을 보고 이 그림으로 유형을 추리합니다. 벨트 이상은 진동이 조금만 변한다는 점이 함정.</p>' },
          { layout: 'table', title: '무엇이 숨겨지나', head: ['항목', '정하는 쪽'], rows: [['설비 · 대상', '학습자(무작위로도 가능)'], ['유형 · 강도 · 진행', '서버 난수(비공개)'], ['발생 시각', '범위 안 난수'], ['공개', '해소 또는 공개 버튼']],
            notes: '<p>"공개" 는 정답 보기입니다. 실습 끝까지 누르지 않도록 약속합니다.</p>' },
          { layout: 'diagram', title: '가상 고장 화면', html: SHOT('ch12_sim_booked', '가상 고장 예약'), notes: '<p>시연: 설비 #1 · 델타 로봇 · 블라인드 → 예약 → 예약 대기 1건 → 몇 분 뒤 이력에 🔒 비공개 줄.</p>' },
          { layout: 'bullets', title: '실습 12-1 · 12-2 · 12-3', bullets: ['12-1 맡은 설비 · 대상으로 블라인드 예약', '12-2 2~3분 간격 관찰 일지(점수 · 단계 · 근거)', '12-3 에어 차단 → ERROR → 복구 → 리셋', '끝나면 스위치 네 개 모두 ✔'],
            notes: '<p>12-2 는 기다리는 시간이 길어 12-3 을 사이에 넣어도 됩니다.</p>' },
          { layout: 'two', title: 'AI 알람 vs PLC 인터락', left: { title: 'AI 예지보전', bullets: ['평소와 다름을 점수로', '연속 3윈도우 뒤 알람', '권고 · 정비 오더'] }, right: { title: 'PLC 인터락', bullets: ['비상정지 · 도어 · 에어', '즉시 ERROR · 정지', '사람이 리셋해야 재가동'] },
            notes: '<p>피지컬 AI 의 안전 원칙: 위험한 순간의 정지는 AI 가 아니라 하드와이어 · PLC.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[2].q, options: QUIZ1[2].options, answer: QUIZ1[2].answer, explain: QUIZ1[2].explain, notes: '<p>그림(고장 유형별 특징)으로 돌아가 확인합니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[3].q, options: QUIZ1[3].options, answer: QUIZ1[3].answer, explain: QUIZ1[3].explain, notes: '<p>실습 12-3 결과와 연결합니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['가상 고장 = AI 의 연습 경기장 + 라벨 공장', '무작위 고장: 유형 · 강도 · 진행 · 시각 비공개', '관찰 일지: 시간 순 점수 · 단계 · 근거 특징', '인터락은 즉시 정지, 재가동은 사람의 리셋'],
            notes: '<p>다음 교시: AI 로 분석하기 → AI 권고 → 정비 오더 → 공개 · 채점.</p>' },
        ],
      },
      {
        id: 'ch12-2', title: 'AI 로 분석하기와 정비', minutes: 50,
        goals: ['✦ AI 로 분석하기로 설비별 진단(근거 · 원인 · 조치)을 받고 기록을 남긴다', 'AI 정비 권고를 바탕으로 정비 오더를 처리하고 해소를 확인한다', 'AI 의 진단과 사람의 판단을 비교하고 보고서로 정리한다'],
        flow: [['도입 — 관찰 일지 공유', 5], ['개념 — AI 진단 구조 · 규칙 vs Claude', 8], ['실습 12-4 AI 로 분석하기', 12], ['실습 12-5 권고 → 정비 → 해소', 15], ['실습 12-6 보고서', 6], ['정리 · 퀴즈', 4]],
        content: [
          { type: 'h', text: 'AI 진단은 어떻게 만들어질까' },
          { type: 'figure', html: FIG_DIAG, caption: '같은 입력 · 같은 출력 형식 — 키가 없으면 규칙 기반, 있으면 Claude' },
          { type: 'p', html: '<span class="ui">✦ AI 로 분석하기</span> 는 고른 대상 · 기간의 예지보전 DB 를 설비별로 요약합니다. 특징마다 "앞부분(기준) → 최근" 변화가 얼마나 큰지(z), 이상 점수의 최근 값 · 최대 · 추세, 1.0 이상 횟수, 알람 · 정비 이력을 묶어 AI 에게 줍니다. <b>고장 정답 라벨은 주지 않습니다</b> — 정답을 보고 맞히는 것은 진단이 아니기 때문입니다.' },
          { type: 'table', head: ['', '규칙 기반(키 없음)', 'Claude(키 등록)'], rows: [
            ['판단 방법', '점수 · 알람 · z 값 기준으로 단계 결정, 큰 특징 → 원인 표', '같은 수치를 읽고 원인 · 조치를 문장으로 추론'],
            ['장점', '빠르고 늘 같은 답, 외부 호출 없음', '여러 근거를 엮어 설명, 데이터 부족도 지적'],
            ['한계', '정해진 규칙 밖의 상황은 못 다룸', '틀릴 수 있음 → 근거 숫자로 검증 필요'],
            ['공통', '단계(정상 · 관찰 · 주의 · 위험), 근거 · 원인 · 조치, 데이터 메모 · 다음 단계', ''],
          ] },
          { type: 'callout', kind: 'info', title: 'AI 진단의 단계 — 규칙 기반 기준', html: '<ul><li><b>위험</b>: 열린 위험 알람이 있거나 최대 점수 2.0 이상</li><li><b>주의</b>: 열린 알람이 있거나 1.0 이상이 3회 이상</li><li><b>관찰</b>: 기준 대비 z 3 이상인 특징, 최근 점수 0.7 이상, 또는 점수가 오르는 추세</li><li><b>정상</b>: 위 근거가 없음</li></ul>Claude 도 근거가 약하면 관찰 이하로 두고 데이터 메모에 이유를 적도록 지시받습니다.' },
          { type: 'h', text: 'AI 정비 권고 — MES 에서' },
          { type: 'p', html: 'MES <span class="ui">🔧 정비 · 예지보전</span> 의 <span class="ui">AI 권고</span> 는 알람 하나(또는 설비 #1 의 컨베이어 · 델타 상태)를 골라 <b>가능한 원인 · 권장 조치 · 재가동 전 확인</b>을 만들어 줍니다. 권장 조치는 언제나 에너지 차단(LOTO) 뒤에 하도록, 안전 회로를 우회하지 않도록 쓰입니다.' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_ANALYZE },
          { type: 'figure', html: LAB_FIX },
          { type: 'figure', html: LAB_ASK },
          { type: 'callout', kind: 'warn', title: 'AI 의 진단을 그대로 믿지 마세요', html: 'AI 진단은 <b>근거 숫자와 함께 읽어야</b> 합니다. 근거가 "점수 0.8 · 추세 +0.03" 처럼 약하면 관찰 단계일 뿐이고, 원인 추정이 틀릴 수도 있습니다. 정비 뒤 점수가 돌아오지 않으면 원인을 다시 짚습니다. 그리고 설비를 세울지, 언제 정비할지는 <b>사람이 정합니다</b>.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 지난 교시의 블라인드 고장이 아직 진행 중이어야 합니다. 해소됐거나 시간이 오래 지났다면 수업 시작 15분 전에 같은 설비로 다시 예약해 둡니다.</li><li><b>Claude 시연</b>: 교사 PC 에만 API 키를 등록해(14차시) 같은 대상 · 기간으로 분석해 규칙 기반 결과와 나란히 비교하면 차이가 잘 드러납니다. 학생 PC 는 규칙 기반이어도 실습 목표는 같습니다.</li><li><b>자주 막히는 곳</b>: (1) 정비 오더를 다른 장비(예: 컨베이어 고장인데 델타)로 등록 → 고장이 끝나지 않음. (2) 설비 #2~4 는 상자의 \'권고 받기\' 버튼이 없음 → 알람 줄의 AI 권고 사용.</li><li><b>채점</b>: 정비 오더 종료로 공개된 유형과 관찰 일지 · AI 추정을 비교해 모둠별로 발표합니다. 틀렸다면 "어떤 근거를 놓쳤나" 를 묻습니다.</li><li><b>확인 기준</b>: 분석 기록 📝 메모, 정비 오더 번호 · 종료 시각, 점수 복귀 확인, 5줄 보고서.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: 'AI 로 분석하기와 정비', subtitle: 'AI 가 진단하고, 사람이 고치고, 데이터로 확인한다', notes: '<p>도입: 모둠별 관찰 일지에서 "추리한 유형" 을 한 줄씩 발표하게 하고 판서해 둡니다(나중에 채점).</p>' },
          { layout: 'diagram', title: 'AI 진단의 구조', html: FIG_DIAG, notes: '<p>정답 라벨을 주지 않는 이유: 시험지에 답을 적어 주고 채점하는 것과 같기 때문.</p>' },
          { layout: 'diagram', title: '분석 결과 읽기', html: SHOT('pdm_ai_result', 'AI 로 분석하기 결과'), notes: '<p>시연: 대상 · 기간 → ✦ 분석하기 → 단계 · 요약 → 설비 상자(근거 · 원인 · 조치) → 데이터 메모 → 메모 저장.</p>' },
          { layout: 'table', title: '규칙 기반 vs Claude', head: ['', '규칙', 'Claude'], rows: [['판단', '정해진 기준', '근거를 엮어 추론'], ['장점', '빠름 · 일정', '설명 · 부족한 데이터 지적'], ['한계', '규칙 밖 상황', '틀릴 수 있음']],
            notes: '<p>💬 "어느 쪽이 더 믿을 만할까?" → 둘 다 근거 숫자로 검증해야 한다.</p>' },
          { layout: 'diagram', title: 'MES AI 정비 권고', html: SHOT('ch12_mes_advice', 'AI 정비 권고'), notes: '<p>원인 · 조치 · 재가동 전 확인. LOTO 항목을 찾아보게 합니다.</p>' },
          { layout: 'bullets', title: '실습 12-4 · 12-5 · 12-6', bullets: ['12-4 ✦ 분석하기 → 근거 · 원인 · 조치 → 메모', '12-5 AI 권고 → 정비 오더 → 종료 → 공개된 유형 채점', '12-5 점수 1.0 아래 복귀까지 확인', '12-6 AI 도우미 질문 → 5줄 보고서'],
            notes: '<p>정비 오더 설비가 고장 장비와 같은지 꼭 확인시키세요.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[0].q, options: QUIZ2[0].options, answer: QUIZ2[0].answer, explain: QUIZ2[0].explain, notes: '<p>"정답 유출" 개념을 짚습니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[2].q, options: QUIZ2[2].options, answer: QUIZ2[2].answer, explain: QUIZ2[2].explain, notes: '<p>알람 확인(봤다) vs 정비 오더 종료(고쳤다) 구분.</p>' },
          { layout: 'summary', title: '정리', bullets: ['AI 로 분석하기: 라벨 없이 설비별 근거 · 원인 · 조치', '규칙 기반과 Claude 는 같은 형식, 둘 다 검증 필요', '정비 오더 종료 → 고장 해소 → 유형 공개', '마지막은 점수 복귀 확인과 기록'],
            notes: '<p>다음 차시: AI 생산계획 — 말로 계획 초안을 만들고 사람이 확정.</p>' },
        ],
      },
    ],
  });
})();
