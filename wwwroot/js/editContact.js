document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("categoryFilter").addEventListener("change", filterByCategory);
});

function filterByCategory() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const rows = document.querySelectorAll("#contactsTable tbody tr");

    rows.forEach(row => {
        const category = row.dataset.category;
        row.style.display = selectedCategory === "" || category === selectedCategory ? "" : "none";
    });
}

function openEditModal(id, name, dob, married, phone, salary, category) {
    document.getElementById("editId").value = id;
    document.getElementById("editName").value = name;
    document.getElementById("editDateOfBirth").value = dob;
    document.getElementById("editMarried").checked = married;
    document.getElementById("editPhone").value = phone;
    document.getElementById("editSalary").value = salary;
    document.getElementById("editCategory").value = category;
    document.getElementById("editModal").style.display = "block";
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

function saveEdit() {
    const id = document.getElementById("editId").value;
    const updatedContact = {
        Name: document.getElementById("editName").value,
        DateOfBirth: document.getElementById("editDateOfBirth").value,
        Married: document.getElementById("editMarried").checked,
        Phone: document.getElementById("editPhone").value,
        Salary: parseFloat(document.getElementById("editSalary").value),
        Category: document.getElementById("editCategory").value
    };

    fetch(`/CsvUpload/EditCsvFile/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact)
    })
        .then(response => {
            if (response.ok) {
                location.reload();
            } else {
                alert("Помилка при збереженні змін!");
            }
        })
        .catch(error => console.error("Помилка:", error));
}
