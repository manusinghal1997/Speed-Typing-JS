const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer')

/// get the new quote from api 
function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json()) 
        .then(data => data.content);
}

// render new quote when page loads or user type the correct sentense and set input field empty.
// start the timer

async function renderNewQuote(){
    const quote = await getRandomQuote();
    console.log(quote);

    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);    
    });
   quoteInputElement.value = null;
   startTimer();
}


// this will trigger when someone types in input field and it will change the
// color of the text as geen or red 
// and if user typed all the text new text will be loaded and set input field as empty 
quoteInputElement.addEventListener('input', () => {
    console.log("clicking")
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];

        if(character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;             
        }
        else if(character == characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');    
        }
        else{
            characterSpan.classList.remove('correct');            
            characterSpan.classList.add('incorrect');
            correct = false;             
        }
    });
    if(correct) renderNewQuote();
});

let startTime;


// start the timer get the system time when game start and find the difference every d
// second with the ccurrent time in seconds

function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
       timerElement.innerText = getTimerTime();
    }, 1000);
}
// divide it by 1000 to convert mili seconds to seconds
function getTimerTime() {
    return Math.floor((new Date() - startTime)/1000);
}



renderNewQuote();
