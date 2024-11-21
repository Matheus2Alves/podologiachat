import { pedidoCliente } from "./chat.js";

console.log('VBAMOS');

async function waitForCondition() {
    // Wait until isOkay is true
    while (!pedidoCliente.isOkay) {
        console.log('Waiting for isOkay to be true...');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Check every 1 second
    }


    console.log('ueueueu');

    let ano = '2024'
    let day = pedidoCliente.dia
    let mes = pedidoCliente.mes
    let titulo = pedidoCliente.nome
    let servico = pedidoCliente.servico + ' às ' + pedidoCliente.hora

    console.log(titulo)

    console.log('CONSEGUI');
    await createEvent(
        ano,
        mes,
        day,
        servico,
        titulo
    );
}

waitForCondition();


let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const yearSelect = document.getElementById('yearSelect');
const monthSelect = document.getElementById('monthSelect');
const daySelect = document.getElementById('daySelect');
const timeSelect = document.getElementById('timeSelect');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function populateYearOptions() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i <= currentYear + 10; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

function populateDayOptions() {
    const selectedMonth = monthSelect.value;
    const selectedYear = yearSelect.value;
    const daysInMonth = new Date(selectedYear, parseInt(selectedMonth) + 1, 0).getDate();
    daySelect.innerHTML = '';
    for (let i = 1; i <= daysInMonth; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
}

async function createEvent(selectedYear, selectedMonth, selectedDay, selectedTime, eventTitle) {
    if (eventTitle && selectedTime) {
        const eventDate = `${parseInt(selectedMonth) + 1}/${selectedDay}/${selectedYear}`;
        const eventDateTime = `${eventDate} ${selectedTime}`;

        events.push({
            date: eventDate,
            time: selectedTime,
            title: eventTitle,
        });

        localStorage.setItem('events', JSON.stringify(events));
        load(); // Refresh the calendar to show the new event
    } else {
        eventTitleInput.classList.add('error');
    }
}

function openModal(date) {
    clicked = date;
    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
}

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = 
        `${dt.toLocaleDateString('pt-br', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e => e.date === dayString);

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = `${eventForDay.title}  ${eventForDay.time}`;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);    
    }
}

function closeModal() {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}

async function saveEvent() {
    await createEvent(
        yearSelect.value,
        monthSelect.value,
        daySelect.value,
        timeSelect.value,
        eventTitleInput.value
    );
    closeModal();
}

function deleteEvent() {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
    
    document.getElementById('createEventButton').addEventListener('click', saveEvent);
    yearSelect.addEventListener('change', populateDayOptions);
    monthSelect.addEventListener('change', populateDayOptions);
}

populateYearOptions();
populateDayOptions();
initButtons();
load();
