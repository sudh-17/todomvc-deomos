(function(){

    var ctl = new Controller();

    function initTodos(){
        var list = $('#list');
        list.html('');//**清空 */
        var completed = null;
        var btnGp = $('button[name=btnGp]');
        $.each(btnGp,function(i,btn){
            var className = btn.className;
            if(className.indexOf("selected") != -1){
                if($(btn).text() == 'active'){
                    completed = false;
                }
                else if($(btn).text() == 'completed'){
                    completed = true;
                }
            }
        })
        //append list
        var todos = ctl.get();
        if(completed == null){
            $.each(todos,function(i,n){
                appendTodo(n);
            })
        }
        else{
            $.each(todos,function(i,n){
                if(completed == n.completed){
                    appendTodo(n);
                }
            })
        }

        //item left
        var left = ctl.itemLeft();
        $('#itemLeft').text(left);

        //display footer
        if(todos == null || todos.length == 0 ){
            $('.footer').hide();
        }
        else{
            $('.footer').show();
        }
    }

    function appendTodo(todo){
        
        var $li = $('<li data-id="'+todo.id+'"></li>');
        var $view = $('<div class="view"></div>');
        var $check = $('<input type="checkbox" name="items">').attr("checked", todo.completed);
        var $label = $('<label >'+todo.name+'</label>').addClass(todo.completed ?'done':'');
        var $btn = $('<button class="del">×</button></div></li>');
        $view.append($check);
        $view.append($label);
        $view.append($btn);
        $li.append($view);
        $('#list').append($li);
        $check.on('click',function(){
            //勾选事件
            todo.completed = this.checked;
            ctl.update(todo);
            initTodos();
        });
        $btn.on('click',function(){
            del(todo.id);
        });
        $li.on('dblclick',function(){
            console.log('fff')
            var $edt = $('<input class="edit">').val(todo.name);
            $(this).append($edt);
            $edt.focus();
            $edt.on('blur',function(){
                todo.name = $(this).val();
                ctl.update(todo);
                initTodos();
            });
            $edt.on('keydown',function(e){
                if(e.keyCode == 13){
                    todo.name = $(this).val();
                    ctl.update(todo);
                    initTodos();
                }
            });
        })
        
    }

    //** 删除**/
    function del(id){
        ctl.remove(id);
        initTodos();
    }

    /** 初始化**/
    initTodos();

    /**新增 */
    $('#input').on('keydown', function(e){
        if(e.keyCode == 13){
            
            var val = $(this).val();
            if(val.trim() == ''){
                return ;
            }
            ctl.add(val);
            initTodos();//重新加载todos
            $(this).val('');
        }
    });

    /**clear */
    $('#btnClear').on('click',function(e){
        ctl.clearCompleted();
        initTodos();
    });

    /**按钮组事件 */
    $('button[name=btnGp]').on('click',function(){
        $('button[name=btnGp]').removeClass('selected');
        $(this).toggleClass('selected');
        initTodos();
    })

    /**全选与反选 */
    $('#btnCheck').on('click',function(){
        ctl.checkedAll(this.checked);
        initTodos();
    })
}())