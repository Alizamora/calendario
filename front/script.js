const month = document.getElementById('month');
const numberDay = document.getElementById('numberDay');
const day = document.getElementById('day');
const eventsContainer = document.getElementById('eventsContainer');
const hourOfTheDay = document.getElementById('hourOfTheDay');
const timeOfTheDay = document.getElementById('timeOfTheDay');
const eventText = document.getElementById('eventText');
const btnEvent = document.getElementById('btnEvent');
const btnYearBefore = document.getElementById('btnYearBefore');
const year = document.getElementById('year');
const btnYearAfter = document.getElementById('btnYearAfter');
const months = document.getElementById('months');
const week = document.getElementById('week');
const days =document.getElementById('days');
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1;
let currentDay = currentDate.getDate();
let currentWeekDay = currentDate.getDay();

function setYear(year, element){
    element.innerText = year;
}

function change(number){
    return {
        year() {
            currentYear += number;
            setYear(currentYear, year);
        }
    };
}

setYear(currentYear, year);

btnYearBefore.addEventListener('click', change(-1).year);
btnYearAfter.addEventListener('click', change(1).year);