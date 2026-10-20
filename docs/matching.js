(function(){
  'use strict';
  var core=window.MichishiruMatchingCore;
  if(!core||!document.getElementById('matching'))return;
  var recommended=core.getMatchingResult([]),selectedCounselorId=null;
  var choices=Array.from(document.querySelectorAll('[name="counselor-choice"]'));
  function person(id){return core.counselors.find(function(c){return c.id===id;});}
  function effectiveId(){return selectedCounselorId||recommended.recommendedId;}
  function render(announce){
    var current=person(effectiveId()),suggested=person(recommended.recommendedId),manual=selectedCounselorId!==null;
    document.getElementById('matching-count').textContent=recommended.count+'件のモヤモヤを選択中';
    document.getElementById('matching-recommendation').textContent='あなたにおすすめの相談員：'+suggested.name;
    document.getElementById('counselor-name').textContent=current.name;
    document.getElementById('matching-book-label').textContent=current.name+'さんで予約へ進む';
    document.getElementById('counselor-domain').textContent=current.domain;
    document.getElementById('counselor-bio').textContent=current.bio;
    var portrait=document.getElementById('counselor-portrait');portrait.src=current.image;portrait.parentNode.dataset.portrait=current.portrait;
    document.getElementById('matching-reason-title').textContent=suggested.name+'さんをおすすめする理由';
    document.getElementById('matching-reason').textContent=recommended.reason;
    var different=manual&&effectiveId()!==recommended.recommendedId;
    document.getElementById('matching-reason-card').hidden=different;
    document.getElementById('matching-difference').hidden=!different;
    document.getElementById('matching-difference').textContent='現在のおすすめは'+suggested.name+'さんです。選択した相談員でも予約できます。';
    document.getElementById('use-recommendation').hidden=!different;
    document.getElementById('counselor-state').textContent=different?'あなたが選んだ相談員':'あなたにおすすめの相談員';
    choices.forEach(function(input){input.checked=input.value===effectiveId();input.closest('label').querySelector('.counselor-badge').hidden=input.value!==recommended.recommendedId;});
    document.getElementById('booking-counselor-value').value=current.name+'（'+current.domain+'）';
    document.getElementById('booking-counselor-name').textContent=current.name;
    document.getElementById('booking-counselor-domain').textContent=current.domain;
    if(announce)document.getElementById('matching-status').textContent=(different?current.name+'さんを選択中です。現在のおすすめは'+suggested.name+'さんです。':current.name+'さんを表示しています。')+' '+recommended.count+'件選択中。';
  }
  choices.forEach(function(input){
    input.disabled=false;
    function select(){if(!input.checked||selectedCounselorId===input.value)return;selectedCounselorId=input.value;render(true);}
    input.addEventListener('change',select);
    input.addEventListener('click',select);
  });
  document.getElementById('use-recommendation').addEventListener('click',function(){selectedCounselorId=null;render(true);choices.find(function(input){return input.checked;}).focus({preventScroll:true});});
  window.addEventListener('michishiru:feelings-change',function(event){recommended=core.getMatchingResult(event.detail);render(true);});
  document.getElementById('booking-form').addEventListener('reset',function(){Promise.resolve().then(function(){render(false);});});
  document.querySelectorAll('#matching-book,.mobile-cta').forEach(function(cta){cta.addEventListener('click',function(){render(false);});});
  render(false);
})();
