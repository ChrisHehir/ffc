const games = [
  { id: 1, opponent: "Southampton", date: "22nd Dec (Sunday)", time: "2:00 PM" },
  { id: 2, opponent: "Chelsea", date: "26th Dec (Thursday)", time: "3:00 PM" },
  { id: 3, opponent: "Bournemouth", date: "29th Dec (Sunday)", time: "3:00 PM" },
  { id: 4, opponent: "Ipswich", date: "5th Jan (Sunday)", time: "2:00 PM" },
  { id: 5, opponent: "West Ham", date: "14th Jan (Tuesday)", time: "7:30 PM" },
];

const rsvps = JSON.parse(localStorage.getItem("rsvps")) || {};

function saveRSVPs() {
  localStorage.setItem("rsvps", JSON.stringify(rsvps));
}

function renderMatches() {
  const matchesContainer = document.getElementById("matches");
  matchesContainer.innerHTML = "";

  games.forEach((game) => {
    const matchDiv = document.createElement("div");
    matchDiv.classList.add("match");

    matchDiv.innerHTML = `
      <h2>${game.opponent} - ${game.date} at ${game.time}</h2>
      <div>
        <button onclick="handleRSVP(${game.id}, 'yes')">Yes</button>
        <button onclick="handleRSVP(${game.id}, 'no')">No</button>
        <button onclick="handleRSVP(${game.id}, 'maybe')">Maybe</button>
      </div>
      <div>
        <h3>RSVP List:</h3>
        <ul id="yes-${game.id}"><strong>Yes:</strong></ul>
        <ul id="no-${game.id}"><strong>No:</strong></ul>
        <ul id="maybe-${game.id}"><strong>Maybe:</strong></ul>
      </div>
    `;

    matchesContainer.appendChild(matchDiv);
    renderRSVPs(game.id);
  });
}

function handleRSVP(matchId, response) {
  const name = prompt("Enter your name:");
  if (!name) return;

  if (!rsvps[matchId]) {
    rsvps[matchId] = { yes: [], no: [], maybe: [] };
  }

  // Remove the name from any existing category
  ["yes", "no", "maybe"].forEach((category) => {
    const index = rsvps[matchId][category].indexOf(name);
    if (index !== -1) rsvps[matchId][category].splice(index, 1);
  });

  // Add the name to the new category
  rsvps[matchId][response].push(name);

  saveRSVPs();
  renderRSVPs(matchId);
}

function renderRSVPs(matchId) {
  ["yes", "no", "maybe"].forEach((category) => {
    const list = document.getElementById(`${category}-${matchId}`);
    list.innerHTML = `<strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong>`;
    rsvps[matchId]?.[category]?.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      list.appendChild(li);
    });
  });
}

// Render the matches and RSVPs on page load
renderMatches();
