// query a bunch of urls and concatenate all the
myModule = function () {
    var  queryTask;
    return {
        getSomeFeatures: function (urls) {
            var deferreds = [], deferred = new Deferred();

            urls.forEach(function (url) {
                queryTask = new QueryTask(url);
                deferreds.push(queryTask.execute(new Query()));
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
    }
}