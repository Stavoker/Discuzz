using DiscuzzServer.Entities;
using MongoDB.Driver;

namespace DiscuzzServer.Context;

public class DbContext
{
    private readonly IMongoDatabase _database;

    public DbContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<User> Users => _database.GetCollection<User>("users");
    public IMongoCollection<Transaction> Transactions => _database.GetCollection<Transaction>("transactions");
    
}