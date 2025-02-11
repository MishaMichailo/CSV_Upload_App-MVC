using CSV_Upload_App.Data;
using CSV_Upload_App.Models;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace CSV_Upload_App.Controllers
{

    public class CsvUploadController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CsvUploadController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> UploadCsv(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                TempData["ErrorMessage"] = "No file uploaded. Please upload a valid CSV file or check data inside of file.";
                return RedirectToAction("Index");
            }

            var permittedExtensions = new[] { ".csv" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (string.IsNullOrEmpty(fileExtension) || !permittedExtensions.Contains(fileExtension))
            {
                TempData["ErrorMessage"] = "Invalid file type. Please upload a CSV file or check data inside of file.";
                return RedirectToAction("Index");
            }

            try
            {
                using (var reader = new StreamReader(file.OpenReadStream()))
                using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    HeaderValidated = null,
                    MissingFieldFound = (args) =>
                    {
                        throw new Exception($"Missing field in CSV: {args.HeaderNames.FirstOrDefault()}");
                    }
                }))
                {
                    var contacts = csv.GetRecords<PersonInformation>().ToList();
                    _context.PersonInformations.AddRange(contacts);
                    await _context.SaveChangesAsync();
                }
            }
            catch (CsvHelperException ex)
            {
                TempData["ErrorMessage"] = $"Error parsing CSV: {ex.Message}";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = $"An unexpected error occurred: {ex.Message}";
                return RedirectToAction("Index");
            }

            TempData["SuccessMessage"] = "File uploaded and data successfully saved.";
            return RedirectToAction("Index");
        }
        [HttpPost]
        public async Task<IActionResult> EditCsvFile(int id, [FromBody] PersonInformation updatedContact)
        {
            var contact = await _context.PersonInformations.FindAsync(id);
            if (contact == null) return NotFound();

            contact.Name = updatedContact.Name;
            contact.DateOfBirth = updatedContact.DateOfBirth;
            contact.Married = updatedContact.Married;
            contact.Phone = updatedContact.Phone;
            contact.Salary = updatedContact.Salary;

            await _context.SaveChangesAsync();
            return Ok();
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteCsvFile(int id)
        {
            var contact = await _context.PersonInformations.FindAsync(id);
            if (contact == null) return NotFound("Контакт не знайдено.");

            _context.PersonInformations.Remove(contact);
            await _context.SaveChangesAsync();
            return Ok();
        }

        public IActionResult Index()
        {
            var contacts = _context.PersonInformations.ToList();
            return View("~/Views/Home/Index.cshtml", contacts);
        }
    }
}
