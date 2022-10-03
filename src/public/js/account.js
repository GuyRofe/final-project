const width = 900;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

$(document).ready(function() {
    const deleteAccountButton = $('#deleteAccountButton');
    const formError = $('#formError');
    const accountForm = $('#accountForm');
    const newUsernameInput = $('#newUsernameInput');
    const formHeader = $('#formHeader');
    const navUsername = $('#navUsername');
    
    deleteAccountButton.on('click', function() {
        $.ajax({
            type: "DELETE",
            url: "/delete-account",
            dataType: "json",
            success: function() {
                window.location.replace('/buyer-login');
            },
            error: function(response) {
                const responseMessage = response.responseText;
                const responseMessageObject = JSON.parse(responseMessage);

                formError.removeClass("d-none");
                formError.text(responseMessageObject.message);
            }
        });
    });

    accountForm.on('submit', function(e) {
        e.preventDefault();

        const username = newUsernameInput.val();

        if (!username) {
            formError.removeClass("d-none");
            formError.text('Please complete the form');

            return;
        }

        const postDataString = JSON.stringify({
            username,
        });

        $.ajax({
            type: "PATCH",
            url: "/edit-username",
            data: postDataString,
            contentType: "application/json",
            dataType: "json",
            success: function() {
                formHeader.text(`Your Account - ${username}`);
                navUsername.text(`Hello, ${username}`);
            },
            error: function(response) {
                const responseMessage = response.responseText;
                const responseMessageObject = JSON.parse(responseMessage);

                formError.removeClass("d-none");
                formError.text(responseMessageObject.message);
            }
        });
    });

    const svg = d3.select('#purchases-chart')
        .append('svg')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr("viewBox", [0, 0, width, height]);

    const getPurchasesUrl = `/get-${userRole === 0 ? 'buyer' : 'seller'}-purchases`;

    $.ajax({
        type: "GET",
        url: getPurchasesUrl,
        dataType: "json",
        success: function(response) {
            const purchases = response.purchases;

            const dayImMs = 86400000;

            const nowDate = new Date();
            nowDate.setHours(0, 0, 0, 0);
            
            const dates = [
                new Date(nowDate - 6 * dayImMs),
                new Date(nowDate - 5 * dayImMs),
                new Date(nowDate - 4 * dayImMs),
                new Date(nowDate - 3 * dayImMs),
                new Date(nowDate - 2 * dayImMs),
                new Date(nowDate - dayImMs),
                nowDate,
            ];

            const purchasesData = dates.map((dateDay) => {
                const dateString = dateDay.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                });

                const matchingPurchase = purchases.find((purchase) => purchase._id === dateString);

                return {
                    name: dateString,
                    count: matchingPurchase ? matchingPurchase.count : 0,
                };
            });

            function yAxis(g) {
                g.attr("transform", `translate(${margin.left}, 0)`)
                    .call(d3.axisLeft(y).ticks(null, purchasesData.format))
                    .attr("font-size", '20px')
            }
            
            function xAxis(g) {
                g.attr("transform", `translate(0,${height - margin.bottom})`)
                    .call(d3.axisBottom(x).tickFormat(i => purchasesData[i].name))
                    .attr("font-size", '20px')
            }

            const x = d3.scaleBand()
                .domain(d3.range(purchasesData.length))
                .range([margin.left, width - margin.right])
                .padding(0.1)
        
            const y = d3.scaleLinear()
                .domain([0, 50])
                .range([height - margin.bottom, margin.top])
        
            svg
            .append("g")
            .attr("fill", 'royalblue')
            .selectAll("rect")
            .data(purchasesData)
            .join("rect")
                .attr("x", (d, i) => x(i))
                .attr("y", d => y(d.count))
                .attr('title', (d) => d.count)
                .attr("class", "rect")
                .attr("height", d => y(0) - y(d.count))
                .attr("width", x.bandwidth());
        
            svg.append("g").call(xAxis);
            svg.append("g").call(yAxis);
            svg.node();
        },
    });
});