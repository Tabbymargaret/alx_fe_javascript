let quotes = [];

document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  populateCategories();
  restoreFilter();
  showRandomQuote();
  setupEventListeners();
  startServerSync(); // periodic sync with mock server
});

function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  quotes = stored ? JSON.parse(stored) : [
    { text: "Success is not final, failure is not fatal.", category: "Wisdom" }
  ];
  saveQuotes();
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function setupEventListeners() {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  document.getElementById("categoryFilter").addEventListener("change", filterQuotes);
}

function showRandomQuote() {
  const category = document.getElementById("categoryFilter").value;
  const filtered = category === "all" ? quotes : quotes.filter(q => q.category === category);
  const display = document.getElementById("quoteDisplay");

  if (filtered.length === 0) {
    display.textContent = "No quotes in this category.";
    return;
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)];
  display.innerHTML = `"${random.text}"<br>— ${random.category}`;
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  alert("Quote added!");
  textInput.value = "";
  categoryInput.value = "";
}

function populateCategories() {
  const filter = document.getElementById("categoryFilter");
  const unique = [...new Set(quotes.map(q => q.category))];
  filter.innerHTML = '<option value="all">All Categories</option>';
  unique.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filter.appendChild(option);
  });
  restoreFilter();
}

function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);
  showRandomQuote();
}

function restoreFilter() {
  const saved = localStorage.getItem("selectedCategory");
  const filter = document.getElementById("categoryFilter");
  if (saved && [...filter.options].some(opt => opt.value === saved)) {
    filter.value = saved;
  }
}

function startServerSync() {
  // Every 20 seconds, simulate fetching from "server"
  setInterval(() => {
    simulateServerFetch();
  }, 20000);
}

function simulateServerFetch() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(serverData => {
      const serverQuotes = serverData.slice(0, 5).map(post => ({
        text: post.title,
        category: "Server"
      }));

      const newQuotes = serverQuotes.filter(sq => !quotes.some(lq => lq.text === sq.text));
      if (newQuotes.length > 0) {
        quotes = [...quotes, ...newQuotes];
        saveQuotes();
        populateCategories();
        notifyUser(`${newQuotes.length} new quotes synced from server.`);
      }
    })
    .catch(() => {
      notifyUser("Failed to sync with server.");
    });
}

function notifyUser(message) {
  const notify = document.getElementById("notifications");
  notify.textContent = message;
  setTimeout(() => {
    notify.textContent = "";
  }, 5000);
}
