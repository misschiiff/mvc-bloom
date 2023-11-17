// JavaScript for the social media menu
const socialButton = document.getElementById('social-button');
const socialMenu = document.querySelector('.social-menu');
const socialSection = document.querySelector('.social-section');

socialButton.addEventListener('click', () => {
    socialMenu.classList.toggle('show');
    socialSection.classList.toggle('expanded');
});