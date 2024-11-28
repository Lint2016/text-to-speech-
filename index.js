let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector('select');
let rateInput = document.querySelector('#rate');
let pitchInput = document.querySelector('#pitch');
let rateValue = document.querySelector('#rate-value');
let pitchValue = document.querySelector('#pitch-value');
const loadingIndicator = document.getElementById('loading-indicator');
const waveformContainer = document.getElementById('waveform-container');

// Initialize speech settings
speech.rate = 1;
speech.pitch = 1;

// Update rate and pitch values
rateInput.addEventListener('input', () => {
    speech.rate = rateInput.value;
    rateValue.textContent = rateInput.value;
});

pitchInput.addEventListener('input', () => {
    speech.pitch = pitchInput.value;
    pitchValue.textContent = pitchInput.value;
});

// Initialize speech synthesis
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => {
        if(voice.lang.includes('en')) {
            voiceSelect.selectedIndex = i;
            speech.voice = voice;
        }
        voiceSelect.options[i] = new Option(voice.name, i);
    });
};

// Voice selection
voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value];
});

// Speech events
speech.onstart = () => {
    waveformContainer.classList.remove('hidden');
};

speech.onend = () => {
    waveformContainer.classList.add('hidden');
};

speech.onerror = () => {
    waveformContainer.classList.add('hidden');
    loadingIndicator.classList.add('hidden');
};

// Listen button
document.querySelector('#listen').addEventListener('click', () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    
    const text = document.querySelector('textarea').value;
    if (!text) return;

    // Show loading for longer texts
    if (text.length > 100) {
        loadingIndicator.classList.remove('hidden');
        setTimeout(() => loadingIndicator.classList.add('hidden'), 1000);
    }

    speech.text = text;
    window.speechSynthesis.speak(speech);
});

// Pause button
document.querySelector('#pause').addEventListener('click', () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        waveformContainer.classList.add('hidden');
    }
});

// Resume button
document.querySelector('#resume').addEventListener('click', () => {
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        waveformContainer.classList.remove('hidden');
    }
});

// Clear button
document.querySelector('#clear').addEventListener('click', () => {
    document.querySelector('#textarea').value = '';
    window.speechSynthesis.cancel();
    waveformContainer.classList.add('hidden');
    loadingIndicator.classList.add('hidden');
});
