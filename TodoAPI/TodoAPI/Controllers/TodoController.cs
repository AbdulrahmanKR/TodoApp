using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Data;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
        {
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/todo/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodo(int id)
        {
            var todo = await _context.TodoItems.FindAsync(id);
            if (todo == null) return NotFound();
            return todo;
        }


        // POST: api/todo
        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodo(TodoItem todo)
        {
            if(todo.Title.Length < 10)
            {
               return BadRequest(
                        new
                        {
                            error = "The task title must be at least 10 characters long."
                        }
                   );
            }

            _context.TodoItems.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodo), new {id  = todo.Id}, todo);
        }

        // PUT: api/todo/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, TodoItem todo)
        {
            if (id != todo.Id) return BadRequest();
            _context.Entry(todo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.TodoItems.FindAsync(id);

            if (todo == null) return NotFound();

            _context.TodoItems.Remove(todo);

            await _context.SaveChangesAsync();
            return NoContent();
        }


    }
}
