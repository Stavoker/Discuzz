using DiscuzzServer.Context;
using DiscuzzServer.Entities;
using MongoDB.Driver;

namespace DiscuzzServer.Repositories;

public class UserRepository : IUserRepository
{
    
    private readonly IMongoCollection<User> _users;

    public UserRepository(DbContext dbContext)
    {
        _users = dbContext.Users;
    }

    public async Task<bool> UserExistsAsync(string userId)
    {
        var filter = Builders<User>.Filter.Eq(user => user.Id, userId);
        var count = await _users.CountDocumentsAsync(filter);
        return count > 0;
    }

    public async Task<int> GetBalanceAsync(string userId)
    {
        var filter = Builders<User>.Filter.Eq(user => user.Id, userId);
        var user = await _users.Find(filter).FirstAsync(); 
        return user.NumberOfTokens; 
    }

    public async Task AddTokensAsync(string userId, int amount)
    {
        var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
        var update = Builders<User>.Update.Inc(x => x.NumberOfTokens, amount);
        await _users.UpdateOneAsync(filter, update);
    }
    
}