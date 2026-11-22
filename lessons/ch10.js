/* 10 MES ② 품질 · LOT · 대시보드 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_LOT = `<svg viewBox="0 0 700 230" role="img" aria-label="LOT 계보: 공작물 LOT 네 개가 박스 LOT 하나에, 박스 LOT 다섯 개가 적재함 LOT 하나에 들어가고, 적재함 LOT 은 출고와 연결된다">
  ${ARROW('c10a1')}
  <rect x="10" y="20" width="150" height="190" rx="14" class="p1s"/><text x="85" y="46" text-anchor="middle" class="tx-b">공작물 LOT</text>
  <text x="85" y="76" text-anchor="middle" class="tx-m">공작물 1개 = 1 LOT</text><text x="85" y="100" text-anchor="middle" class="tx-m">색 · 투입 시각</text><text x="85" y="124" text-anchor="middle" class="tx-m">(카메라 검출)</text>
  <rect x="190" y="20" width="150" height="190" rx="14" class="p2s"/><text x="265" y="46" text-anchor="middle" class="tx-b">박스 LOT</text>
  <text x="265" y="76" text-anchor="middle" class="tx-m">공작물 4개</text><text x="265" y="100" text-anchor="middle" class="tx-m">델타가 채운 박스</text>
  <rect x="370" y="20" width="150" height="190" rx="14" class="p3s"/><text x="445" y="46" text-anchor="middle" class="tx-b">적재함 LOT</text>
  <text x="445" y="76" text-anchor="middle" class="tx-m">박스 5개</text><text x="445" y="100" text-anchor="middle" class="tx-m">CR-시각-설비-순번</text><text x="445" y="124" text-anchor="middle" class="tx-m">검사 LOT · 실적</text>
  <rect x="550" y="20" width="140" height="190" rx="14" class="p4s"/><text x="620" y="46" text-anchor="middle" class="tx-b">출고</text>
  <text x="620" y="76" text-anchor="middle" class="tx-m">ERP 출고(SH-…)</text><text x="620" y="100" text-anchor="middle" class="tx-m">LOT 열에 적재함</text>
  <line x1="162" y1="150" x2="186" y2="150" class="ln" stroke-width="2" marker-end="url(#c10a1)"/>
  <line x1="342" y1="150" x2="366" y2="150" class="ln" stroke-width="2" marker-end="url(#c10a1)"/>
  <line x1="522" y1="150" x2="546" y2="150" class="ln" stroke-width="2" marker-end="url(#c10a1)"/>
  <text x="350" y="200" text-anchor="middle" class="tx-m">불량이 나면 출고 → 적재함 → 박스 → 공작물 순서로 거꾸로 찾아갑니다</text>
</svg>`;

  const FIG_INSP = `<svg viewBox="0 0 700 220" role="img" aria-label="검사 LOT 판정: 적재함마다 박스 수, 박스당 공작물 수, 불량률을 검사 계획과 비교해 합격이면 완제품 입고와 출고, 불합격이면 입고와 출고를 하지 않는다">
  ${ARROW('c10a2')}
  <rect x="10" y="70" width="150" height="70" rx="12" class="p1s"/><text x="85" y="100" text-anchor="middle" class="tx-b">적재함 출고</text><text x="85" y="120" text-anchor="middle" class="tx-m">실적 1건</text>
  <rect x="200" y="20" width="250" height="170" rx="14" class="card-bg"/>
  <text x="325" y="46" text-anchor="middle" class="tx-b">검사 LOT (검사 계획)</text>
  <text x="220" y="80" class="tx">① 적재함 박스 수 1~5</text>
  <text x="220" y="110" class="tx">② 박스당 공작물 4개</text>
  <text x="220" y="140" class="tx">③ 불량률(픽 실패) ≤ 15 %</text>
  <text x="220" y="172" class="tx-m">세 기준 모두 맞으면 합격</text>
  <rect x="500" y="25" width="190" height="70" rx="12" class="p2s"/><text x="595" y="54" text-anchor="middle" class="tx-b">✔ 합격</text><text x="595" y="76" text-anchor="middle" class="tx-m">완제품 입고 · 자동 출고</text>
  <rect x="500" y="120" width="190" height="70" rx="12" class="p5s"/><text x="595" y="149" text-anchor="middle" class="tx-b">✖ 불합격</text><text x="595" y="171" text-anchor="middle" class="tx-m">입고 · 출고 보류(폐기 처리)</text>
  <line x1="162" y1="105" x2="196" y2="105" class="ln" stroke-width="2" marker-end="url(#c10a2)"/>
  <line x1="452" y1="80" x2="496" y2="62" class="ln" stroke-width="2" marker-end="url(#c10a2)"/>
  <line x1="452" y1="130" x2="496" y2="150" class="ln" stroke-width="2" marker-end="url(#c10a2)"/>
</svg>`;

  const FIG_DASH = `<svg viewBox="0 0 700 300" role="img" aria-label="대시보드 구성: 맨 위 KPI, ERP MES 요구사항과 생산계획서 진행, 설비별 상태, 설비 가동 간트 차트, 시간대별 생산량과 설비별 OEE, 불량 파레토와 설비 건강도와 예지보전 알람">
  <rect x="10" y="10" width="680" height="40" rx="8" class="p1"/><text x="350" y="36" text-anchor="middle" class="tx-w">① KPI — OEE(공장) · 가동률 · 성능 · 품질 · 생산/계획 · 출고</text>
  <rect x="10" y="58" width="335" height="48" rx="8" class="p2s"/><text x="177" y="87" text-anchor="middle" class="tx">② ERP · MES 요구사항</text>
  <rect x="355" y="58" width="335" height="48" rx="8" class="p2s"/><text x="522" y="87" text-anchor="middle" class="tx">③ 생산계획서 진행(최근)</text>
  <rect x="10" y="114" width="680" height="40" rx="8" class="p3s"/><text x="350" y="139" text-anchor="middle" class="tx">④ 설비별 상태(현재 작업지시 · 대기 · OEE)</text>
  <rect x="10" y="162" width="680" height="40" rx="8" class="p4s"/><text x="350" y="187" text-anchor="middle" class="tx">⑤ 설비 가동 간트 차트(30분 · 1시간 · 4시간 · 8시간)</text>
  <rect x="10" y="210" width="335" height="36" rx="8" class="p5s"/><text x="177" y="233" text-anchor="middle" class="tx">⑥ 시간대별 생산량(10분)</text>
  <rect x="355" y="210" width="335" height="36" rx="8" class="p5s"/><text x="522" y="233" text-anchor="middle" class="tx">⑦ 설비별 OEE</text>
  <rect x="10" y="254" width="220" height="36" rx="8" class="card-bg"/><text x="120" y="277" text-anchor="middle" class="tx">⑧ 불량 유형(파레토)</text>
  <rect x="240" y="254" width="220" height="36" rx="8" class="card-bg"/><text x="350" y="277" text-anchor="middle" class="tx">⑨ 설비 건강도</text>
  <rect x="470" y="254" width="220" height="36" rx="8" class="card-bg"/><text x="580" y="277" text-anchor="middle" class="tx">⑩ 예지보전 알람</text>
</svg>`;

  // ---------------------------------------------------------------- 실습 블록
  const LAB_INSP = `<div class="lab" data-lab="ch10-1-a">
  <div class="lab-head"><span class="lab-badge">실습 10-1</span><b>검사 LOT 판정 읽기</b><span class="lab-meta">⏱ 10분 · 화면: MES → 생산오더 · 공정 · 기준정보</span></div>
  <p class="lab-goal">적재함마다 만들어지는 검사 LOT 의 판정과 그 기준을 확인하고, 불합격일 때 무슨 일이 생기는지 설명합니다.</p>
  <p class="lab-pre">적재함이 여러 번 출고된 상태(생산 중).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MES → <span class="ui">⚑ 생산오더 · 공정</span> 을 열고 아래로 내려 「검사 LOT(적재함 출하 검사)」 표를 찾습니다.</div>
      ${SHOT('ch09_pro_inspect', '검사 LOT 표')}
      <div class="lab-check">검사 번호 · 시각 · 작업지시 · 적재함 LOT · 판정 · 측정 열이 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">'측정' 열을 읽습니다.</div>
      <div class="lab-check">적재함 박스 수, 박스당 공작물 수, 불량률이 측정값으로 적혀 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">MES → <span class="ui">⇩ 기준정보 · 가져오기</span> 의 「근무 달력 · 검사 계획」 카드에서 검사 기준을 확인합니다.</div>
      <div class="lab-check">적재함 박스 수 1~5, 박스당 공작물 4개, 불량률(픽 실패) 15 % 이하 — 측정값이 셋 다 안에 들면 <b>✔ 합격</b> 입니다.</div></li>
    <li class="lab-step"><div class="lab-do">판정 열에서 <b>✖ 불합격</b> 줄이 있는지 찾습니다(없으면 아래 그림으로 이해합니다).</div>
      <div class="lab-check">불합격이 있으면 측정값 중 어떤 기준을 벗어났는지 적습니다. 흡착 문제로 픽 실패가 많아지면 불량률 기준을 넘습니다(12 · 16차시의 고장 사례).</div></li>
    <li class="lab-step"><div class="lab-do">불합격 적재함 LOT 번호를 ERP → <span class="ui">⇪ 출고</span> 의 LOT 열에서 찾아봅니다.</div>
      <div class="lab-check">불합격 LOT 은 출고 목록에 없습니다 — 출고하지 않고 품질 판정을 기다립니다. 완제품 재고로 입고되지도 않습니다.</div></li>
  </ol>
  <div class="lab-result">검사 LOT 은 <b>적재함마다 자동으로</b> 만들어지는 출하 검사입니다. 합격만 완제품 입고 · 출고로 이어지고, 불합격은 막힙니다 — 품질 문제가 고객에게 가지 않게 하는 장치입니다.</div>
</div>`;

  const LAB_QUALITY = `<div class="lab" data-lab="ch10-1-b">
  <div class="lab-head"><span class="lab-badge">실습 10-2</span><b>품질 기록 남기고 사유별 합계 보기</b><span class="lab-meta">⏱ 8분 · 화면: MES → 품질 · 대시보드</span></div>
  <p class="lab-goal">현장에서 발견한 불량을 코드 · 수량 · LOT 과 함께 기록하고, 사유별 합계와 대시보드 파레토에 반영되는 것을 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MES → <span class="ui">◎ 품질</span> 을 엽니다. 왼쪽 「불량 기록」 과 오른쪽 「불량 사유별 합계 (최근 기록)」 를 확인합니다.</div>
      ${SHOT('ch10_quality_mark', 'MES 품질 화면과 기록 버튼')}
      <div class="lab-check">자동으로 기록된 불량(예: MISSED_PICK = 미픽 · 통과)이 있을 수 있습니다. 없으면 '데이터 없음' 입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>불량 코드</b> 에 <code>SCRATCH</code>(긁힘), <b>수량</b> 2, <b>LOT (선택)</b> 에 최근 적재함 LOT 번호 하나를 입력합니다.</div>
      <div class="lab-check">LOT 번호는 <span class="ui">⛓ LOT 추적</span> 의 「최근 적재함 LOT」 에서 복사해 옵니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">기록</span> 을 누릅니다.</div>
      <div class="lab-check">왼쪽 표 맨 위에 SCRATCH 2 가 생기고, 오른쪽 사유별 합계에 SCRATCH 줄이 생깁니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 코드로 수량 1 을 한 번 더 기록합니다.</div>
      <div class="lab-check">사유별 합계의 SCRATCH 가 3 이 됩니다. 합계는 수량이 많은 코드부터 정렬됩니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">대시보드</span> 의 「불량 유형(파레토)」 카드를 봅니다.</div>
      ${SHOT('ch10_dash_pareto', '대시보드 불량 유형 파레토')}
      <div class="lab-check">방금 기록한 SCRATCH 가 막대로 나타납니다. 파레토는 품질 기록을 코드별로 더해 큰 것부터 보여 줍니다.</div>
      <div class="lab-tip">품질 기록은 지울 수 없습니다. 실습에서는 코드 이름에 "실습" 을 붙이거나(예: SCRATCH-TEST) 교사가 정한 코드만 씁니다.</div></li>
  </ol>
  <div class="lab-result">불량은 <b>코드 · 수량 · LOT</b> 으로 기록해야 나중에 원인을 찾을 수 있습니다. 사유별 합계와 파레토는 "가장 많이 나는 불량부터 고친다" 는 개선의 출발점입니다.</div>
</div>`;

  const LAB_TRACE = `<div class="lab" data-lab="ch10-1-c">
  <div class="lab-head"><span class="lab-badge">실습 10-3</span><b>LOT 하나를 끝까지 추적하기</b><span class="lab-meta">⏱ 12분 · 화면: MES → LOT 추적 · ERP → 출고</span></div>
  <p class="lab-goal">적재함 LOT 하나에서 아래(박스 · 공작물)로, 박스 LOT 에서 위(적재함)로, 그리고 출고까지 따라갑니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MES → <span class="ui">⛓ LOT 추적</span> 을 엽니다. 오른쪽 「최근 적재함 LOT」 에서 맨 위 LOT 번호 버튼을 누릅니다.</div>
      ${SHOT('mes_lots', 'MES LOT 추적 화면')}
      <div class="lab-check">왼쪽 「LOT 추적 (공작물 → 박스 → 적재함 → 출고)」 의 LOT 번호 칸이 채워지고 추적 결과가 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">추적 결과의 나무 구조를 읽습니다.</div>
      ${SHOT('mes_lots_trace', 'LOT 추적 결과')}
      <div class="lab-check">적재함 아래에 <b>박스 5개</b>, 각 박스 아래에 <b>공작물 4개</b>가 달려 있습니다. 각 줄에 유형(적재함 · 박스 · 공작물) · LOT 번호 · 수량이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">LOT 번호를 읽어 어느 설비에서 만들었는지 찾습니다.</div>
      <div class="lab-check">적재함 LOT 은 <code>CR-시작시각-설비-순번</code> 형식입니다. 가운데 숫자가 설비 번호입니다.</div></li>
    <li class="lab-step"><div class="lab-do">나무에서 <b>박스 LOT 번호 하나</b>를 복사해 위 LOT 번호 칸에 붙여 넣고 <span class="ui">추적</span> 을 누릅니다.</div>
      <div class="lab-check">"상위(담고 있는) LOT" 에 적재함 LOT 버튼이 나옵니다 — 박스에서 위로 거슬러 올라간 것입니다. 그 버튼을 누르면 다시 적재함으로 갑니다.</div></li>
    <li class="lab-step"><div class="lab-do">처음 적재함 LOT 번호를 ERP → <span class="ui">⇪ 출고</span> 의 「출고 현황」 LOT 열에서 찾습니다.</div>
      <div class="lab-check">그 LOT 의 출고번호(SH-…) · 수주번호(SO-…) · 출고 시각이 있습니다. 추적 화면 아래 안내문("출고 연결은 ERP 출고 탭의 LOT 열에서 확인") 그대로입니다.</div></li>
    <li class="lab-step"><div class="lab-do">활동지에 한 줄로 정리합니다: 고객 수주 → 출고 → 적재함 → 박스 → 공작물 · 설비 · 시각.</div>
      <div class="lab-check">"SO-… 의 출고 SH-… 는 설비 #n 에서 만든 적재함 CR-… 이고, 박스 5 · 공작물 20 개로 이루어졌다" 처럼 쓸 수 있습니다.</div></li>
  </ol>
  <div class="lab-result"><b>LOT 추적성(traceability)</b> 은 "이 제품이 언제 · 어느 설비에서 · 무엇으로 만들어졌는가" 에 답하는 능력입니다. 고객 불만이 오면 출고 하나에서 공작물까지 몇 번의 클릭으로 거슬러 갑니다.</div>
  <div class="lab-q">설비 #2 의 흡착 패드가 오후 2시부터 오염되었다는 것을 알았다면, 어떤 LOT 들을 다시 검사해야 할까요?</div>
</div>`;

  const LAB_EQ = `<div class="lab" data-lab="ch10-2-a">
  <div class="lab-head"><span class="lab-badge">실습 10-4</span><b>설비 · 알람 읽기</b><span class="lab-meta">⏱ 8분 · 화면: MES → 설비 · 알람</span></div>
  <p class="lab-goal">설비(장비)마다 상태와 알람 기록을 확인하고, 알람 "기록 해제" 의 의미를 정확히 이해합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MES → <span class="ui">⚙ 설비 · 알람</span> 을 엽니다. 왼쪽 「설비 상태」 표를 봅니다.</div>
      ${SHOT('mes_equipment', 'MES 설비 · 알람')}
      <div class="lab-check">설비 #n 마다 장비가 여러 줄입니다: 라인 · 공급 컨베이어(CONV) · 델타 로봇(DELTA) · UR3 · 카메라 A/B(CAM) · 에어(AIR) 등. 코드는 <b>역할 + 설비 번호</b>(예: CONV-02)입니다.</div></li>
    <li class="lab-step"><div class="lab-do">상태 열에서 ▶ 운전 · ○ 대기 · ✖ 이상 · 🔧 정비 같은 표시를 찾습니다.</div>
      <div class="lab-check">상태는 색과 아이콘 · 글자로 함께 표시됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 「알람」 표의 열 <b>발생 · 설비 · 수준 · 내용 · 해제</b> 를 확인합니다.</div>
      ${SHOT('ch10_equipment_alarm', '알람 표')}
      <div class="lab-check">수준은 정보 · 주의 · 위험, 내용에는 알람 코드와 메시지가 있습니다. 해제되지 않은 알람에는 <span class="ui">기록 해제</span> 버튼이 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">알람 표 위의 안내문을 소리 내어 읽습니다.</div>
      <div class="lab-check">"여기서의 해제는 MES 알람 기록의 해제이며, 장비 인터락 · 비상정지 해제와는 무관합니다." — 웹 화면은 안전 장치를 풀 수 없습니다(3차시 원칙).</div></li>
    <li class="lab-step"><div class="lab-do">위험 수준 알람이 있으면 그 설비 코드로 <span class="ui">공장 라인</span> 에서 상태를, <span class="ui">🔧 정비 · 예지보전</span> 에서 정비 오더를 찾아봅니다.</div>
      <div class="lab-check">알람 → 설비 상태 → 정비 오더가 같은 설비 코드로 이어집니다(11~12차시에서 자세히).</div></li>
  </ol>
  <div class="lab-result">MES 의 설비 · 알람은 <b>장비 단위의 상태와 이력</b>입니다. 알람 기록 해제는 "확인했다" 는 기록일 뿐, 실제 정지 · 복구는 현장(PLC · 안전 회로)에서 합니다.</div>
</div>`;

  const LAB_DASH = `<div class="lab" data-lab="ch10-2-b">
  <div class="lab-head"><span class="lab-badge">실습 10-5</span><b>대시보드 한 바퀴 — 10개 영역 읽기</b><span class="lab-meta">⏱ 15분 · 화면: 대시보드</span></div>
  <p class="lab-goal">대시보드의 10개 영역이 각각 무엇을 보여 주는지 읽고, 지금 공장 상태를 숫자로 말할 수 있게 합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">대시보드</span> 를 엽니다. 제목 옆 <b>가동 n/m대</b>, <b>모드: 시뮬레이션</b>, 갱신 시각을 확인합니다.</div>
      ${SHOT('ch10_dash_top', '대시보드 위쪽')}
      <div class="lab-check">갱신 시각이 몇 초마다 바뀝니다. 서버와 끊기면 '⚠ 연결 끊김 (마지막 값 표시 중)' 이 뜹니다.</div></li>
    <li class="lab-step"><div class="lab-do">① KPI 줄을 읽습니다: <b>OEE(공장) · 가동률 · 성능 · 품질(양품률) · 생산 / 계획(박스) · 출고</b>.</div>
      <div class="lab-check">OEE ≈ 가동률 × 성능 × 품질. 품질 칸 아래 불량률, 생산/계획 칸 아래 작업지시 대기 · 진행 · 완료 수, 출고 칸 아래 적재함 수 · 출고 대기가 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">② 「ERP · MES 요구사항」 과 ③ 「생산계획서 진행(최근)」 을 읽습니다.</div>
      ${SHOT('ch10_dash_req', 'ERP · MES 요구사항과 계획서 진행')}
      <div class="lab-check">진행 수주 · 수주 잔량 · 납기 임박 · 지연 · 자재 부족 · 대기 작업지시 · 미배정 작업지시 · 정비 오더(미완료). 칸에 마우스를 올리면 어디서 해결하는지 힌트가 나옵니다(예: 자재 부족 → ERP 자재(MRP)에서 구매 발주).</div></li>
    <li class="lab-step"><div class="lab-do">④ 「설비별 상태」 카드에서 설비마다 현재 작업지시 · 생산 색 · 대기 건수 · OEE 를 봅니다.</div>
      <div class="lab-check">진행 중 작업지시가 없는 설비는 "진행 중 작업지시 없음" 입니다.</div></li>
    <li class="lab-step"><div class="lab-do">⑤ 「설비 가동 간트 차트」 에서 기간을 <span class="ui">30분</span> → <span class="ui">1시간</span> → <span class="ui">4시간</span> → <span class="ui">8시간</span> 으로 바꿔 봅니다.</div>
      ${SHOT('ch10_dash_gantt', '설비 가동 간트 차트')}
      <div class="lab-check">설비마다 <b>상태 띠</b>(가동 · 대기 · 일시정지 · 이상 · 사용 안 함), <b>작업 계획</b>(점선) · 실제 작업(제품 색), <b>생산 완료(적재함)</b> 표시가 있습니다. 아래 띠 막대 옆에 '가동 n %' 가 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">⑥ 「시간대별 생산량(10분, 설비별 박스)」 과 ⑦ 「설비별 OEE (가동률 · 성능 · 품질, %)」 그래프를 봅니다.</div>
      ${SHOT('ch10_dash_charts', '시간대별 생산량과 설비별 OEE')}
      <div class="lab-check">생산량 막대가 0 인 구간은 설비가 멈췄거나 계획이 없던 시간입니다. 설비별 OEE 에서 가장 낮은 설비와, 세 막대 중 무엇이 낮은지 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">⑧ 불량 유형(파레토), ⑨ 설비 건강도(예지보전), ⑩ 예지보전 알람을 봅니다.</div>
      <div class="lab-check">파레토 = 실습 10-2 의 품질 기록, 건강도 · 알람 = 11~12차시 예지보전 AI 의 결과입니다. 열린 알람이 없으면 '✔ 열린 알람 없음'.</div></li>
  </ol>
  <div class="lab-result">대시보드는 <b>결과(KPI)</b> 만이 아니라 <b>해야 할 일(요구사항)</b> 과 <b>원인(간트 · 그래프 · 파레토 · 건강도)</b> 을 한 화면에 모읍니다. 숫자가 나쁘면 아래 영역에서 원인을 찾습니다.</div>
</div>`;

  const LAB_REPORT = `<div class="lab" data-lab="ch10-2-c">
  <div class="lab-head"><span class="lab-badge">실습 10-6</span><b>대시보드로 교대 보고서 쓰기</b><span class="lab-meta">⏱ 12분 · 화면: 대시보드 · MES · ERP</span></div>
  <p class="lab-goal">다음 근무조에게 넘길 <b>교대 보고서</b>를 대시보드 숫자로 작성합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">간트 기간을 <span class="ui">4시간</span>(또는 수업 시간에 맞게)으로 놓고, 보고서 머리에 <b>날짜 · 시간대 · 작성자 · 설비 대수</b> 를 적습니다.</div>
      <div class="lab-check">보고서가 다루는 시간 범위가 분명합니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>생산</b>: 생산/계획(박스), 출고(적재함 수), 진행 · 대기 · 완료 작업지시 수를 적습니다.</div>
      <div class="lab-check">예) 생산 295 / 계획 295 박스, 적재함 출고 17 개, 작업지시 완료 11 · 진행 2 · 대기 0.</div></li>
    <li class="lab-step"><div class="lab-do"><b>설비</b>: 공장 OEE 와 가장 낮은 설비, 그 이유(간트에서 대기 · 이상 구간 · OEE 세 막대 중 낮은 것)를 적습니다.</div>
      <div class="lab-check">"설비 #3 OEE 낮음 — 13:20~13:50 대기(작업지시 없음)" 처럼 시간과 원인을 함께 씁니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>품질</b>: 품질(양품률) · 불량률, 파레토 1위 불량 코드, 검사 LOT 불합격 수(MES 생산오더 · 공정)를 적습니다.</div>
      <div class="lab-check">불합격이 있으면 LOT 번호와 조치(재검사 · 보류)를 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>계획 · 자재</b>: ERP · MES 요구사항의 수주 잔량 · 납기 임박 · 지연 · 자재 부족 · 미배정 작업지시를 적습니다.</div>
      <div class="lab-check">다음 조가 처리할 일이 목록으로 정리되었습니다(예: 그린 공작물 부족 → 입고 확인 후 재릴리스).</div></li>
    <li class="lab-step"><div class="lab-do"><b>설비 건강 · 정비</b>: 예지보전 알람 · 정비 오더(미완료)와 설비 건강도에서 주의 이상인 설비를 적습니다.</div>
      <div class="lab-check">알람이 없으면 "열린 알람 없음" 이라고 씁니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>인계 사항</b> 세 줄을 쓰고, 짝과 보고서를 바꿔 읽은 뒤 빠진 숫자가 있는지 서로 확인합니다.</div>
      <div class="lab-check">짝이 내 보고서만 보고 공장 상태를 설명할 수 있으면 완성입니다.</div>
      <div class="lab-tip">14차시에서는 같은 보고서를 AI 도우미에게 물어 만든 뒤, 이 보고서와 비교해 검증합니다.</div></li>
  </ol>
  <div class="lab-result">교대 보고서는 <b>생산 · 설비 · 품질 · 계획/자재 · 설비 건강 · 인계</b> 여섯 칸이면 충분합니다. 숫자는 모두 대시보드와 MES · ERP 화면에 있습니다.</div>
</div>`;

  const QUIZ1 = [
    { q: '검사 LOT 이 <b>불합격</b>인 적재함에 대해 옳은 것은?',
      options: ['자동으로 출고된다', '완제품 입고 · 출고를 하지 않고 품질 판정을 기다린다', '다시 생산된다', '검사 기준이 자동으로 바뀐다'], answer: 1,
      explain: '불합격 LOT 은 출고하지 않고, 완제품으로 입고되지도 않습니다.' },
    { q: '이 플랫폼의 검사 계획 기준이 <b>아닌</b> 것은?',
      options: ['적재함 박스 수 1~5', '박스당 공작물 4개', '불량률(픽 실패) 15 % 이하', '적재함 무게 20 kg 이하'], answer: 3,
      explain: '검사 계획은 박스 수 · 박스당 공작물 수 · 불량률 세 가지입니다.' },
    { q: 'LOT 추적에서 박스 LOT 번호를 넣고 추적하면 나오는 "상위(담고 있는) LOT" 은?',
      options: ['공작물 LOT', '그 박스를 담은 적재함 LOT', '수주 번호', '설비 코드'], answer: 1,
      explain: '박스에서 위로 거슬러 올라가면 그 박스를 담은 적재함이 나옵니다.' },
    { q: '대시보드의 「불량 유형(파레토)」 는 어떤 데이터로 그려질까요?',
      options: ['MES 품질 기록을 코드별로 더한 값', '예지보전 이상 점수', 'ERP 재고', '간트 차트 상태'], answer: 0,
      explain: '품질 화면의 불량 기록(자동 · 수동)을 코드별로 합쳐 큰 순서로 보여 줍니다.' },
  ];
  const QUIZ2 = [
    { q: 'MES 설비 · 알람 화면의 <span class="ui">기록 해제</span> 를 누르면?',
      options: ['비상정지가 풀린다', '장비 인터락이 해제된다', 'MES 알람 기록만 해제된다', '설비가 다시 기동한다'], answer: 2,
      explain: '화면 안내대로 MES 알람 기록의 해제일 뿐, 안전 장치와는 무관합니다.' },
    { q: 'OEE 를 구성하는 세 요소로 옳은 것은?',
      options: ['가동률 · 성능 · 품질', '수주 · 재고 · 출고', '진동 · 전류 · 온도', '계획 · 실적 · 재고'], answer: 0,
      explain: 'OEE ≈ 가동률 × 성능 × 품질(양품률)입니다.' },
    { q: '간트 차트에서 점선 테두리 막대는 무엇을 뜻할까요?',
      options: ['실제 작업', '작업 계획', '이상 상태', '생산 완료 적재함'], answer: 1,
      explain: '계획은 점선 테두리, 실제 작업은 제품 색으로 채운 막대입니다.' },
    { q: '대시보드 「ERP · MES 요구사항」 의 "자재 부족" 이 1품목 이상일 때 가장 먼저 갈 화면은?',
      options: ['ERP → 자재(MRP) · 구매', 'MES → LOT 추적', '공장 라인', '가상 고장'], answer: 0,
      explain: '칸의 힌트대로 ERP 자재(MRP)에서 구매 발주합니다(8차시).' },
  ];

  // ---------------------------------------------------------------- MES 품질 · OEE 개념
  const QUALC_CONTENT = [
    { type: 'h', text: 'MES 의 품질 관리 — 검사 · 판정 · 추적' },
    { type: 'table', head: ['검사 종류', '언제', '이 플랫폼'], rows: [
      ['수입 검사', '자재가 들어올 때', '— (입고 시 수량만 확인)'],
      ['공정 검사', '만드는 도중', '카메라 A 공작물 검출(크기 · 겹침 이상 제외), 델타 픽 실패 기록'],
      ['출하 검사', '내보내기 전', '적재함마다 검사 LOT — 검사 계획의 기준으로 합격 · 불합격 판정'],
    ] },
    { type: 'table', head: ['품질 용어', '뜻'], rows: [
      ['검사 계획', '무엇을 어떤 기준(상한 · 하한)으로 검사할지 정한 문서 — MES 기준정보'],
      ['LOT', '같은 조건에서 함께 만든 묶음 — 이 플랫폼은 적재함 1개 = 1 LOT'],
      ['불량 코드 · 사유', '불량을 종류별로 나눈 이름 — 원인 분석(파레토)의 바탕'],
      ['정방향 추적', '원자재 · 공정 → 어느 제품 · 어느 고객에게 갔나(회수 범위 찾기)'],
      ['역방향 추적', '고객 불만 제품 → 언제 · 어느 설비 · 어떤 자재로 만들었나(원인 찾기)'],
    ] },
  ];
  const QUALC_SLIDES = [
    { layout: 'table', title: 'MES 의 품질 관리', head: ['구분', '이 플랫폼'], rows: [
      ['공정 검사', '카메라 A 검출 · 픽 실패 기록'], ['출하 검사', '적재함마다 검사 LOT'], ['정방향 추적', '자재 · 설비 → 어느 출고로'], ['역방향 추적', '불만 제품 → 언제 · 어디서']],
      notes: '<p>💬 "리콜할 때 필요한 것은 정방향일까 역방향일까?" → 둘 다: 역방향으로 원인을 찾고, 정방향으로 같은 원인의 다른 제품을 찾습니다.</p>' },
  ];
  const OEEC_FIG = `<svg viewBox="0 0 720 250" role="img" aria-label="OEE 는 가동률 곱하기 성능 곱하기 품질이며 각각 고장 정지와 준비 교체, 순간 정지와 속도 저하, 불량과 초기 수율 손실로 깎인다">
  <rect x="20" y="20" width="680" height="42" rx="10" class="p1"/><text x="360" y="47" text-anchor="middle" class="tx-w">OEE(설비 종합 효율) = 가동률 × 성능 × 품질</text>
  <rect x="20" y="80" width="215" height="150" rx="12" class="p2s"/><text x="127" y="106" text-anchor="middle" class="tx-b">가동률</text>
  <text x="127" y="128" text-anchor="middle" class="tx-m">운전 시간 ÷ 계획 시간</text>
  <text x="127" y="160" text-anchor="middle" class="tx">손실: 고장 정지</text><text x="127" y="182" text-anchor="middle" class="tx">손실: 준비 · 교체</text>
  <text x="127" y="212" text-anchor="middle" class="tx-m">예) 비상정지 · 이상(ERROR)</text>
  <rect x="252" y="80" width="215" height="150" rx="12" class="p3s"/><text x="360" y="106" text-anchor="middle" class="tx-b">성능</text>
  <text x="360" y="128" text-anchor="middle" class="tx-m">생산 개수 × 이상적 사이클 ÷ 운전 시간</text>
  <text x="360" y="160" text-anchor="middle" class="tx">손실: 순간 정지 · 공회전</text><text x="360" y="182" text-anchor="middle" class="tx">손실: 속도 저하</text>
  <text x="360" y="212" text-anchor="middle" class="tx-m">예) 박스 교체 중 델타 대기</text>
  <rect x="485" y="80" width="215" height="150" rx="12" class="p5s"/><text x="592" y="106" text-anchor="middle" class="tx-b">품질</text>
  <text x="592" y="128" text-anchor="middle" class="tx-m">양품 ÷ (양품 + 불량)</text>
  <text x="592" y="160" text-anchor="middle" class="tx">손실: 공정 불량</text><text x="592" y="182" text-anchor="middle" class="tx">손실: 초기 수율</text>
  <text x="592" y="212" text-anchor="middle" class="tx-m">예) 델타 픽 실패(MISSED_PICK)</text>
</svg>`;
  const OEEC_CONTENT = [
    { type: 'h', text: 'OEE — 설비가 얼마나 제대로 일했나' },
    { type: 'p', html: '<b>OEE(Overall Equipment Effectiveness, 설비 종합 효율)</b> 는 MES 의 대표적인 성과 지표입니다. 설비가 일해야 할 시간 동안 <b>멈추지 않고(가동률) · 제 속도로(성능) · 좋은 제품을(품질)</b> 만들었는지를 세 숫자의 곱으로 나타냅니다. 세 가지가 각각 90 % 여도 OEE 는 약 73 % — 작은 손실이 겹치면 생각보다 크게 깎입니다.' },
    { type: 'figure', html: OEEC_FIG, caption: 'OEE 의 세 요소와 대표적인 손실(흔히 "6대 로스" 라고 부릅니다)' },
    { type: 'table', head: ['요소', '이 플랫폼의 계산', '숫자가 낮다면'], rows: [
      ['가동률', '운전 시간 ÷ 계획 시간(운전 + 일시정지 + 이상). <b>대기 · 준비 상태는 계획 시간에서 뺍니다</b>', '일시정지 · 이상(비상정지 · 에어 · 도어 · 고장)으로 멈춘 시간이 길다'],
      ['성능', '(양품 + 불량 공작물) × 이상적 사이클 ÷ 운전 시간 (최대 100 %)', '박스 교체 · 픽 실패 등으로 운전 중에도 덜 만들었다'],
      ['품질', '양품 ÷ (양품 + 불량)', '픽 실패 · 검출 이상 같은 불량이 많다'],
    ], caption: '대시보드의 공장 · 설비별 OEE 는 선택한 시간 범위(30분 ~ 8시간) 동안의 PLC 상태 · 카운터 기록으로 계산합니다' },
  ];
  const OEEC_SLIDES = [
    { layout: 'diagram', title: 'OEE = 가동률 × 성능 × 품질', html: OEEC_FIG,
      notes: '<p>💬 "가동률 · 성능 · 품질이 모두 90 % 면 OEE 는?" → 0.9³ ≈ 73 %. 작은 손실이 곱해져 커진다는 것을 강조합니다.</p><p>이 플랫폼의 가동률은 대기 · 준비 시간을 빼고 계산합니다(계획이 없어 쉬는 시간은 손실이 아님).</p>' },
  ];
  PY_COURSE.addChapter({
    id: 'ch10', no: '10', title: 'MES ② 품질 · LOT · 대시보드', subtitle: 'Quality · Traceability · Dashboard',
    summary: '검사 LOT 판정 · 품질 기록 · LOT 추적과 설비 · 알람을 직접 확인하고, 대시보드의 10개 영역을 읽어 교대 보고서를 작성합니다.',
    goals: ['검사 LOT 판정 기준과 불합격의 영향을 설명할 수 있다',
      '품질 기록을 남기고 사유별 합계 · 파레토로 확인할 수 있다',
      'LOT 을 공작물 ↔ 박스 ↔ 적재함 ↔ 출고로 추적할 수 있다',
      '설비 · 알람과 대시보드를 읽고 교대 보고서를 쓸 수 있다'],
    sections: [
      {
        id: 'ch10-1', title: '품질과 LOT 추적', minutes: 50,
        goals: ['검사 LOT 판정과 검사 계획을 연결한다', '품질 기록을 남긴다', 'LOT 을 위아래로 추적하고 출고와 연결한다'],
        flow: [['도입 — 고객 불만이 오면?', 4], ['개념 — MES 품질 관리 · 추적성', 6], ['개념 — 검사 LOT · LOT 계보', 6], ['실습 10-1 검사 LOT', 9], ['실습 10-2 품질 기록', 8], ['실습 10-3 LOT 추적', 11], ['정리 · 퀴즈', 6]],
        content: [
          { type: 'p', html: '"지난주에 받은 박스에 긁힌 제품이 있어요." 고객에게서 이런 연락이 오면 공장은 무엇을 해야 할까요? 어느 설비에서 언제 만든 것인지, 같은 때 만든 다른 제품은 어디로 갔는지 찾아야 합니다. 이것을 가능하게 하는 것이 <mark>검사 LOT</mark> 과 <mark>LOT 추적</mark> 입니다.' },
          ...QUALC_CONTENT,
          { type: 'h', text: '검사 LOT — 적재함마다 출하 검사' },
          { type: 'figure', html: FIG_INSP, caption: '검사 계획(MES 기준정보)의 세 기준을 모두 만족해야 합격입니다' },
          { type: 'h', text: 'LOT 계보 — 공작물 → 박스 → 적재함 → 출고' },
          { type: 'figure', html: FIG_LOT, caption: '공작물 4개 = 박스 1개, 박스 5개 = 적재함 1개. 적재함 LOT 이 출고와 연결됩니다' },
          { type: 'table', head: ['화면', '보는 것'], rows: [
            ['MES → ⚑ 생산오더 · 공정 아래 「검사 LOT」', '적재함별 판정 · 측정값'],
            ['MES → ◎ 품질', '불량 기록 · 불량 사유별 합계'],
            ['MES → ⛓ LOT 추적', '적재함 ↔ 박스 ↔ 공작물 계보'],
            ['ERP → ⇪ 출고 (LOT 열)', '적재함 LOT 이 나간 출고 · 수주'],
            ['대시보드 → 불량 유형(파레토)', '불량 코드별 합계'],
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_INSP },
          { type: 'figure', html: LAB_QUALITY },
          { type: 'figure', html: LAB_TRACE },
          { type: 'callout', kind: 'more', title: '추적성과 AI', html: '추적성 데이터는 품질 AI 의 재료이기도 합니다. "어느 설비 · 어느 시간대 · 어떤 상태(예지보전 이상 점수)에서 불량이 많았는가" 를 LOT 으로 이어 붙이면, 불량 원인을 데이터로 찾을 수 있습니다. 16차시 사례 11 에서 불합격 LOT 을 예지보전 기록과 함께 분석합니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 적재함이 10개 이상 출고되어 있으면 LOT · 검사 LOT 이 충분합니다. 불합격 장면을 보여 주려면 수업 전에 가상 고장(델타 진공 누설 · 패드 오염)을 일으켜 픽 실패를 늘려 둡니다(12차시 방법). 없으면 그림으로 설명합니다.</li><li><b>실습 10-2</b>: 품질 기록은 지울 수 없습니다. 반 전체가 같은 서버라면 교사가 코드를 정해 줍니다(예: SCRATCH-1반). 파레토에 실습 기록이 섞인다는 점을 미리 알려 줍니다.</li><li><b>자주 막히는 곳</b>: LOT 번호를 손으로 치다 틀림 → 「최근 적재함 LOT」 버튼을 누르거나 복사 · 붙여넣기를 씁니다.</li><li><b>발문</b>: "LOT 추적이 없다면 불량 한 건 때문에 무엇을 회수해야 할까?" → 그날 만든 전부.</li><li><b>확인 기준</b>: 실습 10-3 의 한 줄 정리(수주 → 출고 → 적재함 → 박스 → 공작물 · 설비 · 시각).</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: '품질과 LOT 추적', subtitle: '언제 · 어디서 · 무엇으로 만들었나', notes: '<p>도입: 고객 불만 전화 상황극(교사가 고객 역). "무엇부터 찾아야 할까요?"</p>' },
          ...QUALC_SLIDES,
          { layout: 'diagram', title: '검사 LOT 판정', html: FIG_INSP, notes: '<p>세 기준을 판서. 불합격이면 입고 · 출고가 막힌다는 것을 8차시 재고 · 출고와 연결합니다.</p>' },
          { layout: 'diagram', title: '화면 — 검사 LOT 표', html: SHOT('ch09_pro_inspect', '검사 LOT 표'), notes: '<p>측정 열 읽는 법 시연. 불합격 줄이 있으면 어떤 기준을 넘었는지 함께 읽습니다.</p>' },
          { layout: 'bullets', title: '실습 10-1 · 10-2 (18분)', bullets: ['검사 LOT 표: 판정 · 측정', '검사 계획 기준 확인', '불합격 LOT 이 출고에 없는지 확인', '품질 기록: 코드 · 수량 · LOT → 기록', '사유별 합계 · 대시보드 파레토'],
            notes: '<p>품질 기록 코드는 교사가 정해 줍니다(지울 수 없음).</p>' },
          { layout: 'diagram', title: 'LOT 계보', html: FIG_LOT, notes: '<p>💬 "적재함 하나에 공작물은 몇 개?" → 20.</p>' },
          { layout: 'diagram', title: '화면 — LOT 추적 결과', html: SHOT('mes_lots_trace', 'LOT 추적 결과'), notes: '<p>나무 구조를 펼쳐 보여 주고, 박스 LOT 으로 다시 추적하면 상위 LOT 이 나오는 것을 시연합니다.</p>' },
          { layout: 'bullets', title: '실습 10-3 · LOT 추적 (12분)', bullets: ['최근 적재함 LOT → 추적', 'LOT 번호로 설비 찾기(CR-시각-설비-순번)', '박스 LOT 으로 추적 → 상위 LOT', 'ERP 출고 LOT 열에서 같은 번호', '한 줄로 정리'],
            notes: '<p>완성한 한 줄 정리를 두세 명 발표시킵니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[0].q, options: QUIZ1[0].options, answer: QUIZ1[0].answer, explain: QUIZ1[0].explain, notes: '<p>"불합격 제품이 출고되면 어떤 일이 생길까?" 를 덧붙여 묻습니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['검사 LOT: 적재함마다 세 기준 → 합격/불합격', '불합격 = 입고 · 출고 보류', '품질 기록: 코드 · 수량 · LOT → 파레토', 'LOT 추적: 공작물 ↔ 박스 ↔ 적재함 ↔ 출고'],
            notes: '<p>다음 교시: 설비 · 알람과 대시보드, 교대 보고서.</p>' },
        ],
      },
      {
        id: 'ch10-2', title: '설비 · 알람과 대시보드', minutes: 50,
        goals: ['설비 상태 · 알람과 기록 해제의 의미를 설명한다', '대시보드 10개 영역을 읽는다', '대시보드로 교대 보고서를 쓴다'],
        flow: [['도입 — 한 화면으로 공장 보기', 3], ['개념 — OEE 와 6대 로스', 6], ['실습 10-4 설비 · 알람', 7], ['개념 — 대시보드 구성', 3], ['실습 10-5 대시보드 읽기', 13], ['실습 10-6 교대 보고서', 12], ['정리 · 퀴즈', 6]],
        content: [
          { type: 'p', html: '공장장은 아침에 무엇을 가장 먼저 볼까요? 수십 개 화면을 다 열어 볼 수는 없습니다. 그래서 <mark>대시보드</mark>가 있습니다. 이 교시에서는 MES 의 설비 · 알람을 먼저 보고, 대시보드의 모든 영역을 읽은 뒤, 그것으로 다음 근무조에 넘길 <b>교대 보고서</b>를 씁니다.' },
          ...OEEC_CONTENT,
          { type: 'h', text: '대시보드의 10개 영역' },
          { type: 'figure', html: FIG_DASH, caption: '위에서 아래로: 결과(KPI) → 해야 할 일(요구사항 · 계획) → 설비 → 시간(간트) → 그래프 → 품질 · 설비 건강' },
          { type: 'table', head: ['KPI', '뜻', '낮을 때 볼 곳'], rows: [
            ['가동률', '계획 시간(운전 + 일시정지 + 이상) 중 실제로 운전한 비율 — 대기는 빠짐', '간트의 일시정지 · 이상 구간, 알람'],
            ['성능', '이상적인 속도 대비 실제 생산 속도', '픽 실패 · 미픽, 품목 전환'],
            ['품질(양품률)', '전체 중 양품 비율', '파레토, 검사 LOT 불합격'],
            ['OEE', '가동률 × 성능 × 품질', '세 요소 중 가장 낮은 것부터'],
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_EQ },
          { type: 'figure', html: LAB_DASH },
          { type: 'figure', html: LAB_REPORT },
          { type: 'callout', kind: 'info', title: '대시보드와 AI', html: '대시보드의 숫자는 사람이 읽는 것이지만, 같은 숫자를 <b>AI 도우미</b>도 조회 도구로 읽습니다(14차시). "지금 설비별 진행 상황은?" 이라고 물으면 AI 가 대시보드와 같은 데이터를 요약해 줍니다. 그러나 보고서에 쓰기 전에 대시보드 숫자와 맞는지 확인하는 것은 사람의 몫입니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 수업 1~2시간 전부터 설비 2대 이상을 생산 중으로 두면 간트 · 생산량 그래프가 풍부해집니다. 운전 중인 한 설비를 몇 분 <b>일시정지</b>해 두면 가동률이 떨어지는 것을 보여 주기 좋습니다. 작업지시 없이 <b>대기</b>한 설비는 가동률이 떨어지지 않는다는 것(대기는 계획 시간에서 빠짐)도 함께 비교합니다.</li><li><b>실습 10-4</b>: "기록 해제 = 안전 해제가 아니다" 는 반드시 짚습니다(3차시 원칙과 연결).</li><li><b>실습 10-5</b>: 간트 기간 버튼(30분~8시간)을 바꿔 가며 같은 설비의 가동률이 달라지는 이유(보는 구간이 다름)를 묻습니다.</li><li><b>실습 10-6 평가 루브릭</b>: 6칸(생산 · 설비 · 품질 · 계획/자재 · 설비 건강 · 인계) 각 1점, 숫자 근거 1점, 원인 · 시간을 함께 쓴 경우 1점 — 8점 만점.</li><li><b>확인 기준</b>: 교대 보고서 제출(14차시 AI 보고서와 비교할 자료로 보관).</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '설비 · 알람과 대시보드', subtitle: '한 화면으로 공장 읽기', notes: '<p>💬 "공장장이 아침에 가장 먼저 보고 싶은 숫자 세 개는?" — 생산량 · 불량 · 고장.</p>' },
          ...OEEC_SLIDES,
          { layout: 'diagram', title: '화면 — 설비 · 알람', html: SHOT('mes_equipment', 'MES 설비 · 알람'), notes: '<p>설비 코드 = 역할 + 번호. 알람 기록 해제는 안전 해제가 아님을 강조.</p>' },
          { layout: 'bullets', title: '실습 10-4 · 설비 · 알람 (8분)', bullets: ['설비 상태: 장비별 상태 아이콘', '알람: 발생 · 설비 · 수준 · 내용 · 해제', '안내문 읽기 — 기록 해제 ≠ 인터락 해제', '알람 → 라인 · 정비 오더로 이어 보기'],
            notes: '<p>안내문을 학생이 소리 내어 읽게 합니다.</p>' },
          { layout: 'diagram', title: '대시보드 10개 영역', html: FIG_DASH, notes: '<p>위에서 아래로 "결과 → 할 일 → 설비 → 시간 → 원인" 순서라는 것을 짚습니다.</p>' },
          { layout: 'table', title: 'KPI 읽기', head: ['KPI', '낮을 때'], rows: [['가동률', '간트 일시정지 · 이상'], ['성능', '픽 실패 · 품목 전환'], ['품질', '파레토 · 불합격'], ['OEE', '세 요소 중 가장 낮은 것']],
            notes: '<p>OEE 는 곱이므로 하나만 낮아도 크게 떨어진다는 점을 예로 보여 줍니다(0.9 × 0.9 × 0.9 ≈ 0.73).</p>' },
          { layout: 'diagram', title: '간트 차트', html: SHOT('ch10_dash_gantt', '설비 가동 간트 차트'), notes: '<p>상태 띠 · 계획(점선) · 실제(색) · 생산 완료 표시와 기간 버튼을 시연합니다.</p>' },
          { layout: 'bullets', title: '실습 10-5 · 10-6 (27분)', bullets: ['대시보드 10개 영역 차례로 읽기', '간트 기간 바꿔 보기', '교대 보고서 6칸: 생산 · 설비 · 품질 · 계획/자재 · 건강 · 인계', '짝과 바꿔 읽고 빠진 숫자 확인'],
            notes: '<p>보고서는 14차시 AI 도우미 보고서와 비교할 자료이므로 보관하게 합니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[0].q, options: QUIZ2[0].options, answer: QUIZ2[0].answer, explain: QUIZ2[0].explain, notes: '<p>오답이 있으면 3차시 "웹 · AI 는 안전 장치를 우회할 수 없다" 를 다시 짚습니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['설비 · 알람: 장비 단위 상태 · 이력, 기록 해제 ≠ 안전 해제', '대시보드: KPI → 요구사항 → 설비 → 간트 → 그래프 → 품질 · 건강', 'OEE = 가동률 × 성능 × 품질', '교대 보고서 6칸'],
            notes: '<p>다음 차시: AI 예지보전 ① — 데이터와 이상 탐지.</p>' },
        ],
      },
    ],
  });
})();
