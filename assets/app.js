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
        tagName: 'li'
    });

    var taskView = new TaskView({model: task});
    // インスタンスのエレメントだけを表示する場合は、elプロパティを指定する
    console.log(taskView.el);
    // $をつけるとjQueryのオブジェクトになるので、append等が使える
    console.log(taskView.$el);
})();
