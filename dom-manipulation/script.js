// // document.addEventListener('DOMContentLoaded', () => {
    
// // });


// const quoteDisplay = document.getElementById("quoteDisplay");
//     const generateQuoteButton = document.getElementById("newQuote");
//     const body = document.querySelector("body");
//     const newQuoteText = document.getElementById("newQuoteText"); 
//     const newQuoteCategory = document.getElementById("newQuoteCategory");
//     const quotes = [
//         {
//             text: "The only limit to our realization of tomorrow is our doubts of today.",
//             category: "Motivational"
//         }
//         ,
//         {
//             text: "Life is 10% what happens to us and 90% how we react to it.",
//             category: "Inspirational"
//         },
//         {
//             text: "The best way to predict the future is to create it.",
//             category: "Wisdom"
//         },
//         {
//             text: "You miss 100% of the shots you don’t take.",
//             category: "Sports"
//         },
//         {
//             text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
//             category: "Leadership"
//         }
//     ];
//     function addQuote()
//     {
//         const newQuote =  
//         {
//             text: newQuoteText.value.trim(),
//             category: newQuoteCategory.value.trim()
//         };
//         quotes.push(newQuote);
//         alert("Quote added successfully!");

//         newQuoteText.value = ""; // Clear the input field
//         newQuoteCategory.value = ""; // Clear the input field
//     }
    

//     // function createAddQuoteForm() {
//     //     const form = document.createElement("form");
//     //     form.id = "add-quote-form";

//     //     const textInput = document.createElement("input");
//     //     textInput.type = "text";
//     //     textInput.placeholder = "Enter quote text";
//     //     textInput.required = true;

//     //     const categoryInput = document.createElement("input");
//     //     categoryInput.type = "text";
//     //     categoryInput.placeholder = "Enter quote category";
//     //     categoryInput.required = true;

//     //     const submitButton = document.createElement("button");
//     //     submitButton.type = "submit";
//     //     submitButton.textContent = "Add Quote";

//     //     form.appendChild(textInput);
//     //     form.appendChild(categoryInput);
//     //     form.appendChild(submitButton);

//     //     form.addEventListener("submit", (event) => {
//     //         event.preventDefault();
//     //         const newQuote = {
//     //             text: textInput.value,
//     //             category: categoryInput.value
//     //         };
//     //         quotes.push(newQuote);
//     //         alert("Quote added successfully!");
//     //         form.reset();
//     //     });

//     //     return form;
//     // }


//     generateQuoteButton.addEventListener("click", () => {
//         const randomIndex = Math.floor(Math.random() * quotes.length);
//         const randomQuote = quotes[randomIndex];
//         quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
//     });

//     // body.appendChild(createAddQuoteForm());


/* ---------- Quote Data ---------- */
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
  { text: "Life is 10% what happens to us and 90% how we react to it.",            category: "Inspirational" },
  { text: "The best way to predict the future is to create it.",                  category: "Wisdom" },
  { text: "You miss 100% of the shots you don’t take.",                           category: "Sports" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Leadership" }
];

/* ---------- DOM References ---------- */
const quoteDisplay   = document.getElementById("quoteDisplay");
const quoteInput     = document.getElementById("newQuoteText");
const categoryInput  = document.getElementById("newQuoteCategory");
const showBtn        = document.getElementById("newQuote");     // “Show New Quote” button

/* ---------- Display Logic ---------- */
function displayRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[randomIndex];
  quoteDisplay.textContent = `"${text}" — ${category}`;
}

/* ---------- Add‑Quote Logic ---------- */
function addQuote() {
  const text     = quoteInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please fill in both quote and category.");
    return;
  }

  quotes.push({ text, category });      // add to array
  alert("Quote added successfully!");

  quoteInput.value = "";
  categoryInput.value = "";

  displayRandomQuote();                 // refresh DOM so user sees the new quote pool
}

/* ---------- Event Wiring ---------- */
showBtn.addEventListener("click", displayRandomQuote);

// Expose addQuote for inline HTML button: <button onclick="addQuote()">Add Quote</button>
window.addQuote = addQuote;

/* ---------- Initial State ---------- */
displayRandomQuote();   // show a random quote on first load
