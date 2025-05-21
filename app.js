// Global constant for Twitter sharing URL
const TWITTER_SHARE_URL = 'https://twitter.com/intent/tweet?url=';
// Holds the snippet data fetched from snippets.json
let snippetsData = [];

/**
 * Generates the category list in the UI.
 * It dynamically creates list items for each unique category from `snippetsData`.
 * Also handles click events on category items to display relevant snippets.
 */
function generateCategoryList() {
  const categoryList = $('.category-list');
  categoryList.empty(); // Clear existing categories before repopulating
  // Create a unique list of categories, including 'All'
  const categories = ['All', ...new Set(snippetsData.map(snippet => snippet.category))];

  categories.forEach(category => {
    // Append each category as a list item
    categoryList.append(`<li class="list-group-item category-item">${category}</li>`);
  });

  // Add click event to each category item
  // When a category is clicked, display snippets for that category
  $('.category-item').click(function() {
    const selectedCategory = $(this).text();
    displaySnippets(selectedCategory);
  });
}

/**
 * Generates a unique URL for sharing a specific code snippet.
 * @param {string} category - The category of the snippet.
 * @param {string} code - The code snippet.
 * @returns {string} The generated shareable URL.
 */
function generateShareableURL(category, code) {
  const encodedCode = encodeURIComponent(code);
  const encodedCategory = encodeURIComponent(category);
  return `${window.location.origin}${window.location.pathname}?category=${encodedCategory}&code=${encodedCode}`;
}

/**
 * Opens a share dialog for social media (Twitter).
 * @param {string} url - The URL to be shared.
 */
function shareOnSocialMedia(url) {
  // Example: Open a new window with the Twitter sharing URL
  window.open(`${TWITTER_SHARE_URL}${encodeURIComponent(url)}`, '_blank');
}

/**
 * Displays code snippets in the UI based on the selected category.
 * @param {string} category - The category of snippets to display. If 'All', all snippets are displayed.
 */
function displaySnippets(category) {
  const snippetContainer = $('#snippet-container');
  snippetContainer.empty(); // Clear existing snippets

  snippetsData.forEach(snippet => {
    // Check if the snippet matches the selected category or if 'All' is selected
    if (category === 'All' || snippet.category === category) {
      const codeElement = $(`<code class="html">${snippet.code}</code>`);
      const shareButton = $('<button class="btn btn-primary btn-sm">Share</button>');

      // Add click event to the share button
      shareButton.click(function() {
        const shareableURL = generateShareableURL(snippet.category, snippet.code);
        shareOnSocialMedia(shareableURL);
      });

      // Create a new <pre> element for the snippet
      const preElement = $('<pre class="snippet-code"></pre>');
      // Append the code and share button to the <pre> element
      preElement.append(codeElement).append(shareButton);
      // Append the <pre> element to the snippet container
      snippetContainer.append(preElement);
    }
  });
}

/**
 * Parses URL parameters to retrieve category and code.
 * @returns {{category: string|null, code: string|null}} An object containing the category and code from URL parameters, or null if not present.
 */
function parseURLParams() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  const code = params.get('code');
  return { category, code };
}

/**
 * Initializes the application.
 * Fetches snippet data, parses URL parameters, and displays snippets accordingly.
 * Handles default behavior if no URL parameters are present.
 */
$(document).ready(function() {
  fetch('./snippets.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      snippetsData = data;
      const { category, code } = parseURLParams();

      // Always generate the category list
      generateCategoryList(); 

      if (category && code) {
        // Display snippets for the category specified in URL
        // Note: This will display all snippets of that category.
        // If a specific snippet is to be highlighted or exclusively shown,
        // `displaySnippets` would need modification or a new function.
        displaySnippets(category);
      } else {
        // Default behavior: display all snippets
        displaySnippets('All');
      }
    })
    .catch(error => {
      console.error('Error fetching or processing snippets:', error);
      // Display a user-friendly error message in the snippet container
      $('#snippet-container').html('<p class="text-danger">Could not load snippets. Please check the console for more details and try again later.</p>');
    });
});
