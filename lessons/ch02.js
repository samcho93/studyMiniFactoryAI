/* 02 피지컬 AI — 로봇만이 아니다 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_LOOP = `<svg viewBox="0 0 700 300" role="img" aria-label="피지컬 AI 의 닫힌 루프: 물리 세계를 센서로 인식하고, AI 가 판단하고, 구동기로 행동하면 물리 세계가 바뀌고 다시 인식한다">
  ${ARROW('c02a1')}
  <rect x="250" y="110" width="200" height="80" rx="16" class="p1"/>
  <text x="350" y="146" text-anchor="middle" class="tx-w">물리 세계</text>
  <text x="350" y="168" text-anchor="middle" class="tx-w">설비 · 제품 · 공기 · 전기</text>
  <rect x="20" y="20" width="190" height="70" rx="14" class="p2s"/>
  <text x="115" y="50" text-anchor="middle" class="tx-b">① 인식 (Perceive)</text>
  <text x="115" y="72" text-anchor="middle" class="tx-m">카메라 · 진동 · 온도 · 압력</text>
  <rect x="490" y="20" width="190" height="70" rx="14" class="p3s"/>
  <text x="585" y="50" text-anchor="middle" class="tx-b">② 판단 (Decide)</text>
  <text x="585" y="72" text-anchor="middle" class="tx-m">모델 · 규칙 · 계획</text>
  <rect x="490" y="210" width="190" height="70" rx="14" class="p4s"/>
  <text x="585" y="240" text-anchor="middle" class="tx-b">③ 행동 (Act)</text>
  <text x="585" y="262" text-anchor="middle" class="tx-m">모터 · 밸브 · 로봇 · 명령</text>
  <rect x="20" y="210" width="190" height="70" rx="14" class="p5s"/>
  <text x="115" y="240" text-anchor="middle" class="tx-b">④ 결과 · 학습</text>
  <text x="115" y="262" text-anchor="middle" class="tx-m">바뀐 상태를 다시 측정</text>
  <line x1="212" y1="55" x2="486" y2="55" class="ln" stroke-width="2" marker-end="url(#c02a1)"/>
  <line x1="585" y1="92" x2="585" y2="206" class="ln" stroke-width="2" marker-end="url(#c02a1)"/>
  <line x1="488" y1="245" x2="214" y2="245" class="ln" stroke-width="2" marker-end="url(#c02a1)"/>
  <line x1="115" y1="208" x2="115" y2="94" class="ln" stroke-width="2" marker-end="url(#c02a1)"/>
  <text x="350" y="40" text-anchor="middle" class="tx-m">센서 데이터</text>
  <text x="350" y="268" text-anchor="middle" class="tx-m">물리적 변화</text>
</svg>`;

  const FIG_SCOPE = `<svg viewBox="0 0 700 320" role="img" aria-label="피지컬 AI 의 범위: 로봇은 일부일 뿐이고 설비 제어, 비전 검사, 자율 공정, 에너지, 전력망, 차량, 의료기기, 디지털트윈 제어도 포함">
  <ellipse cx="350" cy="165" rx="330" ry="145" class="p1s"/>
  <text x="350" y="40" text-anchor="middle" class="tx-b">피지컬 AI — 물리 세계를 인식 · 판단 · 행동하는 AI</text>
  <ellipse cx="350" cy="170" rx="70" ry="40" class="p4"/>
  <text x="350" y="166" text-anchor="middle" class="tx-w">로봇</text>
  <text x="350" y="186" text-anchor="middle" class="tx-w">(일부)</text>
  <rect x="60" y="70" width="170" height="40" rx="10" class="card-bg"/><text x="145" y="95" text-anchor="middle" class="tx">설비 · 공정 제어</text>
  <rect x="265" y="62" width="170" height="40" rx="10" class="card-bg"/><text x="350" y="87" text-anchor="middle" class="tx">비전 품질 검사</text>
  <rect x="470" y="70" width="170" height="40" rx="10" class="card-bg"/><text x="555" y="95" text-anchor="middle" class="tx">자율 공정 · 예지보전</text>
  <rect x="40" y="150" width="190" height="40" rx="10" class="card-bg"/><text x="135" y="175" text-anchor="middle" class="tx">에너지 · 냉난방(HVAC)</text>
  <rect x="470" y="150" width="190" height="40" rx="10" class="card-bg"/><text x="565" y="175" text-anchor="middle" class="tx">전력망 · 스마트 그리드</text>
  <rect x="60" y="230" width="170" height="40" rx="10" class="card-bg"/><text x="145" y="255" text-anchor="middle" class="tx">자율주행 · 드론</text>
  <rect x="265" y="240" width="170" height="40" rx="10" class="card-bg"/><text x="350" y="265" text-anchor="middle" class="tx">의료기기</text>
  <rect x="470" y="230" width="170" height="40" rx="10" class="card-bg"/><text x="555" y="255" text-anchor="middle" class="tx">디지털트윈 + 제어</text>
</svg>`;

  const FIG_VENN = `<svg viewBox="0 0 700 330" role="img" aria-label="피지컬 AI 와 제조 AI 의 벤 다이어그램: 겹치는 부분은 설비 예지보전, 비전 검사, 로봇 픽, 공정 제어">
  <circle cx="260" cy="170" r="150" class="p1s"/>
  <circle cx="440" cy="170" r="150" class="p3s"/>
  <text x="170" y="40" text-anchor="middle" class="tx-b">피지컬 AI</text>
  <text x="530" y="40" text-anchor="middle" class="tx-b">제조 AI</text>
  <text x="185" y="135" text-anchor="middle" class="tx-m">자율주행 · 드론</text>
  <text x="185" y="160" text-anchor="middle" class="tx-m">가정용 로봇</text>
  <text x="185" y="185" text-anchor="middle" class="tx-m">스마트 그리드</text>
  <text x="185" y="210" text-anchor="middle" class="tx-m">의료기기</text>
  <text x="350" y="115" text-anchor="middle" class="tx-b">겹치는 영역</text>
  <text x="350" y="142" text-anchor="middle" class="tx">설비 예지보전</text>
  <text x="350" y="166" text-anchor="middle" class="tx">비전 검사 · 검출</text>
  <text x="350" y="190" text-anchor="middle" class="tx">로봇 픽 · 적재</text>
  <text x="350" y="214" text-anchor="middle" class="tx">공정 · 에너지 제어</text>
  <text x="515" y="135" text-anchor="middle" class="tx-m">수요 예측</text>
  <text x="515" y="160" text-anchor="middle" class="tx-m">생산계획 초안</text>
  <text x="515" y="185" text-anchor="middle" class="tx-m">재고 · MRP 분석</text>
  <text x="515" y="210" text-anchor="middle" class="tx-m">문서 · 보고 요약</text>
  <text x="350" y="315" text-anchor="middle" class="tx-m">이 플랫폼은 가운데(겹치는 영역)와 오른쪽(계획 · 업무 AI)을 모두 다룹니다</text>
</svg>`;

  const FIG_TWIN = `<svg viewBox="0 0 700 250" role="img" aria-label="디지털트윈과 시뮬레이션: 가상 공장에서 데이터와 고장을 만들어 AI 를 학습하고 실제 공장에 적용한다. 그 사이의 차이가 sim-to-real 격차">
  ${ARROW('c02a2')}
  <rect x="20" y="40" width="240" height="160" rx="16" class="p2s"/>
  <text x="140" y="75" text-anchor="middle" class="tx-b">가상 공장(디지털트윈)</text>
  <text x="140" y="105" text-anchor="middle" class="tx-m">시뮬레이터 · 3D</text>
  <text x="140" y="128" text-anchor="middle" class="tx-m">합성 데이터 · 가상 고장</text>
  <text x="140" y="151" text-anchor="middle" class="tx-m">안전하게 · 빠르게 · 많이</text>
  <rect x="440" y="40" width="240" height="160" rx="16" class="p4s"/>
  <text x="560" y="75" text-anchor="middle" class="tx-b">실제 공장</text>
  <text x="560" y="105" text-anchor="middle" class="tx-m">센서 잡음 · 마모 · 사람</text>
  <text x="560" y="128" text-anchor="middle" class="tx-m">데이터가 적고 고장은 드묾</text>
  <text x="560" y="151" text-anchor="middle" class="tx-m">실수의 비용이 큼</text>
  <line x1="264" y1="100" x2="436" y2="100" class="ln" stroke-width="2" marker-end="url(#c02a2)"/>
  <text x="350" y="90" text-anchor="middle" class="tx">학습한 AI 적용</text>
  <line x1="436" y1="150" x2="264" y2="150" class="ln" stroke-width="2" marker-end="url(#c02a2)"/>
  <text x="350" y="172" text-anchor="middle" class="tx">실데이터로 보정</text>
  <text x="350" y="232" text-anchor="middle" class="tx-b">둘의 차이 = sim-to-real 격차 → 실장비에서 반드시 다시 검증</text>
</svg>`;

  const LAB_LOOP = `<div class="lab" data-lab="ch02-1-a">
  <div class="lab-head"><span class="lab-badge">실습 2-1</span><b>공장 라인에서 인식 → 판단 → 행동 찾기</b><span class="lab-meta">⏱ 15분 · 화면: 공장 라인</span></div>
  <p class="lab-goal">델타 로봇이 공작물을 집어 박스에 담는 한 장면을 피지컬 AI 루프(인식 · 판단 · 행동)로 나눠 봅니다.</p>
  <p class="lab-pre">실습 프로그램 실행. 설비 #1 이 운전 중이면 좋습니다(멈춰 있으면 3단계에서 기동).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">공장 라인</span> 을 엽니다. 위쪽 설비 칸에서 <b>설비 #1</b> 의 상태(<span class="ui">준비</span> · <span class="ui">운전</span> …)를 확인합니다.</div>
      ${SHOT('line_page', '공장 라인 화면')}
      <div class="lab-check">설비 칸마다 상태 · 생산 색이 보입니다. 오른쪽에 상위 명령 · 생산 · PLC 상태 · 안전 · 인터락 패널이 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">3D 화면 왼쪽 위 시점 버튼 중 <span class="ui">델타 셀 #1</span> 을 누릅니다.</div>
      ${SHOT('line_twin_delta', '델타 셀 시점')}
      <div class="lab-check">컨베이어 위의 공작물과 델타 로봇, 박스가 가까이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">설비 #1 이 <span class="ui">준비</span> 상태라면 오른쪽 <span class="ui">상위 명령</span> 에서 <span class="ui">설비 #1</span> 이 선택된 것을 보고 <span class="ui">기동</span> → 확인 대화상자에서 <span class="ui">기동</span> 을 누릅니다.</div>
      ${SHOT('line_cmd_confirm', '명령 확인 대화상자')}
      <div class="lab-check">상태가 <span class="ui">운전</span> 으로 바뀌고 컨베이어가 움직입니다. 이미 운전 중이면 이 단계는 건너뜁니다.</div>
      <div class="lab-tip">작업지시 없이 사람이 기동한 운전은 허용되지만 실적은 보류됩니다. 실습이 끝나면 정지해도 됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">3D 화면 오른쪽 아래 <b>카메라 A(공작물 검출)</b> 작은 화면을 봅니다.</div>
      ${SHOT('line_twin_cell', '카메라 A · B 화면')}
      <div class="lab-check">공작물 둘레에 검출 표시(사각형 · 각도)가 그려집니다 — <b>① 인식</b>: 카메라가 위치 · 각도를 찾았습니다.</div></li>
    <li class="lab-step"><div class="lab-do">델타 로봇이 움직이는 공작물을 <b>따라가며</b> 집어 박스 칸에 넣는 모습을 30초 동안 관찰합니다.</div>
      <div class="lab-check">공작물이 컨베이어를 따라 이동해도 델타가 정확히 집습니다 — <b>② 판단</b>(픽 위치 계산 · 컨베이어 이동량 보정) → <b>③ 행동</b>(델타 · 진공 흡착).</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 <span class="ui">PLC 상태 · 카운터</span> 에서 <b>박스 내 수량</b>(0~4)과 <b>적재함 박스 수</b>(0~5)를 지켜봅니다.</div>
      <div class="lab-check">박스가 4개가 되면 박스 컨베이어가 이동하고 UR3 가 박스를 적재함에 옮깁니다. 적재함이 5박스가 되면 출고됩니다 — 결과를 다시 센서 · 카운터로 <b>측정</b>합니다(④).</div></li>
    <li class="lab-step"><div class="lab-do">활동지에 표를 그리고 ① 인식 ② 판단 ③ 행동 ④ 결과 칸에 이 장면의 장비 · 신호를 하나씩 적습니다.</div>
      <div class="lab-check">예) ① 카메라 A ② 위치 · 각도 → 픽 좌표 계산 ③ 델타 · 진공 ON ④ 박스 내 수량 +1.</div></li>
  </ol>
  <div class="lab-result">한 번의 '집기' 동작 안에도 <b>인식 → 판단 → 행동 → 결과 측정</b> 의 닫힌 루프가 있습니다. 이것이 피지컬 AI 의 기본 구조입니다.</div>
  <div class="lab-q">카메라가 공작물을 잘못 인식하면(위치가 틀리면) 루프의 어느 단계에서 문제가 드러날까요?</div>
</div>`;

  const LAB_SCORE = `<div class="lab" data-lab="ch02-1-b">
  <div class="lab-head"><span class="lab-badge">실습 2-2</span><b>로봇이 아닌 피지컬 AI — 예지보전 루프 관찰</b><span class="lab-meta">⏱ 10분 · 화면: 예지보전 · MES</span></div>
  <p class="lab-goal">로봇을 움직이지 않는 피지컬 AI 를 찾습니다. 설비의 진동 · 전류 · 진공을 <b>인식</b>하고 이상 점수로 <b>판단</b>해 정비라는 <b>행동</b>으로 이어지는 루프입니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">예지보전</span> → <span class="ui">📊 보전 현황</span> 을 엽니다.</div>
      <div class="lab-check">위쪽에 특징 윈도우 · 추론(이상 점수) · 예지보전 알람 · 고장 이력 · 정비 오더 숫자가 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">가운데 표에서 <span class="ui">공급 컨베이어 #1</span> 이름을 누릅니다.</div>
      ${SHOT('ch02_pdm_conv', '공급 컨베이어 #1 이상 점수 추이')}
      <div class="lab-check">아래에 <b>이상 점수 추이</b> 그래프가 나옵니다. 점선(1.0)이 이상 기준선입니다.</div></li>
    <li class="lab-step"><div class="lab-do">이번에는 <span class="ui">델타 로봇 #1</span> 을 누르고 두 그래프를 비교합니다.</div>
      ${SHOT('ch02_pdm_delta', '델타 로봇 #1 이상 점수 추이')}
      <div class="lab-check">설비마다 점수의 높낮이와 변화가 다릅니다. 표의 칸 색(파랑 · 초록 · 노랑 · 빨강)과 ▲(알람) 표시도 확인합니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">MES</span> → <span class="ui">🔧 정비 · 예지보전</span> 을 엽니다.</div>
      ${SHOT('mes_maintenance', 'MES 정비 · 예지보전')}
      <div class="lab-check">예지보전 알람이 <b>근거 특징</b>(예: 진동 RMS z=…)과 함께 쌓이고, 정비 오더가 연결됩니다 — 판단이 <b>행동(정비)</b> 으로 이어지는 곳입니다.</div></li>
    <li class="lab-step"><div class="lab-do">활동지에 이 루프를 ① 인식(어떤 센서) ② 판단(무엇이 계산하나) ③ 행동(누가 무엇을) 으로 적습니다.</div>
      <div class="lab-check">예) ① 진동 · 전류 · 온도 · 진공 센서 ② AI 모델이 이상 점수 계산 · 알람 ③ 정비 오더 → 사람이 점검 · 정비, PLC 에 단계 신호.</div></li>
  </ol>
  <div class="lab-result">여기에는 로봇 팔이 등장하지 않습니다. 그래도 <b>물리 설비를 감지하고 판단해 물리적 조치로 이어지므로 피지컬 AI</b> 입니다.</div>
</div>`;

  const LAB_CLASS = `<div class="lab" data-lab="ch02-1-c">
  <div class="lab-head"><span class="lab-badge">실습 2-3</span><b>피지컬 AI 일까, 아닐까? — 분류 활동</b><span class="lab-meta">⏱ 8분 · 활동지</span></div>
  <p class="lab-goal">여러 사례를 <b>물리 세계를 감지하고 움직이는가?</b> 라는 기준으로 분류합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">다음 10개 사례를 '피지컬 AI' 와 '피지컬 AI 아님' 두 칸으로 나눕니다: ① 컨베이어 모터 진동으로 베어링 이상 감지 ② 메일 요약 챗봇 ③ 카메라로 불량품을 골라 밀어내는 장치 ④ 빌딩 냉난방을 사람 수 · 기온으로 자동 조절 ⑤ 영화 추천 ⑥ 자율주행 셔틀 ⑦ 인슐린 자동 주입기 ⑧ 생산계획 초안을 쓰는 LLM ⑨ 전력망 부하에 맞춘 배터리 충방전 ⑩ 창고 물류 로봇.</div>
      <div class="lab-check">분류를 마쳤습니다.</div></li>
    <li class="lab-step"><div class="lab-do">정답과 비교합니다: 피지컬 AI = ①③④⑥⑦⑨⑩ / 아님 = ②⑤⑧.</div>
      <div class="lab-check">로봇이 아닌 ①④⑦⑨ 도 피지컬 AI 에 들어간다는 점을 확인했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">⑧(생산계획 초안 LLM)은 피지컬 AI 가 아니지만 <b>제조 AI</b> 입니다. 왜 그런지 한 문장으로 적습니다.</div>
      <div class="lab-check">예) 물리 설비를 직접 감지 · 구동하지 않고, 데이터로 계획을 제안하기 때문입니다. 단, 사람이 확정하면 그 계획이 실제 설비 운전으로 이어집니다.</div></li>
  </ol>
  <div class="lab-result">피지컬 AI 를 가르는 기준은 '로봇인가' 가 아니라 <b>센서로 물리 세계를 인식하고, 그 판단이 물리적 행동으로 이어지는가</b> 입니다.</div>
</div>`;

  const LAB_FAULT = `<div class="lab" data-lab="ch02-2-a">
  <div class="lab-head"><span class="lab-badge">실습 2-4</span><b>가상 고장으로 루프 한 바퀴 돌려 보기</b><span class="lab-meta">⏱ 20분 · 화면: 가상 고장 · 예지보전 · MES</span></div>
  <p class="lab-goal">디지털트윈(시뮬레이터)에 보이지 않는 고장을 넣고, 센서 → 이상 점수 → 알람 → 정비 오더로 이어지는 피지컬 AI 루프를 처음부터 끝까지 지켜봅니다. 자세한 진단 방법은 12차시에서 배웁니다.</p>
  <p class="lab-pre">설비 #1 이 <b>운전</b> 중이어야 합니다(컨베이어가 돌아야 진동 · 전류 신호가 변합니다). 실습 2-1 의 3단계로 기동해 둡니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">가상 고장</span> 을 엽니다. <b>무작위 고장 만들기</b> 칸에서 설비 = <b>설비 #1</b>, 대상 = <b>컨베이어</b>, 발생 시각 = <b>10 ~ 60</b> 초, <b>블라인드(내용 숨김)</b> 체크를 확인합니다.</div>
      ${SHOT('ch02_fault_book', '무작위 고장 예약')}
      <div class="lab-check">입력이 끝났습니다. 고장의 유형 · 강도 · 진행 속도는 서버가 무작위로 정하고, 블라인드라 아직 아무도 모릅니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">🎲 무작위 고장 예약</span> 을 누릅니다.</div>
      <div class="lab-check">아래에 예약 안내 문장이 나오고 '예약 대기 1건' 이 보입니다. 잠시 뒤 설비 칸에 '진행 중 1건 (비공개 1)' 이 나타납니다.</div></li>
    <li class="lab-step"><div class="lab-do">아래 <b>고장 · 열화 이력</b> 표에서 방금 생긴 줄을 찾습니다.</div>
      ${SHOT('fault_sim_full', '고장 · 열화 이력')}
      <div class="lab-check">유형 칸이 <b>🔒 비공개</b>, 강도가 <b>?</b> 로 보입니다. 이 표가 AI 학습에 쓰는 <b>라벨의 출처</b>입니다.</div></li>
    <li class="lab-step"><div class="lab-do">5분 정도 기다린 뒤 <span class="ui">예지보전</span> → <span class="ui">📊 보전 현황</span> 에서 <span class="ui">공급 컨베이어 #1</span> 의 이상 점수 추이를 봅니다.</div>
      <div class="lab-check">점수가 점점 올라 1.0(점선)을 넘나듭니다. 진행이 느린 고장이면 더 오래 걸릴 수 있습니다 — 그동안 다음 단계를 읽어 둡니다.</div>
      <div class="lab-tip">점수가 1.0 이상인 상태가 15초(3윈도우) 이어지면 '주의' 알람, 1분(12윈도우) 이어지면 '위험' 알람이 생깁니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> → <span class="ui">🔧 정비 · 예지보전</span> 에서 새 예지보전 알람과 <b>근거 특징</b>을 확인합니다.</div>
      <div class="lab-check">설비 CONV-01 의 알람이 근거(예: 진동 RMS · 첨도 z-점수)와 함께 보입니다. 알람이 생기면 아래 <b>정비 오더</b> 목록에 '예지보전 알람 #…' 오더가 자동으로 요청됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">다시 <span class="ui">가상 고장</span> 이력 표에서 그 줄의 <span class="ui">공개</span> 를 누르고 확인합니다.</div>
      <div class="lab-check">숨겨졌던 고장 유형(예: 베어링 결함 · 불균형 · 벨트 …)과 강도가 나타납니다. 알람의 근거 특징과 맞는지 비교합니다.</div></li>
    <li class="lab-step"><div class="lab-do">이력 표에서 그 줄의 <span class="ui">종료</span> 를 눌러 고장을 끝냅니다. 실습을 마쳤으면 <span class="ui">공장 라인</span> 에서 설비 #1 을 <span class="ui">정지</span> 해도 됩니다.</div>
      <div class="lab-check">종료 칸에 시각이 찍히고, 몇 분 뒤 이상 점수가 1.0 아래로 내려옵니다.</div></li>
  </ol>
  <div class="lab-result">가상 공장에서 만든 고장 한 번으로 <b>인식(센서) → 판단(이상 점수 · 알람) → 행동(정비 오더) → 결과(점수 회복)</b> 루프를 모두 보았습니다. 실제 공장에서는 이런 고장 데이터를 얻기 어렵기 때문에 <b>디지털트윈 · 시뮬레이션</b> 이 피지컬 AI 학습의 중요한 도구가 됩니다.</div>
  <div class="lab-q">AI 가 '위험' 을 알렸다면 라인을 멈출지 결정하는 것은 누구(무엇)일까요?</div>
</div>`;

  const LAB_TWIN = `<div class="lab" data-lab="ch02-2-b">
  <div class="lab-head"><span class="lab-badge">실습 2-5</span><b>디지털트윈은 무엇을 보여 주고 무엇을 못 보여 줄까</b><span class="lab-meta">⏱ 10분 · 화면: 공장 라인 · 가상 고장</span></div>
  <p class="lab-goal">3D 디지털트윈 화면의 성격(읽기 전용 · 상태 반영)을 확인하고 실제 공장과의 차이(sim-to-real)를 정리합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 에서 <span class="ui">공장 전체</span> 시점을 누르고, 3D 화면을 마우스로 끌어 돌려 봅니다.</div>
      ${SHOT('line_twin_factory', '공장 전체 시점')}
      <div class="lab-check">시점만 바뀌고 로봇은 움직이지 않습니다. 3D 화면 아래 문구: <b>"3D 화면은 읽기 전용입니다"</b>.</div></li>
    <li class="lab-step"><div class="lab-do">3D 화면 위 <b>장비</b>(예: 델타 로봇)를 클릭합니다.</div>
      <div class="lab-check">장비의 상세 정보(상태 · 센서 값 등)가 열립니다. 클릭으로 장비를 조작할 수는 없습니다 — 안전을 위해 일부러 막아 둔 것입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">가상 고장</span> 화면의 <b>가상 하드웨어 스위치</b>(비상정지 버튼 · 안전 도어 · 에어 공급 · UR 보호정지)를 찾아 이름만 확인합니다(누르지 않습니다).</div>
      ${SHOT('fault_sim', '가상 고장 화면')}
      <div class="lab-check">시뮬레이터에서는 이런 하드웨어 신호도 가상으로 바꿀 수 있습니다. 실제 공장에서는 현장 스위치 · 배선이 담당합니다(16차시에서 실습).</div></li>
    <li class="lab-step"><div class="lab-do">활동지에 '시뮬레이터가 잘하는 것' 과 '실제 공장에서 다시 확인해야 할 것' 을 세 개씩 적습니다.</div>
      <div class="lab-check">예) 잘하는 것: 고장을 안전하게 반복, 데이터 대량 생성, 처음부터 다시 / 다시 확인: 센서 잡음 · 설치 위치, 실제 마모 패턴, 사람 · 안전 절차.</div></li>
  </ol>
  <div class="lab-result">디지털트윈은 피지컬 AI 를 <b>안전하게 · 빠르게 · 많이</b> 연습하게 해 주지만, 실제 장비와의 차이(sim-to-real 격차)가 있으므로 <b>현장 검증</b>이 반드시 필요합니다. 이 플랫폼도 실장비 연동은 아직 검증 전입니다.</div>
</div>`;

  const QUIZ1 = [
    { q: '<b>피지컬 AI</b> 에 대한 설명으로 가장 알맞은 것은?',
      options: ['로봇 팔에 들어간 AI 만을 말한다', '센서로 물리 세계를 인식하고 판단해 물리적 행동으로 이어지는 AI 전체를 말한다', '화면 속 글과 그림을 만드는 AI 를 말한다', '인터넷 검색을 잘하는 AI 를 말한다'],
      answer: 1, explain: '피지컬 AI 는 로봇 기술만이 아닙니다. 설비 제어 · 비전 검사 · 에너지 제어 · 의료기기처럼 물리 세계와 상호작용하는 AI 전체입니다.' },
    { q: '다음 중 로봇은 아니지만 <b>피지컬 AI</b> 에 해당하는 것은?',
      options: ['메일 요약 챗봇', '진동 센서로 모터 베어링 이상을 감지해 정비를 요청하는 시스템', '영화 추천 서비스', '번역 앱'],
      answer: 1, explain: '진동(물리 신호)을 인식하고 판단해 정비라는 물리적 조치로 이어지므로 피지컬 AI 입니다.' },
    { q: '공장 라인 화면에서 카메라 A 가 공작물 위치 · 각도를 표시하는 것은 피지컬 AI 루프의 어느 단계인가요?',
      options: ['인식', '판단', '행동', '학습'], answer: 0,
      explain: '카메라 검출은 물리 세계를 데이터로 바꾸는 인식 단계입니다. 그 뒤 픽 좌표 계산(판단), 델타 이동 · 흡착(행동)이 이어집니다.' },
    { q: '예지보전 화면의 이상 점수 그래프에서 점선(1.0)이 뜻하는 것은?',
      options: ['설비 속도', '이상 판단 기준선', '생산 목표량', '온도 상한'], answer: 1,
      explain: '이상 점수 1.0 이 임계입니다. 1.0 이상이 일정 시간 이어지면 주의 · 위험 알람이 생깁니다.' },
  ];
  const QUIZ2 = [
    { q: '피지컬 AI 와 제조 AI 가 <b>겹치는</b> 영역의 예로 가장 알맞은 것은?',
      options: ['문서 요약', '설비 예지보전', '수요 예측 보고서', '영화 추천'], answer: 1,
      explain: '설비 예지보전 · 비전 검사 · 로봇 픽은 물리 세계를 다루는 제조 AI 이므로 두 영역에 모두 속합니다.' },
    { q: '가상 고장을 <b>블라인드</b>로 예약하면 어떻게 될까요?',
      options: ['고장이 일어나지 않는다', '유형 · 강도가 숨겨져, 데이터와 AI 로 찾아내야 한다', '고장 내용이 즉시 화면에 표시된다', '설비가 바로 비상정지된다'],
      answer: 1, explain: '블라인드 고장은 정비로 해소하거나 공개하기 전까지 내용이 숨겨집니다. 예지보전 화면 · AI 로 분석하기로 찾아냅니다.' },
    { q: '디지털트윈 · 시뮬레이터로 학습한 AI 를 실제 공장에 그대로 쓰기 어려운 이유는?',
      options: ['3D 화면이 예쁘지 않아서', '실제 센서 잡음 · 마모 · 사람 같은 차이(sim-to-real 격차)가 있어서', '시뮬레이터는 데이터를 만들 수 없어서', '실제 공장에는 센서가 없어서'],
      answer: 1, explain: '가상과 현실의 차이 때문에 실장비에서 반드시 다시 검증해야 합니다. 이 플랫폼의 실장비 연동도 아직 미검증입니다.' },
    { q: '이 플랫폼의 3D 디지털트윈 화면에 대한 설명으로 옳은 것은?',
      options: ['3D 로봇을 끌면 실제 로봇이 움직인다', '읽기 전용 시각화로, 장비를 클릭하면 상세 정보만 열린다', '3D 화면에서 비상정지를 해제할 수 있다', '3D 화면은 실제 상태와 무관한 애니메이션이다'],
      answer: 1, explain: '3D 는 시뮬레이션(또는 실제) 상태를 보여 주는 읽기 전용 화면입니다. 드래그는 시점만 바꿉니다.' },
  ];

  PY_COURSE.addChapter({
    id: 'ch02', no: '02', title: '피지컬 AI — 로봇만이 아니다', subtitle: 'Physical AI',
    summary: '피지컬 AI 의 정의(인식 · 판단 · 행동)와 로봇 밖의 사례, 제조 AI 와의 관계를 다루고 플랫폼에서 피지컬 AI 루프를 직접 관찰합니다.',
    goals: ['피지컬 AI 를 인식 → 판단 → 행동의 닫힌 루프로 설명할 수 있다',
      '피지컬 AI 가 로봇 기술만이 아님을 사례로 설명할 수 있다',
      '피지컬 AI 와 제조 AI 의 관계를 말하고, 플랫폼에서 루프 한 바퀴를 관찰할 수 있다'],
    sections: [
      {
        id: 'ch02-1', title: '피지컬 AI 의 정의와 범위', minutes: 50,
        goals: ['피지컬 AI 의 정의와 닫힌 루프를 설명한다', '로봇이 아닌 피지컬 AI 사례를 3가지 이상 든다', '공장 라인 · 예지보전 화면에서 인식 · 판단 · 행동을 찾는다'],
        flow: [['도입 — 화면 밖으로 나온 AI', 5], ['개념 — 정의 · 루프 · 범위', 12], ['실습 2-1 라인 루프', 15], ['실습 2-2 예지보전 루프', 10], ['실습 2-3 분류 · 퀴즈', 8]],
        content: [
          { type: 'p', html: '챗봇은 글로 답하고, 이미지 AI 는 그림을 그립니다. 이런 AI 는 결과가 <b>화면 안</b>에 머뭅니다. 그런데 AI 의 판단이 모터를 돌리고, 밸브를 열고, 로봇 팔을 움직이고, 정비 작업을 부른다면 어떨까요? 이렇게 <mark>물리 세계를 센서로 인식하고 · 판단해서 · 물리적으로 행동하는 AI</mark> 를 <b>피지컬 AI(Physical AI)</b> 라고 합니다.' },
          { type: 'figure', html: FIG_LOOP, caption: '피지컬 AI 의 닫힌 루프 — 행동의 결과를 다시 측정해 다음 판단에 씁니다' },
          { type: 'table', head: ['', '디지털 AI (화면 속 AI)', '피지컬 AI'], rows: [
            ['입력', '글 · 이미지 · 표', '센서 신호(진동 · 영상 · 압력 · 온도 …)'],
            ['출력', '글 · 그림 · 답변', '모터 · 밸브 · 로봇 동작, 설비 명령, 정비 조치'],
            ['시간', '몇 초 늦어도 괜찮음', '실시간(밀리초~초)이 중요'],
            ['틀렸을 때', '다시 물어보면 됨', '설비 손상 · 불량 · <b>안전 사고</b> 위험'],
            ['그래서', '사람이 읽고 판단', '<b>안전 장치 · 사람 · PLC</b> 가 최종 결정'],
          ], caption: '피지컬 AI 는 틀렸을 때의 비용이 크기 때문에 안전 설계가 핵심입니다' },
          { type: 'callout', kind: 'warn', title: '⚠ 꼭 기억하세요 — 피지컬 AI 는 로봇 기술만을 뜻하지 않습니다', html: '"피지컬 AI = 휴머노이드 · 로봇" 이라고 오해하기 쉽습니다. 하지만 로봇은 피지컬 AI 의 <b>일부</b>일 뿐입니다. 설비 · 공정 제어, 카메라 품질 검사, 예지보전, 빌딩 냉난방, 전력망, 자율주행 차량, 의료기기, 디지털트윈 기반 제어처럼 <b>물리 세계를 감지하고 그 판단이 물리적 결과로 이어지는 모든 AI</b> 가 피지컬 AI 입니다. 이 강좌의 미니공장에서도 로봇(델타 · UR3)만이 아니라 <b>카메라 · 센서 · PLC · 정비 흐름</b> 전체가 피지컬 AI 를 이룹니다.' },
          { type: 'figure', html: FIG_SCOPE, caption: '피지컬 AI 의 범위 — 가운데 로봇은 일부일 뿐입니다' },
          { type: 'table', head: ['분야', '인식', '판단', '행동'], rows: [
            ['설비 · 공정 제어', '온도 · 압력 · 유량', '최적 설정값 계산', '밸브 · 히터 · 모터 조절'],
            ['비전 품질 검사', '카메라 영상', '양품 / 불량 판정', '불량품 배출 · 라인 알림'],
            ['예지보전', '진동 · 전류 · 온도', '이상 점수 · 고장 유형 추정', '정비 오더 · 단계 신호'],
            ['에너지 · 냉난방', '재실 인원 · 기온', '필요 냉난방량 예측', '공조기 · 조명 제어'],
            ['전력망', '부하 · 발전량', '수요 예측', '배터리 충방전 · 부하 분산'],
            ['차량 · 드론', '카메라 · 라이다', '경로 계획', '조향 · 가속 · 제동'],
            ['의료기기', '혈당 · 생체 신호', '투여량 계산', '약물 주입 · 경보'],
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_LOOP },
          { type: 'figure', html: LAB_SCORE },
          { type: 'figure', html: LAB_CLASS },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 설비 #1 을 미리 기동해 두면 실습 2-1 이 빨라집니다(공장 라인 → 기동). 학생 PC 마다 각자 실행본이면 학생이 직접 기동합니다.</li><li><b>핵심 메시지</b>: "피지컬 AI 는 로봇만이 아니다" — 도입과 정리에서 두 번 말하고, 실습 2-3 분류에서 로봇이 아닌 사례(①④⑦⑨)를 맞혔는지 확인합니다.</li><li><b>자주 막히는 곳</b>: 카메라 A 화면이 검게 보이면 설비가 멈춰 있는 것 — 기동 후 몇 초 기다립니다. 3D 가 느리면 위쪽에서 설비 대수를 줄이지 말고(다른 실습에 영향) 브라우저 탭을 하나만 엽니다.</li><li><b>확인 기준</b>: 실습 2-1 표 4칸, 실습 2-2 루프 3칸, 실습 2-3 정답 7개 이상.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: '피지컬 AI 의 정의와 범위', subtitle: '화면 밖으로 나온 AI', notes: '<p>💬 "AI 가 만든 결과가 화면 밖에서 무언가를 움직인 경험이 있나요?" — 로봇청소기, 자율주행, 스마트 에어컨 등.</p>' },
          { layout: 'diagram', title: '인식 → 판단 → 행동 → 결과', html: FIG_LOOP,
            notes: '<p>닫힌 루프를 손으로 원을 그리며 설명합니다. "행동의 결과를 다시 측정한다" 가 디지털 AI 와의 큰 차이입니다.</p>' },
          { layout: 'table', title: '디지털 AI vs 피지컬 AI', head: ['', '디지털 AI', '피지컬 AI'], rows: [
            ['입력', '글 · 이미지', '센서 신호'], ['출력', '답변 · 그림', '동작 · 명령 · 조치'], ['틀리면', '다시 물어봄', '설비 · 안전 위험']],
            notes: '<p>틀렸을 때의 비용 차이 → 그래서 피지컬 AI 는 안전 장치 · 사람 · PLC 가 최종 결정(3차시).</p>' },
          { layout: 'bullets', title: '피지컬 AI 는 로봇만이 아니다', lead: '물리 세계를 감지하고 움직이는 모든 AI', bullets: ['설비 · 공정 제어', '비전 품질 검사 · 예지보전', '에너지 · 냉난방 · 전력망', '자율주행 · 의료기기', '디지털트윈 + 제어 — 로봇은 그중 일부'],
            notes: '<p><b>이 장이 이번 차시의 핵심입니다.</b> 판서: "피지컬 AI ⊋ 로봇". 학생들이 휴머노이드만 떠올리지 않게 사례를 충분히 듭니다.</p>' },
          { layout: 'diagram', title: '피지컬 AI 의 범위', html: FIG_SCOPE, notes: '<p>💬 "우리 학교 건물 안에도 피지컬 AI 가 있을까요?" — 자동 조명, 냉난방, 엘리베이터 제어 등.</p>' },
          { layout: 'diagram', title: '미니공장 속 루프', html: SHOT('line_twin_cell', '카메라와 델타'), caption: '카메라 A(인식) → 픽 좌표(판단) → 델타 · 진공(행동)',
            notes: '<p>시연: 공장 라인 → 설비 #1 시점. 카메라 A 의 검출 표시를 가리키며 실습 2-1 을 안내합니다.</p>' },
          { layout: 'bullets', title: '실습 2-1 · 2-2 (25분)', bullets: ['라인: 델타 셀 시점 · 카메라 A · PLC 카운터', '① 인식 ② 판단 ③ 행동 ④ 결과 표 채우기', '예지보전: 이상 점수 추이(컨베이어 · 델타)', 'MES 정비: 알람 근거 → 정비 오더'],
            notes: '<p>실습 2-2 에서 "로봇 팔이 없어도 피지컬 AI" 임을 학생 입으로 말하게 합니다.</p>' },
          { layout: 'bullets', title: '실습 2-3 · 분류 활동', bullets: ['10개 사례 → 피지컬 AI / 아님', '정답: ①③④⑥⑦⑨⑩ / ②⑤⑧', '⑧ 계획 LLM = 제조 AI 지만 피지컬 AI 는 아님'],
            notes: '<p>모둠별로 분류 후 발표. ⑧ 에 대한 토론이 다음 차시(제조 AI 와의 관계)로 이어집니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[0].q, options: QUIZ1[0].options, answer: QUIZ1[0].answer, explain: QUIZ1[0].explain, notes: '<p>정답 공개 후 "로봇만이 아니다" 를 다시 한번 판서.</p>' },
          { layout: 'summary', title: '정리', bullets: ['피지컬 AI = 인식 → 판단 → 행동의 닫힌 루프', '로봇은 일부 — 설비 · 비전 · 에너지 · 의료 · 차량 …', '틀리면 물리적 비용 → 안전 설계가 핵심', '미니공장: 카메라 · 센서 · 델타 · 정비 흐름 모두 피지컬 AI'],
            notes: '<p>다음 시간: 피지컬 AI 와 제조 AI 의 관계, 가상 고장으로 루프 한 바퀴.</p>' },
        ],
      },
      {
        id: 'ch02-2', title: '피지컬 AI 와 제조 AI 의 관계', minutes: 50,
        goals: ['피지컬 AI 와 제조 AI 의 겹치는 영역과 다른 영역을 구분한다', '디지털트윈 · 시뮬레이션 · 합성 데이터의 역할과 한계를 설명한다', '가상 고장으로 피지컬 AI 루프 한 바퀴를 관찰한다'],
        flow: [['도입 — 지난 시간 ⑧ 사례', 5], ['개념 — 관계 · 디지털트윈 · 생성형 AI', 12], ['실습 2-4 가상 고장 루프', 20], ['실습 2-5 디지털트윈의 한계', 8], ['정리 · 퀴즈', 5]],
        content: [
          { type: 'h', text: '두 개념은 어떻게 겹칠까' },
          { type: 'p', html: '<b>제조 AI</b> 는 "제조라는 <b>분야</b>에 쓰는 AI" 이고, <b>피지컬 AI</b> 는 "물리 세계와 상호작용하는 <b>방식</b>의 AI" 입니다. 기준이 다르기 때문에 둘은 일부가 겹칩니다. 공장 설비를 감지하고 움직이는 AI(예지보전 · 비전 검사 · 로봇 픽 · 공정 제어)는 <b>둘 다</b>에 속하고, 생산계획 초안을 쓰는 LLM 은 제조 AI 이지만 피지컬 AI 는 아니며, 자율주행 차는 피지컬 AI 이지만 제조 AI 는 아닙니다.' },
          { type: 'figure', html: FIG_VENN, caption: '피지컬 AI 와 제조 AI — 겹치는 가운데가 스마트팩토리의 핵심입니다' },
          { type: 'table', head: ['구분', '피지컬 AI 에서 중요한 것', '제조 AI 에서 중요한 것'], rows: [
            ['데이터', '실시간 센서 · 영상, 잡음', '설비 · 공정 · 품질 · 계획 데이터의 연결'],
            ['평가', '안전 · 지연 시간 · 정확도', '비가동 · 불량 · 납기 · 비용 개선'],
            ['결정', 'PLC · 안전 회로 · 사람', '사람(계획 확정 · 정비 판단) · 시스템(ERP · MES)'],
            ['공통', '현장 검증 · 근거 제시 · 사람의 최종 결정', ''],
          ] },
          { type: 'h', text: '디지털트윈 · 시뮬레이션 · 합성 데이터' },
          { type: 'figure', html: FIG_TWIN, caption: '가상 공장에서 연습 → 실제 공장 적용 → 실데이터로 보정' },
          { type: 'p', html: '실제 공장에서는 고장이 드물고, 일부러 고장을 낼 수도 없습니다. 그래서 피지컬 AI 는 <b>디지털트윈(가상 공장)</b> 에서 데이터를 만들고 연습하는 방식을 많이 씁니다. 이 플랫폼의 <b>시뮬레이터</b>는 PLC · 로봇 · 카메라 · 센서를 모두 흉내 내고, <span class="ui">가상 고장</span> 으로 불균형 · 베어링 · 벨트 · 진공 누설 · 흡착 패드 오염 같은 고장 데이터를 만들어 AI 학습의 <b>라벨</b>로 씁니다.' },
          { type: 'h', text: '생성형 AI 와 만나는 피지컬 AI' },
          { type: 'list', items: [
            '<b>말로 지시하는 공장</b>: 사람이 "오늘 레드 20박스" 라고 말하면 LLM 이 계획 초안을 만들고, 사람이 확정하면 설비가 그 계획대로 움직입니다(이 플랫폼의 AI 생산계획, 13차시).',
            '<b>설명하는 진단</b>: 이상 점수와 근거 데이터를 LLM 이 읽고 현장 작업자가 이해할 문장으로 원인 · 조치를 정리합니다(AI 로 분석하기 · AI 정비 권고, 12차시).',
            '<b>보고 · 인수인계</b>: 하루 생산 · 알람 · 정비 기록을 요약합니다(AI 도우미, 14 · 16차시).',
            '<b>더 큰 흐름</b>: 영상 · 센서 · 언어를 함께 이해하고 동작까지 만들어 내는 모델, 가상 세계에서 미리 학습하는 방식이 연구 · 개발되고 있습니다. 다만 현장에서는 언제나 <b>안전 장치와 사람의 확인</b>이 함께합니다.',
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_FAULT },
          { type: 'figure', html: LAB_TWIN },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 실습 2-4 는 설비가 <b>운전 중</b>이어야 점수가 오릅니다. 수업 시작 때 설비 #1 을 기동하고, 고장 예약을 수업 초반(개념 설명 전)에 미리 해 두면 관찰 시간이 넉넉합니다.</li><li><b>시간이 모자랄 때</b>: 고장 진행 속도가 느리면 알람까지 10분 이상 걸릴 수 있습니다. 교사가 <span class="ui">수동 고장 주입 (교수자 · 시연용)</span> 으로 베어링 결함 · 강도 0.8 을 넣어 시연하면 빠릅니다.</li><li><b>여러 학생이 한 서버를 쓸 때</b>: 모두 같은 설비에 고장을 넣으면 섞입니다. 모둠마다 설비 번호를 나눠 줍니다.</li><li><b>정리</b>: 실습 후 반드시 고장을 <span class="ui">종료</span> 합니다(다음 차시 데이터에 영향).</li><li><b>확인 기준</b>: 공개한 고장 유형과 알람 근거 특징을 짝지어 말할 수 있는가.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '피지컬 AI 와 제조 AI 의 관계', subtitle: '겹치는 영역 · 디지털트윈 · 생성형 AI', notes: '<p>지난 시간 ⑧(계획 LLM) 사례로 시작: "피지컬 AI 는 아니지만 제조 AI 다."</p>' },
          { layout: 'diagram', title: '두 원의 관계', html: FIG_VENN, notes: '<p>가운데 영역(예지보전 · 비전 · 로봇 픽 · 공정 제어)이 스마트팩토리의 핵심이라는 점을 강조.</p>' },
          { layout: 'two', title: '중요하게 보는 것', left: { title: '피지컬 AI', bullets: ['실시간 센서', '안전 · 지연', 'PLC · 안전 회로'] }, right: { title: '제조 AI', bullets: ['데이터 연결', '비가동 · 불량 · 납기', 'ERP · MES · 사람'] },
            notes: '<p>공통점: 현장 검증, 근거 제시, 사람의 최종 결정.</p>' },
          { layout: 'diagram', title: '디지털트윈과 sim-to-real', html: FIG_TWIN, notes: '<p>💬 "실제 공장에서 일부러 베어링을 망가뜨려 데이터를 모을 수 있을까?" → 그래서 가상 고장.</p>' },
          { layout: 'bullets', title: '생성형 AI + 피지컬 AI', bullets: ['말로 지시 → 계획 초안 → 사람 확정 → 설비 운전', '이상 점수 → 문장 진단 · 정비 권고', '생산 · 알람 기록 요약', '언제나 안전 장치와 사람의 확인'],
            notes: '<p>출처를 확인할 수 없는 시장 숫자 · 기업 사례는 들지 않습니다. 플랫폼 안의 예로 설명합니다.</p>' },
          { layout: 'diagram', title: '가상 고장 예약', html: SHOT('ch02_fault_book', '무작위 고장 예약'),
            notes: '<p>시연: 설비 #1 · 컨베이어 · 10~60초 · 블라인드 → 🎲 무작위 고장 예약. 미리 기동해 둔 설비여야 합니다.</p>' },
          { layout: 'bullets', title: '실습 2-4 · 루프 한 바퀴 (20분)', bullets: ['가상 고장 예약(블라인드)', '보전 현황: 컨베이어 #1 점수 추이', 'MES 정비: 알람 · 근거', '공개 → 유형 확인 → 종료'],
            notes: '<p>기다리는 동안 실습 2-5 를 먼저 진행해도 됩니다. 마지막에 반드시 종료.</p>' },
          { layout: 'bullets', title: '실습 2-5 · 디지털트윈의 한계', bullets: ['3D 는 읽기 전용 — 시점만 바뀜', '장비 클릭 = 상세 정보', '가상 하드웨어 스위치', '잘하는 것 / 다시 확인할 것 3개씩'],
            notes: '<p>"이 플랫폼도 실장비는 미검증" 이라는 점을 정직하게 말해 줍니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[2].q, options: QUIZ2[2].options, answer: QUIZ2[2].answer, explain: QUIZ2[2].explain, notes: '<p>sim-to-real 격차를 한 문장으로 말하게 합니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['제조 AI = 분야, 피지컬 AI = 방식 → 일부가 겹침', '겹치는 곳: 예지보전 · 비전 · 로봇 픽 · 공정 제어', '디지털트윈으로 안전하게 연습, 현장에서 다시 검증', '생성형 AI 가 지시 · 진단 · 보고를 돕고, 결정은 사람'],
            notes: '<p>다음 차시: 이 플랫폼을 인식 · 판단 · 행동 · 학습으로 해부하고 안전 원칙을 체험합니다.</p>' },
        ],
      },
    ],
  });
})();
