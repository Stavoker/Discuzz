namespace DiscuzzServer.Repositories;

public interface IUserRepository
{
    public Task<bool> UserExistsAsync(string userId);
    public Task<int> GetBalanceAsync(string userId);
    public Task AddTokensAsync(string userId, int amount);
}