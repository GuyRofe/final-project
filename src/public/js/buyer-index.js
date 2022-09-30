$(document).ready(function() {
    const productsContainer = $('#productsContainer');

    $.ajax({
        type: "GET",
        url: "/fetch-products",
        dataType: "json",
        success: function(response) {
            const products = response.products;

            const productsHtml = products.reduce((finalHtml, product) => {
                return finalHtml + `
                    <div class="d-flex flex-column productItem p-3 me-2 mb-2">
                        <h3 class="text-dark">${product.title}</h3>
                        <p class="mb-3 text-dark">${product.description}</p>
                        <span class="text-primary">Category: ${product.category}</span>
                        <span class="text-primary">Price: ${product.price}</span>

                        <button type="button" data-product-id="${product.id}" class="btn btn-primary purchaseButton mt-2">Purchase</button>
                    </div>
                `;
            }, '');

            productsContainer.html(productsHtml)
        },
    });

    productsContainer.on('click', '.purchaseButton', function() {
        const productItem = $(this).parent();
        const productId = $(this).data("product-id");

        $.ajax({
            type: "GET",
            url: `/purchase-product/${productId}`,
            dataType: "json",
            success: function() {
                productItem.remove();
            },
        });
    });
});