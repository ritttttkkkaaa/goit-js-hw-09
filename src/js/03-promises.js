
const [form] = document.getElementsByClassName('form');
form.addEventListener('submit', onButtonClick);

function onButtonClick(event) {
  event.preventDefault();
  const input = event.target.elements;

  const step = Number(input.step.value);
  const amount = Number(input.amount.value);
  let promiseDelay = Number(input.delay.value);

  console.log('Зараз буде черга Промісів');

  for (let position = 1; position <= amount; position++, promiseDelay += step) {
    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    });
  }
}
