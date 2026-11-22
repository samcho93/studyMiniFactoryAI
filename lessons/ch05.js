/* 05 공장 라인과 3D 디지털트윈 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_FLOW = `<svg viewBox="0 0 720 210" role="img" aria-label="공정 흐름: 공작물 공급, 카메라 A 검출, 델타 로봇 픽, 박스 4개 적재, UR3 적재, 적재함 5박스, 출고">
  ${ARROW('c05a1')}
  <rect x="5" y="40" width="90" height="70" rx="10" class="p1s"/><text x="50" y="70" text-anchor="middle" class="tx-b">공급</text><text x="50" y="90" text-anchor="middle" class="tx-m">컨베이어</text>
  <rect x="110" y="40" width="90" height="70" rx="10" class="p2s"/><text x="155" y="70" text-anchor="middle" class="tx-b">카메라 A</text><text x="155" y="90" text-anchor="middle" class="tx-m">위치 · 각도</text>
  <rect x="215" y="40" width="90" height="70" rx="10" class="p3s"/><text x="260" y="70" text-anchor="middle" class="tx-b">델타 로봇</text><text x="260" y="90" text-anchor="middle" class="tx-m">따라가며 픽</text>
  <rect x="320" y="40" width="90" height="70" rx="10" class="p4s"/><text x="365" y="70" text-anchor="middle" class="tx-b">포장박스</text><text x="365" y="90" text-anchor="middle" class="tx-m">4개 정렬</text>
  <rect x="425" y="40" width="90" height="70" rx="10" class="p5s"/><text x="470" y="70" text-anchor="middle" class="tx-b">UR3</text><text x="470" y="90" text-anchor="middle" class="tx-m">만재 박스 이송</text>
  <rect x="530" y="40" width="90" height="70" rx="10" class="p2s"/><text x="575" y="70" text-anchor="middle" class="tx-b">적재함</text><text x="575" y="90" text-anchor="middle" class="tx-m">5박스</text>
  <rect x="635" y="40" width="80" height="70" rx="10" class="p1"/><text x="675" y="80" text-anchor="middle" class="tx-w">출고</text>
  <line x1="96" y1="75" x2="107" y2="75" class="ln" stroke-width="2" marker-end="url(#c05a1)"/>
  <line x1="201" y1="75" x2="212" y2="75" class="ln" stroke-width="2" marker-end="url(#c05a1)"/>
  <line x1="306" y1="75" x2="317" y2="75" class="ln" stroke-width="2" marker-end="url(#c05a1)"/>
  <line x1="411" y1="75" x2="422" y2="75" class="ln" stroke-width="2" marker-end="url(#c05a1)"/>
  <line x1="516" y1="75" x2="527" y2="75" class="ln" stroke-width="2" marker-end="url(#c05a1)"/>
  <line x1="621" y1="75" x2="632" y2="75" class="ln" stroke-width="2" marker-end="url(#c05a1)"/>
  <text x="360" y="150" text-anchor="middle" class="tx">카메라 B(예지보전)는 벨트 사행 · 흡착 패드를 따로 찍습니다.</text>
  <text x="360" y="175" text-anchor="middle" class="tx-m">출고 1회 = MES 실적 1건 = ERP 출고 · 재고 반영(7 · 9차시)</text>
</svg>`;

  const FIG_STATE = `<svg viewBox="0 0 720 250" role="img" aria-label="라인 상태: 대기, 준비, 운전, 일시정지, 이상. 이상은 리셋하면 준비로 돌아간다">
  ${ARROW('c05a2')}
  <rect x="20" y="90" width="110" height="56" rx="12" class="card-bg"/><text x="75" y="115" text-anchor="middle" class="tx-b">○ 대기</text><text x="75" y="134" text-anchor="middle" class="tx-m">IDLE</text>
  <rect x="180" y="90" width="110" height="56" rx="12" class="p2s"/><text x="235" y="115" text-anchor="middle" class="tx-b">◔ 준비</text><text x="235" y="134" text-anchor="middle" class="tx-m">READY</text>
  <rect x="350" y="90" width="110" height="56" rx="12" class="p1s"/><text x="405" y="115" text-anchor="middle" class="tx-b">▶ 운전</text><text x="405" y="134" text-anchor="middle" class="tx-m">RUNNING</text>
  <rect x="540" y="90" width="140" height="56" rx="12" class="p4s"/><text x="610" y="115" text-anchor="middle" class="tx-b">⏸ 일시정지</text><text x="610" y="134" text-anchor="middle" class="tx-m">PAUSED</text>
  <rect x="290" y="190" width="140" height="50" rx="12" class="p5s"/><text x="360" y="213" text-anchor="middle" class="tx-b">✖ 이상</text><text x="360" y="231" text-anchor="middle" class="tx-m">ERROR (비상정지 등)</text>
  <line x1="131" y1="118" x2="177" y2="118" class="ln" stroke-width="2" marker-end="url(#c05a2)"/>
  <line x1="291" y1="110" x2="347" y2="110" class="ln" stroke-width="2" marker-end="url(#c05a2)"/>
  <text x="318" y="100" text-anchor="middle" class="tx-m">기동</text>
  <line x1="347" y1="128" x2="293" y2="128" class="ln" stroke-width="2" marker-end="url(#c05a2)"/>
  <text x="318" y="145" text-anchor="middle" class="tx-m">정지</text>
  <line x1="461" y1="108" x2="537" y2="108" class="ln" stroke-width="2" marker-end="url(#c05a2)"/>
  <text x="500" y="100" text-anchor="middle" class="tx-m">일시정지</text>
  <line x1="537" y1="130" x2="463" y2="130" class="ln" stroke-width="2" marker-end="url(#c05a2)"/>
  <text x="500" y="146" text-anchor="middle" class="tx-m">재개</text>
  <line x1="405" y1="148" x2="380" y2="187" class="ln" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#c05a2)"/>
  <line x1="300" y1="200" x2="240" y2="150" class="ln" stroke-width="2" marker-end="url(#c05a2)"/>
  <text x="240" y="185" text-anchor="middle" class="tx-m">리셋(원인 해소 후)</text>
  <text x="360" y="40" text-anchor="middle" class="tx">박스: 비어 있음 → 적재 중(0~4) → 만재 → UR 적재 → 완료</text>
  <text x="360" y="64" text-anchor="middle" class="tx">적재함: 비어 있음 → 적재 중(n/5) → 만재 → 출고 중 → 출고 완료</text>
</svg>`;

  // ---------------------------------------------------------------- 실습 5-1
  const LAB_VIEW = `<div class="lab" data-lab="ch05-1-a">
  <div class="lab-head"><span class="lab-badge">실습 5-1</span><b>3D 시점 투어</b><span class="lab-meta">⏱ 10분 · 화면: 공장 라인</span></div>
  <p class="lab-goal">프리셋 시점 · 마우스 조작으로 미니공장 구석구석을 살펴보고, 공정 순서대로 장비 이름을 확인합니다.</p>
  <p class="lab-pre">실습 프로그램 실행 · 위 메뉴 <b>공장 라인</b></p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">공장 라인</span> 을 엽니다. 3D 화면 왼쪽 위의 <b>시점 프리셋</b> 버튼 줄을 찾습니다.</div>
      ${SHOT('ch05_presets', '공장 라인 — 시점 프리셋 버튼 강조')}
      <div class="lab-check"><span class="ui">공장 전체</span> · <span class="ui">설비 #1</span> · <span class="ui">델타 셀 #1</span> · <span class="ui">UR 셀 #1</span> · <span class="ui">적재·출고 #1</span> · <span class="ui">제어반(PC·PLC) #1</span> 버튼이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 전체</span> 를 누릅니다.</div>
      ${SHOT('line_twin_factory', '공장 전체 시점')}
      <div class="lab-check">설비(작업대) 여러 대가 한 화면에 보이고, 각 설비 위에 <b>설비 #n</b> 표지가 떠 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">델타 셀 #1</span> 을 누르고, 컨베이어 위 공작물을 델타 로봇이 집는 모습을 지켜봅니다.</div>
      ${SHOT('line_twin_delta', '델타 셀 시점')}
      <div class="lab-check">공작물이 비스듬히 놓여 있어도 델타가 따라가서 집고, 옆 포장박스에 <b>4개씩 나란히</b> 놓습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">UR 셀 #1</span> → <span class="ui">적재·출고 #1</span> 순서로 눌러 봅니다.</div>
      <div class="shot-pair">${SHOT('line_twin_ur', 'UR 셀 시점')}${SHOT('line_twin_crate', '적재 · 출고 시점')}</div>
      <div class="lab-check">UR3 가 꽉 찬 박스를 2지 그리퍼로 잡아 <b>파란 적재함</b>에 쌓고, 적재함이 차면 출고되는 위치를 확인했습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">제어반(PC·PLC) #1</span> 을 누릅니다.</div>
      <div class="lab-check">작업대 아래 유리 캐비닛 안에 PC · PLC 제어반이 보입니다. 조작반의 기동 · 정지 · 리셋 · 비상정지 버튼도 3D 로 있습니다(5-2 교시에서 사용).</div></li>
    <li class="lab-step"><div class="lab-do">3D 화면에서 마우스를 <b>왼쪽 버튼으로 끌어</b> 시점을 돌리고, <b>휠</b>로 확대 · 축소, <b>오른쪽 버튼으로 끌어</b> 화면을 옮겨 봅니다.</div>
      <div class="lab-check">시점만 바뀌고 장비는 움직이지 않습니다. 3D 화면 아래 안내문 "3D 화면은 읽기 전용입니다 …" 를 확인합니다.</div>
      <div class="lab-tip">시점이 엉키면 프리셋 버튼을 다시 누르면 됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">3D 화면 위쪽의 <b>설비 탭</b>(<span class="ui">설비 #2</span> 등)을 눌러 다른 설비로 초점을 옮긴 뒤 프리셋 이름이 바뀌는지 봅니다.</div>
      <div class="lab-check">프리셋 버튼이 <span class="ui">델타 셀 #2</span> 처럼 선택한 설비 번호로 바뀝니다. 탭에는 설비 상태 배지(준비 · 운전 …)와 생산 색이 함께 보입니다.</div></li>
  </ol>
  <div class="lab-result">3D 디지털트윈은 실제(시뮬레이션) 설비 상태를 그대로 보여 주는 <b>읽기 전용</b> 화면입니다. 프리셋 시점으로 공정 순서(공급 → 델타 → 박스 → UR3 → 적재함)를 따라가며 볼 수 있습니다.</div>
  <div class="lab-q">3D 화면에서 장비를 끌어 로봇을 직접 움직일 수 없게 만든 이유는 무엇일까요?</div>
</div>`;

  // ---------------------------------------------------------------- 실습 5-2
  const LAB_DETAIL = `<div class="lab" data-lab="ch05-1-b">
  <div class="lab-head"><span class="lab-badge">실습 5-2</span><b>장비 상세 · 카메라 A/B 관찰</b><span class="lab-meta">⏱ 15분 · 화면: 공장 라인</span></div>
  <p class="lab-goal">장비를 눌러 상세 패널(상태 · 센서 · 알람 · 이력)을 열고, 카메라 A(검출) · 카메라 B(예지보전) 영상이 무엇을 보는지 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">3D 화면 오른쪽 아래의 <b>카메라 영상 두 개</b>를 찾습니다.</div>
      ${SHOT('ch05_pips', '카메라 A · B 영상 패널')}
      <div class="lab-check">왼쪽은 <b>설비 #1 카메라 A · 공작물 검출</b>, 오른쪽은 <b>카메라 B · 예지보전</b> 이고, 영상 아래에 무엇을 찍는지 설명이 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">카메라 A 영상을 1분 정도 봅니다. 공작물 둘레에 그려지는 사각형 · 번호를 관찰합니다.</div>
      <div class="lab-check">공작물마다 위치 · 각도를 찾은 표시(검출 오버레이)가 붙습니다. 이 결과로 델타가 어디를 집을지 정합니다.</div></li>
    <li class="lab-step"><div class="lab-do">카메라 A 영상을 한 번 누릅니다.</div>
      ${SHOT('ch05_detail_cam', '카메라 영상을 누르면 3D 위치 강조와 상세 패널')}
      <div class="lab-check">영상 제목 오른쪽이 <b>◉ 3D 위치</b> 로 바뀌고, 3D 화면에서 그 카메라가 강조됩니다. 아래에 <b>카메라 A (공작물 검출) #1</b> 상세 패널이 열립니다.</div></li>
    <li class="lab-step"><div class="lab-do">상세 패널의 <b>상태 · 알람 · 최근 이력</b> 세 칸을 읽고 <span class="ui">닫기</span> 합니다.</div>
      <div class="lab-check">열린 알람이 없으면 "열린 알람 없음" 으로 표시됩니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">델타 셀 #1</span> 시점에서 3D 의 <b>델타 로봇 본체</b>를 클릭합니다.</div>
      <div class="lab-check">델타 로봇 상세 패널이 열리고 <b>동작 상태 · 진공(● 켜짐/○ 꺼짐) · 엔드이펙터 위치(mm)</b> 와 전류 · 온도 · 진공압 같은 센서 값이 보입니다.</div>
      <div class="lab-tip">클릭이 잘 안 되면 장비를 조금 확대한 뒤 몸체 한가운데를 누르세요.</div></li>
    <li class="lab-step"><div class="lab-do">같은 방법으로 <b>컨베이어</b>와 <b>UR3</b> 를 클릭해 상세 패널을 비교합니다.</div>
      <div class="lab-check">컨베이어: 운전 · 속도(mm/s) · 추적 중 공작물 수 / UR3: 프로그램 · 안전 상태 · 박스 파지 여부가 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">카메라 B 영상 아래 설명(<b>예지보전 · 벨트 사행 · 흡착 패드 (왼쪽부터)</b>)을 읽고, 영상의 두 부분이 각각 무엇인지 확인합니다.</div>
      <div class="lab-check">왼쪽 = 컨베이어 벨트 가장자리(사행 감시), 오른쪽 = 델타 흡착 패드(오염 감시). 이 영상은 11~12차시 예지보전 AI 의 입력입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">설비 #1</span> 시점에서 작업대 옆 <b>HMI 모니터</b>(MINI FACTORY CELL #1)를 찾습니다.</div>
      ${SHOT('hero_delta', '델타 근접 — 오른쪽 아래 HMI 모니터')}
      <div class="lab-check">모니터에 OK · NG 개수, BOX · CRATE 수량, 카메라 영상이 보입니다. 선택한 설비만 영상이 갱신됩니다.</div></li>
  </ol>
  <div class="lab-result">카메라 A 는 <b>생산(피킹)</b>을, 카메라 B 는 <b>예지보전</b>을 위한 눈입니다. 장비를 누르면 그 장비의 상태 · 센서 · 알람 · 이력이 한곳에 모입니다.</div>
</div>`;

  // ---------------------------------------------------------------- 실습 5-3
  const LAB_COUNT = `<div class="lab" data-lab="ch05-1-c">
  <div class="lab-head"><span class="lab-badge">실습 5-3</span><b>설비 대수 바꾸기 (1대 ↔ 4대)</b><span class="lab-meta">⏱ 8분 · 화면: 공장 라인</span></div>
  <p class="lab-goal">설비(작업대) 대수를 바꾸면 3D 배치와 MES 배정 대상이 어떻게 바뀌는지 확인하고, 원래 대수로 되돌립니다.</p>
  <p class="lab-pre">모든 설비가 <b>준비 · 대기</b> 상태(운전 중이 아님). 강의실에서 서버 하나를 함께 쓰면 <b>강사 PC 에서만</b> 합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">3D 화면 위 오른쪽 <b>설비 대수</b> 버튼(<span class="ui">1대</span> ~ <span class="ui">4대</span>)을 찾고, 지금 몇 대인지 적어 둡니다.</div>
      ${SHOT('ch05_cellbar', '설비 대수 버튼 강조')}
      <div class="lab-check">눌린 버튼이 현재 대수입니다(예: 4대). 왼쪽 설비 탭 수와 같습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">1대</span> 를 누릅니다.</div>
      ${SHOT('ch05_count_dialog', '설비 대수 변경 확인 대화상자')}
      <div class="lab-check">"사용할 설비를 1대로 바꿀까요?" 확인 창이 뜨고, 줄일 설비가 운전 중이면 바뀌지 않는다는 경고가 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">변경</span> 을 누르고 <span class="ui">공장 전체</span> 시점을 봅니다.</div>
      <div class="lab-check">3D 장면이 설비 1대로 다시 배치되고, 설비 탭이 <span class="ui">설비 #1</span> 하나만 남습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">3대</span> 로 바꿔 봅니다.</div>
      <div class="lab-check">1~3대는 <b>한 줄</b>로 나란히 배치됩니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">4대</span> 로 바꾸고 <span class="ui">공장 전체</span> 를 누릅니다(<b>원래 대수로 복구</b>).</div>
      <div class="lab-check">4대는 <b>2 × 2</b> 로 배치됩니다. 설비 탭이 #1~#4 로 돌아왔습니다.</div>
      <div class="lab-tip">처음 적어 둔 대수가 4대가 아니었다면 그 대수로 되돌립니다.</div></li>
  </ol>
  <div class="lab-result">설비 대수는 공장 규모를 바꾸는 설정입니다. 생산계획의 설비 배정(7 · 13차시)은 사용 중인 설비 대수를 기준으로 작업지시를 나눕니다.</div>
</div>`;

  // ---------------------------------------------------------------- 실습 5-4
  const LAB_RUN = `<div class="lab" data-lab="ch05-2-a">
  <div class="lab-head"><span class="lab-badge">실습 5-4</span><b>수동 운전 한 사이클</b><span class="lab-meta">⏱ 15분 · 화면: 공장 라인</span></div>
  <p class="lab-goal">상위 명령(기동 · 일시정지 · 재개 · 정지)을 확인 단계를 거쳐 보내고, 박스 0 → 4 → UR3 적재 → 적재함 수량이 바뀌는 과정을 PLC 카운터로 확인합니다.</p>
  <p class="lab-pre">설비 #1 이 <b>준비</b> 상태. (생산계획으로 이미 운전 중이면 다른 설비 탭을 고르세요.)</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">오른쪽 <b>상위 명령</b> 카드를 찾습니다. 설비가 여러 대면 위쪽에서 명령 대상(<span class="ui">설비 #1</span> / <span class="ui">전체 설비 (4대)</span>)을 고릅니다 — <span class="ui">설비 #1</span>.</div>
      ${SHOT('ch05_cmd_panel', '상위 명령 버튼 강조')}
      <div class="lab-check">버튼 <span class="ui">기동</span> · <span class="ui">일시정지</span> · <span class="ui">재개</span> · <span class="ui">정지</span> · <span class="ui">리셋</span> · <span class="ui">■ 비상정지</span> 가 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do">아래 <b>PLC 상태 · 카운터</b> 카드에서 <b>투입 · 양품 · 박스 내 수량 · 적재함 박스 수 · 출고된 적재함</b> 값을 적어 둡니다.</div>
      <div class="lab-check">상태 배지가 <b>◔ 준비</b>, 스택라이트는 황색이 켜져 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">기동</span> 을 누릅니다.</div>
      ${SHOT('ch05_start_confirm', '기동 명령 확인 대화상자')}
      <div class="lab-check">"설비 #1에 기동 명령을 보낼까요?" 확인 창이 뜹니다. <b>명령은 바로 가지 않고 반드시 확인을 거칩니다.</b></div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">기동 전송</span> 을 누르고 20~30초 지켜봅니다.</div>
      ${SHOT('ch05_running', '운전 중 — PLC 상태 · 카운터')}
      <div class="lab-check">상태 배지가 <b>▶ 운전</b>, 녹색등 켜짐, 컨베이어 ▶ 운전 · 80 mm/s. 상위 명령 카드 아래에 <b>명령 접수: start → 설비 #1 (감사 로그 #…)</b> 가 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do"><b>박스 내 수량</b>이 0 → 1 → … → 4 로 차는 것을 보고, 4가 되는 순간 <span class="ui">UR 셀 #1</span> 시점으로 바꿉니다.</div>
      <div class="lab-check">박스가 만재(4/4)되면 박스 라인이 한 칸 이동하고 UR3 가 그 박스를 적재함에 쌓습니다. <b>적재함 박스 수</b>가 1 늘어납니다.</div>
      <div class="lab-tip">공급 컨베이어는 박스를 바꾸는 동안에도 멈추지 않습니다. 델타는 박스가 교체되는 잠깐 기다립니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">일시정지</span> → 확인 창의 <span class="ui">일시정지 전송</span> 을 누릅니다.</div>
      ${SHOT('ch05_paused', '일시정지 상태')}
      <div class="lab-check">상태 배지 <b>⏸ 일시정지</b>, 황색등, 컨베이어 ■ 정지. 카운터 값은 그대로 유지됩니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">재개</span> → <span class="ui">재개 전송</span> 으로 다시 운전하고, 적재함이 5/5 가 되어 <b>출고된 적재함</b>이 1 늘 때까지 지켜봅니다(설비 속도에 따라 몇 분).</div>
      <div class="lab-check">적재함이 만재되면 출고되고 새 적재함이 0/5 부터 다시 채워집니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">정지</span> → <span class="ui">정지 전송</span> 으로 운전을 끝냅니다.</div>
      <div class="lab-check">상태 배지가 <b>◔ 준비</b> 로 돌아갑니다. 2단계에서 적은 값과 비교해 투입 · 양품이 얼마나 늘었는지 적습니다.</div></li>
  </ol>
  <div class="lab-result">웹의 상위 명령은 <b>확인 → 전송 → 감사 로그</b> 순서로 PLC 에 전달되고, 실제 동작 순서(박스 4개 → UR3 → 적재함 5박스 → 출고)는 PLC 시퀀스가 맡습니다.</div>
  <div class="lab-q">작업지시 없이 사람이 기동한 운전의 생산량은 MES 실적으로 바로 잡히지 않고 '보류' 됩니다. 왜 이렇게 만들었을까요?</div>
</div>`;

  // ---------------------------------------------------------------- 실습 5-5
  const LAB_ESTOP = `<div class="lab" data-lab="ch05-2-b">
  <div class="lab-head"><span class="lab-badge">실습 5-5</span><b>비상정지와 복구 절차</b><span class="lab-meta">⏱ 12분 · 화면: 공장 라인</span></div>
  <p class="lab-goal">시뮬레이터의 비상정지 입력을 넣었다가 해제하고, <b>해제 → 리셋 → (필요하면) 기동</b> 의 복구 순서를 익힙니다.</p>
  <p class="lab-pre">설비 #1 운전 중(실습 5-4 의 재개 상태)이면 가장 잘 보입니다. 시뮬레이션 모드 전용입니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">상위 명령 카드의 빨간 <span class="ui">■ 비상정지</span> 를 누릅니다.</div>
      ${SHOT('ch05_estop_confirm', '비상정지 확인 대화상자')}
      <div class="lab-check">"설비 #1 비상정지 누름 (시뮬레이터)" 창이 뜨고, 비상정지 입력(X0)을 끊으면 PLC 가 라인 · 로봇을 즉시 정지한다고 설명합니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">비상정지</span> 를 누릅니다.</div>
      ${SHOT('ch05_estop_on', '비상정지 후 — 이상 상태')}
      <div class="lab-check">상태 <b>✖ 이상</b>, <b>⚠ E1 비상정지</b>, 적색등 켜짐 · 🔔 부저 울림, 안전 · 인터락 카드에 <b>✖ 비상정지 눌림</b>. 3D 의 로봇 · 컨베이어도 멈췄습니다.</div></li>
    <li class="lab-step"><div class="lab-do">이 상태에서 <span class="ui">기동</span> 을 눌러 봅니다(확인 창에서 <span class="ui">기동 전송</span>).</div>
      <div class="lab-check">비상정지가 눌려 있는 동안에는 기동되지 않습니다 — 안전 회로가 우선합니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 자리 버튼이 <span class="ui">⟲ 비상정지 해제</span> 로 바뀌었습니다. 누르면 나오는 창에서 <span class="ui">당겨서 해제</span> 를 누릅니다.</div>
      ${SHOT('ch05_estop_release', '비상정지 해제 대화상자')}
      <div class="lab-check">창에 "라인은 이상(ERROR) 상태로 남으며, 원인을 확인한 뒤 리셋 · 기동해야 합니다" 라고 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">PLC 상태 카드를 확인합니다.</div>
      ${SHOT('ch05_after_release', '비상정지 해제 후에도 이상 상태')}
      <div class="lab-check">인터락은 <b>✔ 비상정지 정상</b> 으로 돌아왔지만 상태는 아직 <b>✖ 이상 · E1</b> 입니다. <b>버튼을 당겼다고 바로 다시 움직이지 않습니다.</b></div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">리셋</span> → 확인 창의 <span class="ui">리셋 전송</span> 을 누릅니다.</div>
      ${SHOT('ch05_after_reset', '리셋 후 준비 상태')}
      <div class="lab-check">상태가 <b>◔ 준비</b> 로 바뀌고 적색등 · 부저가 꺼집니다. 카운터(박스 · 적재함 수량)는 그대로 남아 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">(선택) <span class="ui">제어반(PC·PLC) #1</span> 시점에서 3D 조작반의 버튼을 눌러 봅니다.</div>
      <div class="lab-check">3D 조작반 버튼도 똑같이 <b>확인 창 → 전송 → 감사 로그</b> 를 거칩니다. 시점만 바꾸는 드래그로는 아무 명령도 가지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do">실습을 마치면 설비 #1 이 <b>준비</b> 상태인지 확인합니다(운전 중이면 <span class="ui">정지</span>).</div>
      <div class="lab-check">설비 탭의 #1 배지가 <b>◔ 준비</b> 입니다.</div></li>
  </ol>
  <div class="lab-result">복구 순서: <b>원인 확인 → 비상정지 해제 → 리셋 → 기동</b>. 실제 장비에서는 비상정지를 <b>현장 버튼(하드와이어 안전 회로)</b>으로만 누르고 해제하며, 웹은 안전 회로를 대신하거나 해제할 수 없습니다(이 플랫폼의 실장비 모드에서는 웹 버튼이 '정지 명령' 만 보냅니다).</div>
</div>`;

  const QUIZ1 = [
    { q: '공정 순서로 알맞은 것은?',
      options: ['카메라 A → 공급 → UR3 → 델타 → 적재함', '공급 → 카메라 A → 델타 → 박스(4개) → UR3 → 적재함 → 출고', '공급 → UR3 → 델타 → 카메라 B → 출고', '델타 → 공급 → 박스 → 카메라 A → 적재함'],
      answer: 1, explain: '카메라 A 가 위치 · 각도를 찾으면 델타가 집어 박스에 4개씩 담고, UR3 가 만재 박스를 적재함에 쌓습니다.' },
    { q: '3D 화면에서 할 수 <b>없는</b> 것은?',
      options: ['프리셋 시점으로 이동', '마우스로 시점 회전 · 확대', '장비를 클릭해 상세 패널 열기', '로봇 팔을 끌어서 실제 로봇 움직이기'],
      answer: 3, explain: '3D 화면은 읽기 전용입니다. 로봇 조깅 · 티칭은 팬던트에서만 합니다.' },
    { q: '카메라 B 의 용도로 알맞은 것은?',
      options: ['공작물 위치 · 각도 검출', '벨트 사행 · 흡착 패드 상태 감시(예지보전)', '작업자 출입 감시', '바코드 읽기'], answer: 1,
      explain: '카메라 B 는 예지보전용으로 벨트 사행 · 흡착 패드를 찍습니다. 피킹용은 카메라 A 입니다.' },
    { q: '설비 대수를 4대로 하면 3D 배치는?',
      options: ['한 줄로 4대', '2 × 2 배치', '세로 한 줄', '변하지 않는다'], answer: 1,
      explain: '1~3대는 한 줄, 4대는 2 × 2 로 자동 배치됩니다.' },
  ];
  const QUIZ2 = [
    { q: '웹에서 <span class="ui">기동</span> 을 누르면 바로 일어나는 일은?',
      options: ['즉시 라인이 움직인다', '확인 창이 뜨고, 전송해야 명령이 가며 감사 로그에 남는다', 'AI 가 기동 여부를 결정한다', '비상정지가 해제된다'], answer: 1,
      explain: '모든 상위 명령은 확인 단계와 감사 로그를 거칩니다.' },
    { q: '비상정지를 해제(당겨서 해제)한 직후 라인 상태는?',
      options: ['운전', '준비', '이상(ERROR) — 리셋이 필요', '일시정지'], answer: 2,
      explain: '해제만으로 다시 움직이지 않습니다. 원인 확인 후 리셋해야 준비 상태가 됩니다.' },
    { q: '박스 내 수량이 4/4 가 되면 다음에 일어나는 일은?',
      options: ['컨베이어가 멈춘다', 'UR3 가 만재 박스를 적재함에 적재하고 적재함 박스 수가 1 늘어난다', '바로 출고된다', '델타가 박스를 비운다'], answer: 1,
      explain: '박스 만재 → UR 적재 요청 → 적재 완료 → 적재함 수량 증가 순서입니다.' },
    { q: '<span class="ui">일시정지</span> 와 <span class="ui">정지</span> 의 차이로 알맞은 것은?',
      options: ['차이가 없다', '일시정지는 재개로 이어서 운전, 정지는 자동운전을 끝내고 준비 상태로', '정지는 비상정지와 같다', '일시정지하면 카운터가 0이 된다'], answer: 1,
      explain: '일시정지 ⇄ 재개, 정지 → 준비. 어느 경우도 카운터는 유지됩니다.' },
  ];

  PY_COURSE.addChapter({
    id: 'ch05', no: '05', title: '공장 라인과 3D 디지털트윈', subtitle: 'Line · Digital Twin',
    summary: '공정과 상태를 이해하고, 3D 트윈 시점 · 카메라 · PLC 상태 · 상위 명령 · 설비 대수를 직접 조작합니다.',
    goals: ['미니공장의 공정 순서와 라인 · 박스 · 적재함 상태를 설명할 수 있다',
      '3D 트윈의 프리셋 시점 · 장비 상세 · 카메라 A/B 를 사용할 수 있다',
      '상위 명령을 확인 단계를 거쳐 보내고, 비상정지 후 복구 절차를 수행할 수 있다'],
    sections: [
      {
        id: 'ch05-1', title: '공정과 3D 트윈 보기', minutes: 50,
        goals: ['공정 흐름과 상태를 말한다', '3D 시점 · 장비 상세 · 카메라를 사용한다', '설비 대수를 바꾸고 되돌린다'],
        flow: [['도입 — 공정 한 바퀴', 5], ['개념 — 공정 · 상태', 8], ['실습 5-1 시점 투어', 10], ['실습 5-2 상세 · 카메라', 15], ['실습 5-3 설비 대수', 7], ['정리 · 퀴즈', 5]],
        content: [
          { type: 'figure', html: SHOT('line_page', '공장 라인 화면 전체'), caption: '공장 라인 화면 — 왼쪽 3D 디지털트윈과 카메라 영상, 오른쪽 상위 명령 · PLC 상태 · 센서' },
          { type: 'p', html: '<b>공장 라인</b> 화면은 미니공장 설비(작업대)를 3D 로 보여 주는 <mark>디지털트윈</mark>입니다. 3D 장면의 로봇 · 컨베이어 · 박스는 시뮬레이터(또는 실제 장비)의 상태를 실시간으로 받아 그대로 움직입니다. 2D 화면은 따로 없고, 오른쪽 카드에 PLC 상태 · 카운터 · 센서 값이 숫자로 함께 나옵니다.' },
          { type: 'h', text: '공정 흐름' },
          { type: 'figure', html: FIG_FLOW, caption: '공작물 4개 = 박스 1개(완제품), 박스 5개 = 적재함 1개(출고 단위, 가정값)' },
          { type: 'table', head: ['장비', '하는 일', '3D 에서 보는 곳'], rows: [
            ['공급 컨베이어', '무작위 위치 · 각도로 공작물(직사각형)을 실어 나름', '설비 #n · 델타 셀'],
            ['카메라 A', '위에서 공작물 위치(x, y) · 각도(θ) 검출', '컨베이어 위 카메라 · 영상 패널 왼쪽'],
            ['델타 로봇', '움직이는 공작물을 따라가며 집어(트래킹 픽) 박스에 4개 정렬', '델타 셀'],
            ['박스 라인', '빈 박스 매거진 → 적재 위치 → UR 픽 위치로 한 칸씩 이동', '델타 셀 · UR 셀'],
            ['UR3', '만재 박스를 2지 그리퍼로 잡아 적재함에 쌓음', 'UR 셀'],
            ['적재함 · 출고', '5박스가 차면 출고, 새 적재함으로 교체', '적재·출고'],
            ['카메라 B', '벨트 사행 · 흡착 패드를 찍어 예지보전에 사용', '영상 패널 오른쪽'],
            ['PC · PLC 제어반', 'PLC 가 전체 순서(시퀀스) · 인터락 담당', '제어반(PC·PLC)'],
          ] },
          { type: 'h', text: '라인 · 박스 · 적재함 상태' },
          { type: 'figure', html: FIG_STATE, caption: '화면의 상태 배지는 글자와 아이콘을 함께 씁니다(색만으로 구분하지 않음)' },
          { type: 'callout', kind: 'info', title: '처음 켜면 설비는 멈춰 있습니다', html: '실습 프로그램을 처음 실행하면 모든 설비가 <b>준비(대기)</b> 상태로 멈춰 있는 것이 정상입니다. 생산계획을 <span class="ui">▶ 생산 시작</span> 하면 작업지시가 시작된 설비만 기동하고(7차시), 이번 차시처럼 <span class="ui">기동</span> 으로 사람이 직접 돌려 볼 수도 있습니다.' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_VIEW },
          { type: 'figure', html: LAB_DETAIL },
          { type: 'figure', html: LAB_COUNT },
          { type: 'callout', kind: 'more', title: '3D 가 느릴 때', html: '내장 그래픽 노트북에서 설비 4대를 볼 때 화면이 끊기면 주소 끝에 <code>?quality=low</code> 를 붙여 저품질 모드로 엽니다(예: <code>/line?quality=low</code>). WebGL 을 쓸 수 없는 PC 에서는 3D 대신 상태 수치 표가 나옵니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 설비 4대 · 모두 준비 상태로 시작합니다. 델타 · 카메라 A 를 보여 주려면 수업 직전에 설비 #1 을 <b>기동</b> 해 두면 좋습니다(수업 끝에 정지).</li><li><b>공용 서버 주의</b>: 실습 5-3(설비 대수)은 서버 전체 설정입니다. 강의실 서버 하나를 같이 쓰면 강사 시연으로만 하고, 끝나면 반드시 4대로 되돌립니다. 학생이 각자 run.bat 을 실행했다면 각자 해도 됩니다.</li><li><b>자주 막히는 곳</b>: 3D 장비 클릭이 안 됨 → 확대 후 몸체 가운데 클릭 / 화면이 끊김 → <code>?quality=low</code> / "데이터 없음" → 서버가 아직 준비 중.</li><li><b>확인 기준</b>: 공정 순서 7단계를 장비 이름으로 말하기, 카메라 A/B 용도 구분, 설비 대수 원복 확인.</li><li><b>발문</b>: "3D 에서 로봇을 끌어 움직일 수 있으면 편할 텐데 왜 막았을까?" → 안전(불변 원칙: 웹은 시각화 · 상위 명령만).</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: '공정과 3D 트윈 보기', subtitle: '공장 라인 화면 사용하기', notes: '<p>오늘은 미니공장을 3D 로 둘러보고 장비 · 카메라를 관찰합니다. 다음 교시에 직접 운전합니다.</p>' },
          { layout: 'diagram', title: '공장 라인 화면', html: SHOT('line_page', '공장 라인 화면'), caption: '3D · 카메라 / 상위 명령 · PLC 상태 · 센서',
            notes: '<p>화면 영역을 손으로 짚으며 설명: 왼쪽 3D(읽기 전용), 오른쪽 카드(숫자 상태).</p>' },
          { layout: 'diagram', title: '공정 흐름', html: FIG_FLOW, notes: '<p>💬 "공작물 몇 개면 출고 한 번일까?" → 4 × 5 = 20개. 박스 5개 적재함은 가정값.</p>' },
          { layout: 'diagram', title: '라인 · 박스 · 적재함 상태', html: FIG_STATE, notes: '<p>상태 배지는 아이콘 + 글자. 다음 교시 비상정지 실습에서 이상 → 리셋 경로를 직접 봅니다.</p>' },
          { layout: 'bullets', title: '실습 5-1 · 시점 투어 (10분)', bullets: ['시점 프리셋: 공장 전체 · 설비 · 델타 · UR · 적재·출고 · 제어반', '마우스: 왼쪽 끌기 회전 · 휠 확대 · 오른쪽 끌기 이동', '설비 탭으로 초점 이동', '3D 는 읽기 전용'],
            notes: '<p>교사 화면으로 프리셋을 한 바퀴 돌며 시범. 학생은 단계마다 ☑ 체크.</p>' },
          { layout: 'diagram', title: '장비 상세 · 카메라', html: SHOT('ch05_detail_cam', '카메라 상세'), caption: '카메라 영상을 누르면 3D 위치 강조 + 상세 패널',
            notes: '<p>카메라 A(피킹)와 B(예지보전)의 차이를 강조. 11차시 예지보전에서 카메라 B 데이터를 다시 만납니다.</p>' },
          { layout: 'bullets', title: '실습 5-2 · 상세 · 카메라 (15분)', bullets: ['카메라 A 오버레이 관찰', '카메라 영상 클릭 → ◉ 3D 위치 · 상세 패널', '델타 · 컨베이어 · UR3 클릭 비교', '카메라 B · HMI 모니터 확인'],
            notes: '<p>장비 클릭이 어려운 학생은 확대 후 클릭. 상세 패널 세 칸(상태 · 알람 · 이력) 용어 설명.</p>' },
          { layout: 'bullets', title: '실습 5-3 · 설비 대수 (7분)', bullets: ['설비 대수 버튼 확인 · 메모', '1대 → 확인 창 → 변경', '3대 = 한 줄, 4대 = 2 × 2', '<b>원래 대수로 복구</b>'],
            notes: '<p>공용 서버면 교사만 시연. 반드시 원복.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[1].q, options: QUIZ1[1].options, answer: QUIZ1[1].answer, explain: QUIZ1[1].explain, notes: '<p>안전 원칙(웹은 시각화 · 상위 명령만)과 연결.</p>' },
          { layout: 'summary', title: '정리', bullets: ['공정: 공급 → 카메라 A → 델타 → 박스 4 → UR3 → 적재함 5 → 출고', '3D 트윈 = 실시간 상태를 보여 주는 읽기 전용 화면', '카메라 A 피킹 · 카메라 B 예지보전', '설비 1~4대, 4대는 2 × 2'],
            notes: '<p>다음 교시: 직접 기동 · 일시정지 · 비상정지 복구.</p>' },
        ],
      },
      {
        id: 'ch05-2', title: '라인 운전과 상위 명령', minutes: 50,
        goals: ['상위 명령의 종류와 확인 · 감사 절차를 설명한다', '수동 운전 한 사이클을 수행하고 카운터 변화를 읽는다', '비상정지 후 해제 → 리셋 복구를 수행한다'],
        flow: [['도입 — 명령과 안전', 5], ['개념 — 명령 · PLC 상태', 8], ['실습 5-4 수동 운전', 17], ['실습 5-5 비상정지 복구', 12], ['정리 · 퀴즈', 8]],
        content: [
          { type: 'h', text: '웹이 보낼 수 있는 명령 = 상위 명령' },
          { type: 'table', head: ['버튼', '하는 일', '주의'], rows: [
            ['<span class="ui">기동</span>', '라인 자동운전을 시작', '비상정지 · 인터락이 정상이어야 동작'],
            ['<span class="ui">일시정지</span>', '자동운전을 잠시 멈춤', '카운터 · 박스 상태 유지'],
            ['<span class="ui">재개</span>', '일시정지된 라인을 다시 운전', '—'],
            ['<span class="ui">정지</span>', '자동운전을 정지(준비 상태로)', '빨간 버튼(위험 명령)'],
            ['<span class="ui">리셋</span>', '이상 상태를 리셋', '원인이 남아 있으면 리셋되지 않음'],
            ['<span class="ui">■ 비상정지</span>', '시뮬레이터의 비상정지 입력(X0)을 끊음', '실장비는 현장 버튼으로만 — 웹은 정지 명령만 보냄'],
          ], caption: '모든 명령은 확인 창 → 전송 → 감사 로그(누가 · 언제 · 무엇을)를 거칩니다' },
          { type: 'p', html: '웹은 로봇을 한 칸씩 움직이는(조깅) 기능을 갖지 않습니다. 시작 · 정지 같은 <b>상위 명령</b>만 PLC 에 보내고, 박스 4개 → UR3 → 적재함 같은 실제 순서는 <b>PLC 시퀀스</b>가 책임집니다. 비상정지 · 안전 도어 · 인터락은 하드웨어(안전 회로)가 담당하며 웹이나 AI 가 우회할 수 없습니다.' },
          { type: 'h', text: 'PLC 상태 · 카운터 읽기' },
          { type: 'table', head: ['항목', '뜻'], rows: [
            ['상태 배지 · 자동/수동 모드', '라인 상태(대기 · 준비 · 운전 · 일시정지 · 이상), 이상이면 E 코드와 내용'],
            ['스택라이트 · 부저', '녹(운전) · 황(대기/일시정지) · 적(이상), 이상 시 부저'],
            ['투입 · 양품 · 불량·미픽', '공급된 공작물 · 박스에 담긴 공작물 · 놓친 공작물'],
            ['박스 내 수량', '지금 채우는 박스의 공작물 수(0~4)와 박스 상태'],
            ['적재함 박스 수 · 출고된 적재함', '현재 적재함의 박스 수(n/5)와 지금까지 출고 수'],
            ['컨베이어 · 엔코더', '운전/정지 · 속도(mm/s), 엔코더 값(트래킹 기준)'],
            ['안전 · 인터락', '비상정지 · 안전 도어 · 에어압 · UR 보호정지 — 읽기 전용'],
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_RUN },
          { type: 'figure', html: LAB_ESTOP },
          { type: 'callout', kind: 'warn', title: '현장에서는', html: '실제 설비에서 웹 명령을 보낼 때는 <b>장비 주변에 사람이 없는지</b> 먼저 확인합니다(실장비 모드에서는 확인 창에 경고가 함께 나옵니다). 비상정지는 현장 버튼이 최우선이며, 해제 후에는 원인을 확인하고 리셋합니다. 이 강좌의 실습은 모두 시뮬레이션 모드이며, 실장비 연동은 검증 전입니다.' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 설비 #1 이 준비 상태인지 확인. 생산계획으로 이미 돌고 있는 설비가 있으면 학생마다 다른 설비 탭을 쓰게 합니다(공용 서버면 설비 #1~#4 를 모둠에 나눔).</li><li><b>시간</b>: 적재함 1개 출고(박스 5개)까지 수 분이 걸립니다. 5-4 의 7단계는 기다리는 동안 5-5 를 먼저 설명해도 됩니다.</li><li><b>자주 막히는 곳</b>: 기동이 안 됨 → 비상정지 눌림 · 이상 상태(리셋 먼저) / 버튼이 회색 → 목(mock) 모드 주소(<code>?mock=1</code>)로 열었는지 확인.</li><li><b>마무리 복구</b>: 모든 설비 ■ 정지 또는 준비 상태, 비상정지 해제 · 리셋 완료를 확인하고 수업을 끝냅니다.</li><li><b>확인 기준</b>: 5-4 카운터 전후 비교 기록, 5-5 복구 순서(해제 → 리셋 → 기동)를 말로 설명.</li><li><b>발문</b>: "비상정지를 해제하자마자 기계가 다시 움직이면 어떤 위험이 있을까?"</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '라인 운전과 상위 명령', subtitle: '기동 · 일시정지 · 정지 · 리셋 · 비상정지', notes: '<p>오늘은 직접 운전합니다. 안전 원칙(확인 · 감사 · 하드웨어 안전)을 먼저 짚습니다.</p>' },
          { layout: 'table', title: '상위 명령', head: ['버튼', '하는 일'], rows: [
            ['기동', '자동운전 시작'], ['일시정지 / 재개', '잠시 멈춤 / 이어서'], ['정지', '자동운전 끝 → 준비'], ['리셋', '이상 상태 해제'], ['■ 비상정지', '시뮬레이터 X0 입력(실장비는 현장 버튼)']],
            notes: '<p>모든 명령은 확인 창 → 전송 → 감사 로그. 로봇 조깅은 웹에 없음.</p>' },
          { layout: 'diagram', title: '확인 단계', html: SHOT('ch05_start_confirm', '기동 확인 창'), notes: '<p>💬 "왜 버튼 한 번에 바로 움직이지 않게 했을까?" → 실수 방지 · 기록.</p>' },
          { layout: 'diagram', title: 'PLC 상태 · 카운터', html: SHOT('ch05_running', '운전 중 카운터'),
            notes: '<p>투입 · 양품 · 박스 내 수량 · 적재함 박스 수 · 출고된 적재함을 하나씩 짚습니다.</p>' },
          { layout: 'bullets', title: '실습 5-4 · 수동 운전 (17분)', bullets: ['카운터 값 메모', '기동 → 기동 전송 · 감사 로그 확인', '박스 0→4 → UR3 → 적재함 +1', '일시정지 → 재개', '적재함 출고 확인 → 정지'],
            notes: '<p>공용 서버면 모둠별로 설비 번호를 나눕니다. 출고까지 기다리는 동안 다음 실습을 설명.</p>' },
          { layout: 'diagram', title: '비상정지 → 이상 상태', html: SHOT('ch05_estop_on', '비상정지 후'),
            notes: '<p>적색등 · 부저 · E1 · 인터락 표시를 짚습니다.</p>' },
          { layout: 'bullets', title: '실습 5-5 · 비상정지 복구 (12분)', bullets: ['■ 비상정지 → 이상 · E1', '눌린 채로 기동 → 안 됨', '⟲ 비상정지 해제 → 그래도 이상', '리셋 → 준비', '(선택) 3D 조작반 버튼'],
            notes: '<p>핵심: 해제 ≠ 재가동. 원인 확인 → 해제 → 리셋 → 기동.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[1].q, options: QUIZ2[1].options, answer: QUIZ2[1].answer, explain: QUIZ2[1].explain, notes: '<p>오답이 많으면 비상정지 슬라이드로 돌아가 상태 배지를 다시 봅니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['웹 = 상위 명령만, 순서는 PLC 시퀀스', '확인 창 → 전송 → 감사 로그', '복구: 원인 확인 → 해제 → 리셋 → 기동', '실장비 비상정지는 현장 버튼(하드와이어)'],
            notes: '<p>수업 끝: 모든 설비 준비 상태 · 비상정지 해제 확인. 다음 차시: ERP 기준정보와 수주.</p>' },
        ],
      },
    ],
  });
})();
