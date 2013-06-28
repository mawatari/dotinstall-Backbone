(function() {
    // Model
    var Task = Backbone.Model.extend({
        defaults: {
            title: 'do something!',
            completed: false
        },
        validate: function(attrs) {
            if (_.isEmpty(attrs.title)) {
                return "title must not be empty!";
            }
        },
        // メソッドのようなものも作れる
        toggle: function() {
            this.set('completed', !this.get('completed'));
        }
    });

    var task = new Task({
        completed: true
    });

    // set, get
//    task.set('title', 'newTitle');
//    var title = task.get('title');
//    console.log(title);

    console.log(task.toJSON());
//    task.toggle();
    task.set({title: ''}, {validate: true});
    console.log(task.toJSON());
//    task.toggle();
//    console.log(task.toJSON());
})();
