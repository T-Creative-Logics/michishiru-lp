'use strict';
// FAQ-only interactions. The button provides native Enter/Space activation.
document.querySelectorAll('#faq .faq-card').forEach(card=>{
  const toggle=card.querySelector('.faq-toggle');
  const answer=card.querySelector('.faq-answer');
  const sign=card.querySelector('.faq-sign');
  function setExpanded(expanded){
    toggle.setAttribute('aria-expanded',String(expanded));
    answer.setAttribute('aria-hidden',String(!expanded));
    if(expanded) answer.removeAttribute('inert');else answer.setAttribute('inert','');
    card.classList.toggle('is-open',expanded);
    sign.textContent=expanded?'−':'＋';
  }
  function flip(){setExpanded(toggle.getAttribute('aria-expanded')!=='true');}
  toggle.addEventListener('click',flip);
  card.addEventListener('click',event=>{
    if(event.target.closest('button,a,input,select,textarea')) return;
    if(window.getSelection().toString()) return;
    flip();
  });
});
