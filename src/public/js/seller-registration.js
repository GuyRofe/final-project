$(document).ready(function() {
    const registrationForm = $('#registrationForm');
    const usernameInput = $('#sellerRegistrationUsernameInput');
    const passwordInput = $('#sellerRegistrationPasswordInput');
    const addressInput = $('#sellerRegistrationAddressInput');
    const formError = $('#formError');

    registrationForm.on('submit', function(e) {
        e.preventDefault();

        const username = usernameInput.val();
        const password = passwordInput.val();
        const address = addressInput.val();

        if (!username || !password || !addressInput) {
            formError.removeClass("d-none");
            formError.text('Please complete the form');

            return;
        }

        const postDataString = JSON.stringify({
            username,
            password,
            address
        });
        
        $.ajax({
            type: "POST",
            url: "/seller-registration",
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