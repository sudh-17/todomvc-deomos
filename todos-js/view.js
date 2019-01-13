/**
 * author sdh
 * 
 */

(function(window){
    function View(){
        this.todoList = qs('.todo-list');
        this.newTodo = qs('.new-todo');
        this.todoCount = qs('.todo-count');
        this.footer = qs('.footer');
    }

    function Template() {
		this.defaultTemplate
		=	'<li data-id="{{id}}" class="{{completed}}">'
		+		'<div class="view">'
		+			'<input class="toggle" type="checkbox" {{checked}}>'
		+			'<label>{{title}}</label>'
		+			'<button class="destroy"></button>'
		+		'</div>'
		+	'</li>';
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
        var li = document.createElement('li');
        li.setAttribute('data-id',newItem.id);
        var div = document.createElement('div');
        div.className = 'view';
        var input = document.createElement('input');
        input.className = 'toggle';
        input.setAttribute('type','checkbox');
        var label = document.createElement('label');
        label.innerHTML = newItem.title;
        var button = document.createElement('button');
        button.className = 'destroy';
        li.appendChild(div);
        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(button);
        this.todoList.appendChild(li)
    }

    View.prototype.removeItem = function(id){
        var item = qs('[data-id="'+id+'"]');
        this.todoList.removeChild(item);
    }

    View.prototype.getItemObject = function(id){
        var item = qs('[data-id="'+id+'"]');
        let title = qs('label',item).innerText;
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
        var check = qs('input',item);
        check.checked = updateItem.completed;
        item.className = updateItem.completed ? 'completed': '';
    }

    View.prototype.clearNewTodo = function(){
        this.newTodo.value = '';
    }

    View.prototype.counter = function(list){
        list = list || [];
        var counter = {};
        counter.undone = 0;
        counter.done = 0;
        counter.total = list.length;
        for(let i = 0;i < list.length; i++){
            if(list[i].completed == false){
                counter.undone ++;
            }
            else{
                counter.done ++;
            }
        }
        if(counter.total == 0){
            this.footer.style.display = 'none';
        }
        else{
            this.footer.style.display = 'block';
            if(counter.undone > 1){
                qs('strong',this.todoCount).innerHTML = '<strong>'+counter.undone+'</strong>'+'items left';
            }
            else{
                qs('strong',this.todoCount).innerHTML = '<strong>'+counter.undone+'</strong>'+'item left';
            }
        }
        
    }

    View.prototype.setFilter = function(filter){
        var a = qsa('a',this.footer);
        for(let i = 0; i < a.length; i++){
            a[i].className = '';
        }
        if(filter == 'All'){
            var selected = qs('[href="#/"]',this.footer);
            selected.className = 'selected';
            
        }
        else if(filter == 'Active'){
            var selected = qs('[href="#/active"]',this.footer);
            selected.className = 'selected';
        }
        else if(filter == 'Completed'){
            var selected = qs('[href="#/completed"]',this.footer);
            selected.className = 'selected';
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


    window.app = window.app || {};
    window.app.View = View;
}(window))