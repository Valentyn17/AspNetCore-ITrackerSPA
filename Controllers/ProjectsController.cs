using System;
using System.Collections.Generic;
using System.Linq;
using ITrackerSPA.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITrackerSPA.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ProjectsController : Controller
    {
        private readonly AppDbContext _context;
        
        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: /Projects
        [HttpGet]
        public IEnumerable<Project> Index()
        {
            return _context.Projects.OrderByDescending(p => p.ProjectId).ToList();
        }

        // GET: /Projects/5
        [HttpGet("{id}")]
        public IActionResult Details(int id)
        {
            var project = _context.Projects.Where(p => p.ProjectId == id).FirstOrDefault();
            if (project == null)
                return Json(NotFound());
            
            return Ok(project);
        }
        
        [HttpPost]
        public IActionResult Create([FromBody] Project project)
        {
            if (!ModelState.IsValid)
                return Json(BadRequest());
            
            try
            {
                var newProject = new Project()
                {
                    Name = project.Name,
                    Url = project.Url,
                    Description = project.Description,
                    CreatedAt = DateTime.Now
                };

                _context.Projects.Add(newProject);
                _context.SaveChanges();

                return Json(Ok());
            }
            catch(DbUpdateException)
            {
                return Json(BadRequest());
            }
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, [FromBody] Project project)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            
            var _project = _context.Projects.Where(p => p.ProjectId == id).FirstOrDefault();
            if (_project == null)
                return Json(NotFound());
            
            // Only the fields we want to update
            _project.Name = project.Name;
            _project.Description = project.Description;
            _project.Url = project.Url;

            _context.Projects.Update(_project);
            _context.SaveChanges();

            return Json(Ok());
        }

        // DELETE: /Projects/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var project = _context.Projects.Where(p => p.ProjectId == id).FirstOrDefault();
            if (project == null)
                return Json(NotFound());
            
            try
            {
                _context.Projects.Remove(project);
                _context.SaveChanges();
                return Json(Ok());
            }
            catch(DbUpdateException)
            {
                return Json(BadRequest());
            }
        }

        // GET: /Projects/5/Issues
        [HttpGet("{id}/[action]")]
        public IEnumerable<Issue> Issues(int id)
        {
            return _context.Issues.Where(i => i.Project.ProjectId == id)
                        .OrderByDescending(i => i.IssueId)
                        .ToList();
        }
    }
}
