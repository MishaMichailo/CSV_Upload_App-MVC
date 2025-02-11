document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;
    const rowsPerPage = 10;
    let allContacts = [...document.querySelectorAll("#contactsTable tbody tr")];
    let filteredContacts = [...allContacts];

    function displayContacts() {
        const tbody = document.querySelector("#contactsTable tbody");
        tbody.innerHTML = ""; 

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        filteredContacts.slice(start, end).forEach(row => tbody.appendChild(row));

        document.getElementById("prevPage").disabled = currentPage === 1;
        document.getElementById("nextPage").disabled = end >= filteredContacts.length;

        const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);
        document.getElementById("pageInfo").innerText = `Page ${currentPage} of ${totalPages}`;
    }

    document.getElementById("categoryFilter").addEventListener("change", function () {
        const selectedCategory = this.value;

        if (selectedCategory === "all") {
            filteredContacts = [...allContacts];
        } else {
            filteredContacts = allContacts.filter(row => {
                const marriedStatus = row.cells[2].innerText.trim().toLowerCase();
                return marriedStatus === selectedCategory;
            });
        }

        currentPage = 1; 
        displayContacts();
    });

    document.getElementById("prevPage").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            displayContacts();
        }
    });

    document.getElementById("nextPage").addEventListener("click", function () {
        if ((currentPage * rowsPerPage) < filteredContacts.length) {
            currentPage++;
            displayContacts();
        }
    });

    displayContacts(); 
});