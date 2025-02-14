// Функція для відкриття модального вікна редагування
function openEditModal(id, name, dob, married, phone, salary) {
    const modal = document.getElementById("editModal");
    if (!modal) {
        console.error("Modal element not found!");
        return;
    }
    modal.style.display = "block";
    document.getElementById("editId").value = id;
    document.getElementById("editName").value = name;
    document.getElementById("editDateOfBirth").value = dob;
    document.getElementById("editMarried").checked = married === "true"; // Перетворюємо на булеве значення
    document.getElementById("editPhone").value = phone;
    document.getElementById("editSalary").value = salary;
}

// Закриття модального вікна
function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

// Збереження змін після редагування
function saveEdit() {
    const id = document.getElementById("editId").value;
    const updatedContact = {
        Name: document.getElementById("editName").value,
        DateOfBirth: document.getElementById("editDateOfBirth").value,
        Married: document.getElementById("editMarried").checked, 
        Phone: document.getElementById("editPhone").value,
        Salary: parseFloat(document.getElementById("editSalary").value)
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