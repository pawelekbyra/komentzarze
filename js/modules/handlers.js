// handlers.js
(function($) {
    'use strict';

    // Assuming a UI module exists for rendering
    const UI = {
        renderComments: function(comments) {
            // This function should clear the existing comments and render the new ones.
            // For now, let's just log them.
            console.log('Rendering comments:', comments);
        },
        renderNewComment: function(comment) {
            // This function should append a new comment to the comments list.
            console.log('Rendering new comment:', comment);
        }
    };

    function commentFormSubmitHandler(event) {
        event.preventDefault();

        const $form = $(this);
        const $contentField = $form.find('textarea[name="content"]');
        const content = $contentField.val();
        const slideId = $form.find('input[name="slide_id"]').val();

        if (content.trim() === '') {
            alert('Please enter a comment.');
            return;
        }

        const commentData = {
            slide_id: slideId,
            content: content
        };

        API.postComment(commentData,
            function(response) {
                if (response.success) {
                    UI.renderNewComment(response.data);
                    $contentField.val(''); // Clear the textarea
                } else {
                    alert(response.data);
                }
            },
            function() {
                alert('An error occurred while posting your comment.');
            }
        );
    }

    $(document).ready(function() {
        // Attach the handler to the comment form
        $('#comment-form').on('submit', commentFormSubmitHandler);

        // Load initial comments
        const slideId = $('#comment-form input[name="slide_id"]').val();
        if (slideId) {
            API.getComments(slideId,
                function(response) {
                    if (response.success) {
                        UI.renderComments(response.data);
                    }
                },
                function() {
                    console.error('An error occurred while fetching comments.');
                }
            );
        }
    });

})(jQuery);