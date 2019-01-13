/**
 * author sdh
 */
(function(window){
    function Model(store){
        this.store = store;
    }

    Model.prototype.read = function(callback,equals, filter){
        callback = callback || function () {};
        this.store.getAll(callback);
    }

    Model.prototype.add = function(title,callback){
        callback = callback || function () {};
        var newItem = {
            id : new Date().getTime(),
            title: title,
            completed: false
        };
        this.store.add(newItem,function(todos){
            callback.call(this,newItem,todos);
        })
    }

    Model.prototype.remove = function(id,callback){
        callback = callback || function () {};
        this.store.remove(id,function(todos){
            callback.call(this,id,todos);
        });
    }

    Model.prototype.update = function(updateItem,callback){
        callback = callback || function () {};
        this.store.update(updateItem,function(todos){
            callback.call(this,updateItem,todos);
        })
    }

    /*Model.prototype.changeAllStatus = function(status,callback){
        callback = callback || function () {};
        var list = JSON.parse(localStorage.getItem(this._dbName));
        for(let i = 0; i < list.length; i++){
            list[i].completed = status;
        }
        localStorage.setItem(this._dbName,JSON.stringify(list));
        callback.call(this,list);
    }*/

    Model.prototype.counter = function(callback){
        callback = callback || function () {};
        var list = JSON.parse(localStorage.getItem(this._dbName));
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
        callback.call(this,counter);
    }

    window.app = window.app || {};
    window.app.Model = Model;
}(window))