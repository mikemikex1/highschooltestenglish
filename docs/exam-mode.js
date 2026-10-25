(function () {
  'use strict';
  var root, lessonRoot, supplementRoot, records = [], passages = [], examState = {};
  var years = [111, 112, 113, 114, 115];
  var labels = { vocabulary:'詞彙', cloze:'綜合測驗', context:'文意選填', discourse:'篇章結構', reading:'閱讀測驗', mixed:'混合題', translation:'中譯英', composition:'英文作文' };
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function rich(v) { var d=document.createElement('div'); d.innerHTML=String(v==null?'':v); d.querySelectorAll('script,iframe,object,embed').forEach(function(x){x.remove();}); d.querySelectorAll('*').forEach(function(x){Array.prototype.slice.call(x.attributes).forEach(function(a){if(/^on/i.test(a.name)||(a.name==='href'&&/^javascript:/i.test(a.value)))x.removeAttribute(a.name);});}); return d.innerHTML; }
  function list(v) { return Array.isArray(v) ? v : (v == null || v === '' ? [] : [v]); }
  function isExamRecord(q) { return q.sourceType==='official' || /^source-(translation|composition)-/.test(String(q.id||'')); }
  function section(q) {
    var n = Number(q.questionNumber || 0), t = String(q.questionType || '').toLowerCase();
    if (/^source-translation-/.test(String(q.id||''))) return 'translation';
    if (/^source-composition-/.test(String(q.id||''))) return 'composition';
    if (n <= 10 && n > 0) return 'vocabulary';
    if (n <= 20 && n >= 11) return 'cloze';
    if (n <= 30 && n >= 21) return 'context';
    if (n <= 34 && n >= 31) return 'discourse';
    if (n <= 46 && n >= 35) return 'reading';
    if (n <= 50 && n >= 47) return 'mixed';
    if (t.indexOf('translation') >= 0) return 'translation';
    if (t.indexOf('composition') >= 0 || t.indexOf('essay') >= 0) return 'composition';
    return 'mixed';
  }
  function range(s, n) {
    if (s === 'vocabulary') return '1-10';
    if (s === 'cloze') return '11-20';
    if (s === 'context') return '21-30';
    if (s === 'discourse') return '31-34';
    if (s === 'reading') return n <= 38 ? '35-38' : (n <= 42 ? '39-42' : '43-46');
    if (s === 'mixed') return '47-50';
    return String(n || 1);
  }
  function parse() {
    var raw = location.hash.replace(/^#/, '');
    if (raw.indexOf('mode=exam') !== 0) return null;
    var p = new URLSearchParams(raw), y = Number(p.get('year') || 0);
    return { mode:'exam', year:years.indexOf(y) >= 0 ? y : 0, section:p.get('section') || '', group:p.get('group') || '', question:Number(p.get('question') || 0) };
  }
  function hash(s) {
    var p = new URLSearchParams(); p.set('mode','exam');
    if (s.year) p.set('year',s.year); if (s.section) p.set('section',s.section); if (s.group) p.set('group',s.group); if (s.question) p.set('question',s.question);
    return '#' + p.toString();
  }
  function yearRecords(y) { return records.filter(function(q){return !y || Number(q.year)===Number(y);}).sort(function(a,b){return Number(a.questionNumber||999)-Number(b.questionNumber||999);}); }
  function groups(y,s) { var m={}; yearRecords(y).filter(function(q){return !s || section(q)===s;}).forEach(function(q){var k=range(section(q),Number(q.questionNumber));(m[k]||(m[k]=[])).push(q);}); return Object.keys(m).sort(function(a,b){return Number(a)-Number(b);}).map(function(k){return {id:k,items:m[k]};}); }
  function findQuestion(s) { var gs=groups(s.year,s.section).find(function(g){return g.id===s.group;}); var a=gs?gs.items:[]; return a.find(function(q){return Number(q.questionNumber)===Number(s.question);})||a[0]||null; }
  function nav() { var h=document.querySelector('.site-header .wrap'); if(!h||h.querySelector('.exam-top-nav'))return; var n=document.createElement('nav'); n.className='exam-top-nav'; n.setAttribute('aria-label','主要模式'); n.innerHTML='<a href="#mode=curriculum">課綱複習</a><a href="#mode=exam" aria-current="page">歷屆試題</a><a href="#mode=supplement">補充教材</a>'; h.appendChild(n); }
  function yearsNav(s) { return '<nav class="exam-year-nav" aria-label="學年度">'+years.map(function(y){return '<a href="'+hash({year:y,section:s.section,group:s.group,question:s.question})+'" aria-current="'+(s.year===y?'page':'false')+'">'+y+'｜學年度</a>';}).join('')+'</nav>'; }
  function sectionsNav(s) { return '<nav class="exam-section-nav" aria-label="試題類型">'+Object.keys(labels).map(function(k){return '<a href="'+hash({year:s.year,section:k})+'" aria-current="'+(s.section===k?'page':'false')+'">'+labels[k]+'</a>';}).join('')+'</nav>'; }
  function landing(s) { var body='<section class="exam-hero"><p class="exam-muted">Official Exam Mode｜題目與答案引用既有 canonical official question data</p><h2>'+(s.year?s.year+' 學年度學測英文':'學測英文歷屆試題')+'</h2>'+yearsNav(s); if(!s.year)return body+'<div class="exam-card-grid">'+years.map(function(y){return '<article class="exam-card"><h3>'+y+' 學年度</h3><p>'+yearRecords(y).length+' 筆 canonical official records</p><a class="exam-button" href="'+hash({year:y})+'">查看年度</a></article>';}).join('')+'</div></section>'; body+=sectionsNav(s)+'<div class="exam-card-grid">'+Object.keys(labels).map(function(k){var gs=groups(s.year,k);if(!gs.length)return '';return '<article class="exam-card"><h3>'+labels[k]+'</h3><p>'+gs.map(function(g){return g.id+'（'+g.items.length+' 題）';}).join('、')+'</p><a class="exam-button" href="'+hash({year:s.year,section:k,group:gs[0].id,question:Number(gs[0].items[0].questionNumber||0)})+'">開始作答</a></article>';}).join('')+'</div></section>'; return body; }
  function questionView(s,q) { var sec=section(q), g=groups(s.year,sec).find(function(x){return x.id===s.group;}), items=g?g.items:[q], i=Math.max(0,items.findIndex(function(x){return x.id===q.id;})), prev=items[i-1],next=items[i+1], opts=list(q.options); var h='<section class="exam-hero"><h2>'+s.year+' 學年度學測英文｜'+labels[sec]+'</h2>'+yearsNav(s)+sectionsNav(s)+'<nav class="exam-question-nav" aria-label="同題組題號">'+items.map(function(x){return '<a href="'+hash({year:s.year,section:sec,group:s.group,question:Number(x.questionNumber||0)})+'" aria-current="'+(x.id===q.id?'page':'false')+'">'+(x.questionNumber||'?')+'</a>';}).join('')+'</nav></section><article class="exam-question-card" data-exam-question-id="'+esc(q.id)+'"><p class="exam-muted">第 '+esc(q.questionNumber||'')+' 題｜'+labels[sec]+'</p><h3>'+esc(q.prompt||'正式題組內容由官方題卡呈現')+'</h3>'; if(opts.length){h+='<form class="exam-answer-form" data-exam-form="'+esc(q.id)+'"><fieldset><legend class="exam-muted">請選擇答案</legend>'+opts.map(function(o,j){var l=String.fromCharCode(65+j);return '<label class="exam-option" data-option-letter="'+l+'"><input type="radio" name="exam-choice" value="'+l+'"><span><strong>'+l+'.</strong> '+esc(o)+'</span></label>';}).join('')+'</fieldset><div class="exam-actions"><button class="exam-button" type="submit">Submit / Confirm</button><button class="exam-button" type="button" data-exam-reset>Reset</button></div></form>'; } else { h+='<form class="exam-answer-form" data-exam-form="'+esc(q.id)+'"><label for="exam-response" class="exam-muted">請先自行作答</label><textarea id="exam-response" rows="5" style="width:100%;margin-top:.5rem"></textarea><div class="exam-actions"><button class="exam-button" type="submit">Confirm</button><button class="exam-button" type="button" data-exam-reset>Reset</button></div></form>'; } h+='<div class="exam-actions">'+(prev?'<a class="exam-button" href="'+hash({year:s.year,section:sec,group:s.group,question:Number(prev.questionNumber||0)})+'">上一題</a>':'')+(next?'<a class="exam-button" href="'+hash({year:s.year,section:sec,group:s.group,question:Number(next.questionNumber||0)})+'">下一題</a>':'')+'<a class="exam-button" href="'+(q.viewRefs&&q.viewRefs[0]?'#'+q.viewRefs[0]:'#lesson-01')+'">回課綱複習</a></div></article>'; return h; }
  function attach(q) { var f=root.querySelector('[data-exam-form="'+CSS.escape(q.id)+'"]'); if(!f)return; f.addEventListener('submit',function(e){e.preventDefault();var selected=f.querySelector('input:checked'),value=selected?selected.value:'',correct=list(q.correctValues||q.answerKey||q.expectedAnswer)[0]||'',ok=value&&String(value).toUpperCase()===String(correct).toUpperCase(),card=f.closest('.exam-question-card');card.querySelectorAll('.exam-option').forEach(function(x){var l=x.dataset.optionLetter;x.classList.toggle('is-wrong',!!value&&!ok&&l===value);x.classList.toggle('is-correct',!!correct&&l===correct);x.classList.toggle('is-neutral',!!value&&l!==value&&l!==correct);});var old=card.querySelector('[data-exam-feedback]');if(old)old.remove();var out=document.createElement('div');out.className='exam-feedback';out.dataset.examFeedback='true';out.innerHTML='<p class="exam-status">'+(value?(correct?(ok?'作答正確':'作答完成'):'作答完成'):'尚未選擇答案')+'</p>'+(correct?'<p>官方答案：'+esc(correct)+'</p>':'<p>此題目前沒有可顯示的 canonical 參考答案。</p>');if(q.coreExplanation||q.fullExplanation||q.optionAnalysis||q.sourceHtml){var ex=document.createElement('div');ex.className='exam-explanation';ex.dataset.examExplanation='true';ex.innerHTML='<h4>教學解析</h4>'+(q.coreExplanation?'<p>'+rich(q.coreExplanation)+'</p>':'')+(q.fullExplanation?'<div>'+rich(q.fullExplanation)+'</div>':'')+(q.optionAnalysis?'<details><summary>查看逐項解析</summary><div>'+rich(typeof q.optionAnalysis==='string'?q.optionAnalysis:JSON.stringify(q.optionAnalysis,null,2))+'</div></details>':'')+(q.sourceHtml?'<details><summary>查看既有寫作解析</summary><div>'+rich(q.sourceHtml)+'</div></details>':'');out.appendChild(ex);}card.appendChild(out);});var r=f.querySelector('[data-exam-reset]');if(r)r.addEventListener('click',function(){render();}); }
  function render() { var s=parse();nav();if(!s){document.body.classList.remove('exam-mode-active');if(root)root.hidden=true;return;}document.body.classList.add('exam-mode-active');lessonRoot.hidden=true;supplementRoot.hidden=true;root.hidden=false;var q=s.year&&s.section&&s.group&&s.question?findQuestion(s):null;root.innerHTML=q?questionView(s,q):landing(s);if(q)attach(q); }
  function route(){var raw=location.hash.replace(/^#/,'');if(raw==='mode=curriculum'){history.replaceState(null,'','#lesson-01');if(window.phase3bSupplementUI&&typeof window.phase3bSupplementUI.showLesson==='function')window.phase3bSupplementUI.showLesson('#lesson-01');else if(window.hotfixSupplementLessonNav&&typeof window.hotfixSupplementLessonNav.enterLessonMode==='function')window.hotfixSupplementLessonNav.enterLessonMode();return;}if(raw==='mode=supplement'){history.replaceState(null,'','#supplement');if(window.phase3bSupplementUI&&typeof window.phase3bSupplementUI.showSupplement==='function')window.phase3bSupplementUI.showSupplement();return;}render();}
  function groupIndex(y,s){return groups(y,s).map(function(g){return {id:g.id,questionIds:g.items.map(function(q){return q.id;})};});}
  function init(){
    root=document.getElementById('exam-view-root'); lessonRoot=document.getElementById('lesson-view-root'); supplementRoot=document.getElementById('supplement-view-root');
    records=(window.canonicalQuestionData||[]).filter(isExamRecord); passages=window.canonicalPassageData||[];
    window.officialExamIndex=Object.fromEntries(years.map(function(y){
      var rs=yearRecords(y), bySection={};
      rs.forEach(function(q){var s=section(q);(bySection[s]||(bySection[s]=[])).push(q);});
      return [String(y),{year:y,sections:Object.keys(bySection),groups:Object.keys(bySection).map(function(s){return {section:s,groups:groupIndex(y,s)};}),questionIds:rs.map(function(q){return q.id;}),displayOrder:rs.map(function(q){return q.id;}),lessonLinks:[...new Set(rs.flatMap(function(q){return q.lessonRefs||[];}))]}];
    }));
    window.addEventListener('hashchange',route); route();
  }
  // Renderer remediation: shared material belongs to the current cognitive unit.
  // This later declaration intentionally supersedes the legacy question renderer
  // while preserving the canonical question and passage records unchanged.
  function questionView(s,q) {
    var specialSection=section(q);
    if(specialSection==='translation') return translationView(s,q);
    if(specialSection==='composition') return compositionView(s,q);
    var sec=section(q), g=groups(s.year,sec).find(function(x){return x.id===s.group;});
    var items=g?g.items:[q], i=Math.max(0,items.findIndex(function(x){return x.id===q.id;}));
    var prev=items[i-1], next=items[i+1], opts=list(q.options);
    var h='<section class="exam-hero"><h2>'+s.year+' 學年度學測英文｜'+labels[sec]+'</h2>'+yearsNav(s)+sectionsNav(s)+'<nav class="exam-question-nav" aria-label="同題組題號">'+items.map(function(x){return '<a href="'+hash({year:s.year,section:sec,group:s.group,question:Number(x.questionNumber||0)})+'" aria-current="'+(x.id===q.id?'page':'false')+'">'+(x.questionNumber||'?')+'</a>';}).join('')+'</nav></section>';
    list(q.passageRefs).forEach(function(ref){
      var p=passages.find(function(x){return x.id===ref;});
      if(!p)return;
      var material=p.html ? rich(p.html) : '<pre>'+esc(p.content||'')+'</pre>';
      h+='<section class="exam-passage" data-passage-id="'+esc(p.id)+'" aria-label="Shared passage">'+material+'</section>';
    });
    h+='<article class="exam-question-card" data-exam-question-id="'+esc(q.id)+'"><p class="exam-muted">第 '+esc(q.questionNumber||'')+' 題｜'+labels[sec]+'</p><h3>'+esc(q.prompt||'')+'</h3>';
    if(opts.length){
      h+='<form class="exam-answer-form" data-exam-form="'+esc(q.id)+'"><fieldset><legend class="exam-muted">請選擇答案</legend>'+opts.map(function(o,j){var l=String.fromCharCode(65+j);return '<label class="exam-option" data-option-letter="'+l+'"><input type="radio" name="exam-choice" value="'+l+'"><span><strong>'+l+'.</strong> '+esc(o)+'</span></label>';}).join('')+'</fieldset><div class="exam-actions"><button class="exam-button" type="submit">Submit / Confirm</button><button class="exam-button" type="button" data-exam-reset>Reset</button></div></form>';
    } else {
      h+='<form class="exam-answer-form" data-exam-form="'+esc(q.id)+'"><label for="exam-response" class="exam-muted">請先自行作答</label><textarea id="exam-response" rows="5" style="width:100%;margin-top:.5rem"></textarea><div class="exam-actions"><button class="exam-button" type="submit">Confirm</button><button class="exam-button" type="button" data-exam-reset>Reset</button></div></form>';
    }
    h+='<div class="exam-actions">'+(prev?'<a class="exam-button" href="'+hash({year:s.year,section:sec,group:s.group,question:Number(prev.questionNumber||0)})+'">上一題</a>':'')+(next?'<a class="exam-button" href="'+hash({year:s.year,section:sec,group:s.group,question:Number(next.questionNumber||0)})+'">下一題</a>':'')+'<a class="exam-button" href="'+(q.viewRefs&&q.viewRefs[0]?'#'+q.viewRefs[0]:'#lesson-01')+'">回課綱複習</a></div></article>';
    return h;
  }

  // Non-choice exam units use their existing canonical source records.  Their
  // answer material is intentionally mounted only after the corresponding
  // user action; nothing is pre-rendered and hidden with CSS.
  function translationUnits(year) {
    return (window.canonicalTranslationData||[]).filter(function(x){return Number(x.year)===Number(year);}).sort(function(a,b){return Number(a.index)-Number(b.index);});
  }
  function translationQuestion(year) {
    var items=translationUnits(year);
    return items.length ? {id:'source-translation-'+year,year:year,questionNumber:1,questionType:'nonInteractive',prompt:'',options:[],correctValues:[],lessonRefs:items[0].lessonRefs||[],viewRefs:items[0].viewRefs||[]} : null;
  }
  function compositionQuestion(year) {
    var all=(window.canonicalQuestionData||[]), q=all.find(function(x){return x.id==='source-composition-'+year;});
    return q||null;
  }
  function authorityForTranslation(t) {
    if(!t || !t.referenceTranslation) return 'NO_OFFICIAL_REFERENCE_SOURCE';
    return Number(t.year)===112 || Number(t.year)===113 ? 'SOURCE_BACKED_REFERENCE' : 'EDITORIAL_REFERENCE';
  }
  function translationView(s,q) {
    var items=translationUnits(s.year), h='<section class="exam-hero"><h2>'+s.year+' 摮詨僑摨血飛皜祈??'+labels.translation+'</h2>'+yearsNav(s)+sectionsNav(s)+'</section>';
    h+='<article class="exam-question-card" data-exam-question-id="'+esc(q.id)+'" data-exam-unit="translation"><p class="exam-muted">'+s.year+' 嚙踝蕭譯</p>';
    items.forEach(function(t){
      var tid=esc(t.id);
      h+='<section class="exam-translation-item" data-translation-id="'+tid+'"><h3>第'+esc(t.index)+'句</h3><p class="exam-translation-prompt">'+esc(t.prompt)+'</p><label class="exam-muted" for="response-'+tid+'">學生作答</label><textarea id="response-'+tid+'" data-translation-response rows="4" style="width:100%;margin-top:.5rem"></textarea><div class="exam-actions"><button class="exam-button" type="button" data-translation-reference="'+tid+'">查看參考答案</button><button class="exam-button" type="button" data-translation-reset>Reset</button></div></section>';
    });
    h+='<div class="exam-actions"><a class="exam-button" href="#lesson-21-view-02">?玨蝬梯?蝧?/a></div></article>'; return h;
  }
  function compositionView(s,q) {
    var h='<section class="exam-hero"><h2>'+s.year+' 摮詨僑摨血飛皜祈??'+labels.composition+'</h2>'+yearsNav(s)+sectionsNav(s)+'</section><article class="exam-question-card" data-exam-question-id="'+esc(q.id)+'" data-exam-unit="composition"><p class="exam-muted">'+s.year+' 嚙踝蕭文</p><h3>'+esc(q.prompt||'')+'</h3>';
    h+='<p class="exam-composition-instruction">依官方題目完成兩段英文作文。</p><form class="exam-answer-form" data-exam-form="'+esc(q.id)+'"><label class="exam-muted" for="composition-response">學生作答</label><textarea id="composition-response" rows="10" style="width:100%;margin-top:.5rem"></textarea><div class="exam-actions"><button class="exam-button" type="submit">Confirm</button><button class="exam-button" type="button" data-exam-reset>Reset</button></div></form><div data-composition-analysis-control></div></article>'; return h;
  }
  function addTranslationReference(item,t) {
    if(item.querySelector('[data-translation-reference-content]')) return;
    var out=document.createElement('div'); out.dataset.translationReferenceContent='true'; out.className='exam-reference'; out.innerHTML='<p><strong>參考譯文</strong> <span class="exam-muted">'+authorityForTranslation(t)+'</span></p><p>'+esc(t.referenceTranslation)+'</p>'+(t.explanation?'<button class="exam-button" type="button" data-translation-explanation>查看解析</button>':''); item.appendChild(out);
    var b=out.querySelector('[data-translation-explanation]'); if(b)b.addEventListener('click',function(){if(out.querySelector('[data-translation-explanation-content]'))return;var x=document.createElement('div');x.dataset.translationExplanationContent='true';x.className='exam-explanation';x.innerHTML='<p>'+esc(t.explanation)+'</p>';out.appendChild(x);});
  }
  function attach(q) {
    var sec=section(q);
    if(sec==='translation'){
      var ts=translationUnits(q.year); root.querySelectorAll('[data-translation-reference]').forEach(function(b){b.addEventListener('click',function(){var t=ts.find(function(x){return x.id===b.dataset.translationReference;});if(t)addTranslationReference(b.closest('.exam-translation-item'),t);});});
      root.querySelectorAll('[data-translation-reset]').forEach(function(b){b.addEventListener('click',function(){render();});}); return;
    }
    if(sec==='composition'){
      var f=root.querySelector('[data-exam-form="'+CSS.escape(q.id)+'"]'); if(!f)return;
      f.addEventListener('submit',function(e){e.preventDefault();var slot=root.querySelector('[data-composition-analysis-control]');if(!slot||slot.querySelector('button'))return;var b=document.createElement('button');b.className='exam-button';b.type='button';b.textContent='查看寫作解析';slot.appendChild(b);b.addEventListener('click',function(){if(slot.querySelector('[data-composition-analysis]'))return;var x=document.createElement('div');x.dataset.compositionAnalysis='true';x.className='exam-explanation';x.innerHTML=rich(q.sourceHtml||'');slot.appendChild(x);});});
      var r=f.querySelector('[data-exam-reset]'); if(r)r.addEventListener('click',function(){render();}); return;
    }
    var form=root.querySelector('[data-exam-form="'+CSS.escape(q.id)+'"]'); if(!form)return;
    form.addEventListener('submit',function(e){e.preventDefault();var selected=form.querySelector('input:checked'),value=selected?selected.value:'',correct=list(q.correctValues||q.answerKey||q.expectedAnswer)[0]||'',ok=value&&String(value).toUpperCase()===String(correct).toUpperCase(),card=form.closest('.exam-question-card');card.querySelectorAll('.exam-option').forEach(function(x){var l=x.dataset.optionLetter;x.classList.toggle('is-wrong',!!value&&!ok&&l===value);x.classList.toggle('is-correct',!!correct&&l===correct);x.classList.toggle('is-neutral',!!value&&l!==value&&l!==correct);});var old=card.querySelector('[data-exam-feedback]');if(old)old.remove();var out=document.createElement('div');out.className='exam-feedback';out.dataset.examFeedback='true';out.innerHTML='<p class="exam-status">'+(value?(ok?'雿?甇?Ⅱ':'雿?摰?'):'撠?豢?蝑?')+'</p>'+(correct?'<p>摰蝑?嚗?'+esc(correct)+'</p>':'');card.appendChild(out);});
    var reset=form.querySelector('[data-exam-reset]');if(reset)reset.addEventListener('click',function(){render();});
  }
  function groups(y,s) {
    if(s==='translation'){var tq=translationQuestion(y);return tq?[{id:'1',items:[tq]}]:[];}
    if(s==='composition'){var cq=compositionQuestion(y);return cq?[{id:'1',items:[cq]}]:[];}
    var m={};yearRecords(y).filter(function(q){return !s||section(q)===s;}).forEach(function(q){var k=range(section(q),Number(q.questionNumber));(m[k]||(m[k]=[])).push(q);});return Object.keys(m).sort(function(a,b){return Number(a)-Number(b);}).map(function(k){return {id:k,items:m[k]};});
  }
  function findQuestion(s) {
    if(s.section==='translation')return translationQuestion(s.year);
    if(s.section==='composition')return compositionQuestion(s.year);
    var gs=groups(s.year,s.section).find(function(g){return g.id===s.group;}),a=gs?gs.items:[];return a.find(function(q){return Number(q.questionNumber)===Number(s.question);})||a[0]||null;
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
}());
