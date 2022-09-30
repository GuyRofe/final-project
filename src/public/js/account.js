$(document).ready(function() {
    const deleteAccountButton = $('#deleteAccountButton');
    const formError = $('#formError');
    const accountForm = $('#accountForm');
    const newUsernameInput = $('#newUsernameInput');
    const formHeader = $('#formHeader');
    const navUsername = $('#navUsername');
    
    deleteAccountButton.on('click', function() {
        $.ajax({
            type: "DELETE",
            url: "/delete-account",
            dataType: "json",
            success: function() {
                window.location.replace('/buyer-login');
            },
            error: function(response) {
                const responseMessage = response.responseText;
                const responseMessageObject = JSON.parse(responseMessage);

                formError.removeClass("d-none");
                formError.text(responseMessageObject.message);
            }
        });
    });

    accountForm.on('submit', function(e) {
        e.preventDefault();

        const username = newUsernameInput.val();

        if (!username) {
            formError.removeClass("d-none");
            formError.text('Please complete the form');

            return;
        }

        const postDataString = JSON.stringify({
            username,
        });
        
        $.ajax({
            type: "PATCH",
            url: "/edit-username",
            data: postDataString,
            contentType: "application/json",
            dataType: "json",
            success: function() {
                formHeader.text(`Your Account - ${username}`);
                navUsername.text(`Hello, ${username}`);
            },
            error: function(response) {
                console.log(response);

                const responseMessage = response.responseText;
                const responseMessageObject = JSON.parse(responseMessage);

                formError.removeClass("d-none");
                formError.text(responseMessageObject.message);
            }
        });
    });
});