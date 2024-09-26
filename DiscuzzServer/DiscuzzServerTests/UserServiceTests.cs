using DiscuzzServer.Exceptions;
using DiscuzzServer.Repositories;
using DiscuzzServer.Services;
using Moq;

namespace DiscuzzServerTests;

public class UserServiceTests
{
    private Mock<IUserRepository> _userRepositoryMock;
    private UserService _userService;
    
    [SetUp]
    public void Setup()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _userService = new UserService(_userRepositoryMock.Object);
    }

    [Test]
    public async Task GetBalanceAsync_UserExists_ReturnsBalance()
    {
        
        // Arrange
        var userId = "user123";
        var expectedBalance = 100;
        _userRepositoryMock.Setup(r => r.UserExistsAsync(userId)).ReturnsAsync(true);
        _userRepositoryMock.Setup(r => r.GetBalanceAsync(userId)).ReturnsAsync(expectedBalance);

        // Act
        var balance = await _userService.GetBalanceAsync(userId);
        
        Console.WriteLine(expectedBalance + " " + balance);

        // Assert
        Assert.That(expectedBalance, Is.EqualTo(balance));
        
    }

    [Test]
    public void GetBalanceAsync_UserDoesNotExist_ThrowsNotFoundException()
    {
        
        // Arrange
        var userId = "user123";
        _userRepositoryMock.Setup(r => r.UserExistsAsync(userId)).ReturnsAsync(false);

        // Act & Assert
        var ex = Assert.ThrowsAsync<NotFoundException>(async () => await _userService.GetBalanceAsync(userId));
        Assert.That(ex?.Message, Is.EqualTo($"User with ID [{userId}] was not found!"));
        
    }
    
    [Test]
    public void AddTokensAsync_UserDoesNotExist_ThrowsNotFoundException()
    {
        
        // Arrange
        var userId = "user123";
        _userRepositoryMock.Setup(r => r.UserExistsAsync(userId)).ReturnsAsync(false);

        // Act & Assert
        var ex = Assert.ThrowsAsync<NotFoundException>(async () => await _userService.AddTokensAsync(userId, -10));
        Assert.That(ex?.Message, Is.EqualTo($"User with ID [{userId}] was not found!"));
        
    }

    [Test]
    public void AddTokensAsync_NegativeAmount_ThrowsBadRequestException()
    {
        
        // Arrange
        var userId = "user123";
        _userRepositoryMock.Setup(r => r.UserExistsAsync(userId)).ReturnsAsync(true);

        // Act & Assert
        var ex = Assert.ThrowsAsync<BadRequestException>(async () => await _userService.AddTokensAsync(userId, -10));
        Assert.That(ex?.Message, Is.EqualTo("Amount must be greater than zero!"));
        
    }
    
    [Test]
    public void AddTokensAsync_UserExists_ValidAmount_Success()
    {
        
        // Arrange
        var userId = "user123";
        _userRepositoryMock.Setup(r => r.UserExistsAsync(userId)).ReturnsAsync(true);

        // Act & Assert
        Assert.DoesNotThrowAsync(async() => await _userService.AddTokensAsync(userId, 10));
        
    }

    [Test]
    public void SubtractTokensAsync_UserDoesNotExist_ThrowsNotFoundException()
    {
        
        // Arrange
        var userId = "user123";
        _userRepositoryMock.Setup(r => r.UserExistsAsync(userId)).ReturnsAsync(false);

        // Act & Assert
        var ex = Assert.ThrowsAsync<NotFoundException>(async () => await _userService.SubtractTokensAsync(userId, -10));
        Assert.That(ex?.Message, Is.EqualTo($"User with ID [{userId}] was not found!"));
        
    }
    
    [Test]
    public void SubtractTokensAsync_ValidAmount_Success()
    {
        
        // Arrange
        var userId = "user123";
        var initialBalance = 100;
        var amount = 50;
        _userRepositoryMock.Setup(r => r.UserExistsAsync(userId)).ReturnsAsync(true);
        _userRepositoryMock.Setup(r => r.GetBalanceAsync(userId)).ReturnsAsync(initialBalance);
        
        // Act & Assert
        Assert.DoesNotThrowAsync(async () => await _userService.SubtractTokensAsync(userId, amount));
        
    }

    [Test]
    public void SubtractTokensAsync_InsufficientBalance_ThrowsBadRequestException()
    {
        
        // Arrange
        var userId = "user123";
        var initialBalance = 30;
        var amount = 50;
        _userRepositoryMock.Setup(r => r.UserExistsAsync(userId)).ReturnsAsync(true);
        _userRepositoryMock.Setup(r => r.GetBalanceAsync(userId)).ReturnsAsync(initialBalance);

        // Act & Assert
        var ex = Assert.ThrowsAsync<BadRequestException>(async () => await _userService.SubtractTokensAsync(userId, amount));
        Assert.That(ex?.Message, Is.EqualTo("Not enough tokens on user's balance!"));
        
    }
    
    [Test]
    public void SubtractTokensAsync_NegativeAmount_ThrowsBadRequestException()
    {
        
        // Arrange
        var userId = "user123";
        _userRepositoryMock.Setup(r => r.UserExistsAsync(userId)).ReturnsAsync(true);

        // Act & Assert
        var ex = Assert.ThrowsAsync<BadRequestException>(async () => await _userService.SubtractTokensAsync(userId, -10));
        Assert.That(ex?.Message, Is.EqualTo("Amount must be greater than zero!"));
        
    }
    
}