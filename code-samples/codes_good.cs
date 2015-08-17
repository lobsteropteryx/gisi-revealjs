Get["/Contacts/{id}"] = parameters =>
{
    try
    {
        Contact contact = ContactRepository.GetById(parameters.id);
        return Response.AsJson(contact);
    }
    catch (Exception ex)
    {
        return Response.AsJson(ex.message).WithStatusCode(HttpStatusCode.InternalServerError);
        // Good ol' 500
    }
};