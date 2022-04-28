const runner = document.querySelectorAll('.item');
const btn = document.querySelector('.btn');
const homeArea = document.querySelector('.center');
const aboutArea = document.querySelector('.center__about');
const projectArea = document.querySelector('.center__projects');
const quoteText = document.querySelector('#quoteText');
const quoteAuthor = document.querySelector('#quoteAuthor');
const contactArea = document.querySelector('.contact-form');


const quoteFunction = function () {
  fetch('/getQuote').then((response) => {
    response.json().then((data) => {
      if (data.error) {
        quoteText.textContent = 'Quotesy Error';
      } else {
        quoteText.textContent = `"${data.text}"`;
        quoteAuthor.textContent = `-${data.author}`;
      }
    });
  });
};

const sendEmail =  function (mail) {
    fetch('/contactMe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mail),
  }).then((response) => {
    if(!response.ok) {
      console.log('error in POST');
    } else { 

    }
  })
};

quoteFunction();

const selector = function (e) {
  e.preventDefault();
  // console.log(this);
  if (!e.target.closest('.item')) {
    return console.log('Null Sector');
  } else {
    const targetItem = e.target.closest('.item').innerHTML;

    if (targetItem === 'Home') {
      homeArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (targetItem === 'About') {
      aboutArea.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (targetItem === 'Projects') {
      projectArea.scrollIntoView({ behavior: 'smooth', block: 'start',});
    } else if (targetItem === 'Contact Me Now!') {
      // contactForm.classList.toggle('contact-form__hidden');
      console.log('Email button');
      contactArea.scrollIntoView({behavior: 'smooth', block: 'start'});
      // sendEmail();
    }
  }
};

btn.addEventListener('click', function(e) {
  e.preventDefault();
  const nameData = document.querySelector('.contact-form__submission--name').value;
  const emailData = document.querySelector('.contact-form__submission--email').value;
  const textData = document.querySelector('.contact-form__submission--body').value;
  const sendData = {
    name : nameData,
    email : emailData,
    body : textData
  };

  if(!nameData || !emailData || !textData) {
    alert('Please fill out all data fields!')
  } else {
    sendEmail(sendData);
    alert('Email sent succesfully! 😊');
  }
})

runner.forEach((item) => {
  item.addEventListener('click', selector);
});

const start = () => {
  console.log('Started!');
};

start();
