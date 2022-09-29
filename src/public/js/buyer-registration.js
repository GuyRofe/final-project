$(document).ready(function() {
    const registrationForm = $('#registrationForm');
    const usernameInput = $('#buyerRegistrationUsernameInput');
    const passwordInput = $('#buyerRegistrationPasswordInput');

    registrationForm.on('submit', function(e) {
        e.preventDefault();

        const username = usernameInput.val();
        const password = passwordInput.val();

        if (!username || !password) {
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
        });
    });
});