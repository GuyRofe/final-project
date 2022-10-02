$(document).ready(function() {
    const loginForm = $('#loginForm');
    const usernameInput = $('#sellerLoginUsernameInput');
    const passwordInput = $('#sellerLoginPasswordInput');
    const formError = $('#formError');

    loginForm.on('submit', function(e) {
        e.preventDefault();

        const username = usernameInput.val();
        const password = passwordInput.val();

        if (!username || !password) {
            formError.removeClass("d-none");
            formError.text('Please complete the form');

            return;
        }

        const postDataString = JSON.stringify({
            username,
            password
        });
        
        $.ajax({
            type: "POST",
            url: "/seller-login",
            data: postDataString,
            contentType: "application/json",
            dataType: "json",
            success: function(response) {
                socket.emit('update-user-id', response.userId);
                
                window.location.replace('/');
            },
            error: function(response) {
                const responseMessage = response.responseText;
                const responseMessageObject = JSON.parse(responseMessage);

                formError.removeClass("d-none");
                formError.text(responseMessageObject.message);
            }
        });
    });
});