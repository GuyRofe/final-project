const socket = io();

if (userId) {
    socket.emit('ack-user-id', userId);
}

$(document).ready(function() {
    const notificationElement = $('#notificationElement');

    socket.on('product-purchased', (productTitle) => {
        if (notificationElement.length > 0) {
            console.log(5);

            notificationElement.html(`Your product, "${productTitle}" was just purchased!`);

            if (notificationElement.hasClass('d-none')) {
                notificationElement.removeClass('d-none');

                setTimeout(() => {
                    notificationElement.addClass('d-none');
                }, 4000);
            }
        }
    });
});
