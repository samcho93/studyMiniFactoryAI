/* 01 AI 시대, 왜 제조 AI 인가 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_SCOPE = `<svg viewBox="0 0 680 300" role="img" aria-label="AI 안에 머신러닝, 그 안에 딥러닝, 생성형 AI 가 있고 제조 AI 는 이 기술을 제조 데이터와 현장 문제에 적용한 것">
  <ellipse cx="250" cy="155" rx="230" ry="135" class="p1s"/>
  <ellipse cx="285" cy="170" rx="160" ry="98" class="p2s"/>
  <ellipse cx="320" cy="185" rx="92" ry="58" class="p3s"/>
  <text x="58" y="78" class="tx-b">인공지능(AI)</text>
  <text x="58" y="98" class="tx-m">규칙 · 탐색 · 최적화 포함</text>
  <text x="150" y="135" class="tx-b">머신러닝</text>
  <text x="150" y="153" class="tx-m">데이터로 규칙 학습</text>
  <text x="270" y="182" class="tx-b">딥러닝</text>
  <text x="258" y="200" class="tx-m">비전 · 생성형 AI</text>
  <rect x="500" y="60" width="165" height="190" rx="14" class="card-bg"/>
  <text x="582" y="90" text-anchor="middle" class="tx-b">제조 AI</text>
  <text x="582" y="118" text-anchor="middle" class="tx-m">AI 기술 ×</text>
  <text x="582" y="138" text-anchor="middle" class="tx-m">제조 데이터 ×</text>
  <text x="582" y="158" text-anchor="middle" class="tx-m">현장 문제(설비 · 품질 ·</text>
  <text x="582" y="176" text-anchor="middle" class="tx-m">계획 · 에너지 · 안전)</text>
  <text x="582" y="214" text-anchor="middle" class="tx-b">= 성과(비가동 ↓</text>
  <text x="582" y="232" text-anchor="middle" class="tx-b">불량 ↓ 납기 ↑)</text>
</svg>`;

  const FIG_DATA = `<svg viewBox="0 0 700 250" role="img" aria-label="제조 데이터 네 가지: 설비, 공정, 품질, 계획 데이터와 이 플랫폼에서 볼 수 있는 화면">
  <rect x="10" y="20" width="160" height="210" rx="14" class="p1s"/>
  <rect x="185" y="20" width="160" height="210" rx="14" class="p2s"/>
  <rect x="360" y="20" width="160" height="210" rx="14" class="p3s"/>
  <rect x="535" y="20" width="160" height="210" rx="14" class="p4s"/>
  <text x="90" y="52" text-anchor="middle" class="tx-b">설비 데이터</text>
  <text x="90" y="80" text-anchor="middle" class="tx-m">진동 · 전류 · 온도</text>
  <text x="90" y="100" text-anchor="middle" class="tx-m">진공압 · 에어압</text>
  <text x="90" y="120" text-anchor="middle" class="tx-m">PLC 상태 · 알람</text>
  <text x="90" y="190" text-anchor="middle" class="tx">화면: 예지보전</text>
  <text x="265" y="52" text-anchor="middle" class="tx-b">공정 데이터</text>
  <text x="265" y="80" text-anchor="middle" class="tx-m">사이클 타임</text>
  <text x="265" y="100" text-anchor="middle" class="tx-m">픽 성공 · 실패</text>
  <text x="265" y="120" text-anchor="middle" class="tx-m">생산량 · 가동 상태</text>
  <text x="265" y="190" text-anchor="middle" class="tx">화면: 라인 · 대시보드</text>
  <text x="440" y="52" text-anchor="middle" class="tx-b">품질 데이터</text>
  <text x="440" y="80" text-anchor="middle" class="tx-m">비전 검출 결과</text>
  <text x="440" y="100" text-anchor="middle" class="tx-m">검사 LOT · 불량</text>
  <text x="440" y="120" text-anchor="middle" class="tx-m">LOT 추적</text>
  <text x="440" y="190" text-anchor="middle" class="tx">화면: MES 품질 · LOT</text>
  <text x="615" y="52" text-anchor="middle" class="tx-b">계획 데이터</text>
  <text x="615" y="80" text-anchor="middle" class="tx-m">수주 · 납기 · 재고</text>
  <text x="615" y="100" text-anchor="middle" class="tx-m">BOM · 자재</text>
  <text x="615" y="120" text-anchor="middle" class="tx-m">생산계획 · 작업지시</text>
  <text x="615" y="190" text-anchor="middle" class="tx">화면: ERP</text>
</svg>`;

  const FIG_AUTO = `<svg viewBox="0 0 700 260" role="img" aria-label="자동화는 정해진 규칙대로 반복하고, 제조 AI 는 데이터에서 패턴을 배워 판단을 돕는다">
  ${ARROW('c01a1')}
  <text x="20" y="32" class="tx-b">자동화 (PLC · 로봇 프로그램)</text>
  <rect x="20" y="48" width="150" height="46" rx="10" class="p1s"/><text x="95" y="77" text-anchor="middle" class="tx">센서 신호</text>
  <rect x="250" y="44" width="190" height="54" rx="12" class="p1"/><text x="345" y="76" text-anchor="middle" class="tx-w">사람이 쓴 규칙(래더)</text>
  <rect x="520" y="48" width="160" height="46" rx="10" class="p5s"/><text x="600" y="77" text-anchor="middle" class="tx">정해진 동작</text>
  <line x1="172" y1="71" x2="246" y2="71" class="ln" stroke-width="2" marker-end="url(#c01a1)"/>
  <line x1="442" y1="71" x2="516" y2="71" class="ln" stroke-width="2" marker-end="url(#c01a1)"/>
  <text x="20" y="150" class="tx-b">제조 AI</text>
  <rect x="20" y="166" width="150" height="46" rx="10" class="p1s"/><text x="95" y="195" text-anchor="middle" class="tx">쌓인 데이터</text>
  <rect x="250" y="162" width="190" height="54" rx="12" class="p2"/><text x="345" y="194" text-anchor="middle" class="tx-w">학습한 모델</text>
  <rect x="520" y="166" width="160" height="46" rx="10" class="p3s"/><text x="600" y="186" text-anchor="middle" class="tx">예측 · 권고</text><text x="600" y="204" text-anchor="middle" class="tx-m">(결정은 사람 · PLC)</text>
  <line x1="172" y1="189" x2="246" y2="189" class="ln" stroke-width="2" marker-end="url(#c01a1)"/>
  <line x1="442" y1="189" x2="516" y2="189" class="ln" stroke-width="2" marker-end="url(#c01a1)"/>
  <text x="350" y="248" text-anchor="middle" class="tx-m">둘은 경쟁이 아니라 짝입니다 — AI 의 권고는 결국 자동화 시스템을 통해 현장에 반영됩니다.</text>
</svg>`;

  const FIG_AREAS = `<svg viewBox="0 0 700 300" role="img" aria-label="제조 AI 6대 적용 영역: 예지보전, 품질 검사, 생산계획, 공정 최적화, 에너지, 지식 지원">
  <circle cx="350" cy="150" r="62" class="p1"/>
  <text x="350" y="146" text-anchor="middle" class="tx-w">제조 AI</text>
  <text x="350" y="166" text-anchor="middle" class="tx-w">6대 영역</text>
  <rect x="20" y="20" width="200" height="70" rx="12" class="p2s"/><text x="120" y="48" text-anchor="middle" class="tx-b">① 예지보전</text><text x="120" y="70" text-anchor="middle" class="tx-m">고장 전에 징후 발견</text>
  <rect x="250" y="5" width="200" height="60" rx="12" class="p3s"/><text x="350" y="30" text-anchor="middle" class="tx-b">② 품질 검사 · 예측</text><text x="350" y="50" text-anchor="middle" class="tx-m">비전 · 공정 조건 → 불량</text>
  <rect x="480" y="20" width="200" height="70" rx="12" class="p4s"/><text x="580" y="48" text-anchor="middle" class="tx-b">③ 생산계획 · 스케줄링</text><text x="580" y="70" text-anchor="middle" class="tx-m">설비 배정 · 순서 · 납기</text>
  <rect x="20" y="210" width="200" height="70" rx="12" class="p5s"/><text x="120" y="238" text-anchor="middle" class="tx-b">④ 공정 최적화</text><text x="120" y="260" text-anchor="middle" class="tx-m">속도 · 조건 · 수율</text>
  <rect x="250" y="235" width="200" height="60" rx="12" class="p3s"/><text x="350" y="260" text-anchor="middle" class="tx-b">⑤ 에너지 · 자원</text><text x="350" y="280" text-anchor="middle" class="tx-m">전력 · 공기 · 원자재</text>
  <rect x="480" y="210" width="200" height="70" rx="12" class="p2s"/><text x="580" y="238" text-anchor="middle" class="tx-b">⑥ 지식 · 업무 지원</text><text x="580" y="260" text-anchor="middle" class="tx-m">LLM 도우미 · 보고 · 계획 초안</text>
  <line x1="220" y1="70" x2="295" y2="118" class="ln" stroke-width="1.5"/>
  <line x1="350" y1="65" x2="350" y2="88" class="ln" stroke-width="1.5"/>
  <line x1="480" y1="70" x2="405" y2="118" class="ln" stroke-width="1.5"/>
  <line x1="220" y1="230" x2="295" y2="182" class="ln" stroke-width="1.5"/>
  <line x1="350" y1="235" x2="350" y2="212" class="ln" stroke-width="1.5"/>
  <line x1="480" y1="230" x2="405" y2="182" class="ln" stroke-width="1.5"/>
</svg>`;

  const FIG_MAINT = `<svg viewBox="0 0 700 250" role="img" aria-label="사후 보전, 예방 보전, 예지 보전의 비교">
  ${ARROW('c01a2')}
  <rect x="10" y="20" width="215" height="215" rx="14" class="card-bg"/>
  <rect x="242" y="20" width="215" height="215" rx="14" class="card-bg"/>
  <rect x="475" y="20" width="215" height="215" rx="14" class="p1s"/>
  <text x="117" y="50" text-anchor="middle" class="tx-b">사후 보전</text>
  <text x="117" y="72" text-anchor="middle" class="tx-m">고장 나면 고친다</text>
  <text x="117" y="120" text-anchor="middle" class="tx">✗ 돌발 정지</text>
  <text x="117" y="145" text-anchor="middle" class="tx">✗ 2차 손상</text>
  <text x="117" y="170" text-anchor="middle" class="tx">✓ 계획 불필요</text>
  <text x="350" y="50" text-anchor="middle" class="tx-b">예방 보전</text>
  <text x="350" y="72" text-anchor="middle" class="tx-m">주기마다 바꾼다</text>
  <text x="350" y="120" text-anchor="middle" class="tx">✓ 돌발 정지 감소</text>
  <text x="350" y="145" text-anchor="middle" class="tx">✗ 멀쩡한 부품 교체</text>
  <text x="350" y="170" text-anchor="middle" class="tx">✗ 주기 사이 고장</text>
  <text x="582" y="50" text-anchor="middle" class="tx-b">예지 보전 (AI)</text>
  <text x="582" y="72" text-anchor="middle" class="tx-m">상태를 보고 필요할 때</text>
  <text x="582" y="120" text-anchor="middle" class="tx">✓ 징후 단계에서 계획 정비</text>
  <text x="582" y="145" text-anchor="middle" class="tx">✓ 부품 수명 활용</text>
  <text x="582" y="170" text-anchor="middle" class="tx">△ 데이터 · 모델 필요</text>
  <line x1="227" y1="215" x2="470" y2="215" class="ln" stroke-width="2" marker-end="url(#c01a2)"/>
  <text x="350" y="208" text-anchor="middle" class="tx-m">데이터가 쌓일수록 오른쪽으로</text>
</svg>`;

  const FIG_FUTURE = `<svg viewBox="0 0 700 280" role="img" aria-label="제조 AI 의 발전 단계: 보이기, 알기, 예측하기, 권고하기, 자율 운전">
  ${ARROW('c01a3')}
  <line x1="40" y1="240" x2="670" y2="40" class="ln" stroke-width="2" marker-end="url(#c01a3)"/>
  <circle cx="90" cy="222" r="9" class="p1"/><text x="90" y="262" text-anchor="middle" class="tx-b">① 보이기</text><text x="90" y="200" text-anchor="middle" class="tx-m">모니터링 · 대시보드</text>
  <circle cx="220" cy="181" r="9" class="p2"/><text x="220" y="222" text-anchor="middle" class="tx-b">② 알기</text><text x="220" y="160" text-anchor="middle" class="tx-m">원인 분석 · 추적</text>
  <circle cx="350" cy="140" r="9" class="p3"/><text x="350" y="180" text-anchor="middle" class="tx-b">③ 예측하기</text><text x="350" y="118" text-anchor="middle" class="tx-m">이상 · 고장 예측</text>
  <circle cx="480" cy="99" r="9" class="p4"/><text x="480" y="140" text-anchor="middle" class="tx-b">④ 권고하기</text><text x="480" y="77" text-anchor="middle" class="tx-m">AI 에이전트 · 계획 초안</text>
  <circle cx="610" cy="58" r="9" class="p5"/><text x="610" y="99" text-anchor="middle" class="tx-b">⑤ 자율 운전</text><text x="610" y="36" text-anchor="middle" class="tx-m">사람 감독 아래 자율 공정</text>
</svg>`;

  // ---------------------------------------------------------------- 실습 블록
  const LAB_DATA = `<div class="lab" data-lab="ch01-1-a">
  <div class="lab-head"><span class="lab-badge">실습 1-1</span><b>플랫폼에서 제조 데이터 네 가지 찾기</b><span class="lab-meta">⏱ 15분 · 화면: 대시보드 · 예지보전 · MES · ERP</span></div>
  <p class="lab-goal">설비 · 공정 · 품질 · 계획 데이터가 플랫폼의 어느 화면에 쌓이는지 직접 찾아 표를 채웁니다.</p>
  <p class="lab-pre">실습 프로그램 실행(run.bat) 후 브라우저에 <b>현장 2분할</b> 화면이 열린 상태. 설비가 한 번 이상 생산한 데이터가 있으면 좋습니다(없으면 4차시 뒤에 다시 해 봅니다).</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴에서 <span class="ui">대시보드</span> 를 엽니다. 맨 위 KPI 칸(OEE · 생산량 · 불량 …)과 시간대별 생산량을 훑어봅니다.</div>
      ${SHOT('dashboard', '대시보드 화면')}
      <div class="lab-check">생산량 · 가동 상태처럼 <b>공정 데이터</b>를 숫자 · 그래프로 볼 수 있습니다. 표에 '공정 데이터 → 대시보드' 를 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">예지보전</span> → <span class="ui">🗄 DB 탐색 · 내보내기</span> 를 엽니다.</div>
      ${SHOT('pdm_db', '예지보전 DB 탐색 화면')}
      <div class="lab-check">맨 위 <code>sensor_reading</code> · <code>vibration_window</code> 칸의 <b>행 수</b>가 보입니다. 이것이 <b>설비 데이터</b>(전류 · 온도 · 진동 …)입니다.</div>
      <div class="lab-tip">행 수가 수십만 개일 수도 있습니다. 설비가 돌아가는 동안 5초마다 계속 쌓이기 때문입니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">MES</span> → 왼쪽 <span class="ui">◎ 품질</span> 을 엽니다.</div>
      ${SHOT('mes_quality', 'MES 품질 화면')}
      <div class="lab-check">적재함 단위 검사 결과 · 불량 기록이 보입니다 — <b>품질 데이터</b>입니다.</div></li>
    <li class="lab-step"><div class="lab-do">같은 MES 에서 <span class="ui">⛓ LOT 추적</span> 을 열고 오른쪽 LOT 번호 하나를 눌러 <span class="ui">추적</span> 합니다.</div>
      ${SHOT('mes_lots_trace', 'MES LOT 추적 결과')}
      <div class="lab-check">적재함 ← 박스 ← 공작물 계보가 나옵니다. 품질 문제가 생기면 이 기록으로 원인을 거슬러 올라갑니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">ERP</span> → <span class="ui">₩ 영업 · 수주</span> 와 <span class="ui">⚙ 기준정보</span> 를 차례로 엽니다.</div>
      <div class="shot-pair">${SHOT('erp_orders', 'ERP 영업 · 수주')}${SHOT('erp_master', 'ERP 기준정보')}</div>
      <div class="lab-check">수주 · 납기 · BOM(제품 하나에 들어가는 부품)이 보입니다 — <b>계획 데이터</b>입니다.</div></li>
    <li class="lab-step"><div class="lab-do">아래 표를 공책이나 활동지에 옮겨 채웁니다: <b>데이터 종류 / 찾은 화면 / 예시 값 하나 / 이 데이터로 AI 가 할 수 있는 일</b>.</div>
      <div class="lab-check">네 줄이 모두 채워졌습니다. 예: 설비 데이터 / 예지보전 DB / 진동 RMS 0.15 g / 고장 징후 찾기.</div></li>
  </ol>
  <div class="lab-result">제조 데이터는 한곳에 모여 있지 않고 <b>설비(예지보전) · 공정(라인 · 대시보드) · 품질(MES) · 계획(ERP)</b> 화면에 나뉘어 쌓입니다. 제조 AI 는 이 데이터를 이어 붙여 판단을 돕습니다.</div>
  <div class="lab-q">불량이 늘었을 때 원인을 찾으려면 네 가지 데이터 중 어떤 것들을 함께 봐야 할까요?</div>
</div>`;

  const LAB_AUTO = `<div class="lab" data-lab="ch01-1-b">
  <div class="lab-head"><span class="lab-badge">실습 1-2</span><b>자동화와 AI 구분하기</b><span class="lab-meta">⏱ 10분 · 화면: 공장 라인 · 예지보전</span></div>
  <p class="lab-goal">같은 공장 안에서 <b>정해진 규칙으로 움직이는 부분(자동화)</b>과 <b>데이터로 판단하는 부분(AI)</b>을 구분합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">공장 라인</span> 을 엽니다. 오른쪽 <b>PLC 상태</b>와 아래 명령 버튼(<span class="ui">기동</span> · <span class="ui">정지</span> …)을 찾습니다.</div>
      ${SHOT('line_page', '공장 라인 화면')}
      <div class="lab-check">라인 상태 · 카운터가 PLC 의 <b>정해진 순서(시퀀스)</b>대로 바뀝니다. 이것이 자동화입니다.</div></li>
    <li class="lab-step"><div class="lab-do">3D 화면에서 델타 로봇이 컨베이어 위 공작물을 집어 박스에 4개씩 담는 모습을 30초 정도 지켜봅니다(설비가 멈춰 있으면 <span class="ui">기동</span> → 확인).</div>
      ${SHOT('line_twin_delta', '델타 셀 시점')}
      <div class="lab-check">공작물이 어디에 어떤 각도로 놓이든 델타가 집습니다 — 카메라가 위치 · 각도를 <b>인식</b>하고, 정해진 규칙으로 <b>움직입니다</b>.</div></li>
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">예지보전</span> → <span class="ui">📊 보전 현황</span> 을 엽니다.</div>
      ${SHOT('pdm_overview', '예지보전 보전 현황')}
      <div class="lab-check">설비마다 <b>이상 점수</b>와 단계(정상 · 주의 · 위험)가 보입니다. 이 점수는 사람이 정한 규칙이 아니라 <b>정상 데이터를 학습한 AI 모델</b>이 계산합니다.</div></li>
    <li class="lab-step"><div class="lab-do">활동지에 두 칸을 만들어 '자동화' 와 'AI' 로 지금까지 본 기능을 나눠 적습니다.</div>
      <div class="lab-check">예) 자동화: 기동 · 정지, 박스 4개 차면 UR3 호출, 적재함 5박스면 출고 / AI: 이상 점수, 주의 · 위험 알람, AI 생산계획 초안.</div></li>
  </ol>
  <div class="lab-result">자동화는 <b>정해진 일을 정확히 반복</b>하고, AI 는 <b>데이터에서 변화를 찾아 알려 줍니다</b>. 그리고 AI 의 알림을 보고 정지 · 정비를 결정하는 것은 PLC 와 사람입니다.</div>
</div>`;

  const LAB_MAP = `<div class="lab" data-lab="ch01-2-a">
  <div class="lab-head"><span class="lab-badge">실습 1-3</span><b>플랫폼의 AI 기능 지도 만들기</b><span class="lab-meta">⏱ 20분 · 화면: AI 생산계획 · ERP · MES · 예지보전</span></div>
  <p class="lab-goal">플랫폼에 들어 있는 AI 기능을 모두 찾아 <b>제조 AI 6대 영역</b> 중 어디에 해당하는지 지도를 만듭니다. 이번에는 둘러보기만 하고, 자세한 사용법은 11~14차시에서 배웁니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">AI 생산계획</span> 을 엽니다. 아래 입력칸 위의 예시 버튼과 오른쪽 계획서 영역을 살펴봅니다.</div>
      ${SHOT('ai_plan_empty', 'AI 생산계획 첫 화면')}
      <div class="lab-check">말로 요청하면 생산계획서 초안과 설비 배정을 만들어 주는 기능입니다 → 영역 ③ 생산계획.</div></li>
    <li class="lab-step"><div class="lab-do">예시 버튼 <span class="prompt">오늘 레드 20, 블루 10, 화이트 15 만들자</span> 를 눌러 <span class="ui">보내기</span> 합니다.</div>
      ${SHOT('ai_plan_result', 'AI 생산계획 결과')}
      <div class="lab-check">답변에 계획서 번호(PS-…)와 설비별 색 · 수량 · 예상 시간이 나오고, 오른쪽에 계획서가 열립니다. <b>확정 · 생산 시작 버튼은 누르지 않습니다</b>(사람이 결정하는 단계).</div>
      <div class="lab-tip">답변 앞에 '규칙 기반 도우미' 라고 나오면 API 키 없이 동작하는 모드입니다. 기능은 같습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">ERP</span> 화면 오른쪽 아래 <span class="ui">✦ AI 도우미</span> 를 열고 예시 질문 <span class="prompt">자재 부족 품목은?</span> 을 보냅니다.</div>
      ${SHOT('erp_ai_answer', 'ERP AI 도우미 답변')}
      <div class="lab-check">AI 가 ERP 데이터를 조회해 답합니다 → 영역 ⑥ 지식 · 업무 지원.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">예지보전</span> → <span class="ui">✦ AI 로 분석하기</span> 에서 <span class="ui">✦ 분석하기</span> 를 누릅니다.</div>
      ${SHOT('pdm_ai_result', 'AI 로 분석하기 결과')}
      <div class="lab-check">설비별 이상 징후 · 근거 · 추정 원인 · 권장 조치가 나옵니다 → 영역 ① 예지보전.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> → <span class="ui">🔧 정비 · 예지보전</span> 에서 <span class="ui">AI 권고</span> 영역을 찾습니다(버튼은 아직 누르지 않아도 됩니다).</div>
      ${SHOT('mes_maintenance', 'MES 정비 · 예지보전 화면')}
      <div class="lab-check">정비 오더와 AI 정비 권고가 한 화면에 있습니다 — AI 의 판단이 정비라는 <b>행동</b>으로 이어지는 곳입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 의 카메라 A 화면(공작물 검출)을 찾아 봅니다.</div>
      ${SHOT('line_twin_cell', '설비 #1 시점과 카메라 화면')}
      <div class="lab-check">카메라가 공작물 위치 · 각도를 찾아 표시합니다 → 영역 ② 품질 · 비전.</div></li>
    <li class="lab-step"><div class="lab-do">6대 영역 그림(위)을 활동지에 그리고, 찾은 기능을 해당 영역에 붙입니다. 비어 있는 영역(④ 공정 최적화, ⑤ 에너지)은 "앞으로 추가하면 좋을 기능" 을 한 가지씩 적어 봅니다.</div>
      <div class="lab-check">①②③⑥ 에 기능이 하나 이상 붙었고, ④⑤ 에 아이디어가 적혔습니다.</div></li>
  </ol>
  <div class="lab-result">이 플랫폼에는 <b>예지보전 · 비전 · 생산계획 · 업무 지원</b> 네 영역의 AI 가 들어 있고, 모두 <b>AI 가 제안 → 사람이 확인 · 결정</b> 하는 구조입니다.</div>
  <div class="lab-q">AI 생산계획이 만든 초안을 사람이 꼭 확인해야 하는 이유는 무엇일까요?</div>
</div>`;

  const LAB_DOWN = `<div class="lab" data-lab="ch01-2-b">
  <div class="lab-head"><span class="lab-badge">실습 1-4</span><b>비가동과 보전 기록 읽기</b><span class="lab-meta">⏱ 10분 · 화면: 대시보드 · MES</span></div>
  <p class="lab-goal">설비가 멈춘 시간(비가동)과 정비 기록을 찾아, 예지보전이 무엇을 줄이려는지 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">대시보드</span> 에서 시간 범위를 <span class="ui">8시간</span> 으로 바꿉니다.</div>
      <div class="lab-check">설비 가동 간트(띠 그래프)가 길어집니다. 운전 · 대기 · 정지 · 이상 구간이 색과 글자로 구분됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">설비별 OEE 와 <b>가동률</b>을 찾아 가장 낮은 설비를 적습니다.</div>
      ${SHOT('dashboard_full', '대시보드 전체')}
      <div class="lab-check">가동률이 낮은 설비 = 돌아야 할 때 <b>일시정지 · 이상(고장 · 비상정지)</b>으로 멈춘 시간이 긴 설비입니다. 작업이 없어 대기한 시간은 계획 시간에서 빠지므로 가동률을 깎지 않습니다(10차시).</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> → <span class="ui">⚙ 설비 · 알람</span> 에서 최근 알람을, <span class="ui">🔧 정비 · 예지보전</span> 에서 정비 오더를 확인합니다.</div>
      ${SHOT('mes_equipment', 'MES 설비 · 알람')}
      <div class="lab-check">알람 · 정비 오더가 있으면 시각과 설비를 적습니다. 없으면 "아직 고장 없음" 이라고 적습니다(12차시에 가상 고장을 일으켜 봅니다).</div></li>
    <li class="lab-step"><div class="lab-do">위 그림의 <b>사후 · 예방 · 예지 보전</b> 중 이 플랫폼이 하려는 방식을 고르고, 근거가 되는 화면 이름 두 개를 적습니다.</div>
      <div class="lab-check">예지 보전 — 근거: 예지보전 보전 현황(이상 점수), MES 정비 오더(알람에서 자동 생성).</div></li>
  </ol>
  <div class="lab-result">비가동은 OEE 의 가동률을 깎는 가장 큰 손실입니다. 예지보전은 <b>돌발 정지를 계획 정비로 바꿔</b> 이 손실을 줄이는 것이 목표입니다.</div>
</div>`;

  const QUIZ1 = [
    { q: '다음 중 <b>제조 AI</b> 의 설명으로 가장 알맞은 것은?',
      options: ['공장에 로봇을 많이 들이는 것', 'AI 기술을 제조 데이터에 적용해 설비 · 품질 · 계획 문제를 푸는 것', 'PLC 래더 프로그램을 더 길게 쓰는 것', '사무실 문서 작업에만 챗봇을 쓰는 것'],
      answer: 1, explain: '제조 AI = AI 기술 × 제조 데이터 × 현장 문제입니다. 로봇 도입 자체는 자동화입니다.' },
    { q: '플랫폼에서 진동 · 전류 · 온도 같은 <b>설비 데이터</b>의 쌓인 양을 확인할 수 있는 화면은?',
      options: ['ERP → 영업 · 수주', '예지보전 → DB 탐색 · 내보내기', 'AI 생산계획', 'MES → 디스패치 보드'], answer: 1,
      explain: '예지보전의 DB 탐색 화면에 sensor_reading · vibration_window 같은 원시 데이터 테이블과 행 수가 나옵니다.' },
    { q: '자동화(PLC)와 제조 AI 의 관계로 옳은 것은?',
      options: ['AI 가 생기면 PLC 는 필요 없다', 'AI 는 규칙을 사람이 쓰고, PLC 는 데이터로 배운다', 'AI 는 데이터로 예측 · 권고하고, 최종 동작은 자동화 시스템과 사람이 수행한다', '둘은 서로 관계가 없다'],
      answer: 2, explain: '이 플랫폼도 AI 는 권고까지만 하고, 정지 · 감속 같은 결정은 PLC 와 사람이 합니다.' },
    { q: 'LOT 추적(적재함 ← 박스 ← 공작물 계보)은 어떤 제조 데이터에 해당할까요?',
      options: ['계획 데이터', '품질 데이터', '설비 데이터', '에너지 데이터'], answer: 1,
      explain: 'LOT 추적은 불량이 생겼을 때 원인을 거슬러 찾는 품질 · 추적성 데이터입니다.' },
  ];
  const QUIZ2 = [
    { q: '예지 보전이 예방 보전보다 나은 점으로 가장 알맞은 것은?',
      options: ['데이터가 전혀 필요 없다', '부품을 무조건 자주 바꾼다', '설비 상태를 보고 필요한 때 정비해 돌발 정지와 불필요한 교체를 함께 줄인다', '정비 인력이 필요 없다'],
      answer: 2, explain: '예지 보전은 상태 기반입니다. 데이터와 모델, 그리고 사람의 확인이 필요합니다.' },
    { q: '다음 중 제조 AI 의 적용 영역에 <b>속하지 않는</b> 것은?',
      options: ['생산계획 · 스케줄링', '품질 검사 · 예측', '에너지 · 자원 최적화', '안전 회로를 AI 가 대신 해제'],
      answer: 3, explain: '안전 회로(비상정지 · 인터락)는 하드웨어가 책임지며, AI 가 우회하거나 해제해서는 안 됩니다.' },
    { q: 'AI 생산계획에서 계획서 초안이 만들어진 뒤, 실제 생산은 어떻게 시작될까요?',
      options: ['AI 가 자동으로 생산을 시작한다', '사람이 화면에서 생산 계획 완료(확정) → ▶ 생산 시작을 누른다', 'PLC 가 계획서를 읽고 바로 시작한다', '다음 날 자동으로 시작된다'],
      answer: 1, explain: 'AI 는 초안까지만 만들고, 확정과 생산 시작은 사람이 누릅니다.' },
    { q: '대시보드에서 <b>가동률</b>이 낮은 설비가 뜻하는 것으로 알맞은 것은?',
      options: ['불량이 많다', '돌아야 할 때 일시정지 · 이상으로 멈춘 시간이 길다', '수주가 많다', 'AI 모델이 없다'], answer: 1,
      explain: '가동률은 계획 시간(운전 + 일시정지 + 이상) 중 실제로 운전한 비율입니다. 작업이 없어 대기한 시간은 계산에서 빠집니다.' },
  ];

  PY_COURSE.addChapter({
    id: 'ch01', no: '01', title: 'AI 시대, 왜 제조 AI 인가', subtitle: 'Manufacturing AI',
    summary: '제조 AI 의 뜻과 범위, 지금 제조 현장에 AI 가 필요한 이유, 앞으로의 전망을 정리하고 플랫폼에서 제조 데이터와 AI 기능을 직접 찾아봅니다.',
    goals: ['제조 AI 를 AI 기술 · 제조 데이터 · 현장 문제의 조합으로 설명할 수 있다',
      '플랫폼에서 설비 · 공정 · 품질 · 계획 데이터가 있는 화면을 찾을 수 있다',
      '제조 AI 의 적용 영역과 발전 방향을 말하고, 플랫폼의 AI 기능을 영역별로 분류할 수 있다'],
    sections: [
      {
        id: 'ch01-1', title: '제조 AI 란 무엇인가', minutes: 50,
        goals: ['AI · 머신러닝 · 딥러닝 · 생성형 AI 의 관계를 구분한다', '플랫폼에서 제조 데이터 네 가지를 찾는다', '자동화와 AI 의 역할을 구분한다'],
        flow: [['도입 — 공장의 하루', 7], ['개념 — AI 와 제조 AI', 13], ['실습 1-1 데이터 찾기', 15], ['실습 1-2 자동화 vs AI', 10], ['정리 · 퀴즈', 5]],
        content: [
          { type: 'figure', html: SHOT('hero_factory', '설비 4대가 돌아가는 3D 미니공장'),
            caption: '이 강좌에서 사용하는 스마트 미니팩토리 통합 플랫폼 — 설비 4대의 3D 디지털트윈' },
          { type: 'p', html: '공장에서는 지금 이 순간에도 엄청난 양의 데이터가 만들어집니다. 모터의 진동 · 전류 · 온도, 카메라가 본 제품의 위치와 모양, 몇 개를 만들었고 몇 개가 불량인지, 어떤 주문이 언제까지인지 … 하지만 데이터가 쌓이는 것만으로는 아무 일도 일어나지 않습니다. <b>데이터에서 의미를 찾아 현장의 결정을 돕는 것</b>, 그것이 <mark>제조 AI(Manufacturing AI)</mark> 입니다.' },
          { type: 'p', html: '이 강좌는 <b>코드를 배우는 강좌가 아닙니다.</b> 실제로 돌아가는 미니공장 플랫폼(ERP · MES · 3D 라인 · AI)을 <b>직접 사용하면서</b> 제조 AI 와 피지컬 AI 를 몸으로 익힙니다. 교시마다 화면을 보며 따라 하는 <b>단계별 실습</b>이 있고, 단계를 마칠 때마다 ☑ 완료를 체크하면 진행률이 저장됩니다.' },
          { type: 'h', text: 'AI · 머신러닝 · 딥러닝 · 생성형 AI' },
          { type: 'figure', html: FIG_SCOPE, caption: 'AI 기술 가운데 무엇을 쓰든, 제조 데이터와 현장 문제가 만나야 제조 AI 가 됩니다' },
          { type: 'table', head: ['용어', '뜻', '이 플랫폼에서의 예'], rows: [
            ['인공지능(AI)', '사람의 판단을 흉내 내는 모든 기술', '생산계획 설비 배정(규칙 · 최적화)'],
            ['머신러닝(ML)', '데이터에서 규칙(모델)을 스스로 학습', '정상 데이터를 배워 이상 점수 계산(예지보전)'],
            ['딥러닝 · 비전', '복잡한 패턴(영상 · 소리)을 다루는 기술', '카메라로 공작물 위치 · 각도 검출'],
            ['생성형 AI · LLM', '문장 · 계획을 만들어 내는 대규모 모델', 'AI 도우미 · AI 생산계획 · AI 정비 권고'],
          ] },
          { type: 'h', text: '제조 데이터의 네 가지 얼굴' },
          { type: 'figure', html: FIG_DATA, caption: '설비 · 공정 · 품질 · 계획 데이터 — 무엇을 예측하고 싶은지에 따라 쓰는 데이터가 다릅니다' },
          { type: 'h', text: '자동화와 제조 AI 는 무엇이 다를까?' },
          { type: 'figure', html: FIG_AUTO, caption: '자동화 = 정해진 규칙대로 반복 / 제조 AI = 데이터로 배워서 예측 · 권고' },
          { type: 'p', html: '자동화는 "<b>박스에 공작물 4개가 차면 UR3 를 부른다</b>" 처럼 사람이 쓴 규칙을 정확히 반복합니다. 제조 AI 는 "<b>요즘 컨베이어 모터 진동이 평소와 달라졌다</b>" 처럼, 규칙으로 쓰기 어려운 변화를 데이터에서 찾아 알려 줍니다. 그리고 그 판단은 결국 PLC 와 사람을 통해 현장에 반영됩니다.' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_DATA },
          { type: 'figure', html: LAB_AUTO },
          { type: 'callout', kind: 'more', title: '제조 AI 가 어려운 이유', html: '<ul><li><b>데이터 불균형</b>: 고장은 드물어 정답 데이터가 적습니다 → 이 플랫폼은 정상 데이터만으로 학습하고, 가상 고장으로 고장 데이터를 만듭니다.</li><li><b>운전 조건 변화</b>: 속도 · 제품이 바뀌면 "정상" 도 바뀝니다.</li><li><b>물리 세계의 비용</b>: 틀린 판단이 설비 정지 · 불량 · 안전 문제로 이어집니다 → AI 는 권고만 합니다.</li><li><b>현장 수용성</b>: 근거를 보여 주지 못하는 AI 는 쓰이지 않습니다 → 알람마다 근거 특징을 함께 보여 줍니다.</li></ul>' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 수업 전날 실습 프로그램을 켜고 생산계획을 하나 돌려(7차시 방법, 또는 공장 라인 <b>기동</b>) 대시보드 · LOT · 예지보전 데이터가 쌓여 있게 합니다. 데이터가 비어 있으면 실습 1-1 의 값 칸은 "없음" 으로 적게 합니다.</li><li><b>도입 발문</b>: "공장에서 하루 동안 어떤 데이터가 생길까요?" — 학생 답을 네 칸으로 분류해 판서합니다.</li><li><b>오개념</b>: "제조 AI = 로봇" 이 아닙니다(2차시에서 피지컬 AI 와 연결).</li><li><b>자주 막히는 곳</b>: LOT 목록이 비어 있음 → 적재함이 한 번도 출고되지 않은 상태. 대시보드의 LOT 대신 화면 캡처로 설명합니다.</li><li><b>확인 기준</b>: 실습 1-1 표 4줄(데이터 · 화면 · 값 · AI 활용), 실습 1-2 자동화/AI 각 3개 이상.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: '제조 AI 란 무엇인가', subtitle: 'AI 기술 × 제조 데이터 × 현장 문제', notes: '<p>강좌 첫 시간. 이 강좌는 코드가 아니라 <b>플랫폼을 직접 써 보며</b> 제조 AI · 피지컬 AI 를 배운다고 소개합니다.</p>' },
          { layout: 'diagram', title: '오늘 다룰 공장', html: SHOT('hero_factory', '3D 미니공장'), caption: '설비 4대 · ERP · MES · AI 가 연결된 미니공장',
            notes: '<p>💬 "이 공장에서 하루 동안 어떤 데이터가 생길까요?" — 학생 답을 판서해 두고 다음 장에서 분류합니다.</p>' },
          { layout: 'diagram', title: 'AI · 머신러닝 · 딥러닝 · 생성형 AI', html: FIG_SCOPE,
            notes: '<p>AI = 챗봇 = 로봇이 아닙니다. 규칙 기반 배정도 AI 의 한 형태입니다. 오른쪽 카드: 제조 AI 는 "기술을 현장 문제에 적용한 것".</p>' },
          { layout: 'table', title: '이 플랫폼 속 AI', head: ['종류', '플랫폼 기능'], rows: [
            ['규칙 · 최적화', '생산계획 설비 배정'], ['머신러닝', '예지보전 이상 점수'], ['비전', '카메라 공작물 검출'], ['생성형 AI · LLM', 'AI 도우미 · AI 생산계획 · 정비 권고']],
            notes: '<p>각 기능을 배울 차시 예고: 11~12 예지보전, 13 생산계획, 14 AI 도우미.</p>' },
          { layout: 'diagram', title: '제조 데이터의 네 가지 얼굴', html: FIG_DATA,
            notes: '<p>도입에서 판서한 답을 네 칸으로 옮깁니다. 각 칸 아래 "화면" 은 실습 1-1 에서 직접 찾아갈 곳입니다.</p>' },
          { layout: 'diagram', title: '자동화 vs 제조 AI', html: FIG_AUTO,
            notes: '<p>핵심 문장: "AI 의 권고는 결국 자동화 시스템을 통해 현장에 반영된다."</p>' },
          { layout: 'bullets', title: '실습 1-1 · 데이터 찾기 (15분)', bullets: ['대시보드 → 공정 데이터', '예지보전 → DB 탐색 → 설비 데이터', 'MES → 품질 · LOT 추적 → 품질 데이터', 'ERP → 수주 · 기준정보 → 계획 데이터', '활동지 표 4줄 채우기'],
            notes: '<p>교사 화면으로 첫 두 단계를 시연한 뒤 학생이 따라 합니다. 단계마다 ☑ 완료 체크를 하도록 안내합니다.</p>' },
          { layout: 'bullets', title: '실습 1-2 · 자동화 vs AI (10분)', bullets: ['공장 라인: PLC 상태 · 명령 버튼', '3D: 델타가 공작물을 집는 모습', '예지보전: 이상 점수 · 단계', '활동지: 자동화 / AI 로 나눠 적기'],
            notes: '<p>💬 "델타 로봇은 자동화일까 AI 일까?" — 카메라로 위치를 <b>인식</b>하는 부분은 비전 AI, 정해진 동작으로 집는 부분은 자동화. 2차시 피지컬 AI 의 복선.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[2].q, options: QUIZ1[2].options, answer: QUIZ1[2].answer, explain: QUIZ1[2].explain, notes: '<p>오답이 많으면 "자동화 vs 제조 AI" 슬라이드로 돌아갑니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['제조 AI = AI 기술 × 제조 데이터 × 현장 문제', '데이터 네 가지: 설비 · 공정 · 품질 · 계획 — 각각 다른 화면에', '자동화는 규칙 반복, AI 는 데이터로 예측 · 권고', '결정은 PLC 와 사람'],
            notes: '<p>다음 시간: 왜 지금 제조 AI 가 필요한지, 앞으로 어떻게 발전할지 + 플랫폼 AI 기능 지도.</p>' },
        ],
      },
      {
        id: 'ch01-2', title: '제조 AI 가 필요한 이유와 전망', minutes: 50,
        goals: ['제조 현장의 과제와 제조 AI 의 역할을 연결한다', '사후 · 예방 · 예지 보전을 비교한다', '플랫폼의 AI 기능을 6대 영역에 분류하고 발전 방향을 설명한다'],
        flow: [['도입 — 현장의 고민', 5], ['왜 필요한가 · 6대 영역', 10], ['실습 1-3 AI 기능 지도', 20], ['실습 1-4 비가동 읽기', 8], ['전망 · 정리 · 퀴즈', 7]],
        content: [
          { type: 'h', text: '제조 현장이 마주한 다섯 가지 과제' },
          { type: 'table', head: ['과제', '현장에서 일어나는 일', '제조 AI 의 역할'], rows: [
            ['숙련 인력 부족 · 고령화', '소리만 듣고 고장을 알던 베테랑이 떠난다', '숙련자의 판단을 데이터 · 모델 · 기록으로 남긴다'],
            ['다품종 소량 생산', '제품 · 색이 자주 바뀌고 계획이 복잡해진다', '설비 배정 · 순서를 빠르게 계산하고 초안을 만든다'],
            ['돌발 고장 · 비가동', '설비 하나가 서면 라인 전체가 멈춘다', '징후를 미리 찾아 계획 정비로 바꾼다(예지보전)'],
            ['품질 요구 강화', '전수 검사 · 추적성(LOT)이 요구된다', '비전 검사 · LOT 추적 · 불량 원인 분석'],
            ['에너지 · 탄소 비용', '전력 · 압축 공기 사용을 줄여야 한다', '사용량 패턴 분석 · 운전 조건 최적화'],
          ], caption: '공통점: 사람의 경험만으로 판단하기에는 데이터가 너무 많고 상황이 너무 자주 바뀐다' },
          { type: 'h', text: '제조 AI 6대 적용 영역' },
          { type: 'figure', html: FIG_AREAS, caption: '이 플랫폼에는 ① 예지보전 · ② 비전 · ③ 생산계획 · ⑥ 업무 지원(LLM) AI 가 들어 있습니다' },
          { type: 'h', text: '보전 방식의 진화 — 사후 → 예방 → 예지' },
          { type: 'figure', html: FIG_MAINT, caption: '예지 보전은 "언제 고칠지" 를 데이터가 알려 줍니다' },
          { type: 'p', html: '고장 난 뒤 고치는 <b>사후 보전</b>은 돌발 정지가 크고, 주기마다 바꾸는 <b>예방 보전</b>은 멀쩡한 부품까지 바꿉니다. <b>예지 보전</b>은 설비 상태를 보고 "이상 징후가 보이니 이번 휴식 시간에 정비하자" 처럼 계획을 세웁니다. 이 플랫폼의 예지보전 화면 · MES 정비 오더가 바로 이 흐름입니다.' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_MAP },
          { type: 'figure', html: LAB_DOWN },
          { type: 'h', text: '제조 AI 는 어디로 가고 있을까' },
          { type: 'figure', html: FIG_FUTURE, caption: '보이기 → 알기 → 예측하기 → 권고하기 → (사람 감독 아래) 자율 운전' },
          { type: 'list', items: [
            '<b>생성형 AI · AI 에이전트</b>: 사람이 말로 묻고 지시하면 AI 가 ERP · MES 데이터를 조회해 요약하고 계획 초안 · 정비 권고를 만듭니다 — 이 플랫폼의 AI 도우미 · AI 생산계획.',
            '<b>디지털트윈 + AI</b>: 가상 공장에서 미리 돌려 보고, 고장 데이터를 만들어 AI 를 학습시킵니다 — 이 플랫폼의 시뮬레이터 · 가상 고장.',
            '<b>엣지 AI</b>: 설비 가까이(게이트웨이 · 카메라)에서 실시간으로 판단해 지연을 줄입니다.',
            '<b>산업용 파운데이션 모델</b>: 여러 설비 · 공정 데이터로 미리 학습한 큰 모델을 현장에 맞게 조정해 쓰는 흐름이 커지고 있습니다.',
            '<b>피지컬 AI</b>: AI 가 화면 속 답에 머물지 않고 물리 세계를 인식 · 판단 · 행동하는 방향 — 다음 차시의 주제입니다.',
          ] },
          { type: 'callout', kind: 'warn', title: '자율로 갈수록 더 중요해지는 것', html: '자율 운전에 가까워질수록 <b>안전 · 책임 · 검증</b>이 더 중요해집니다. 그래서 이 플랫폼은 "AI 는 권고, 정지 · 감속 · 확정은 PLC 와 사람" 이라는 원칙을 지킵니다. 제조 AI 인재에게 필요한 것은 모델을 만드는 능력만이 아니라 <b>현장의 안전 체계 안에서 AI 를 쓰고 검증하는 능력</b>입니다.' },
          { type: 'table', head: ['AI 시대 제조 인재의 역량', '이 강좌에서'], rows: [
            ['현장 이해 — 공정 · 설비 · 안전', '2~3부(라인 · ERP · MES)'], ['데이터 이해 — 어디에 무엇이 쌓이는가', '1 · 11차시'],
            ['AI 활용 — 기능 · 지표 · 한계를 알고 쓰기', '11~13차시'], ['AI 와 협업 — 정확히 묻고 답을 검증하기', '14차시'], ['문제 해결 — 사례로 개선하기', '15~17차시']] },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 실습 1-3 의 AI 생산계획은 실제 계획서 초안(DRAFT)을 만듭니다. 확정 · 생산 시작은 누르지 않게 미리 강조합니다. 초안이 많이 쌓여도 문제는 없습니다(7차시에서 정리).</li><li><b>API 키</b>: 키가 없으면 규칙 기반으로 답합니다. 수업에서 Claude 답변을 보여 주려면 교사 PC 에만 키를 등록해 시연합니다(14차시).</li><li><b>전망</b>: 시장 규모 같은 숫자를 외우게 하지 말고, "보이기 → 자율" 단계 중 우리 학교 · 회사가 어디쯤인지 토론합니다.</li><li><b>확인 기준</b>: 실습 1-3 지도에 ①②③⑥ 영역 기능 각 1개 이상, ④⑤ 아이디어 각 1개.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '제조 AI 가 필요한 이유와 전망', subtitle: '현장의 과제 → AI 의 역할 → 앞으로', notes: '<p>지난 시간 정리: 제조 AI = 기술 × 데이터 × 현장 문제, 데이터는 네 화면에.</p>' },
          { layout: 'table', title: '현장의 다섯 가지 과제', head: ['과제', 'AI 의 역할'], rows: [
            ['숙련 인력 부족', '판단을 데이터 · 기록으로'], ['다품종 소량', '배정 · 순서 계산, 계획 초안'], ['돌발 고장', '징후 발견 → 계획 정비'], ['품질 요구', '비전 검사 · LOT 추적'], ['에너지 비용', '사용 패턴 분석']],
            notes: '<p>💬 "이 중 우리 지역 공장에 가장 절실한 것은?" — 짝과 1분 토론.</p>' },
          { layout: 'diagram', title: '제조 AI 6대 적용 영역', html: FIG_AREAS, notes: '<p>실습 1-3 에서 이 그림 위에 플랫폼 기능을 붙입니다.</p>' },
          { layout: 'diagram', title: '사후 → 예방 → 예지 보전', html: FIG_MAINT, notes: '<p>비유: 자동차 엔진오일 — 고장 나서 교체(사후), 5천 km 마다(예방), 오일 상태 센서로(예지).</p>' },
          { layout: 'diagram', title: 'AI 생산계획 — 말로 계획 초안', html: SHOT('ai_plan_result', 'AI 생산계획 결과'),
            notes: '<p>시연: 예시 버튼을 눌러 초안을 만듭니다. "확정 · 생산 시작은 누가 누르나?" 를 묻고 사람이라는 답을 이끌어 냅니다.</p>' },
          { layout: 'bullets', title: '실습 1-3 · AI 기능 지도 (20분)', bullets: ['AI 생산계획: 예시 요청 보내기(확정 X)', 'ERP AI 도우미: 「자재 부족 품목은?」', '예지보전: ✦ 분석하기', 'MES 정비: AI 권고 위치', '라인: 카메라 A 검출 · 지도 완성'],
            notes: '<p>모둠별로 지도를 완성해 사진으로 공유합니다. 키가 없으면 규칙 기반 답이 나와도 정상이라고 안내합니다.</p>' },
          { layout: 'bullets', title: '실습 1-4 · 비가동 읽기 (8분)', bullets: ['대시보드 8시간 · 간트', '가동률 가장 낮은 설비', 'MES 알람 · 정비 오더', '이 플랫폼의 보전 방식은?'],
            notes: '<p>정답: 예지 보전. 근거 화면 두 개를 말하게 합니다.</p>' },
          { layout: 'diagram', title: '제조 AI 의 발전 단계', html: FIG_FUTURE,
            notes: '<p>💬 "우리 학교 실습실은 몇 단계일까요?" 대부분 ①~②. 이 플랫폼으로 ③④ 를 해 봅니다.</p>' },
          { layout: 'bullets', title: '전망과 필요한 역량', bullets: ['생성형 AI · 에이전트', '디지털트윈 + AI · 엣지 AI', '산업용 파운데이션 모델', '피지컬 AI — 다음 차시', '안전 체계 안에서 AI 를 쓰고 검증하는 능력'],
            notes: '<p>출처를 확인할 수 없는 숫자는 쓰지 않도록 지도합니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[2].q, options: QUIZ2[2].options, answer: QUIZ2[2].answer, explain: QUIZ2[2].explain, notes: '<p>"AI 는 초안, 사람은 결정" 을 한 번 더 판서합니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['현장 과제: 인력 · 다품종 · 비가동 · 품질 · 에너지', '플랫폼 AI: 예지보전 · 비전 · 생산계획 · 업무 지원', '사후 → 예방 → 예지 보전', '방향: 에이전트 · 디지털트윈 · 엣지 · 피지컬 AI, 그리고 안전'],
            notes: '<p>다음 차시: 피지컬 AI — 로봇만이 아니다.</p>' },
        ],
      },
    ],
  });
})();
