function Store(name){
    this.name = name;
    init(name);
}
function init(name){
    var local = localStorage.getItem(name);
    if(local == null){
        localStorage.setItem(name,JSON.stringify([]));
    }
}
Store.prototype = {
    get: function(){
        var list = JSON.parse(localStorage.getItem(this.name));
        return list;
    },
    set: function(list){
        localStorage.setItem(this.name,JSON.stringify(list));
    },
    add: function(newItem){
        var list = JSON.parse(localStorage.getItem(this.name));
        list.push(newItem);
        localStorage.setItem(this.name,JSON.stringify(list));
    },
    remove: function(id,equals){
        var list = JSON.parse(localStorage.getItem(this.name));
        for(var i = 0; i< list.length; i++){
            if(equals.call(this,id,list[i])){
                list.splice(i,1);
            }
        }
        localStorage.setItem(this.name,JSON.stringify(list));
    },
    destroy: function(){
        localStorage.setItem(this.name,JSON.stringify([]));
    },
    toString: function(){
        var list = JSON.parse(localStorage.getItem(this.name));
        console.log(list)
    }
    
}