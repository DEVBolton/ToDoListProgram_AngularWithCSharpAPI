using TakeHomeTodoAPI.Dict;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ITHTA_Dict, THTA_Dict>(); //for imporved performance by reusing single instance
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

//Add CORS for security and access HTTP requests, allow UI access.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//enable app to use the setup CORS service.
app.UseCors();

//Map get list request to associated URL when respective HTTP GET request is received.
app.MapGet("/list", (ITHTA_Dict dictionary_) =>
{
    return Results.Ok(dictionary_.GetAll());
});

//map add item request to the associated URL when the respective HTTP POST request is received.
app.MapPost("/list", (ITHTA_Dict dictionary_, string itemDesc) =>
{
    if (string.IsNullOrWhiteSpace(itemDesc))
    {
        return Results.BadRequest("Please Provide Valid Item Description");
    }

    var item = dictionary_.Add(itemDesc);
    return Results.Created($"/list/{item.itemID}", item);
});

//Map delete request to the associated URL when the respective HTTP DELETE request is received.
app.MapDelete("/list/{ItemID:guid}", (ITHTA_Dict dictionary_, Guid itemID) =>
{
    //Return "Status 204" if successful, "404" if item not found
    return dictionary_.Delete(itemID) ? Results.NoContent() : Results.NotFound();
});

//run built application
app.Run();
