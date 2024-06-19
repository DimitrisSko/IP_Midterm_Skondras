$(document).ready(function() {
    let items = [];

    // Add item
    $('#item-form').on('submit', function(event) {
        event.preventDefault();
        const name = $('#item-name').val();
        const description = $('#item-description').val();
        items.push({ name, description });
        $('#item-name').val('');
        $('#item-description').val('');
        renderTable();
    });
	
    // Render table
    function renderTable() {
        const tbody = $('#items-table tbody');
        tbody.empty();
        items.forEach((item, index) => {
            const row = `<tr>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td><button class="btn btn-danger delete-btn" data-index="${index}">Delete</button></td>
            </tr>`;
            tbody.append(row);
        });
    }

    // Delete item
    $('#items-table').on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        items.splice(index, 1);
        renderTable();
    });

    // Sort items
    $('.sort-btn').on('click', function() {
        const sortField = $(this).data('sort');
        items.sort((a, b) => a[sortField].localeCompare(b[sortField]));
        renderTable();
    });

    // Dark mode toggle
    $('#toggle-dark-mode').on('click', function() {
        $('body').toggleClass('dark-mode');
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
