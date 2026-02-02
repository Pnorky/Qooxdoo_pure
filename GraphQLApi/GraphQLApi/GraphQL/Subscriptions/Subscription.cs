using GraphQLApi.Models;
using HotChocolate;

namespace GraphQLApi.GraphQL.Subscriptions;

public class Subscription
{
    [Subscribe]
    public Student StudentAdded([EventMessage] Student student) => student;

    [Subscribe]
    public Student StudentUpdated([EventMessage] Student student) => student;

    /// <summary>
    /// Fired when a student is deleted. Payload contains the deleted student's Id.
    /// </summary>
    [Subscribe]
    public StudentDeletedEvent StudentDeleted([EventMessage] StudentDeletedEvent evt) => evt;
}

public record StudentDeletedEvent(int Id);
