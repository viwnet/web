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

        // Horas objetivo para mostrar el botón (13:15 a 19:30)
        const startHour = 6; // 6 AM
        const startMinute = 30; // 6:30 AM
        const endHour = 12;   // 12 PM
        const endMinute = 30; // 12:30 PM

        if (
            (now.getHours() > startHour || (now.getHours() === startHour && now.getMinutes() >= startMinute)) &&
            (now.getHours() < endHour || (now.getHours() === endHour && now.getMinutes() <= endMinute))
        ) {
            specialButton.style.display = 'block'; // Mostrar el botón entre 1:15 PM y 7:30 PM
        } else {
            specialButton.style.display = 'none'; // Ocultar fuera del rango de horas
        }
    }

    setInterval(updateTimer, 1000); // Actualiza cada segundo
}

window.onload = startTimer;
