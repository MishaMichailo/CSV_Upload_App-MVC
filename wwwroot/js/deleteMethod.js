function deleteContact(id) {
    fetch(`/CsvUpload/DeleteCsvFile/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                location.reload();
            } else {
                alert("Помилка при видаленні контакту.");
            }
        })
        .catch(error => console.error("Помилка:", error));
}