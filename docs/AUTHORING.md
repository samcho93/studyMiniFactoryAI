# 이 강좌의 작성 규칙 (LESSON_GUIDE.md 보다 우선)

이 강좌는 **스마트 미니팩토리 통합 플랫폼(miniPythicalAI) 사용법** 강좌입니다. **코드를 가르치지 않습니다.**
학습자는 실습 프로그램을 옆에 띄워 놓고 **단계별로 따라 하며** 제조 AI · 피지컬 AI 를 익힙니다.

- 저장소는 비공개(실행본은 강사가 배포). 온라인 체험판(설비 1대 · 기본 기능): https://samcho93.github.io/miniPythicalAI/
  레슨에 비공개 저장소 링크를 넣지 않습니다. 실습은 **로컬 실행본(run.bat)** 기준입니다.
- 레슨 파일 형식은 [LESSON_GUIDE.md](LESSON_GUIDE.md)(`PY_COURSE.addChapter`)를 따르되 다음을 지킵니다.

## 1. 쓰지 않는 것

- `type: 'code'` 블록, `practice` 배열(코드 실습), 슬라이드 `layout: 'code'` · `'practice'` · `'demo'` — **모두 쓰지 않습니다.**
  (`practice: []` 로 두거나 생략). 실습은 아래 **단계별 실습 블록**으로만 만듭니다.
- 파이썬 · 수식 계산 위주의 설명. 개념은 그림(SVG) · 표 · 화면 캡처로 설명합니다.

## 2. 단계별 실습 블록 (가장 중요)

`figure` 블록의 `html` 에 넣습니다. 화면에서 단계마다 ☑ 완료 체크 · 진행률 · 저장이 자동으로 붙습니다(js/custom.js).

```js
{ type: 'figure', html: `<div class="lab" data-lab="ch06-1-a">
  <div class="lab-head"><span class="lab-badge">실습 6-1</span><b>예시 기준정보 가져오기</b><span class="lab-meta">⏱ 10분 · 화면: ERP</span></div>
  <p class="lab-goal">예시 파일로 품목 · BOM · 거래처 · 기초 재고를 검증한 뒤 적용합니다.</p>
  <p class="lab-pre">실습 프로그램 실행(run.bat), ERP 화면</p>
  <ol class="lab-steps">
    <li class="lab-step"><div class="lab-do">위 메뉴 <span class="ui">ERP</span> → 왼쪽 <span class="ui">⇩ 데이터 가져오기</span> 를 엽니다.</div>
      <img class="shot" src="assets/shots/erp_data.jpg" alt="ERP 데이터 가져오기 화면">
      <div class="lab-check">가져오기 이력 표가 보입니다.</div></li>
    <li class="lab-step"><div class="lab-do"><span class="ui">📄 예시: ERP 기준정보(…)</span> 를 누릅니다.</div>
      <div class="lab-check">검증 결과(추가 · 변경 건수)가 나옵니다. 아직 저장되지 않았습니다.</div>
      <div class="lab-tip">검증(dry run)은 데이터를 바꾸지 않습니다.</div></li>
  </ol>
  <div class="lab-result">무엇을 했고 무엇을 배웠는지 한두 문장.</div>
  <div class="lab-q">스스로 생각해 볼 질문(선택).</div>
</div>` },
```

- `data-lab` 은 전체에서 유일(`<교시id>-a`, `-b` …). 진행 체크가 이 이름으로 저장됩니다.
- 한 교시에 실습 블록 **2~4개**, 블록마다 단계 **4~10개**. 단계 하나 = 화면에서 할 일 하나.
  - `lab-do`: 할 일(정확한 메뉴 · 버튼 이름은 `<span class="ui">…</span>`, AI 에게 보낼 문장은 `<span class="prompt">…</span>`)
  - 캡처(`img.shot`)는 **처음 보는 화면 · 헷갈리는 단계마다** 넣습니다(강조 테두리 캡처 권장).
  - `lab-check`: 학습자가 화면에서 확인할 것(무엇이 바뀌어야 성공인지) — **모든 단계에 넣습니다.**
  - `lab-tip`: 주의 · 요령(선택)
- 블록 끝 `lab-result`(정리)는 필수, `lab-q`(생각해 보기)는 선택.
- 템플릿 문자열(백틱) 안에 `${` 와 백틱을 쓰지 않습니다.

## 3. 학생용 / 교사용

- 학생용: 개념 → 화면 설명 → **단계별 실습** → 퀴즈.
- 교사용(`teacher: true` 블록, 슬라이드 노트): 교시마다 마지막에 **🧑‍🏫 지도 포인트**(수업 준비: 실습 전 프로그램 상태 · 초기화 방법, 시간 배분, 자주 막히는 단계와 해결, 확인 기준/정답, 평가) callout 하나.
- 슬라이드(8~12장, 모든 장에 `notes`): `title` → 개념(`bullets` · `diagram` · `table` · `two`) → 화면(`diagram` 에 `<img class="shot" …>`) →
  실습 안내(`bullets`: 단계 요약) → `quiz` → `summary`. 교사 노트에 시연 순서 · 발문 · 확인할 것.
