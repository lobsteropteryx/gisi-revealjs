Get["/contact/create/{name}/{email}/{phone}"] = parameters =>
{
    Contact contact = ContactRepository.Create(parameters.name, parameters.email, parameters.phone));
    return Response.AsJson(contact);
};

Get["/contact/update/{id}/{name}/{email}/{phone}"] = parameters =>
{
    Contact contact = ContactRepository.Update(parameters.id, parameters.name, parameters.email, parameters.phone));
    return Response.AsJson(contact);
};
