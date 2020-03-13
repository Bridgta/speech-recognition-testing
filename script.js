const msgEl = document.getElementById("msg");

const randNum = getRandomNumber();

console.log(`Number: ${randNum}`);

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    // console.log(e);
    writeMessage(msg);
    checkNumber(msg);
}

function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span> 
    `;
}

function checkNumber(msg) {
    const num = +msg;
    if (Number.isNaN(num)) {
        msgEl.innerHTML += `<div>That aint no number Ive eva seen</div>`;
        return;
    }
    if (num > 100 || num < 1) {
        msgEl.innerHTML = `<div>Number must be between 1 and 100</div>`;
        return;
    }
    if (num === randNum) {
        document.body.innerHTML = `<h1> Niceeee..that was the one <br></br> It was ${num}!</h2>
        <button class="play-again" id="play-again">Play Again </button>
        `;
    } else if (num > randNum) {
        msgEl.innerHTML += `<div> Try less</div>`;
    } else {
        msgEl.innerHTML += `<div> Aim for more</div>`;
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener("result", onSpeak);

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", e => {
    if (e.target.id == "play-again") {
        window.location.reload();
    }
});
