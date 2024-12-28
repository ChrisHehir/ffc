// Games data
const games = [
  { id: 1, title: "Fulham vs Bournemouth", date: "29th Dec, Sunday 3pm" },
  { id: 2, title: "Fulham vs Ipswich", date: "5th Jan, Sunday 2pm" },
  { id: 3, title: "Westham vs Fulham", date: "14th Jan, Tuesday 7:30pm" },
  { id: 4, title: "Leicester vs Fulham", date: "18th Jan, Saturday 3pm" },
  { id: 5, title: "Fulham vs Manchester United", date: "26th Jan, Sunday 7pm" },
  { id: 6, title: "Newcastle vs Fulham", date: "1st Feb, Saturday 3pm" },
  { id: 7, title: "Fulham vs Nottingham Forest", date: "15th Feb, Saturday 3pm" },
  { id: 8, title: "Fulham vs Crystal Palace", date: "22nd Feb, Saturday 3pm" },
];

// Persisting RSVP data
const rsvpData = JSON.parse(localStorage.getItem("rsvpData")) || {};

// Save data to localStorage
const saveData = () => {
  localStorage.setItem("rsvpData", JSON.stringify(rsvpData));
};

// Load games and RSVP sections
const loadGames = () => {
  const gamesContainer = document.getElementById("games");
  games.forEach((game) => {
    const gameSection = document.createElement("div");
    gameSection.classList.add("game");
    gameSection.innerHTML = `
      <h2>${game.title}</h2>
      <p>${game.date}</p>
      <div class="rsvp" data-game-id="${game.id}">
        <button onclick="handleRSVP(${game.id}, 'Yes')">Yes</button>
        <button onclick="handleRSVP(${game.id}, 'No')">No</button>
        <button onclick="handleRSVP(${game.id}, 'Maybe')">Maybe</button>
      </div>
      <div class="attendees" id="attendees-${game.id}">
        ${renderAttendees(game.id)}
      </div>
    `;
    gamesContainer.appendChild(gameSection);
  });
};

// Render attendees
const renderAttendees = (gameId) => {
  const attendees = rsvpData[gameId] || {};
  return Object.entries(attendees)
    .map(([name, status]) => `${name}: ${status}`)
    .join("<br>") || "No RSVPs yet.";
};

// Handle RSVP
const handleRSVP = (gameId, status) => {
  const name = prompt("Enter your name:");
  if (!name) return;
  if (!rsvpData[gameId]) rsvpData[gameId] = {};
  rsvpData[gameId][name] = status;
  saveData();
  document.getElementById(`attendees-${gameId}`).innerHTML = renderAttendees(gameId);
};

// Load games on page load
document.addEventListener("DOMContentLoaded", loadGames);
