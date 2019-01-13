/**
 * author sdh
 * 数据层
 */
(function(window){
    function Store(name){
        this._dbName = name;
        var local = localStorage.getItem(name);
        if(local == null){
            localStorage.setItem(name,JSON.stringify([]));
        }
    }

	Store.prototype.get = function(callback){
		callback = callback || function () {};
        let todos = JSON.parse(localStorage.getItem(this._dbName));
        callback.call(this,todos);
	}

	Store.prototype.add = function(newItem,callback){
		callback = callback || function () {};
        let todos = JSON.parse(localStorage.getItem(this._dbName));
        todos.push(newItem);
        localStorage.setItem(this._dbName,JSON.stringify(todos));
        callback.call(this,todos);
	}
	
	Store.prototype.remove = function(id,callback){
		callback = callback || function () {};	
        let todos = JSON.parse(localStorage.getItem(this._dbName));
        for(let i=0 ;i<todos.length;i++){
            if(id == todos[i].id){
                todos.splice(i,1);
                break;
            }
        }
        localStorage.setItem(this._dbName,JSON.stringify(todos));
        callback.call(this,todos);
	}
	
	Store.prototype.update = function(updateItem,callback){
		callback = callback || function () {};
		let todos = JSON.parse(localStorage.getItem(this._dbName));
        for(let i=0 ;i < todos.length; i++){
            if(updateItem.id == todos[i].id){
                todos[i] = updateItem;
                break;
            }
        }
        localStorage.setItem(this._dbName,JSON.stringify(todos));
        callback.call(this,todos);
	}
	
	window.app = window.app || {};
    window.app.Store = Store;
    
}(window))