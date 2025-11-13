// api.js
const API = {
    _request: function(action, data, successCallback, errorCallback) {
        const ajax_data = {
            action: action,
            nonce: '%%TT_NONCE%%', // This should be replaced with the actual nonce by WordPress
            ...data
        };

        jQuery.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: 'POST',
            data: ajax_data,
            success: successCallback,
            error: errorCallback
        });
    },

    postComment: function(commentData, successCallback, errorCallback) {
        this._request('tt_post_comment', commentData, successCallback, errorCallback);
    },

    getComments: function(slideId, successCallback, errorCallback) {
        this._request('tt_get_comments', { slide_id: slideId }, successCallback, errorCallback);
    }
};