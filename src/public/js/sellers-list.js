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
                        
                        <span>Min Price: ${seller.minPrice || 'No Products'}</span>
                        <span>Max Price: ${seller.maxPrice || 'No Products'}</span>

                        <div id="google-map-${seller.username}" class="googleMapSeller"></div>
                    </div>
                `;
            }, '');

            sellersContainer.html(sellersHtml);

            sellers.forEach((seller) => {
                const position = { lat: seller.address[0], lng: seller.address[1] };

                const map = new google.maps.Map(document.getElementById(`google-map-${seller.username}`), {
                    center: position,
                    zoom: 15,
                });
                new google.maps.Marker({
                    position: position,
                    map: map,
                  });
                
            });
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
