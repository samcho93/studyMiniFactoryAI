/* 11 AI 예지보전 ① 데이터와 이상 탐지 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_PIPE = `<svg viewBox="0 0 720 250" role="img" aria-label="예지보전 데이터 경로: 원시, 특징, 라벨, 데이터셋, 모델, 추론, 알람, 조치, 분석">
  ${ARROW('c11a1')}
  <rect x="10" y="30" width="100" height="62" rx="10" class="p1s"/><text x="60" y="56" text-anchor="middle" class="tx-b">① 원시</text><text x="60" y="76" text-anchor="middle" class="tx-m">센서 · 진동 · 카메라B</text>
  <rect x="135" y="30" width="100" height="62" rx="10" class="p2s"/><text x="185" y="56" text-anchor="middle" class="tx-b">② 특징</text><text x="185" y="76" text-anchor="middle" class="tx-m">5초 윈도우 요약</text>
  <rect x="260" y="30" width="100" height="62" rx="10" class="p3s"/><text x="310" y="56" text-anchor="middle" class="tx-b">③ 라벨</text><text x="310" y="76" text-anchor="middle" class="tx-m">고장 · 열화 이력</text>
  <rect x="385" y="30" width="100" height="62" rx="10" class="p4s"/><text x="435" y="56" text-anchor="middle" class="tx-b">④ 데이터셋</text><text x="435" y="76" text-anchor="middle" class="tx-m">학습 범위 정의</text>
  <rect x="510" y="30" width="100" height="62" rx="10" class="p5s"/><text x="560" y="56" text-anchor="middle" class="tx-b">⑤ 모델</text><text x="560" y="76" text-anchor="middle" class="tx-m">버전 · 지표 · 운영</text>
  <rect x="510" y="150" width="100" height="62" rx="10" class="p1s"/><text x="560" y="176" text-anchor="middle" class="tx-b">⑥ 추론</text><text x="560" y="196" text-anchor="middle" class="tx-m">이상 점수</text>
  <rect x="385" y="150" width="100" height="62" rx="10" class="p2"/><text x="435" y="176" text-anchor="middle" class="tx-w">⑦ 알람</text><text x="435" y="196" text-anchor="middle" class="tx-w">주의 · 위험</text>
  <rect x="260" y="150" width="100" height="62" rx="10" class="p3s"/><text x="310" y="176" text-anchor="middle" class="tx-b">⑧ 조치</text><text x="310" y="196" text-anchor="middle" class="tx-m">MES 정비 오더</text>
  <rect x="135" y="150" width="100" height="62" rx="10" class="p4s"/><text x="185" y="176" text-anchor="middle" class="tx-b">⑨ 분석</text><text x="185" y="196" text-anchor="middle" class="tx-m">AI 로 분석하기 기록</text>
  <line x1="111" y1="61" x2="131" y2="61" class="ln" stroke-width="2" marker-end="url(#c11a1)"/>
  <line x1="236" y1="61" x2="256" y2="61" class="ln" stroke-width="2" marker-end="url(#c11a1)"/>
  <line x1="361" y1="61" x2="381" y2="61" class="ln" stroke-width="2" marker-end="url(#c11a1)"/>
  <line x1="486" y1="61" x2="506" y2="61" class="ln" stroke-width="2" marker-end="url(#c11a1)"/>
  <line x1="560" y1="93" x2="560" y2="146" class="ln" stroke-width="2" marker-end="url(#c11a1)"/>
  <line x1="509" y1="181" x2="489" y2="181" class="ln" stroke-width="2" marker-end="url(#c11a1)"/>
  <line x1="384" y1="181" x2="364" y2="181" class="ln" stroke-width="2" marker-end="url(#c11a1)"/>
  <line x1="259" y1="181" x2="239" y2="181" class="ln" stroke-width="2" marker-end="url(#c11a1)"/>
  <text x="660" y="66" class="tx-m">학습</text>
  <text x="660" y="186" class="tx-m">운영</text>
  <text x="360" y="240" text-anchor="middle" class="tx-m">모든 단계가 DB 테이블로 남아 "이 알람은 어떤 데이터 · 모델에서 왔나" 를 거꾸로 따라갈 수 있습니다.</text>
</svg>`;

  const FIG_WINDOW = `<svg viewBox="0 0 720 260" role="img" aria-label="5초 윈도우의 원시 신호를 특징 숫자 몇 개로 요약하는 과정">
  ${ARROW('c11a2')}
  <rect x="10" y="20" width="300" height="150" rx="12" class="card-bg"/>
  <text x="160" y="44" text-anchor="middle" class="tx-b">원시 신호 (5초)</text>
  <polyline points="25,110 40,80 55,130 70,75 85,125 100,85 115,120 130,70 145,135 160,80 175,118 190,72 205,128 220,90 235,112 250,76 265,130 280,88 295,108" fill="none" class="s1" stroke-width="2"/>
  <text x="160" y="160" text-anchor="middle" class="tx-m">진동 수천 점 + 전류 · 온도 · 진공 …</text>
  <line x1="315" y1="95" x2="385" y2="95" class="ln" stroke-width="2.5" marker-end="url(#c11a2)"/>
  <text x="350" y="85" text-anchor="middle" class="tx-m">요약</text>
  <rect x="390" y="20" width="320" height="150" rx="12" class="p1s"/>
  <text x="550" y="44" text-anchor="middle" class="tx-b">특징 (한 줄 = 윈도우 1개)</text>
  <text x="405" y="72" class="tx">• 진동 RMS(세기) · 첨도(충격) · 크레스트</text>
  <text x="405" y="96" class="tx">• 주파수 대역 에너지 4개(0–1000 Hz)</text>
  <text x="405" y="120" class="tx">• 전류 · 온도 평균 / 진공 · 에어압</text>
  <text x="405" y="144" class="tx">• 벨트 사행 · 패드 오염(카메라 B) · 픽 실패율</text>
  <rect x="10" y="190" width="700" height="56" rx="10" class="card-bg"/>
  <text x="360" y="214" text-anchor="middle" class="tx">같은 줄에 <tspan class="tx-b">설비 · 시각 · 운전 조건(가동 비율 · 작업지시)</tspan> 과 <tspan class="tx-b">라벨</tspan>(정상 / 고장 유형 / 회복 구간)이 함께 저장</text>
  <text x="360" y="236" text-anchor="middle" class="tx-m">설비가 절반 이상 운전한 윈도우만 AI 가 평가합니다 — 멈춰 있는 설비는 점수가 나오지 않습니다</text>
</svg>`;

  const FIG_NORMAL = `<svg viewBox="0 0 720 280" role="img" aria-label="정상 데이터만으로 학습한 뒤 새 데이터가 정상 무리에서 멀리 떨어질수록 이상 점수가 커진다">
  <rect x="10" y="10" width="400" height="260" rx="12" class="card-bg"/>
  <text x="210" y="34" text-anchor="middle" class="tx-b">정상 윈도우만 모아 "평소 모습" 을 배운다</text>
  <ellipse cx="180" cy="155" rx="95" ry="62" class="p1s"/>
  <circle cx="150" cy="140" r="4" class="p1"/><circle cx="170" cy="160" r="4" class="p1"/><circle cx="195" cy="150" r="4" class="p1"/><circle cx="210" cy="170" r="4" class="p1"/><circle cx="160" cy="180" r="4" class="p1"/><circle cx="185" cy="130" r="4" class="p1"/><circle cx="135" cy="165" r="4" class="p1"/><circle cx="225" cy="145" r="4" class="p1"/><circle cx="200" cy="190" r="4" class="p1"/><circle cx="145" cy="120" r="4" class="p1"/>
  <circle cx="250" cy="125" r="6" class="p3"/><text x="262" y="122" class="tx-m">조금 벗어남 → 점수 0.7</text>
  <circle cx="345" cy="70" r="7" class="p2"/><text x="300" y="58" class="tx-m">멀리 벗어남 → 점수 1.8</text>
  <text x="30" y="250" class="tx-m">축: 진동 RMS(가로) · 첨도(세로) 등 특징 여러 개</text>
  <rect x="425" y="10" width="285" height="260" rx="12" class="p1s"/>
  <text x="567" y="36" text-anchor="middle" class="tx-b">이상 점수 = 두 판정 중 큰 값</text>
  <text x="440" y="66" class="tx">① IsolationForest</text>
  <text x="452" y="86" class="tx-m">무작위로 나눠 빨리 고립되는 점일수록</text>
  <text x="452" y="104" class="tx-m">"드문 점" → 점수가 큼</text>
  <text x="440" y="134" class="tx">② 특징별 z-점수</text>
  <text x="452" y="154" class="tx-m">평소 평균에서 표준편차 몇 배 벗어났나</text>
  <text x="452" y="172" class="tx-m">→ 어느 특징이 원인인지 근거가 됨</text>
  <text x="567" y="208" text-anchor="middle" class="tx-b">1.0 = 임계(이상)</text>
  <text x="567" y="230" text-anchor="middle" class="tx-m">정상 데이터의 99.5 % 지점을 1.0 으로 맞춤</text>
  <text x="567" y="252" text-anchor="middle" class="tx-m">→ 정상인데 1.0 을 넘는 일은 드묾</text>
</svg>`;

  const FIG_LEVEL = `<svg viewBox="0 0 720 260" role="img" aria-label="이상 점수 1.0 이상이 3윈도우 연속이면 주의, 12윈도우 연속이면 위험, 3윈도우 연속 정상이면 해제">
  <rect x="40" y="20" width="660" height="170" rx="8" class="card-bg"/>
  <line x1="40" y1="110" x2="700" y2="110" class="s2" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="46" y="104" class="tx-m">1.0 (임계)</text>
  <polyline points="50,160 90,155 130,150 170,120 200,95 230,90 260,85 290,80 320,75 350,72 380,70 410,68 440,66 470,64 500,62 530,140 560,150 590,155 620,158 650,160 690,158" fill="none" class="s1" stroke-width="2.5"/>
  <rect x="200" y="30" width="60" height="26" rx="6" class="p3s"/><text x="230" y="48" text-anchor="middle" class="tx-b">주의</text>
  <rect x="470" y="30" width="60" height="26" rx="6" class="p2"/><text x="500" y="48" text-anchor="middle" class="tx-w">위험</text>
  <rect x="610" y="30" width="60" height="26" rx="6" class="p1s"/><text x="640" y="48" text-anchor="middle" class="tx-b">정상</text>
  <text x="200" y="210" class="tx-m">1.0 이상 3번 연속(15초) → 주의</text>
  <text x="430" y="210" class="tx-m">12번 연속(1분) → 위험</text>
  <text x="560" y="230" class="tx-m">1.0 아래 3번 연속 → 정상</text>
  <text x="50" y="250" class="tx-m">한 번 튄 점수는 무시 — "연속" 을 보는 이유: 오탐(헛알람)을 줄이기 위해</text>
</svg>`;

  const FIG_AUTO = `<svg viewBox="0 0 720 200" role="img" aria-label="운영 모델이 없는 설비는 정상 윈도우 120개가 모이면 자동으로 학습해 운영 등록하고 추론을 시작한다">
  ${ARROW('c11a3')}
  <rect x="10" y="40" width="150" height="80" rx="12" class="p1s"/><text x="85" y="72" text-anchor="middle" class="tx-b">정상 윈도우</text><text x="85" y="94" text-anchor="middle" class="tx-m">120개(약 10분 운전)</text>
  <rect x="200" y="40" width="150" height="80" rx="12" class="p2s"/><text x="275" y="72" text-anchor="middle" class="tx-b">자동 학습</text><text x="275" y="94" text-anchor="middle" class="tx-m">70% 학습 · 30% 검증</text>
  <rect x="390" y="40" width="150" height="80" rx="12" class="p3s"/><text x="465" y="72" text-anchor="middle" class="tx-b">모델 등록</text><text x="465" y="94" text-anchor="middle" class="tx-m">model_registry · 운영</text>
  <rect x="580" y="40" width="130" height="80" rx="12" class="p2"/><text x="645" y="72" text-anchor="middle" class="tx-w">추론 시작</text><text x="645" y="94" text-anchor="middle" class="tx-w">5초마다 점수</text>
  <line x1="161" y1="80" x2="196" y2="80" class="ln" stroke-width="2" marker-end="url(#c11a3)"/>
  <line x1="351" y1="80" x2="386" y2="80" class="ln" stroke-width="2" marker-end="url(#c11a3)"/>
  <line x1="541" y1="80" x2="576" y2="80" class="ln" stroke-width="2" marker-end="url(#c11a3)"/>
  <text x="360" y="150" text-anchor="middle" class="tx">고장 라벨이 5건 이상 쌓이면 <tspan class="tx-b">고장 분류 모델</tspan>도 함께 학습 → 알람에 "(○○ 의심)" 이 붙음</text>
  <text x="360" y="176" text-anchor="middle" class="tx-m">모델이 생기면 공장 라인 화면에 "예지보전 모델 자동 학습 · 운영 등록" 이벤트가 남습니다</text>
</svg>`;

  // ---------------------------------------------------------------- 실습 블록
  const LAB_OVERVIEW = `<div class="lab" data-lab="ch11-1-a">
  <div class="lab-head"><span class="lab-badge">실습 11-1</span><b>보전 현황 읽기 — 날짜 × 설비</b><span class="lab-meta">⏱ 12분 · 화면: 예지보전</span></div>
  <p class="lab-goal">보전 현황 화면에서 KPI · 날짜 × 설비 표 · 이상 점수 추이 그래프를 읽고, 가장 상태가 나쁜 설비를 찾습니다.</p>
  <p class="lab-pre">실습 프로그램 실행 중. 설비가 한 번 이상 운전해 데이터가 쌓여 있으면 좋습니다(없으면 공장 라인에서 <span class="ui">기동</span> 후 10분 운전).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">예지보전</span> 을 엽니다. 왼쪽에서 <span class="ui">📊 보전 현황</span> 이 선택돼 있는지 봅니다.</div>
      ${SHOT('pdm_overview', '예지보전 보전 현황')}
      <div class="lab-check">맨 위에 KPI 다섯 칸(특징 윈도우 · 추론 · 예지보전 알람 · 고장 · 열화 이력 · 정비 오더)이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">위쪽 <b>기간</b>을 <span class="ui">최근 7일</span>, <b>설비</b>를 <span class="ui">전체</span> 로 둡니다. 그다음 기간을 <span class="ui">최근 1일</span> 로 바꿔 KPI 숫자가 어떻게 바뀌는지 봅니다.</div>
      ${SHOT('ch11_overview_filters', '기간 · 설비 필터')}
      <div class="lab-check">기간을 줄이면 윈도우 · 추론 수가 줄어듭니다. 설비를 <span class="ui">설비 #1</span> 로 고르면 그 작업대의 컨베이어 · 델타만 남습니다.</div></li>
    <li class="lab-step"><div class="lab-do">KPI 를 활동지에 옮겨 적습니다: <b>특징 윈도우 수 / 추론 수(1.0 이상 몇 회) / 알람 / 라벨 / 정비 오더</b>.</div>
      <div class="lab-check">'추론(이상 점수)' 칸 아래 작은 글씨 <b>1.0 이상 n회</b> 를 찾았습니다. 이 숫자가 "AI 가 이상하다고 본 윈도우 수" 입니다.</div></li>
    <li class="lab-step"><div class="lab-do">표 <b>날짜별 · 설비별 보전 데이터</b> 를 봅니다. 칸마다 <b>최대 이상 점수 · 윈도우 수(창) · ▲알람 · 🔧정비</b> 가 적혀 있습니다.</div>
      ${SHOT('ch11_overview_heat', '날짜 × 설비 표')}
      <div class="lab-check">칸 색: 초록(0.7 미만) · 파랑(0.7~1.0) · 노랑(1.0~1.5) · 빨강(1.5 이상). 빨간 칸이 있는 설비 이름을 적습니다.</div>
      <div class="lab-tip">'-' 칸은 그날 데이터가 없거나(설비가 멈춤) 모델이 아직 없어 점수가 계산되지 않은 날입니다.</div></li>
    <li class="lab-step"><div class="lab-do">표 왼쪽의 설비 이름(예: <span class="ui">공급 컨베이어 #2</span>)을 누릅니다.</div>
      ${SHOT('ch11_overview_eq', '설비 하나의 이상 점수 추이')}
      <div class="lab-check">아래 <b>이상 점수 추이</b> 그래프가 그 설비 한 줄만 보여 줍니다. 점선이 1.0 임계선입니다.</div></li>
    <li class="lab-step"><div class="lab-do">그래프에서 점수가 점선(1.0) 위에 머문 구간을 찾아 시각을 적고, <span class="ui">전체 보기</span> 로 돌아갑니다.</div>
      <div class="lab-check">"○시 ○분부터 약 ○분 동안 1.0 이상" 처럼 적었습니다. 이 구간이 알람이 생긴 때와 같은지 실습 11-5 에서 확인합니다.</div></li>
  </ol>
  <div class="lab-result">보전 현황은 <b>날짜 × 설비</b> 한 장으로 "어느 설비가 언제부터 평소와 달랐나" 를 보여 줍니다. 숫자 하나(최대 이상 점수)와 기호(▲ 알람 · 🔧 정비)만 읽어도 우선순위를 정할 수 있습니다.</div>
  <div class="lab-q">최대 점수는 높은데 알람(▲)이 없는 칸은 왜 생길 수 있을까요? (힌트: 알람은 '연속' 을 봅니다)</div>
</div>`;

  const LAB_DB = `<div class="lab" data-lab="ch11-1-b">
  <div class="lab-head"><span class="lab-badge">실습 11-2</span><b>DB 탐색 — 데이터 경로를 따라가기</b><span class="lab-meta">⏱ 15분 · 화면: 예지보전 → DB 탐색</span></div>
  <p class="lab-goal">원시 → 특징 → 라벨 → 데이터셋 → 모델 → 추론 → 알람 → 조치 → 분석 테이블을 차례로 열어, 데이터가 어떻게 AI 로 이어지는지 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">왼쪽 <span class="ui">🗄 DB 탐색 · 내보내기</span> 를 엽니다. 맨 위 <b>데이터 경로</b> 상자들을 왼쪽부터 읽습니다.</div>
      ${SHOT('ch11_db_pipeline', '데이터 경로 상자')}
      <div class="lab-check">상자마다 <b>단계(원시 · 특징 …) · 테이블 이름 · 행 수 · 마지막 시각</b> 이 있습니다. 행 수를 활동지 표에 적습니다.</div>
      <div class="lab-tip">상자에 마우스를 올리면 그 테이블 설명이 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">원시 상자 <span class="ui">sensor_reading</span> 을 누릅니다. 아래 표에서 열 이름을 훑어봅니다.</div>
      <div class="lab-check">한 줄 = 한 시점의 센서 값(전류 · 온도 · 진공 …)과 운전 조건입니다. 1초에도 여러 줄이 쌓입니다.</div></li>
    <li class="lab-step"><div class="lab-do">특징 상자 <span class="ui">feature_window</span> 를 누르고, 아래 <b>설비</b>를 <span class="ui">공급 컨베이어 #2</span> 로 고릅니다.</div>
      ${SHOT('ch11_db_feature', 'feature_window 표')}
      <div class="lab-check"><code>features</code> 열에 특징 숫자들, <code>label</code> 열에 <b>normal</b> 또는 고장 유형(bearing 등)이 보입니다. 한 줄 = 5초 윈도우 하나.</div></li>
    <li class="lab-step"><div class="lab-do">라벨 상자 <span class="ui">fault_injection_event</span> 를 누릅니다.</div>
      ${SHOT('ch11_db_fault', '고장 · 열화 이력 표')}
      <div class="lab-check">고장 유형 · 강도 · 시작 · 종료 · 출처(manual · random · scheduled)가 있습니다. 이 기록이 feature_window 의 <b>라벨의 출처</b>입니다.</div></li>
    <li class="lab-step"><div class="lab-do">모델 상자 <span class="ui">model_registry</span> 를 누릅니다.</div>
      ${SHOT('ch11_db_model', '모델 레지스트리 표')}
      <div class="lab-check"><code>anomaly-CONV-02</code>(이상 탐지)처럼 설비마다 모델이 있고, <code>classifier-…</code>(고장 분류)가 있는 설비도 있습니다. <code>status</code> 가 운영(PRODUCTION)인 모델이 지금 쓰이는 모델입니다.</div></li>
    <li class="lab-step"><div class="lab-do">추론 상자 <span class="ui">inference_result</span> 를 누르고 <b>행 수</b>를 <span class="ui">최근 20</span> 으로 바꿉니다.</div>
      ${SHOT('ch11_db_inference', '추론 결과 표')}
      <div class="lab-check">윈도우마다 <code>anomaly_score</code>(이상 점수) · <code>level</code>(NORMAL · WARNING · CRITICAL) · <code>fault_probs</code>(고장 유형 확률)가 적혀 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">알람 상자 <span class="ui">pdm_alert</span>, 조치 상자 <span class="ui">maintenance_order</span>, 분석 상자 <span class="ui">pdm_analysis</span> 를 차례로 엽니다.</div>
      ${SHOT('ch11_db_alert', '알람 표')}
      <div class="lab-check">알람의 <code>evidence</code> 열에 <b>근거 특징</b>(z 값)이, 정비 오더에 연결된 알람 · 설명이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">활동지에 화살표 그림(원시 → … → 분석)을 그리고 상자마다 행 수를 적습니다.</div>
      <div class="lab-check">위로 갈수록(원시) 행이 많고, 아래로 갈수록(알람 · 조치) 적다는 것을 확인했습니다 — 수십만 줄의 데이터가 몇 건의 <b>조치</b>로 압축됩니다.</div></li>
  </ol>
  <div class="lab-result">예지보전 AI 는 한 덩어리 프로그램이 아니라 <b>테이블이 이어진 경로</b>입니다. 그래서 "이 알람은 어떤 윈도우 · 어떤 모델 버전에서 나왔나" 를 끝까지 추적할 수 있습니다.</div>
</div>`;

  const LAB_CSV = `<div class="lab" data-lab="ch11-1-c">
  <div class="lab-head"><span class="lab-badge">실습 11-3</span><b>학습용 CSV 내보내기</b><span class="lab-meta">⏱ 8분 · 화면: DB 탐색 · 엑셀</span></div>
  <p class="lab-goal">특징 + 라벨이 들어 있는 학습용 표를 CSV 로 내려받아 엑셀에서 열어 봅니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">DB 탐색 화면에서 <b>설비</b>를 <span class="ui">공급 컨베이어 #1</span> 로 고릅니다(전체로 두면 모든 설비).</div>
      <div class="lab-check">아래 표가 그 설비 행만 보여 줍니다. CSV 도 같은 설비로 걸러집니다.</div></li>
    <li class="lab-step"><div class="lab-do">표 제목 오른쪽 <span class="ui">⬇ 학습용 CSV(특징 + 라벨)</span> 을 누릅니다.</div>
      ${SHOT('ch11_db_csv', '학습용 CSV 버튼')}
      <div class="lab-check">브라우저 아래(또는 오른쪽 위)에 CSV 파일 내려받기가 표시됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">내려받은 파일을 엑셀(또는 한셀 · 구글 시트)로 엽니다.</div>
      <div class="lab-check">한글이 깨지지 않고 열립니다(UTF-8 BOM). 열: 시각 · 설비 · 운전 조건 · 특징들 · <b>label</b>.</div></li>
    <li class="lab-step"><div class="lab-do"><b>label</b> 열에 필터를 걸어 normal 과 고장 유형별 줄 수를 세어 봅니다.</div>
      <div class="lab-check">normal 이 압도적으로 많습니다. 이것이 "고장 데이터는 드물다" 는 제조 AI 의 현실입니다(1차시).</div></li>
    <li class="lab-step"><div class="lab-do">진동 RMS 열(vib_rms)을 골라 normal 줄과 고장 줄의 평균을 비교합니다(엑셀 AVERAGEIF 또는 정렬해서 눈으로).</div>
      <div class="lab-check">불균형 · 베어링 라벨 줄의 진동 값이 대체로 큽니다 — AI 가 쓰는 "근거" 를 사람도 확인할 수 있습니다.</div></li>
  </ol>
  <div class="lab-result">학습용 CSV 는 다른 도구(엑셀, 다른 AI 프로그램)로 가져가 분석하거나 수업 자료로 쓸 수 있는 <b>AI 학습용 표</b>입니다. 라벨은 고장 주입 이력에서 자동으로 붙습니다.</div>
</div>`;

  const LAB_SCORE = `<div class="lab" data-lab="ch11-2-a">
  <div class="lab-head"><span class="lab-badge">실습 11-4</span><b>이상 점수 · 단계 · 모델 기록 읽기</b><span class="lab-meta">⏱ 12분 · 화면: 예지보전</span></div>
  <p class="lab-goal">설비 하나를 골라 점수 → 단계 → 모델을 거꾸로 따라가며 AI 가 무엇을 근거로 판단했는지 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">📊 보전 현황</span> 표에서 가장 빨간 칸의 설비를 고르고, 그 설비 이름을 눌러 추이 그래프를 띄웁니다.</div>
      <div class="lab-check">점수가 1.0 점선을 넘나드는 모습이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">그래프에 마우스를 올려 <b>1.0 을 처음 넘은 시각</b>과 그 뒤 몇 칸(5초씩)이 연속으로 1.0 이상인지 셉니다.</div>
      <div class="lab-check">3칸 이상 연속이면 그 시점에 <b>주의</b>, 12칸 이상이면 <b>위험</b> 이 됐어야 합니다(위 그림의 규칙).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">🗄 DB 탐색 · 내보내기</span> → <span class="ui">inference_result</span>, 설비를 같은 설비로 고릅니다.</div>
      <div class="lab-check"><code>level</code> 열이 NORMAL → WARNING → CRITICAL 로 바뀌는 줄을 찾았습니다. 바로 앞 줄들의 점수가 1.0 이상인지 확인합니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 줄의 <code>model_id</code> 를 적고, <span class="ui">model_registry</span> 에서 그 번호의 모델을 찾습니다.</div>
      <div class="lab-check">모델 이름 · 버전 · 학습에 쓴 특징 · 지표(<code>metrics</code>: 학습 수 · 오탐률 · 고장별 검출률)가 보입니다.</div>
      <div class="lab-tip"><code>false_positive_rate</code>(오탐률)는 학습에 쓰지 않은 정상 데이터 중 1.0 을 넘은 비율입니다. 작을수록 헛알람이 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 화면에서 <span class="ui">dataset_version</span> 을 열어 모델이 어떤 기간 · 설비의 데이터로 학습했는지 확인합니다.</div>
      <div class="lab-check">데이터셋 → 모델 → 추론이 번호로 연결돼 있음을 확인했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">활동지에 "점수 → 단계 → 모델 → 데이터셋" 을 한 줄로 정리합니다.</div>
      <div class="lab-check">예: "CONV-02, 11:24 부터 1.0 이상 12윈도우 → 위험, 모델 anomaly-CONV-02 v1(오탐률 0.01), 데이터셋 #3 으로 학습".</div></li>
  </ol>
  <div class="lab-result">이상 점수는 <b>어떤 모델이 · 어떤 데이터로 배워 · 언제 계산했는지</b> 기록이 남습니다. 그래서 AI 의 판단을 사람이 검증할 수 있습니다.</div>
</div>`;

  const LAB_ALERT = `<div class="lab" data-lab="ch11-2-b">
  <div class="lab-head"><span class="lab-badge">실습 11-5</span><b>알람 → 정비 오더 연결 확인</b><span class="lab-meta">⏱ 12분 · 화면: MES → 정비 · 예지보전</span></div>
  <p class="lab-goal">예지보전 알람이 MES 정비 오더로 이어지는 흐름과, 알람의 <b>근거 특징</b>을 읽습니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">MES</span> → 왼쪽 <span class="ui">🔧 정비 · 예지보전</span> 을 엽니다.</div>
      ${SHOT('ch11_mes_alerts', '예지보전 알람 표')}
      <div class="lab-check">맨 위 <b>예지보전 알람</b> 표에 발생 · 설비 · 수준(주의/위험) · 내용 · 근거 특징 · 정비 오더 · 상태가 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">알람 하나의 <b>근거 특징</b> 칸을 읽습니다. 예: <code>진동 RMS (z=5.1), 대역 50–200 Hz (z=4.0)</code>.</div>
      <div class="lab-check">z 가 클수록 평소보다 많이 벗어난 특징입니다. 가장 큰 특징 하나를 적습니다 — 이것이 AI 가 내세운 <b>근거</b>입니다.</div></li>
    <li class="lab-step"><div class="lab-do">알람 <b>내용</b>에 "(○○ 의심)" 이 붙어 있는지 봅니다.</div>
      <div class="lab-check">붙어 있으면 고장 분류 모델이 유형을 추정한 것입니다(고장 라벨이 충분히 쌓인 설비만). 없으면 이상 탐지만 한 것입니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 줄의 <b>정비 오더</b> 칸을 봅니다. 번호(MO-…)가 있으면 아래 <b>정비 오더</b> 표에서 같은 번호를 찾습니다.</div>
      ${SHOT('ch11_mes_mo', '정비 오더 연결')}
      <div class="lab-check">정비 오더의 <b>출처</b>가 '예지보전' 이고, 내용에 알람 문장이 들어 있습니다. 알람이 생기면 정비 오더가 <b>자동으로</b> 만들어집니다.</div>
      <div class="lab-tip">연동이 잠시 밀리면 정비 오더 칸이 '-' 일 수 있습니다. 1~2분 뒤 다시 봅니다.</div></li>
    <li class="lab-step"><div class="lab-do">알람 상태가 <b>접수</b>인 줄의 <span class="ui">확인</span> 을 누릅니다(담당자가 알람을 봤다는 표시).</div>
      <div class="lab-check">상태가 <b>확인됨</b>으로 바뀝니다. 정비 오더는 그대로 남습니다 — 확인은 "봤다", 정비 오더 <span class="ui">종료</span> 는 "고쳤다" 입니다(12차시).</div></li>
    <li class="lab-step"><div class="lab-do">공장 라인 화면 오른쪽 위 <b>예지보전 단계</b> 표시(정상 · 주의 · 위험)를 확인합니다.</div>
      ${SHOT('line_page', '공장 라인 화면')}
      <div class="lab-check">설비의 가장 높은 단계가 PLC 로 <b>신호(0 정상 · 1 주의 · 2 위험)</b> 만 전달됩니다. 정지 여부는 PLC 와 사람이 정합니다.</div></li>
  </ol>
  <div class="lab-result">AI 의 판단(알람)은 <b>근거 특징과 함께</b> MES 정비 오더라는 <b>업무</b>로 이어지고, 현장에는 단계 신호만 전달됩니다. AI 가 설비를 직접 세우지 않습니다.</div>
  <div class="lab-q">알람이 너무 자주 울리면(오탐) 현장에서는 어떤 일이 생길까요? 연속 3윈도우 규칙은 이 문제를 어떻게 줄이나요?</div>
</div>`;

  const LAB_RUN = `<div class="lab" data-lab="ch11-2-c">
  <div class="lab-head"><span class="lab-badge">실습 11-6</span><b>운전해야 점수가 나온다 — 윈도우가 쌓이는 모습 보기</b><span class="lab-meta">⏱ 10분 · 화면: 공장 라인 · 예지보전</span></div>
  <p class="lab-goal">설비를 운전하면 5초마다 특징 윈도우와 이상 점수가 쌓이는 것을 숫자로 확인합니다.</p>
  <p class="lab-pre">교사가 정한 설비 하나(다른 모둠과 겹치지 않게)</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">예지보전</span> → <span class="ui">🗄 DB 탐색 · 내보내기</span> 의 <span class="ui">feature_window</span> · <span class="ui">inference_result</span> 상자 행 수를 적습니다.</div>
      <div class="lab-check">시작 숫자 두 개를 적었습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 에서 맡은 설비가 멈춰 있으면 명령 <span class="ui">기동</span> → 확인을 누릅니다(이미 운전 중이면 그대로).</div>
      ${SHOT('line_cmd_button', '기동 버튼')}
      <div class="lab-check">라인 상태가 RUNNING 이 되고 컨베이어가 움직입니다.</div></li>
    <li class="lab-step"><div class="lab-do">1분 기다린 뒤 DB 탐색 화면의 두 상자 행 수를 다시 적습니다(상자는 10초마다 새로 고쳐집니다).</div>
      <div class="lab-check">설비 하나당 1분에 약 12개씩(5초 × 12) 늘었습니다. 모델이 있는 설비는 inference_result 도 함께 늘어납니다.</div></li>
    <li class="lab-step"><div class="lab-do">공장 라인에서 <span class="ui">정지</span> → 확인을 누르고, 1분 뒤 다시 행 수를 봅니다.</div>
      <div class="lab-check">inference_result 가 거의 늘지 않습니다 — 설비가 절반 이상 운전한 윈도우만 AI 가 평가하기 때문입니다.</div>
      <div class="lab-tip">생산계획에 따라 돌고 있던 설비라면 정지 대신 관찰만 하고, 교사 지시에 따릅니다.</div></li>
  </ol>
  <div class="lab-result">AI 예지보전은 <b>설비가 일하는 동안의 데이터</b>로 판단합니다. 멈춘 설비는 "평소와 다르다" 를 판단할 근거가 없습니다. 새 설비는 정상 윈도우 120개(약 10분 운전)가 모여야 모델이 자동으로 생깁니다.</div>
</div>`;

  const QUIZ1 = [
    { q: '예지보전 데이터 경로에서 <b>라벨(정답)</b> 은 어디에서 올까요?',
      options: ['작업자가 매일 손으로 입력한다', '고장 · 열화 이력(fault_injection_event)', 'AI 모델이 스스로 만든다', 'ERP 수주 데이터'], answer: 1,
      explain: '가상 고장 · 무작위 열화의 시작 · 종료 기록이 그 시간대 특징 윈도우의 라벨이 됩니다.' },
    { q: '특징 윈도우(feature_window) 한 줄은 무엇을 뜻할까요?',
      options: ['센서 값 한 개', '5초 동안의 원시 신호를 요약한 특징 숫자들 + 운전 조건 + 라벨', '하루치 생산 실적', '모델 하나'], answer: 1,
      explain: '수천 개의 진동 점과 센서 값을 RMS · 첨도 · 대역 에너지 · 평균 같은 숫자 몇 개로 요약한 한 줄입니다.' },
    { q: '보전 현황 표의 칸 색이 <b>빨강</b>이라면?',
      options: ['그날 최대 이상 점수가 1.5 이상', '그날 데이터가 없음', '정비가 끝남', '모델이 없음'], answer: 0,
      explain: '초록(0.7 미만) · 파랑(0.7~1.0) · 노랑(1.0~1.5) · 빨강(1.5 이상)입니다. 칸의 숫자는 그날의 최대 점수입니다.' },
    { q: '학습용 CSV 에서 normal 줄이 고장 줄보다 훨씬 많은 이유로 알맞은 것은?',
      options: ['CSV 에 오류가 있어서', '현장에서 고장은 드물게 일어나기 때문', '고장 줄은 자동으로 지워져서', '엑셀이 일부만 보여 줘서'], answer: 1,
      explain: '고장 데이터 불균형은 제조 AI 의 대표적인 어려움입니다. 그래서 정상만으로 학습하는 이상 탐지부터 시작합니다.' },
  ];
  const QUIZ2 = [
    { q: '이 플랫폼에서 <b>주의</b> 알람이 생기는 조건은?',
      options: ['이상 점수가 한 번이라도 1.0 을 넘으면', '이상 점수 1.0 이상이 3윈도우(15초) 연속이면', '하루에 한 번 무조건', '정비 오더를 등록하면'], answer: 1,
      explain: '한 번 튄 값은 무시하고 3윈도우 연속일 때 주의, 12윈도우(1분) 연속이면 위험입니다. 1.0 아래가 3윈도우 연속이면 정상으로 돌아갑니다.' },
    { q: '이상 점수 1.0 의 뜻으로 가장 알맞은 것은?',
      options: ['고장 확률 100 %', '정상 데이터의 99.5 % 지점에 맞춘 임계 — 이보다 크면 평소와 다름', '정비까지 1시간 남음', '진동이 1 g'], answer: 1,
      explain: '정상 데이터로 점수를 맞춰 1.0 을 임계로 씁니다. 확률이나 남은 수명이 아닙니다.' },
    { q: '새로 늘린 설비에 예지보전 모델이 생기는 시점은?',
      options: ['설비를 추가하는 즉시', '정상 윈도우 120개(약 10분 운전)가 모이면 자동 학습', '고장이 한 번 나야', '교사가 파이썬으로 학습시켜야'], answer: 1,
      explain: '운영 모델이 없는 설비는 정상 데이터만으로 자동 학습 · 운영 등록됩니다. 고장 데이터가 없어도 시작할 수 있습니다.' },
    { q: '예지보전 알람이 생겼을 때 플랫폼이 <b>하지 않는</b> 일은?',
      options: ['MES 정비 오더를 자동으로 만든다', '근거 특징(z 값)을 함께 기록한다', 'PLC 에 단계 신호(주의 · 위험)를 보낸다', 'AI 가 직접 라인을 비상정지시킨다'], answer: 3,
      explain: 'AI 는 권고까지만 합니다. 정지 · 감속은 PLC 로직과 사람이 판단합니다.' },
  ];

  PY_COURSE.addChapter({
    id: 'ch11', no: '11', title: 'AI 예지보전 ① 데이터와 이상 탐지', subtitle: 'Predictive Maintenance — Data & Anomaly Detection',
    summary: '예지보전 화면에서 데이터가 원시 → 특징 → 모델 → 추론 → 알람 → 정비로 흐르는 과정을 따라가며, AI 이상 탐지가 어떻게 동작하는지 직접 확인합니다.',
    goals: ['보전 현황 화면에서 설비별 이상 점수 · 알람 · 정비 상태를 읽을 수 있다',
      'DB 탐색으로 예지보전 데이터 경로(원시 → 특징 → 라벨 → 모델 → 추론 → 알람 → 조치)를 따라갈 수 있다',
      '정상 데이터만으로 학습하는 이상 탐지와 이상 점수 · 알람 규칙을 설명할 수 있다'],
    sections: [
      {
        id: 'ch11-1', title: '예지보전 데이터 둘러보기', minutes: 50,
        goals: ['보전 현황의 KPI · 날짜 × 설비 표 · 추이 그래프를 읽는다', 'DB 탐색으로 예지보전 테이블을 차례로 연다', '학습용 CSV 를 내보내 열어 본다'],
        flow: [['도입 — 데이터는 어디로 가나', 5], ['개념 — 데이터 경로 · 특징 윈도우', 10], ['실습 11-1 보전 현황', 12], ['실습 11-2 DB 탐색', 13], ['실습 11-3 CSV', 6], ['정리 · 퀴즈', 4]],
        content: [
          { type: 'p', html: '1차시에서 "설비 데이터는 예지보전 화면에 쌓인다" 고 했습니다. 이번 차시에서는 그 데이터가 <b>어떤 모양으로 저장되고</b>, <b>어떻게 AI 의 입력이 되는지</b> 직접 따라가 봅니다. 예지보전(Predictive Maintenance)은 고장이 나기 전에 징후를 찾아 계획 정비로 바꾸는 일이고, 그 출발점은 <b>잘 정리된 데이터</b>입니다.' },
          { type: 'h', text: '데이터 경로 — 원시에서 조치까지' },
          { type: 'figure', html: FIG_PIPE, caption: '위 줄은 "학습", 아래 줄은 "운영" — 플랫폼의 DB 탐색 화면이 이 그림 그대로 테이블을 보여 줍니다' },
          { type: 'table', head: ['단계', '테이블', '무엇이 들어 있나'], rows: [
            ['원시', 'sensor_reading · vibration_window · vision_pdm_event', '센서 값(1~10 Hz) · 진동 파형 · 예지보전 카메라(B) 측정'],
            ['특징', 'feature_window', '5초 윈도우 요약 숫자 + 운전 조건 + 라벨'],
            ['라벨', 'fault_injection_event', '고장 · 열화 이력(가상 고장 · 무작위 열화) — 정답의 출처'],
            ['데이터셋', 'dataset_version', '어느 기간 · 설비 데이터로 학습했는지'],
            ['모델', 'model_registry', '설비별 이상 탐지 · 고장 분류 모델, 버전 · 지표 · 운영 여부'],
            ['추론', 'inference_result', '윈도우마다 이상 점수 · 단계 · 고장 유형 확률'],
            ['알람', 'pdm_alert', '주의 · 위험 알람과 근거 특징'],
            ['조치', 'maintenance_order', '알람에서 만들어진 MES 정비 오더'],
            ['분석', 'pdm_analysis', '✦ AI 로 분석하기 결과와 메모'],
          ] },
          { type: 'h', text: '특징 윈도우 — 5초를 숫자 몇 개로' },
          { type: 'figure', html: FIG_WINDOW, caption: '진동 파형처럼 큰 데이터는 그대로 AI 에 넣지 않고, 의미 있는 숫자(특징)로 요약합니다' },
          { type: 'p', html: '예를 들어 컨베이어 모터의 <b>진동 RMS</b> 는 흔들림의 세기, <b>첨도</b>는 "툭툭" 튀는 충격(베어링 결함의 신호), <b>주파수 대역 에너지</b>는 어느 높이의 소리가 커졌는지를 나타냅니다. 델타 로봇은 <b>진공압 · 픽 실패율</b>, 카메라 B 의 <b>흡착 패드 오염 · 벨트 사행</b>이 중요한 특징입니다.' },
          { type: 'callout', kind: 'info', title: '운전 조건과 라벨을 함께 저장하는 이유', html: '같은 진동이라도 설비가 멈춰 있을 때와 돌 때는 의미가 다릅니다. 그래서 윈도우마다 <b>가동 비율 · 작업지시</b> 같은 운전 조건을 함께 저장하고, 고장 이력이 있는 시간대에는 <b>라벨</b>(고장 유형, 고장 직후 90초는 recovery)을 붙입니다. 이렇게 정리된 표가 곧 <b>AI 학습용 데이터</b>입니다.' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_OVERVIEW },
          { type: 'figure', html: LAB_DB },
          { type: 'figure', html: LAB_CSV },
          { type: 'callout', kind: 'more', title: '📘 더 알아보기 — 무작위 열화(유지보수 포인트)', html: '가상 고장 화면의 설비 카드에 "무작위 열화(유지보수 포인트): 켜짐" 이 보이면, 시뮬레이터가 실제 공장처럼 <b>부품이 서서히 나빠지는 열화</b>를 저절로 만들어 냅니다(출처 = 무작위 열화). 정비 오더를 <span class="ui">종료</span> 하면 그 설비의 열화가 해소됩니다. 그래서 아무것도 하지 않아도 보전 현황에 노란 · 빨간 칸이 생길 수 있습니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 수업 1시간 전에 설비 1~2대를 운전해 두면(생산계획 또는 공장 라인 <b>기동</b>) 윈도우 · 추론 · 모델이 생깁니다. 처음 설치한 PC 는 모델이 없어 점수 칸이 모두 \'-\' 입니다 — 이때는 캡처로 설명하고 실습 11-6 으로 모델이 생기는 과정을 보여 줍니다.</li><li><b>시간 배분</b>: 실습 11-2 의 테이블이 많아 오래 걸립니다. 모둠별로 테이블을 나눠 맡고 발표하게 해도 됩니다.</li><li><b>자주 막히는 곳</b>: CSV 가 엑셀에서 한 칸에 몰려 보이면 \'데이터 → 텍스트 나누기(쉼표)\' 로 엽니다. 학교 PC 에 엑셀이 없으면 한셀 · 구글 시트.</li><li><b>발문</b>: "행 수가 수십만인데 정비 오더는 왜 몇 건뿐일까?" → AI 가 데이터를 압축해 사람이 볼 것만 남긴다.</li><li><b>확인 기준</b>: 데이터 경로 그림에 행 수 9개, 가장 나쁜 설비 1개와 그 근거(칸 색 · 점수).</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: '예지보전 데이터 둘러보기', subtitle: '원시 → 특징 → 라벨 → 모델 → 추론 → 알람 → 조치', notes: '<p>11~12차시는 플랫폼 AI 의 핵심인 예지보전입니다. 오늘은 데이터, 다음 교시는 AI 판단 방식.</p>' },
          { layout: 'diagram', title: '데이터 경로', html: FIG_PIPE, notes: '<p>위 줄(학습) · 아래 줄(운영)을 손으로 따라가며 설명합니다. 💬 "알람이 왜 울렸는지 따지려면 어디까지 거슬러 가야 할까?" → 원시 데이터까지.</p>' },
          { layout: 'diagram', title: '특징 윈도우', html: FIG_WINDOW, notes: '<p>비유: 5초짜리 동영상을 "밝기 · 움직임 · 소리 크기" 숫자 몇 개로 요약하는 것. RMS = 세기, 첨도 = 충격.</p><p>멈춘 설비는 평가하지 않는다는 점을 짚습니다(실습 11-6).</p>' },
          { layout: 'diagram', title: '보전 현황 화면', html: SHOT('pdm_overview', '보전 현황'), notes: '<p>시연: 기간 · 설비 필터 → KPI → 날짜 × 설비 표의 색 → 설비 이름 클릭.</p>' },
          { layout: 'table', title: '표의 칸 읽기', head: ['표시', '뜻'], rows: [['숫자', '그날 최대 이상 점수'], ['n창', '그날 특징 윈도우 수'], ['▲n', '예지보전 알람 수'], ['🔧n', '정비 오더 수'], ['색', '초록 <0.7 · 파랑 <1.0 · 노랑 <1.5 · 빨강 ≥1.5']],
            notes: '<p>"-" 칸은 데이터나 모델이 없는 날입니다.</p>' },
          { layout: 'diagram', title: 'DB 탐색 — 데이터 경로 상자', html: SHOT('ch11_db_pipeline', 'DB 탐색 데이터 경로'), notes: '<p>상자를 누르면 아래에 그 테이블이 열립니다. 설비 · 행 수 필터. 상자에 마우스를 올리면 설명.</p>' },
          { layout: 'bullets', title: '실습 11-1 · 11-2 · 11-3', bullets: ['11-1 보전 현황: KPI · 표 색 · 추이 그래프', '11-2 DB 탐색: 원시 → … → 분석, 행 수 적기', '11-3 학습용 CSV 내려받아 엑셀로', '모둠별로 테이블을 나눠 맡아도 좋음'],
            notes: '<p>실습 중 순회 포인트: feature_window 의 label 열, model_registry 의 status, pdm_alert 의 evidence.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[0].q, options: QUIZ1[0].options, answer: QUIZ1[0].answer, explain: QUIZ1[0].explain, notes: '<p>라벨이 사람이 아닌 "고장 이력" 에서 자동으로 온다는 점이 핵심입니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['예지보전 AI = 테이블이 이어진 데이터 경로', '특징 윈도우 = 5초 요약 + 운전 조건 + 라벨', '보전 현황: 날짜 × 설비 한 장으로 우선순위', '학습용 CSV 로 다른 도구에서도 분석'],
            notes: '<p>다음 교시: 이 데이터로 AI 가 "이상" 을 어떻게 판단하는지.</p>' },
        ],
      },
      {
        id: 'ch11-2', title: 'AI 이상 탐지와 알람', minutes: 50,
        goals: ['정상 데이터만으로 학습하는 이상 탐지와 이상 점수(1.0 임계)를 설명한다', '연속 윈도우 알람 규칙(주의 3 · 위험 12)을 화면 기록으로 확인한다', '알람 → 정비 오더 → PLC 단계 신호의 흐름을 확인한다'],
        flow: [['도입 — 정답 없이 배우기', 5], ['개념 — 이상 점수 · 알람 규칙 · 자동 학습', 12], ['실습 11-4 점수 · 모델', 12], ['실습 11-5 알람 → 정비', 12], ['실습 11-6 운전과 윈도우', 5], ['정리 · 퀴즈', 4]],
        content: [
          { type: 'h', text: '정답 없이 배우는 이상 탐지' },
          { type: 'p', html: '공장의 고장은 드뭅니다. "베어링 고장 데이터 1,000개" 를 모은 뒤에 AI 를 만들 수는 없습니다. 그래서 이 플랫폼은 <b>정상 데이터만으로 "평소 모습" 을 배우고</b>, 새 데이터가 평소와 얼마나 다른지를 <b>이상 점수</b>로 나타냅니다. 이것을 이상 탐지(Anomaly Detection)라고 합니다.' },
          { type: 'figure', html: FIG_NORMAL, caption: '정상 무리에서 멀리 떨어질수록 점수가 커집니다 — 두 가지 판정(IsolationForest · z-점수) 중 큰 값을 씁니다' },
          { type: 'list', items: [
            '<b>IsolationForest</b>: 데이터를 무작위로 여러 번 나눌 때 <b>빨리 따로 떨어지는 점</b>을 "드문 점" 으로 봅니다. 특징 여러 개의 조합을 한꺼번에 봅니다.',
            '<b>z-점수</b>: 특징 하나하나가 평소 평균에서 <b>표준편차 몇 배</b> 벗어났는지 봅니다. 알람의 <b>근거 특징</b>(z 값)이 여기서 나옵니다.',
            '<b>1.0 = 임계</b>: 학습에 쓴 정상 데이터의 99.5 % 지점을 1.0 으로 맞춥니다. 그래서 정상 운전에서 1.0 을 넘는 일은 드뭅니다.',
          ] },
          { type: 'h', text: '알람 규칙 — 한 번이 아니라 "연속" 을 본다' },
          { type: 'figure', html: FIG_LEVEL, caption: '1.0 이상 3윈도우(15초) 연속 → 주의, 12윈도우(1분) 연속 → 위험, 1.0 아래 3윈도우 연속 → 정상' },
          { type: 'p', html: '점수는 잡음 때문에 가끔 튈 수 있습니다. 한 번 튈 때마다 알람이 울리면 현장은 곧 알람을 무시하게 됩니다(<b>오탐</b>의 비용). 반대로 너무 오래 기다리면 고장을 늦게 찾습니다(<b>검출 지연</b>의 비용). 이 플랫폼은 "3윈도우 연속" 으로 둘 사이의 균형을 잡습니다.' },
          { type: 'h', text: '모델은 누가 만드나 — 자동 학습' },
          { type: 'figure', html: FIG_AUTO, caption: '사람이 코드를 쓰지 않아도 설비가 일하면 모델이 생깁니다' },
          { type: 'table', head: ['모델', '언제 생기나', '하는 일'], rows: [
            ['이상 탐지(anomaly-설비)', '정상 윈도우 120개가 모이면 자동', '이상 점수 · 단계(주의 · 위험)'],
            ['고장 분류(classifier-설비)', '고장 라벨 윈도우가 유형별 5개 이상', '알람에 "(베어링 결함 의심)" 처럼 유형 추정'],
          ], caption: '모델은 설비(공급 컨베이어 #n · 델타 로봇 #n)마다 따로 있습니다' },
          { type: 'h', text: '알람 다음에 일어나는 일' },
          { type: 'list', ordered: true, items: [
            '<b>알람 기록</b> — pdm_alert 에 수준 · 내용 · 근거 특징 3개(z 값)를 저장',
            '<b>정비 오더</b> — MES 에 예지보전 출처의 정비 오더가 자동으로 생성',
            '<b>단계 신호</b> — 설비의 PLC 로 정상 0 · 주의 1 · 위험 2 만 전달(정지 결정은 PLC 와 사람)',
            '<b>화면 표시</b> — 대시보드 · 공장 라인 · 예지보전 화면에 단계 · 알람 표시',
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_SCORE },
          { type: 'figure', html: LAB_ALERT },
          { type: 'figure', html: LAB_RUN },
          { type: 'callout', kind: 'warn', title: 'AI 점수는 "고장 확률" 이 아닙니다', html: '이상 점수 1.8 은 "고장 확률 180 %" 도 "1.8 시간 뒤 고장" 도 아닙니다. <b>평소와 얼마나 다른가</b>의 정도일 뿐입니다. 평소와 다른 이유가 제품 변경 · 속도 변경 같은 정상적인 변화일 수도 있으므로, 알람을 받으면 <b>근거 특징과 현장 상태를 사람이 확인</b>합니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 실습 11-4 · 11-5 는 알람이 하나 이상 있어야 합니다. 없으면 수업 30분 전에 <b>가상 고장 → 수동 고장 주입</b>(예: 설비 #1 · 베어링 결함 · 강도 0.8 · 지속 0)을 넣고 그 설비를 운전해 두세요. 수업 후 이력의 <span class="ui">종료</span> 로 끕니다.</li><li><b>실습 11-6</b>: 여러 모둠이 같은 설비를 기동 · 정지하지 않게 설비를 배정합니다. 생산계획으로 돌고 있는 설비는 정지시키지 않습니다.</li><li><b>오개념</b>: "AI 가 고장을 맞혔다/틀렸다" 가 아니라 "평소와 다르다" 를 알려 준다는 점. 정답 라벨 없이도 시작할 수 있다는 점.</li><li><b>발문</b>: "3윈도우가 아니라 1윈도우로 알람을 울리면?" → 헛알람이 많아짐. "30윈도우로 하면?" → 늦게 찾음.</li><li><b>확인 기준</b>: 실습 11-4 의 한 줄 정리(점수 → 단계 → 모델 → 데이터셋), 실습 11-5 의 근거 특징 1개와 정비 오더 번호.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: 'AI 이상 탐지와 알람', subtitle: '정상만으로 배우고, 연속으로 판단하고, 사람에게 넘긴다', notes: '<p>💬 도입: "고장 사진 없이 고장을 찾는 법이 있을까?" → 정상을 잘 알면 이상한 것을 찾을 수 있다.</p>' },
          { layout: 'diagram', title: '정상만으로 배우는 이상 탐지', html: FIG_NORMAL, notes: '<p>비유: 매일 같은 시간에 출근하는 친구가 오늘 2시간 늦으면 "무슨 일 있나?" — 정상 패턴을 알기에 이상을 안다.</p><p>두 판정 중 큰 값, z 는 근거가 된다는 점 강조.</p>' },
          { layout: 'diagram', title: '알람 규칙 — 연속을 본다', html: FIG_LEVEL, notes: '<p>오탐(헛알람)과 검출 지연의 균형. 💬 "1윈도우로 바꾸면?" "30윈도우로 바꾸면?"</p>' },
          { layout: 'diagram', title: '자동 학습', html: FIG_AUTO, notes: '<p>새 설비 → 정상 120 윈도우(약 10분 운전) → 자동 학습 · 운영 등록. 고장 분류 모델은 라벨이 쌓여야 생김.</p>' },
          { layout: 'two', title: '두 가지 모델', left: { title: '이상 탐지', bullets: ['정상만으로 학습', '이상 점수 · 주의 · 위험', '설비마다 하나'] }, right: { title: '고장 분류', bullets: ['고장 라벨이 필요', '유형 추정 "(○○ 의심)"', '라벨 5개 이상일 때'] },
            notes: '<p>model_registry 의 anomaly- · classifier- 이름을 실습 11-4 에서 찾게 합니다.</p>' },
          { layout: 'diagram', title: '알람 → 정비 오더', html: SHOT('ch11_mes_alerts', 'MES 예지보전 알람'), notes: '<p>시연: 근거 특징 칸, 정비 오더 칸, 확인 버튼. "확인 = 봤다, 종료 = 고쳤다".</p>' },
          { layout: 'bullets', title: '실습 11-4 · 11-5 · 11-6', bullets: ['11-4 점수 → 단계 → 모델 → 데이터셋 거꾸로', '11-5 알람 근거 특징 · 정비 오더 · 확인', '11-6 기동 → 1분 → 윈도우 · 추론 수 증가', '정지한 설비는 평가하지 않음'],
            notes: '<p>11-6 은 설비를 모둠별로 배정합니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[0].q, options: QUIZ2[0].options, answer: QUIZ2[0].answer, explain: QUIZ2[0].explain, notes: '<p>정답 뒤 "위험" · "정상 복귀" 조건까지 말하게 합니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[3].q, options: QUIZ2[3].options, answer: QUIZ2[3].answer, explain: QUIZ2[3].explain, notes: '<p>안전 원칙(3차시)과 연결합니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['정상만으로 학습 → 이상 점수(1.0 = 임계)', '3윈도우 연속 주의 · 12윈도우 위험', '정상 120윈도우면 자동 학습 · 운영 등록', '알람 → 근거 특징 · 정비 오더 · 단계 신호, 결정은 사람'],
            notes: '<p>다음 차시: 가상 고장을 직접 일으키고 AI 로 원인을 찾아 정비까지.</p>' },
        ],
      },
    ],
  });
})();
