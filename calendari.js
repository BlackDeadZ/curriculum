// Eventos de ejemplo (pueden ser cargados desde una fuente de datos externa)
const events = [
    { date: new Date(2024, 0, 5), title: 'Evento 1' },
    { date: new Date(2024, 0, 15), title: 'Evento 2' },
    { date: new Date(2024, 0, 25), title: 'Evento 3' }
];

// Función para obtener los días de un mes y año específicos
function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

// Función para generar el calendario
function generateCalendar(month, year) {
    const calendarBody = document.getElementById('calendar-body');
    const monthYearCaption = document.getElementById('month-year');
    monthYearCaption.textContent = `${getMonthName(month)} ${year}`;

    // Limpiar el contenido existente del calendario
    calendarBody.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = getDaysInMonth(month, year);

    let dayCount = 1;

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            const eventDot = document.createElement('div');

            if (i === 0 && j < firstDay) {
                // Celdas vacías antes del primer día del mes
                cell.textContent = '';
                cell.classList.add('disabled');
            } else if (dayCount > totalDays) {
                // Celdas vacías después del último día del mes
                cell.textContent = '';
                cell.classList.add('disabled');
            } else {
                cell.textContent = dayCount;
                cell.addEventListener('click', () => handleDayClick(dayCount, month, year));
                dayCount++;

                // Mostrar puntos para eventos en el día
                const dayEvents = events.filter(event =>
                    event.date.getDate() === dayCount &&
                    event.date.getMonth() === month &&
                    event.date.getFullYear() === year
                );

                dayEvents.forEach(event => {
                    const dot = eventDot.cloneNode(true);
                    dot.title = event.title;
                    cell.appendChild(dot);
                });
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

// Función para manejar el clic en un día (puedes personalizar esta función)
function handleDayClick(day, month, year) {
    alert(`Día ${day} clickeado en ${getMonthName(month)} ${year}`);
}

// Función para obtener el nombre del mes según el número del mes
function getMonthName(month) {
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril',
        'Mayo', 'Junio', 'Julio', 'Agosto',
        'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[month];
}

// Función para cambiar el mes
function changeMonth(offset) {
    currentMonth += offset;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

// Obtener la fecha actual
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Generar el calendario con el mes actual
generateCalendar(currentMonth, currentYear);