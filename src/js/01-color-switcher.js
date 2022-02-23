function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let timerId = null;

btnStart.addEventListener('click', () => {
    btnStart.setAttribute('disabled', 'true');
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
  }, 1000)
})

btnStop.addEventListener("click", () => {
    clearInterval(timerId);
    btnStart.removeAttribute('disabled');
});