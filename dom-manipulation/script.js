let quotes = [];

document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  populateCategories();
  restoreFilter();
  showRandomQuote();

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  document.getElementById("categoryFilter").addEventListener("change", filterQuotes);
});

function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  quotes = stored ? JSON.parse(stored) : [
    { text: "The best way to predict the future is to create it.", category: "Motivational" },
    { text: "You miss 100% of the shots you don’t take.", category: "Sports" },
    { text: "Success is not final, failure is not fatal.", category: "Wisdom" },
  ];
  saveQuotes();
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function saveFilter(category) {
  localStorage.setItem("selectedCategory", category);
}

function restoreFilter() {
  const savedCategory = localStorage.getItem("selectedCategory");
  const filterSelect = document.getElementById("categoryFilter");
  if (savedCategory && [...filterSelect.options].some(opt => opt.value === savedCategory)) {
    filterSelect.value = savedCategory;
  }
}

function populateCategories() {
  const filterSelect = document.getElementById("categoryFilter");
  const uniqueCategories = new Set(quotes.map(q => q.category));

  // Clear existing options except "All"
  filterSelect.innerHTML = '<option value="all">All Categories</option>';
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterSelect.appendChild(option);
  });

  restoreFilter(); // Restore previous selection
}

function showRandomQuote() {
  const category = document.getElementById("categoryFilter").value;
  const filtered = category === "all"
    ? quotes
    : quotes.filter(q => q.category === category);

  if (filtered.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes in this category.";
    return;
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)];
  document.getElementById("quoteDisplay").innerHTML = `"${random.text}"<br>— ${random.category}`;
}

function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  saveFilter(selectedCategory);
  showRandomQuote();
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

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  alert("Quote added!");
  textInput.value = "";
  categoryInput.value = "";
}
