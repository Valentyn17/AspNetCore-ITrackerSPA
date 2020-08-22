using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ITrackerSPA.Data;
using ITrackerSPA.Models;
using ITrackerSPA.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITrackerSPA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class IssuesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IssuesController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
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
                return NotFound();

            return Ok(issue);
        }

        // POST: /Issues/Create
        [HttpPost]
        public IActionResult Create([FromBody] Issue issue)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            // Validate enums
            if (!Enum.IsDefined(typeof(Priority), issue.Priority) ||
                !Enum.IsDefined(typeof(IssueType), issue.IssueType) ||
                !Enum.IsDefined(typeof(Status), issue.StatusType))
            {
                return BadRequest();
            }

            // A small trick. Do not tell anyone... :)
            var projectId = issue.IssueId;
            var project = _context.Projects.Where(p => p.ProjectId == projectId).FirstOrDefault();
            if (project == null)
                return NotFound();

            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = _context.Users.Find(userId);
            try
            {
                // Create new issue
                var newIssue = new Issue()
                {
                    Title = issue.Title,
                    Description = issue.Description,
                    Priority = issue.Priority,
                    IssueType = issue.IssueType,
                    StatusType = issue.StatusType,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Creator = user.UserName,
                    Project = project
                };

                _context.Issues.Add(newIssue);
                _context.SaveChanges();

                // Fix for net::ERR_INCOMPLETE_CHUNKED_ENCODING
                newIssue.Project = null;

                return Ok(newIssue);
            }
            catch (DbUpdateException)
            {
                return BadRequest();
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
                return NotFound();

            // Validate enums
            if (!Enum.IsDefined(typeof(Priority), issue.Priority) ||
                !Enum.IsDefined(typeof(IssueType), issue.IssueType) ||
                !Enum.IsDefined(typeof(Status), issue.StatusType))
            {
                return BadRequest();
            }

            // Only the fields we want to update
            _issue.Title = issue.Title;
            _issue.Priority = issue.Priority;
            _issue.IssueType = issue.IssueType;
            _issue.StatusType = issue.StatusType;
            _issue.Description = issue.Description;

            _context.Issues.Update(_issue);
            _context.SaveChanges();

            return Ok();
        }

        // DELETE: /Issues/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var issue = _context.Issues.Where(i => i.IssueId == id).FirstOrDefault();
            if (issue == null)
                return NotFound();

            try
            {
                _context.Issues.Remove(issue);
                _context.SaveChanges();
                return Ok();
            }
            catch (DbUpdateException)
            {
                return BadRequest();
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
