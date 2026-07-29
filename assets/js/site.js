// Las Palmas 104 — shared UI behaviour
(function(){
  var nav = document.getElementById('nav');
  function onScroll(){ if(nav){ nav.classList.toggle('solid', window.scrollY > 40); } }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  var burger = document.querySelector('.burger');
  var mobile = document.getElementById('mobile');
  if(burger && mobile){
    burger.addEventListener('click', function(){ mobile.classList.add('open'); });
    mobile.querySelectorAll('a,.close').forEach(function(a){
      a.addEventListener('click', function(){ mobile.classList.remove('open'); });
    });
  }

  // reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.14});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // lightbox for gallery
  var lb = document.getElementById('lb');
  if(lb){
    var lbimg = lb.querySelector('img');
    document.querySelectorAll('[data-lb]').forEach(function(img){
      img.addEventListener('click', function(){ lbimg.src = img.getAttribute('src'); lb.classList.add('open'); });
    });
    lb.addEventListener('click', function(){ lb.classList.remove('open'); });
  }
})();
