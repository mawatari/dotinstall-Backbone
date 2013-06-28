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
        template: _.template($('#task-template').html()),
        render: function() {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        }
    });

    // Collection
    var Tasks = Backbone.Collection.extend({
        model: Task
    });

    // Collection用のView
    var TasksView = Backbone.View.extend({
        // TaskViewの親要素となる要素なので、ここではul
        tagName: 'ul',
        render: function() {
            // renderする際（55-56行目）、collectionとして渡ってくるので、eachで処理する
            this.collection.each(function(task) {
                // 一つ一つのtaskをこの要素(ul)の中にrenderしていく
                var taskView = new TaskView({model: task});
                this.$el.append(taskView.render().el);
            // 関数内のthisを束縛するためコンテキストをthisにする。
            // http://qiita.com/yuku_t/items/1e88b198e2b0ddb21520
            }, this);
            return this;
        }
    });

    var tasks = new Tasks([
        {
            title: 'task1',
            completed: true
        },
        {
            title: 'task2'
        },
        {
            title: 'task3'
        }
    ]);

    var tasksView = new TasksView({collection: tasks});
    $('#tasks').html(tasksView.render().el);
})();
