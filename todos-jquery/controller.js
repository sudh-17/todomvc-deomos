function Controller(){
    this.store = new Store('todos');
}

Controller.prototype = {
    add: function(name){
        if(name == null){
            return;
        }
        var newItem = {
            id: new Date().getTime(),
            name: name,
            completed: false
        };
        this.store.add(newItem);
    },
    remove: function(id){
        this.store.remove(id,function(a,b){
            return a == b.id;
        });
    },
    get: function(){
        return this.store.get();
    },
    print: function(){
        console.log(this.store.get());
    },
    update: function(item){
        if(item == null) return ;
        var list = this.store.get();
        for(var i = 0; i < list.length; i++){
            if(item.id == list[i]['id']){
                list[i] = item;
                break;
            }
        }
        this.store.set(list);
    },
    clearCompleted: function(){
        var list = this.store.get();
        var newList = [];
        for(var i = 0; i < list.length; i++){
            if(false == list[i]['completed']){
               newList.push(list[i]);
            }
        }
        this.store.set(newList);
    },
    checkedAll: function(n){
        if(n == null) return;
        var list = this.store.get();
        for(var i = 0; i < list.length; i++){
            list[i]['completed'] = n;
        }
        this.store.set(list);
    },
    itemLeft: function(){
        var todos = this.store.get();
        var size = todos.length;
        var count = 0;
        for(var i = 0;i< todos.length;i++){
            if(todos[i].completed == false){
                count ++ ;
            }
        }
        return count;
    }
}
