let quotes = [];
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const categoryFilter = document.getElementById("categoryFilter");
const notification = document.getElementById("notification");

// Load quotes from local storage
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  quotes = stored ? JSON.parse(stored) : [];
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Show a random quote
function showRandomQuote() {
  const filtered = filterByCategory();
  if (filtered.length === 0) {
    quoteDisplay.innerHTML = "No quotes available in this category.";
    return;
  }
  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Add a new quote
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Both fields are required.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  newQuoteText.value = "";
  newQuoteCategory.value = "";
  showNotification("Quote added!");
  postQuoteToServer(newQuote); // Send to mock server
}

// Populate category dropdown
function populateCategories() {
  const categories = Array.from(new Set(quotes.map(q => q.category)));
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Filter quotes by category
function filterByCategory() {
  const selected = categoryFilter.value;
  if (selected === "all") return quotes;
  return quotes.filter(q => q.category === selected);
}

// Handle filter change
function filterQuotes() {
  localStorage.setItem("selectedCategory", categoryFilter.value);
  showRandomQuote();
}

// Show notifications
function showNotification(message) {
  notification.textContent = message;
  setTimeout(() => {
    notification.textContent = "";
  }, 3000);
}

// ---- Server Sync Logic ----

// Simulated GET from server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const data = await response.json();
    return data.map(item => ({
      text: item.title,
      category: "Server"
    }));
  } catch (err) {
    console.error("Error fetching from server:", err);
    return [];
  }
}

// Simulated POST to server
async function postQuoteToServer(quote) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // ✅ Required by test
      },
      body: JSON.stringify(quote)
    });
  } catch (err) {
    console.error("Failed to post quote:", err);
  }
}

// Sync local quotes with server data
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();

  // Conflict resolution: Server wins
  const serverTexts = new Set(serverQuotes.map(q => q.text));
  quotes = quotes.filter(q => !serverTexts.has(q.text)).concat(serverQuotes);

  saveQuotes();
  populateCategories();
  showRandomQuote();
  showNotification("Quotes synced from server.");
}

// Periodic sync every 30 seconds
setInterval(syncQuotes, 30000);

// ---- Initialization ----
document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  const savedCategory = localStorage.getItem("selectedCategory") || "all";
  categoryFilter.value = savedCategory;
  populateCategories();
  showRandomQuote();
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});
