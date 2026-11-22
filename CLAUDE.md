# 스마트 미니팩토리로 배우는 제조 AI · 피지컬 AI — 작업 규칙

이 저장소는 lectureBuilder(Python 수업형 엔진, 원본 studyMLBasic)로 뼈대를 만든 강좌이지만,
**코드 실습이 없는 "프로그램 사용법" 강좌**입니다. 실습은 단계별 실습 블록(`.lab`)으로만 만듭니다.

## 구조
- `js/course.js` — 강좌 설정 · 차시 순서. `docs/curriculum.json` 으로 lectureBuilder 가 생성합니다(직접 고치지 마세요).
- `lessons/<id>.js` — 차시 콘텐츠. **`docs/AUTHORING.md` 를 먼저** 따르고, 파일 형식은 `docs/LESSON_GUIDE.md`.
- `js/custom.js` · `css/custom.css` — 이 강좌의 기능(파이썬 편집기 · 결과 창 숨김, 단계별 실습 체크 · 진행률, 캡처 확대).
  엔진 파일(그 밖의 js/ · css/ · py/ · server/ · tools/validate.js · index.html)은 엔진 갱신 때 덮어씁니다.
- `assets/shots/` — 실습 프로그램 화면 캡처. `tools/shoot.cjs` 로 만듭니다.

## 규칙
- 코드 블록 · practice · code/practice/demo 슬라이드를 쓰지 않습니다.
- 실제 화면의 버튼 · 메뉴 이름만 씁니다(없는 기능을 지어내지 않음). 실장비 연동은 "미검증" 으로 씁니다.
- 실습 프로그램 저장소는 비공개 — 레슨에 저장소 링크를 넣지 않습니다(온라인 체험판 링크만).
- 고친 뒤 `node tools/validate.js <id> --no-run` 으로 오류 0, 캡처 참조가 모두 있는지 확인합니다.
- 로컬 미리보기: `python server/serve.py --port 8080` (Windows: start.bat)
- 배포: GitHub Pages(main / 루트). wrangler.toml(Cloudflare)은 쓰지 않습니다.
