// const quoteDisplay = document.getElementById("quoteDisplay");
// const newQuoteButton = document.getElementById("newQuote");
// const newQuoteInput = document.getElementById("newQuoteText");
// const newCategoryInput = document.getElementById("newQuoteCategory");
// var paragraph = document.createElement("p");
//     paragraph.textContent = "Click the button to get a random quote!";
//     quoteDisplay.appendChild(paragraph);

// const stored = JSON.parse(localStorage.getItem("storedQuotes"));
// if (stored && Array.isArray(stored)) {
//     defaultQuotes.splice(0, defaultQuotes.length, ...stored);
// }


// const exportDataButton = document.getElementById("exportData");
// const defaultQuotes = [
//     {
//         "text": "The only limit to our realization of tomorrow is our doubts of today.",
//         "category": "inspirational",
//     },
//     {
//         "text": "Life is 10% what happens to us and 90% how we react to it.",
//         "category": "motivational",
//     },
//     {
//         "text": "The best way to predict the future is to create it.",
//         "category": "inspirational",
//     },
//     {
//         "text": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
//         "category": "motivational",
//     },
//     {
//         "text": "You miss 100% of the shots you don’t take.",
//         "category": "motivational",
//     }
// ]


// function showRandomQuote()
// {
//     var randomIndex = Math.floor(Math.random() * defaultQuotes.length);
//     var quote = defaultQuotes[randomIndex];
//     quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
// }
// function addQuote()
// {
//     if(newCategoryInput.value.trim() === "" || newQuoteInput.value.trim() === "")
//     {
//         alert("Please fill in both fields.");
//         return;
//     }
//     var newQuote = {
//         "text": newQuoteInput.value.trim(),
//         "category": newCategoryInput.value.trim()
//     };
//     defaultQuotes.push(newQuote);
//     localStorage.setItem("storedQuotes", JSON.stringify(defaultQuotes));
//     alert("New quote added successfully!");
//     newQuoteInput.value = "";
//     newCategoryInput.value = "";
// }
// function saveQuotes(obj)
// {
//     localStorage.setItem("storedQuotes", JSON.stringify(obj));
// }
//  function importFromJsonFile(event) 
//  {
//     const fileReader = new FileReader();
//     fileReader.onload = function(event)
//     {
//       const importedQuotes = JSON.parse(event.target.result);
//       defaultQuotes.push(...importedQuotes);
//       saveQuotes(defaultQuotes);
//       alert('Quotes imported successfully!');
//     };
//     fileReader.readAsText(event.target.files[0]);
//   }

// exportDataButton.addEventListener("click", function() {
//     const dataStr = JSON.stringify(defaultQuotes, null, 2);
//     const blob = new Blob([dataStr], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
    
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "quotes.json";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
// });


const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const newQuoteInput = document.getElementById("newQuoteText");
const newCategoryInput = document.getElementById("newQuoteCategory");
const exportDataButton = document.getElementById("exportData");
const importInput = document.getElementById("importFile");

// Initial quote message
const paragraph = document.createElement("p");
paragraph.textContent = "Click the button to get a random quote!";
quoteDisplay.appendChild(paragraph);

// Default quotes array
const defaultQuotes = [
    {
        "text": "The only limit to our realization of tomorrow is our doubts of today.",
        "category": "inspirational"
    },
    {
        "text": "Life is 10% what happens to us and 90% how we react to it.",
        "category": "motivational"
    },
    {
        "text": "The best way to predict the future is to create it.",
        "category": "inspirational"
    },
    {
        "text": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "category": "motivational"
    },
    {
        "text": "You miss 100% of the shots you don’t take.",
        "category": "motivational"
    }
];

// Load from localStorage if available
const stored = JSON.parse(localStorage.getItem("storedQuotes"));
if (stored && Array.isArray(stored)) {
    defaultQuotes.splice(0, defaultQuotes.length, ...stored);
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * defaultQuotes.length);
    const quote = defaultQuotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
}

