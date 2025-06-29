document.getElementById("exportQuotesBtn").addEventListener("click", function () {
  const quotes = JSON.parse(localStorage.getItem("quotes") || "[]");

  if (quotes.length === 0) {
    alert("No quotes to export.");
    return;
  }

  // Step 1: Convert quotes array to JSON string
  const jsonString = JSON.stringify(quotes, null, 2); // pretty-print with indentation

  // Step 2: Create a Blob with MIME type application/json
  const blob = new Blob([jsonString], { type: "application/json" });

  // Step 3: Create a download link from the Blob
  const url = URL.createObjectURL(blob);

  // Step 4: Create an anchor tag and click it
  const a = document.createElement("a");
  a.href = url;
  a.download = "my-quotes.json";
  document.body.appendChild(a);
  a.click();

  // Step 5: Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // optional, for memory cleanup
});
