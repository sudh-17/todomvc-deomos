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

    View.prototype.templete = function(item){
        let tmp = `<tr data-id="${item.id}" class="${item.completed ? 'completed':''}">
            <th scope="row"><input class="toggle" type="checkbox" checked="${item.completed}"></th>
            <td class="title">${item.title}</td>
            <td><span class="destroy glyphicon glyphicon-trash" aria-hidden="true"></span></td>
        </tr>`;
        return tmp;
    }
    
    View.prototype.show = function(entry){
        var view  = '';
        for(var i= 0 ;i < entry.length; i ++){
            view = view + this.templete(entry[i]);
        }
        return view;
    }

    View.prototype.showItems = function(data){
        var self = this;
        self.todoList.innerHTML = self.show(data);
    }

    View.prototype.addItem = function(newItem){
        let tmp = document.createElement('table');
        tmp.innerHTML = `
        <tr data-id="${newItem.id}" class="${newItem.completed ? 'completed':''}">
            <th scope="row"><input class="toggle" type="checkbox" checked="${newItem.completed}"></th>
            <td class="title">${newItem.title}</td>
            <td><span class="destroy glyphicon glyphicon-trash" aria-hidden="true"></span></td>
        </tr>
        `;
        this.todoList.appendChild(tmp.querySelector('tr'));
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