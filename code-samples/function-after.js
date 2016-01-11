myModule = function () {
    return {
        getSomeFeatures: function (urls) {
            return all(urls.map(
                this.executeQueryTask.bind(this))).then(
                this.concatenateFeatures.bind(this));
        },

        executeQueryTask: function (url) {
            return new QueryTask(url).execute(new Query());
        },

        concatenateFeatures: function (results) {
            return results.reduce(function (previous, current) {
                return previous.features.concat(current.features);
            });
        }
    }
}