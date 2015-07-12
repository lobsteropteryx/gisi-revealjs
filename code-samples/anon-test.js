define('multiQuery', [
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/promise/all",
    "dojo/domReady!"
], function(
    QueryTask,
    Query,
    declare,
    lang,
    all
    ) {
    return declare(null, {
        // query a bunch of urls and concatenate all the features
        getSomeFeatures: function(urls) {
            return all(urls.map(
                lang.hitch(this, this.executeQueryTask))).then(
                    lang.hitch(this, this.concatenateFeatures));
        },

        executeQueryTask: function(url) {
            return new QueryTask(url).execute(this.getQuery());
        },

        getQuery: function() {
            var query = new Query();
            query.where = "1=1";
            query.outFields = ["*"];
            query.returnGeometry = false;
            return query;
        },

        concatenateFeatures: function(results) {
            return results.reduce(function (previous, current) {
                return previous.features.concat(current.features);
            });
        }
    });
});

require(["multiQuery"], function(MultiQuery){
    var urls, multiquery = new MultiQuery();
    urls = [
        "http://services.nationalmap.gov/arcgis/rest/services/WFS/transportation/MapServer/1",
        "http://services.nationalmap.gov/arcgis/rest/services/WFS/transportation/MapServer/2"
    ];
    multiquery.getSomeFeatures(urls).then(function (features) {
        console.log(features);
    });

});