using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DiscuzzServer.Entities;

public class Transaction
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string SenderId { get; set; }
    public int Amount { get; set; }
    public string RecipientWalletAddress { get; set; }
    public DateTime Timestamp { get; set; }
}