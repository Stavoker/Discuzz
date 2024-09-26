using DiscuzzServer.Context;
using DiscuzzServer.Repositories;
using DiscuzzServer.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Allow requests from this origin
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
    
string connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"]!;
string databaseName = builder.Configuration["DatabaseName"]!;

builder.Services.AddSingleton(new DbContext(connectionString, databaseName));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowLocalhost3000");

app.UseHttpsRedirection();
app.MapControllers();
app.Run();