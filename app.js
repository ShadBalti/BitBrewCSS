// Sample snippet data
const snippetsData = [
  // Layout
  { category: 'Layout', code: '.container { max-width: 1200px; margin: 0 auto; }' },
  { category: 'Layout', code: 'body { font-family: "Arial", sans-serif; }' },

  // Typography
  { category: 'Typography', code: 'h1 { color: #333; }' },
  { category: 'Typography', code: 'p { line-height: 1.5; }' },

  // Colors
  { category: 'Colors', code: '.primary-text { color: #007bff; }' },
  { category: 'Colors', code: '.background-gray { background-color: #f1f1f1; }' },

  // Flexbox
  { category: 'Flexbox', code: '.flex-container { display: flex; justify-content: space-between; }' },
  { category: 'Flexbox', code: '.flex-item { flex: 1; }' },

  // Animation
  { category: 'Animation', code: '.fade-in { animation: fadeIn 1s ease-in; }' },
  { category: 'Animation', code: '.slide-in { animation: slideIn 0.5s ease-out; }' },

  // Responsive Design
  { category: 'Responsive Design', code: '@media (max-width: 767px) { .responsive-element { width: 100%; } }' },
  { category: 'Responsive Design', code: '@media (min-width: 768px) and (max-width: 991px) { .responsive-element { width: 50%; } }' },

  // Box Model
  { category: 'Box Model', code: '.box { width: 100px; height: 100px; padding: 10px; margin: 10px; border: 1px solid #333; }' },
  { category: 'Box Model', code: '.box:hover { background-color: #f8f9fa; }' },

  // Forms
  { category: 'Forms', code: 'input[type="text"] { width: 200px; padding: 5px; }' },
  { category: 'Forms', code: 'button { background-color: #28a745; color: #fff; padding: 8px 12px; border: none; }' },

  // Transitions
  { category: 'Transitions', code: '.transition-element { transition: transform 0.3s ease-in-out; }' },
  { category: 'Transitions', code: '.transition-element:hover { transform: scale(1.2); }' },

  // Shadows
  { category: 'Shadows', code: '.box-shadow { box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }' },
  { category: 'Shadows', code: '.inner-shadow { box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); }' },

  // Grid
  { category: 'Grid', code: '.grid-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }' },
  { category: 'Grid', code: '.grid-item { background-color: #f1f1f1; padding: 10px; }' },

  // Backgrounds
  { category: 'Backgrounds', code: '.background-image { background-image: url("bg.jpg"); background-size: cover; }' },
  { category: 'Backgrounds', code: '.gradient-bg { background: linear-gradient(to right, #ff8c00, #ff2d55); }' },
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
    displaySnippets(selectedCategory, $('#searchInput').val());
  });
}

// Function to generate a unique URL for sharing
function generateShareableURL(category, code) {
  const encodedCode = encodeURIComponent(code);
  return `${window.location.href}?category=${encodeURIComponent(category)}&code=${encodedCode}`;
}

// Function to open a share dialog for social media
function shareOnSocialMedia(url) {
  // Use any social media sharing library or API of your choice
  // Example: Open a new window with the Twitter sharing URL
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
}


// Function to display snippets based on selected category
function displaySnippets(category) {
  const snippetContainer = $('#snippet-container');
  snippetContainer.empty();

  snippetsData.forEach(snippet => {
    if ((category === 'All' || snippet.category === category) &&
        (searchCriteria === '' || snippet.code.toLowerCase().includes(searchCriteria.toLowerCase()))) {
      const codeElement = $(`<code class="html">${snippet.code}</code>`);
      const shareButton = $('<button class="btn btn-primary btn-sm">Share</button>');

      shareButton.click(function() {
        const shareableURL = generateShareableURL(snippet.category, snippet.code);
        shareOnSocialMedia(shareableURL);
      });

      snippetContainer.append(`<pre class="snippet-code"></pre>`);
      snippetContainer.find('.snippet-code:last').append(codeElement).append(shareButton);
      hljs.highlightBlock(codeElement[0]);
    }
  });
}
// Function to handle search button click
$('#searchButton').click(function() {
  const selectedCategory = $('.category-item.active').text() || 'All';
  displaySnippets(selectedCategory, $('#searchInput').val());
});


// Function to parse URL parameters
function parseURLParams() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  const code = params.get('code');
  return { category, code };
}

// Initial setup
$(document).ready(function() {
  const { category, code } = parseURLParams();
  if (category && code) {
    // Display the snippet based on URL parameters
    displaySnippets(category);
  } else {
    // Default behavior (display the first category)
    generateCategoryList();
    displaySnippets(snippetsData[0].category);
  }
});
