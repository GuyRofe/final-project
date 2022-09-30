$(document).ready(function() {
    const postProductForm = $('#postProductForm');
    const productTitleInput = $('#productTitleInput');
    const productDescriptionInput = $('#productDescriptionInput');
    const productPriceInput = $('#productPriceInput');
    const formError = $('#formError');
    const productCategorySelect = $('#productCategorySelect');

    postProductForm.on('submit', function(e) {
        e.preventDefault();

        const title = productTitleInput.val();
        const description = productDescriptionInput.val();
        const price = parseInt(productPriceInput.val());
        const category = productCategorySelect.find(":selected").val();

        if (!title || !description || !price || !category) {
            formError.removeClass("d-none");
            formError.text('Please complete the form');

            return;
        }

        const postDataString = JSON.stringify({
            title,
            description,
            price,
            category
        });
        
        $.ajax({
            type: "POST",
            url: "/post-product",
            data: postDataString,
            contentType: "application/json",
            dataType: "json",
            success: function() {
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