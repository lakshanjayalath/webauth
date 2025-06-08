using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webproject_backend.Models;
using webproject_backend.Services;

namespace webproject_backend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var response = await _authService.Login(loginRequest);
            return Ok(response);
        }
    }
}