<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>

<?php
function react_add_to_head()
{
?>
  <!-- CSS -->
  <% for (let css in htmlWebpackPlugin.files.css) { %>
  <link rel="stylesheet" href="<%= htmlWebpackPlugin.files.css[css] %>">
  <% } %>
<?php
}
add_action('wp_head', 'react_add_to_head');
?>

<!-- JS -->
<% for (let js in htmlWebpackPlugin.files.js) { %>
<script src="<%= htmlWebpackPlugin.files.js[js] %>"></script>
<% } %>