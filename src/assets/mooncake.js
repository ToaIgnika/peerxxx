const $pupil1 = document.querySelector('.js-pupil-1');
const $pupil2 = document.querySelector('.js-pupil-2');
const $mouthOpen = document.querySelector('.js-mouth-open');
const $mouthClosed = document.querySelector('.js-mouth-closed');
const $mooncakeInstance = document.querySelector('.js-mooncake-instance');

$mooncakeInstance.addEventListener('click', function() {
  if ($pupil1.getAttribute('cx') <= 20) {
      $pupil1.setAttribute('cx', '80');
      $pupil2.setAttribute('cx', '270');
      $mouthOpen.setAttribute('style', 'display: none');
      $mouthClosed.setAttribute('style', 'display: block');
  } else {
    $pupil1.setAttribute('cx', '20');
    $pupil2.setAttribute('cx', '210');
    $mouthOpen.setAttribute('style', 'display: block');
    $mouthClosed.setAttribute('style', 'display: none');
  }
})