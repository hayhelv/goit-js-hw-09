import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onClose(selectedDates[0]);
  },
};

const refs = {
  btnStart: document.querySelector('[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const activDisabled = true;
let isDateNow = Date.now()

refs.btnStart.disabled = activDisabled;
const flp = flatpickr(refs.inputEl, options);

function onClose(date) {
    if (Date.now() > date) {
        window.alert('Please choose a date in the future')
    } else {
        refs.btnStart.disabled = !activDisabled;
        isDateNow = date;
    }
}

refs.btnStart.addEventListener('click', () => {    
    refs.btnStart.disabled = activDisabled;
    flp.destroy();
    refs.inputEl.disabled = activDisabled;

    setInterval(() => {
        const resetTime = convertMs(isDateNow - Date.now());
        markupChange(resetTime);
    }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
 
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute); 
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function markupChange({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}