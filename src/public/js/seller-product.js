$(document).ready(function() {
    const pathArray = window.location.pathname.split('/');
    const productId = pathArray[pathArray.length - 1];

    const productTitleInput = $('#productTitleInput');
    const productDescriptionInput = $('#productDescriptionInput');
    const productCategorySelect = $('#productCategorySelect');
    const productPriceInput = $('#productPriceInput');
    const formError = $('#formError');
    const editProductForm = $('#editProductForm');

    editProductForm.on('submit', function(e) {
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
            type: "PATCH",
            url: `/edit-seller-product/${productId}`,
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

    $.ajax({
        type: "GET",
        url: `/fetch-seller-product/${productId}`,
        dataType: "json",
        success: function(response) {
            const product = response.product;
            
            productTitleInput.val(product.title);
            productDescriptionInput.val(product.description);
            productCategorySelect.val(product.category);
            productPriceInput.val(product.price);
        },
        error: function() {
            window.location.href = '/';
        }
    });

    const deleteProductButton = $("#deleteProductButton");

    deleteProductButton.on('click', function() {
        $.ajax({
            type: "DELETE",
            url: `/delete-seller-product/${productId}`,
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