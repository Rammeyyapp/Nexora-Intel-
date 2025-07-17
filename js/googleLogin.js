let userEmail = null;
let userName = null;
let userLoggedIn = false;

// This runs after Google login
function onSignIn(response) {
  const userObject = jwt_decode(response.credential); // needs jwt-decode script
  userEmail = userObject.email;
  userName = userObject.name;
  userLoggedIn = true;
  // Show welcome message
  document.getElementById("user-welcome").innerText = `👋 Welcome, ${userName}`;
  document.getElementById("user-welcome").style.display = "block";


  // Hide sign-in button
  document.querySelector('.g_id_signin').style.display = 'none';

  // Show welcome (optional)
  const welcomeMsg = document.getElementById("user-welcome");
  if (welcomeMsg) {
    welcomeMsg.textContent = `👋 Welcome, ${userName}`;
    welcomeMsg.style.display = "block";
  }

  // Save to Google Sheet
  fetch("https://script.google.com/macros/s/AKfycbzSzVSUul1gtkupcdet4tAipj5_WanOidFC6pyYmphczq6afblFRnXoheHrS4h_zblK/exec", {
    method: "POST",
    body: JSON.stringify({ email: userEmail, name: userName }),
    headers: { "Content-Type": "application/json" }
  })
  .then(() => alert("Welcome to Nexora, " + userName))
  .catch(() => alert("Login failed to record."));
}
document.getElementById("mf-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const goal = document.getElementById("goal").value;
  const risk = document.getElementById("risk").value;
  const duration = parseInt(document.getElementById("duration").value);
  const type = document.getElementById("type").value;

  const suggestions = getFundSuggestions(age, goal, risk, duration, type);
  showSuggestions(suggestions);
});
