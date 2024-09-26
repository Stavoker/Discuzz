namespace DiscuzzServer.Services;

public interface IUserService
{
    public Task<int> GetBalanceAsync(string userId);
    public Task AddTokensAsync(string userId, int amount);
    public Task SubtractTokensAsync(string user, int amount);
}