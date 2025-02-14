document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;
    const rowsPerPage = 10;
    const tbody = document.querySelector("#contactsTable tbody");
    let allContacts = Array.from(tbody.querySelectorAll("tr")); 
    let filteredContacts = [...allContacts];

    function displayContacts() {
        tbody.innerHTML = "";

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        filteredContacts.slice(start, end).forEach(row => tbody.appendChild(row));

        document.getElementById("prevPage").disabled = currentPage === 1;
        document.getElementById("nextPage").disabled = end >= filteredContacts.length;

        const totalPages = Math.ceil(filteredContacts.length / rowsPerPage) || 1;
        document.getElementById("pageInfo").innerText = `Page ${currentPage} of ${totalPages}`;
    }

    function filterByCategory() {
        const selectedCategory = document.getElementById("categoryFilter").value;

        if (selectedCategory === "all") {
            filteredContacts = [...allContacts];
        } else {
            filteredContacts = allContacts.filter(row => {
                return row.getAttribute("data-married") === selectedCategory;
            });
        }

        currentPage = 1;
        displayContacts();
    }

    document.getElementById("categoryFilter").addEventListener("change", filterByCategory);

    document.getElementById("prevPage").addEventListener("click", function (event) {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayContacts();
        }
    });

    document.getElementById("nextPage").addEventListener("click", function (event) {
        event.preventDefault();
        if ((currentPage * rowsPerPage) < filteredContacts.length) {
            currentPage++;
            displayContacts();
        }
    });

    displayContacts();
});