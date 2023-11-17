// Like button click handler
const likeButtons = document.querySelectorAll('.like-button');
likeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Implement your like functionality here
        // You can increase a like count and update the UI
    });
});

// Reply button click handler
const replyButtons = document.querySelectorAll('.reply-button');
replyButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Show a reply input field for this comment
        const comment = button.parentElement.parentElement;
        const replyInput = document.createElement('input');
        replyInput.setAttribute('type', 'text');
        replyInput.setAttribute('placeholder', 'Write a reply...');
        comment.appendChild(replyInput);

        // Handle the submission of the reply
        replyInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const replyText = replyInput.value;
                if (replyText) {
                    // Create a new reply element and add it to the DOM
                    const reply = document.createElement('div');
                    reply.classList.add('comment');
                    reply.innerHTML = `
                        <div class="comment-header">
                            <span class="user">Your Name</span>
                            <span class="date">Just now</span>
                        </div>
                        <div class="comment-content">
                            ${replyText}
                        </div>
                    `;
                    comment.appendChild(reply);
                    // Clear the reply input field
                    replyInput.value = '';
                }
            }
        });
    });
});