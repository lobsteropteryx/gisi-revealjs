getSomeFeatures: function(urls) {
    return all(urls.map(
        this.executeQueryTask.bind(this))).then(
        this.concatenateFeatures.bind(this));
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