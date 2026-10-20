'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const reveals = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); reveals.unobserve(entry.target); } });
  }, {threshold: 0.08});
  document.querySelectorAll('.reveal').forEach(el => reveals.observe(el));
  const mobileCta = document.querySelector('.mobile-cta');
  const visibleCtaSections = new Set();
  const ctaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry=>{if(entry.isIntersecting) visibleCtaSections.add(entry.target);else visibleCtaSections.delete(entry.target);});
    mobileCta.classList.toggle('is-hidden', visibleCtaSections.size>0);
  }, {threshold:0});
  ctaObserver.observe(document.querySelector('#reservation'));
  ctaObserver.observe(document.querySelector('.hero'));
}
const cases = [
  {
    "person": "26歳・営業職",
    "theme": "やりたいことが見つからない",
    "portrait": "thinking",
    "counselorQuestion": "これまで、人に頼られたのはどんな場面でしたか？",
    "image": "illust-thinking.png",
    "width": 1636,
    "height": 2262,
    "levels": [
      4,
      1,
      2,
      4
    ],
    "quotes": [
      "やりたいことが、何も見つからない。",
      "人の話を聞いて整理することが、得意なのかも。",
      "まずは今の仕事で、強みを試してみよう。"
    ],
    "phases": [
      "周りと比べて焦るけれど、自分の進む方向が見えない。",
      "経験を振り返ると、相手の話を整理してきた場面が見えてきた。",
      "転職を急がず、今の仕事で後輩のサポートに挑戦することに。"
    ],
    "text": [
      "「やりたいことが、\n何も見つからない。」",
      "周りの転職の話を聞くたびに焦る毎日。自分も動かなきゃと思うけれど、方向が見えない。",
      "「まずは今の仕事で、\n強みを試してみよう。」",
      "経験を振り返ると、人の話を聞いて整理することが得意だと気づいた。まずは後輩のサポートに挑戦することに。"
    ]
  },
  {
    "person": "31歳・事務職",
    "theme": "仕事と暮らしを両立したい",
    "portrait": "worried",
    "counselorQuestion": "仕事のやりがいと、自分の時間。どちらも大切にしていいんですよ。",
    "image": "illust-worried.png",
    "width": 2040,
    "height": 3212,
    "levels": [
      4,
      2,
      2,
      4
    ],
    "quotes": [
      "仕事と暮らし、どう両立したらいい？",
      "収入だけでなく、生活の余白も大切にしたい。",
      "大切にしたい時間を、言葉にできた。"
    ],
    "phases": [
      "仕事は嫌いではないけれど、自分の時間がなく、この先が不安。",
      "やりがいと暮らしの両方を振り返り、守りたい時間を整理する。",
      "まずは今の職場で、業務分担について相談してみることに。"
    ],
    "text": [
      "「仕事と暮らし、\nどう両立したらいい？」",
      "仕事は嫌いじゃない。でも、忙しさに追われて自分の時間が持てず、この先の働き方に不安を感じている。",
      "「大切にしたい時間を、\n言葉にできた。」",
      "収入だけでなく生活の余白も大切だと整理できた。まずは今の職場で、業務分担の相談をしてみることに。"
    ]
  },
  {
    "person": "29歳・接客業",
    "theme": "経験を活かせるか不安",
    "portrait": "advisors",
    "counselorQuestion": "接客で当たり前にしてきたことを、一緒に振り返ってみませんか？",
    "image": "illust-advisors.png",
    "width": 2527,
    "height": 2612,
    "levels": [
      5,
      1,
      2,
      4
    ],
    "quotes": [
      "ほかの仕事で、通用する自信がない。",
      "困りごとを聞き出す力も、わたしの経験。",
      "経験の中に、強みがあったんだ。"
    ],
    "phases": [
      "接客以外の仕事に興味はあるけれど、経験が通用するか不安。",
      "接客の場面から、話を聞き出す力と状況に応じて動く力を見つける。",
      "気になる職種で、その強みをどう活かせるか調べることに。"
    ],
    "text": [
      "「ほかの仕事で、\n通用する自信がない。」",
      "接客の経験しかなく、別の仕事に興味はあっても、自分にできることがわからず踏み出せない。",
      "「経験の中に、\n強みがあったんだ。」",
      "相手の困りごとを聞き出す力や、状況に応じて動く力を発見。気になる職種でどう活かせるか調べることに。"
    ]
  }
];
const tabs = Array.from(document.querySelectorAll('[role=tab]'));
function selectCase(tab) {
  tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;});
  const model=cases[Number(tab.dataset.case)];
  document.getElementById('case-panel').setAttribute('aria-labelledby',tab.id);
  document.getElementById('case-person-title').textContent=model.person+'の「これから」';
  document.getElementById('case-theme').textContent='相談テーマ：'+model.theme;
  document.getElementById('case-counselor-message').textContent=model.counselorQuestion;
  document.getElementById('case-number').textContent=String(Number(tab.dataset.case)+1).padStart(2,'0');
  const image=document.getElementById('case-portrait');image.src='assets/'+model.image;image.alt=model.person+'のモデルケースのイメージイラスト';image.width=model.width;image.height=model.height;
  document.getElementById('case-avatar').dataset.portrait=model.portrait;
  document.getElementById('change-story-label').textContent='STORY '+String(Number(tab.dataset.case)+1).padStart(2,'0')+' — '+model.person+'の気持ちの変化';
  document.getElementById('change-range-label').textContent=model.person+'の相談前後の変化';
  ['case-before','case-context','case-after','case-result'].forEach((id,i)=>{const el=document.getElementById(id);el.textContent=model.text[i];if(i===0||i===2)el.style.whiteSpace='pre-line';});
  document.getElementById('change-range').value=0;
  updateComparison();
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click',()=>selectCase(tab));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight') next=(index+1)%tabs.length;
    if(event.key==='ArrowLeft') next=(index+tabs.length-1)%tabs.length;
    if(event.key==='Home') next=0;
    if(event.key==='End') next=tabs.length-1;
    if(next!==undefined){event.preventDefault();selectCase(tabs[next]);tabs[next].focus();}
  });
});
const form = document.getElementById('booking-form');
const nameInput = form.elements.namedItem('name');
function validateName() {
  nameInput.setCustomValidity(nameInput.value && !nameInput.value.trim() ? 'お名前を入力してください。空白だけでは入力できません。' : '');
}
nameInput.addEventListener('input',validateName);
form.addEventListener('reset',()=>nameInput.setCustomValidity(''));
const dateInput = form.elements.namedItem('date');
const now = new Date();
const localDate = [now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
dateInput.min = localDate;
const panels = ['form-input','form-confirm','form-complete'];
function showStep(step) {
  panels.forEach((id,index)=>document.getElementById(id).hidden=index!==step);
  document.querySelectorAll('.form-progress li').forEach((li,index)=>{ if(index===step) li.setAttribute('aria-current','step'); else li.removeAttribute('aria-current'); });
  const focusTarget=step===0 ? form.elements.namedItem('name') : document.querySelector('#'+panels[step]+' h3');
  focusTarget.focus({preventScroll:true});
  document.querySelector('#reservation').scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth',block:'start'});
}
form.addEventListener('submit',event=>{
  event.preventDefault();
  nameInput.value=nameInput.value.trim();
  validateName();
  if(!form.reportValidity()) return;
  const data = new FormData(form);
  const confirmation = document.getElementById('confirmation');
  confirmation.textContent='';
  [['相談員','counselor'],['お名前','name'],['メールアドレス','email'],['相談希望日','date'],['希望の時間帯','time'],['相談したいこと','topics'],['今、気になっていること','message']].forEach(([label,key])=>{
    const dt=document.createElement('dt');dt.textContent=label;
    const dd=document.createElement('dd');dd.textContent=(key==='topics' ? data.getAll('topics').join('、') : String(data.get(key)||'').trim()) || '当日、一緒にお話ししましょう';
    confirmation.appendChild(dt);confirmation.appendChild(dd);
  });
  showStep(1);
});
document.getElementById('edit-booking').addEventListener('click',()=>showStep(0));
document.getElementById('finish-booking').addEventListener('click',()=>{
  showStep(2);
  form.reset();
  document.getElementById('confirmation').textContent='';
});
document.getElementById('reset-booking').addEventListener('click',()=>showStep(0));

// One selected feeling becomes the subject of a conversation.
const feelingReplies = MichishiruMatchingCore.worries.map(()=> 'その気持ちを大切に、今できることを一緒に整理しましょう。');
const feelingNotes = Array.from(document.querySelectorAll('.feeling-note'));
const table = document.getElementById('conversation-table');
const selectedNote = document.getElementById('table-selected');
const deskResponse = document.getElementById('desk-response');
const deskReset = document.getElementById('desk-reset');
function renderFeelings() {
  const chosen=feelingNotes.filter(item=>item.getAttribute('aria-pressed')==='true');
  document.getElementById('selection-count').textContent=chosen.length+'つ選択中';
  selectedNote.textContent='';
  if(!chosen.length) selectedNote.textContent='まとまっていない気持ちも、そのままで。';
  chosen.forEach(item=>{const chip=document.createElement('span');chip.className='chosen-feeling';chip.textContent=item.querySelector('span').textContent;selectedNote.appendChild(chip);});
  deskResponse.textContent=!chosen.length ? 'ここは、あなたの気持ちを置ける場所。一緒に、ゆっくり整理しましょう。' : chosen.length===1 ? feelingReplies[Number(chosen[0].dataset.feeling)] : chosen.length===2 ? 'いくつもの気持ちが、一緒にあっていいんです。選んだ2つのつながりを、一緒にほどいてみましょう。' : '仕事のこと、自分のこと、これからのこと。いっぺんに答えを出さず、大切にしたいことから少しずつ整理しましょう。';
  deskReset.hidden=!chosen.length;
  const feedback=document.getElementById('matching-feedback');
  feedback.firstChild.textContent=chosen.length?'選んだモヤモヤをもとに、相談員をご紹介します。':'選ばなくても、相談員を見て大丈夫。';
  window.dispatchEvent(new CustomEvent('michishiru:feelings-change',{detail:chosen.map(item=>Number(item.dataset.feeling))}));
}
function chooseFeeling(note,forceSelected) {
  const active=forceSelected || note.getAttribute('aria-pressed')!=='true';
  note.setAttribute('aria-pressed',String(active));note.querySelector('b').textContent=active?'✓':'＋';
  renderFeelings();
}
feelingNotes.forEach(note=>note.addEventListener('click',()=>chooseFeeling(note)));
deskReset.addEventListener('click',()=>{
  const previous=feelingNotes.find(note=>note.getAttribute('aria-pressed')==='true');
  feelingNotes.forEach(note=>{note.setAttribute('aria-pressed','false');note.querySelector('b').textContent='＋';});
  renderFeelings();if(previous) previous.focus({preventScroll:true});
});
// Drag is an enhancement for a mouse or pen; touch scrolling and tap remain native.
let drag=null;
feelingNotes.forEach(note=>{
  note.addEventListener('pointerdown',event=>{
    if(event.pointerType==='touch' || event.button!==0) return;
    const rect=note.getBoundingClientRect();
    drag={note,pointerId:event.pointerId,x:event.clientX,y:event.clientY,offsetX:event.clientX-rect.left,offsetY:event.clientY-rect.top,width:rect.width,height:rect.height,ghost:null};
    note.setPointerCapture(event.pointerId);
  });
  note.addEventListener('pointermove',event=>{
    if(!drag || drag.note!==note) return;
    if(!drag.ghost && Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>7){
      drag.ghost=note.cloneNode(true);drag.ghost.classList.add('dragging');drag.ghost.setAttribute('aria-hidden','true');drag.ghost.removeAttribute('id');drag.ghost.tabIndex=-1;
      drag.ghost.style.width=drag.width+'px';drag.ghost.style.height=drag.height+'px';document.body.appendChild(drag.ghost);
    }
    if(!drag.ghost) return;
    drag.ghost.style.left=(event.clientX-drag.offsetX)+'px';drag.ghost.style.top=(event.clientY-drag.offsetY)+'px';
    const rect=table.getBoundingClientRect();
    table.classList.toggle('drag-over',event.clientX>=rect.left && event.clientX<=rect.right && event.clientY>=rect.top && event.clientY<=rect.bottom);
  });
  function stopDrag(event){
    if(!drag || drag.note!==note) return;
    if(drag.ghost){
      if(event.type==='pointerup' && table.classList.contains('drag-over')) chooseFeeling(note,true);
      drag.ghost.remove();
      // Suppress only the click generated immediately after this drag.
      const preventClick=e=>{e.preventDefault();e.stopImmediatePropagation();};
      note.addEventListener('click',preventClick,{once:true,capture:true});
      setTimeout(()=>note.removeEventListener('click',preventClick,true),0);
    }
    table.classList.remove('drag-over');drag=null;
  }
  note.addEventListener('pointerup',stopDrag);note.addEventListener('pointercancel',stopDrag);note.addEventListener('lostpointercapture',stopDrag);
});
// A bounded, rAF-scheduled scroll response connects the figures to the headline.
const hero=document.querySelector('.hero');let scrollQueued=false;
function updateHero(){
  scrollQueued=false;
  if(reducedMotion.matches) return;
  const rect=hero.getBoundingClientRect();
  if(rect.bottom<0 || rect.top>window.innerHeight) return;
  const progress=Math.min(1,Math.max(0,-rect.top/rect.height));
  hero.style.setProperty('--scroll',progress.toFixed(3));
}
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateHero);}},{passive:true});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches) hero.style.setProperty('--scroll','0');else updateHero();});

