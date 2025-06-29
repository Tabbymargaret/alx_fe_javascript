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

const quotes = [
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

function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Use innerHTML as required
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
  alert("Quote added successfully!");

  quoteInput.value = "";
  categoryInput.value = "";

  showRandomQuote(); // show newly updated list
}

showBtn.addEventListener("click", showRandomQuote);
window.addQuote = addQuote; // make available for onclick in HTML
showRandomQuote(); // show one on page load
