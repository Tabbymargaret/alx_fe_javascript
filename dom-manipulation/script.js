let quotes = [];

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

async function initApp() {
  loadQuotesFromLocalStorage();
  populateCategories();
  restoreFilter();
  showRandomQuote();
  setupEventListeners();
  await syncQuotes(); // sync on load
  setInterval(syncQuotes, 20000); // sync every 20 seconds
}

function loadQuotesFromLocalStorage() {
  const stored = localStorage.getItem("quotes");
  quotes = stored ? JSON.parse(stored) : [];
  if (quotes.length === 0) {
    quotes = [
      { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
      { text: "This too shall pass.", category: "Wisdom" }
    ];
    saveQuotesToLocalStorage();
  }
}

function saveQuotesToLocalStorage() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function setupEventListeners() {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", async () => {
    await addQuote();
  });
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

async function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotesToLocalStorage();
  populateCategories();
  showRandomQuote();
  textInput.value = "";
  categoryInput.value = "";

  await postQuoteToServer(newQuote); // POST new quote
  notify("Quote added and synced to server.");
}

function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  select.innerHTML = '<option value="all">All Categories</option>';
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
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

async function syncQuotes() {
  try {
    const serverQuotes = await fetchQuotesFromServer();

    let newCount = 0;
    for (const quote of serverQuotes) {
      if (!quotes.some(q => q.text === quote.text)) {
        quotes.push(quote);
        newCount++;
      }
    }

    if (newCount > 0) {
      saveQuotesToLocalStorage();
      populateCategories();
      notify(`${newCount} new quote(s) synced from server.`);
    }
  } catch (err) {
    notify("Failed to sync quotes from server.");
    console.error(err);
  }
}

async function fetchQuotesFromServer() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const data = await response.json();
  return data.map(post => ({
    text: post.title,
    category: "Server"
  }));
}

async function postQuoteToServer(quote) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(quote),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  } catch (err) {
    console.warn("Failed to post quote to server.");
  }
}

function notify(message) {
  const notification = document.getElementById("notifications");
  notification.textContent = message;
  setTimeout(() => {
    notification.textContent = "";
  }, 4000);
}
