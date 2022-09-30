$(document).ready(function() {
    const logoutButton = $('#logoutButton');

    logoutButton.on('click', function() {
        $.ajax({
            type: "GET",
            url: "/logout",
            dataType: "json",
            success: function() {
                window.location.replace('/buyer-login');
            },
        });
    });
});