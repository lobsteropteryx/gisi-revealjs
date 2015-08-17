Get["/Contacts/{id}"] = parameters =>
{
    try
    {
        Contact contact = ContactRepository.GetById(parameters.id);
        return Response.AsJson(contact);
    }
    catch (Exception ex)
    {
        return Response.AsJson({
            hasError: true,
            success: false,
            message: ex.message
        }); // This goes out as 200 OK!
    }
};