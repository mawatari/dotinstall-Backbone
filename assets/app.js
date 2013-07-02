(function() {
    // TaskModel
    var Task = Backbone.Model.extend({
        // 初期値の定義
        defaults: {
            title: 'do something',
            completed: false
        },
        // validateの定義
        validate: function(attrs) {
            // タイトルは必須とする
            if (_.isEmpty(attrs.title)) {
                return "タスクが空白です。";
            }
        },
        // インスタンス生成時にコールされる
        initialize: function() {
            // on: イベントが発火した際に指定したコールバック関数を実行する
            // invalid: validateが失敗したときに発生するイベント
            this.on('invalid', function(model, error) {
                $('#error').html(error);
            });
        }
    });

    // TasksCollection
    var Tasks = Backbone.Collection.extend({model: Task});

    // TaskView
    // TaskModelを表示する為のビュー
    var TaskView = Backbone.View.extend({
        // タグ名を定義
        tagName: 'li',
        // インスタンス生成時にコールされる
        initialize: function() {
            // on: イベントが発火した際に指定したコールバック関数を実行する
            // destroy: モデルが削除された際に発生するイベント
            this.model.on('destroy', this.remove, this);
            // change: モデルに変更があった際に発生するイベント
            this.model.on('change', this.render, this);
        },
        // イベントをセット
        events: {
            // .deleteクラスにクリックイベントを追加
            'click .delete': 'destroy',
            // .toggleクラスにクリックイベントを追加
            'click .toggle': 'toggle'
        },
        // クリックイベントから実行される
        toggle: function() {
            // 現在のcompletedプロパティを得て、反転させてセットする
            this.model.set('completed', !this.model.get('completed'));
        },
        // クリックイベントから実行される
        destroy: function() {
            if (confirm('削除してもよいですか？')) {
                // Modelのdestroyイベントを発生させる
                this.model.destroy();
            }
        },
        // Modelのdestroyイベント発生時に実行される
        // 削除の流れを整理
        // 1. eventsよって定義された.deleteクラスのクリックイベントが発生
        // 2. TaskViewのdestroyメソッドが実行される
        // 3. confirmを通過後、TaskModelのdestroyメソッドが実行される
        // 4. initializeする際に追加されたイベント監視により、TaskModelのdestroyイベント発生を感知、TaskViewのremoveメソッドが実行される
        remove: function() {
            // Viewの要素をremoveする
            this.$el.remove();
        },
        // テンプレートを得る
        template: _.template($('#task-template').html()),
        // 描画に関する定義
        render: function() {
            // データをJSONで得て、テンプレートにはめる
            var template = this.template(this.model.toJSON());
            // ViewのエレメントにHTMLとして挿入
            this.$el.html(template);
            // return thisをしておくのが作法。メソッドチェーン等を使うときに恩恵を受けれる
            return this;
        }
    });

    // TasksView
    // TasksCollectionを表示する為のビュー
    var TasksView = Backbone.View.extend({
        // Collectionのタグを定義
        tagName: 'ul',
        initialize: function() {
            this.collection.on('add', this.addNew, this);
            // 変更、削除イベント時に残タスクを再計算
            this.collection.on('change', this.updateCount, this);
            this.collection.on('destroy', this.updateCount, this);
        },
        // タスク追加のメソッドを定義
        addNew: function(task) {
            // タスクのインスタンスを作成
            var taskView = new TaskView({model: task});
            // タスクを子要素として追加し、描画する
            this.$el.append(taskView.render().el);
            // 新規追加後、入力フォームを空にし、フォーカスする
            $('#title').val('').focus();
            // 新規追加後、残タスクを再計算
            this.updateCount();
        },
        // 残タスクを数えるメソッドを定義
        updateCount: function() {
            var uncompletedTasks = this.collection.filter(function(task) {
                return !task.get('completed');
            });
            $('#count').html(uncompletedTasks.length);
        },
        // renderを定義
        render: function() {
            // renderする際（163行目）、collectionとして渡ってくるので、eachで処理する
            this.collection.each(function(task) {
                var taskView = new TaskView({model: task});
                // 一つ一つのtaskをこの要素(ul)の中にrenderしていく
                this.$el.append(taskView.render().el);
            }, this);
            this.updateCount();
            return this;
        }
    });

    // AddTaskView
    // タスク追加フォームからの処理を定義
    var AddTaskView = Backbone.View.extend({
        el: '#addTask',
        events: {
            'submit': 'submit'
        },
        // submitイベントの定義
        submit: function(e) {
            // 独自に処理を実装するため、サブミットのキャンセル
            e.preventDefault();
            // TaskModelのインスタンスを作成
            var task = new Task();
            // #titleのvalueを得て、コレクションに追加する
            if (task.set({title: $('#title').val()}, {validate: true})) {
                this.collection.add(task);
                // 新規追加が成功した場合は、エラーをクリアする
                $('#error').empty();
            }
        }
    });

    // tasksのインスタンスを作成、初期データも定義した
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

    // TasksView（タスク一覧）のインスタンスを作成
    var tasksView = new TasksView({collection: tasks});

    // addTaskView（タスク追加）のインスタンスを作成
    var addTaskView = new AddTaskView({collection: tasks});

    // Collectionを描画
    $('#tasks').html(tasksView.render().el);
})();
