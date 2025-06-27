using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Collections.Generic;
using System.Linq;

namespace webproject_backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest login)
        {
            try
            {
                var users = new List<AppUser>
                {
                    new AppUser { Email = "admin@email.com", Password = "admin123", Role = "Admin" },
                    new AppUser { Email = "user@email.com", Password = "user123", Role = "User" }
                };

                var matchedUser = users.FirstOrDefault(u =>
                    u.Email.Equals(login.Email, StringComparison.OrdinalIgnoreCase) &&
                    u.Password == login.Password);

                if (matchedUser == null)
                    return Unauthorized("Invalid email or password.");

                var token = GenerateJwtToken(matchedUser);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login Error: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        private string GenerateJwtToken(AppUser user)
        {
            var key = _config["Jwt:Key"];
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];

            if (string.IsNullOrEmpty(key))
                throw new Exception("JWT Key is missing in configuration.");
            if (string.IsNullOrEmpty(issuer))
                throw new Exception("JWT Issuer is missing in configuration.");
            if (string.IsNullOrEmpty(audience))
                throw new Exception("JWT Audience is missing in configuration.");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public class LoginRequest
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        public class AppUser
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
            public string Role { get; set; } = string.Empty;
        }
    }
}
