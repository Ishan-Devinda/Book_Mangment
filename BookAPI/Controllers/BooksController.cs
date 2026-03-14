using BookAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    // Simple in-memory list (static to persist across requests during runtime)
    private static readonly List<Book> _books = new();
    private static int _nextId = 1;

    // GET: api/Books
    [HttpGet]
    public ActionResult<IEnumerable<Book>> GetBooks()
    {
        return Ok(_books.OrderByDescending(b => b.Id));
    }

    // GET: api/Books/5
    [HttpGet("{id}")]
    public ActionResult<Book> GetBook(int id)
    {
        var book = _books.FirstOrDefault(b => b.Id == id);

        if (book == null)
        {
            return NotFound();
        }

        return Ok(book);
    }

    // POST: api/Books
    [HttpPost]
    public ActionResult<Book> CreateBook(Book book)
    {
        book.Id = _nextId++;
        _books.Add(book);

        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }

    // PUT: api/Books/5
    [HttpPut("{id}")]
    public IActionResult UpdateBook(int id, Book updatedBook)
    {
        if (id != updatedBook.Id)
        {
            return BadRequest();
        }

        var index = _books.FindIndex(b => b.Id == id);
        if (index == -1)
        {
            return NotFound();
        }

        _books[index] = updatedBook;

        return NoContent();
    }

    // DELETE: api/Books/5
    [HttpDelete("{id}")]
    public IActionResult DeleteBook(int id)
    {
        var book = _books.FirstOrDefault(b => b.Id == id);
        if (book == null)
        {
            return NotFound();
        }

        _books.Remove(book);

        return NoContent();
    }
}
