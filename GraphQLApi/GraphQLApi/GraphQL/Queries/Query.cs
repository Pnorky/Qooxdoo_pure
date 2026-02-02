using GraphQLApi.Data;
using GraphQLApi.Models;
using HotChocolate;
using HotChocolate.Data;
using Microsoft.EntityFrameworkCore;

namespace GraphQLApi.GraphQL.Queries;

public class Query
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public async Task<List<Student>> GetStudents([Service] AppDbContext context)
    {
        return await context.Students
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync();
    }

    public async Task<Student?> GetStudent(int id, [Service] AppDbContext context)
    {
        return await context.Students.FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Student?> GetStudentByStudentId(string studentId, [Service] AppDbContext context)
    {
        return await context.Students.FirstOrDefaultAsync(s => s.StudentId == studentId);
    }
}
