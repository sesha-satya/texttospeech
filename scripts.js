document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const transcript = document.getElementById('transcript');
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert('Your browser does not support Speech Recognition.');
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    
    recognition.addEventListener('result', (event) => {
        let text = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
        }
        transcript.value = text;
    });
    
    startBtn.addEventListener('click', () => {
        recognition.start();
    });
    
    stopBtn.addEventListener('click', () => {
        recognition.stop();
    });
});