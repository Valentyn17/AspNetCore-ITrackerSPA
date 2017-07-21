using System;
using System.Collections.Generic;
using System.Linq;
using ITrackerSPA.Models;
using ITrackerSPA.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITrackerSPA.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class IssuesController : Controller
    {
        private readonly AppDbContext _context;
        
        public IssuesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: /Issues
        [HttpGet]
        public IEnumerable<Issue> Index()
        {
            return _context.Issues.OrderByDescending(i => i.CreatedAt).ToList();
        }

        // GET: /Issues/5
        [HttpGet("{id}")]
        public IActionResult Details(int id)
        {
            var issue = _context.Issues.Where(i => i.IssueId == id).FirstOrDefault();
            if (issue == null)
                return Json(NotFound());

            return Ok(issue);
        }

        // POST: /Issues/Create
        [HttpPost]
        public IActionResult Create([FromBody] Issue issue)
        {           
            if (!ModelState.IsValid)
                return Json(BadRequest());

            // Validate enums
            if (!Enum.IsDefined(typeof(Priority), issue.Priority) ||
                !Enum.IsDefined(typeof(IssueType), issue.IssueType) ||
                !Enum.IsDefined(typeof(Status), issue.StatusType))
            {
                return Json(BadRequest());
            }

            // A small trick. Do not tell anyone... :)
            var projectId = issue.IssueId;
            var project = _context.Projects.Where(p => p.ProjectId == projectId).FirstOrDefault();
            if (project == null)
                return Json(NotFound());

            try
            {
                var newIssue = new Issue()
                {
                    Title = issue.Title,
                    Description = issue.Description,
                    Priority = issue.Priority,
                    IssueType = issue.IssueType,
                    StatusType = issue.StatusType,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Creator = issue.Creator,
                    Project = project
                };

                _context.Issues.Add(newIssue);
                _context.SaveChanges();

                // Fix for net::ERR_INCOMPLETE_CHUNKED_ENCODING
                newIssue.Project = null;

                return Json(newIssue);
            }
            catch(DbUpdateException)
            {
                return Json(BadRequest());
            }
        }

        // PUT: /Issues/5
        [HttpPut("{id}")]
        public IActionResult Edit(int id, [FromBody] Issue issue)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            
            var _issue = _context.Issues.Where(i => i.IssueId == id).FirstOrDefault();
            if (_issue == null)
                return Json(NotFound());
            
            // Validate enums
            if (!Enum.IsDefined(typeof(Priority), issue.Priority) ||
                !Enum.IsDefined(typeof(IssueType), issue.IssueType) ||
                !Enum.IsDefined(typeof(Status), issue.StatusType)) 
            {
                return Json(BadRequest());
            }

            // Only the fields we want to update
            _issue.Title = issue.Title;
            _issue.Priority = issue.Priority;
            _issue.IssueType = issue.IssueType;
            _issue.StatusType = issue.StatusType;
            _issue.Description = issue.Description;

            _context.Issues.Update(_issue);
            _context.SaveChanges();

            return Json(Ok());
        }

        // DELETE: /Issues/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var issue = _context.Issues.Where(i => i.IssueId == id).FirstOrDefault();
            if (issue == null)
                return Json(NotFound());

            try
            {
                _context.Issues.Remove(issue);
                _context.SaveChanges();
                return Json(Ok());
            }
            catch(DbUpdateException)
            {
                return Json(BadRequest());
            }
        }

        // GET: /Issues/5/Attachments
        [HttpGet("{id}/[action]")]
        public IEnumerable<Attachment> Attachments(int id)
        {
            return _context.Attachments.Where(i => i.Issue.IssueId == id)
                        .OrderByDescending(a => a.AttachmentId)
                        .ToList();
        }
    }
}
