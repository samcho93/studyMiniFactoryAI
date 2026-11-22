/* 17 종합 미션과 현장 적용 */
(function () {
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;

  const FIG_DAY = `<svg viewBox="0 0 700 260" role="img" aria-label="공장의 하루 미션 타임라인: 수요 접수, AI 계획, 확정과 생산, 고장 발생과 대응, 출고, 보고">
  ${ARROW('c17a1')}
  <line x1="30" y1="130" x2="680" y2="130" class="ln" stroke-width="3" marker-end="url(#c17a1)"/>
  <circle cx="70" cy="130" r="12" class="p1"/><text x="70" y="100" text-anchor="middle" class="tx-b">① 수요</text><text x="70" y="165" text-anchor="middle" class="tx-m">수주 가져오기</text><text x="70" y="183" text-anchor="middle" class="tx-m">영업/계획</text>
  <circle cx="180" cy="130" r="12" class="p2"/><text x="180" y="100" text-anchor="middle" class="tx-b">② AI 계획</text><text x="180" y="165" text-anchor="middle" class="tx-m">초안 · 재배정</text><text x="180" y="183" text-anchor="middle" class="tx-m">영업/계획</text>
  <circle cx="290" cy="130" r="12" class="p3"/><text x="290" y="100" text-anchor="middle" class="tx-b">③ 확정 · 생산</text><text x="290" y="165" text-anchor="middle" class="tx-m">관리자 승인</text><text x="290" y="183" text-anchor="middle" class="tx-m">생산(MES)</text>
  <circle cx="400" cy="130" r="12" class="p5"/><text x="400" y="100" text-anchor="middle" class="tx-b">④ 고장 발생</text><text x="400" y="165" text-anchor="middle" class="tx-m">교사가 주입</text><text x="400" y="183" text-anchor="middle" class="tx-m">보전</text>
  <circle cx="510" cy="130" r="12" class="p4"/><text x="510" y="100" text-anchor="middle" class="tx-b">⑤ 대응 · 품질</text><text x="510" y="165" text-anchor="middle" class="tx-m">정비 · LOT 확인</text><text x="510" y="183" text-anchor="middle" class="tx-m">보전 · 품질</text>
  <circle cx="620" cy="130" r="12" class="p1"/><text x="620" y="100" text-anchor="middle" class="tx-b">⑥ 출고 · 보고</text><text x="620" y="165" text-anchor="middle" class="tx-m">출고 · 보고서</text><text x="620" y="183" text-anchor="middle" class="tx-m">관리자</text>
  <text x="350" y="40" text-anchor="middle" class="tx-b">공장의 하루 — 50분 미션 (팀 5명)</text>
  <text x="350" y="235" text-anchor="middle" class="tx-m">AI 는 계획 초안 · 분석 · 권고 · 요약을 돕고, 확정 · 시작 · 정비 · 출고 판단은 역할 담당자가 합니다</text>
</svg>`;

  const FIG_SIMREAL = `<svg viewBox="0 0 700 300" role="img" aria-label="같은 화면과 흐름 아래 시뮬레이션 어댑터와 실장비 어댑터를 바꿔 끼우는 구조">
  ${ARROW('c17a2')}
  <rect x="150" y="15" width="400" height="50" rx="12" class="p1"/>
  <text x="350" y="46" text-anchor="middle" class="tx-w">웹 화면 · ERP · MES · 예지보전 AI (같음)</text>
  <rect x="200" y="85" width="300" height="50" rx="12" class="p2s"/>
  <text x="350" y="108" text-anchor="middle" class="tx-b">엣지 게이트웨이 — 어댑터 인터페이스</text>
  <text x="350" y="126" text-anchor="middle" class="tx-m">주소는 config/plc_map.yaml 하나에서만</text>
  <line x1="350" y1="67" x2="350" y2="81" class="ln" stroke-width="2" marker-end="url(#c17a2)"/>
  <rect x="20" y="165" width="310" height="120" rx="14" class="p3s"/>
  <text x="175" y="192" text-anchor="middle" class="tx-b">HW_MODE=sim (기본 · 이 강좌)</text>
  <text x="40" y="218" class="tx">• 시뮬레이터 PLC · 로봇 · 카메라 · 센서</text>
  <text x="40" y="242" class="tx">• 가상 고장 · 가상 스위치</text>
  <text x="40" y="266" class="tx">• 시뮬레이션 검증 완료</text>
  <rect x="370" y="165" width="310" height="120" rx="14" class="p5s"/>
  <text x="525" y="192" text-anchor="middle" class="tx-b">HW_MODE=real (실장비)</text>
  <text x="390" y="218" class="tx">• MELSEC PLC(MC 3E) · UR3(RTDE · Dashboard)</text>
  <text x="390" y="242" class="tx">• 카메라(OpenCV) · 델타는 스텁(제어기 미정)</text>
  <text x="390" y="266" class="tx">• 코드 · 문서만 — 실장비 미검증</text>
  <line x1="300" y1="137" x2="200" y2="161" class="ln" stroke-width="2" marker-end="url(#c17a2)"/>
  <line x1="400" y1="137" x2="500" y2="161" class="ln" stroke-width="2" marker-end="url(#c17a2)"/>
</svg>`;

  const LAB_ROLES = `<div class="lab" data-lab="ch17-1-a">
  <div class="lab-head"><span class="lab-badge">미션 준비</span><b>역할 카드 나누기와 시작 상태 확인</b><span class="lab-meta">⏱ 5분 · 팀 5명</span></div>
  <p class="lab-goal">팀원마다 역할과 책임 화면을 정하고, 미션 시작 전에 공장 상태를 함께 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">아래 역할 카드표를 보고 5개 역할을 나눕니다(4명이면 관리자가 품질을 겸함).</div>
      <div class="lab-check">팀원 이름 옆에 역할 · 담당 화면이 적혔습니다.</div></li>
    <li class="lab-step"><div class="lab-do">생산(MES) 담당: <span class="ui">공장 라인</span> 에서 설비 대수를 확인합니다(<span class="ui">1대</span> ~ <span class="ui">4대</span>). 교사가 정한 대수(보통 4대)로 맞춥니다.</div>
      ${SHOT('ch17_line_cells', '공장 라인 설비 대수')}
      <div class="lab-check">설비 대수와 모든 설비가 준비(READY) 또는 대기 상태입니다.</div></li>
    <li class="lab-step"><div class="lab-do">보전 담당: <span class="ui">가상 고장</span> 에서 모든 설비의 가상 스위치가 ✔ 정상이고 '진행 중인 고장 없음' 인지 확인합니다.</div>
      <div class="lab-check">이상이 있으면 교사에게 알려 정리합니다(정비 오더 종료 · 이력 종료).</div></li>
    <li class="lab-step"><div class="lab-do">관리자: 시작 시각을 기록하고 보고서 양식(17-2 의 결과 보고 표)을 준비합니다.</div>
      <div class="lab-check">시작 시각 · 팀 이름 · 역할표가 보고서 첫 줄에 있습니다.</div></li>
  </ol>
  <div class="lab-result">미션은 한 사람이 다 하지 않습니다. 실제 공장처럼 <b>역할마다 책임 화면</b>이 있고, 결정은 그 역할 담당자가 합니다.</div>
</div>`;

  const LAB_MISSION = `<div class="lab" data-lab="ch17-1-b">
  <div class="lab-head"><span class="lab-badge">종합 미션</span><b>공장의 하루 — 수요부터 출고 · 보고까지</b><span class="lab-meta">⏱ 35분 · 화면: 전체</span></div>
  <p class="lab-goal">이번 주 고객 수주를 받아 AI 로 계획하고, 생산 중 발생한 고장에 대응하며, 첫 적재함 출고와 보고까지 마칩니다.</p>
  <p class="lab-pre">역할 카드 완료. 각 단계 앞의 [역할]이 그 단계의 책임자입니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">[영업/계획] <span class="ui">ERP</span> → <span class="ui">⇩ 데이터 가져오기</span> 에서 <span class="ui">📄 예시: 이번 주 고객 수주(수요)</span> 를 눌러 검증 결과를 보고 <span class="ui">적용</span>. (이미 가져온 수주면 '이미 있음' 으로 나옵니다 — 그대로 진행)</div>
      ${SHOT('ch17_erp_data_demand', '수요 예시 가져오기')}
      <div class="lab-check"><span class="ui">₩ 영업 · 수주</span> 에 고객 수주가 보이고 미출고 잔량이 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">[영업/계획] <span class="ui">AI 생산계획</span> 에서 <span class="prompt">미출고 수주 전부 오늘 처리할 계획 세워줘</span> 를 보냅니다.</div>
      ${SHOT('ch17_ai_plan_orders', 'AI 생산계획 예시')}
      <div class="lab-check">계획서 초안(PS-…)과 설비별 색 · 수량 · 예상 시간, 가용 시간 안 완료 여부 · 경고가 나왔습니다.</div></li>
    <li class="lab-step"><div class="lab-do">[영업/계획] 결과가 마음에 들지 않으면 조건을 바꿔 다시 요청합니다(예: <span class="prompt">설비 4대로 다시 배정해 줘</span>). 최종 초안을 관리자에게 보고합니다.</div>
      <div class="lab-check">보고 내용: 계획서 번호 · 설비 수 · 예상 소요 · 경고. 관리자가 승인(구두)했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">[관리자] 오른쪽 계획서(또는 <span class="ui">ERP</span> → <span class="ui">▤ 생산계획 · 배정</span>)에서 <span class="ui">생산 계획 완료(확정)</span> → <span class="ui">▶ 생산 시작</span> 을 누릅니다.</div>
      ${SHOT('erp_plans_detail', '생산계획서 상세')}
      <div class="lab-check">생산오더가 만들어지고 MES 로 내려갑니다. 자재 부족 표가 나오면 [영업/계획]이 15차시 사례 2 방법으로 해결합니다.</div></li>
    <li class="lab-step"><div class="lab-do">[생산(MES)] <span class="ui">MES</span> → <span class="ui">▤ 작업지시</span> 와 <span class="ui">▦ 디스패치 보드</span> 에서 설비별 작업지시가 시작되었는지 확인합니다.</div>
      ${SHOT('ch17_mes_wo', 'MES 작업지시')}
      <div class="lab-check">설비마다 진행 중(▶) 작업지시가 있고, 공장 라인에서 해당 설비가 운전 중입니다.</div></li>
    <li class="lab-step"><div class="lab-do">[교사] 미션 중간(시작 10~15분 뒤)에 한 설비에 고장을 주입합니다(블라인드 무작위 또는 수동). 팀에는 알리지 않습니다.</div>
      <div class="lab-check">팀은 아직 모릅니다. [보전]은 5분마다 <span class="ui">📊 보전 현황</span> 을 확인하고 있었나요?</div></li>
    <li class="lab-step"><div class="lab-do">[보전] 이상 점수 · 알람을 발견하면 <span class="ui">✦ AI 로 분석하기</span> → MES <span class="ui">AI 권고</span> 로 원인 · 조치를 확인하고, 관리자에게 "정비할지" 결정을 요청합니다.</div>
      ${SHOT('pdm_overview', '보전 현황')}
      <div class="lab-check">발견 시각 · 설비 · 의심 유형 · 근거가 보고서에 적혔습니다.</div></li>
    <li class="lab-step"><div class="lab-do">[관리자 → 보전] 정비 결정 시 <span class="ui">정비 오더 등록</span>(또는 알람의 자동 정비 오더) → 정비 완료 가정 후 <span class="ui">종료</span>. 계속 생산을 결정했다면 그 이유를 적습니다.</div>
      <div class="lab-check">정비 오더 번호와 결정 이유가 기록되었고, 이후 점수가 회복되었는지 확인했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">[품질] <span class="ui">⚑ 생산오더 · 공정</span> 의 검사 LOT 과 <span class="ui">◎ 품질</span> 을 보고, 고장 시간대 LOT 에 불합격이 있는지 <span class="ui">⛓ LOT 추적</span> 으로 확인합니다.</div>
      <div class="lab-check">불합격 LOT 수(0 이면 0)와 추적한 LOT 번호가 적혔습니다.</div></li>
    <li class="lab-step"><div class="lab-do">[관리자] 첫 적재함이 출고되면 <span class="ui">ERP</span> → <span class="ui">⇪ 출고</span> 에서 출고 기록을 확인합니다.</div>
      ${SHOT('ch17_erp_shipments', 'ERP 출고')}
      <div class="lab-check">출고 번호 · 수량 · LOT 이 보입니다(적재함 1개 = 박스 5개 가정).</div></li>
    <li class="lab-step"><div class="lab-do">[관리자] <span class="ui">대시보드</span> 에서 OEE · 생산계획서 진행률 · 설비 가동 간트(고장 구간)를 캡처하거나 숫자를 적습니다.</div>
      ${SHOT('dashboard', '대시보드')}
      <div class="lab-check">계획 대비 진행률과 고장으로 인한 비가동 구간이 보고서에 들어갔습니다.</div></li>
    <li class="lab-step"><div class="lab-do">[전원] MES · ERP <span class="ui">✦ AI 도우미</span> 로 현황을 요약받고, 숫자를 화면에서 확인해 <b>결과 보고</b>를 완성합니다(16차시 사례 12 방법).</div>
      <div class="lab-check">보고서에 ① 생산 ② 고장 대응 ③ 품질 ④ 출고 ⑤ 잘한 점 · 아쉬운 점이 있고, 각 숫자 옆에 확인 화면이 있습니다.</div></li>
  </ol>
  <div class="lab-result">수주 → 계획 → 생산 → 고장 대응 → 품질 → 출고 → 보고, 공장의 하루가 <b>ERP · MES · 3D 라인 · AI</b> 로 이어졌습니다. AI 는 모든 단계에서 <b>초안 · 분석 · 요약</b>을 도왔고, 모든 <b>결정</b>은 역할 담당자가 했습니다.</div>
</div>`;

  const LAB_REAL = `<div class="lab" data-lab="ch17-2-a">
  <div class="lab-head"><span class="lab-badge">실습 17-1</span><b>시뮬레이션 → 실장비, 무엇이 같고 무엇이 다른가</b><span class="lab-meta">⏱ 15분 · 화면: 공장 라인 · 가상 고장</span></div>
  <p class="lab-goal">플랫폼 화면에서 "실장비에서도 그대로인 것" 과 "시뮬레이션에서만 되는 것" 을 찾아 비교 카드를 만듭니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 에서 <span class="ui">기동</span> 을 누르고 뜨는 확인 대화상자를 읽은 뒤 <b>취소</b>합니다.</div>
      ${SHOT('line_cmd_confirm', '명령 확인 대화상자')}
      <div class="lab-check">명령은 확인을 거쳐 감사 로그에 남습니다 — <b>실장비에서도 같음</b>(실장비는 안전 점검표 통과 전에는 명령 자체가 거부됨).</div></li>
    <li class="lab-step"><div class="lab-do">3D 화면 아래 안내 문구("3D 화면은 읽기 전용입니다 …")를 찾습니다. 3D 로봇을 끌어도 실제로 움직이지 않는지 확인합니다(시점만 바뀜).</div>
      ${SHOT('hero_ur', 'UR3 셀 3D')}
      <div class="lab-check">웹에는 로봇 조깅(수동 이동) 기능이 없습니다 — <b>실장비에서도 같음</b>. 티칭은 UR 팬던트에서만 합니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">■ 비상정지</span> 를 눌러 대화상자 문구만 읽고 취소합니다.</div>
      <div class="lab-check">"실제 장비의 비상정지는 현장 버튼으로만" — <b>시뮬레이션에서만</b> 웹이 가상 입력을 바꿉니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">가상 고장</span> 화면 전체를 봅니다.</div>
      ${SHOT('fault_sim', '가상 고장 화면')}
      <div class="lab-check">가상 고장 · 가상 스위치는 <b>시뮬레이션 전용</b>입니다. 실장비에서는 실제 센서 데이터와 실제 고장 이력(정비 기록)이 라벨이 됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">아래 구조 그림과 표를 보고 비교 카드를 완성합니다: <b>같음</b>(화면 · ERP · MES · AI · 확인 단계 · 감사 로그) / <b>다름</b>(어댑터 · 가상 고장 · 비상정지 조작 · 보정 · 안전 점검).</div>
      <div class="lab-check">카드에 각 칸 3개 이상이 적혔습니다.</div></li>
  </ol>
  <div class="lab-result">같은 화면 · 같은 흐름 아래에서 <b>어댑터만 바꿔</b> 실장비로 갑니다. 그래서 시뮬레이션에서 익힌 운영 · AI 활용이 그대로 쓰입니다. 단, 실장비는 <b>안전 점검 · 보정 · 시운전</b>을 거쳐야 하며 이 플랫폼의 실장비 연동은 아직 <b>미검증</b>입니다.</div>
</div>`;

  const LAB_PROPOSAL = `<div class="lab" data-lab="ch17-2-b">
  <div class="lab-head"><span class="lab-badge">실습 17-2</span><b>나만의 제조 AI 개선 제안서</b><span class="lab-meta">⏱ 20분 · 발표 3분</span></div>
  <p class="lab-goal">강좌에서 겪은 문제 하나를 골라 <b>문제 → 데이터 → AI 기능 → 조치 → 지표</b> 순서의 개선 제안서를 만들고 발표합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">문제를 고릅니다. 예: "베어링 이상을 늦게 발견했다", "색 전환이 많아 계획이 길다", "불합격 LOT 원인 찾기가 오래 걸렸다", "인수인계 숫자가 틀렸다".</div>
      <div class="lab-check">문제 한 문장과 겪은 사례(몇 차시 · 어떤 상황)가 적혔습니다.</div></li>
    <li class="lab-step"><div class="lab-do">그 문제를 보여 주는 <b>데이터와 화면</b>을 적습니다(예: 예지보전 보전 현황 · DB 탐색, MES 품질 · LOT, 대시보드 간트).</div>
      ${SHOT('pdm_db', '예지보전 DB 탐색')}
      <div class="lab-check">화면 이름 2개 이상과, 그 화면에서 본 구체적인 값 하나가 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">쓸 <b>AI 기능</b>을 고릅니다(이상 탐지 · AI 로 분석하기 · AI 정비 권고 · AI 생산계획 · AI 도우미). 플랫폼에 없는 기능이 필요하면 "새 기능 아이디어" 로 따로 표시합니다.</div>
      <div class="lab-check">기존 기능 / 새 아이디어가 구분되어 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>조치와 사람의 결정</b>을 적습니다: AI 결과를 보고 누가 무엇을 결정하는지(예: 보전 담당이 주의 알람 15분 안에 확인 → 관리자가 정비 시점 결정).</div>
      <div class="lab-check">"AI 가 하는 일" 과 "사람이 결정하는 일" 이 나뉘어 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>평가 지표</b>를 정합니다: 비가동 시간, OEE, 불합격 LOT 수, 알람 오탐 수, 발견까지 걸린 시간, 계획 소요 시간 중 1~2개와 목표값.</div>
      <div class="lab-check">지금 값(대시보드 등에서 확인)과 목표값이 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">설비 증설 · 배치 변경이 필요한 제안이면 설비 1대의 CAD 외형도(아래)를 참고 자료로 붙입니다.</div>
      ${SHOT('cad_drawing', '설비 1대 CAD 외형도')}
      <div class="lab-check">필요 없으면 "해당 없음" 으로 표시했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">발표 양식(아래 표)대로 3분 발표를 준비하고, 다른 팀의 발표에 질문 1개씩 합니다.</div>
      <div class="lab-check">발표 후 받은 질문과 답을 제안서 끝에 적었습니다.</div></li>
  </ol>
  <div class="lab-result">좋은 제조 AI 제안은 멋진 모델이 아니라 <b>"어떤 데이터로, 누가, 무엇을 결정해, 어떤 숫자가 좋아지는가"</b> 가 분명한 제안입니다.</div>
</div>`;

  const TP = (html) => ({ type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html });

  PY_COURSE.addChapter({
    id: 'ch17', no: '17', title: '종합 미션과 현장 적용', subtitle: 'Capstone Mission · Field Application',
    summary: '수주부터 출고 · 고장 대응 · 보고까지 하루 공장 운영을 팀으로 수행하고, 시뮬레이션에서 실장비로 가는 구조와 안전 점검, 나만의 제조 AI 개선 제안을 정리합니다.',
    goals: ['역할을 나눠 수주 → 계획 → 생산 → 고장 대응 → 출고 → 보고를 수행할 수 있다',
      '시뮬레이션과 실장비의 같은 점 · 다른 점, 안전 점검의 필요성을 설명할 수 있다',
      '플랫폼 데이터와 AI 기능을 근거로 제조 AI 개선 제안을 만들고 발표할 수 있다'],
    sections: [
      {
        id: 'ch17-1', title: '종합 미션 — 공장의 하루', minutes: 50,
        goals: ['역할별 책임 화면과 결정을 구분한다', '고장이 난 생산 상황에서 팀으로 대응한다', '결과를 숫자와 근거 화면으로 보고한다'],
        flow: [['미션 안내 · 역할 나누기', 5], ['미션 수행', 35], ['보고 · 회고', 10]],
        content: [
          { type: 'p', html: '지금까지 배운 모든 것을 한 번에 씁니다. 여러분의 팀은 오늘 하루 미니공장을 맡았습니다. 고객 수주가 들어왔고, 계획을 세워 생산하고, 중간에 무슨 일이 생기든 대응해 첫 적재함을 출고한 뒤 보고해야 합니다.' },
          { type: 'figure', html: FIG_DAY, caption: '미션 타임라인 — 단계마다 책임 역할이 있습니다' },
          { type: 'h', text: '역할 카드' },
          { type: 'table', head: ['역할', '책임', '주로 쓰는 화면', 'AI 활용', '결정하는 것'], rows: [
            ['영업/계획', '수요 접수 · 계획 초안', 'ERP 데이터 · 수주 · 생산계획', 'AI 생산계획 · ERP AI 도우미', '초안 · 재배정 조건'],
            ['생산(MES)', '작업지시 · 라인 상태', 'MES 작업지시 · 디스패치 · 공장 라인', 'MES AI 도우미', '작업 순서 조정 · 라인 명령'],
            ['보전', '설비 이상 감시 · 정비', '예지보전 · MES 정비', 'AI 로 분석하기 · AI 권고', '정비 오더 내용'],
            ['품질', '검사 LOT · 불량 원인', 'MES 생산오더 · 품질 · LOT 추적', 'MES AI 도우미', '재검사 · 불량 기록'],
            ['관리자', '승인 · 출고 · 보고', 'ERP 계획서 · 출고 · 대시보드', 'AI 도우미 요약', '계획 확정 · 생산 시작 · 정비 여부'],
          ] },
          { type: 'figure', html: LAB_ROLES },
          { type: 'figure', html: LAB_MISSION },
          { type: 'callout', kind: 'info', title: '미션 규칙', html: '<ul><li>확정 · 생산 시작 · 정비 결정 · 출고 확인은 <b>그 역할 담당자만</b> 누릅니다.</li><li>AI 에게 받은 숫자는 반드시 화면에서 확인합니다.</li><li>가상 스위치 · 비상정지를 건드렸다면 미션이 끝나기 전에 원상 복구합니다.</li></ul>' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 채점 루브릭 (팀, 20점)', html: '<table><thead><tr><th>항목</th><th>5점</th><th>3점</th><th>1점</th></tr></thead><tbody><tr><td>계획(수요 → AI 초안 → 확정)</td><td>조건을 바꿔 비교 후 근거 있게 확정</td><td>초안 그대로 확정</td><td>교사 도움으로 확정</td></tr><tr><td>고장 대응</td><td>알람 15분 안 발견, 근거 · 정비 · 회복 확인</td><td>발견 · 정비했으나 근거 · 회복 확인 부족</td><td>교사가 알려 줘서 발견</td></tr><tr><td>품질 · 출고</td><td>고장 시간대 LOT 추적 + 출고 확인</td><td>둘 중 하나</td><td>미확인</td></tr><tr><td>보고 · 협업</td><td>모든 숫자에 근거 화면, 역할 결정이 기록됨</td><td>일부 숫자 근거 누락</td><td>AI 답 복사 수준</td></tr></tbody></table>' },
          TP('<ul><li><b>수업 준비</b>: 설비 4대, 모든 스위치 정상, 진행 중 고장 없음, 이전 계획서의 작업지시가 모두 끝난 상태로 시작합니다. 수주가 이미 들어와 있으면 수요 가져오기는 "이미 있음" 으로 나오며 그대로 진행해도 됩니다.</li><li><b>고장 주입</b>: 시작 10~15분 뒤 교사 PC 에서 <span class="ui">가상 고장</span> → 무작위(블라인드) 또는 <span class="ui">수동 고장 주입</span>(예: 컨베이어 #2 베어링 결함 0.7). 여러 팀이 한 서버를 쓰면 팀마다 설비를 하나씩 맡겨 서로 다른 설비에 주입합니다.</li><li><b>시간 관리</b>: 출고(적재함 1개 = 박스 5개)까지 시간이 부족하면 "첫 적재함 출고 예상 시각" 으로 대체합니다.</li><li><b>자주 막히는 곳</b>: 자재 부족으로 생산 시작이 막힘 → 15차시 사례 2 로 안내(부족분 구매 발주 → 입고 → 재릴리스, 또는 교사 판단으로 부족해도 릴리스).</li><li><b>회고 질문</b>: "AI 가 가장 도움이 된 순간은?", "AI 를 믿으면 안 됐던 순간은?", "역할이 나뉘어 좋았던 점 · 불편했던 점은?"</li><li><b>마무리</b>: 정비 오더 · 가상 고장을 종료하고 스위치를 확인합니다.</li></ul>'),
        ],
        practice: [],
        quiz: [
          { q: '종합 미션에서 계획서를 <b>확정하고 생산을 시작</b>하는 역할은?',
            options: ['AI 생산계획', '관리자', '품질 담당', '보전 담당'], answer: 1,
            explain: 'AI 는 초안까지, 확정 · 시작은 승인 권한을 가진 사람이 합니다.' },
          { q: '미션 중 예지보전 알람을 발견한 보전 담당이 가장 먼저 할 일로 알맞은 것은?',
            options: ['라인 비상정지', 'AI 로 분석하기 · AI 권고로 근거를 정리해 관리자에게 정비 결정을 요청', '고장을 공개해 정답 확인', '수주 취소'], answer: 1,
            explain: '근거를 정리해 결정권자에게 보고하는 것이 먼저입니다. 정답 공개는 미션 뒤 확인용입니다.' },
          { q: '결과 보고서의 숫자에 대해 옳은 원칙은?',
            options: ['AI 답은 항상 맞으므로 그대로 쓴다', '숫자마다 확인한 화면을 적는다', '숫자는 생략한다', '팀장 기억대로 쓴다'], answer: 1,
            explain: '근거 화면을 적어야 다른 사람이 검증할 수 있습니다.' },
          { q: '고장 시간대에 만든 적재함에 문제가 있었는지 확인하는 방법은?',
            options: ['검사 LOT 판정과 LOT 추적으로 그 시간대 LOT 을 확인', 'AI 생산계획에 물어본다', 'BOM 을 수정한다', '설비 대수를 줄인다'], answer: 0,
            explain: '검사 LOT · LOT 추적으로 생산 시각 · 설비를 이어서 확인합니다.' },
        ],
        slides: [
          { layout: 'title', title: '종합 미션 — 공장의 하루', subtitle: '수요부터 출고 · 보고까지, 팀으로', notes: '<p>오늘은 설명 없이 팀이 스스로 운영합니다. 교사는 "고장 주입" 과 "도움 요청 응답" 만 합니다.</p>' },
          { layout: 'diagram', title: '미션 타임라인', html: FIG_DAY, notes: '<p>단계마다 책임 역할을 짚습니다. ④ 는 언제 올지 알려 주지 않습니다.</p>' },
          { layout: 'table', title: '역할 카드', head: ['역할', '결정하는 것'], rows: [['영업/계획', '초안 · 재배정 조건'], ['생산(MES)', '작업 순서 · 라인 명령'], ['보전', '정비 오더 내용'], ['품질', '재검사 · 불량 기록'], ['관리자', '확정 · 시작 · 정비 여부 · 출고']],
            notes: '<p>역할 카드를 인쇄해 나눠 주면 몰입도가 높습니다.</p>' },
          { layout: 'diagram', title: '① 수요 접수', html: SHOT('ch17_erp_data_demand', '수요 가져오기'), notes: '<p>검증 → 적용. 이미 가져왔다면 그대로 진행.</p>' },
          { layout: 'diagram', title: '② AI 계획', html: SHOT('ch17_ai_plan_orders', 'AI 생산계획'), notes: '<p>조건을 바꿔 한 번 더 비교해 보라고 권합니다.</p>' },
          { layout: 'diagram', title: '③ 생산 확인', html: SHOT('ch17_mes_wo', '작업지시'), notes: '<p>생산 담당이 작업지시 · 디스패치를 확인합니다.</p>' },
          { layout: 'bullets', title: '④⑤ 고장 대응 · 품질', bullets: ['보전: 5분마다 보전 현황', '알람 → AI 분석 · 권고 → 관리자 보고', '정비 오더 → 종료 → 회복 확인', '품질: 고장 시간대 LOT 추적'],
            notes: '<p>고장 주입 후 15분 안에 못 찾으면 힌트: "보전 현황 표의 색이 바뀐 칸을 보세요".</p>' },
          { layout: 'diagram', title: '⑥ 출고 · 보고', html: SHOT('ch17_erp_shipments', '출고'), notes: '<p>대시보드 진행률 · 간트와 함께 보고. AI 도우미 요약 + 화면 확인.</p>' },
          { layout: 'quiz', title: '확인 문제', q: '계획 확정 · 생산 시작은 누가?', options: ['AI 생산계획', '관리자', '품질', '보전'], answer: 1, explain: 'AI 는 초안까지입니다.', notes: '<p>미션 시작 전에 규칙을 다시 확인.</p>' },
          { layout: 'summary', title: '회고', bullets: ['AI 가 가장 도움이 된 순간은?', 'AI 를 그대로 믿으면 안 됐던 순간은?', '역할이 나뉘어 좋았던 점 · 불편했던 점', '다음에 다르게 할 한 가지'],
            notes: '<p>팀별 1분 회고 발표. 루브릭 점수와 함께 피드백.</p>' },
        ],
      },
      {
        id: 'ch17-2', title: '실장비 연동과 현장 적용', minutes: 50,
        goals: ['시뮬레이션과 실장비의 같은 점 · 다른 점을 설명한다', '실장비 연동 전 안전 점검과 시운전 순서를 말한다', '데이터와 AI 기능을 근거로 개선 제안을 만들고 발표한다'],
        flow: [['구조 설명', 8], ['실습 17-1 비교 카드', 12], ['안전 점검 · 시운전', 5], ['실습 17-2 제안서 · 발표', 22], ['마무리', 3]],
        content: [
          { type: 'p', html: '이 강좌의 모든 실습은 <b>시뮬레이션 모드</b>에서 했습니다. 그런데 이 플랫폼은 처음부터 실제 미니공장(미쓰비시 MELSEC PLC · UR3 · 델타 로봇 · 카메라 2대)과 연결할 수 있게 설계되었습니다. 무엇이 그대로이고 무엇이 달라질까요?' },
          { type: 'figure', html: FIG_SIMREAL, caption: '같은 화면 · 같은 흐름, 어댑터만 바꿔 끼우는 구조' },
          { type: 'table', head: ['장비', '연결 방식', '웹에서 하는 일', '상태'], rows: [
            ['PLC (MELSEC)', 'MC 프로토콜 3E · 디바이스 맵은 config/plc_map.yaml 하나', '상태 읽기, 확인을 거친 상위 명령(펄스), 예지보전 단계 신호(D120) 쓰기', '기종 미정 · 미검증'],
            ['UR3', 'RTDE(상태 수집) + Dashboard Server(프로그램 시작 · 정지 등)', '관절 · 안전 상태 표시, 상위 명령만 — 조깅 · 좌표 이동 없음', '미검증'],
            ['델타 로봇', '제어기 미정 → 지금은 스텁 어댑터', '—', '제어 방식 결정 필요'],
            ['카메라 A/B', 'OpenCV(USB) · 보정 절차 문서', '검출 결과 · 예지보전 영상 표시', '미검증'],
          ], caption: '실장비 연동은 코드 · 문서까지 준비되어 있으며, 실제 장비에서는 아직 검증하지 않았습니다' },
          { type: 'figure', html: LAB_REAL },
          { type: 'h', text: '실장비 연결 전 — 안전 점검표와 시운전' },
          { type: 'p', html: '실장비 모드에서는 <b>안전 점검표를 모두 "예" 로 통과하고 그 날짜를 설정에 기록하기 전까지 웹 명령이 거부</b>됩니다. 점검표의 주요 항목은 다음과 같습니다.' },
          { type: 'list', items: [
            '비상정지가 하드와이어 안전 릴레이로 모든 구동부 전원을 끊는다',
            '안전펜스 · 도어가 열리면 구동부가 정지한다',
            '웹 · PC 가 꺼지거나 네트워크가 끊겨도 안전 기능이 유지된다',
            'UR3 안전 설정(속도 · 힘 제한, 안전 평면)이 되어 있다',
            '에어압 저하 · UR 보호정지가 PLC 로 들어와 라인이 이상(ERROR)이 된다',
            '웹 명령은 확인 대화상자를 거치고 감사 로그에 남는다',
            '웹 · 3D 에 로봇 조깅 · 좌표 이동 기능이 없다',
            'AI 예지보전은 PLC 에 단계 신호만 쓰고 라인을 정지시키지 않는다(경광등 · 부저만)',
            '실습 인원이 비상정지 위치와 복귀 절차를 안내받았다',
          ], ordered: true },
          { type: 'callout', kind: 'info', title: '시운전 순서', html: 'PLC 래더 작성 · 점검 → UR 팬던트 티칭 → 카메라 보정 → 델타 제어기 확정 후 어댑터 교체 → <b>저속 → 공작물 1개 → 박스 1개 → 적재함 1개 → 연속 운전</b> 순서로 단계마다 기록합니다.' },
          { type: 'h', text: '개선 제안' },
          { type: 'figure', html: LAB_PROPOSAL },
          { type: 'table', head: ['발표 양식 (3분)', '내용'], rows: [
            ['1. 문제 (30초)', '어떤 상황에서 무엇이 문제였나 — 겪은 사례'],
            ['2. 데이터 (30초)', '어느 화면 · 어떤 값이 문제를 보여 주나'],
            ['3. AI 기능 (40초)', '쓸 기능(기존) · 새 아이디어, AI 가 하는 일'],
            ['4. 사람의 결정 · 조치 (40초)', '누가 무엇을 언제 결정하나, 안전 원칙'],
            ['5. 지표 (40초)', '지금 값 → 목표값, 확인할 화면'],
          ] },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 제안서 평가 루브릭 (개인/팀, 20점)', html: '<table><thead><tr><th>항목</th><th>5점</th><th>3점</th><th>1점</th></tr></thead><tbody><tr><td>문제 정의</td><td>겪은 사례 기반, 구체적</td><td>일반적</td><td>모호</td></tr><tr><td>데이터 근거</td><td>화면 2개 이상 + 실제 값</td><td>화면만</td><td>근거 없음</td></tr><tr><td>AI · 사람 역할</td><td>AI 역할과 사람 결정 · 안전 원칙이 분명</td><td>AI 역할만</td><td>"AI 가 알아서"</td></tr><tr><td>지표 · 발표</td><td>현재값 · 목표값 · 확인 방법, 질의응답 충실</td><td>지표만</td><td>지표 없음</td></tr></tbody></table>' },
          TP('<ul><li><b>정직한 표기</b>: 실장비 연동은 코드 · 문서까지이며 <b>실장비에서 검증하지 않았다</b>는 점을 분명히 말합니다. PLC 기종 · 델타 제어 방식 · 카메라 · 센서 사양 등은 아직 결정이 필요한 항목입니다.</li><li><b>실습 17-1</b>: 기동 · 비상정지 대화상자는 <b>취소</b>로 닫게 합니다(읽기만).</li><li><b>자료</b>: 설비 1대 CAD(STEP · DXF 외형도 · 배치도)는 플랫폼의 <code>docs/cad/</code> 에 있습니다. 배치 변경 · 증설 제안 팀에 제공합니다.</li><li><b>발표 운영</b>: 팀당 3분 + 질문 1개. 다른 팀은 "지표가 확인 가능한가" 를 기준으로 질문하게 합니다.</li><li><b>마무리</b>: 강좌 전체 정리 — 제조 AI(1차시) · 피지컬 AI(2~3차시)의 정의를 학생 말로 다시 쓰게 하고, 이 플랫폼에서 인식 · 판단 · 행동을 어디서 봤는지 한 줄씩 적게 합니다.</li></ul>'),
        ],
        practice: [],
        quiz: [
          { q: '이 플랫폼이 시뮬레이션에서 실장비로 가는 방식으로 옳은 것은?',
            options: ['화면과 ERP · MES 를 새로 만든다', '같은 화면 · 흐름 아래 하드웨어 어댑터를 sim 에서 real 로 바꾼다', 'AI 모델만 바꾼다', '실장비에서는 웹을 쓰지 않는다'], answer: 1,
            explain: 'HW_MODE 에 따라 시뮬레이터 어댑터와 실장비 어댑터를 바꿔 끼우고, 디바이스 주소는 plc_map.yaml 하나에서 관리합니다.' },
          { q: '실장비 모드에서 웹의 상위 명령이 거부되는 경우는?',
            options: ['AI 키가 없을 때', '안전 점검표 통과일이 설정에 기록되기 전', '수주가 없을 때', '다크 모드일 때'], answer: 1,
            explain: '안전 점검을 모두 통과하고 날짜를 기록하기 전에는 명령이 거부됩니다.' },
          { q: '실장비에서 UR3 에 대해 웹이 할 수 <b>없는</b> 것은?',
            options: ['관절 · 안전 상태 보기', '프로그램 시작 · 정지 같은 상위 명령(확인 후)', '3D 화면에서 로봇을 끌어 실제로 움직이기', '보호정지 상태 확인'], answer: 2,
            explain: '웹에는 조깅 · 좌표 이동 기능이 없습니다. 티칭은 팬던트에서만 합니다.' },
          { q: '좋은 제조 AI 개선 제안의 조건으로 가장 알맞은 것은?',
            options: ['가장 최신 모델 이름을 쓴다', '데이터 근거 · AI 와 사람의 역할 · 확인 가능한 지표가 분명하다', '사람의 결정을 없앤다', '숫자 없이 아이디어만 쓴다'], answer: 1,
            explain: '어떤 데이터로, 누가 무엇을 결정해, 어떤 숫자가 좋아지는지가 분명해야 합니다.' },
        ],
        slides: [
          { layout: 'title', title: '실장비 연동과 현장 적용', subtitle: '시뮬레이션 → 실장비, 그리고 나의 제안', notes: '<p>마지막 교시. 강좌에서 한 모든 실습이 시뮬레이션이었다는 점을 상기시킵니다.</p>' },
          { layout: 'diagram', title: '어댑터 구조', html: FIG_SIMREAL, notes: '<p>💬 "실장비로 바꾸면 우리가 배운 화면 사용법은 버려야 할까?" → 아니요, 같습니다.</p>' },
          { layout: 'table', title: '장비별 연결과 상태', head: ['장비', '웹에서 하는 일'], rows: [['PLC', '상태 · 상위 명령 · 단계 신호'], ['UR3', '상태 · 상위 명령(조깅 없음)'], ['델타', '스텁(제어기 미정)'], ['카메라', '검출 · 예지보전 영상']],
            notes: '<p>모두 <b>미검증</b>. 결정이 필요한 항목(PLC 기종, 델타 제어 방식 등)이 남아 있음을 정직하게 말합니다.</p>' },
          { layout: 'diagram', title: '같은 것 — 확인 단계', html: SHOT('line_cmd_confirm', '확인 대화상자'), notes: '<p>실습 17-1 시연. 대화상자는 취소로 닫습니다.</p>' },
          { layout: 'bullets', title: '안전 점검표 (발췌)', bullets: ['비상정지 = 하드와이어 전원 차단', '도어 열림 → 정지, 네트워크 끊겨도 유지', 'UR 안전 설정 · 보호정지 입력', '웹 명령 확인 · 감사 로그, 조깅 기능 없음', 'AI 는 단계 신호만, 정지시키지 않음'],
            notes: '<p>통과일을 설정에 넣기 전에는 웹 명령이 거부된다는 점을 강조합니다.</p>' },
          { layout: 'bullets', title: '시운전 순서', bullets: ['PLC 래더 · 점검', 'UR 팬던트 티칭', '카메라 보정 · 델타 어댑터', '저속 → 공작물 1개 → 박스 1개 → 적재함 1개 → 연속'],
            notes: '<p>단계마다 기록 양식에 결과 · 문제 · 조치 · 확인자를 남깁니다.</p>' },
          { layout: 'table', title: '개선 제안 발표 양식', head: ['순서', '내용'], rows: [['문제', '겪은 사례'], ['데이터', '화면 · 값'], ['AI 기능', '기존 · 새 아이디어'], ['사람 · 조치', '결정 · 안전'], ['지표', '현재 → 목표']],
            notes: '<p>20분 작성 후 팀당 3분 발표.</p>' },
          { layout: 'diagram', title: '참고 자료 — 설비 CAD', html: SHOT('cad_drawing', 'CAD 외형도'), notes: '<p>배치 · 증설 제안 팀에게 STEP · DXF 자료를 안내합니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: '실장비에서 웹이 UR3 에 할 수 없는 것은?', options: ['상태 보기', '상위 명령', '3D 로 끌어 실제 이동', '보호정지 확인'], answer: 2, explain: '조깅 · 좌표 이동 기능은 없습니다.', notes: '<p>3차시의 안전 원칙과 연결합니다.</p>' },
          { layout: 'summary', title: '강좌를 마치며', bullets: ['제조 AI = AI 기술 × 제조 데이터 × 현장 문제', '피지컬 AI = 인식 · 판단 · 행동 — 로봇만이 아니다', 'AI 는 초안 · 분석 · 권고, 결정은 사람과 PLC', '시뮬레이션에서 익힌 운영이 실장비에서도 그대로'],
            notes: '<p>학생들에게 "이 플랫폼에서 인식 · 판단 · 행동을 본 곳" 을 한 줄씩 말하게 하고 마칩니다.</p>' },
        ],
      },
    ],
  });
})();
