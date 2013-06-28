(function() {
    // Model
    var Task = Backbone.Model.extend({
        defaults: {
            title: 'do something!',
            completed: false
        }
    });

    var task = new Task();

    // View
    var TaskView = Backbone.View.extend({
        tagName: 'li',
        className: 'liClass',
        id: 'liId',

        // jQueryで外部のtemplateを読み込む
        template: _.template($('#task-template').html()),
        
        render: function() {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        }
    });

    var taskView = new TaskView({model: task});
    console.log(taskView.render().el);

    // レンダリングしたものをbodyにappendする
    $('body').append(taskView.render().el);
})();
