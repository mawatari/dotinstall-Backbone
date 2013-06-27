(function() {
    // Model
    var Task = Backbone.Model.extend({
        // defaults の指定もできる
        defaults: {
            title: 'do something!',
            completed: false
        }
    });
    
    var task = new Task({
        completed: true
    });

    // toJSON() とすれば、attributesプロパティのみを返してくれる
    console.log(task.toJSON());
})();
