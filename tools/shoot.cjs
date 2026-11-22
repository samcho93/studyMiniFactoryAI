// 실습 단계용 화면 캡처 — JSON 계획대로 실습 프로그램을 조작하며 찍습니다.
//
//   set NODE_PATH=D:\Work\Web\miniPythicalAI\web\node_modules      (Playwright 가 설치된 곳)
//   node tools/shoot.cjs plan.json [기준 URL = http://localhost:5173]
//
// plan.json = [ { "name": "ch06_import_1", "url": "/erp?m=data", "wait": 2500,
//                 "steps": [ {"click": "📄 예시: ERP 기준정보"}, {"wait": 1500}, {"mark": "적용"} ],
//                 "full": false, "clip": null } , … ]
// step 종류:
//   {"click": "버튼 이름"}            role=button 이름에 포함된 첫 버튼 클릭 (exact: true 면 정확히)
//   {"clickText": "글자"}             그 글자가 있는 요소 클릭
//   {"clickSel": "css"}               CSS 선택자 클릭
//   {"fill": {"label": "AI 에게 보낼 메시지", "text": "…"}}  입력칸(라벨/placeholder) 채우기
//   {"fillSel": {"sel": "input[name=qty]", "text": "10"}}
//   {"press": "Enter"}                키 누르기
//   {"select": {"sel": "select", "value": "…"}}
//   {"mark": "버튼 이름"} / {"markSel": "css"} / {"markText": "글자"}   빨간 테두리로 강조(그 요소로 스크롤)
//   {"scroll": "css"} / {"scrollY": 600}
//   {"wait": 1000}
//   {"js": "자바스크립트"}            페이지에서 실행(상태 준비용)
// 대화상자(confirm/alert)는 기본으로 '취소' 합니다. "dialog": "accept" 를 주면 그 장면에서는 수락.
// 결과: assets/shots/<name>.jpg (1600px 폭 JPEG). 실패한 단계는 건너뛰고 표시만 합니다.
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const planFile = process.argv[2];
const base = process.argv[3] || 'http://localhost:5173';
if (!planFile) { console.error('사용: node tools/shoot.cjs plan.json [기준 URL]'); process.exit(2); }
const plan = JSON.parse(fs.readFileSync(planFile, 'utf8'));
const OUT = path.join(__dirname, '..', 'assets', 'shots');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'msedge', headless: !process.env.HEADED,
    args: ['--ignore-gpu-blocklist', '--enable-gpu', '--enable-unsafe-swiftshader'] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1600 / 1440, locale: 'ko-KR' });
  const page = await ctx.newPage();
  let dialogMode = 'dismiss';
  page.on('dialog', (d) => (dialogMode === 'accept' ? d.accept() : d.dismiss()).catch(() => {}));
  const button = (name, exact) => page.getByRole('button', { name, exact: !!exact }).first();
  const mark = async (loc) => {
    await loc.first().evaluate((el) => {
      el.style.outline = '4px solid #e11d48'; el.style.outlineOffset = '3px';
      el.scrollIntoView({ block: 'center' });
    });
  };
  let ok = 0;
  for (const shot of plan) {
    try {
      dialogMode = shot.dialog || 'dismiss';
      if (shot.url) {
        await page.goto(new URL(shot.url, base).href, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(shot.wait == null ? 2500 : shot.wait);
      }
      for (const st of shot.steps || []) {
        try {
          if (st.click) await button(st.click, st.exact).click({ timeout: 4000 });
          else if (st.clickText) await page.getByText(st.clickText, { exact: !!st.exact }).first().click({ timeout: 4000 });
          else if (st.clickSel) await page.locator(st.clickSel).first().click({ timeout: 4000 });
          else if (st.fill) {
            const byLabel = page.getByLabel(st.fill.label);
            const loc = (await byLabel.count()) ? byLabel : page.getByPlaceholder(st.fill.label);
            await loc.first().fill(st.fill.text, { timeout: 4000 });
          } else if (st.fillSel) await page.locator(st.fillSel.sel).first().fill(st.fillSel.text, { timeout: 4000 });
          else if (st.press) await page.keyboard.press(st.press);
          else if (st.select) await page.locator(st.select.sel).first().selectOption(st.select.value, { timeout: 4000 });
          else if (st.mark) await mark(button(st.mark, st.exact));
          else if (st.markSel) await mark(page.locator(st.markSel));
          else if (st.markText) await mark(page.getByText(st.markText, { exact: !!st.exact }));
          else if (st.scroll) await page.locator(st.scroll).first().scrollIntoViewIfNeeded();
          else if (st.scrollY != null) await page.evaluate((y) => window.scrollTo(0, y), st.scrollY);
          else if (st.wait) await page.waitForTimeout(st.wait);
          else if (st.js) await page.evaluate(st.js);
          if (!st.wait) await page.waitForTimeout(st.after == null ? 400 : st.after);
        } catch (e) {
          console.log(`  ! ${shot.name}: 단계 실패 ${JSON.stringify(st).slice(0, 80)} — ${String(e.message).split('\n')[0]}`);
        }
      }
      const file = path.join(OUT, shot.name + '.jpg');
      const opt = { path: file, type: 'jpeg', quality: 80, fullPage: !!shot.full };
      if (shot.clip) opt.clip = shot.clip;
      await page.screenshot(opt);
      // 강조 테두리 지우기(다음 장면이 같은 화면일 때)
      await page.evaluate(() => document.querySelectorAll('[style*="outline: 4px"]').forEach((el) => { el.style.outline = ''; })).catch(() => {});
      ok++;
      console.log('shot', shot.name);
    } catch (e) {
      console.log(`✗ ${shot.name}: ${String(e.message).split('\n')[0]}`);
    }
  }
  await browser.close();
  console.log(`${ok}/${plan.length} 장`);
})();
