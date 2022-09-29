$(document).ready(function() {
    const registrationForm = $('#registrationForm');
    const usernameInput = $('#buyerRegistrationUsernameInput');
    const passwordInput = $('#buyerRegistrationPasswordInput');
    const formError = $('#formError');

    registrationForm.on('submit', function(e) {
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
            url: "/buyer-registration",
            data: postDataString,
            contentType: "application/json",
            dataType: "json",
            error: function(response) {
                const responseMessage = response.responseText;
                const responseMessageObject = JSON.parse(responseMessage);

                formError.removeClass("d-none");
                formError.text(responseMessageObject.message);
            }
        });
    });
});