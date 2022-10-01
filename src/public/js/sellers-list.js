$(document).ready(function() {
    const sellersContainer = $('#sellersContainer');
    const searchByUsernameInput = $('#searchByUsernameInput');
    const searchByMinPriceInput = $('#searchByMinPriceInput');
    const searchByMaxPriceInput = $('#searchByMaxPriceInput');
    const searchButton = $('#searchButton');

    const urlParams = new URLSearchParams(window.location.search);
    const fetchSellersListUrl = `/fetch-sellers-list?${urlParams.toString()}`;

    if (urlParams.has('username')) {
        searchByUsernameInput.val(urlParams.get('username'));
    }

    if (urlParams.has('minPrice')) {
        searchByMinPriceInput.val(urlParams.get('minPrice'));
    }

    if (urlParams.has('maxPrice')) {
        searchByMaxPriceInput.val(urlParams.get('maxPrice'));
    }

    $.ajax({
        type: "GET",
        url: fetchSellersListUrl,
        dataType: "json",
        success: function(response) {
            const sellers = response.sellers;

            const sellersHtml = sellers.reduce((finalHtml, seller) => {
                return finalHtml + `
                    <div class="d-flex flex-column sellerItem p-3 me-2 mb-2">
                        <h3 class="text-dark overflowText">${seller.username}</h3>
                        
                        <span>Min Price: ${seller.minPrice}</span>
                        <span>Max Price: ${seller.maxPrice}</span>
                    </div>
                `;
            }, '');

            sellersContainer.html(sellersHtml)
        },
    });

    searchButton.on('click', function() {
        const username = searchByUsernameInput.val();
        const minPrice = searchByMinPriceInput.val();
        const maxPrice = searchByMaxPriceInput.val();

        urlParams.delete('username');
        urlParams.delete('minPrice');
        urlParams.delete('maxPrice');

        if (username) {
            urlParams.set('username', username);
        }

        if (minPrice) {
            urlParams.set('minPrice', minPrice);
        }

        if (maxPrice) {
            urlParams.set('maxPrice', maxPrice);
        }

        window.location.href = `/sellers-list?${urlParams.toString()}`
    });
});
