using DiscuzzServer.Exceptions;
using DiscuzzServer.Services;

namespace DiscuzzServer.Controllers;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("/api/users")]
public class UsersController(IUserService userService) : ControllerBase
{
    [HttpGet("{userId}/tokens-balance")]
    public async Task<IActionResult> GetBalanceAsync(string userId)
    {
        try
        {
            var balance = await userService.GetBalanceAsync(userId);
            return Ok(new {balance});
        } 
        catch (NotFoundException e)
        {
            return NotFound(e.Message);
        }
        
    }
    
    [HttpPut("{userId}/add-tokens")]
    public async Task<IActionResult> AddTokensAsync(string userId, [FromQuery] int amount)
    {
        try
        {
            await userService.AddTokensAsync(userId, amount);
            return StatusCode(StatusCodes.Status204NoContent);
        }
        catch (BadRequestException e)
        {
            return BadRequest(e.Message);
        }
        catch (NotFoundException e)
        {
            return NotFound(e.Message);
        }
        
    }
    
    [HttpPut("{userId}/subtract-tokens")]
    public async Task<IActionResult> SubtractTokensAsync(string userId, [FromQuery] int amount)
    {
        try
        {
            await userService.SubtractTokensAsync(userId, amount);
            return StatusCode(StatusCodes.Status204NoContent);
        }
        catch (BadRequestException e)
        {
            return BadRequest(e.Message);
        }
        catch (NotFoundException e)
        {
            return NotFound(e.Message);
        }
        
    }
    
}