using System.IO;
using System.Linq;
using ITrackerSPA.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace ITrackerSPA.Controllers
{
    public class Utils
    {
        

        public static FileType GetFileType(IFormFile file)
        {
            string[] images = { "png", "jpg", "jpeg" };
            var fileExtension = Path.GetExtension(file.FileName);
            if (images.Any(e => fileExtension.Contains(e)))
                return FileType.Image;

            // Anyway...
            return FileType.Document;
        }

        public static bool isValidFile(IFormFile file) 
        {
            string[] allowedExtensions = { "png", "jpg", "jpeg", "pdf", "doc", "docx" };
            string fileExtension = Path.GetExtension(file.FileName);
            
            // Invalid file
            if (file == null || file.Length == 0)
                return false;

            // Maximum file size: 500kb
            if (file.Length >  512000)
                return false;
            
            // Only the above file extensions are allowed
            if (!allowedExtensions.Any(e => fileExtension.Contains(e)))
                return false;

            return true;
        }
    }
}
