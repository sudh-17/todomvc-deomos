/**
 * author sdh
 * 
 */

(function(window){
    function View(){
        this.todoList = qs('.todo-list');
        this.newTodo = qs('.new-todo');
        this.todoCount = qs('.todo-count');
        this.table = qs('.table');
        this.footer = qs('.panel-footer');
        this.clearCompleted = qs('.clear-completed');
    }

    function Template() {
		this.defaultTemplate
        ='<tr data-id="{{id}}" class="{{completed}}">'
        +'<th scope="row"><input class="toggle" type="checkbox" {{checked}}></th>'
        +'<td class="title">{{title}}</td>'
        +'<td><span class="destroy glyphicon glyphicon-trash" aria-hidden="true"></span></td>'
        +'</tr>';
	}
    
    View.prototype.show = function(entry){
        var view  = '';
        for(var i= 0 ;i < entry.length; i ++){
            var template = new Template().defaultTemplate;
            var id = entry[i].id;
            var title = entry[i].title;
            var completed = entry[i].completed ? 'completed' : '';
            var checked = entry[i].completed ? 'checked' : '';

            template = template.replace('{{id}}',id)
                .replace('{{completed}}',completed)
                .replace('{{checked}}',checked)
                .replace('{{title}}',title);

            view = view + template;
        }
        return view;
    }

    View.prototype.showItems = function(data){
        var self = this;
        self.todoList.innerHTML = self.show(data);
    }

    View.prototype.addItem = function(newItem){
        var tr = document.createElement('tr');
        tr.setAttribute('data-id',newItem.id);

        var th = document.createElement('th');
        th.setAttribute('scope',"row");
        var input = document.createElement('input');
        input.setAttribute('type','checkbox');
        input.className = 'toggle';
        th.appendChild(input);
        var td1 = document.createElement('td');
        td1.className = 'title';
        td1.innerHTML = newItem.title;

        var td2 = document.createElement('td');
        var span = document.createElement('span');
        span.className = 'destroy glyphicon glyphicon-trash';
        td2.appendChild(span);

        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        this.todoList.appendChild(tr)
    }

    View.prototype.removeItem = function(id){
        var item = qs('[data-id="'+id+'"]');
        this.todoList.removeChild(item);
    }

    View.prototype.getItemObject = function(id){
        var item = qs('[data-id="'+id+'"]');
        let title = qs('.title',item).innerText;
        let completed = qs('.toggle',item).checked;
        var obj = {
            id: id,
            title: title,
            completed: completed
        };
        return obj;
    }

    View.prototype.updateItem = function(updateItem){
        var id = updateItem.id;
        var item = qs('[data-id="'+id+'"]');
        var check = qs('.toggle',item);
        check.checked = updateItem.completed;
        item.className = updateItem.completed ? 'completed': '';
    }

    View.prototype.clearNewTodo = function(){
        this.newTodo.value = '';
    }

    View.prototype.counter = function(counter){
        
        if(counter.total == 0){
            this.footer.style.display = 'none';
            this.table.style.display = 'none';
            
        }
        else{
            this.footer.style.display = 'block';
            this.table.style.display = 'block';
            if(counter.left > 1){
                this.todoCount.innerHTML = '<strong>'+counter.left+' </strong>'+'items left';
            }
            else{
                this.todoCount.innerHTML = '<strong>'+counter.left+' </strong>'+'item left';
            }
        }
        if((counter.total - counter.left) > 0){
            this.clearCompleted.style.display = 'block';
        }
        else{
            this.clearCompleted.style.display = 'none';
        }
        
    }

    View.prototype.setFilter = function(filter){
        var a = qsa('.filters a',this.footer);
        for(let i = 0; i < a.length; i++){
            a[i].className = 'btn btn-default btn-xs';
        }
        if(filter == 'All'){
            var selected = qs('[href="#/"]',this.footer);
            selected.className = 'btn btn-primary btn-xs';
            
        }
        else if(filter == 'Active'){
            var selected = qs('[href="#/active"]',this.footer);
            selected.className = 'btn btn-primary btn-xs';
        }
        else if(filter == 'Completed'){
            var selected = qs('[href="#/Completed"]',this.footer);
            selected.className = 'btn btn-primary btn-xs';
        }
    }

    View.prototype.bindAddAction = function(handler){
        $delegated(document,'.new-todo','keydown',handler);
    }

    View.prototype.bindDelAction = function(handler){
        $delegated(this.todoList,'.destroy','click',handler);
    }

    View.prototype.bindFilterAction = function(handler){
        $delegated(this.footer,'a','click',handler);
    }

    View.prototype.bindToggleAction = function(handler){
        $delegated(this.todoList,'.toggle','click',handler);
    }

    View.prototype.bindToggleAllAction = function(handler){
        $delegated(document,'.toggle-all','click',handler);
    }

    View.prototype.bindClearCompleted = function(handler){
        $delegated(this.footer,'.clear-completed','click',handler);
    }


    window.app = window.app || {};
    window.app.View = View;
}(window))