import { write } from "fs";

const msgEl = document.getElementById("msg");

const randNum = getRandomNumber();

console.log(`Number: ${randNum}`);

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    console.log(e);
    writeMessage(msg);
    checkNumber(msg);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener("result", onSpeak);
