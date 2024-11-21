document.addEventListener('DOMContentLoaded', function () {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const lgpdAviso = document.getElementById('lgpdAviso'); // Target the div
    const chatbot = document.getElementById('chatbox');

    // Check if there's a saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        lgpdAviso.classList.add('dark-mode'); // Apply the theme to the div
        chatbot.classList.add('dark-mode');
    }

    themeToggleButton.addEventListener('click', function () {
        body.classList.toggle('dark-mode'); // Toggle theme on body
        lgpdAviso.classList.toggle('dark-mode'); // Toggle theme on the div
        chatbot.classList.toggle('dark-mode');

        // Save the theme to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});

