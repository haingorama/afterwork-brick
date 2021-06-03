const animationClasses = {
  forwards: {
    in: 'slide-in-forwards',
    out: 'slide-out-forwards' },

  backwards: {
    in: 'slide-in-backwards',
    out: 'slide-out-backwards' } };

/**
 *
 *    Selectors
 */
const controlPrev = document.querySelector('[data-control=prev]');
const controlNext = document.querySelector('[data-control=next]');
const background = document.querySelector('[data-select=background]');
const slidesQuery = document.querySelectorAll('[data-slide]');
const slides = _.chain(slidesQuery).
filter(slide => slide.getAttribute('data-slide')).
value();

/**
 *
 *    Functions
 */
let index = 0;
let prevSlide = 0;

const timing = 500; // in ms
const increment = () => index < slides.length - 1 ? index += 1 : index;
const decrement = () => index > 0 ? index -= 1 : index;

const animateClass = (el, dir, type, delay = 0) => {
  el.classList.add(animationClasses[dir][type]);
  setTimeout(() => el.classList.remove(animationClasses[dir][type]), delay);
};

const animateSlide = () => {
  let current = slides[index];
  let previous = slides[prevSlide];
  let dir = prevSlide > index ? 'backwards' : 'forwards';
  background.classList.remove('animate-forwards');
  background.classList.remove('animate-backwards');
  setTimeout(() => {
    background.classList.add('animate-' + dir);
  }, 100);
  animateClass(previous, dir, 'out', timing);
  disableControls();
  setTimeout(() => {
    current.classList.add('active');
    previous.classList.remove('active');
    animateClass(current, dir, 'in', timing);
    enableControls();
  }, timing);
};

const disableControls = () => {
  controlPrev.disabled = true;
  controlNext.disabled = true;
};

const enableControls = () => {
  controlPrev.disabled = index == 0;
  controlNext.disabled = index == slides.length - 1;
};

/**
 *
 *    Events
 */
controlPrev.addEventListener('click', () => {
  decrement();
  animateSlide();
  prevSlide = index;
});

controlNext.addEventListener('click', () => {
  increment();
  animateSlide();
  prevSlide = index;
});

const current = slides[index];
current.classList.add('active');
animateClass(current, 'forwards', 'in', timing);

// **************************
// Accueil 
// **************************

var startingShips = 3; //  number of starting ships
var thrustForce = 2000; //  px/sec
var turnRate = 300; //  deg/sec
var playerDamping = 0.99; //  % velocity preserved per second
var rotationDamping = 0.95; // % rotation velocity preserved
var playerExplosion = 100; //  particles
var starfieldSize = 140; //  number of stars
var starSize = 3; //  px diameter
var parallaxStars = 0.15;  // % stars that move wrt player input

var startingAsteroids = 2; //  number of asteroids on level 1
var startAsteroidRadius = 125; //  px
var minAsteroidRadius = 30; //  px
var asteroidStartVelocity = 8000; //  px/sec
var asteroidCollisionDust = 60; //  particles

var explosionForce = 6;//12.5; //  px/sec
var particleDamping = 0.99; //  % velocity preserved per second
var dustSize = 5; //  px

var startBulletDamage = 10;
var bulletSpeed = 300; //  px/sec
var bulletDelay = 0.3; //  sec
var bulletParticles = 10; //  particles per impact

var DtR = Math.PI / 180;
var width = parseFloat($('#game').parent().css('width'));
var height = window.innerHeight;
var deathOpacity = 0.1; //  dust fades to here and dies
var sleepVelocity = 1; //  moving things stop below this speed

$(document).ready(function() {
  $('#startbutton').on('click', GameStart);
  $('#dev').on('click', DevInfo);
  $('#info').on('click', GameInfo);
  GameInfo();
});

function GameStart() {

  //  hide the title screen
  $('#title-home').hide();
  $('#game').show();

  $('body').on('keypress', GameKeyListener);
  $('body').on('keydown', GameKeyListener);

  if (gameTimer !== null) {
    window.cancelAnimationFrame(gameTimer);
  }
  gameTimer = window.requestAnimationFrame(GameUpdate);
}
