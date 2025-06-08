using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/home")]
public class HomeController : ControllerBase
{
    [HttpGet("welcome")]
    public IActionResult GetWelcomeMessage()
    {
        return Ok("Hello Dhananjaya, welcome to the web project!");
    }
}
