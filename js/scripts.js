$(document).ready(function () {
    let items = [];
    let filteredItems = [];
	// Dark mode toggle
    $('#toggle-dark-mode').click(function () {
        $('body').toggleClass('dark-mode');
    });
	// Add item
    $('#add-item-form').submit(function (e) {
        e.preventDefault();

        const itemName = $('#item-name').val().trim();
        const itemDescription = $('#item-description').val().trim();

        if (itemName && itemDescription) {
            const newItem = {
                name: itemName,
                description: itemDescription
            };
            items.push(newItem);
            filteredItems = items;
            renderTable(filteredItems);
            $('#item-name').val('');
            $('#item-description').val('');
        }
    });
	// Live Search
    $('#search').on('input', function () {
        const query = $(this).val().toLowerCase();
        filteredItems = items.filter(item => 
            item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
        );
        renderTable(filteredItems);
    });
	// Render table
    function renderTable(itemsToRender) {
        const tbody = $('#items-table tbody');
        tbody.empty();

        itemsToRender.forEach((item, index) => {
            const row = $('<tr>').append(
                $('<td>').attr('contenteditable', 'true').text(item.name).on('blur', function () {
                    item.name = $(this).text();
                }),
                $('<td>').attr('contenteditable', 'true').text(item.description).on('blur', function () {
                    item.description = $(this).text();
                }),
                $('<td>').append(
					// Delete Item
                    $('<button>').addClass('btn btn-danger').text('Delete').click(function () {
                        items.splice(items.indexOf(item), 1);  // Correctly remove item from the main items array
                        filteredItems = items.filter(filteredItem => 
                            filteredItem.name.toLowerCase().includes($('#search').val().toLowerCase()) ||
                            filteredItem.description.toLowerCase().includes($('#search').val().toLowerCase())
                        );
                        renderTable(filteredItems);
                    })
                )
            );
            tbody.append(row);
        });
    }

    // Sort items
    $('th').click(function () {
        const column = $(this).index();
        const order = $(this).hasClass('asc') ? 'desc' : 'asc';

        $(this).siblings().removeClass('asc desc');
        $(this).removeClass('asc desc').addClass(order);

        items.sort((a, b) => {
            let valueA = Object.values(a)[column];
            let valueB = Object.values(b)[column];
            
            if (order === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });

        filteredItems = items.filter(item => 
            item.name.toLowerCase().includes($('#search').val().toLowerCase()) ||
            item.description.toLowerCase().includes($('#search').val().toLowerCase())
        );
        renderTable(filteredItems);
    });
	
	// Contact form submission
    $('#contact-form').on('submit', function(event) {
        event.preventDefault();
        const username = $('#username').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const message = $('#message').val();
        alert(`Username: ${username}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`);
    });
});
