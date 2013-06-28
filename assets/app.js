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
        // class, id を付与する場合は以下の通り
        className: 'liClass',
        id: 'liId',

        // templateを定義する
        // クオートはダブルとシングルで意味が変わるので注意
        template: _.template("<%- title %>"),
        
        // renderを定義
        // modelをJSONで得て、テンプレートにはめる
        // ViewのエレメントにHTMLとして挿入
        // return thisをしておくのが作法。メソッドチェーン等を使うときに恩恵を受けれる
        render: function() {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        }
    });

    var taskView = new TaskView({model: task});
    // renderメソッドを実行し、その中のエレメントを得る
    console.log(taskView.render().el);
})();
