const apiEndpoint = 'https://gw79ex3xw2.execute-api.us-east-1.amazonaws.com/prod/comments'; // Replace with your actual API endpoint

// Function to fetch and display comments
async function fetchComments() {
    try {
        const response = await fetch(apiEndpoint, {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }

        const comments = await response.json();
        displayComments(comments);
    } catch (error) {
        console.error(error);
    }
}

// Function to display comments in the HTML
function displayComments(comments) {
    const commentsSection = document.getElementById('commentsSection');
    commentsSection.innerHTML = '';

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');

        // Create a container for the text
        const commentTextDiv = document.createElement('div');
        commentTextDiv.classList.add('comment-text');
        commentTextDiv.innerHTML = `<strong>${comment.user}</strong><span>${comment.comment}</span>`;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => deleteComment(comment.CommentId);

        // Append elements
        commentDiv.appendChild(commentTextDiv);
        commentDiv.appendChild(deleteButton);
        commentsSection.appendChild(commentDiv);
    });
}

// Function to submit a new comment
async function submitComment(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const user = document.getElementById('user').value;
    const comment = document.getElementById('comment').value;

    if (!user || !comment) {
        alert('Please fill in all fields');
        return;
    }

    const commentData = {
        user: user,
        comment: comment
    };

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit comment');
        }

        // Clear form and refresh comments
        document.getElementById('commentForm').reset();
        fetchComments();
    } catch (error) {
        console.error(error);
        alert('There was an error submitting your comment.');
    }
}

async function deleteComment(CommentId) {
    try{
        const response = await fetch(apiEndpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({CommentId: CommentId})
        });

        if(!response.ok){
            throw new Error('Failed to delete comment.');
        }

        fetchComments();
    } catch(error){
        console.error(error);
        alert('There was an error deleting the comment.');
    }
}

// Event listener for form submission
document.getElementById('commentForm').addEventListener('submit', submitComment);

// Fetch and display comments when the page loads
fetchComments();
