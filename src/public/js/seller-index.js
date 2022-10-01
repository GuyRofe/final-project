$(document).ready(function() {
    const productsContainer = $('#productsContainer');

    $.ajax({
        type: "GET",
        url: "/fetch-seller-products",
        dataType: "json",
        success: function(response) {
            const products = response.products;

            const productsHtml = products.reduce((finalHtml, product) => {
                return finalHtml + `
                    <a href="/seller-product/${product.id}" class="d-flex flex-column productItem p-3 me-2 mb-2">
                        <h3 class="text-dark overflowText">${product.title}</h3>
                        <p class="mb-3 text-dark overflowText">${product.description}</p>
                        <span class="text-primary">Category: ${product.category}</span>
                        <span class="text-primary">Price: ${product.price}</span>
                    </a>
                `;
            }, '');

            productsContainer.html(productsHtml)
        },
    });
});