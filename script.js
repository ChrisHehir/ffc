body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    color: #000000;
}

header {
    background-color: #cc0000;
    color: #ffffff;
    text-align: center;
    padding: 1em;
}

h1, h2 {
    margin: 0.5em 0;
}

main {
    padding: 1em;
}

#match-list li {
    margin: 0.5em 0;
    padding: 0.5em;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
    list-style: none;
}

form {
    display: flex;
    flex-direction: column;
}

label, input, select, button {
    margin: 0.5em 0;
}

button {
    background-color: #cc0000;
    color: #ffffff;
    border: none;
    padding: 0.5em;
    cursor: pointer;
}

button:hover {
    background-color: #990000;
}

#attendance-summary {
    margin-top: 1em;
    padding: 1em;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
}
```

**script.js**:
```javascript
// Match data
const matches = [
    { date: 'Thursday 5th December', opponents: 'Brighton', time: '19:30' },
    { date: 'Sunday 8th December', opponents: 'Arsenal', time: '14:00' },
    { date: 'Saturday 14th December', opponents: 'Liverpool', time: '15:00' },
    { date: 'Sunday 22nd December', opponents: 'Southampton', time: '14:00' },
    { date: 'Thursday 26th December', opponents: 'Chelsea', time: '15:00' }
];

const matchList = document.getElementById('match-list');
const rsvpForm = document.getElementById('rsvp-form');
const attendanceSummary = document.getElementById('attendance-summary');

// Populate match list
matches.forEach(match => {
    const li = document.createElement('li');
    li.textContent = `${match.date} - Fulham vs ${match.opponents} (${match.time})`;
    matchList.appendChild(li);
});

// RSVP persistence
let rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];

function updateAttendanceSummary() {
    attendanceSummary.innerHTML = '';
    ['yes', 'no', 'maybe'].forEach(status => {
        const names = rsvps.filter(rsvp => rsvp.status === status).map(rsvp => rsvp.name);
        if (names.length > 0) {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${status.toUpperCase()}:</strong> ${names.join(', ')}`;
            attendanceSummary.appendChild(div);
        }
    });
}

rsvpForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const status = document.getElementById('status').value;

    if (name) {
        // Remove duplicate entries
        rsvps = rsvps.filter(rsvp => rsvp.name !== name);
        rsvps.push({ name, status });
        localStorage.setItem('rsvps', JSON.stringify(rsvps));
        updateAttendanceSummary();
        rsvpForm.reset();
    }
});

updateAttendanceSummary();
```

