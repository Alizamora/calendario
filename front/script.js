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
const days = document.getElementById('days');
const weekDays = [...week.children].map(li => li.title);
const allMonths = [...months.children].map(li => li.title);
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1;
let currentDay = currentDate.getDate();
let currentWeekDay = currentDate.getDay();

function setYear(year, element) {
	element.innerText = year;
}

function change(number) {
	return {
		year() {
			currentYear += number;
			setYear(currentYear, year);
			displayDays(setDays(currentYear, currentMonth), days);
			changeCalendarDay(selectByDate(`${currentMonth}-${currentDay}-${currentYear}`));
		}
	};
}

function setDays(oldYear, oldMonth) {
	oldMonth--;
	const allDays = [];
	let newMonth = oldMonth;
	let firstDay;

	for (let i = 1; i < 32; i++) {
		const format = `${oldMonth + 1}-${i}-${oldYear}`;
		const newDate = new Date(format);
		const newDay = newDate.getDay();
		newMonth = newDate.getMonth();

		if (oldMonth !== newMonth) break;
		if (i === 1) firstDay = newDay;

		allDays.push({
			format,
			monthDay: i,
			weekDay: weekDays[newDay]
		});
	}
	return { firstDay, weekDays, month: allMonths[oldMonth], oldYear, allDays };
}

function displayDays(daysObject, container) {
	const { firstDay, allDays } = daysObject;
	container.innerHTML = '';
	for (let i = 0, j = 0; i < 42; i++) {
		const li = document.createElement('LI');
		if (i >= firstDay && j + 1 <= allDays.length){
			li.innerText = j + 1;
			li.title = allDays[j].format;
			li.setAttribute('weekDay', allDays[j].weekDay);
			j++;
		}
		container.appendChild(li);
	}
}

function setMonth(target) {
	const li = target;
	month.innerHTML = li.title;
	currentMonth = allMonths.indexOf(li.title) + 1;
	displayDays(setDays(currentYear, currentMonth), days);
	changeCalendarDay(selectByDate(`${currentMonth}-${currentDay}-${currentYear}`));
}

function changeCalendarDay(target) {
	const li = target;
	const targetWeekDay = li.getAttribute('weekDay');
	const targetDay = li.title.split('-')[1];

	selectWeekDay(targetWeekDay);

	day.innerText = targetWeekDay;
	numberDay.innerText = targetDay;
	currentDay = targetDay;
}

function selectWeekDay(targetWeekDay) {
	const selected = [...week.children].filter(weekChild => {
		weekChild.removeAttribute('selected');
		return weekChild.title === targetWeekDay;
	})[0];
	selected.setAttribute('selected', '');
}

function selectByDate(date) {
	return [...days.children].filter(mDay => mDay.title === date)[0];
}

function fechMonth(month, year){
	fetch('https://localhost:1996');
	
}

displayDays(setDays(currentYear, currentMonth), days);
setYear(currentYear, year);
setMonth({title: allMonths[currentMonth - 1]});
changeCalendarDay(selectByDate(`${currentMonth}-${currentDay}-${currentYear}`));

btnYearBefore.addEventListener('click', change(-1).year);
btnYearAfter.addEventListener('click', change(1).year);

months.addEventListener('click', (event) => {
	if (event.target.tagName === 'LI') {
		setMonth(event.target);
	}
});

days.addEventListener('click', (event) => {
	if (event.target.tagName === 'LI') {
		changeCalendarDay(event.target);
	}
});