- 퀴즈 4문항(교시마다) — 프로그램 사용법 · 개념 이해를 묻습니다. 정답 위치를 섞습니다.

## 4. 화면 캡처

- 공용 캡처: `assets/shots/*.jpg` (아래 표). 새 캡처는 **`<chNN>_<이름>.jpg`** 로 만듭니다.
- 새 캡처 만드는 법 — JSON 계획을 쓰고 실행합니다(실습 프로그램이 http://localhost:5173 에서 실행 중이어야 함):
  ```
  set NODE_PATH=D:\Work\Web\miniPythicalAI\web\node_modules
  node tools/shoot.cjs <plan.json>
  ```
  계획 형식은 `tools/shoot.cjs` 머리말 참고(click · fill · press · mark(빨간 테두리) · wait · full …). 1600px JPEG 로 바로 저장됩니다.
  **확인 대화상자는 기본 '취소'** 입니다. 데이터를 실제로 바꾸는 단계(적용 · 확정 · 생산 시작 · 발주 · 입고 · 고장 예약)는
  그 장면이 꼭 필요할 때만 `"dialog": "accept"` · 클릭으로 진행합니다(실습용 임시 DB 라 괜찮지만, 다른 장면에 영향이 갈 수 있음).
- 캡처는 처음 보는 화면 · 헷갈리는 단계마다 넣되, 같은 화면을 반복하지 않습니다.

| 공용 캡처 | 화면 |
|---|---|
| hero_factory · hero_delta · hero_ur | 3D 트윈 전체 화면(설비 4대 / 델타 근접 / UR3 근접) |
| site_split · ops_split | 현장 2분할 · 운영 2분할 |
| dashboard · dashboard_full | 대시보드 |
| line_page · line_full · line_twin_factory/_cell/_delta/_ur/_crate · line_cmd_button · line_cmd_confirm | 공장 라인 |
| erp_overview · erp_orders · erp_plans · erp_plans_detail · erp_pro · erp_materials · erp_materials_full · erp_inventory · erp_shipments · erp_master · erp_data · erp_data_mark · erp_data_example · erp_graph · erp_ai_open · erp_ai_answer | ERP |
| mes_pro · mes_pro_open · mes_dispatch · mes_wo · mes_results · mes_lots · mes_lots_trace · mes_quality · mes_equipment · mes_maintenance · mes_master · mes_graph · mes_ai_answer | MES |
| pdm_overview · pdm_overview_full · pdm_db · pdm_ai_before · pdm_ai_result · pdm_ai_result_full | 예지보전 |
| fault_sim · fault_sim_full | 가상 고장 |
| ai_plan_empty · ai_plan_input · ai_plan_result · ai_plan_result_full · ai_plan_realloc | AI 생산계획 |
| cad_drawing | 설비 1대 CAD 외형도 |

## 5. 화면 이름 (실제 버튼 · 메뉴 그대로)

- 위 메뉴: 현장(대시보드 · 공장 라인 · 예지보전 · 가상 고장 · 현장 2분할) / 운영(ERP · MES · AI 생산계획 · 운영 2분할), 오른쪽 사용자 · ☾ 어둡게
- ERP: ▦ 개요 · ₩ 영업 · 수주 · ▤ 생산계획 · 배정 · ⚑ 생산오더 · ⛁ 자재(MRP) · 구매 · ▣ 재고 · ⇪ 출고 · ⚙ 기준정보 · ⇩ 데이터 가져오기 · ⇄ ERP↔MES 연동, 오른쪽 아래 ✦ AI 도우미
  - 개요: 수주 보기 → · 계획 관리 → · 자재 · 구매 → / 수주: 수주 등록 · 생산계획서로 →
  - 생산계획: + 새 계획서 · 불러오기 · 미출고 수주로 작성 · 파일 불러오기… · 내보내기(파일) · 삭제 · + 품목 추가 · 편집 저장 · 다시 배정 · 생산 계획 완료(확정) · ▶ 생산 시작
  - 생산오더: 자재 가용성 확인 · 마감, 부족 시 「자재 가용성 부족 — 릴리스 보류」 표와 부족분 구매 발주 · 부족해도 릴리스
  - 자재: 부족분 구매 발주 · 수동 발주 · (발주 목록의) 입고 / 재고: 재고 조정 / 출고: 출고 등록 / 기준정보: 품목 등록 · BOM 등록
  - 데이터: 📄 예시: ERP 기준정보(품목 · BOM · 거래처 · 기초 재고) · 📄 예시: 이번 주 고객 수주(수요) · 내려받기 · 파일 선택(JSON)… · 적용 · ⬇ 현재 데이터 내보내기 / 연동: 모듈 흐름 · 문서 추적(최근)
- MES: ⚑ 생산오더 · 공정 · ▦ 디스패치 보드 · ▤ 작업지시 · ✔ 생산 실적 · ⛓ LOT 추적 · ◎ 품질 · ⚙ 설비 · 알람 · 🔧 정비 · 예지보전 · ⇩ 기준정보 · 가져오기 · ⇄ ERP↔MES 연동
  - 디스패치: 배정 저장(파일) · 배정 불러오기… / 실적: 실적 등록 / LOT: 추적 / 품질: 기록 / 정비: AI 권고 · 확인 · 컨베이어 상태로 권고 받기 · 델타 로봇 상태로 권고 받기 · 정비 오더 등록 · 종료
  - 기준정보: 📄 예시: MES 기준정보(작업장 · 라우팅 · 근무 달력 · 검사 계획)
- 공장 라인: 1대 · 2대 · 3대 · 4대 · 공장 전체 · 설비 #n · 델타 셀 #n · UR 셀 #n · 적재·출고 #n · 제어반(PC·PLC) #n · 전체 설비 (n대), 명령 기동 · 일시정지 · 재개 · 정지 · 리셋 · ■ 비상정지
- 대시보드: 30분 · 1시간 · 4시간 · 8시간 / 2분할: 좌우 · 위아래 · ⇄ 자리 바꾸기 · 초기화 · ⤢ 크게
- 예지보전: 📊 보전 현황(설비 버튼: 공급 컨베이어 #n · 델타 로봇 #n) · 🗄 DB 탐색 · 내보내기 · ✦ AI 로 분석하기(✦ 분석하기 · 기록 저장)
- 가상 고장: 🎲 무작위 고장 예약, 가상 스위치(✔ 비상정지 버튼: 정상 · ✔ 안전 도어: 닫힘 · ✔ 에어 공급: 정상 · ✔ UR 보호정지: 없음), 종료 · 공개, 수동 고장 주입(교수자 · 시연용)
- AI 도우미: 🔑 키 설정, 예시 버튼 ERP「미출고 수주와 납기 임박 알려줘」「자재 부족 품목은?」「오늘 생산계획 상태는?」 /
  MES「지금 설비별 진행 상황은?」「대기 중인 작업지시 순서 알려줘」「알람과 정비 오더 정리해줘」, 보내기
- AI 생산계획: 예시「오늘 레드 20, 블루 10, 화이트 15 만들자」「미출고 수주 전부 오늘 처리할 계획 세워줘」「그린 40 설비 2대 6시간」, 보내기 · 계획서 보기

버튼 이름이 확실하지 않으면 실습 프로그램 소스(D:\Work\Web\miniPythicalAI\web\src)나 실제 화면(캡처 도구)으로 확인합니다. **없는 기능을 지어내지 않습니다.**

## 6. 사실 확인(플랫폼의 실제 동작)

- 설비 1대 = 작업대 하나(컨베이어 · 카메라 A/B · 델타 · 박스 라인 · UR3 · 적재함 · PLC). 1~4대. 설비 1대는 한 번에 한 색 생산. 완제품 = 박스(공작물 4개), 적재함 5박스(가정값).
- 처음 켜면 설비는 멈춰 있음(SIM_AUTOSTART=false). 생산 시작 → 작업지시가 시작된 설비만 기동, 마지막 작업지시가 끝나면 대기.
- 예지보전: 5초 윈도우 특징 → 이상 점수(IsolationForest + z-점수, 1.0 = 임계), 1.0 이상 3윈도우(15초) 연속 = 주의, 12윈도우 = 위험.
  운영 모델이 없으면 정상 윈도우 120개가 모이면 자동 학습. 고장 라벨 5건 이상이면 고장 분류 모델도 학습. 대상은 공급 컨베이어 · 델타 로봇.
- 고장 유형: 불균형 · 베어링 · 벨트 · 진공 누설 · 흡착 패드 오염. 무작위 고장은 유형 · 강도 · 진행 · 시각을 무작위로, 블라인드면 해소 · 공개 전까지 숨김.
- 생산계획 배정: 설비 수 = max(색 가짓수, 총 소요 ÷ 가용시간), 긴 색은 남는 설비로 나눔, 긴 작업부터 가장 덜 바쁜 설비로, 품목 전환 5분, 설비 안 순서 = 우선순위 → 납기 → 큰 작업.
- AI 도우미 · AI 생산계획 · AI 로 분석하기 · AI 정비 권고: API 키가 있으면 Claude, 없으면 규칙 기반(외부 호출 없음). AI 는 조회 · 초안 · 권고만,
  확정 · 생산 시작 · 정지는 사람과 PLC. 키는 🔑 키 설정에서 파일로 올리며 PC 하나에 하나, 암호화 보관.
- 실장비(PLC · UR3 · 델타 · 카메라) 연동은 코드 · 문서 단계이며 **실장비 미검증**. 통계 수치는 출처 없이 쓰지 않습니다.

## 7. 검사

```bash
node tools/validate.js ch05 --no-run      # 구조 검사(코드가 없으므로 --no-run)
node tools/validate.js all --no-run
```
그리고 `assets/shots/` 에 없는 캡처를 참조하지 않는지 확인합니다.
