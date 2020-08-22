using ITrackerSPA.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITrackerSPA.Models
{
    public class Attachment
    {
        public int AttachmentId { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public FileType FileType { get; set; }
        public DateTime CreatedAt { get; set; }

        public Issue Issue { get; set; }
    }
}
