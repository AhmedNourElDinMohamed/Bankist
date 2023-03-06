'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Ahmed Nour',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2023-02-26T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Mohamed Ahmed',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Hassan Elsheimy',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Mohamed Shaban Ali',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

// Elements
const labelWelcome = document.querySelector('.welcome');
const signUpBtn = document.querySelector('.signUp-btn');
const signUpModal = document.querySelector('.modal');
const signUpForm = document.querySelector('.overlay');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const lableSignup = document.querySelector('.signUp');
const validationUserError = document.querySelector('.error__message--user');
const validationPinError = document.querySelector('.error__message--pin');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnSignup = document.querySelector('.sigup__btn');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputSignupUsername = document.querySelector('.sigup__input--user');
const inputSignupPin = document.querySelector('.sigup__input--pin');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const userNameValid = /^[a-zA-Z]+ [a-zA-Z]+$/gi;
const pinValid = /\d{4}/gi;

let currentAccount, transferAccount, transferAmount, timer;
let accounts = [account1, account2, account3, account4];

/*****************Functions****************/
// 1. Get All Accounts
const getAllAccounts = () => {
  if (localStorage.length) {
    accounts = JSON.parse(localStorage.getItem('accounts'));
  } else updateData();
};

// 2. Sign Up
const signUp = e => {
  e.preventDefault();
  console.log('Oter', userNameValid.test(inputSignupUsername.value));
  if (!userNameValid.test(inputSignupUsername.value)) {
    console.log(!userNameValid.test(inputSignupUsername.value));
    console.log('User name is not valid');
    validationUserError.classList.remove('hide');
  } else {
    validationUserError.classList.add('hide');
    if (!pinValid.test(inputSignupPin.value)) {
      validationPinError.classList.remove('hide');
      console.log('Pin is not valid');
    } else {
      const newUser = {
        owner: inputSignupUsername.value,
        movements: [],
        interestRate: 1,
        pin: +inputSignupPin.value,

        movementsDates: [],
        currency: 'USD',
        locale: 'en-US',
      };
      accounts.push(newUser);
      updateData();
      signUpModal.classList.add('hide');
      signUpForm.classList.add('hide');
      inputSignupUsername.value = '';
      inputSignupPin.value = '';
      successMessage('You Have Created Account Succsufully ! Login');
    }
  }
};
// 3. Show Modal
const showModal = () => {
  signUpModal.classList.remove('hide');
  signUpForm.classList.remove('hide');
  inputSignupUsername.focus();
};

// 3. Hide Modal
const hideModal = () => {
  signUpModal.classList.add('hide');
  signUpForm.classList.add('hide');
};

// 5 .addUserName
const addUserName = accounts => {
  accounts.forEach(acc => {
    acc.userName = acc.owner
      .split(' ')
      .map(name => name[0].toLowerCase())
      .join('');
  });
};

// 6. UpdateData
const updateData = () => {
  console.log(accounts);
  addUserName(accounts);
  localStorage.setItem('accounts', JSON.stringify(accounts));
};

// 7. Formated Dates
const formatedDates = (date, local) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();
  return new Intl.DateTimeFormat(local).format(date);
};

// 8. Formated Currency
const formatedCurrency = (curr, local, value) => {
  const options = {
    style: 'currency',
    currency: `${curr}`,
  };
  return new Intl.NumberFormat(local, options).format(value);
};

// 9.Display Transactions
const displayTransactions = account => {
  containerMovements.innerHTML = '';
  const transactions = account.movements;
  transactions.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // Display Dates
    const date = new Date(account.movementsDates[i]);
    const movDate = formatedDates(date, account.locale);

    // Display Currency
    const currMov = formatedCurrency(account.currency, account.locale, mov);
    const html = `<div class="movements__row">
  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  <div class="movements__date">${movDate}</div>
  <div class="movements__value">${currMov}</div>
</div>`;

    containerMovements.insertAdjacentHTML('beforeend', html);
  });
};

// 10.Display Summary
const displaySummary = account => {
  // Incom
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((curr, acc) => curr + acc, 0);
  labelSumIn.textContent = formatedCurrency(
    account.currency,
    account.locale,
    income
  );

  // Out
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((curr, acc) => curr + acc, 0);
  labelSumOut.textContent = formatedCurrency(
    account.currency,
    account.locale,
    out
  );

  // Interists
  const intersits = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(dep => dep > 1)
    .reduce((curr, acc) => curr + acc, 0);
  labelSumInterest.textContent = formatedCurrency(
    account.currency,
    account.locale,
    intersits
  );
};

