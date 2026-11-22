/* 16 사례 실습 ② 설비 · 품질 · 운영 */
(function () {
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;

  const FIG_LOOP = `<svg viewBox="0 0 700 230" role="img" aria-label="설비 사례의 공통 흐름: 징후 발견, AI 진단, 사람 결정, 정비, 회복 확인">
  ${ARROW('c16a1')}
  <rect x="10" y="70" width="120" height="70" rx="12" class="p1s"/><text x="70" y="100" text-anchor="middle" class="tx-b">① 징후</text><text x="70" y="122" text-anchor="middle" class="tx-m">이상 점수 · 알람</text>
  <rect x="150" y="70" width="120" height="70" rx="12" class="p2s"/><text x="210" y="100" text-anchor="middle" class="tx-b">② 관찰</text><text x="210" y="122" text-anchor="middle" class="tx-m">센서 · 카메라</text>
  <rect x="290" y="70" width="120" height="70" rx="12" class="p3s"/><text x="350" y="100" text-anchor="middle" class="tx-b">③ AI 진단</text><text x="350" y="122" text-anchor="middle" class="tx-m">분석 · 권고</text>
  <rect x="430" y="70" width="120" height="70" rx="12" class="p4"/><text x="490" y="100" text-anchor="middle" class="tx-w">④ 사람 결정</text><text x="490" y="122" text-anchor="middle" class="tx-w">정비 오더</text>
  <rect x="570" y="70" width="120" height="70" rx="12" class="p5s"/><text x="630" y="100" text-anchor="middle" class="tx-b">⑤ 회복 확인</text><text x="630" y="122" text-anchor="middle" class="tx-m">점수 · 생산</text>
  <line x1="132" y1="105" x2="146" y2="105" class="ln" stroke-width="2" marker-end="url(#c16a1)"/>
  <line x1="272" y1="105" x2="286" y2="105" class="ln" stroke-width="2" marker-end="url(#c16a1)"/>
  <line x1="412" y1="105" x2="426" y2="105" class="ln" stroke-width="2" marker-end="url(#c16a1)"/>
  <line x1="552" y1="105" x2="566" y2="105" class="ln" stroke-width="2" marker-end="url(#c16a1)"/>
  <text x="350" y="40" text-anchor="middle" class="tx-b">AI 는 ①~③ 을 돕고, ④ 결정과 실제 정비는 사람이 합니다</text>
  <text x="350" y="185" text-anchor="middle" class="tx-m">정비 오더를 종료하면 그 설비의 진행 중인 고장(가상)이 해소되고, 이상 점수가 다시 내려갑니다</text>
</svg>`;

  const FIG_DELTA = `<svg viewBox="0 0 700 250" role="img" aria-label="진공 누설과 흡착 패드 오염의 증상 비교">
  <rect x="10" y="15" width="330" height="220" rx="14" class="p2s"/>
  <rect x="360" y="15" width="330" height="220" rx="14" class="p4s"/>
  <text x="175" y="45" text-anchor="middle" class="tx-b">진공 누설 (vacuum leak)</text>
  <text x="525" y="45" text-anchor="middle" class="tx-b">흡착 패드 오염 (pad contamination)</text>
  <text x="30" y="80" class="tx">• 진공압이 덜 깊어짐(−70 → 약 −40 kPa 쪽)</text>
  <text x="30" y="108" class="tx">• 공급 에어압이 조금 떨어짐</text>
  <text x="30" y="136" class="tx">• 픽 실패율 크게 증가</text>
  <text x="30" y="164" class="tx">• 카메라 B 패드 사진은 깨끗함</text>
  <text x="30" y="205" class="tx-m">→ 배관 · 피팅 · 이젝터 점검</text>
  <text x="380" y="80" class="tx">• 카메라 B 흡착 패드에 얼룩 · 점</text>
  <text x="380" y="108" class="tx">• '패드 오염(%)' 센서 값 상승</text>
  <text x="380" y="136" class="tx">• 진공이 느리게 · 들쭉날쭉 형성</text>
  <text x="380" y="164" class="tx">• 픽 실패율 증가(누설보다 완만)</text>
  <text x="380" y="205" class="tx-m">→ 패드 청소 · 교체</text>
</svg>`;

  const FIG_SAFETY = `<svg viewBox="0 0 700 250" role="img" aria-label="안전 계층: 하드와이어 안전 회로가 가장 우선, PLC 는 시퀀스 정지, 웹과 AI 는 표시와 권고만">
  <rect x="20" y="20" width="660" height="60" rx="12" class="p5"/>
  <text x="350" y="48" text-anchor="middle" class="tx-w">① 하드와이어 안전 회로 — 비상정지 · 안전 도어 · 인터락 (가장 우선, 누구도 우회 불가)</text>
  <text x="350" y="68" text-anchor="middle" class="tx-w">이 강좌에서는 시뮬레이터의 '가상 하드웨어 스위치' 로 흉내 냅니다</text>
  <rect x="60" y="95" width="580" height="55" rx="12" class="p3s"/>
  <text x="350" y="120" text-anchor="middle" class="tx-b">② PLC — 이상을 읽어 라인을 ERROR 로, 원인이 사라진 뒤 리셋 → 준비</text>
  <text x="350" y="140" text-anchor="middle" class="tx-m">에러 코드: 1 비상정지 · 2 안전펜스·도어 열림 · 3 에어압 저하 · 4 UR 보호정지</text>
  <rect x="110" y="165" width="480" height="60" rx="12" class="p1s"/>
  <text x="350" y="190" text-anchor="middle" class="tx-b">③ 웹 · AI — 상태 표시, 확인을 거친 상위 명령(리셋 · 기동), 권고</text>
  <text x="350" y="210" text-anchor="middle" class="tx-m">AI 는 안전 회로를 해제 · 우회하거나 라인을 움직이지 않습니다</text>
</svg>`;

  // ------------------------------------------------------------------ 실습 블록
  const LAB7 = `<div class="lab" data-lab="ch16-1-a">
  <div class="lab-head"><span class="lab-badge">사례 7</span><b>컨베이어 이상 조기 발견</b><span class="lab-meta">⏱ 25분 · 화면: 가상 고장 · 예지보전 · MES</span></div>
  <p class="lab-goal">숨겨진(블라인드) 컨베이어 고장을 예지보전 화면과 AI 진단으로 <b>고장 유형을 공개하기 전에</b> 찾아내고, 정비 오더로 해소한 뒤 회복을 확인합니다.</p>
  <p class="lab-pre">설비 #1 이 생산 중(RUNNING)이어야 합니다 — 7차시 방법으로 생산을 시작하거나 공장 라인에서 <span class="ui">기동</span>. 관찰 일지(시각 · 이상 점수 · 단계 · 눈에 띄는 센서) 표를 준비합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">가상 고장</span> 을 엽니다. <b>무작위 고장 만들기</b> 에서 설비 <span class="ui">설비 #1</span>, 대상 <span class="ui">컨베이어</span>, 발생 시각 <code>10 ~ 120</code> 초, <span class="ui">블라인드(내용 숨김)</span> 체크를 확인합니다.</div>
      ${SHOT('ch16_sim_random', '무작위 고장 만들기')}
      <div class="lab-check">설비 #1 · 컨베이어 · 블라인드가 선택되어 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">🎲 무작위 고장 예약</span> 을 누릅니다.</div>
      <div class="lab-check">"예약 대기 1건" 처럼 늘어납니다. 유형 · 강도 · 발생 시각은 서버가 정하고 알려 주지 않습니다. 지금 시각을 관찰 일지 첫 줄에 적습니다.</div>
      <div class="lab-tip">고장은 서서히 진행(강도 증가)할 수도 있습니다. 알람까지 몇 분 걸릴 수 있으니 조급해하지 마세요.</div></li>
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">예지보전</span> → <span class="ui">📊 보전 현황</span> 에서 표의 <span class="ui">공급 컨베이어 #1</span> 을 누릅니다.</div>
      ${SHOT('ch16_pdm_conv', '공급 컨베이어 #1 이상 점수 추이')}
      <div class="lab-check">아래 <b>이상 점수 추이 · 공급 컨베이어 #1</b> 그래프가 나옵니다. 점선(1.0)이 임계선입니다.</div></li>
    <li class="lab-step"><div class="lab-do">1~2분 간격으로 화면을 다시 보며 관찰 일지에 점수를 적습니다. 동시에 <span class="ui">공장 라인</span> 오른쪽 <b>센서 실시간 값</b>의 공급 컨베이어 #1(진동 RMS · 전류 · 온도)도 적습니다.</div>
      ${SHOT('ch16_line_interlock', '공장 라인 센서 실시간 값')}
      <div class="lab-check">점수가 1.0 을 넘기 시작하는 시점과, 그때 크게 바뀐 센서 값이 일지에 남았습니다.</div></li>
    <li class="lab-step"><div class="lab-do">점수가 1.0 이상으로 15초(3윈도우) 이어지면 <b>주의</b>, 1분(12윈도우) 이어지면 <b>위험</b> 알람이 생깁니다. <span class="ui">MES</span> → <span class="ui">🔧 정비 · 예지보전</span> 의 <b>예지보전 알람</b> 표를 엽니다.</div>
      ${SHOT('ch16_mes_alerts', '예지보전 알람 표')}
      <div class="lab-check">설비 CONV-01 줄에 수준(주의/위험) · 내용(예: "… 이상 징후 (○○ 의심)") · <b>근거 특징</b>(예: 진동 RMS z=…)이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">예지보전</span> → <span class="ui">✦ AI 로 분석하기</span> 에서 대상 <span class="ui">공급 컨베이어 #1</span>, 기간 <span class="ui">최근 1시간</span> 을 고르고 <span class="ui">✦ 분석하기</span> 를 누릅니다.</div>
      ${SHOT('ch16_pdm_ai_scope', 'AI 로 분석하기 대상 선택')}
      <div class="lab-check">결과에 심각도, <b>근거 · 가능한 원인 · 권고 조치</b>가 나옵니다. AI 는 고장 정답(라벨)을 모르고 데이터만 보고 추정합니다.</div></li>
    <li class="lab-step"><div class="lab-do">관찰 일지와 AI 결과를 보고 <b>고장 유형 가설</b>을 적습니다(불균형 / 베어링 / 벨트 중 하나와 근거 두 가지).</div>
      <div class="lab-check">예) "베어링 결함 — 근거: 진동 첨도 · 500~1000Hz 대역 상승, 온도 상승".</div>
      <div class="lab-tip">불균형은 진동 RMS(25Hz 회전 성분)가, 베어링은 첨도 · 고주파 대역 · 온도가, 벨트는 전류 변동 · 벨트 사행이 먼저 움직입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> → <span class="ui">🔧 정비 · 예지보전</span> 에서 그 알람 줄의 <span class="ui">AI 권고</span> 를 누릅니다(또는 <span class="ui">컨베이어 상태로 권고 받기</span>).</div>
      ${SHOT('ch16_mes_advice', 'AI 정비 권고')}
      <div class="lab-check">AI 정비 권고 카드에 <b>가능한 원인 · 권장 조치 · 재가동 전 확인</b>이 나옵니다. 권장 조치 첫 줄이 에너지 차단(LOTO)인지 확인합니다.</div></li>
    <li class="lab-step"><div class="lab-do">정비를 결정합니다. 알람에 정비 오더가 자동으로 붙지 않았다면 <b>정비 오더</b> 칸에서 설비 <span class="ui">공급 컨베이어 #1</span>, 내용(예: "베어링 점검 · 교체")을 넣고 <span class="ui">정비 오더 등록</span> 을 누릅니다.</div>
      ${SHOT('ch16_mes_mo_form', '정비 오더 등록')}
      <div class="lab-check">정비 오더 목록에 MO-… 가 생겼습니다. 알람 줄의 <span class="ui">확인</span> 을 눌러 접수했음을 표시합니다.</div></li>
    <li class="lab-step"><div class="lab-do">"정비를 마쳤다" 고 가정하고 정비 오더 줄의 <span class="ui">종료</span> 를 누릅니다.</div>
      <div class="lab-check">정비 오더가 종료되고, 이 설비의 진행 중인 고장이 해소됩니다(가상 고장 화면 이력의 <b>종료</b> 칸에 시각이 찍힘).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">가상 고장</span> 의 <b>고장 · 열화 이력</b> 표에서 방금 고장 줄의 <span class="ui">공개</span> 를 눌러 정답을 확인합니다(공개 전에 해소됐다면 그대로 유형이 보입니다).</div>
      ${SHOT('ch16_sim_history', '고장 · 열화 이력 표')}
      <div class="lab-check">공개된 유형과 7번 단계의 내 가설을 비교해 맞았는지 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">5분 뒤 <span class="ui">📊 보전 현황</span> 에서 공급 컨베이어 #1 점수가 1.0 아래로 돌아왔는지 확인합니다.</div>
      <div class="lab-check">점수가 내려가고 새 알람이 생기지 않으면 <b>회복 확인</b> 완료입니다.</div></li>
  </ol>
  <div class="lab-result">AI(이상 점수 · 분석 · 권고)는 <b>징후를 일찍 알려 주고 근거를 정리</b>했고, 사람은 <b>가설을 세우고 정비를 결정 · 수행 · 확인</b>했습니다. 고장이 공개되기 전에 데이터로 찾는 것이 예지보전의 핵심입니다.</div>
  <div class="lab-q">AI 분석의 추정 원인과 내 가설이 달랐다면, 어떤 데이터를 더 보면 판단할 수 있을까요?</div>
</div>`;

  const LAB8 = `<div class="lab" data-lab="ch16-1-b">
  <div class="lab-head"><span class="lab-badge">사례 8</span><b>델타 흡착 문제 구분 — 진공 누설일까, 패드 오염일까</b><span class="lab-meta">⏱ 20분 · 화면: 가상 고장 · 공장 라인 · 예지보전</span></div>
  <p class="lab-goal">델타 로봇의 픽 실패가 늘었을 때, 센서와 <b>카메라 B(흡착 패드 사진)</b>, AI 분석으로 원인을 둘 중 하나로 가려냅니다.</p>
  <p class="lab-pre">설비 #1 생산 중. 교사가 <span class="ui">수동 고장 주입 (교수자 · 시연용)</span> 으로 유형을 정해 줄 수도 있습니다(모둠마다 다르게).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">가상 고장</span> → 무작위 고장 만들기에서 설비 <span class="ui">설비 #1</span>, 대상 <span class="ui">델타 로봇</span>, 블라인드 체크 후 <span class="ui">🎲 무작위 고장 예약</span>. (교사 시연은 아래 <span class="ui">수동 고장 주입</span> 에서 유형 <span class="ui">진공 누설</span> 또는 <span class="ui">패드 오염</span> · 강도 0.6 · 지속 0 → <span class="ui">고장 주입</span>)</div>
      ${SHOT('ch16_sim_manual', '수동 고장 주입')}
      <div class="lab-check">예약 대기가 늘었거나(학생), 이력 표에 새 고장이 '진행 중' 으로 생겼습니다(교사).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 오른쪽 <b>센서 실시간 값</b> 에서 델타 로봇 #1 의 <b>진공압 · 픽 실패율 · 패드 오염</b>, 공압 유닛 #1 의 <b>에어압</b>을 2분 간격으로 3번 적습니다.</div>
      <div class="lab-check">정상일 때 진공압은 약 −70 kPa, 에어압 약 0.60 MPa, 픽 실패율 0 % 근처입니다. 어느 값이 변하는지 적었습니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 화면의 <b>설비 #1 카메라 B · 예지보전</b> 영상에서 오른쪽(흡착 패드) 사진을 봅니다. 크게 보려면 카메라 패널을 누릅니다.</div>
      ${SHOT('ch16_line_camb', '카메라 B 예지보전 영상')}
      <div class="lab-check">패드 원 안에 검은 점 · 얼룩이 늘었는지 적습니다(왼쪽은 벨트 사행 영상).</div></li>
    <li class="lab-step"><div class="lab-do">아래 비교표(위 그림)와 내 기록을 맞춰 보고 1차 판단을 적습니다.</div>
      <div class="lab-check">"진공압이 덜 깊어지고 에어압이 조금 떨어졌는데 패드 사진은 깨끗 → 누설" 또는 "패드에 얼룩 · 패드 오염 값 상승 → 오염" 같은 근거 문장이 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">예지보전</span> → <span class="ui">📊 보전 현황</span> 에서 <span class="ui">델타 로봇 #1</span> 점수 추이를 봅니다.</div>
      ${SHOT('ch16_pdm_delta', '델타 로봇 #1 이상 점수 추이')}
      <div class="lab-check">점수가 1.0 을 넘었는지, 알람 수준이 무엇인지 확인합니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">✦ AI 로 분석하기</span> 에서 대상 <span class="ui">델타 로봇 #1</span> · 최근 1시간으로 <span class="ui">✦ 분석하기</span>.</div>
      <div class="lab-check">근거에 '진공압' · '흡착 패드 오염' · '공급 에어압' · '픽 실패율' 중 무엇이 올라왔는지, 가능한 원인이 내 판단과 같은지 비교합니다.</div></li>
    <li class="lab-step"><div class="lab-do">MES 정비 화면에서 <span class="ui">델타 로봇 상태로 권고 받기</span> 를 누르고, 권장 조치가 원인별로 달라지는지 봅니다(누설 → 배관 · 피팅, 오염 → 패드 청소 · 교체).</div>
      <div class="lab-check">권고와 내 판단을 바탕으로 정비 오더 내용을 구체적으로 적어 <span class="ui">정비 오더 등록</span> 합니다.</div></li>
    <li class="lab-step"><div class="lab-do">정비 오더 <span class="ui">종료</span> → 가상 고장 이력에서 <span class="ui">공개</span> 로 정답을 확인합니다.</div>
      <div class="lab-check">정답과 판단이 맞았는지, 판단에 가장 결정적이었던 증거 하나를 적습니다.</div></li>
  </ol>
  <div class="lab-result">같은 "픽 실패" 라도 원인에 따라 조치가 다릅니다. <b>카메라 B(비전)</b> 와 <b>진공 · 에어압 센서</b>를 함께 보면 구분할 수 있고, AI 분석은 그 근거를 숫자로 정리해 줍니다.</div>
</div>`;

  const LAB9 = `<div class="lab" data-lab="ch16-2-a">
  <div class="lab-head"><span class="lab-badge">사례 9</span><b>에어 공급 이상 — 라인이 갑자기 멈췄다</b><span class="lab-meta">⏱ 15분 · 화면: 가상 고장 · 공장 라인 · MES</span></div>
  <p class="lab-goal">압축 공기 공급이 끊겼을 때 라인 · PLC · MES 에 무엇이 나타나는지 보고, 원인 제거 → 리셋 → 기동 순서로 복구합니다.</p>
  <p class="lab-pre">설비 #1 생산 중(RUNNING). <b>실습이 끝나면 스위치를 반드시 원래대로</b> 돌려놓습니다(다른 실습에 영향).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 에서 설비 #1 의 <b>PLC 상태 · 카운터</b>와 <b>안전 · 인터락</b> 카드를 먼저 확인합니다.</div>
      ${SHOT('ch16_line_plc', 'PLC 상태 · 카운터')}
      <div class="lab-check">라인 상태 '운전' · 녹색 램프, 인터락 4개 모두 ✓ 정상입니다. 투입 · 양품 카운터 값을 적어 둡니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">가상 고장</span> → 설비 #1 카드의 가상 하드웨어 스위치 <span class="ui">✔ 에어 공급: 정상</span> 을 누릅니다.</div>
      ${SHOT('ch16_sim_switches', '가상 하드웨어 스위치')}
      <div class="lab-check">버튼이 <span class="ui">✖ 에어 공급: 차단</span> 으로 바뀝니다.</div></li>
    <li class="lab-step"><div class="lab-do">곧바로 <span class="ui">공장 라인</span> 으로 돌아가 상태를 봅니다.</div>
      <div class="lab-check">인터락에 <b>에어압 저하</b>, 라인 상태 <b>이상(ERROR)</b>, 적색 램프 · 부저가 켜지고 컨베이어 · 로봇이 멈춥니다. 센서 값의 공급 에어압이 약 0.30 MPa 로 떨어졌습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> → <span class="ui">⚙ 설비 · 알람</span> 을 엽니다.</div>
      ${SHOT('mes_equipment', 'MES 설비 · 알람')}
      <div class="lab-check">설비 상태가 이상으로 바뀌고 <b>E003 에어압 저하</b> 같은 설비 알람(CRITICAL)이 생겼습니다.</div></li>
    <li class="lab-step"><div class="lab-do">원인을 없애기 전에 <span class="ui">공장 라인</span> → <span class="ui">리셋</span> → 확인을 눌러 봅니다.</div>
      <div class="lab-check">라인은 여전히 <b>이상</b>입니다. PLC 는 원인(에어압 저하)이 남아 있으면 리셋을 받아들이지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">가상 고장</span> 에서 <span class="ui">✖ 에어 공급: 차단</span> 을 눌러 <span class="ui">✔ 에어 공급: 정상</span> 으로 되돌립니다(= 현장에서 공기 밸브를 다시 연 것).</div>
      <div class="lab-check">스위치가 정상으로 돌아왔습니다. 라인 화면의 인터락 '에어압 정상' 을 확인합니다(에어압이 차오르는 데 몇 초 걸릴 수 있음).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> → <span class="ui">리셋</span> → 확인, 이어서 <span class="ui">기동</span> → 확인.</div>
      ${SHOT('line_cmd_confirm', '명령 확인 대화상자')}
      <div class="lab-check">라인 상태가 준비 → 운전으로 바뀌고, MES 설비 알람이 해제됩니다. 카운터가 다시 늘기 시작합니다.</div></li>
    <li class="lab-step"><div class="lab-do">정지 시각 · 복구 시각을 보고 <b>비가동 시간</b>을 계산해 적습니다. 대시보드의 <b>설비 가동 간트 차트</b>에서 이상 구간을 찾아봅니다.</div>
      <div class="lab-check">간트에 설비 #1 의 짧은 이상 띠가 보이고, 비가동 시간이 기록되었습니다.</div></li>
  </ol>
  <div class="lab-result">에어 · 안전 이상은 <b>PLC 가 즉시 라인을 멈추고</b>, 사람이 <b>원인 제거 → 리셋 → 기동</b> 순서로 복구합니다. 웹의 리셋은 원인이 남아 있으면 효과가 없습니다 — 안전과 설비 보호가 소프트웨어 명령보다 우선입니다.</div>
</div>`;

  const LAB10 = `<div class="lab" data-lab="ch16-2-b">
  <div class="lab-head"><span class="lab-badge">사례 10</span><b>안전 도어와 비상정지 복구</b><span class="lab-meta">⏱ 15분 · 화면: 공장 라인 · 가상 고장</span></div>
  <p class="lab-goal">작업자가 안전 도어를 열었을 때와 비상정지를 눌렀을 때의 동작을 보고, 정해진 복구 절차를 익힙니다.</p>
  <p class="lab-pre">설비 #1 생산 중. 끝나면 모든 스위치를 정상으로, 라인은 리셋해 둡니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">가상 고장</span> → 설비 #1 의 <span class="ui">✔ 안전 도어: 닫힘</span> 을 눌러 <span class="ui">✖ 안전 도어: 열림</span> 으로 바꿉니다.</div>
      <div class="lab-check">공장 라인에서 인터락 '안전 도어 열림', 라인 이상(에러: 안전펜스·도어 열림), UR3 가 그 자리에서 멈춥니다.</div></li>
    <li class="lab-step"><div class="lab-do">"점검을 마치고 도어를 닫았다" — 스위치를 다시 눌러 <span class="ui">✔ 안전 도어: 닫힘</span> 으로 되돌립니다. 아직 리셋은 누르지 않습니다.</div>
      <div class="lab-check">도어는 닫혔지만 라인은 여전히 이상 상태입니다. 원인이 사라져도 <b>사람이 확인하고 리셋</b>해야 다시 움직입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> → <span class="ui">리셋</span> → 확인 → <span class="ui">기동</span> → 확인.</div>
      <div class="lab-check">라인이 다시 운전합니다.</div></li>
    <li class="lab-step"><div class="lab-do">이번에는 공장 라인의 <span class="ui">■ 비상정지</span> 를 누릅니다. 대화상자의 설명을 읽고 <span class="ui">비상정지</span> 를 누릅니다.</div>
      ${SHOT('ch16_line_estop', '비상정지 버튼')}
      <div class="lab-check">대화상자에 "시뮬레이터의 비상정지 입력(X0)을 끊습니다" 가 보이고, 누른 뒤 라인 · 로봇이 즉시 멈춥니다. 버튼이 <span class="ui">⟲ 비상정지 해제</span> 로 바뀝니다.</div>
      <div class="lab-tip">실제 장비에서는 비상정지를 현장 버튼으로만 누르고 해제합니다. 웹은 안전 회로를 대신하거나 해제할 수 없고, 실장비 모드에서는 정지 명령만 보낼 수 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">⟲ 비상정지 해제</span> 를 누르고 대화상자에서 <span class="ui">당겨서 해제</span> 를 누릅니다(= 눌린 버튼을 당겨 복귀).</div>
      <div class="lab-check">인터락 '비상정지 정상' 으로 돌아왔지만 라인은 <b>이상</b> 상태로 남아 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">원인을 확인했다고 가정하고 <span class="ui">리셋</span> → <span class="ui">기동</span> 을 각각 확인하며 누릅니다.</div>
      <div class="lab-check">라인이 다시 운전합니다. 모든 명령이 <b>확인 단계</b>를 거쳤습니다(감사 로그에 기록).</div></li>
    <li class="lab-step"><div class="lab-do">복구 절차 카드를 만듭니다: ① 원인 확인 ② 원인 제거(도어 닫기 · 비상정지 해제) ③ 주변 안전 확인 ④ 리셋 ⑤ 기동 ⑥ 정상 생산 확인.</div>
      <div class="lab-check">6단계 카드가 완성되었고, 어느 단계를 AI 가 대신할 수 없는지 표시했습니다(전부 — AI 는 안내만).</div></li>
  </ol>
  <div class="lab-result">안전은 <b>하드웨어(안전 회로)</b>가 책임지고, PLC 는 시퀀스를 멈추며, 사람은 <b>원인 확인 → 해제 → 리셋 → 기동</b> 순서로 복구합니다. AI 도우미는 절차를 설명할 수는 있어도 안전 장치를 해제하거나 라인을 움직이지 않습니다.</div>
</div>`;

  const LAB11 = `<div class="lab" data-lab="ch16-3-a">
  <div class="lab-head"><span class="lab-badge">사례 11</span><b>품질 불합격 LOT 추적</b><span class="lab-meta">⏱ 25분 · 화면: MES 생산오더 · 품질 · LOT 추적 · 대시보드</span></div>
  <p class="lab-goal">불합격(REJECT) 판정을 받은 적재함 LOT 을 찾아 계보를 추적하고, 원인 가설을 세워 조치를 기록합니다.</p>
  <p class="lab-pre">생산 실적이 쌓여 있어야 합니다. 불합격 LOT 이 없으면, 교사가 설비 #1 델타에 <b>진공 누설</b>(강도 0.8)을 수동 주입하고 10~15분 생산하면 픽 실패(미픽 폐기)가 늘어 검사 기준(불량률 15 % 이하)을 넘는 적재함이 생깁니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> → <span class="ui">⚑ 생산오더 · 공정</span> 아래 <b>검사 LOT(적재함 출하 검사)</b> 표를 엽니다.</div>
      ${SHOT('ch16_mes_insp', '검사 LOT 표')}
      <div class="lab-check">판정 칸에서 <b>✖ 불합격</b> 줄을 찾아 LOT 번호와 설비 번호(LOT 번호 가운데 숫자)를 적습니다. 없으면 '합격' LOT 하나로 진행합니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 생산오더 카드에서 해당 작업지시의 "검사 LOT n건 (불합격 m)" 숫자를 확인합니다.</div>
      ${SHOT('mes_pro_open', '생산오더 공정 진행')}
      <div class="lab-check">불합격 LOT 은 ERP 로 입고 · 출고되지 않습니다(실적 확인에서 수율 0 · 폐기).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">◎ 품질</span> 을 열어 <b>불량 사유별 합계</b>를 봅니다.</div>
      ${SHOT('mes_quality', 'MES 품질')}
      <div class="lab-check"><code>MISSED_PICK</code>(델타가 집지 못해 폐기된 공작물)처럼 가장 많은 불량 코드를 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">⛓ LOT 추적</span> 에서 그 LOT 번호를 입력(또는 오른쪽 목록에서 선택)하고 <span class="ui">추적</span>.</div>
      ${SHOT('mes_lots_trace', 'LOT 추적 결과')}
      <div class="lab-check">적재함 ← 박스 ← 공작물, 만든 설비 · 시각 · 작업지시가 나옵니다. 생산 시각을 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">그 시각에 설비에 무슨 일이 있었는지 <span class="ui">예지보전</span> → <span class="ui">📊 보전 현황</span> 에서 해당 설비 <span class="ui">델타 로봇 #n</span> 점수 추이와 알람을 확인합니다.</div>
      <div class="lab-check">불합격 LOT 생산 시각 근처에 델타 이상 점수 상승 · 알람이 있었다면 원인 후보로 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">MES 오른쪽 아래 <span class="ui">✦ AI 도우미</span> 에 묻습니다: <span class="prompt">알람과 정비 오더 정리해줘</span> 다음에 <span class="prompt">지금 설비별 진행 상황은?</span></div>
      <div class="lab-check">AI 답의 숫자(알람 수 · 설비 상태)를 MES 화면에서 하나씩 확인했습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">대시보드</span> 의 <b>불량 유형(파레토)</b> 와 <b>설비별 OEE</b> 품질 칸을 봅니다.</div>
      ${SHOT('ch16_dash_pareto', '대시보드 불량 유형 파레토')}
      <div class="lab-check">가장 큰 불량 유형과 품질이 낮은 설비가 LOT 추적 결과와 같은 설비인지 확인합니다.</div></li>
    <li class="lab-step"><div class="lab-do">원인 가설과 조치를 정합니다(예: "델타 #1 진공 누설 → 정비 오더, 해당 시간대 LOT 재검사"). 필요하면 <span class="ui">◎ 품질</span> 의 불량 기록 칸에 불량 코드 · 수량 · LOT 을 넣고 <span class="ui">기록</span>.</div>
      ${SHOT('ch16_mes_quality_form', '품질 불량 기록')}
      <div class="lab-check">원인 → 근거 화면 → 조치(정비 오더 · 재검사 · 기록)가 한 줄로 정리되었습니다.</div></li>
  </ol>
  <div class="lab-result">LOT 추적은 "어느 설비 · 어느 시각 · 어느 작업지시" 를 알려 주고, 예지보전 데이터는 "그때 설비 상태" 를 알려 줍니다. <b>품질 데이터와 설비 데이터를 이으면</b> 원인을 찾을 수 있습니다.</div>
</div>`;

  const LAB12 = `<div class="lab" data-lab="ch16-3-b">
  <div class="lab-head"><span class="lab-badge">사례 12</span><b>교대 인수인계 보고서 — AI 와 함께, 숫자는 확인하고</b><span class="lab-meta">⏱ 25분 · 화면: ERP · MES AI 도우미 · 대시보드</span></div>
  <p class="lab-goal">다음 교대 근무자에게 넘길 인수인계 보고서를 AI 도우미로 빠르게 초안 잡고, <b>모든 숫자를 화면에서 검증</b>해 완성합니다.</p>
  <p class="lab-pre">보고서 표(항목 / AI 답 / 확인한 화면 / 확인한 값 / 일치 여부)를 준비합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> → 아무 메뉴에서 <span class="ui">✦ AI 도우미</span> 를 열고 예시 버튼 <span class="prompt">지금 설비별 진행 상황은?</span> 을 보냅니다.</div>
      <div class="lab-check">설비별 상태 · 생산 색 · 작업지시가 답으로 나옵니다. 표의 '설비 상태' 줄에 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">이어서 <span class="prompt">알람과 정비 오더 정리해줘</span> 를 보냅니다.</div>
      ${SHOT('ch16_mes_ai_handover', 'MES AI 도우미 답변')}
      <div class="lab-check">설비 알람 · 정비 오더 · 예지보전 알람 건수가 나옵니다. 답 아래 작은 글씨(조회한 도구)를 확인합니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="prompt">대기 중인 작업지시 순서 알려줘</span> 를 보내고, <span class="ui">▦ 디스패치 보드</span> 화면과 비교합니다.</div>
      <div class="lab-check">AI 답의 순서와 디스패치 보드의 설비별 대기열이 같습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">ERP</span> 의 <span class="ui">✦ AI 도우미</span> 에서 <span class="prompt">미출고 수주와 납기 임박 알려줘</span> 를 보냅니다.</div>
      ${SHOT('ch16_erp_ai_handover', 'ERP AI 도우미 답변')}
      <div class="lab-check">미출고 수주 건수 · 잔량 · 납기 임박 · 지연이 나옵니다. 표에 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">이제 검증합니다. 표의 숫자마다 해당 화면을 열어 값을 맞춰 봅니다: 알람 → <span class="ui">⚙ 설비 · 알람</span>, 정비 → <span class="ui">🔧 정비 · 예지보전</span>, 수주 → <span class="ui">₩ 영업 · 수주</span>.</div>
      <div class="lab-check">'일치 여부' 칸이 모두 채워졌습니다. 다르면 어느 쪽이 최신인지(조회 시각) 메모합니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">대시보드</span> 에서 시간 범위 <span class="ui">8시간</span> 으로 OEE · 생산량 · <b>설비 건강도(예지보전)</b> 를 확인해 표에 넣습니다.</div>
      ${SHOT('ch16_dash_health', '대시보드 설비 건강도')}
      <div class="lab-check">공장 OEE 와 설비별 건강도(정상 · 주의 · 위험)가 적혔습니다.</div></li>
    <li class="lab-step"><div class="lab-do">보고서를 완성합니다: ① 생산 현황(계획 대비) ② 설비 상태 · 알람 ③ 진행 중 정비 ④ 품질 이슈 ⑤ 다음 교대가 할 일 3가지.</div>
      <div class="lab-check">모든 숫자 옆에 확인한 화면 이름이 있고, '할 일' 은 사람이 결정한 내용입니다.</div></li>
    <li class="lab-step"><div class="lab-do">짝과 보고서를 바꿔 읽고, 숫자 하나를 골라 화면에서 다시 확인해 줍니다(교차 검증).</div>
      <div class="lab-check">짝의 확인 서명(또는 ✔)이 있습니다.</div></li>
  </ol>
  <div class="lab-result">AI 도우미는 여러 화면의 정보를 <b>빠르게 모아</b> 주지만, 보고서의 책임은 사람에게 있습니다. <b>숫자는 화면에서 확인하고, 할 일은 사람이 정합니다.</b></div>
  <div class="lab-q">AI 답과 화면 숫자가 달랐다면 어떤 이유들이 있을 수 있을까요? (조회 시각, 질문 범위, 규칙 기반 키워드 …)</div>
</div>`;

  const TP = (html) => ({ type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html });

  PY_COURSE.addChapter({
    id: 'ch16', no: '16', title: '사례 실습 ② 설비 · 품질 · 운영', subtitle: 'Equipment · Quality · Operations Cases',
    summary: '베어링 · 진공 · 에어 · 안전 도어 · 품질 불합격 · 교대 인수인계 등 설비 · 품질 · 운영 사례를 처음부터 끝까지 단계별로 해결합니다.',
    goals: ['예지보전 화면과 AI 진단으로 숨겨진 설비 고장을 찾아 정비로 해소할 수 있다',
      '에어 · 안전 도어 · 비상정지 이상에서 원인 제거 → 리셋 → 기동 복구 절차를 수행할 수 있다',
      'LOT 추적과 설비 데이터로 품질 문제 원인을 찾고, AI 도우미 답을 검증해 보고서를 쓸 수 있다'],
    sections: [
      {
        id: 'ch16-1', title: '컨베이어 이상 조기 발견 · 델타 흡착 문제 구분', minutes: 50,
        goals: ['블라인드 고장을 관찰 일지 · 알람 · AI 분석으로 찾아낸다', '진공 누설과 패드 오염을 센서 · 카메라 B 로 구분한다', 'AI 의 역할과 사람의 결정을 구분해 설명한다'],
        flow: [['도입 — 사례 이야기', 5], ['공통 흐름 · 증상 비교', 7], ['사례 7', 22], ['사례 8', 12], ['정리 · 퀴즈', 4]],
        content: [
          { type: 'p', html: '<b>상황</b> — 월요일 아침, 설비 #1 이 평소처럼 돌고 있습니다. 하지만 누군가 "요즘 컨베이어 소리가 좀 달라졌다" 고 합니다. 아직 멈추지는 않았습니다. 고장이 나서 라인이 서기 <b>전에</b> 찾아낼 수 있을까요? 이번 사례에서는 고장의 정체를 모르는 상태(블라인드)에서 데이터와 AI 로 추적합니다.' },
          { type: 'figure', html: FIG_LOOP, caption: '설비 사례의 공통 흐름 — 징후 → 관찰 → AI 진단 → 사람 결정 → 회복 확인' },
          { type: 'table', head: ['성공 기준', '확인 방법'], rows: [
            ['고장 공개 <b>전에</b> 유형 가설을 세웠다', '관찰 일지 · 가설 메모'],
            ['정비 오더를 등록하고 종료했다', 'MES 정비 오더 목록'],
            ['이상 점수가 1.0 아래로 회복', '보전 현황 추이'],
          ] },
          { type: 'h', text: '사례 7 — 컨베이어 이상 조기 발견' },
          { type: 'figure', html: LAB7 },
          { type: 'h', text: '사례 8 — 델타 흡착 문제 구분' },
          { type: 'p', html: '<b>상황</b> — 델타 로봇이 공작물을 놓치는 일이 잦아졌습니다. 공기가 새는 걸까요, 흡착 패드가 더러워진 걸까요? 조치가 완전히 다르기 때문에 정확히 가려야 합니다.' },
          { type: 'figure', html: FIG_DELTA, caption: '증상 비교표 — 카메라 B(패드 사진)와 진공 · 에어압이 결정적 근거' },
          { type: 'figure', html: LAB8 },
          { type: 'h', text: '돌아보기 — AI 가 한 일, 사람이 한 일' },
          { type: 'table', head: ['단계', 'AI(플랫폼)', '사람'], rows: [
            ['징후', '이상 점수 계산 · 주의/위험 알람 · 근거 특징', '관찰 일지 작성'],
            ['진단', 'AI 로 분석하기(원인 추정) · 정비 권고', '가설 세우기 · 근거 비교'],
            ['조치', '—', '정비 오더 결정 · 등록 · 정비 · 종료'],
            ['확인', '점수 추이 표시', '회복 판단 · 정답 공개 · 회고'],
          ] },
          TP('<ul><li><b>수업 준비</b>: 설비 #1 을 생산 중으로 만들어 둡니다(AI 생산계획 → 확정 → 생산 시작, 또는 라인 기동). 이전 수업의 고장이 남아 있으면 <span class="ui">가상 고장</span> 이력에서 <span class="ui">종료</span> 하거나 MES 정비 오더를 종료해 정리합니다. <b>무작위 열화</b>(유지보수 포인트)도 켜져 있으면 함께 진행 중일 수 있으니 이력 표를 먼저 보여 줍니다.</li><li><b>AI 권고 버튼</b>(<span class="ui">컨베이어/델타 로봇 상태로 권고 받기</span>)은 설비 #1 기준입니다. 다른 설비는 알람 줄의 <span class="ui">AI 권고</span> 를 씁니다.</li><li><b>시간</b>: 알람까지 수 분이 걸릴 수 있습니다. 발생 시각을 10~60초로 줄이고, 기다리는 동안 사례 8 의 증상 비교를 미리 설명합니다. 모둠별로 설비를 나누면(설비 #1~#4) 한꺼번에 진행할 수 있습니다.</li><li><b>예상 결과</b>: 컨베이어는 불균형 · 베어링 · 벨트, 델타는 진공 누설 · 패드 오염 중 하나. 정답률보다 <b>근거의 질</b>을 평가합니다.</li><li><b>토론</b>: "AI 분석이 틀렸다면 누구 책임인가?", "알람이 너무 자주 울리면 현장은 어떻게 반응할까?"</li><li><b>평가 체크리스트</b>: □ 관찰 일지 3회 이상 □ 가설 + 근거 2개 □ 정비 오더 등록 · 종료 □ 회복 확인 □ 사례 8 결정적 증거 1개</li></ul>'),
        ],
        practice: [],
        quiz: [
          { q: '블라인드 고장을 예약한 뒤 고장의 정체를 <b>공개하기 전에</b> 추정하는 데 쓸 수 있는 화면이 <b>아닌</b> 것은?',
            options: ['예지보전 → 보전 현황(이상 점수 추이)', '예지보전 → AI 로 분석하기', '가상 고장 → 이력의 「공개」 버튼', '공장 라인 → 센서 실시간 값'], answer: 2,
            explain: '「공개」 는 정답을 보는 버튼입니다. 추정은 데이터(점수 · 센서 · AI 분석)로 합니다.' },
          { q: '이상 점수가 1.0 이상으로 몇 윈도우 연속이면 <b>주의</b> 알람이 생길까요? (윈도우 = 5초)',
            options: ['1윈도우(5초)', '3윈도우(15초)', '12윈도우(1분)', '120윈도우(10분)'], answer: 1,
            explain: '3윈도우 연속이면 주의, 12윈도우 연속이면 위험입니다. 순간적인 튐으로 오탐이 나는 것을 줄이기 위한 규칙입니다.' },
          { q: '델타의 픽 실패가 늘었고, 카메라 B 의 흡착 패드 사진에 얼룩이 늘었으며 \'패드 오염\' 값이 올랐습니다. 가장 알맞은 판단은?',
            options: ['진공 누설 — 배관 점검', '흡착 패드 오염 — 패드 청소 · 교체', '컨베이어 베어링 결함', '에어 공급 차단'], answer: 1,
            explain: '패드 사진 · 패드 오염 센서가 결정적 근거입니다. 진공 누설이면 패드는 깨끗하고 진공압 · 에어압이 변합니다.' },
          { q: '정비 오더를 <b>종료</b>하면 플랫폼에서 일어나는 일은?',
            options: ['AI 모델이 삭제된다', '그 설비의 진행 중인(가상) 고장이 해소되고 점수가 회복된다', '라인이 자동으로 비상정지된다', '수주가 취소된다'], answer: 1,
            explain: '정비 오더 종료 = 정비 수행으로 보고, 그 설비의 진행 중인 고장 · 열화를 끝냅니다.' },
        ],
        slides: [
          { layout: 'title', title: '사례 7 · 8 — 설비 이상 사례', subtitle: '컨베이어 조기 발견 · 델타 흡착 문제 구분', notes: '<p>오늘은 정체를 모르는 고장을 데이터로 추적하는 탐정 수업입니다. 모둠별로 설비를 나눠 줍니다.</p>' },
          { layout: 'diagram', title: '공통 흐름', html: FIG_LOOP, notes: '<p>①~③ 은 AI 가 돕고 ④⑤ 는 사람이 한다는 점을 강조합니다. 이 그림을 칠판에 남겨 두고 단계마다 짚습니다.</p>' },
          { layout: 'diagram', title: '블라인드 고장 예약', html: SHOT('ch16_sim_random', '무작위 고장 만들기'), notes: '<p>시연: 설비 #1 · 컨베이어 · 블라인드 → 예약. 발생 시각을 짧게(10~60초) 바꾸면 수업 시간이 절약됩니다.</p>' },
          { layout: 'diagram', title: '관찰 — 이상 점수 추이', html: SHOT('ch16_pdm_conv', '이상 점수 추이'), notes: '<p>점선 1.0 이 임계선. 💬 "점수가 1.0 을 한 번 넘으면 바로 알람일까?" → 3윈도우 연속 규칙.</p>' },
          { layout: 'diagram', title: '알람 · 근거 특징', html: SHOT('ch16_mes_alerts', '예지보전 알람'), notes: '<p>근거 특징 칸의 z 값이 클수록 평소와 많이 다르다는 뜻. 진동 RMS → 불균형, 첨도 · 고주파 → 베어링 힌트.</p>' },
          { layout: 'diagram', title: 'AI 정비 권고', html: SHOT('ch16_mes_advice', 'AI 정비 권고'), notes: '<p>권장 조치 첫 줄이 LOTO(에너지 차단)인지 확인. 키가 없으면 규칙 기반 권고입니다.</p>' },
          { layout: 'diagram', title: '사례 8 — 증상 비교', html: FIG_DELTA, notes: '<p>💬 "카메라 B 사진 한 장으로 무엇을 가려낼 수 있을까?" 비전 데이터가 센서와 함께 쓰이는 피지컬 AI 예.</p>' },
          { layout: 'bullets', title: '실습 진행', bullets: ['사례 7: 예약 → 관찰 일지 → 알람 → AI 분석 → 가설 → 권고 → 정비 오더 → 종료 → 공개 → 회복', '사례 8: 예약(또는 수동 주입) → 센서 · 카메라 B → 1차 판단 → AI 분석 → 권고 → 정비 → 공개'],
            notes: '<p>사례 7 에 22분. 알람을 기다리는 동안 사례 8 의 센서 기록을 병행해도 됩니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: '이상 점수가 1.0 이상으로 몇 윈도우 연속이면 주의 알람?', options: ['1', '3', '12', '120'], answer: 1, explain: '3윈도우(15초) 연속이면 주의, 12윈도우면 위험.', notes: '<p>오탐을 줄이는 이유까지 말하게 합니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['고장 정체를 몰라도 데이터 · AI 로 추적할 수 있다', '같은 증상도 원인에 따라 조치가 다르다(누설 vs 오염)', 'AI: 징후 · 근거 · 권고 / 사람: 가설 · 결정 · 정비 · 확인', '정비 오더 종료 → 점수 회복으로 마무리'],
            notes: '<p>다음 교시: 에어 · 안전 도어 · 비상정지 — 안전과 복구 절차.</p>' },
        ],
      },
      {
        id: 'ch16-2', title: '에어 공급 이상 · 안전 도어와 비상정지 복구', minutes: 50,
        goals: ['에어 · 도어 · 비상정지 이상에서 라인 · PLC · MES 의 반응을 관찰한다', '원인 제거 → 리셋 → 기동 복구 절차를 수행한다', '안전은 하드웨어가 책임지고 AI 는 우회할 수 없음을 설명한다'],
        flow: [['도입 — 갑자기 멈춘 라인', 5], ['안전 계층 설명', 8], ['사례 9', 15], ['사례 10', 15], ['정리 · 퀴즈', 7]],
        content: [
          { type: 'p', html: '<b>상황</b> — 오후 2시, 설비 #1 이 갑자기 멈추고 적색 램프와 부저가 켜졌습니다. 고장일까요? 누가 도어를 열었을까요? 이번 교시는 <b>예지보전처럼 서서히 오는 이상이 아니라, 즉시 멈추는 이상</b>입니다. 원인을 찾고 안전하게 다시 돌리는 절차를 익힙니다.' },
          { type: 'figure', html: FIG_SAFETY, caption: '안전 계층 — 하드웨어 안전 회로 > PLC > 웹 · AI' },
          { type: 'callout', kind: 'warn', title: '시뮬레이션과 실제의 차이', html: '이 실습의 스위치는 시뮬레이터의 <b>가상 입력</b>입니다. 실제 설비에서는 비상정지 · 안전 도어가 하드와이어 회로로 동작하며, 웹 화면이나 AI 로 누르거나 해제할 수 없습니다. 실장비 연동은 아직 <b>미검증</b>이며, 시운전 전 안전 점검표를 통과해야 합니다(17차시).' },
          { type: 'table', head: ['원인', 'PLC 에러 표시', '라인 · 로봇', '복구'], rows: [
            ['비상정지 눌림', '비상정지', '즉시 정지(UR 도 그 자리)', '해제 → 리셋 → 기동'],
            ['안전 도어 열림', '안전펜스·도어 열림', '즉시 정지(UR 도 그 자리)', '도어 닫기 → 리셋 → 기동'],
            ['에어 공급 차단', '에어압 저하', '정지, 진공 · 블로 꺼짐', '공기 복구 → 리셋 → 기동'],
            ['UR 보호정지', 'UR 보호정지', '정지', '원인 확인 → 해제 → 리셋 → 기동'],
          ], caption: '원인이 남아 있으면 리셋해도 이상(ERROR) 상태가 유지됩니다' },
          { type: 'h', text: '사례 9 — 에어 공급 이상' },
          { type: 'figure', html: LAB9 },
          { type: 'h', text: '사례 10 — 안전 도어와 비상정지 복구' },
          { type: 'figure', html: LAB10 },
          { type: 'h', text: '돌아보기' },
          { type: 'list', items: [
            '<b>AI 가 한 일</b>: 없음 — 즉시 정지형 이상은 PLC · 안전 회로가 처리합니다. AI 도우미에게 복구 절차를 물을 수는 있지만, 리셋 · 기동은 사람이 확인하고 누릅니다.',
            '<b>사람이 한 일</b>: 원인 확인 · 제거, 주변 안전 확인, 리셋 · 기동 명령(확인 단계 · 감사 로그), 비가동 기록.',
            '<b>데이터로 남은 것</b>: MES 설비 알람(E00n), 설비 상태 로그, 대시보드 가동 간트의 이상 구간 — 나중에 비가동 원인 분석에 씁니다.',
          ] },
          TP('<ul><li><b>수업 준비</b>: 설비 #1 생산 중. 실습 전 <span class="ui">가상 고장</span> 의 설비 #1 스위치 4개가 모두 ✔ 인지 확인합니다.</li><li><b>반드시 원상 복구</b>: 수업이 끝나면 모든 모둠의 스위치를 ✔ 정상으로, 비상정지는 해제, 라인은 리셋해 둡니다. 남겨 두면 다음 수업에서 설비가 기동되지 않습니다.</li><li><b>자주 막히는 곳</b>: 스위치를 되돌리지 않고 리셋만 반복 → "원인이 남아 있으면 리셋이 안 된다" 는 점을 체험하게 둔 뒤 설명합니다. 에어압은 복구 후 차오르는 데 몇 초 걸립니다.</li><li><b>예상 결과</b>: 에러 표시 「에어압 저하」 · 「안전펜스·도어 열림」 · 「비상정지」, MES 알람 E003 · E002 · E001 같은 코드, 복구 후 알람 해제.</li><li><b>토론</b>: "AI 가 비상정지를 대신 해제해 주면 편하지 않을까?" → 안 되는 이유(책임 · 확인 · 하드와이어 원칙).</li><li><b>평가 체크리스트</b>: □ 이상 시 3곳(라인 · 인터락 · MES 알람) 확인 □ 원인 제거 전 리셋 실패 관찰 □ 올바른 순서로 복구 □ 6단계 복구 카드 □ 스위치 원상 복구</li></ul>'),
        ],
        practice: [],
        quiz: [
          { q: '에어 공급이 차단되어 라인이 이상(ERROR) 상태입니다. 다음 중 올바른 복구 순서는?',
            options: ['리셋 → 기동 → 에어 복구', '에어 복구 → 리셋 → 기동', '기동만 누르면 된다', 'AI 도우미에게 재가동을 요청한다'], answer: 1,
            explain: '원인을 먼저 없애야 PLC 가 리셋을 받아들입니다. 그다음 기동합니다.' },
          { q: '안전 도어를 다시 닫았습니다. 라인은 어떻게 될까요?',
            options: ['자동으로 바로 다시 돈다', '이상 상태로 남고, 사람이 리셋 · 기동해야 다시 돈다', '비상정지가 걸린다', 'MES 가 수주를 취소한다'], answer: 1,
            explain: '원인이 사라져도 사람이 확인하고 리셋해야 합니다. 의도치 않은 재기동을 막는 안전 원칙입니다.' },
          { q: '이 플랫폼에서 웹 화면의 ■ 비상정지 버튼에 대한 설명으로 옳은 것은?',
            options: ['실장비에서도 웹으로 비상정지를 해제할 수 있다', '시뮬레이터에서는 가상 입력(X0)을 바꾸고, 실장비에서는 현장 버튼으로만 누르고 해제한다', 'AI 가 판단해 자동으로 누른다', '누르면 데이터가 삭제된다'], answer: 1,
            explain: '안전 회로는 하드웨어가 책임집니다. 웹은 시뮬레이터 가상 입력이나 정지 명령까지만 다룹니다.' },
          { q: '즉시 정지형 이상(에어 · 도어 · 비상정지)이 데이터로 남는 곳이 <b>아닌</b> 것은?',
            options: ['MES 설비 · 알람', '대시보드 설비 가동 간트', 'ERP 기준정보의 BOM', '설비 상태 로그'], answer: 2,
            explain: 'BOM 은 제품 구성 정보입니다. 정지 기록은 MES 알람 · 상태 로그 · 간트에 남습니다.' },
        ],
        slides: [
          { layout: 'title', title: '사례 9 · 10 — 멈춘 라인 복구', subtitle: '에어 공급 이상 · 안전 도어 · 비상정지', notes: '<p>도입: 실제 공장에서 라인이 갑자기 멈췄을 때 가장 먼저 할 일은? (원인 확인, 사람 안전)</p>' },
          { layout: 'diagram', title: '안전 계층', html: FIG_SAFETY, notes: '<p>맨 위가 가장 강합니다. 💬 "AI 는 이 그림에서 어디에 있나요?" → ③ 표시 · 권고.</p>' },
          { layout: 'table', title: '원인별 반응과 복구', head: ['원인', '복구'], rows: [['비상정지', '해제 → 리셋 → 기동'], ['안전 도어', '닫기 → 리셋 → 기동'], ['에어 차단', '공기 복구 → 리셋 → 기동'], ['UR 보호정지', '원인 확인 → 해제 → 리셋 → 기동']],
            notes: '<p>공통 규칙: 원인 제거 → 사람 확인 → 리셋 → 기동.</p>' },
          { layout: 'diagram', title: '가상 하드웨어 스위치', html: SHOT('ch16_sim_switches', '가상 스위치'), notes: '<p>실제로는 공기 밸브 · 도어 스위치 · 버튼입니다. 실습 뒤 반드시 ✔ 로 되돌리도록 강조.</p>' },
          { layout: 'diagram', title: 'PLC 상태 · 인터락', html: SHOT('ch16_line_plc', 'PLC 상태'), notes: '<p>정상 상태를 먼저 보여 주고, 이상 시 바뀌는 칸(라인 상태 · 램프 · 인터락)을 미리 짚습니다.</p>' },
          { layout: 'diagram', title: '비상정지', html: SHOT('ch16_line_estop', '비상정지 버튼'), notes: '<p>대화상자의 문장을 같이 읽습니다: 실장비는 현장 버튼으로만.</p>' },
          { layout: 'bullets', title: '실습 진행', bullets: ['사례 9: 정상 확인 → 에어 차단 → 라인 · MES 관찰 → 리셋 실패 → 에어 복구 → 리셋 · 기동 → 비가동 기록', '사례 10: 도어 열림 → 닫기 → 리셋 · 기동 → 비상정지 → 해제 → 리셋 · 기동 → 복구 카드'],
            notes: '<p>모둠마다 다른 설비를 쓰게 하면 서로 영향이 없습니다. 끝나면 스위치 점검.</p>' },
          { layout: 'quiz', title: '확인 문제', q: '에어 차단 후 올바른 복구 순서는?', options: ['리셋 → 기동 → 에어 복구', '에어 복구 → 리셋 → 기동', '기동만', 'AI 에 재가동 요청'], answer: 1, explain: '원인 제거가 먼저입니다.', notes: '<p>"리셋이 안 됐던 이유" 를 말하게 합니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['즉시 정지형 이상은 PLC · 안전 회로가 처리', '원인 제거 → 확인 → 리셋 → 기동', 'AI 는 안전 장치를 해제 · 우회하지 않는다', '정지 기록은 MES 알람 · 간트에 남는다'],
            notes: '<p>다음 교시: 품질 불합격 추적과 교대 인수인계 보고.</p>' },
        ],
      },
      {
        id: 'ch16-3', title: '품질 불합격 추적 · 교대 인수인계 보고', minutes: 50,
        goals: ['불합격 LOT 을 찾아 계보를 추적하고 원인 가설을 세운다', '품질 데이터와 설비 데이터를 연결한다', 'AI 도우미로 보고서 초안을 만들고 숫자를 화면에서 검증한다'],
        flow: [['도입 — 고객 클레임', 5], ['품질 데이터 연결', 5], ['사례 11', 18], ['사례 12', 17], ['정리 · 퀴즈', 5]],
        content: [
          { type: 'p', html: '<b>상황</b> — 출하 검사에서 적재함 하나가 <b>불합격</b> 판정을 받았습니다. 어느 설비에서, 언제, 왜 그랬을까요? 그리고 교대 시간이 다가옵니다. 다음 근무자에게 오늘 일을 정확히 넘겨야 합니다.' },
          { type: 'table', head: ['데이터', '화면', '알려 주는 것'], rows: [
            ['검사 LOT 판정', 'MES ⚑ 생산오더 · 공정', '어느 적재함이 합격 · 불합격인가'],
            ['불량 기록 · 사유별 합계', 'MES ◎ 품질', '무슨 불량이 많은가'],
            ['LOT 계보', 'MES ⛓ LOT 추적', '어느 설비 · 시각 · 작업지시인가'],
            ['이상 점수 · 알람', '예지보전 · MES 정비', '그때 설비 상태는 어땠나'],
            ['불량 파레토 · 설비별 OEE', '대시보드', '전체적으로 어디가 문제인가'],
          ], caption: '품질 원인 분석 = 이 다섯 화면을 시간으로 잇는 일' },
          { type: 'h', text: '사례 11 — 품질 불합격 LOT 추적' },
          { type: 'figure', html: LAB11 },
          { type: 'h', text: '사례 12 — 교대 인수인계 보고서' },
          { type: 'figure', html: LAB12 },
          { type: 'h', text: '인수인계 보고서 양식' },
          { type: 'table', head: ['항목', '내용(값)', '확인한 화면', '비고'], rows: [
            ['생산 현황', '계획 ○박스 중 ○박스(○ %)', '대시보드 · 생산계획서 진행', ''],
            ['설비 상태', '#1 운전 · #2 대기 …', 'MES AI 도우미 → 디스패치 보드', ''],
            ['알람 · 정비', '설비 알람 ○ · 정비 오더 ○ · 예지보전 알람 ○', 'MES 설비 · 알람 / 정비', ''],
            ['품질', '불합격 LOT ○ · 주요 불량 코드', 'MES 생산오더 · 품질', ''],
            ['수주 · 납기', '미출고 ○건 · 임박 ○ · 지연 ○', 'ERP AI 도우미 → 영업 · 수주', ''],
            ['다음 교대 할 일', '① … ② … ③ …', '(사람이 결정)', ''],
          ] },
          TP('<ul><li><b>수업 준비</b>: 불합격 LOT 이 필요하면 수업 30분 전 설비 #1 델타에 <span class="ui">수동 고장 주입</span> → 진공 누설 · 강도 0.8 · 지속 0 을 넣고 생산을 돌립니다. 픽 실패(MISSED_PICK)로 폐기가 늘면 적재함 검사(불량률 15 % 이하)를 넘는 LOT 이 생깁니다. 끝나면 정비 오더 종료나 이력 <span class="ui">종료</span> 로 고장을 정리합니다.</li><li><b>AI 키</b>: 키가 없으면 AI 도우미는 질문의 키워드로 도구를 골라 짧게 답합니다(규칙 기반). 같은 질문을 그대로 쓰게 하면 결과가 안정적입니다.</li><li><b>예상 결과</b>: 불합격 LOT 의 설비 = 델타 이상 점수가 높았던 설비, 주요 불량 코드 MISSED_PICK.</li><li><b>토론</b>: "AI 가 쓴 보고서를 그대로 올리면 안 되는 이유", "고객에게 불합격 원인을 설명할 때 필요한 근거 화면 세 가지".</li><li><b>평가 체크리스트</b>: □ 불합격(또는 대상) LOT 번호 · 설비 · 시각 □ 원인 가설 + 근거 화면 2개 □ 조치 기록 □ 보고서 6항목 □ 모든 숫자 옆 확인 화면 □ 짝 교차 검증</li></ul>'),
        ],
        practice: [],
        quiz: [
          { q: '불합격(REJECT) 판정을 받은 적재함 LOT 에 대한 설명으로 옳은 것은?',
            options: ['그대로 ERP 에 입고 · 출고된다', 'ERP 로 입고 · 출고되지 않고 폐기 · 재검사 대상이 된다', 'AI 가 자동으로 합격으로 바꾼다', '수주가 자동 취소된다'], answer: 1,
            explain: '불합격 LOT 은 실적 확인에서 수율 0(폐기)으로 처리되어 입고 · 출고되지 않습니다.' },
          { q: 'LOT 추적 결과로 알 수 <b>없는</b> 것은?',
            options: ['그 적재함을 만든 설비', '생산 시각', '연결된 작업지시', '그때 컨베이어 모터의 정확한 고장 원인'], answer: 3,
            explain: '고장 원인은 LOT 추적만으로는 알 수 없고, 그 시각의 예지보전 데이터 · 알람과 이어서 추정합니다.' },
          { q: 'AI 도우미로 인수인계 보고서 초안을 만들 때 가장 중요한 원칙은?',
            options: ['AI 답을 그대로 복사한다', '숫자는 해당 화면에서 확인하고, 할 일은 사람이 정한다', '키가 없으면 보고서를 쓸 수 없다', '질문을 최대한 모호하게 한다'], answer: 1,
            explain: 'AI 는 빠르게 모아 주지만 책임은 사람에게 있습니다. 숫자마다 확인한 화면을 적습니다.' },
          { q: '대시보드의 <b>불량 유형(파레토)</b> 그래프가 알려 주는 것은?',
            options: ['설비 위치', '어떤 불량 유형이 가장 많은지(큰 것부터)', '수주 금액', 'AI 모델 정확도'], answer: 1,
            explain: '파레토는 큰 원인부터 정렬해 먼저 손댈 곳을 보여 줍니다.' },
        ],
        slides: [
          { layout: 'title', title: '사례 11 · 12 — 품질과 인수인계', subtitle: '불합격 LOT 추적 · 교대 보고서', notes: '<p>도입: 고객 클레임 상황극 — "이 적재함 왜 불합격이죠?"</p>' },
          { layout: 'table', title: '품질 원인을 잇는 다섯 화면', head: ['데이터', '화면'], rows: [['검사 LOT', 'MES 생산오더'], ['불량 합계', 'MES 품질'], ['계보', 'MES LOT 추적'], ['설비 상태', '예지보전'], ['전체 경향', '대시보드']],
            notes: '<p>시간(생산 시각)이 다섯 화면을 잇는 열쇠라는 점을 강조.</p>' },
          { layout: 'diagram', title: '검사 LOT', html: SHOT('ch16_mes_insp', '검사 LOT'), notes: '<p>판정 칸의 ✖ 불합격을 찾는 법, LOT 번호 가운데 숫자 = 설비 번호.</p>' },
          { layout: 'diagram', title: 'LOT 추적', html: SHOT('mes_lots_trace', 'LOT 추적'), notes: '<p>적재함 ← 박스 ← 공작물. 💬 "이 정보만으로 원인을 알 수 있을까?" → 설비 데이터가 더 필요.</p>' },
          { layout: 'diagram', title: '불량 파레토', html: SHOT('ch16_dash_pareto', '불량 파레토'), notes: '<p>가장 큰 막대부터 손대는 것이 개선의 기본(파레토 원칙).</p>' },
          { layout: 'diagram', title: 'AI 도우미로 모으기', html: SHOT('ch16_mes_ai_handover', 'MES AI 도우미'), notes: '<p>답 아래 작은 글씨 = 조회한 도구. 규칙 기반은 질문 키워드로 도구를 고릅니다.</p>' },
          { layout: 'bullets', title: '실습 진행', bullets: ['사례 11: 검사 LOT → 품질 → LOT 추적 → 예지보전 → AI 도우미 → 파레토 → 가설 · 조치 기록', '사례 12: MES · ERP AI 도우미 질문 → 화면 검증 → 대시보드 → 보고서 6항목 → 짝 교차 검증'],
            notes: '<p>보고서 양식을 활동지로 나눠 줍니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: 'AI 도우미로 보고서를 만들 때 가장 중요한 원칙은?', options: ['그대로 복사', '숫자는 화면 확인, 할 일은 사람이', '키가 없으면 불가', '모호하게 질문'], answer: 1, explain: '책임은 사람에게 있습니다.', notes: '<p>교차 검증에서 발견한 불일치 사례를 공유합니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['품질 문제 = 품질 데이터 + 설비 데이터를 시간으로 잇기', '불합격 LOT 은 입고 · 출고되지 않는다', 'AI 는 모으고, 사람은 확인 · 결정', '보고서의 모든 숫자에는 근거 화면'],
            notes: '<p>다음 차시: 종합 미션 — 공장의 하루.</p>' },
        ],
      },
    ],
  });
})();
