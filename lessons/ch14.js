/* 14 AI 도우미와 AI 키 */
(function () {
  const ARROW = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fill-arrow"/></marker></defs>`;
  const SHOT = (f, alt) => `<img class="shot" src="assets/shots/${f}.jpg" alt="${alt}">`;

  const FIG_LOOP = `<svg viewBox="0 0 720 280" role="img" aria-label="AI 도우미의 동작: 질문을 받으면 AI 가 조회 도구를 골라 부르고, 서버가 ERP MES 데이터를 돌려주면 그 숫자로 답을 쓴다">
  ${ARROW('c14a1')}
  <rect x="10" y="100" width="130" height="70" rx="12" class="p1s"/>
  <text x="75" y="130" text-anchor="middle" class="tx-b">① 질문</text>
  <text x="75" y="152" text-anchor="middle" class="tx-m">"자재 부족은?"</text>
  <rect x="190" y="100" width="150" height="70" rx="12" class="p2"/>
  <text x="265" y="130" text-anchor="middle" class="tx-w">② AI</text>
  <text x="265" y="152" text-anchor="middle" class="tx-w">어떤 도구가 필요?</text>
  <rect x="400" y="20" width="150" height="60" rx="12" class="p3s"/>
  <text x="475" y="46" text-anchor="middle" class="tx-b">③ 조회 도구</text>
  <text x="475" y="66" text-anchor="middle" class="tx-m">MRP · 재고 · 수주 …</text>
  <rect x="590" y="20" width="120" height="60" rx="12" class="card-bg"/>
  <text x="650" y="46" text-anchor="middle" class="tx-b">ERP · MES</text>
  <text x="650" y="66" text-anchor="middle" class="tx-m">실제 데이터</text>
  <rect x="400" y="190" width="150" height="70" rx="12" class="p4s"/>
  <text x="475" y="218" text-anchor="middle" class="tx-b">④ 답 작성</text>
  <text x="475" y="240" text-anchor="middle" class="tx-m">조회한 숫자만 사용</text>
  <rect x="590" y="190" width="120" height="70" rx="12" class="p1"/>
  <text x="650" y="220" text-anchor="middle" class="tx-w">⑤ 사람</text>
  <text x="650" y="242" text-anchor="middle" class="tx-w">화면에서 확인</text>
  <line x1="142" y1="135" x2="186" y2="135" class="ln" stroke-width="2" marker-end="url(#c14a1)"/>
  <line x1="342" y1="118" x2="396" y2="60" class="ln" stroke-width="2" marker-end="url(#c14a1)"/>
  <line x1="552" y1="50" x2="586" y2="50" class="ln" stroke-width="2" marker-end="url(#c14a1)"/>
  <path d="M 650 84 C 650 120, 420 110, 345 128" class="ln" fill="none" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#c14a1)"/>
  <text x="520" y="118" text-anchor="middle" class="tx-m">결과를 다시 AI 에게(필요하면 반복, 최대 8번)</text>
  <line x1="342" y1="152" x2="396" y2="214" class="ln" stroke-width="2" marker-end="url(#c14a1)"/>
  <line x1="552" y1="225" x2="586" y2="225" class="ln" stroke-width="2" marker-end="url(#c14a1)"/>
</svg>`;

  const FIG_SAFE = `<svg viewBox="0 0 720 230" role="img" aria-label="AI 도우미가 할 수 있는 일과 하지 않는 일">
  <rect x="10" y="10" width="340" height="210" rx="14" class="p1s"/>
  <text x="180" y="40" text-anchor="middle" class="tx-b">✔ AI 도우미가 하는 일</text>
  <text x="30" y="72" class="tx">· 데이터 조회 (수주 · 재고 · MRP · 작업지시 …)</text>
  <text x="30" y="98" class="tx">· 요약 · 설명 · 비교</text>
  <text x="30" y="124" class="tx">· 어느 화면에서 무엇을 누를지 안내</text>
  <text x="30" y="150" class="tx">· 권고 (무엇을 먼저 하면 좋을지)</text>
  <text x="30" y="176" class="tx">· (AI 생산계획만) 계획 초안 작성</text>
  <rect x="370" y="10" width="340" height="210" rx="14" class="card-bg"/>
  <text x="540" y="40" text-anchor="middle" class="tx-b">✖ 하지 않는 일 (사람 · PLC 의 몫)</text>
  <text x="390" y="72" class="tx">· 설비 기동 · 정지 · 비상정지 해제</text>
  <text x="390" y="98" class="tx">· 로봇 움직이기</text>
  <text x="390" y="124" class="tx">· 생산계획 확정 · 생산 시작</text>
  <text x="390" y="150" class="tx">· 발주 · 입고 · 출고 등 데이터 변경</text>
  <text x="390" y="176" class="tx">· 조회하지 않은 숫자 지어내기</text>
  <text x="540" y="206" text-anchor="middle" class="tx-m">→ 그런 도구가 아예 주어지지 않습니다</text>
</svg>`;

  // ---------------------------------------------------------------- 실습 14-1
  const LAB_OPEN = `<div class="lab" data-lab="ch14-1-a">
  <div class="lab-head"><span class="lab-badge">실습 14-1</span><b>AI 도우미 열고 첫 질문하기</b><span class="lab-meta">⏱ 10분 · 화면: ERP</span></div>
  <p class="lab-goal">ERP 의 ✦ AI 도우미를 열어 각 부분의 역할을 익히고, 예시 질문의 답을 실제 화면과 비교합니다.</p>
  <p class="lab-pre">실습 프로그램 실행, ERP 에 예시 기준정보 · 수주가 들어 있는 상태(6차시)</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">ERP</span> → <span class="ui">▦ 개요</span> 를 열고 오른쪽 아래 <span class="ui">✦ AI 도우미</span> 를 누릅니다.</div>
      ${SHOT('ch14_erp_dock', 'ERP AI 도우미 열기')}
      <div class="lab-check">오른쪽에 「ERP AI 도우미」 창이 열립니다. 버튼은 <span class="ui">✕ 닫기</span> 로 바뀝니다. (운영 2분할 안에서는 도우미가 보이지 않습니다 — ERP 를 단독 창으로 엽니다.)</div></li>
    <li class="lab-step"><div class="lab-do">창의 각 부분을 찾습니다: 모드 배지(⚙ 규칙 기반 / ✦ Claude) · <span class="ui">🔑 키 설정</span> · 지난 대화 목록(＋ 새 대화) · 예시 질문 버튼 3개 · 입력칸 · <span class="ui">보내기</span> · 맨 아래 안내 문장.</div>
      <div class="lab-check">맨 아래 「AI 는 조회 · 설명 · 권고만 합니다. 확정 · 시작은 직접 하세요.」 — 도우미의 역할이 한 줄로 적혀 있습니다.</div></li>
    <li class="lab-step"><div class="lab-do">예시 버튼 <span class="prompt">미출고 수주와 납기 임박 알려줘</span> 를 누릅니다.</div>
      ${SHOT('ch14_erp_q_orders', '미출고 수주 질문의 답')}
      <div class="lab-check">수주 번호(SO-…) · 납기 · 품목별 잔량이 나옵니다. 답 아래에 <b>규칙 · 조회: 수주</b> — 이 답은 '수주' 도구로 조회한 데이터입니다.</div></li>
    <li class="lab-step"><div class="lab-do">도우미를 열어 둔 채 왼쪽 <span class="ui">₩ 영업 · 수주</span> 를 눌러 수주 목록과 비교합니다.</div>
      ${SHOT('erp_orders', 'ERP 영업 · 수주 화면')}
      <div class="lab-check">수주 번호 · 납기 · 잔량이 답과 같습니다. 다르면 그 사이 출고 등으로 데이터가 바뀌었는지 생각해 봅니다.</div></li>
    <li class="lab-step"><div class="lab-do">도우미 위쪽 <b>지난 대화</b> 목록을 펼칩니다.</div>
      ${SHOT('ch14_conv_list', '지난 대화 목록')}
      <div class="lab-check">방금 대화가 「시각 · 첫 질문」 으로 저장되어 있습니다. 대화는 플랫폼 DB 에 남고, 누가 무엇을 물었는지 감사 기록에도 남습니다. <b>＋ 새 대화</b> 를 고르면 새로 시작합니다.</div></li>
  </ol>
  <div class="lab-result">AI 도우미는 <b>질문 → 조회 도구 → 답</b> 으로 동작하며, 답 아래 "조회: …" 로 근거 데이터의 종류를 알려 줍니다. 답은 항상 해당 화면에서 확인합니다.</div>
</div>`;

  const LAB_ERP = `<div class="lab" data-lab="ch14-1-b">
  <div class="lab-head"><span class="lab-badge">실습 14-2</span><b>ERP 질문 세트</b><span class="lab-meta">⏱ 15분 · 화면: ERP</span></div>
  <p class="lab-goal">ERP 도우미에게 재고 · 자재 · 계획을 묻고, 답마다 <b>사용한 도구</b>와 <b>확인한 화면</b>을 활동지에 적습니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">＋ 새 대화</span> 에서 <span class="prompt">완제품 재고가 얼마나 있어?</span> 를 보냅니다.</div>
      ${SHOT('ch14_erp_q_inventory', '재고 질문의 답')}
      <div class="lab-check">품목별 재고(FG-BOX4-… 완제품, WP-RECT-… 공작물, PK-BOX 포장박스)가 나오고 아래에 <b>조회: 재고</b>. 규칙 모드는 완제품만 골라 주지는 않습니다 — 필요한 줄을 사람이 골라 읽습니다.</div></li>
    <li class="lab-step"><div class="lab-do">왼쪽 <span class="ui">▣ 재고</span> 를 열어 FG-BOX4-RED 의 수량을 답과 비교합니다.</div>
      <div class="lab-check">숫자가 같습니다. 활동지: 질문 / 도구 = 재고 / 화면 = ERP 재고 / 일치 ✔.</div></li>
    <li class="lab-step"><div class="lab-do">예시 버튼 <span class="prompt">자재 부족 품목은?</span> 을 누릅니다.</div>
      ${SHOT('erp_ai_answer', '자재 부족 질문의 답')}
      <div class="lab-check">부족 품목과 부족 수량 · 권장 발주량이 나오고 <b>조회: MRP</b>. <span class="ui">⛁ 자재(MRP) · 구매</span> 화면의 부족 표와 같은지 확인합니다.</div></li>
    <li class="lab-step"><div class="lab-do">예시 버튼 <span class="prompt">오늘 생산계획 상태는?</span> 을 누릅니다.</div>
      ${SHOT('ch14_erp_q_status', '생산계획 상태 질문의 답')}
      <div class="lab-check">규칙 모드에서는 '생산계획' 이라는 말에 맞는 규칙이 없어 <b>설비 상태 + ERP 요약</b>(미출고 수주 · 잔량 · 납기 임박 · 자재 부족)으로 답합니다(조회: 설비 상태, ERP 요약). 계획서 목록은 <span class="ui">▤ 생산계획 · 배정</span> 에서 직접 봅니다.</div>
      <div class="lab-tip">Claude 모드에서는 '생산계획서' 도구로 최근 계획서의 상태 · 배정까지 요약합니다. 모드에 따라 답의 깊이가 다릅니다.</div></li>
    <li class="lab-step"><div class="lab-do">직접 만든 질문 <span class="prompt">납기 임박한 수주의 잔량과 지금 완제품 재고를 같이 알려줘</span> 를 보냅니다.</div>
      <div class="lab-check">규칙 모드: '납기 · 잔량' → 수주, '재고' → 재고 규칙이 둘 다 걸려 <b>두 가지를 함께</b> 답합니다(조회: 재고, 수주). 두 숫자를 비교해 "재고로 바로 출고할 수 있는 수주" 가 있는지 사람이 판단합니다.</div></li>
  </ol>
  <div class="lab-result">ERP 도우미는 <b>재고 · MRP · 수주 · 작업지시 · ERP 요약 · 설비 상태 · 생산계획서</b>를 조회할 수 있습니다. 답의 근거 도구를 보고 같은 화면에서 숫자를 확인하는 것이 기본입니다.</div>
</div>`;

  const LAB_MES = `<div class="lab" data-lab="ch14-1-c">
  <div class="lab-head"><span class="lab-badge">실습 14-3</span><b>MES 질문 세트</b><span class="lab-meta">⏱ 15분 · 화면: MES · 대시보드</span></div>
  <p class="lab-goal">MES 도우미에게 설비 진행 · 작업지시 · 알람 · OEE 를 묻고 각 답을 MES 화면 · 대시보드와 비교합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do"><span class="ui">MES</span> → <span class="ui">▦ 디스패치 보드</span> 에서 <span class="ui">✦ AI 도우미</span> 를 열고 <span class="prompt">지금 설비별 진행 상황은?</span> 을 누릅니다.</div>
      ${SHOT('mes_ai_answer', '설비별 진행 상황 답')}
      <div class="lab-check">설비마다 상태(READY · RUNNING …) · 생산 색 · 작업지시 번호가 나오고 <b>조회: 설비 상태</b>. 디스패치 보드의 설비 칸과 같은지 봅니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="prompt">대기 중인 작업지시 순서 알려줘</span> 를 누릅니다.</div>
      ${SHOT('ch14_mes_q_queue', '대기 작업지시 답')}
      <div class="lab-check">진행 · 대기 작업지시 목록(번호 · 품목 · 실적/목표 · 설비)이 나오고 <b>조회: 작업지시</b>. 생산 중인 계획이 없으면 「진행 · 대기 작업지시 0건」 — 디스패치 보드도 모두 「비어 있음」 이면 정상입니다.</div></li>
    <li class="lab-step"><div class="lab-do">왼쪽 <span class="ui">🔧 정비 · 예지보전</span> 으로 가서 <span class="prompt">알람과 정비 오더 정리해줘</span> 를 누릅니다.</div>
      ${SHOT('ch14_mes_q_alarm', '알람과 정비 오더 답')}
      <div class="lab-check">규칙 모드는 <b>건수</b>(설비 알람 n건 · 정비 오더 n건 · 예지보전 알람 n건)만 알려 줍니다(조회: 알람 · 정비). 내용은 같은 화면의 예지보전 알람 · 정비 오더 표에서 읽습니다. Claude 모드는 설비별로 묶어 무엇이 급한지 정리해 줍니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">⚙ 설비 · 알람</span> 으로 가서 <span class="prompt">지금 OEE 와 가동률 알려줘</span> 를 보냅니다.</div>
      ${SHOT('ch14_mes_q_oee', 'OEE 질문의 답')}
      <div class="lab-check">OEE(가동 · 성능 · 품질)와 설비 상태가 함께 나옵니다(조회: OEE, 설비 상태). '가동률' 의 '가동' 이 설비 상태 규칙에도 걸리기 때문입니다.</div></li>
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">대시보드</span> 의 OEE 칸과 답의 OEE 를 비교합니다.</div>
      <div class="lab-check">같은 기준이면 숫자가 같습니다. 다르면 대시보드의 <b>시간 범위</b>(30분 · 1시간 · 4시간 · 8시간)가 달라서인지 확인합니다 — "언제부터의 숫자인가" 도 검증의 일부입니다.</div></li>
  </ol>
  <div class="lab-result">MES 도우미는 <b>설비 상태 · 작업지시 · 디스패치 · OEE · 알람 · 정비</b>를 조회합니다. ERP 도우미와 쓸 수 있는 도구가 다르므로, 묻는 내용에 맞는 화면의 도우미를 엽니다.</div>
</div>`;

  const LAB_KEY = `<div class="lab" data-lab="ch14-1-d">
  <div class="lab-head"><span class="lab-badge">실습 14-4</span><b>AI 키 설정과 모드 비교 (선택 · 교사 시연)</b><span class="lab-meta">⏱ 10분 · 화면: ERP AI 도우미 · AI 생산계획</span></div>
  <p class="lab-goal">API 키 파일을 등록해 Claude 모드로 바꾸고, 같은 질문을 두 모드로 비교한 뒤 키를 삭제합니다. <b>키가 없어도 강좌의 모든 실습은 규칙 기반으로 진행됩니다.</b></p>
  <p class="lab-pre">교사가 준비한 Anthropic API 키(유료 사용량이 발생할 수 있음). 키 원문이 화면 · 사진 · 녹화에 나오지 않게 합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">메모장에서 키 파일을 만듭니다. 내용은 세 형식 중 하나 — 키 한 줄 / <code>ANTHROPIC_API_KEY=…</code> 한 줄 / <code>{"api_key": "…"}</code>. 이름 예: <code>claude.key</code> (20KB 이하).</div>
      <div class="lab-check">파일은 교사 PC 의 개인 폴더에 두고, 공유 폴더 · USB · 메신저로 돌리지 않습니다.</div></li>
    <li class="lab-step"><div class="lab-do">ERP AI 도우미의 <span class="ui">🔑 키 설정</span> 을 누르고 <span class="ui">🔑 키 파일 올리기</span> 로 그 파일을 고릅니다.</div>
      ${SHOT('ch14_key_panel', '키 설정 패널')}
      <div class="lab-check">「키를 등록했습니다. 이제 이 PC 의 플랫폼 전체에서 Claude 를 씁니다.」 — 배지가 <b>✦ Claude · 모델 이름</b> 으로 바뀌고, 「등록된 키 sk-ant-…(가려진 일부)」 만 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">＋ 새 대화</span> 에서 규칙 모드 때와 같은 질문 <span class="prompt">자재 부족 품목은?</span> 을 보냅니다.</div>
      <div class="lab-check">답 아래가 <b>Claude · 조회: MRP</b> 로 바뀝니다. 같은 데이터를 조회하지만 우선순위 · 권장 조치까지 문장으로 정리해 줍니다. 숫자는 규칙 모드 답과 같아야 합니다.</div></li>
    <li class="lab-step"><div class="lab-do">규칙 모드가 못 하던 질문 <span class="prompt">가장 급한 수주부터 처리하려면 오늘 무엇을 먼저 해야 해?</span> 를 보냅니다.</div>
      <div class="lab-check">Claude 는 수주 · 재고 · MRP 를 여러 번 조회해 순서를 제안합니다(조회 도구가 여러 개 표시). 제안을 실행할지는 사람이 정합니다.</div></li>
    <li class="lab-step"><div class="lab-do">수업이 끝나면 <span class="ui">🔑 키 설정</span> → <span class="ui">키 삭제</span> → 확인 창 「등록된 AI 키를 이 PC 에서 삭제할까요?」 에서 확인을 누릅니다.</div>
      <div class="lab-check">「키를 삭제했습니다. 규칙 기반으로 동작합니다.」 — 배지가 다시 <b>⚙ 규칙 기반(키 없음)</b> 이 됩니다.</div></li>
  </ol>
  <div class="lab-result">키는 <b>PC 하나에 하나</b>, 올린 파일에서 키만 꺼내 <b>암호화</b>(Windows 사용자 계정으로만 풀림)해 <code>data\\ai_key.bin</code> 에 보관하며, 화면 · 로그에는 원문이 남지 않습니다. 키가 있으면 플랫폼 전체(AI 도우미 · AI 생산계획 · AI 로 분석하기 · AI 정비 권고)가 Claude 로 바뀝니다.</div>
</div>`;

  // ---------------------------------------------------------------- 실습 14-2
  const LAB_VERIFY = `<div class="lab" data-lab="ch14-2-a">
  <div class="lab-head"><span class="lab-badge">실습 14-5</span><b>답 검증 4단계</b><span class="lab-meta">⏱ 15분 · 화면: ERP · MES</span></div>
  <p class="lab-goal">AI 답을 그대로 믿지 않고 <b>출처 → 화면 대조 → 시점 → 판단</b> 4단계로 검증하는 습관을 만듭니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">활동지에 검증표를 만듭니다: <b>질문 / 답의 숫자 / 조회 도구 / 확인 화면 / 화면의 숫자 / 일치? / 다르면 이유</b>.</div>
      <div class="lab-check">7칸짜리 표가 준비되었습니다.</div></li>
    <li class="lab-step"><div class="lab-do">ERP 도우미에 <span class="prompt">미출고 수주 잔량 합계가 몇 박스야?</span> 를 보냅니다. 답 아래 <b>조회: …</b> 를 표에 적습니다(① 출처).</div>
      <div class="lab-check">규칙 모드는 수주별 잔량을 나열합니다(합계를 계산해 주지 않음) — 합계는 사람이 더합니다. 이것도 "답이 질문에 정확히 맞는가" 를 확인하는 일입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">▦ 개요</span> 의 <b>수주 잔량</b> 칸과 직접 더한 합계를 비교합니다(② 화면 대조).</div>
      <div class="lab-check">개요의 「수주 잔량 n박스」 와 같으면 ✔. 다르면 계산 실수인지, 데이터가 바뀌었는지 찾습니다.</div></li>
    <li class="lab-step"><div class="lab-do">공장이 돌아가는 중이라면 1~2분 뒤 같은 질문을 다시 보내 숫자가 바뀌는지 봅니다(③ 시점).</div>
      <div class="lab-check">출고 · 생산이 진행되면 잔량 · 재고가 바뀝니다. 답은 <b>물어본 순간</b>의 데이터입니다 — 보고서에는 시각을 함께 적습니다.</div></li>
    <li class="lab-step"><div class="lab-do">MES 도우미로 <span class="prompt">지금 설비별 진행 상황은?</span> 을 묻고, 공장 라인 화면의 상태 · 3D 모습과 비교한 뒤 표를 채웁니다.</div>
      <div class="lab-check">답의 상태와 라인 화면 · 디스패치 보드가 같은지 확인했습니다.</div></li>
    <li class="lab-step"><div class="lab-do">표를 보고 "이 답으로 내가 할 행동" 을 한 줄 적습니다(④ 판단). 예: "레드 잔량 15 → 계획서에 레드 15 추가".</div>
      <div class="lab-check">행동은 AI 가 아니라 <b>내가</b> 화면에서 합니다.</div></li>
  </ol>
  <div class="lab-result">검증 4단계 — <b>① 어떤 도구로 조회했나 ② 화면 숫자와 같은가 ③ 언제의 숫자인가 ④ 행동은 내가 정한다</b>. AI 가 똑똑해질수록 이 습관이 더 중요해집니다.</div>
</div>`;

  const LAB_TRAP = `<div class="lab" data-lab="ch14-2-b">
  <div class="lab-head"><span class="lab-badge">실습 14-6</span><b>AI 가 하지 않는 일 — 함정 요청</b><span class="lab-meta">⏱ 10분 · 화면: MES · ERP · 공장 라인</span></div>
  <p class="lab-goal">AI 도우미에게 설비 기동 · 계획 확정 같은 <b>행동</b>을 시켜 보고, 실제로 아무것도 바뀌지 않는 것을 확인합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MES 도우미에 <span class="prompt">설비 1번 지금 기동해 줘</span> 를 보냅니다.</div>
      ${SHOT('ch14_trap_start', '설비 기동 요청에 대한 답')}
      <div class="lab-check">규칙 모드는 '설비' 라는 말에 맞춰 <b>설비 상태만 보여 줍니다</b>(조회: 설비 상태). 기동하는 도구가 없기 때문입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">공장 라인</span> 에서 설비 #1 상태를 확인합니다.</div>
      <div class="lab-check">상태가 그대로입니다(예: READY). 기동은 라인 화면의 <span class="ui">기동</span> → 확인 창을 거쳐 <b>사람이</b> 합니다(5차시).</div></li>
    <li class="lab-step"><div class="lab-do">ERP → <span class="ui">▤ 생산계획 · 배정</span> 에서 도우미에 <span class="prompt">가장 최근 생산계획 확정하고 생산 시작해 줘</span> 를 보냅니다.</div>
      ${SHOT('ch14_trap_confirm', '계획 확정 요청에 대한 답')}
      <div class="lab-check">설비 상태 · ERP 요약만 답합니다. 왼쪽 목록의 최근 계획서는 여전히 <b>✎ 작성</b> 상태입니다.</div></li>
    <li class="lab-step"><div class="lab-do">(교사 시연 · Claude 모드) 같은 두 요청과 <span class="prompt">비상정지 해제해 줘</span> 를 보냅니다.</div>
      <div class="lab-check">Claude 는 "확정 · 시작 · 기동 · 정지는 사람이 화면에서 합니다" 처럼 <b>거절하고 어느 화면에서 무엇을 누를지 안내</b>합니다. 비상정지는 현장에서 원인을 없앤 뒤 사람이 복구한다고 설명합니다.</div></li>
    <li class="lab-step"><div class="lab-do">활동지에 "AI 가 하지 않는 일" 다섯 가지를 적고, 각각 <b>누가 · 어느 화면에서</b> 하는지 옆에 씁니다.</div>
      <div class="lab-check">예) 설비 기동 → 작업자 · 공장 라인 기동 / 계획 확정 · 생산 시작 → 계획 담당 · ERP 생산계획 / 비상정지 복구 → 현장 작업자 · 원인 제거 후 리셋 / 발주 · 입고 → 구매 담당 · ERP 자재 / 로봇 이동 → 티치 팬던트(웹에서는 불가).</div></li>
  </ol>
  <div class="lab-result">AI 도우미에게는 <b>조회 도구만</b> 있습니다. 말로 아무리 시켜도 설비 · 계획 · 재고가 바뀌지 않도록 <b>구조로</b> 막혀 있습니다 — 안전한 피지컬 AI 의 설계 원칙(3차시)입니다.</div>
</div>`;

  const LAB_PROMPT = `<div class="lab" data-lab="ch14-2-c">
  <div class="lab-head"><span class="lab-badge">실습 14-7</span><b>좋은 질문으로 고쳐 쓰기 · 교대 메모 만들기</b><span class="lab-meta">⏱ 15분 · 화면: ERP · MES AI 도우미</span></div>
  <p class="lab-goal">나쁜 질문과 좋은 질문의 답을 비교하고, 검증한 답으로 <b>교대 인수인계 메모</b>를 완성합니다.</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">MES 도우미에 막연한 질문 <span class="prompt">어때?</span> 를 보냅니다.</div>
      <div class="lab-check">규칙 모드는 맞는 규칙이 없으면 <b>설비 상태</b>로 답합니다. 내가 원한 게 이것이었는지 알 수 없습니다.</div></li>
    <li class="lab-step"><div class="lab-do">고쳐 쓴 질문 <span class="prompt">설비별 진행 상황과 대기 중인 작업지시를 알려줘</span> 를 보냅니다.</div>
      <div class="lab-check">설비 상태와 작업지시가 함께 나옵니다(조회: 작업지시, 설비 상태). <b>무엇을 · 어디의</b> 를 넣으면 답이 정확해집니다.</div></li>
    <li class="lab-step"><div class="lab-do">ERP 도우미에 <span class="prompt">재고 많아?</span> 와 <span class="prompt">레드 완제품 재고가 레드 수주 잔량보다 많은지 알려줘</span> 를 차례로 보냅니다.</div>
      <div class="lab-check">두 번째 질문에는 재고 · 수주가 함께 조회됩니다. 규칙 모드는 비교 판단을 하지 않으므로 두 숫자를 보고 <b>사람이</b> 판단합니다(Claude 모드는 비교 결과까지 문장으로 답함).</div></li>
    <li class="lab-step"><div class="lab-do">교대 메모 양식을 만듭니다: <b>시각 / 설비 상태 / 진행 · 대기 작업지시 / OEE / 알람 · 정비 / 미출고 수주 · 납기 임박 / 자재 부족 / 다음 근무자에게</b>.</div>
      <div class="lab-check">8칸 양식이 준비되었습니다.</div></li>
    <li class="lab-step"><div class="lab-do">MES · ERP 도우미에 필요한 질문을 보내 칸을 채우고, 각 숫자 옆에 확인한 화면 이름을 적습니다.</div>
      <div class="lab-check">모든 칸에 숫자 + 확인 화면이 적혀 있습니다. 검증하지 못한 숫자는 "미확인" 으로 표시합니다.</div></li>
    <li class="lab-step"><div class="lab-do">'다음 근무자에게' 칸은 AI 답을 참고해 <b>내 말로</b> 2~3줄 씁니다. (Claude 모드라면 <span class="prompt">위 내용을 교대 인수인계 메모 5줄로 정리해 줘</span> 로 초안을 받은 뒤 고칩니다.)</div>
      <div class="lab-check">메모의 책임자는 AI 가 아니라 작성한 사람입니다. 이름 · 시각을 적고 마칩니다.</div></li>
  </ol>
  <div class="lab-result">좋은 질문은 <b>대상(설비 · 품목) · 범위(지금 · 오늘) · 원하는 형태(비교 · 목록 · 요약)</b>를 담습니다. AI 는 메모 작성을 빠르게 도와주지만, 숫자 검증과 최종 문장은 사람의 몫입니다.</div>
</div>`;

  const QUIZ1 = [
    { q: 'AI 도우미의 답 아래 「규칙 · 조회: MRP」 가 뜻하는 것은?',
      options: ['MRP 화면이 고장 났다', '규칙 기반 모드로, MRP 도구로 조회한 데이터를 근거로 답했다', 'Claude 가 답을 지어냈다', 'MRP 를 다시 계산하라는 명령'],
      answer: 1, explain: '앞부분은 모드(규칙 / Claude), 뒤는 이번 답에서 사용한 조회 도구입니다. 그 도구에 해당하는 화면에서 숫자를 확인합니다.' },
    { q: 'MES AI 도우미가 조회할 수 <b>없는</b> 것은?',
      options: ['작업지시', 'OEE', '알람 · 정비', 'MRP(자재 소요)'],
      answer: 3, explain: 'MRP · 재고 · 수주는 ERP 도우미의 도구입니다. MES 도우미는 설비 상태 · 작업지시 · 디스패치 · OEE · 알람 · 정비를 조회합니다.' },
    { q: 'AI 키에 대한 설명으로 옳은 것은?',
      options: ['학생마다 각자 키를 올려야 한다', '키는 PC 하나에 하나, 암호화해 보관하며 화면에는 가려진 일부만 보인다', '키를 올리면 저장소에 함께 커밋된다', '키가 없으면 AI 기능을 전혀 쓸 수 없다'],
      answer: 1, explain: '키가 없으면 규칙 기반으로 같은 기능이 동작합니다. 키는 PC 하나에 하나, 암호화(data\\ai_key.bin)되고 원문은 어디에도 남지 않습니다.' },
    { q: '운영 2분할(ERP + MES) 화면에서 ✦ AI 도우미 버튼이 보이지 않습니다. 왜일까요?',
      options: ['키가 없어서', 'AI 도우미는 ERP · MES 를 단독 창으로 열었을 때만 나타나기 때문', '2분할에서는 AI 가 꺼지기 때문', '오류이므로 다시 설치해야 한다'],
      answer: 1, explain: '2분할 안의 각 칸에서는 도우미를 숨깁니다. 위 메뉴에서 ERP 또는 MES 를 단독으로 엽니다.' },
  ];
  const QUIZ2 = [
    { q: 'AI 답 검증 4단계의 순서로 알맞은 것은?',
      options: ['판단 → 출처 → 시점 → 화면', '출처(조회 도구) → 화면 대조 → 시점 → 사람의 판단', '화면 → AI → 판단 → 출처', 'AI 에게 다시 묻기만 반복'],
      answer: 1, explain: '어떤 도구로 조회했는지 보고, 해당 화면 숫자와 비교하고, 언제의 숫자인지 확인한 뒤, 행동은 사람이 정합니다.' },
    { q: 'MES 도우미에 「설비 1번 지금 기동해 줘」 라고 보냈을 때 실제로 일어나는 일은?',
      options: ['설비 1번이 기동된다', '설비 상태만 답하거나(규칙) 사람이 화면에서 하라고 안내(Claude)하며, 설비는 그대로다', '모든 설비가 정지한다', '계획서가 확정된다'],
      answer: 1, explain: 'AI 도우미에는 기동 · 정지 도구가 없습니다. 기동은 공장 라인의 기동 → 확인 창으로 사람이 합니다.' },
    { q: '다음 중 가장 좋은 질문은?',
      options: ['어때?', '재고 많아?', '레드 완제품 재고가 레드 수주 잔량보다 많은지 알려줘', '다 알려줘'],
      answer: 2, explain: '대상(레드 완제품 · 레드 수주) · 원하는 형태(비교)가 들어 있어 필요한 도구와 답이 분명해집니다.' },
    { q: 'Claude 모드에서 대화 내용과 조회한 데이터는 어디로 전달될까요?',
      options: ['어디에도 전달되지 않는다', '답을 만들기 위해 Anthropic API(외부 서비스)로 전송되므로, 개인정보 · 비밀 정보는 질문에 넣지 않는다', '학교 홈페이지에 공개된다', 'PLC 로 전송된다'],
      answer: 1, explain: '규칙 기반은 외부 호출이 없지만, Claude 모드는 질문과 조회 결과를 API 로 보냅니다. 민감한 정보는 넣지 않습니다.' },
  ];

  PY_COURSE.addChapter({
    id: 'ch14', no: '14', title: 'AI 도우미와 AI 키', subtitle: 'AI Assistant & LLM Agent',
    summary: 'ERP · MES 의 AI 도우미에게 묻고 답을 화면에서 검증하며, AI 키 설정과 규칙 기반 · Claude 의 차이, AI 가 하지 않는 일을 직접 확인합니다.',
    goals: ['AI 도우미가 질문 → 조회 도구 → 답으로 동작함을 설명하고 ERP · MES 도우미를 구분해 쓸 수 있다',
      'AI 답의 근거 도구를 보고 해당 화면에서 숫자를 검증할 수 있다',
      'AI 키 설정 · 삭제와 두 모드의 차이, AI 가 하지 않는 일과 안전 원칙을 설명할 수 있다'],
    sections: [
      {
        id: 'ch14-1', title: 'AI 도우미 사용하기', minutes: 50,
        goals: ['ERP · MES AI 도우미 창의 구성과 사용법을 익힌다', '채널별 조회 도구를 알고 질문 세트로 답을 확인한다', 'AI 키 설정과 규칙 기반 · Claude 모드의 차이를 이해한다'],
        flow: [['도입 — 묻는 것도 기술', 5], ['개념 — 도우미의 동작 · 도구', 8], ['실습 14-1 첫 질문', 8], ['실습 14-2 ERP 질문', 12], ['실습 14-3 MES 질문', 12], ['실습 14-4 키(시연) · 정리', 5]],
        content: [
          { type: 'p', html: '공장에서 "지금 자재 부족한 거 있어?", "설비별로 어디까지 했어?" 같은 질문은 하루에도 수십 번 나옵니다. 답을 찾으려면 ERP · MES 의 여러 화면을 오가야 합니다. 이 플랫폼의 <b>✦ AI 도우미</b>는 말로 물으면 ERP · MES 데이터를 <b>직접 조회해서</b> 답해 줍니다. 대규모 언어 모델(LLM)이 도구를 써서 일하는 <b>AI 에이전트</b>의 기본 형태입니다.' },
          { type: 'figure', html: SHOT('ch14_erp_dock', 'ERP AI 도우미'), caption: 'ERP · MES 화면 오른쪽 아래 ✦ AI 도우미 — 단독 창에서만 보입니다' },
          { type: 'h', text: 'AI 도우미는 어떻게 답할까?' },
          { type: 'figure', html: FIG_LOOP, caption: '질문 → AI 가 필요한 조회 도구를 고름 → 서버가 실제 데이터를 돌려줌 → 그 숫자로 답 → 사람이 확인' },
          { type: 'p', html: 'AI 는 공장 데이터를 외우고 있지 않습니다. 질문마다 <b>조회 도구</b>를 불러 ERP · MES 의 지금 데이터를 받아 오고, <b>받아 온 숫자만</b> 써서 답하도록 지시되어 있습니다. 답 아래 작은 글씨 <b>"규칙 · 조회: 재고"</b> 처럼 모드와 사용한 도구가 표시되므로, 어느 화면에서 확인하면 되는지 바로 알 수 있습니다.' },
          { type: 'table', head: ['도구(화면 표시 이름)', 'ERP 도우미', 'MES 도우미', 'AI 생산계획'], rows: [
            ['제품 목록 · 설비 상태 · 생산계획서', '✔', '✔', '✔'],
            ['ERP 요약 · 수주 · 재고 · MRP', '✔', '', '✔'],
            ['작업지시', '✔', '✔', '✔'],
            ['디스패치 · OEE · 알람 · 정비', '', '✔', ''],
            ['계획 초안 작성 · 설비 재배정', '', '', '✔ (초안까지만)'],
            ['기동 · 정지 · 확정 · 생산 시작 · 발주 · 입고', '✖ 없음', '✖ 없음', '✖ 없음'],
          ], caption: '화면(채널)마다 쓸 수 있는 도구가 다릅니다. 다른 화면의 도구를 부르면 서버가 거절합니다.' },
          { type: 'h', text: '규칙 기반 모드와 Claude 모드' },
          { type: 'table', head: ['', '⚙ 규칙 기반(키 없음)', '✦ Claude(키 등록)'], rows: [
            ['질문 이해', '정해진 낱말로 도구를 고름 — 재고 → 재고 · 자재/부족/발주/MRP → MRP · 수주/주문/납기/잔량 → 수주 · 작업지시/실적/진행 → 작업지시 · 알람/정비/고장/보전 → 알람 · 정비 · OEE/가동률 → OEE · 설비/라인/상태/가동 또는 해당 없음 → 설비 상태', '질문의 뜻을 이해해 필요한 도구를 여러 번 골라 부름(최대 8번)'],
            ['답의 모양', '조회 결과를 정해진 형식으로 나열(건수 · 목록)', '요약 · 비교 · 우선순위 · 권고를 문장으로'],
            ['대화 맥락', '한 질문씩 따로', '앞의 대화를 기억(최근 20개)'],
            ['외부 연결', '없음', 'Anthropic API(인터넷 · 사용량 요금)'],
            ['실패하면', '—', '「⚠ Claude 호출 실패(…) — 규칙 기반으로 답합니다」 로 자동 대체'],
            ['공통', '조회 · 설명 · 권고만, 숫자는 조회한 값만, 대화는 DB · 감사 기록에 남음', '같음'],
          ] },
          { type: 'h', text: 'AI 키 — 등록 · 보관 · 삭제' },
          { type: 'list', items: [
            '<b>어디서</b>: AI 도우미의 <span class="ui">🔑 키 설정</span> 또는 AI 생산계획 화면 위쪽 → <span class="ui">🔑 키 파일 올리기</span>.',
            '<b>파일 형식</b>: 키 한 줄 / <code>ANTHROPIC_API_KEY=…</code> 줄 / <code>{"api_key": "…"}</code> (20KB 이하).',
            '<b>보관</b>: PC 하나에 하나. 키만 꺼내 Windows 사용자 계정으로 암호화해 <code>data\\ai_key.bin</code> 에 저장 — 다른 계정 · 다른 PC 에서는 풀 수 없습니다. 화면에는 가려진 일부만, 로그 · 저장소에는 원문이 남지 않습니다.',
            '<b>적용 범위</b>: 등록하면 그 PC 의 플랫폼 전체(AI 도우미 · AI 생산계획 · AI 로 분석하기 · AI 정비 권고)가 Claude 로 동작합니다.',
            '<b>삭제</b>: <span class="ui">키 삭제</span> → 확인. 등록 · 삭제는 감사 기록에 남습니다.',
            '<b>규칙 고정</b>: 설정 파일(.env)에 <code>LLM_PROVIDER=rules</code> 가 있으면 키가 있어도 규칙 기반으로 동작합니다(화면에 안내 표시).',
          ] },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_OPEN },
          { type: 'figure', html: LAB_ERP },
          { type: 'figure', html: LAB_MES },
          { type: 'figure', html: LAB_KEY },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: ERP 예시 기준정보 · 수주(6차시)가 있어야 답에 숫자가 나옵니다. 생산을 하나 돌려 두면 MES 질문(작업지시 · OEE)의 답이 풍부해집니다.</li><li><b>키 관리</b>: 실습 14-4 는 교사 PC 에서만 시연합니다. 학생 PC 에 키를 올리지 않습니다. 화면 공유 · 녹화 중에는 키 파일을 열지 않고, 수업 후 반드시 <b>키 삭제</b>합니다. Claude 모드는 사용량 요금이 발생할 수 있습니다.</li><li><b>오개념</b>: "AI 가 데이터를 다 알고 있다" → 매번 도구로 조회합니다. "규칙 모드는 가짜 AI" → 규칙 기반도 같은 도구 · 같은 데이터로 답하는 정직한 대체 모드입니다.</li><li><b>자주 막히는 곳</b>: 도우미 버튼이 없음 → 2분할 안이 아닌지 확인. 답이 비어 있음 → 데이터(수주 · 작업지시)가 없는 상태.</li><li><b>확인 기준</b>: 실습 14-2 · 14-3 활동지(질문 · 도구 · 확인 화면 · 일치) 각 4줄 이상.</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ1,
        slides: [
          { layout: 'title', title: 'AI 도우미 사용하기', subtitle: '말로 묻고, 도구로 조회하고, 화면에서 확인', notes: '<p>도입 발문: "자재 부족 품목을 찾으려면 어느 화면을 몇 번 눌러야 하나요?" → ERP 자재(MRP). 오늘은 말로 물어봅니다.</p>' },
          { layout: 'diagram', title: 'ERP AI 도우미', html: SHOT('ch14_erp_dock', 'ERP AI 도우미'),
            notes: '<p>모드 배지 · 키 설정 · 지난 대화 · 예시 버튼 · 입력칸 · 맨 아래 안내 문장을 차례로 가리킵니다.</p>' },
          { layout: 'diagram', title: 'AI 도우미의 동작', html: FIG_LOOP,
            notes: '<p>핵심: AI 는 데이터를 외우지 않고 <b>매번 조회</b>합니다. "조회: …" 표시가 근거입니다.</p>' },
          { layout: 'table', title: '화면별 조회 도구', head: ['도구', 'ERP', 'MES'], rows: [['ERP 요약 · 수주 · 재고 · MRP', '✔', ''], ['작업지시 · 설비 상태 · 생산계획서', '✔', '✔ (생산계획서 · 설비 상태 공통)'], ['디스패치 · OEE · 알람 · 정비', '', '✔'], ['기동 · 확정 · 발주 …', '✖', '✖']],
            notes: '<p>💬 "OEE 를 묻고 싶다면 어느 도우미?" → MES.</p>' },
          { layout: 'diagram', title: '실습 14-1 · 첫 질문', html: SHOT('ch14_erp_q_orders', '미출고 수주 답'),
            notes: '<p>답 아래 "규칙 · 조회: 수주" 를 가리키고 영업 · 수주 화면과 비교하게 합니다.</p>' },
          { layout: 'bullets', title: '실습 14-2 · ERP 질문 세트', bullets: ['완제품 재고가 얼마나 있어? → 재고', '자재 부족 품목은? → MRP', '오늘 생산계획 상태는? → 설비 상태 + ERP 요약', '납기 임박 수주 잔량과 재고 같이 → 수주 + 재고', '활동지: 질문 · 도구 · 화면 · 일치'],
            notes: '<p>12분. 규칙 모드에서 "생산계획" 질문의 답이 기대와 다른 이유(맞는 규칙 없음)를 짚습니다.</p>' },
          { layout: 'bullets', title: '실습 14-3 · MES 질문 세트', bullets: ['지금 설비별 진행 상황은?', '대기 중인 작업지시 순서 알려줘', '알람과 정비 오더 정리해줘', '지금 OEE 와 가동률 알려줘', '대시보드 OEE 와 비교(시간 범위!)'],
            notes: '<p>12분. 숫자가 다르면 시간 범위 · 시점 차이를 찾게 합니다.</p>' },
          { layout: 'two', title: '규칙 기반 vs Claude', left: { title: '⚙ 규칙 기반', bullets: ['낱말로 도구 선택', '정해진 형식 · 나열', '외부 호출 없음'] }, right: { title: '✦ Claude', bullets: ['뜻을 이해 · 여러 도구', '요약 · 비교 · 권고', 'API 키 · 인터넷 · 요금'] },
            notes: '<p>공통: 조회 · 설명 · 권고만, 숫자는 조회한 값만.</p>' },
          { layout: 'diagram', title: '실습 14-4 · AI 키 (교사 시연)', html: SHOT('ch14_key_panel', '키 설정 패널'),
            notes: '<p>키 원문이 화면에 나오지 않게 미리 준비한 파일로 시연. 같은 질문을 두 모드로 비교하고, 수업 후 키 삭제를 보여 줍니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ1[1].q, options: QUIZ1[1].options, answer: QUIZ1[1].answer, explain: QUIZ1[1].explain, notes: '<p>MRP 는 ERP 도우미 — 화면에 맞는 도우미를 여는 습관.</p>' },
          { layout: 'summary', title: '정리', bullets: ['AI 도우미 = 질문 → 조회 도구 → 답', '"조회: …" 로 근거 확인, 화면에서 대조', 'ERP · MES 도우미는 도구가 다르다', '키: PC 하나 · 암호화 · 수업 후 삭제'],
            notes: '<p>다음 시간: 답 검증 · 함정 요청 · 좋은 질문.</p>' },
        ],
      },
      {
        id: 'ch14-2', title: '답 검증과 좋은 질문', minutes: 50,
        goals: ['답 검증 4단계를 적용한다', 'AI 가 하지 않는 일을 함정 요청으로 확인하고 이유를 설명한다', '좋은 질문으로 고쳐 쓰고 검증한 답으로 교대 메모를 만든다'],
        flow: [['도입 — AI 는 틀릴 수 있다', 5], ['개념 — 검증 · 한계 · 안전', 8], ['실습 14-5 검증 4단계', 14], ['실습 14-6 함정 요청', 10], ['실습 14-7 질문 · 메모', 10], ['정리 · 퀴즈', 3]],
        content: [
          { type: 'p', html: 'AI 도우미가 편리할수록 "AI 가 그렇다던데" 로 끝나기 쉽습니다. 하지만 LLM 은 질문을 잘못 이해하거나, 오래된 숫자를 말하거나, 그럴듯한 숫자를 지어낼(환각) 수 있습니다. 이 플랫폼은 <b>조회한 숫자만 쓰게</b> 하고 <b>조회 도구를 표시</b>해 위험을 줄였지만, 마지막 확인은 사람이 합니다.' },
          { type: 'h', text: '답 검증 4단계' },
          { type: 'table', head: ['단계', '질문', '어디서 보나'], rows: [
            ['① 출처', '어떤 도구로 조회했나?', '답 아래 "조회: …"'],
            ['② 화면 대조', '그 화면의 숫자와 같은가?', 'ERP · MES · 대시보드의 해당 화면'],
            ['③ 시점', '언제의 숫자인가? 그 뒤에 바뀌었나?', '대화 시각, 대시보드 시간 범위'],
            ['④ 판단', '이 답으로 무엇을 할까? 누가 할까?', '행동은 사람이 화면에서'],
          ] },
          { type: 'h', text: 'AI 도우미가 하지 않는 일' },
          { type: 'figure', html: FIG_SAFE, caption: '하지 않는 일은 "하지 말라" 는 지시만이 아니라 그런 도구가 아예 없도록 구조로 막혀 있습니다' },
          { type: 'h', text: '좋은 질문 · 나쁜 질문' },
          { type: 'table', head: ['나쁜 질문', '문제', '좋은 질문'], rows: [
            ['어때?', '대상 · 범위가 없음', '설비별 진행 상황과 대기 중인 작업지시를 알려줘'],
            ['재고 많아?', '어느 품목 · 무엇과 비교?', '레드 완제품 재고가 레드 수주 잔량보다 많은지 알려줘'],
            ['그거 언제 끝나?', '"그거" 가 무엇인지 모름', 'PS-000012 계획의 예상 완료 시간 알려줘 (Claude 모드)'],
            ['다 알려줘', '너무 넓어 요점이 없음', '미출고 수주 중 납기 2일 이내인 것과 잔량만'],
            ['설비 1번 켜 줘', 'AI 가 할 수 없는 행동', '설비 1번을 기동하려면 어느 화면에서 무엇을 눌러?'],
          ], caption: '좋은 질문 = 대상(설비 · 품목 · 문서 번호) + 범위(지금 · 오늘 · 납기 2일) + 원하는 형태(목록 · 비교 · 요약)' },
          { type: 'h', text: '실습' },
          { type: 'figure', html: LAB_VERIFY },
          { type: 'figure', html: LAB_TRAP },
          { type: 'figure', html: LAB_PROMPT },
          { type: 'callout', kind: 'warn', title: 'AI 를 쓸 때의 주의', html: '<ul><li><b>정보 보호</b>: Claude 모드는 질문과 조회 결과를 외부 API 로 보냅니다. 이름 · 연락처 · 회사 기밀은 질문에 넣지 않습니다.</li><li><b>키 보호</b>: 키는 비밀번호와 같습니다. 화면 · 사진 · 메신저에 올리지 않고, 공용 PC 에서는 수업 후 삭제합니다.</li><li><b>기록</b>: 대화는 DB 에, 질문 내용은 감사 기록에 남습니다. 장난 질문도 기록됩니다.</li><li><b>안전</b>: 비상정지 · 인터락 · 로봇 동작에 관한 판단을 AI 에게 맡기지 않습니다. AI 는 권고, 결정은 사람과 PLC 입니다.</li></ul>' },
          { type: 'callout', kind: 'tip', teacher: true, title: '🧑‍🏫 지도 포인트', html: '<ul><li><b>수업 준비</b>: 실습 14-5 ④ 의 시점 비교는 공장이 돌아가야 의미가 있습니다. 작은 생산계획 하나를 시작해 두고 수업합니다(13차시).</li><li><b>함정 요청</b>: 규칙 모드에서는 "거절" 대신 상태만 답하므로, 학생이 "AI 가 무시했다" 고 느낄 수 있습니다. 화면에서 아무것도 바뀌지 않은 것을 확인시키고, Claude 모드의 명시적 거절을 교사가 시연합니다.</li><li><b>발문</b>: "AI 가 설비를 켤 수 있다면 어떤 사고가 날 수 있을까요?" → 사람이 장비 안에 있을 때 기동, 잘못된 색 생산, 자재 낭비.</li><li><b>평가</b>: 검증표(실습 14-5) 완성도, 함정 요청 표(누가 · 어느 화면), 교대 메모(숫자 + 확인 화면 + 작성자 · 시각).</li></ul>' },
        ],
        practice: [],
        quiz: QUIZ2,
        slides: [
          { layout: 'title', title: '답 검증과 좋은 질문', subtitle: 'AI 를 믿되, 확인하고, 결정은 사람이', notes: '<p>도입: AI 가 틀린 숫자를 말해 잘못 발주한 가상 사례를 들려줍니다.</p>' },
          { layout: 'table', title: '답 검증 4단계', head: ['단계', '확인'], rows: [['① 출처', '조회: …'], ['② 화면 대조', '해당 화면 숫자'], ['③ 시점', '언제의 숫자?'], ['④ 판단', '행동은 사람이']],
            notes: '<p>4단계를 판서해 두고 실습 14-5 내내 가리킵니다.</p>' },
          { layout: 'bullets', title: '실습 14-5 · 검증표', bullets: ['미출고 수주 잔량 합계 → 개요와 비교', '1~2분 뒤 다시 → 시점', '설비별 진행 → 라인 · 디스패치와 비교', '내가 할 행동 한 줄'],
            notes: '<p>14분. 규칙 모드가 합계를 계산해 주지 않는 것도 "질문과 답이 맞는가" 검증 포인트.</p>' },
          { layout: 'diagram', title: 'AI 도우미가 하지 않는 일', html: FIG_SAFE,
            notes: '<p>"하지 마" 라는 지시만이 아니라 도구가 없다는 것 — 구조적 안전.</p>' },
          { layout: 'diagram', title: '실습 14-6 · 함정 요청', html: SHOT('ch14_trap_start', '기동 요청 답'),
            notes: '<p>요청 후 공장 라인에서 상태가 그대로인지 확인. 교사는 Claude 모드 거절을 시연.</p>' },
          { layout: 'diagram', title: '확정 요청도 마찬가지', html: SHOT('ch14_trap_confirm', '확정 요청 답'),
            notes: '<p>목록의 계획서가 여전히 ✎ 작성인 것을 가리킵니다.</p>' },
          { layout: 'table', title: '좋은 질문으로 고쳐 쓰기', head: ['나쁜 질문', '좋은 질문'], rows: [['어때?', '설비별 진행 상황과 대기 작업지시'], ['재고 많아?', '레드 완제품 재고 vs 레드 수주 잔량'], ['다 알려줘', '납기 2일 이내 수주와 잔량만'], ['설비 1번 켜 줘', '기동하려면 어느 화면에서?']],
            notes: '<p>대상 + 범위 + 형태. 모둠별로 나쁜 질문 하나씩 만들어 서로 고쳐 주기.</p>' },
          { layout: 'bullets', title: '실습 14-7 · 교대 메모', bullets: ['8칸 양식', 'AI 에게 묻고 숫자 + 확인 화면', '미확인은 "미확인"', '다음 근무자에게 — 내 말로', '작성자 · 시각'],
            notes: '<p>메모의 책임자는 사람이라는 점을 강조합니다.</p>' },
          { layout: 'quiz', title: '확인 문제', q: QUIZ2[3].q, options: QUIZ2[3].options, answer: QUIZ2[3].answer, explain: QUIZ2[3].explain, notes: '<p>정보 보호 · 키 보호를 함께 정리합니다.</p>' },
          { layout: 'summary', title: '정리', bullets: ['검증 4단계: 출처 · 화면 · 시점 · 판단', 'AI 에게는 조회 도구만 — 행동은 사람', '좋은 질문 = 대상 + 범위 + 형태', '정보 · 키 보호, 대화는 기록된다'],
            notes: '<p>다음 차시부터 사례 실습 — 지금까지 배운 AI 기능을 사례 속에서 함께 씁니다.</p>' },
        ],
      },
    ],
  });
})();
