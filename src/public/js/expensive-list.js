$(document).ready(function() {
    const productsContainer = $('#productsContainer');

    $.ajax({
        type: "GET",
        url: "/fetch-expensive-list",
        dataType: "json",
        success: function(response) {
            const products = response.products;

            const productsHtml = products.reduce((finalHtml, product) => {
                return finalHtml + `
                    <div class="d-flex flex-column productItem p-3 me-2 mb-2">
                        <h4>Category: ${product._id}</h4>
                        <span class="text-danger">Price: ${product.price}</span>
                    </div>
                `;
            }, '');

            productsContainer.html(productsHtml)
        },
    });
});