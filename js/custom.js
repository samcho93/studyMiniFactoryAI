/* 강좌별 추가 기능 — lectureBuilder 가 엔진을 갱신해도 이 파일은 덮어쓰지 않습니다.
 *
 * 이 강좌는 "프로그램 사용법" 강좌라 코드 실행(파이썬 편집기 · 결과 창)을 쓰지 않습니다.
 *  1) 파이썬 실행 환경을 미리 내려받지 않고, 편집기 · 결과 창을 숨깁니다(css/custom.css 의 html.no-code).
 *  2) 단계별 실습 블록(.lab)에 단계 체크 · 진행률 · 저장을 붙입니다.
 *  3) 첫 화면 · 차시 개요의 '예제 · 실습' 숫자와 사용 방법 안내를 이 강좌에 맞게 바꿉니다.
 *  4) 화면 캡처(img.shot)를 누르면 크게 보기.
 */
(function () {
  try { localStorage.setItem('jc.preload', '0'); } catch (e) { /* 저장소를 못 쓰면 무시 */ }
  document.documentElement.classList.add('no-code');

  var LS = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* */ } },
  };

  // ------------------------------------------------------------- 실습 블록
  function labsIn(sec) {
    var n = 0;
    (sec.content || []).forEach(function (b) {
      var h = b.html || '';
      var m = h.match(/class="lab"/g);
      if (m) n += m.length;
    });
    return n;
  }
  function stepsIn(sec) {
    var n = 0;
    (sec.content || []).forEach(function (b) {
      var m = (b.html || '').match(/<li class="lab-step"/g);
      if (m) n += m.length;
    });
    return n;
  }

  function enhanceLabs(root) {
    root.querySelectorAll('.lab[data-lab]').forEach(function (lab) {
      if (lab.dataset.ready) return;
      lab.dataset.ready = '1';
      var key = 'mf.lab.' + lab.dataset.lab;
      var steps = Array.prototype.slice.call(lab.querySelectorAll('li.lab-step'));
      var done = LS.get(key) || [];
      var bar = document.createElement('div');
      bar.className = 'lab-prog';
      bar.innerHTML = '<span class="lab-prog-bar"><i></i></span><span class="lab-prog-text"></span>' +
        '<button type="button" class="lab-reset" title="체크를 모두 지웁니다">↺ 처음부터</button>';
      var head = lab.querySelector('.lab-head');
      if (head && head.nextSibling) lab.insertBefore(bar, head.nextSibling); else lab.insertBefore(bar, lab.firstChild);
      function paint() {
        var n = 0;
        steps.forEach(function (li, i) {
          var on = done.indexOf(i) >= 0;
          li.classList.toggle('checked', on);
          var cb = li.querySelector('input.lab-cb');
          if (cb) cb.checked = on;
          if (on) n++;
        });
        bar.querySelector('i').style.width = (steps.length ? n / steps.length * 100 : 0) + '%';
        bar.querySelector('.lab-prog-text').textContent = n === steps.length && n > 0
          ? '🎉 ' + n + ' / ' + steps.length + ' 단계 — 실습 완료!' : n + ' / ' + steps.length + ' 단계 완료';
        lab.classList.toggle('lab-done', n === steps.length && n > 0);
      }
      steps.forEach(function (li, i) {
        var lb = document.createElement('label');
        lb.className = 'lab-tick';
        lb.title = '이 단계를 마쳤으면 체크하세요';
        lb.innerHTML = '<input type="checkbox" class="lab-cb"><span>완료</span>';
        li.insertBefore(lb, li.firstChild);
        lb.querySelector('input').addEventListener('change', function (e) {
          var at = done.indexOf(i);
          if (e.target.checked && at < 0) done.push(i);
          if (!e.target.checked && at >= 0) done.splice(at, 1);
          LS.set(key, done);
          paint();
        });
      });
      bar.querySelector('.lab-reset').addEventListener('click', function () {
        done = [];
        LS.set(key, done);
        paint();
      });
      paint();
    });
  }

  // ------------------------------------------------------------- 숫자 · 안내 고치기
  var USAGE_HTML =
    '<div class="table-wrap"><table>' +
    '<thead><tr><th>구분</th><th>🎓 학생용</th><th>🧑‍🏫 교사용</th></tr></thead><tbody>' +
    '<tr><td>기본 화면</td><td>문서형 강좌 — 개념 · 화면 캡처 → <b>단계별 실습</b> → 퀴즈</td><td>PPT 형태 슬라이드(16:9) + 교사 노트 · 수업 흐름</td></tr>' +
    '<tr><td>실습</td><td>실습 프로그램(스마트 미니팩토리 통합 플랫폼)을 옆에 띄우고 <b>단계마다 따라 한 뒤 ☑ 완료</b>를 체크합니다. 진행률은 이 브라우저에 저장됩니다.</td><td>같은 실습을 슬라이드로 안내, 🧑‍🏫 지도 포인트 · 확인 기준 · 정답</td></tr>' +
    '<tr><td>화면 캡처</td><td colspan="2">본문 · 슬라이드의 캡처를 누르면 크게 보입니다(Esc 로 닫기).</td></tr>' +
    '<tr><td>추가 기능</td><td>진도 저장, 검색, 슬라이드 보기</td><td>퀴즈 정답 · 판서 · 타이머 · 발표자 창 · 전체 화면</td></tr>' +
    '</tbody></table></div>' +
    '<ul class="steps">' +
    '<li><b>실습 프로그램 준비</b> — 강사에게 받은 폴더의 <code>run.bat</code> 을 실행합니다(4차시). 설치 없이 둘러보기만 할 때는 ' +
    '<a href="https://samcho93.github.io/miniPythicalAI/" target="_blank" rel="noopener">온라인 체험판</a>(설비 1대 · 기본 기능)을 씁니다.</li>' +
    '<li><b>화면 배치</b> — 강좌와 실습 프로그램을 나란히(창 두 개) 띄우면 따라 하기 편합니다. 모니터가 하나면 <kbd>Alt</kbd>+<kbd>Tab</kbd> 으로 오갑니다.</li>' +
    '<li><b>교시 선택</b> — 왼쪽 목차에서 차시와 교시를 고르고, 위쪽 📄 문서 / 🖼️ 슬라이드로 보기를 바꿉니다.</li>' +
    '<li><b>교사용 수업</b> — 🧑‍🏫 교사용으로 바꾸면 슬라이드가 열립니다. <kbd>F</kbd> 전체 화면, <kbd>←</kbd> <kbd>→</kbd> 이동, <kbd>G</kbd> 목록, <kbd>N</kbd> 노트, <kbd>B</kbd> 화면 가리기, <kbd>T</kbd> 타이머.</li>' +
    '</ul>' +
    '<div class="callout info"><div class="ct">ℹ️ 실습 환경</div><div>' +
    '<p>실습은 모두 플랫폼의 <b>시뮬레이션 모드</b>로 진행합니다. 하드웨어(PLC · 로봇 · 카메라)가 없어도 공장 전체가 돌아가며, ' +
    'AI 기능은 API 키가 없으면 <b>규칙 기반</b>으로, 키를 등록하면 Claude 로 동작합니다(14차시).</p></div></div>';

  function fixHome(content) {
    var C = window.PY_COURSE;
    var secs = [];
    C.order.forEach(function (o) { var ch = C.chapters[o.id]; if (ch) secs = secs.concat(ch.sections); });
    var labs = 0, steps = 0, quiz = 0, slides = 0;
    secs.forEach(function (s) { labs += labsIn(s); steps += stepsIn(s); quiz += (s.quiz || []).length; slides += (s.slides || []).length; });
    var hero = content.querySelector('.hero');
    if (hero) {
      hero.querySelectorAll('p').forEach(function (p) {
        if (/예제 \d+개/.test(p.textContent)) {
          p.textContent = '차시 ' + Object.keys(C.chapters).length + '개 · 교시 ' + secs.length + '개 · 단계별 실습 ' + labs +
            '개(' + steps + '단계) · 퀴즈 ' + quiz + '문항 · 슬라이드 ' + slides + '장';
        }
      });
    }
    var h2 = Array.prototype.slice.call(content.querySelectorAll('h2')).filter(function (h) { return /사용 방법/.test(h.textContent); })[0];
    if (h2 && !h2.dataset.fixed) {
      h2.dataset.fixed = '1';
      while (h2.nextSibling) h2.parentNode.removeChild(h2.nextSibling);
      var box = document.createElement('div');
      box.innerHTML = USAGE_HTML;
      while (box.firstChild) h2.parentNode.appendChild(box.firstChild);
    }
  }

  function fixChapter(content, chId) {
    var ch = window.PY_COURSE.chapters[chId];
    if (!ch) return;
    content.querySelectorAll('.sm').forEach(function (el, i) {
      var s = ch.sections[i];
      if (s) el.textContent = (s.minutes || 50) + '분 · 단계별 실습 ' + labsIn(s) + ' · 퀴즈 ' + (s.quiz || []).length + ' · 슬라이드 ' + (s.slides || []).length;
    });
  }

  function fixSection(content, sec) {
    content.querySelectorAll('.chip').forEach(function (c) {
      if (/실습 \d+/.test(c.textContent)) c.textContent = '🛠️ 단계별 실습 ' + labsIn(sec);
      if (/예제 \d+/.test(c.textContent)) c.style.display = 'none';
    });
  }

  function findSection(id) {
    var C = window.PY_COURSE;
    for (var k in C.chapters) {
      var s = (C.chapters[k].sections || []).filter(function (x) { return x.id === id; })[0];
      if (s) return s;
    }
    return null;
  }

  document.addEventListener('lb:render', function (e) {
    var r = e.detail || {};
    var content = document.getElementById('content');
    if (!content) return;
    if (r.type === 'home') fixHome(content);
    if (r.type === 'chapter') fixChapter(content, r.ch && (r.ch.id || r.ch));
    if (r.type === 'section') {
      var id = r.sec && (r.sec.id || r.sec);
      var sec = findSection(id);
      if (sec) fixSection(content, sec);
    }
    enhanceLabs(content);
  });
  // 슬라이드 등 다른 곳에 그려진 실습 블록도
  new MutationObserver(function () { enhanceLabs(document); }).observe(document.documentElement, { childList: true, subtree: true });

  // ------------------------------------------------------------- 캡처 크게 보기
  document.addEventListener('click', function (e) {
    var img = e.target && e.target.closest ? e.target.closest('img.shot') : null;
    if (!img) return;
    e.preventDefault();
    var box = document.createElement('div');
    box.className = 'shot-zoom';
    box.innerHTML = '<img alt="">';
    box.firstChild.src = img.currentSrc || img.src;
    box.firstChild.alt = img.alt || '';
    function close() { box.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(ev) { if (ev.key === 'Escape') close(); }
    box.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    document.body.appendChild(box);
  });
})();