// 11.Display Balance
const displayBalance = account => {
  const movments = account.movements;
  const balance = movments.reduce((curr, acc) => curr + acc, 0);
  account.balance = balance;
  labelBalance.textContent = formatedCurrency(
    account.currency,
    account.locale,
    balance
  );
};

// 12.LOGIN
const login = e => {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
    if (timer) clearInterval(timer);
    timer = logOutTimer();
    successMessage('Login Successful');
    lableSignup.classList.add('hide');
  } else errorMessage('UserName OR Password is Wrong');
};

// 13.Request Loan
const loan = e => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
      updateData();
      successMessage('Loan Sent Successful');
    }, 1000);
  }
  inputLoanAmount.value = '';
};

// 14.LOGOUT
const logout = e => {
  e.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    containerApp.style.opacity = 0;
    currentAccount = null;
    labelWelcome.textContent = 'Log in to get started';
    inputLoginUsername.focus();
    inputCloseUsername.value = '';
    inputClosePin.value = '';
    clearInterval(timer);
    lableSignup.classList.remove('hide');
  } else {
    errorMessage('UserName Or Password Wrong Please try again 😃');
    inputCloseUsername.value = '';
    inputClosePin.value = '';
  }
};

// 15.TRANSFER
const transfer = e => {
  e.preventDefault();
  if (currentAccount) {
    if (inputTransferTo.value) {
      if (
        inputTransferAmount.value > 0 &&
        currentAccount.balance > inputTransferAmount.value
      ) {
        transferAccount = accounts.find(
          account => account.userName === inputTransferTo.value
        );
        if (transferAccount.userName !== currentAccount.userName) {
          setTimeout(() => {
            transferAmount = +inputTransferAmount.value;
            transferAccount.movements.push(transferAmount);
            currentAccount.movements.push(-transferAmount);
            // Add Transfer Date
            transferAccount.movementsDates.push(new Date().toISOString());
            currentAccount.movementsDates.push(new Date().toISOString());
            updateUI(currentAccount);
            inputTransferAmount.value = '';
            inputTransferTo.value = '';
            successMessage('Transfer Sent Successful');
            updateData();
          }, 1000);
        } else errorMessage("You Can't Send Money To Yourself 😂");
      } else errorMessage('Enter Amount Transfer');
    } else errorMessage('Enter Account Transfer');
  } else {
    errorMessage('Please Login To Can Transfer');
  }
};

// 16.SORTING
const sorting = e => {
  e.preventDefault();
  if (currentAccount.movements.length > 0) {
    if (currentAccount.movements[0] > 0) {
      currentAccount.movements.sort((a, b) => a - b);
      updateUI(currentAccount);
    } else {
      currentAccount.movements.sort((a, b) => b - a);
      updateUI(currentAccount);
    }
  } else console.log('No Movements');
};

// 17.Update UI
const updateUI = account => {
  displayTransactions(account);
  displaySummary(account);
  displayBalance(account);
  displayDate();
};

// 18.Succes Message
const successMessage = text => {
  Toastify({
    text: `${text}`,
    className: 'info',
    duration: 2000,
    stopOnFocus: false,
  }).showToast();
};
// 19.Error Message
const errorMessage = text => {
  Toastify({
    text: `${text}`,
    className: 'warning',
    duration: 2000,
    stopOnFocus: false,
  }).showToast();
};

// 20.Display Date
const displayDate = () => {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    // weekday: 'long',
  };
  const local = navigator.language;
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
};

// 21.logOutTimer
const logOutTimer = () => {
  let time = 300;

  const tickTack = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      currentAccount = null;
      labelWelcome.textContent = 'Log in to get started';
      inputLoginUsername.focus();
      inputCloseUsername.value = '';
      inputClosePin.value = '';
      errorMessage('Logged Out');
      lableSignup.classList.remove('hide');
    }
    time--;
  };
  // set Time To 5 Min
  tickTack();
  // Call The Timer Every Second
  const timer = setInterval(tickTack, 1000);
  return timer;
};

getAllAccounts();

// EVENTS LISTNER
signUpBtn.addEventListener('click', showModal);
signUpModal.addEventListener('click', hideModal);
btnSignup.addEventListener('click', signUp);
btnLogin.addEventListener('click', login);
btnTransfer.addEventListener('click', transfer);
btnLoan.addEventListener('click', loan);
btnClose.addEventListener('click', logout);
btnSort.addEventListener('click', sorting);
