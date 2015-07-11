function getSomeFeatures(urls) {
    var queryTask, query, allFeatures = [];
    urls.forEach(function (url) {
        queryTask = new QueryTask(url);
        query = new Query();
        query.where = "1=1";
        query.outFields = "*";
        query.returnGeometry = false;
        var d = queryTask.execute(query).then(function (response) {
            allFeatures.concat(response.features);
        })
    });


}