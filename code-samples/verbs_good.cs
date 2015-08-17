// Create
Post["/Contacts"] = parameters =>
{
    Contact contact = this.Bind<Contact>();
    contact = ContactRepository.Create(contact);
    return Response.AsJson(contact);
};
// Read
Get["/Contacts/{id}"] = parameters =>
{
    Contact contact = ContactRepository.GetById(parameters.id);
    return Response.AsJson(contact);
};
// Update
Put["/Contacts/{id}"] = parameters =>
{
    Contact contact = this.Bind<Contact>();
    ContactRepository.Update(contact);
    return Response.AsJson(contact);
};
// Delete
Delete["/Contacts/{id}"] = parameters =>
{
    ContactRepository.Delete(id);
    return Response.AsJson({success: true});
};