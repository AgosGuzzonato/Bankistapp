'use strict';
///////Query selectors
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const allButtons = document.getElementsByTagName('button');
const nav = document.querySelector('.nav')
const tabs = document.querySelectorAll('.operations__tab');
const tabscontainer= document.querySelector('.operations__tab-container');
const tabscontent= document.querySelectorAll('.operations__content')

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn=>btn.addEventListener('click',openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//When i click a link that has a #, the page will run to the top
//this is for default
//so i  should call the event
//e.preventDefault();

const header= document.querySelector('.header');
const allSections =document.querySelectorAll('.section');

document.getElementById('section--1')
document.getElementsByClassName('btn');

/////////CREATING AND INSERTING ELEMENTS
const message= document.createElement('div')//That element is not yet in the DOM (we cannot find it)
message.classList.add('cookie-message'); //this is define in the css and now we create an element
message.innerHTML='Cookies are used for improved functionality. <button class = "btn btn--close-cookie"> Got it ! </button>'
//Add the element as a first child of header
//header.prepend(message)
//Add the element as a last child of header
header.append(message) //it only remains this. It will be only the last child
//So the DOM element is UNIQUE, it can exist only in one place at time
//header.append(message.cloneNode(true)) //Aparece el mensaje arriba (prepend) y abajo (append)

//DELETE A MESSAGE
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove(); 
});

//////Attributes
//img src, alt, class, are attributes from the HTML 
const logo = document.querySelector('.nav__logo'); 

//also we can set the attribute
logo.alt = 'Minimalist logo'
logo.setAttribute('company', 'bankist')


//Both links are absolutes
const link = document.querySelector('.twitter-link');
const link2 = document.querySelector('.nav__link--btn');

///CLASSES
logo.classList.add('c','j')
logo.classList.remove('c')
logo.classList.toggle('j')
logo.classList.contains('c', 'j') //not includes (that was only for arrays)

///Smooth scrolling
//1. get the coordinates
//2. e.target es el boton en donde hago click 
const btnScrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')

///////////////////////////////////////////////
//BTN SCROLL
btnScrollto.addEventListener('click',function(e){

  section1.scrollIntoView({behavior:'smooth'});
})

//1.Parent element 
const h1 = document.querySelector('h1');

//The HTML collection can be spread and we made an ARRAY
[...h1.parentElement.children].forEach(function(el){
  if(el!=h1) el.style.transform= 'scale(0.5)'; //all the 3 siblings except h1 are smaller now
})

//SOLUTION OF EVENT DELEGATION
tabscontainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab'); //this will save the button that i am clicking

  //GUARD CLAUSE
  if(!clicked) return;
  //TAB
  //Remove the active from all the tabs
  tabs.forEach(t=>t.classList.remove('operations__content--active'));
  tabscontent.forEach(c=> c.classList.remove('operations__content--active'))
  //Activate tab. Add the active only to the tab clicked
  clicked.classList.add('operations__content--active'); //this will add the active class to the button that i am clicking

  //CONTENT AREA
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
});
//closest: will only search the element that is near to what we need (in this case the op tab)

//Menu fade animation 
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', function(e){
  handleHover(e,0.5)
})
nav.addEventListener('mouseout', function(e){
  handleHover(e,1)
})

///COORDINADAS DE INICIO
const initialCoords= section1.getBoundingClientRect();

////STICKY NAVIGATION
window.addEventListener('scroll', function(){
//console.log(window.scrollY)//scrollY: es la distancia que hay desde donde estoy situado hasta la parte superior de la pantalla
 if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
})

/////////////THINGS TO DO
//So I want to display the navegation bar when we NO longer see the header
const navheight = nav.getBoundingClientRect().height;
const stickyNav= function(entries){
  const [entry]= entries; //es igual a escribir entries[]
 if(!entry.isIntersecting) nav.classList.add('sticky'); else nav.classList.remove('sticky');
}; 

const headerObserver = new IntersectionObserver(stickyNav, {
root: null,
threshold: 0,
rootMargin:`-${navheight}px`});

headerObserver.observe(header);

//REVEAL SECTIONS
//Const all sections ya está declarada en la línea 53
const revealSection = function (entries, observer){
  const [entry] = entries; //entry es cada una de las entradas

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  //cada entry que tenga un target, se le removerá el hidden

  observer.unobserve(entry.target); //cuando ya terminamos de observar
  //deja de hacerlo
};

const sectionObserver = new IntersectionObserver(
  revealSection, {
    root: null,
    threshold: 0.15,
  });

allSections.forEach(function(section){
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

//IMAGES

const imgTargets = document.querySelectorAll('img[data-src]'); //SELECCIONO TODAS LAS IMG GRANDES

const loadimg= function(entries,observer){
  const [entry]= entries; //only one threshold so only one entry
  if(!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src=entry.target.dataset.src;

  //Remove the blur filter when it is load
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })

  //Finish the observation
  observer.unobserve(entry.target);
}; //CALLBACK FUNCTION

const imgObserver= new IntersectionObserver(loadimg, {  
  root: null,
  threshold: 0,
  rootMargin:'200px', 
}); 

imgTargets.forEach(img=>imgObserver.observe(img)) //OBSERVA CADA UNA DE LAS IMG
//TRANSFORM IS A CSS PROPERTY 
//TRANSLATE X 
//SLIDER
const slider = function(){ //FUNCION GENERAL

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const dotContainer = document.querySelector('.dots')
//The slide that we start with
let curslide = 0;
const maxSlide= slides.length;


//FUNCTIONS
const createDots = function(){
  slides.forEach(function(_,i){ // _ se pone asi cuando es una variable q no vamos a usar 
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot')
  .forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`) //selecciono el dot segun slide
  .classList.add('dots__dot--active')
}

const goToSlide = function(slide){
  slides.forEach((s,i)=> (s.style.transform = `translateX(${100*(i-slide)}%)`));
}
const nextSlide = function(){
if(curslide===maxSlide-1){ //-1 es porque el lenght no empieza en 0 y el curslide si
  curslide=0;
}else{
  curslide++
}
goToSlide(curslide);
activateDot(curslide);
};

const prevSlide = function(){
if(curslide===0){ //si ya está en 0, necesito que vuelva al maximo
    curslide=maxSlide-1;
  }else{
    curslide--
  }
 goToSlide(curslide);
 activateDot(curslide);
};
const init = function(){
  goToSlide(0);
  createDots();
  activateDot(0);
}
init()

//EVENT LISTENER
btnRight.addEventListener('click', nextSlide);
//the active slide is always at 0%

btnLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown', function(e){
  if (e.key==='ArrowLeft') prevSlide();
  e.key==='ArrowRight' && nextSlide(); //Short circuiting
})

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset; //esto va a tomar el num de slide
    goToSlide(slide)
    activateDot(slide);
  }
})
};
slider();


document.addEventListener('DOMContentLoaded',function(e){
  console.log('HTML parsed and DOM tree built', e)
})
window.addEventListener('load',function(e){
  console.log('page full loaded', e)
})

