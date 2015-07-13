// query a bunch of urls and concatenate all the features
getSomeFeatures: function(urls) {
    var deferreds = [], deferred = new Deferred();

    urls.forEach(function (url) {
        var queryTask, query;
        queryTask = new QueryTask(url);
        query = new Query();
        query.where = "1=1";
        query.outFields = ["*"];
        query.returnGeometry = false;
        deferreds.push(queryTask.execute(query));
    });

    all(deferreds).then(function (results) {
        var features = [];
        results.forEach(function (result) {
            features = features.concat(result.features);
        });
        deferred.resolve(features);
    });
    return deferred;
}