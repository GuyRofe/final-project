$(document).ready(function() {
    const productsContainer = $('#productsContainer');

    $.ajax({
        type: "GET",
        url: "/fetch-purchases",
        dataType: "json",
        success: function(response) {
            const purchases = response.purchases;

            const purchasesHtml = purchases.reduce((finalHtml, purchase) => {
                const formattedDate = new Intl.DateTimeFormat('en-US').format(purchase.createdAt);

                return finalHtml + `
                    <div class="d-flex flex-column productItem p-3 me-2 mb-2">
                        <h3 class="text-dark overflowText">${purchase.productTitle}</h3>
                        <p class="mb-3 text-dark overflowText">${purchase.productDescription}</p>
                        <span class="text-primary">Category: ${purchase.productCategory}</span>
                        <span class="text-primary">Price: ${purchase.productPrice}</span>

                        <span class="h5 mt-3">Purchased on: ${formattedDate}</span>
                    </div>
                `;
            }, '');

            productsContainer.html(purchasesHtml)
        },
    });
});