$(document).ready(function() {
    const productsContainer = $('#productsContainer');
    const searchByTitleInput = $('#searchByTitleInput');
    const searchByMinPriceInput = $('#searchByMinPriceInput');
    const searchButton = $('#searchButton');
    const categorySelect = $('#categorySelect');

    const urlParams = new URLSearchParams(window.location.search);
    const fetchProductsUrl = `/fetch-products?${urlParams.toString()}`;

    if (urlParams.has('title')) {
        searchByTitleInput.val(urlParams.get('title'));
    }

    if (urlParams.has('minPrice')) {
        searchByMinPriceInput.val(urlParams.get('minPrice'));
    }

    if (urlParams.has('category')) {
        categorySelect.val(urlParams.get('category'));
    } else {
        categorySelect.val('');
    }

    $.ajax({
        type: "GET",
        url: fetchProductsUrl,
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

    searchButton.on('click', function() {
        const title = searchByTitleInput.val();
        const minPrice = searchByMinPriceInput.val();
        const category = categorySelect.find(":selected").val();

        urlParams.delete('title');
        urlParams.delete('minPrice');
        urlParams.delete('category');

        if (title) {
            urlParams.set('title', title);
        }

        if (minPrice) {
            urlParams.set('minPrice', minPrice);
        }

        if (category) {
            urlParams.set('category', category);
        }

        window.location.href = `/?${urlParams.toString()}`
    });
});
