/* 04 설치 · 첫 실행 · 화면 둘러보기 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_RUN = `<svg viewBox="0 0 720 200" role="img" aria-label="run.bat 의 다섯 단계: 런타임 확인, 파이썬 패키지, 웹 화면 빌드, DB 준비, 서버 실행과 브라우저 열기">
  ${ARROW('c04a1')}
  <rect x="5" y="40" width="130" height="90" rx="12" class="p1s"/>
  <text x="70" y="70" text-anchor="middle" class="tx-b">[1/5]</text>
  <text x="70" y="92" text-anchor="middle" class="tx-m">Python · Node</text>
  <text x="70" y="110" text-anchor="middle" class="tx-m">없으면 .runtime\</text>
  <rect x="150" y="40" width="130" height="90" rx="12" class="p2s"/>
  <text x="215" y="70" text-anchor="middle" class="tx-b">[2/5]</text>
  <text x="215" y="92" text-anchor="middle" class="tx-m">가상환경 · 패키지</text>
  <text x="215" y="110" text-anchor="middle" class="tx-m">(바뀐 경우만)</text>
  <rect x="295" y="40" width="130" height="90" rx="12" class="p3s"/>
  <text x="360" y="70" text-anchor="middle" class="tx-b">[3/5]</text>
  <text x="360" y="92" text-anchor="middle" class="tx-m">웹 화면 빌드</text>
  <text x="360" y="110" text-anchor="middle" class="tx-m">(바뀐 경우만)</text>
  <rect x="440" y="40" width="130" height="90" rx="12" class="p4s"/>
  <text x="505" y="70" text-anchor="middle" class="tx-b">[4/5]</text>
  <text x="505" y="92" text-anchor="middle" class="tx-m">DB 준비</text>
  <text x="505" y="110" text-anchor="middle" class="tx-m">data\ 폴더</text>
  <rect x="585" y="40" width="130" height="90" rx="12" class="p1"/>
  <text x="650" y="70" text-anchor="middle" class="tx-w">[5/5]</text>
  <text x="650" y="92" text-anchor="middle" class="tx-w">서버 실행</text>
  <text x="650" y="110" text-anchor="middle" class="tx-w">→ 브라우저 /site</text>
  <line x1="137" y1="85" x2="146" y2="85" class="ln" stroke-width="2" marker-end="url(#c04a1)"/>
  <line x1="282" y1="85" x2="291" y2="85" class="ln" stroke-width="2" marker-end="url(#c04a1)"/>
  <line x1="427" y1="85" x2="436" y2="85" class="ln" stroke-width="2" marker-end="url(#c04a1)"/>
  <line x1="572" y1="85" x2="581" y2="85" class="ln" stroke-width="2" marker-end="url(#c04a1)"/>
  <text x="360" y="170" text-anchor="middle" class="tx-m">처음에는 내려받기 · 설치 때문에 몇 분 걸리고, 두 번째부터는 바뀐 것만 준비해 빨리 켜집니다</text>
</svg>`;

  const FIG_MENU = `<svg viewBox="0 0 720 230" role="img" aria-label="위 메뉴 구성: 현장 묶음과 운영 묶음의 화면들">
  <rect x="10" y="20" width="340" height="190" rx="14" class="p2s"/>
  <text x="180" y="48" text-anchor="middle" class="tx-b">현장</text>
  <text x="30" y="80" class="tx">대시보드 — 생산 · OEE · 설비 상태 · 간트</text>
  <text x="30" y="106" class="tx">공장 라인 — 3D 트윈 · PLC · 카메라 · 명령</text>
  <text x="30" y="132" class="tx">예지보전 — 이상 점수 · DB · AI 로 분석하기</text>
  <text x="30" y="158" class="tx">가상 고장 — 무작위 고장 · 가상 스위치</text>
  <text x="30" y="184" class="tx">현장 2분할 — 대시보드 + 공장 라인</text>
  <rect x="370" y="20" width="340" height="190" rx="14" class="p4s"/>
  <text x="540" y="48" text-anchor="middle" class="tx-b">운영</text>
  <text x="390" y="80" class="tx">ERP — 수주 · 계획 · 생산오더 · 자재 · 출고</text>
  <text x="390" y="106" class="tx">MES — 작업지시 · 실적 · LOT · 품질 · 정비</text>
  <text x="390" y="132" class="tx">AI 생산계획 — 말로 계획 초안 만들기</text>
  <text x="390" y="158" class="tx">운영 2분할 — ERP + MES</text>
  <text x="390" y="184" class="tx">(ERP · MES 오른쪽 아래 ✦ AI 도우미)</text>
</svg>`;

  const FIG_KPI = `<svg viewBox="0 0 700 200" role="img" aria-label="OEE 는 가동률 곱하기 성능 곱하기 품질">
  <rect x="10" y="60" width="140" height="80" rx="12" class="p1"/>
  <text x="80" y="95" text-anchor="middle" class="tx-w">OEE</text>
  <text x="80" y="118" text-anchor="middle" class="tx-w">설비 종합 효율</text>
  <text x="175" y="108" text-anchor="middle" class="tx-b">=</text>
  <rect x="200" y="60" width="140" height="80" rx="12" class="p2s"/>
  <text x="270" y="92" text-anchor="middle" class="tx-b">가동률</text>
  <text x="270" y="116" text-anchor="middle" class="tx-m">멈추지 않았나</text>
  <text x="362" y="108" text-anchor="middle" class="tx-b">×</text>
  <rect x="385" y="60" width="140" height="80" rx="12" class="p3s"/>
  <text x="455" y="92" text-anchor="middle" class="tx-b">성능</text>
  <text x="455" y="116" text-anchor="middle" class="tx-m">제 속도로 돌았나</text>
  <text x="547" y="108" text-anchor="middle" class="tx-b">×</text>
  <rect x="570" y="60" width="125" height="80" rx="12" class="p5s"/>
  <text x="632" y="92" text-anchor="middle" class="tx-b">품질</text>
  <text x="632" y="116" text-anchor="middle" class="tx-m">양품이었나</text>
  <text x="350" y="180" text-anchor="middle" class="tx-m">예) 가동률 95% × 성능 90% × 품질 98% ≈ OEE 84%</text>
</svg>`;

  const LAB_FIRST = `<div class="lab" data-lab="ch04-1-a">
  <div class="lab-head"><span class="lab-badge">실습 4-1</span><b>run.bat 으로 첫 실행</b><span class="lab-meta">⏱ 15분(처음 설치 포함) · Windows PC</span></div>
  <p class="lab-goal">강사에게 받은 실습 프로그램 폴더를 실행해 브라우저에 공장 화면이 열리게 합니다.</p>
  <p class="lab-pre">Windows 10/11 PC, 인터넷(처음 한 번 설치용), 강사에게 받은 <b>miniPythicalAI</b> 폴더(또는 압축 파일)</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">폴더를 <b>한글 · 공백이 없는 경로</b>에 둡니다(예: <code>D:\\minifactory</code>). 압축 파일이면 먼저 압축을 풉니다.</div>
      <div class="lab-check">폴더 안에 <code>run.bat</code> 파일이 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><code>run.bat</code> 을 더블 클릭합니다.</div>
      <div class="lab-check">검은 창이 열리고 <code>[1/5] Python · Node.js 확인</code> 처럼 단계 번호가 차례로 나옵니다.</div>
      <div class="lab-tip">Windows 가 "PC 보호" 창을 띄우면 <b>추가 정보 → 실행</b> 을 누릅니다(학교 PC 는 관리자에게 문의).</div></li>
    <li class="lab-step"><div class="lab-do">[1/5] 에서 Python · Node.js 가 PC 에 없으면 폴더 안 <code>.runtime\\</code> 에 '포터블'로 자동 설치되는 것을 지켜봅니다.</div>
      <div class="lab-check">관리자 권한이나 시스템 설치 없이 진행됩니다. 처음 한 번만 몇 분 걸립니다.</div></li>
    <li class="lab-step"><div class="lab-do">[2/5] 패키지 → [3/5] 웹 화면 → [4/5] DB 준비(<code>data\\</code> 폴더)가 끝날 때까지 기다립니다.</div>
      <div class="lab-check">[5/5] 줄에 <code>서버 실행: http://localhost:9845</code> 와 <code>데이터: …\\data</code> 경로가 나옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">잠시 뒤 기본 브라우저가 자동으로 열리는지 확인합니다(열리지 않으면 주소창에 <code>http://localhost:9845/site</code> 입력).</div>
      ${SHOT('site_split', '현장 2분할 첫 화면')}
      <div class="lab-check"><b>현장 2분할</b>(왼쪽 대시보드 + 오른쪽 3D 공장 라인) 화면이 열립니다.</div></li>
    <li class="lab-step"><div class="lab-do">3D 화면의 설비 칸 상태를 확인합니다.</div>
      <div class="lab-check">처음에는 모든 설비가 <span class="ui">준비</span> 상태로 <b>움직이지 않는 것이 정상</b>입니다. 생산계획을 확정하고 <span class="ui">▶ 생산 시작</span> 하면 작업지시가 시작된 설비만 기동합니다(7차시). 직접 돌려 보려면 공장 라인의 <span class="ui">기동</span> 을 누릅니다.</div></li>
    <li class="lab-step"><div class="lab-do">끌 때는 검은 창을 클릭하고 <kbd>Ctrl</kbd> + <kbd>C</kbd> 를 누릅니다(브라우저 탭만 닫으면 서버는 계속 돕니다).</div>
      <div class="lab-check">검은 창의 서버가 멈추고, 브라우저를 새로고침하면 연결 끊김이 표시됩니다.</div></li>
  </ol>
  <div class="lab-result">run.bat 하나가 <b>설치 → 준비 → 서버 실행 → 브라우저 열기</b>를 모두 합니다. 데이터는 모두 폴더 안 <code>data\\</code> 에 저장되므로 다시 켜면 그대로 이어집니다.</div>
</div>`;

  const LAB_AGAIN = `<div class="lab" data-lab="ch04-1-b">
  <div class="lab-head"><span class="lab-badge">실습 4-2</span><b>다시 실행 · 다른 포트 · 강의실 접속 · 처음부터</b><span class="lab-meta">⏱ 12분 · Windows PC</span></div>
  <p class="lab-goal">수업에서 자주 쓰는 실행 옵션과 데이터 초기화 방법을 익힙니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">실습 4-1 의 서버를 끈 상태에서 <code>run.bat</code> 을 다시 실행하고, 브라우저가 열릴 때까지 걸린 시간을 잽니다.</div>
      <div class="lab-check">설치 · 빌드는 바뀐 것만 하므로 처음보다 훨씬 빨리(보통 수십 초) 켜집니다. 지난번 데이터가 그대로 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">서버가 켜진 상태에서 폴더의 <code>run.bat</code> 을 한 번 더 실행해 봅니다.</div>
      <div class="lab-check">9845 포트가 이미 쓰이고 있으므로 <b>9846~9865 중 빈 포트</b>로 자동으로 바뀌어 열립니다. 검은 창에 표시된 주소를 확인하고 이 두 번째 창은 <kbd>Ctrl</kbd>+<kbd>C</kbd> 로 끕니다.</div>
      <div class="lab-tip">포트를 직접 정하려면 명령창에서 <code>run.bat 9900</code> 처럼 숫자를 붙입니다.</div></li>
    <li class="lab-step"><div class="lab-do">교사 PC 의 공장에 학생 PC 가 접속하게 하려면 교사가 명령창에서 <code>run.bat -Lan</code> 으로 실행합니다.</div>
      <div class="lab-check">같은 네트워크의 다른 PC 에서 <code>http://교사PC의IP:9845/site</code> 로 접속됩니다(Windows 방화벽 허용 필요).</div></li>
    <li class="lab-step"><div class="lab-do">프로그램을 새 버전으로 바꾼 뒤 화면이 예전 그대로라면 <code>run.bat -Rebuild</code> 로 실행합니다.</div>
      <div class="lab-check">[3/5] 단계에서 웹 화면을 다시 만듭니다.</div></li>
    <li class="lab-step"><div class="lab-do">데이터를 처음 상태로 되돌리고 싶을 때: 서버를 끄고 <code>data\\</code> 폴더를 다른 이름(예: <code>data_1주차</code>)으로 바꾼 뒤 <code>run.bat</code> 을 실행합니다.</div>
      <div class="lab-check">새 <code>data\\</code> 폴더와 새 DB 로 시작합니다. 이름을 바꾼 폴더는 그대로 남아 있어 <b>백업</b> 역할도 합니다(되돌리려면 이름을 다시 <code>data</code> 로).</div></li>
    <li class="lab-step"><div class="lab-do">서버가 켜진 상태에서 브라우저 주소 <code>http://localhost:9845/docs</code> 를 열어 봅니다.</div>
      <div class="lab-check">API 문서 화면이 열립니다. 이 강좌에서는 쓰지 않지만, 화면 뒤에 API 가 있다는 것을 확인합니다.</div></li>
  </ol>
  <div class="lab-result">수업 운영에 필요한 옵션 — <b>포트 자동 변경, -Lan(강의실 공유), -Rebuild(화면 다시 만들기), data 폴더 바꾸기(초기화 · 백업)</b> — 를 익혔습니다.</div>
</div>`;

  const LAB_DEMO = `<div class="lab" data-lab="ch04-1-c">
  <div class="lab-head"><span class="lab-badge">실습 4-3</span><b>설치 없이 — 온라인 체험판 둘러보기</b><span class="lab-meta">⏱ 8분 · 아무 PC · 태블릿</span></div>
  <p class="lab-goal">설치가 어려운 환경에서 쓰는 온라인 체험판의 특징과 한계를 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">브라우저에서 <a href="https://samcho93.github.io/miniPythicalAI/" target="_blank" rel="noopener">https://samcho93.github.io/miniPythicalAI/</a> 를 엽니다.</div>
      <div class="lab-check">서버 없이 브라우저 안에서 미니공장이 돌아갑니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 메뉴에서 대시보드 · 공장 라인 · ERP · MES 를 차례로 열어 봅니다.</div>
      <div class="lab-check">기본 화면은 같지만 <b>설비는 1대</b>이고, 데이터는 이 브라우저에만 저장됩니다.</div></li>
    <li class="lab-step"><div class="lab-do">로컬 실행본(실습 4-1)과 비교해 메뉴 · 기능 차이를 적습니다.</div>
      <div class="lab-check">체험판은 설비 1대 · 기존 기본 기능만 있습니다. 설비 여러 대 · 생산계획서 · MRP · 디스패치 · 연동 그래프 · AI 기능 실습은 <b>로컬 실행본</b>으로 합니다.</div></li>
  </ol>
  <div class="lab-result">체험판은 <b>미리 보기 · 복습용</b>, 이 강좌의 실습은 <b>로컬 실행본(run.bat)</b> 기준입니다.</div>
</div>`;

  const LAB_TOUR = `<div class="lab" data-lab="ch04-2-a">
  <div class="lab-head"><span class="lab-badge">실습 4-4</span><b>9개 화면 투어</b><span class="lab-meta">⏱ 15분 · 전체 화면</span></div>
  <p class="lab-goal">위 메뉴의 모든 화면을 한 번씩 열고, 각 화면이 무엇을 하는 곳인지 한 줄씩 정리합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">화면 맨 위 메뉴를 봅니다. 왼쪽 <b>현장</b> 묶음과 오른쪽 <b>운영</b> 묶음으로 나뉘어 있습니다.</div>
      ${SHOT('ch04_menu', '위 메뉴')}
      <div class="lab-check">현장: 대시보드 · 공장 라인 · 예지보전 · 가상 고장 · 현장 2분할 / 운영: ERP · MES · AI 생산계획 · 운영 2분할.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">대시보드</span> → <span class="ui">공장 라인</span> 을 차례로 엽니다.</div>
      <div class="shot-pair">${SHOT('dashboard', '대시보드')}${SHOT('line_page', '공장 라인')}</div>
      <div class="lab-check">대시보드 = 공장 전체 숫자 · 그래프, 공장 라인 = 3D 트윈 · PLC 상태 · 카메라 · 상위 명령.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">예지보전</span> → <span class="ui">가상 고장</span> 을 엽니다.</div>
      <div class="shot-pair">${SHOT('pdm_overview', '예지보전')}${SHOT('fault_sim', '가상 고장')}</div>
      <div class="lab-check">예지보전 = 설비 이상 점수 · DB · AI 분석, 가상 고장 = 실습용 고장 만들기 · 가상 하드웨어 스위치.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">ERP</span> → <span class="ui">MES</span> 를 열고, 왼쪽 세로 메뉴의 항목 수를 셉니다.</div>
      <div class="shot-pair">${SHOT('erp_overview', 'ERP')}${SHOT('mes_pro', 'MES')}</div>
      <div class="lab-check">ERP 10개(개요 ~ ERP↔MES 연동), MES 10개(생산오더 · 공정 ~ ERP↔MES 연동) 메뉴가 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">AI 생산계획</span> 을 엽니다.</div>
      ${SHOT('ai_plan_empty', 'AI 생산계획')}
      <div class="lab-check">왼쪽 대화, 오른쪽 계획서 영역 — 말로 생산계획 초안을 만드는 화면입니다(13차시).</div></li>
    <li class="lab-step"><div class="lab-do">ERP 또는 MES 화면 오른쪽 아래 <span class="ui">✦ AI 도우미</span> 버튼을 찾아 눌렀다가 <span class="ui">✕ 닫기</span> 로 닫습니다.</div>
      ${SHOT('erp_ai_open', 'AI 도우미 열기')}
      <div class="lab-check">예시 질문 버튼 · 입력칸 · <span class="ui">🔑 키 설정</span> 이 보입니다. AI 도우미는 ERP · MES <b>개별 화면</b>에만 있고 2분할 안에서는 숨겨집니다.</div></li>
    <li class="lab-step"><div class="lab-do">활동지에 9개 화면 이름과 '한 줄 설명' 을 적습니다.</div>
      <div class="lab-check">9줄 모두 채웠습니다(현장 2분할 · 운영 2분할 포함).</div></li>
  </ol>
  <div class="lab-result">화면은 <b>현장(보고 · 감시 · 고장 실습)</b> 과 <b>운영(계획 · 실행 · AI 계획)</b> 두 묶음입니다. 각 화면은 혼자 열어도 완전히 동작하고, 2분할은 두 화면을 한 번에 보여 줍니다.</div>
</div>`;

  const LAB_SPLIT = `<div class="lab" data-lab="ch04-2-b">
  <div class="lab-head"><span class="lab-badge">실습 4-5</span><b>현장 · 운영 2분할 조작하기</b><span class="lab-meta">⏱ 10분 · 화면: 현장 2분할 · 운영 2분할</span></div>
  <p class="lab-goal">2분할 화면의 배치 · 크기 · 자리 바꾸기 · 크게 보기를 익혀 수업과 모니터링에 맞게 화면을 꾸밉니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">현장 2분할</span> 을 엽니다. 오른쪽 위 안내 문구를 읽습니다.</div>
      ${SHOT('ch04_site_controls', '현장 2분할 조작 안내')}
      <div class="lab-check">"경계선을 끌어 크기 조절 · 제목을 눌러 크게 보기" 가 보입니다. 왼쪽 위에 <span class="ui">좌우</span> · <span class="ui">위아래</span> · <span class="ui">⇄ 자리 바꾸기</span>, 오른쪽에 <span class="ui">초기화</span> 가 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">두 화면 사이의 <b>경계선</b>을 마우스로 끌어 대시보드를 좁게, 3D 를 넓게 만듭니다.</div>
      <div class="lab-check">크기가 바뀝니다. 이 설정은 이 브라우저에 저장되어 다음에 열어도 유지됩니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">운영 2분할</span> 로 가서 <span class="ui">위아래</span> 를 누릅니다.</div>
      ${SHOT('ch04_ops_vertical', '운영 2분할 위아래')}
      <div class="lab-check">ERP 가 위, MES 가 아래로 쌓입니다. 넓은 모니터는 좌우, 세로 모니터는 위아래가 편합니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">⇄ 자리 바꾸기</span> 를 누릅니다.</div>
      ${SHOT('ch04_ops_swap', '자리 바꾸기')}
      <div class="lab-check">두 화면의 위치가 서로 바뀝니다(위 캡처는 좌우 배치에서 바꾼 모습 — MES 가 왼쪽).</div></li>
    <li class="lab-step"><div class="lab-do">한쪽 제목 줄 오른쪽의 <span class="ui">⤢ 크게</span> 를 누른 뒤, 다시 눌러 2분할로 돌아옵니다.</div>
      <div class="lab-check">한 화면이 전체를 차지하고 버튼이 <span class="ui">⤡ 2분할로</span> 로 바뀝니다. 다시 누르면 돌아옵니다.</div></li>
    <li class="lab-step"><div class="lab-do">마지막으로 <span class="ui">초기화</span> 를 눌러 기본 배치(좌우 · 반반)로 되돌립니다.</div>
      <div class="lab-check">처음 배치로 돌아왔습니다.</div></li>
  </ol>
  <div class="lab-result">2분할은 <b>현장 감시(대시보드 + 3D)</b> 와 <b>운영(ERP + MES)</b> 을 한 화면에서 함께 보게 해 줍니다. 강의실 큰 화면에서는 <span class="ui">⤢ 크게</span> 로 한쪽을 키워 설명하면 좋습니다.</div>
</div>`;

  const LAB_DASH = `<div class="lab" data-lab="ch04-2-c">
  <div class="lab-head"><span class="lab-badge">실습 4-6</span><b>대시보드 읽기 · 화면 설정</b><span class="lab-meta">⏱ 15분 · 화면: 대시보드</span></div>
  <p class="lab-goal">대시보드에서 공장의 상태를 숫자로 읽고, 어둡게 모드 · 사용자 이름 같은 화면 설정을 익힙니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">대시보드</span> 맨 위 칸 6개 — <b>OEE(공장) · 가동률 · 성능 · 품질(양품률) · 생산 / 계획(박스) · 출고</b> — 의 값을 적습니다.</div>
      ${SHOT('dashboard', '대시보드 KPI')}
      <div class="lab-check">OEE 아래 '최근 8시간 · 설비 4대' 처럼 계산 범위가 적혀 있습니다. 생산 / 계획 아래에는 작업지시 대기 · 진행 · 완료 수가 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 그림(OEE = 가동률 × 성능 × 품질)으로 적은 세 값을 곱해 OEE 와 비슷한지 확인합니다.</div>
      <div class="lab-check">세 값을 곱하면 OEE(공장) 값과 거의 같습니다(반올림 차이는 괜찮습니다).</div></li>
    <li class="lab-step"><div class="lab-do">아래 <b>ERP · MES 요구사항</b> 칸에서 진행 수주 · 수주 잔량 · 납기 임박 · 지연 · 자재 부족 · 정비 오더(미완료) 를 찾습니다.</div>
      <div class="lab-check">노란 테두리 칸은 주의가 필요한 항목입니다(예: 자재 부족 · 납기 임박).</div></li>
    <li class="lab-step"><div class="lab-do">아래로 내려 <b>설비 가동 간트 차트</b> 오른쪽의 <span class="ui">30분</span> · <span class="ui">1시간</span> · <span class="ui">4시간</span> · <span class="ui">8시간</span> 중 <span class="ui">8시간</span> 을 누릅니다.</div>
      ${SHOT('ch04_dash_range', '간트 차트 시간 범위')}
      <div class="lab-check">설비마다 운전 · 대기 · 일시정지 · 이상 · 정비 구간과 작업지시 띠가 시간축에 그려집니다. 범례 글자로 색의 뜻을 확인합니다.</div></li>
    <li class="lab-step"><div class="lab-do">그 아래 <b>시간대별 생산량</b> · <b>설비별 OEE</b> 그래프를 보고 가장 많이 만든 설비를 찾습니다.</div>
      ${SHOT('dashboard_full', '대시보드 전체')}
      <div class="lab-check">설비 번호와 그 이유(가동 시간이 길었다 등)를 한 줄로 적었습니다.</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 위 <span class="ui">☾ 어둡게</span> 를 누릅니다. 다시 누르면(<span class="ui">☀ 밝게</span>) 돌아옵니다.</div>
      ${SHOT('ch04_dark', '어둡게 모드')}
      <div class="lab-check">모든 화면이 어두운 색으로 바뀝니다. 어두운 강의실 · 큰 화면에서 눈이 덜 피로합니다.</div></li>
    <li class="lab-step"><div class="lab-do">오른쪽 위 <span class="ui">사용자</span> 칸의 이름(기본 operator)을 자기 이름이나 번호로 바꿉니다.</div>
      ${SHOT('ch04_user', '사용자 이름 칸')}
      <div class="lab-check">이후 보내는 명령 · 기록에 이 이름이 남습니다(감사 로그 · 가져오기 이력 등). 정식 로그인 기능이 아니라 <b>요청자 표시</b>입니다.</div></li>
  </ol>
  <div class="lab-result">대시보드는 공장의 <b>건강 진단표</b>입니다. OEE 와 그 세 요소, 요구사항 칸, 간트 차트를 읽을 수 있으면 다음 차시부터 운영 · AI 실습의 결과를 스스로 확인할 수 있습니다.</div>
  <div class="lab-q">가동률은 낮은데 성능 · 품질이 100 % 에 가깝다면, 이 공장의 가장 큰 손실은 무엇일까요?</div>
</div>`;

  const QUIZ1 = [
    { q: 'run.bat 을 처음 실행할 때 PC 에 Python · Node.js 가 없으면 어떻게 될까요?',
      options: ['실행이 멈추고 직접 설치해야 한다', '폴더 안 .runtime\\ 에 포터블로 자동 설치된다', '온라인 체험판이 대신 열린다', '관리자 권한을 요구한다'], answer: 1,
      explain: '관리자 권한 · 시스템 등록 없이 프로젝트 폴더 안 .runtime\\ 에 포터블로 설치합니다.' },
    { q: '실습 프로그램의 모든 데이터(DB · 이미지 · 파형 · 모델)가 저장되는 곳은?',
      options: ['브라우저', 'data\\ 폴더', '바탕화면', '클라우드'], answer: 1,
      explain: '폴더 안 data\\ 에 저장됩니다. 이름을 바꾸면 새로 시작하고, 바꾼 폴더는 백업이 됩니다.' },
    { q: '교사 PC 에서 실행한 공장에 학생 PC 들이 접속하게 하려면?',
      options: ['run.bat -Rebuild', 'run.bat -Lan', 'run.bat 9900', 'Ctrl + C'], answer: 1,
      explain: '-Lan 은 같은 네트워크의 다른 PC 접속을 허용합니다(방화벽 허용 필요).' },
    { q: 'run.bat 으로 처음 실행했을 때 설비가 움직이지 않는 이유는?',
      options: ['설치가 실패해서', '처음에는 대기 상태이고, 생산 시작 또는 기동을 해야 움직이므로', '3D 화면이 고장 나서', '온라인 체험판이라서'], answer: 1,
      explain: '설비는 생산계획 → 생산 시작으로 작업지시가 시작되거나, 사람이 기동해야 움직입니다.' },
  ];
  const QUIZ2 = [
    { q: '다음 중 <b>운영</b> 묶음에 속하는 화면은?',
      options: ['예지보전', '가상 고장', 'AI 생산계획', '공장 라인'], answer: 2,
      explain: '운영: ERP · MES · AI 생산계획 · 운영 2분할 / 현장: 대시보드 · 공장 라인 · 예지보전 · 가상 고장 · 현장 2분할.' },
    { q: '2분할 화면에서 한쪽 화면만 크게 보려면?',
      options: ['⇄ 자리 바꾸기', '⤢ 크게', '위아래', '초기화'], answer: 1, explain: '제목 줄의 ⤢ 크게를 누르고, ⤡ 2분할로 로 돌아옵니다.' },
    { q: 'OEE 를 이루는 세 요소로 알맞은 것은?',
      options: ['수주 · 재고 · 출고', '가동률 · 성능 · 품질', '전류 · 온도 · 진동', '설비 수 · 색 · 박스'], answer: 1,
      explain: 'OEE = 가동률 × 성능 × 품질입니다.' },
    { q: '화면 오른쪽 위 <span class="ui">사용자</span> 칸의 역할은?',
      options: ['비밀번호 로그인', '명령 · 기록에 남는 요청자 이름 표시', '설비 대수 설정', 'AI 키 입력'], answer: 1,
      explain: '정식 로그인이 아니라 감사 로그 · 이력에 남는 요청자 이름입니다.' },
  ];

  PY_COURSE.addChapter({
    id: 'ch04', no: '04', title: '설치 · 첫 실행 · 화면 둘러보기', subtitle: 'Getting started',
    summary: 'run.bat 으로 플랫폼을 실행하고, 메뉴와 9개 화면, 현장 · 운영 2분할, 대시보드를 단계별로 둘러봅니다.',
    goals: ['run.bat 으로 실습 프로그램을 실행 · 종료 · 초기화할 수 있다',
      '9개 화면의 역할을 설명할 수 있다',
      '2분할을 조작하고 대시보드의 KPI 를 읽을 수 있다'],
    sections: [
      {
        id: 'ch04-1', title: '설치와 첫 실행', minutes: 50,
        goals: ['run.bat 의 다섯 단계를 이해하고 첫 실행을 마친다', '포트 · -Lan · -Rebuild · data 폴더 초기화를 할 수 있다', '온라인 체험판과 로컬 실행본의 차이를 안다'],
        flow: [['도입 — 오늘의 목표', 5], ['개념 — run.bat 의 다섯 단계', 7], ['실습 4-1 첫 실행', 18], ['실습 4-2 옵션 · 초기화', 12], ['실습 4-3 체험판 · 정리', 8]],
        content: [
          { type: 'p', html: '실습 프로그램(스마트 미니팩토리 통합 플랫폼)은 <b>Windows PC 한 대</b>에서 <code>run.bat</code> 하나로 실행됩니다. ERP · MES · 3D 라인 · 예지보전 · AI 가 모두 하나의 서버(한 포트, 기본 9845)에서 돌아가고, 브라우저로 화면을 봅니다. 하드웨어(PLC · 로봇 · 카메라)는 필요 없습니다 — <b>시뮬레이터</b>가 대신합니다.' },
          { type: 'figure', html: FIG_RUN, caption: 'run.bat 의 다섯 단계 — 검은 창에 [1/5] ~ [5/5] 로 표시됩니다' },
          { type: 'table', head: ['항목', '내용'], rows: [
            ['필요한 것', 'Windows 10/11, 인터넷(처음 설치용), 강사가 배포한 실습 프로그램 폴더'],
            ['자동 설치', 'Python · Node.js 가 없으면 폴더 안 <code>.runtime\\</code> 에 포터블 설치(관리자 권한 불필요)'],
            ['주소', '<code>http://localhost:9845</code> (사용 중이면 9846~9865 중 빈 포트). 처음 열리는 화면은 <code>/site</code>(현장 2분할)'],
            ['데이터', '모두 <code>data\\</code> 폴더(SQLite DB · 이미지 · 진동 파형 · AI 모델)'],
            ['끄기', '검은 창에서 <kbd>Ctrl</kbd>+<kbd>C</kbd>'],
            ['옵션', '<code>run.bat 9900</code>(포트), <code>-Lan</code>(강의실 공유), <code>-Rebuild</code>(화면 다시 빌드)'],
          ] },
          { type: 'callout', kind: 'info', title: '처음에는 설비가 멈춰 있습니다', html: '실행 직후 모든 설비는 <span class="ui">준비</span> 상태로 대기합니다. 실제 공장처럼 <b>생산계획을 확정하고 생산을 시작해야</b>(7차시) 작업지시가 시작된 설비만 움직이고, 마지막 작업지시를 끝내면 다시 대기합니다. 실습을 위해 바로 돌려 보고 싶으면 공장 라인의 <span class="ui">기동</span> 을 누릅니다(작업지시 없이 돌린 생산은 실적이 보류됩니다).' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_FIRST },
          { type: 'figure', html: LAB_AGAIN },
          { type: 'figure', html: LAB_DEMO },
          { type: 'callout', kind: 'more', title: '자주 겪는 문제', html: '<ul><li><b>브라우저가 열리지 않음</b>: 검은 창의 [5/5] 주소를 직접 입력합니다. 서버 준비에 최대 3분까지 기다립니다.</li><li><b>내려받기 실패</b>: 학교 방화벽 · 프록시 때문일 수 있습니다. 강사가 <code>.runtime</code> 이 포함된 폴더를 배포하면 인터넷 없이도 실행됩니다.</li><li><b>3D 가 느림</b>: 탭을 여러 개 열지 말고, 공장 라인 3D 위 시점 바의 <span class="ui">저품질 모드</span> 를 씁니다.</li><li><b>화면이 깨짐 · 예전 화면</b>: <code>run.bat -Rebuild</code>.</li></ul>' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 전 준비</b>: 강의실 PC 에 미리 한 번 실행해 <code>.runtime</code> · 패키지 설치를 끝내 두면 수업 시간이 크게 줄어듭니다(처음 실행이 가장 오래 걸립니다). 실행이 끝난 폴더를 복사해 배포해도 됩니다.</li><li><b>공용 서버 방식</b>: PC 사양이 낮으면 교사 PC 에서 <code>run.bat -Lan</code> 으로 띄우고 학생은 브라우저로 접속합니다. 이때 명령 · 고장 실습이 서로 영향을 주므로 모둠별 설비 번호를 정해 줍니다.</li><li><b>초기화 전략</b>: 차시마다 깨끗한 상태가 필요하면 <code>data</code> 폴더를 차시 이름으로 백업해 두고 바꿔 끼웁니다.</li><li><b>자주 막히는 단계</b>: 한글 경로 · OneDrive 폴더 안에 두어 실패하는 경우가 많습니다 → <code>D:\\minifactory</code> 처럼 짧은 경로.</li><li><b>확인 기준</b>: 각자 /site 화면을 띄우고, data 폴더 초기화 방법을 말할 수 있다.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: '설치와 첫 실행', subtitle: 'run.bat 하나로 공장을 켭니다', notes: '<p>오늘 목표: 각자 PC 에서 공장을 켜고, 끄고, 초기화할 수 있다.</p>' },
          { layout: 'diagram', title: 'run.bat 의 다섯 단계', html: FIG_RUN, notes: '<p>처음 실행이 오래 걸리는 이유(내려받기 · 설치)를 미리 말해 두면 학생이 불안해하지 않습니다.</p>' },
          { layout: 'table', title: '알아 둘 것', head: ['항목', '내용'], rows: [['주소', 'localhost:9845 → /site'], ['데이터', 'data\\ 폴더'], ['끄기', 'Ctrl + C'], ['옵션', '포트 · -Lan · -Rebuild']],
            notes: '<p>표를 칠판에 적어 두고 실습 내내 참고하게 합니다.</p>' },
          { layout: 'diagram', title: '첫 화면 — 현장 2분할', html: SHOT('site_split', '현장 2분할'), notes: '<p>"설비가 안 움직여요" → 정상. 생산 시작 또는 기동이 필요합니다.</p>' },
          { layout: 'bullets', title: '실습 4-1 · 첫 실행 (18분)', bullets: ['한글 · 공백 없는 경로에 폴더', 'run.bat 더블 클릭', '[1/5] ~ [5/5] 지켜보기', '/site 화면 · 설비 준비 상태 확인', 'Ctrl + C 로 끄기'],
            notes: '<p>교사 화면으로 검은 창을 보여 주며 단계 번호를 함께 읽습니다.</p>' },
          { layout: 'bullets', title: '실습 4-2 · 옵션과 초기화', bullets: ['다시 실행 — 빨라짐', '두 번 실행 → 빈 포트 자동', '-Lan 강의실 공유 · -Rebuild', 'data 폴더 이름 바꾸기 = 초기화 + 백업', '/docs API 문서'],
            notes: '<p>초기화 방법은 시험에도 자주 냅니다. 이름만 바꾸면 백업이 된다는 점을 강조.</p>' },
          { layout: 'bullets', title: '실습 4-3 · 온라인 체험판', bullets: ['samcho93.github.io/miniPythicalAI', '설비 1대 · 기본 기능', '데이터는 그 브라우저에만', '실습은 로컬 실행본으로'],
            notes: '<p>집에서 복습할 때 체험판을 쓰도록 안내합니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[1].q, options: QUIZ1[1].options, answer: QUIZ1[1].answer, explain: QUIZ1[1].explain, notes: '<p>data 폴더 = 공장의 기억.</p>' },
          { layout: 'summary', title: '정리', bullets: ['run.bat = 설치 → 준비 → 서버 → 브라우저', 'localhost:9845/site · Ctrl + C', 'data\\ 폴더로 초기화 · 백업', '-Lan 으로 강의실 공유, 체험판은 미리 보기'],
            notes: '<p>다음 시간: 9개 화면 투어와 대시보드 읽기.</p>' },
        ],
      },
      {
        id: 'ch04-2', title: '화면 둘러보기', minutes: 50,
        goals: ['9개 화면의 역할을 한 줄로 설명한다', '2분할의 배치 · 크기 · 자리 · 크게 보기를 조작한다', '대시보드 KPI 와 간트 차트를 읽고 화면 설정을 바꾼다'],
        flow: [['도입 — 메뉴 지도', 5], ['실습 4-4 화면 투어', 15], ['실습 4-5 2분할 조작', 10], ['실습 4-6 대시보드 읽기', 15], ['정리 · 퀴즈', 5]],
        content: [
          { type: 'figure', html: FIG_MENU, caption: '위 메뉴 — 현장 묶음과 운영 묶음' },
          { type: 'p', html: '모든 화면은 <b>혼자 열어도 완전히 동작</b>합니다. <span class="ui">현장 2분할</span>(대시보드 + 공장 라인)과 <span class="ui">운영 2분할</span>(ERP + MES)은 자주 함께 보는 두 화면을 한 번에 보여 주는 화면입니다. ERP · MES 개별 화면의 오른쪽 아래에는 <span class="ui">✦ AI 도우미</span> 가 있습니다.' },
          { type: 'figure', html: FIG_KPI, caption: '대시보드의 첫 숫자 OEE — 가동률 × 성능 × 품질' },
          { type: 'table', head: ['대시보드 영역', '무엇을 보나'], rows: [
            ['맨 위 KPI 6칸', 'OEE(공장) · 가동률 · 성능 · 품질(양품률) · 생산 / 계획(박스) · 출고'],
            ['ERP · MES 요구사항', '진행 수주 · 수주 잔량 · 납기 임박 · 지연 · 자재 부족 · 대기 · 미배정 작업지시 · 정비 오더'],
            ['생산계획서 진행', '최근 계획서의 상태 · 진행률 · 색'],
            ['설비별 상태', '설비마다 상태 · 품목 · 진행 작업지시 · OEE · 출고 적재함'],
            ['설비 가동 간트', '운전 · 대기 · 일시정지 · 이상 · 정비 구간과 작업지시(30분 ~ 8시간)'],
            ['그래프', '시간대별 설비별 생산량, 설비별 OEE, 불량 · 설비 건강도 · 알람'],
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_TOUR },
          { type: 'figure', html: LAB_SPLIT },
          { type: 'figure', html: LAB_DASH },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 대시보드에 숫자가 있으려면 생산 기록이 필요합니다. 전날 설비를 기동하거나 생산계획을 하나 돌려 두세요. 데이터가 없으면 OEE 가 0 % · 빈 그래프로 보입니다.</li><li><b>AI 도우미 위치</b>: 2분할 안에서는 숨겨집니다. "AI 도우미가 안 보여요" → ERP · MES 개별 화면으로 이동.</li><li><b>OEE 계산 확인</b>: 학생이 곱한 값과 화면 값이 조금 다를 수 있습니다(반올림 · 집계 범위). 원리를 이해했는지만 봅니다.</li><li><b>사용자 이름</b>: 수업에서는 학번 · 이름으로 바꾸게 하면 이후 감사 로그 · 이력에서 누가 했는지 구분됩니다.</li><li><b>확인 기준</b>: 9개 화면 설명표, KPI 6개 값, 가장 많이 생산한 설비와 이유.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '화면 둘러보기', subtitle: '9개 화면 · 2분할 · 대시보드', notes: '<p>지난 시간 실행한 공장을 다시 켜고 시작합니다.</p>' },
          { layout: 'diagram', title: '메뉴 지도', html: FIG_MENU, notes: '<p>현장 = 보고 · 감시 · 고장 실습, 운영 = 계획 · 실행 · AI 계획.</p>' },
          { layout: 'diagram', title: '위 메뉴', html: SHOT('ch04_menu', '위 메뉴'), notes: '<p>실제 화면에서 메뉴를 하나씩 눌러 보이며 실습 4-4 를 안내합니다.</p>' },
          { layout: 'bullets', title: '실습 4-4 · 화면 투어 (15분)', bullets: ['대시보드 · 공장 라인', '예지보전 · 가상 고장', 'ERP · MES (메뉴 10개씩)', 'AI 생산계획 · ✦ AI 도우미', '9줄 설명표'],
            notes: '<p>한 화면에 오래 머물지 않게 시간을 알려 줍니다.</p>' },
          { layout: 'diagram', title: '2분할 조작', html: SHOT('ch04_ops_vertical', '운영 2분할 위아래'), notes: '<p>좌우 · 위아래 · 자리 바꾸기 · 크게 · 초기화. 설정은 브라우저에 저장.</p>' },
          { layout: 'diagram', title: 'OEE = 가동률 × 성능 × 품질', html: FIG_KPI, notes: '<p>💬 "기계가 멈추면 어느 요소가 떨어질까?" → 가동률.</p>' },
          { layout: 'diagram', title: '간트 차트', html: SHOT('ch04_dash_range', '간트 차트'), notes: '<p>8시간으로 바꿔 설비별 운전 · 대기 구간을 함께 읽습니다.</p>' },
          { layout: 'bullets', title: '실습 4-5 · 4-6 (25분)', bullets: ['2분할: 경계선 · 위아래 · 자리 · 크게 · 초기화', 'KPI 6칸 값 적기 · OEE 곱셈 확인', '요구사항 칸 · 간트 8시간', '☾ 어둡게 · 사용자 이름'],
            notes: '<p>OEE 곱셈 결과가 화면 값과 비슷하면 통과.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[2].q, options: QUIZ2[2].options, answer: QUIZ2[2].answer, explain: QUIZ2[2].explain, notes: '<p>10차시에서 OEE 를 다시 자세히 다룹니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['현장 5개 · 운영 4개 화면', '2분할: 배치 · 크기 · 자리 · 크게 · 초기화', '대시보드: OEE · 요구사항 · 간트 · 그래프', '☾ 어둡게 · 사용자 이름'],
            notes: '<p>다음 차시: 공장 라인과 3D 디지털트윈을 자세히.</p>' },
        ],
      },
    ],
  });
})();
