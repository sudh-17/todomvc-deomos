/**
 * author sdh
 * 数据层
 */
(function(window){
    function Store(name){
        this._dbName = name;
        var local = localStorage.getItem(name);
        if(local == null){
            var todos = {
                total: 0,
                completed: 0,
                list: []
            };
            localStorage.setItem(name,JSON.stringify(todos));
        }
    }

	Store.prototype.get = function(callback,equals){
		callback = callback || function () {};
        let todos = JSON.parse(localStorage.getItem(this._dbName));
        if(equals == null){
            callback.call(this,todos);
        }
        else{
            let subList = [];
            for(let i = 0; i < todos.list.length;i++){
                if(equals.call(this,todos.list[i]) == true){
                    subList.push(todos.list[i]);
                }
            }
            var subTodos = {
                total : todos.total,
                completed : todos.completed,
                list : subList
            }
            callback.call(this,subTodos);
        }
	}

	Store.prototype.add = function(newItem,callback){
		callback = callback || function () {};
        let todos = JSON.parse(localStorage.getItem(this._dbName));
        todos.list.push(newItem);
        todos.total ++;
        localStorage.setItem(this._dbName,JSON.stringify(todos));
        callback.call(this,todos);
	}
	
	Store.prototype.remove = function(id,callback){
		callback = callback || function () {};	
        let todos = JSON.parse(localStorage.getItem(this._dbName));
        for(let i=0 ;i<todos.list.length;i++){
            if(id == todos.list[i].id){
                if(todos.list[i].completed == true){
                    todos.completed --;
                }
                todos.list.splice(i,1);
                todos.total --;
                break;
            }
        }
        localStorage.setItem(this._dbName,JSON.stringify(todos));
        callback.call(this,todos);
	}
	
	Store.prototype.update = function(updateItem,callback){
		callback = callback || function () {};
		let todos = JSON.parse(localStorage.getItem(this._dbName));
        for(let i=0 ;i < todos.list.length; i++){
            if(updateItem.id == todos.list[i].id){
                if(todos.list[i].completed != updateItem.completed && updateItem.completed == false){
                    todos.completed --;
                }
                if(todos.list[i].completed != updateItem.completed && updateItem.completed == true){
                    todos.completed ++;
                }
                todos.list[i] = updateItem;
                break;
            }
        }
        localStorage.setItem(this._dbName,JSON.stringify(todos));
        callback.call(this,todos);
    }
    
    Store.prototype.clearCompleted = function(callback){
        callback = callback || function () {};
        let todos = JSON.parse(localStorage.getItem(this._dbName));
        let list = [];
        let count = 0;
        for(let i=0 ;i < todos.list.length; i++){
            if(false == todos.list[i].completed){
                list.push(todos.list[i]);
                count ++;
            }
        }
        todos.total -= count;
        todos.completed = 0;
        todos.list = list;
        localStorage.setItem(this._dbName,JSON.stringify(todos));
        callback.call(this,todos);
    }
	
	window.app = window.app || {};
    window.app.Store = Store;
    
}(window))