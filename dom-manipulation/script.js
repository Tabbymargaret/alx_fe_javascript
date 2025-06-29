let quotes = [];

// Load quotes from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    try {
      quotes = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse quotes from storage.");
    }
  } else {
    // Default sample quotes
    quotes = [
      { text: "The best way to predict the future is to create it.", category: "Motivational" },
      { text: "You miss 100% of the shots you don’t take.", category: "Sports" },
      { text: "Success is not final, failure is not fatal.", category: "Wisdom" },
    ];
    saveQuotes();
  }
  showRandomQuote();
});

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.innerHTML = `"${random.text}"<br>— ${random.category}`;
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();

  alert("Quote added successfully!");
  textInput.value = "";
  categoryInput.value = "";
  showRandomQuote();
}

document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Export functionality
document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
});

// Import functionality
document.getElementById("importFile").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (!Array.isArray(importedQuotes)) throw new Error("Invalid file format");

      for (const quote of importedQuotes) {
        if (!quote.text || !quote.category) {
          throw new Error("Each quote must have 'text' and 'category'");
        }
      }

      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
      showRandomQuote();
    } catch (err) {
      alert("Import failed: " + err.message);
    }
  };
  reader.readAsText(file);
});
