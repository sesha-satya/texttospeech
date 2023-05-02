document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const transcript = document.getElementById('transcript');
    const saveBtn = document.getElementById('save-btn');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert('Your browser does not support Speech Recognition.');
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    recognition.addEventListener('result', (event) => {
        const text = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');

        transcript.value = text;
    });

    recognition.addEventListener('end', () => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    startBtn.addEventListener('click', () => {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });

    stopBtn.addEventListener('click', () => {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    saveBtn.addEventListener('click', () => {
        const text = transcript.value;
        if (!text) {
            alert('No text to save.');
            return;
        }

        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'transcription.txt';
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
});