function addQuote() {
    if (newCategoryInput.value.trim() === "" || newQuoteInput.value.trim() === "") {
        alert("Please fill in both fields.");
        return;
    }

    const newQuote = {
        text: newQuoteInput.value.trim(),
        category: newCategoryInput.value.trim()
    };

    defaultQuotes.push(newQuote);
    saveQuotes(defaultQuotes);
    alert("New quote added successfully!");
    newQuoteInput.value = "";
    newCategoryInput.value = "";

    populateCategories(); // Update categories after adding a new quote
}

function saveQuotes(obj) {
    localStorage.setItem("storedQuotes", JSON.stringify(obj));
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
            defaultQuotes.push(...importedQuotes);
            saveQuotes(defaultQuotes);
            alert('Quotes imported successfully!');
        } else {
            alert('Invalid file format. Must be an array of quotes.');
        }
    };
    fileReader.readAsText(event.target.files[0]);

    populateCategories(); // Update categories after importing quotes
}

exportDataButton.addEventListener("click", function () {
    const dataStr = JSON.stringify(defaultQuotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

newQuoteButton.addEventListener("click", showRandomQuote);
importInput.addEventListener("change", importFromJsonFile);

function populateCategories() 
{
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.length = 1; // Clear existing options
    const categorySet = new Set();
    for (const quote of defaultQuotes) 
    {
        // Check if the category is already in the set
        // If not, add it to the set

        if (!categorySet.has(quote.category))
        {
            categorySet.add(quote.category);
        }
    }
    for (const category of categorySet) 
    {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
    }
}
function filterQuotes()
{
    const categorySet = new Set();
    for (const quote of defaultQuotes)
    {
        // Check if the category is already in the set
        // If not, add it to the set
        if (!categorySet.has(quote.category)) 
        {
            categorySet.add(quote.category);
        }
    }
    for (const category of categorySet)
    {
        
    }
}

// function filterQuotes() 
// {
//     const categoryArray = [];
//     for (const quote of defaultQuotes)
//     {
//         if (categoryArray.includes(quote.category)) 
//         {
//             categoryArray.push(quote.category);
//         }
//     }
// }




// localStorage.setItem("defaultQuotes", JSON.stringify(defaultQuotes));
// defaultQuotesLocalStorage = JSON.parse(localStorage.getItem("defaultQuotes")) || defaultQuotes;


// const quoteDisplay = document.getElementById("quoteDisplay");
// const newQuoteButton = document.getElementById("newQuote");
// const newQuoteInput = document.getElementById("newQuoteText");
// const newCategoryInput = document.getElementById("newQuoteCategory");

// // Display message initially
// const paragraph = document.createElement("p");
// paragraph.textContent = "Click the button to get a random quote!";
// quoteDisplay.appendChild(paragraph);

// // Load from localStorage or use default
// let quotes = JSON.parse(localStorage.getItem("storedQuotes")) || [
//     {
//         "text": "The only limit to our realization of tomorrow is our doubts of today.",
//         "category": "inspirational"
//     },
//     {
//         "text": "Life is 10% what happens to us and 90% how we react to it.",
//         "category": "motivational"
//     },
//     {
//         "text": "The best way to predict the future is to create it.",
//         "category": "inspirational"
//     },
//     {
//         "text": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
//         "category": "motivational"
//     },
//     {
//         "text": "You miss 100% of the shots you don’t take.",
//         "category": "motivational"
//     }
// ];

// // Show random quote
// function showRandomQuote() {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const quote = quotes[randomIndex];
//     quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
// }

// // Add a new quote
// function addQuote() {
//     const text = newQuoteInput.value.trim();
//     const category = newCategoryInput.value.trim();

//     if (text === "" || category === "") {
//         alert("Please fill in both fields.");
//         return;
//     }

//     const newQuote = {
//         text: text,
//         category: category
//     };

//     quotes.push(newQuote); // Update quotes array
//     localStorage.setItem("storedQuotes", JSON.stringify(quotes)); // Save to localStorage

//     alert("New quote added successfully!");
//     newQuoteInput.value = "";
//     newCategoryInput.value = "";
// }

// // Event listeners
// newQuoteButton.addEventListener("click", showRandomQuote);
