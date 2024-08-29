let speech = new SpeechSynthesisUtterance();
let voices = [];

let voiceSelect = document.querySelector('select');
window.speechSynthesis.onvoiceschanged =()=>{
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0]; /* by default the devices will use the first voice on the list */

    /* below we write codes which will allow us to switch voices*/

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
}
/* the below codes allow us to select a different type of voice from the list*/
voiceSelect.addEventListener('change', ()=>{
  speech.voice = voices[voiceSelect.value];
});

/* the below codes allow us to listen to the speech by clicking on the listen button*/

document.querySelector('#listen').addEventListener('click', ()=>{
    speech.text = document.querySelector('textarea').value;
    window.speechSynthesis.speak(speech);
})


 /* the below code will allow us to control the speech, we could pause and resume */
document.querySelector('#pause').addEventListener('click',()=>{
    window.speechSynthesis.pause();
});  

document.querySelector('#resume').addEventListener('click',()=>{
  window.speechSynthesis.resume();
});  
/* the below codes are to clear the textarea */

document.querySelector('#clear').addEventListener('click', ()=>{
  document.querySelector('#textarea').value='';
})


