using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ITrackerSPA.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITrackerSPA.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AttachmentsController : Controller
    {
        private IHostingEnvironment _env;
        private readonly AppDbContext _context;
        
        public AttachmentsController(AppDbContext context, IHostingEnvironment env)
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
                return Json(NotFound());

            try
            {
                // Delete file from database
                _context.Attachments.Remove(attachment);
                _context.SaveChanges();

                // Delete file from disk
                var filePath = Path.Combine(_env.WebRootPath, attachment.Path);
                System.Console.WriteLine(filePath);
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);

                return Json(Ok());
            }
            catch(DbUpdateException)
            {
                return Json(BadRequest());
            }
        }
        
        // POST: /Attachments/Upload/{issueId}
        [HttpPut("[action]/{issueId}")]
        public async Task<IActionResult> Upload(int issueId, IFormFile file)
        {
            // Get issue to map the attachment
            var issue = _context.Issues.Where(i => i.IssueId == issueId).FirstOrDefault();
            if (issue == null)
                return Json(NotFound());

            // Basic validation
            if (!Utils.isValidFile(file))
                return Json(BadRequest());
            
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
                FileType = Utils.GetFileType(file),
                Issue = issue
            };
            _context.Attachments.Add(attachment);
            _context.SaveChanges();

            return Json(Ok());
        }
    }
}