// The scores illustrate a fictional story; they are not measured outcomes.

function updateComparison(){
  const range=document.getElementById('change-range');
  const progress=Number(range.value)/100;
  const tab=document.querySelector('[role="tab"][aria-selected="true"]');
  const model=cases[Number(tab.dataset.case)];
  const levels=model.levels;
  const worry=Math.round((levels[0]+(levels[2]-levels[0])*progress)*10)/10;
  const hope=Math.round((levels[1]+(levels[3]-levels[1])*progress)*10)/10;
  document.getElementById('worry-meter').value=worry;
  document.getElementById('hope-meter').value=hope;
  document.getElementById('worry-level').textContent=worry+' / 5';
  document.getElementById('hope-level').textContent=hope+' / 5';
  const phase=progress<.34?0:progress<.75?1:2;
  const stage=['相談前','対話の途中','相談後'][phase];
  document.getElementById('change-stage').textContent=stage;
  document.getElementById('change-quote').textContent='「'+model.quotes[phase]+'」';
  document.getElementById('change-phase').textContent=model.phases[phase];
  range.setAttribute('aria-valuetext',model.person+'・'+stage+'。'+model.quotes[phase]+' モヤモヤ度 '+worry+'、前向き度 '+hope+'。架空のイメージ');
  document.getElementById('worry-meter').setAttribute('aria-label',model.person+'のモヤモヤ度・架空のイメージ');
  document.getElementById('hope-meter').setAttribute('aria-label',model.person+'の前向き度・架空のイメージ');
  document.querySelector('.cases').style.setProperty('--change',progress);
  document.querySelector('.before').classList.toggle('comparison-focus',progress<.5);
  document.querySelector('.after').classList.toggle('comparison-focus',progress>=.5);
}
document.getElementById('change-range').addEventListener('input',updateComparison);
selectCase(tabs[0]);

// Explicit, keyboard-operable control; reduced-motion always takes priority.
const tickerToggle=document.getElementById('ticker-toggle');
if(tickerToggle){
  const ticker=tickerToggle.closest('.ticker');
  let tickerPaused=false;
  function renderTickerControl(){
    ticker.setAttribute('data-motion-control','true');
    ticker.style.setProperty('--ticker-play-state',tickerPaused?'paused':'running');
    tickerToggle.setAttribute('aria-pressed',String(tickerPaused));
    tickerToggle.textContent=tickerPaused?'文字の動きを再開':'文字の動きを停止';
    tickerToggle.hidden=reducedMotion.matches;
  }
  tickerToggle.addEventListener('click',()=>{tickerPaused=!tickerPaused;renderTickerControl();});
  reducedMotion.addEventListener('change',renderTickerControl);
  renderTickerControl();
}
// Enable the form only after all submit/validation handlers have been installed.
// With JavaScript disabled or initialization interrupted, every control stays disabled.
const demoFields=document.getElementById('demo-fields');
if(demoFields){
  form.querySelector('.form-submit').type='submit';
  demoFields.disabled=false;
}
