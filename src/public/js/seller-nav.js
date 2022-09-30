$(document).ready(function() {
    const logoutButton = $('#logoutButton');

    logoutButton.on('click', function() {
        console.log(5);

        $.ajax({
            type: "GET",
            url: "/logout",
            dataType: "json",
            success: function() {
                window.location.replace('/seller-login');
            },
        });
    });
});