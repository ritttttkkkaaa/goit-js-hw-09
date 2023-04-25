import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]');
const timerContainer = document.querySelector('.timer');
const field = document.getElementsByClassName('field');
const fieldValue = document.getElementsByClassName('value');
const fieldLabel = document.getElementsByClassName('label');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-Hours]');
const timerMins = document.querySelector('span[data-minutes]');
const timerSecs = document.querySelector('span[data-seconds]');

let chsnTime = 0;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0].getTime()) {
      window.alert('Please choose a date in the future!');
    } else {
      startButton.disabled = false;
      chsnTime = selectedDates[0].getTime();
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(number) {
  const numberToString = number.toString();
  return numberToString.padStart(2, '0');
}

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

startButton.addEventListener('click', startTimerFunc);

function startTimerFunc() {
  startButton.disabled = true;

  const intervalID = setInterval(() => {
    let timeLeft = (Date.now() - chsnTime) * -1;

    if (timeLeft <= 0) {
      clearInterval(intervalID);
      window.alert('TIME IS OUT');

      return;
    }
    timeInHtml(timeLeft);
  }, 1000);
}

function timeInHtml(timeLeft) {
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMins.textContent = addLeadingZero(minutes);
  timerSecs.textContent = addLeadingZero(seconds);
}