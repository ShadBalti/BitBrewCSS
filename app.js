// Sample snippet data
const snippetsData = [
  { category: 'Layout', code: '.container { max-width: 1200px; margin: 0 auto; }' },
  { category: 'Typography', code: 'h1 { color: #333; }' },
  // Add more snippet data as needed
];

// Function to generate category list
function generateCategoryList() {
  const categoryList = $('.category-list');
  const categories = [...new Set(snippetsData.map(snippet => snippet.category))];

  categories.forEach(category => {
    categoryList.append(`<li class="list-group-item category-item">${category}</li>`);
  });

  // Add click event to each category item
  $('.category-item').click(function() {
    const selectedCategory = $(this).text();
    displaySnippets(selectedCategory);
  });
}

// Function to display snippets based on selected category
function displaySnippets(category) {
  const snippetContainer = $('#snippet-container');
  snippetContainer.empty();

  snippetsData.forEach(snippet => {
    if (snippet.category === category) {
      snippetContainer.append(`<pre class="snippet-code">${snippet.code}</pre>`);
    }
  });
}

// Initial setup
$(document).ready(function() {
  generateCategoryList();
  displaySnippets(snippetsData[0].category); // Display the first category by default
});
 
