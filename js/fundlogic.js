let fundDatabase = [];

// Load fund data
fetch("js/fundData.json")
  .then(res => res.json())
  .then(data => {
    fundDatabase = data;
    console.log("✅ Fund data loaded:", fundDatabase.length);
  })
  .catch(err => {
    console.error("❌ Failed to load fund data:", err);
  });

// Handle form submission
document.getElementById("mf-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const risk = normalizeRisk(document.getElementById("risk").value.toLowerCase());
  const type = document.getElementById("type").value.toLowerCase();

  const suggestions = getFundSuggestions(risk, type);
  showSuggestions(suggestions);
});

// Normalize risk names
function normalizeRisk(riskValue) {
  if (riskValue === "medium") return "moderate";
  return riskValue;
}

// Get matching funds
function getFundSuggestions(risk, type) {
  const filtered = fundDatabase.filter(fund =>
    normalizeRisk(fund.risk.toLowerCase()) === risk &&
    fund.investment_type.map(t => t.toLowerCase()).includes(type)
  );

  // Shuffle and select top 5
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}

// Show suggestions in UI
function showSuggestions(funds) {
  const container = document.getElementById("suggestion-result");
  container.innerHTML = "";

  if (funds.length === 0) {
    container.innerHTML = `<p style="color:red;">❌ No matching funds found. Try changing risk or type.</p>`;
    return;
  }

  funds.forEach(fund => {
    const card = document.createElement("div");
    card.className = "fund-card";
    card.innerHTML = `
      <h3>${fund.fund_name}</h3>
      <p><strong>AMC:</strong> ${fund.amc}</p>
      <p><strong>Category:</strong> ${fund.category}</p>
      <p><strong>Plan:</strong> ${fund.plan}</p>
      <p><strong>Risk:</strong> ${fund.risk}</p>
      <p><strong>Investment Types:</strong> ${fund.investment_type.join(", ")}</p>
      <p><strong>Returns:</strong> 1Y: ${fund.returns["1yr"]}%, 3Y: ${fund.returns["3yr"]}%, 5Y: ${fund.returns["5yr"]}%</p>
      <p><strong>NAV:</strong> ₹${fund.nav}</p>
    `;
    container.appendChild(card);
  });
}
