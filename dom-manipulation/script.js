// Load quotes from localStorage or initialize with default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Inspirational" },
  { text: "The best way to predict the future is to create it.", category: "Wisdom" },
  { text: "You miss 100% of the shots you don’t take.", category: "Sports" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Leadership" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("newQuoteText");
const categoryInput = document.getElementById("newQuoteCategory");
const showBtn = document.getElementById("newQuote");

// Save quotes array to localStorage
function saveQuotesToLocalStorage() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `"${quote.text}" — <em>${quote.category}</em>`;
}

function addQuote() {
  const text = quoteInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please fill in both quote and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotesToLocalStorage(); // Save updated array to localStorage

  alert("Quote added successfully!");

  quoteInput.value = "";
  categoryInput.value = "";

  showRandomQuote(); // Update display
}

// Show a new random quote on button click
showBtn.addEventListener("click", showRandomQuote);

// Make addQuote available for HTML button onclick
window.addQuote = addQuote;

// Show one quote initially
showRandomQuote();
