using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ITrackerSPA.Data;
using ITrackerSPA.Models;
using ITrackerSPA.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITrackerSPA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AttachmentsController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly ApplicationDbContext _context;

        public AttachmentsController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: /Attachments
        [HttpGet]
        public IEnumerable<Attachment> Index()
        {
            return _context.Attachments.OrderByDescending(a => a.AttachmentId).ToList();
        }

        // DELETE: /Attachments/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var attachment = _context.Attachments.Where(a => a.AttachmentId == id).FirstOrDefault();
            if (attachment == null)
                return NotFound();

            try
            {
                // Delete file from database
                _context.Attachments.Remove(attachment);
                _context.SaveChanges();

                // Delete file from disk
                var filePath = Path.Combine(_env.WebRootPath, attachment.Path);
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);

                return Ok();
            }
            catch (DbUpdateException)
            {
                return BadRequest();
            }
        }

        // POST: /Attachments/Upload/{issueId}
        [HttpPut("[action]/{issueId}")]
        public async Task<IActionResult> Upload(int issueId, IFormFile file)
        {
            // Get issue to map the attachment
            var issue = _context.Issues.Where(i => i.IssueId == issueId).FirstOrDefault();
            if (issue == null)
                return NotFound();

            // Basic validation
            if (!IsValidFile(file))
                return BadRequest();

            // Save file
            var fileName = Path.GetFileNameWithoutExtension(file.FileName) + "_" +
                            DateTime.Now.ToString("yyyyMMddHHmmss") +
                            Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_env.WebRootPath, fileName);
            using (var fs = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fs);
                // file.CopyTo(fs);
            }

            // Save file record to db
            Attachment attachment = new Attachment()
            {
                Name = Path.GetFileNameWithoutExtension(file.FileName),
                CreatedAt = DateTime.Now,
                Path = fileName,
                FileType = GetFileType(file),
                Issue = issue
            };
            _context.Attachments.Add(attachment);
            _context.SaveChanges();

            return Ok();
        }

        private FileType GetFileType(IFormFile file)
        {
            string[] allowedExtensions = { "png", "jpg", "jpeg" };
            var fileExtension = Path.GetExtension(file.FileName);
            if (allowedExtensions.Any(e => fileExtension.Contains(e)))
                return FileType.Image;

            // Anyway...
            return FileType.Document;
        }

        private bool IsValidFile(IFormFile file)
        {
            string[] allowedExtensions = { "png", "jpg", "jpeg", "pdf", "doc", "docx" };
            string fileExtension = Path.GetExtension(file.FileName);

            // Invalid file
            if (file == null || file.Length == 0)
                return false;

            // Maximum file size allowed: 500kb
            if (file.Length > 512000)
                return false;

            // Only the above file extensions are allowed
            if (!allowedExtensions.Any(e => fileExtension.Contains(e)))
                return false;

            return true;
        }
    }
}
