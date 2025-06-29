let quotes = [];

document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  populateCategories();
  restoreFilter();
  showRandomQuote();
  setInterval(syncQuotes, 10000); // Check server every 10 seconds

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
      { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Inspirational" },
      { text: "The best way to predict the future is to create it.", category: "Wisdom" },
      { text: "You miss 100% of the shots you don’t take.", category: "Sports" },
      { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Leadership" }
    ];
    saveQuotes();
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes found in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    showNotification("Quote added!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both quote and category.");
  }
}

function populateCategories() {
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  const select = document.getElementById("categoryFilter");

  select.innerHTML = categories.map(cat => 
    `<option value="${cat}">${cat}</option>`).join("");

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    select.value = savedFilter;
  }
}

function filterQuotes() {
  const category = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", category);
  showRandomQuote();
}

function restoreFilter() {
  const saved = localStorage.getItem("selectedCategory");
  if (saved) {
    document.getElementById("categoryFilter").value = saved;
  }
}

function exportQuotes() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        showNotification("Quotes imported successfully!");
      } else {
        alert("Invalid format in JSON file.");
      }
    } catch {
      alert("Error reading file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

async function fetchQuotesFromServer() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data.slice(0, 5).map(post => ({
    text: post.title,
    category: "Server"
  }));
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();

  const serverTexts = new Set(serverQuotes.map(q => q.text));
  quotes = quotes.filter(q => !serverTexts.has(q.text)).concat(serverQuotes);

  saveQuotes();
  populateCategories();
  showRandomQuote();
  showNotification("Quotes synced with server!");
}
