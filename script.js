// Seleccionamos el texto
const textElement = document.getElementById('animated-text');
const text = textElement.textContent;
const letters = text.split('');

// Limpiamos el contenido y envolvemos cada letra en un <span>
textElement.textContent = '';
letters.forEach(letter => {
    const span = document.createElement('span');
    span.textContent = letter;
    textElement.appendChild(span);
});

// Función para aplicar el efecto de cortina de tres letras
function changeColor() {
    const spans = textElement.querySelectorAll('span');
    let currentIndex = 0; // Empezamos por la primera letra

    const interval = setInterval(() => {
        // Primero, restauramos todas las letras a su color original (sin clase)
        spans.forEach(span => span.className = '');

        // Aplicamos color rojo a las tres letras actuales
        for (let i = currentIndex; i < currentIndex + 3 && i < spans.length; i++) {
            spans[i].classList.add('color-red1');
        }

        // Mover la "ventana" de tres letras hacia la derecha
        currentIndex++;

        // Si llegamos al final, reiniciamos desde el principio
        if (currentIndex >= spans.length) {
            currentIndex = 0;
        }
    }, 150); // Ajusta la velocidad del efecto
}

// Función para iniciar el cronómetro
function startTimer() {
    const startDate = new Date("2024-09-22T15:10:00"); // Fecha de inicio
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const specialButton = document.getElementById('special-button'); // Botón especial

    function updateTimer() {
        const now = new Date();
        const elapsedTime = Math.floor((now - startDate) / 1000); // Tiempo en segundos desde la fecha de inicio

        let days = Math.floor(elapsedTime / 86400);
        let hours = Math.floor((elapsedTime % 86400) / 3600);
        let minutes = Math.floor((elapsedTime % 3600) / 60);
        let seconds = elapsedTime % 60;

        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');

        // Horas objetivo para mostrar el botón (9:15 a 3:30)
        const startHour = 9; // 9 AM
        const startMinute = 15; // 9:15 AM
        const endHour = 15;   // 3 PM
        const endMinute = 30; // 3:30 PM

        if (
            (now.getHours() > startHour || (now.getHours() === startHour && now.getMinutes() >= startMinute)) &&
            (now.getHours() < endHour || (now.getHours() === endHour && now.getMinutes() <= endMinute))
        ) {
            specialButton.style.display = 'block'; // Mostrar el botón entre 9:15 AM y 3:30 PM
        } else {
            specialButton.style.display = 'none'; // Ocultar fuera del rango de horas
        }
    }

    setInterval(updateTimer, 1000); // Actualiza cada segundo
}

// Función para calcular el ping
function calculatePing() {
    const startTime = Date.now();
    const imageUrl = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"; // URL válida para hacer ping

    fetch(imageUrl, { mode: 'no-cors' }) // Usamos 'no-cors' para evitar problemas con políticas de CORS
        .then(() => {
            const endTime = Date.now();
            let ping = endTime - startTime;

            // Limitar el valor del ping a un máximo de 999 ms
            ping = Math.min(Math.round(ping), 999);

            // Mostrar el ping en la página
            document.getElementById('ping').textContent = `Ping: ${ping} ms`;
        })
        .catch(() => {
            document.getElementById('ping').textContent = "Ping: Error al calcular.";
        });
}

// Ejecutar la función de ping al cargar la página y luego cada 3 segundos
window.onload = () => {
    changeColor();
    startTimer();
    calculatePing(); // Llamada inicial
    setInterval(calculatePing, 300); // Calcular ping cada 3 segundos
};