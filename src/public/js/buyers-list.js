$(document).ready(function() {
    const buyersContainer = $('#buyersContainer');
    const searchByUsernameInput = $('#searchByUsernameInput');
    const searchButton = $('#searchButton');

    const urlParams = new URLSearchParams(window.location.search);
    const fetchBuyersListUrl = `/fetch-buyers-list?${urlParams.toString()}`;

    if (urlParams.has('username')) {
        searchByUsernameInput.val(urlParams.get('username'));
    }
    
    $.ajax({
        type: "GET",
        url: fetchBuyersListUrl,
        dataType: "json",
        success: function(response) {
            const buyers = response.buyers;

            const buyersHtml = buyers.reduce((finalHtml, buyer) => {
                return finalHtml + `
                    <div class="d-flex flex-column buyerItem p-3 me-2 mb-2">
                        <h3 class="text-dark buyerUsername">${buyer.username}</h3>
                    </div>
                `;
            }, '');

            buyersContainer.html(buyersHtml)
        },
    });

    searchButton.on('click', function() {
        const username = searchByUsernameInput.val();

        urlParams.delete('username');

        if (username) {
            urlParams.set('username', username);
        }

        window.location.href = `/buyers-list?${urlParams.toString()}`
    });
});
