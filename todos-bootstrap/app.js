(function(){

    function Todo(){
        this.store = new app.Store('todos1');
		this.model = new app.Model(this.store);
		this.view = new app.View();
		this.controller = new app.Controller(this.model, this.view);
    }

    var todo = new Todo();
    todo.controller.showAll();
    todo.controller.bind();
}())