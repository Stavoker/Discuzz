using DiscuzzServer.Exceptions;
using DiscuzzServer.Repositories;

namespace DiscuzzServer.Services;

public class UserService : IUserService
{
    
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    public async Task<int> GetBalanceAsync(string userId)
    {
        
        if (!await _userRepository.UserExistsAsync(userId))
        {
            throw new NotFoundException("User with ID [" + userId + "] was not found!");
        }

        return await _userRepository.GetBalanceAsync(userId);

    }

    public async Task AddTokensAsync(string userId, int amount)
    {
        if (!await _userRepository.UserExistsAsync(userId))
        {
            throw new NotFoundException("User with ID [" + userId + "] was not found!");
        }

        if (amount <= 0)
        {
            throw new BadRequestException("Amount must be greater than zero!");
        }
        
        await _userRepository.AddTokensAsync(userId, amount);
    }

    public async Task SubtractTokensAsync(string userId, int amount)
    {
        if (!await _userRepository.UserExistsAsync(userId))
        {
            throw new NotFoundException("User with ID [" + userId + "] was not found!");
        }

        if (amount <= 0)
        {
            throw new BadRequestException("Amount must be greater than zero!");
        }

        if (await _userRepository.GetBalanceAsync(userId) - amount < 0)
        {
            throw new BadRequestException("Not enough tokens on user's balance!");
        }
        
        await _userRepository.AddTokensAsync(userId, -amount);
    }
    
}