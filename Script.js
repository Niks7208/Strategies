const dateArray = ['24-Apr-2024','02-May-2024','09-May-2024','31-May-2024','21-Jun-2024'];

const strategyArray = [
  {
    'View': 'Bullish',
    'Value': {
      '24-Apr-2024': ['Bull Call Spread','Bull Put Spread','Bull Put Spread','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy1','Strategy1','SpreadStrategy','Bull Call Spread'],
      '02-May-2024': ['Bull Call Spread','Bull Call Spread','Bull Put Spread','Long Call','Long Call','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy2','Strategy1','Strategy2','Bull Call Spread'],
      '09-May-2024': ['Strategy Put','Strategy Call','Strategy Call','Strategy Call','Strategy Call','Strategy Put'],
    }
  },
  {
    'View': 'Bearish',
    'Value': {
      '24-Apr-2024': ['Bear Call Spread','Bear Call Spread','Bear Call Spread','Long Put','Long Put','Long Put','Bear Call Spread'],
      '31-May-2024': ['Long Put','Long Put','Long Put','Long Put','Long Put','Long Put'],
      '21-Jun-2024': ['Strategy3','Strategy3','Bear Put Spread','Strategy3','Long Put','Long Put'],
    }
  },
  {
    'View': 'RangeBound',
    'Value': {
      '24-Apr-2024': ['Short Straddle','Short Strangle','Short Strangle','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy1','Strategy1','SpreadStrategy','Short Straddle'],
      '02-May-2024': ['Short Straddle','Short Straddle','Short Strangle','Iron Butterfly','Iron Butterfly','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy2','Strategy1','Strategy2','Short Straddle'],
      '21-Jun-2024': ['Iron Condor','Iron Butterfly','Iron Butterfly','Iron Butterfly','Iron Condor'],
    }
  },
  {
    'View': 'Volatile',
    'Value': {
      '02-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy1','Strategy1','Spread-Strategy','Long Straddle'],
      '09-May-2024': ['Long Straddle','Long Straddle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy2','Strategy1','Strategy2','Long Straddle'],
      '31-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Strangle','Long Straddle'],
    }
  }
];

const viewToggle = document.getElementById("viewToggle");
const dateDropdown = document.getElementById("dateDropdown");
const strategyCards = document.getElementById("strategyCards");
const emptyState = document.getElementById("emptyState");

let selectedView = "Bullish";
let selectedDate = dateArray[0];

function renderDates() {
  dateArray.forEach(date => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    dateDropdown.appendChild(option);
  });
}

function renderCards() {
  strategyCards.innerHTML = "";
  emptyState.style.display = "none";

  const viewData = strategyArray.find(s => s.View === selectedView);
  const strategies = viewData?.Value[selectedDate] || [];

  if (strategies.length === 0) {
    emptyState.textContent = `No strategies available for ${selectedDate}`;
    emptyState.style.display = "block";
    return;
  }

  const countMap = {};
  strategies.forEach(strategy => {
    countMap[strategy] = (countMap[strategy] || 0) + 1;
  });

  for (const [strategy, count] of Object.entries(countMap)) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${strategy}</strong><br>${count} ${count > 1 ? 'Strategies' : 'Strategy'}`;
    strategyCards.appendChild(card);
  }
}

viewToggle.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-btn")) {
    [...viewToggle.children].forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
    selectedView = e.target.dataset.view;
    renderCards();
  }
});

dateDropdown.addEventListener("change", (e) => {
  selectedDate = e.target.value;
  renderCards();
});

renderDates();
renderCards();
