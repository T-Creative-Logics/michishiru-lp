/* Independent, deterministic matching data and rules. No network or AI calls. */
(function(root){
  'use strict';
  var catalog=typeof module==='object'&&module.exports?require('./matching-data.js'):root.MichishiruMatchingData;
  var worries=catalog.worries,counselors=catalog.counselors;
  function normalizeIds(ids){return Array.from(new Set((Array.isArray(ids)?ids:[]).filter(function(id){return typeof id==='number'&&Number.isInteger(id)&&id>=0&&id<worries.length;})));}
  function matchWorries(ids){
    var selected=normalizeIds(ids);
    var ranked=counselors.map(function(person){return {id:person.id,score:selected.reduce(function(sum,id){return sum+(person.weights[id]||0);},0),matches:selected.filter(function(id){return !!person.weights[id];})};});
    var best=ranked.reduce(function(winner,item){return item.score>winner.score?item:winner;},ranked[0]);
    var reason=best.matches.length?'「'+best.matches.map(function(id){return worries[id];}).join('」「')+'」という気持ちが、得意な相談領域と重なっています。':selected.length?'まだ言葉にならない気持ちも、経験や価値観から一緒に整理できる佐藤さんを、最初の候補としてご紹介します。':'何から話すか決まっていなくても大丈夫。経験や価値観を一緒に整理する佐藤さんを、最初の候補としてご紹介します。';
    return {schemaVersion:1,source:'rules',worryIds:selected,matchedWorryIds:best.matches,recommendedId:best.id,reason:reason,count:selected.length,scores:ranked};
  }
  // Accept only catalog IDs, available demo counselors, and truthful domain overlaps.
  // A future server must repeat these checks against its authoritative live catalog.
  function validateResult(result,ids,registry){
    var selected=normalizeIds(ids),people=registry||counselors;
    if(!result||result.schemaVersion!==1||!['rules','ai'].includes(result.source)||!Array.isArray(result.worryIds)||!Array.isArray(result.matchedWorryIds))return null;
    if(result.worryIds.length!==selected.length||!result.worryIds.every(function(id){return selected.includes(id);})||new Set(result.worryIds).size!==selected.length)return null;
    var person=people.find(function(item){return item.id===result.recommendedId;});
    if(!person||person.available!==true)return null;
    var actual=selected.filter(function(id){return !!person.weights[id];});
    if(result.matchedWorryIds.length!==actual.length||new Set(result.matchedWorryIds).size!==actual.length||!result.matchedWorryIds.every(function(id){return actual.includes(id);}))return null;
    if(selected.some(function(id){return id!==8;})&&!actual.length)return null;
    if(!selected.some(function(id){return id!==8;})&&person.id!=='sato')return null;
    // Build public reasons from verified data; never display unconstrained model prose.
    var reason=actual.length?'「'+actual.map(function(id){return worries[id];}).join('」「')+'」という気持ちが、得意な相談領域と重なっています。':matchWorries(selected).reason;
    return {schemaVersion:1,source:result.source,worryIds:selected,matchedWorryIds:actual,recommendedId:person.id,reason:reason,count:selected.length,scores:result.source==='rules'?matchWorries(selected).scores:[]};
  }
  function getMatchingResult(ids){return validateResult(matchWorries(ids),ids);}
  // Optional transport seam only. The demo UI never supplies a provider or calls an API.
  // Providers must honor AbortSignal. The caller must ignore superseded responses.
  function requestMatch(ids,provider,timeoutMs){
    var selected=normalizeIds(ids),fallback=getMatchingResult(selected);
    if(typeof provider!=='function')return Promise.resolve(fallback);
    var controller=typeof AbortController!=='undefined'?new AbortController():null;
    var duration=Number.isFinite(timeoutMs)&&timeoutMs>0?timeoutMs:5000;
    return new Promise(function(resolve){
      var settled=false;
      function finish(value){if(settled)return;settled=true;clearTimeout(timer);resolve(value||fallback);}
      var timer=setTimeout(function(){if(controller)controller.abort();finish(fallback);},duration);
      Promise.resolve().then(function(){return provider({schemaVersion:1,worryIds:selected.slice()},controller?controller.signal:undefined);}).then(function(value){finish(validateResult(value,selected));}).catch(function(){finish(fallback);});
    });
  }
  var api={worries:worries,counselors:counselors,matchWorries:matchWorries,getMatchingResult:getMatchingResult,validateResult:validateResult,requestMatch:requestMatch};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.MichishiruMatchingCore=api;
})(typeof window!=='undefined'?window:this);
