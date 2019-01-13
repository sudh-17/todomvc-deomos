## 前端helloword及格标准
1. 实现todomvc，[在线功能参考](http://todomvc.com/examples/vanillajs/)
2. 源代码需上传到自己的github账号
3. 需有在线演示的地址

### 其他说明
+ 所有入组人员必须实现原生版本，已经学习过库和框架的必须实现相应的版本（学习过jquery的要实现jquery版本，学习过vue的要实现vue版本）
+ 所有入组人员必须实现目前团队的技术栈版本（目前暂定vue）
+ 没有前端基础、没有系统学习过前端技术的必须学习：[Web 入门](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web)
+ 所有入组人员必须学习：[Ant Design设计文档](https://ant.design/docs/spec/introduce-cn)

### 相关资料
+ [廖雪峰老师的git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
+ [阮一峰老师的ES6教程](http://es6.ruanyifeng.com/)

## todos 的功能
1. 当记录为空或者0条的时候，所有的操作按钮或者工具条都不可见
2. 在输入框内输入内容，点击回车，下拉列表会增加一条记录
3. 每条记录都可以单个进行删除
4. 每条记录可以双击编辑从而进行数据更新
5. 每条记录都可以通过其左侧的复选框按钮进行勾选或者取消勾选，同时有一个全选按钮，该按钮可以批量勾选所有记录或者批量取消勾选所有记录。当对每条记录进行勾选或者取消勾选时，都要对所有记录是否都同时处于勾选或未勾选状态进行检测，从而切换全选按钮的选中与未选中状态。
6. 对所有的记录内容的展示进行过滤，过滤条件分别为全部，状态为completed=false，状态为completed=true这三个状态。
7. 当存在completed=true的记录时，显示“clear completed”按钮，它可以一键清理掉completed=true的记录，
8. 在HTML5中，新加入了一个localStorage特性，这个特性主要是用来作为本地存储来使用的，解决了cookie存储空间不足的问题(cookie中每条cookie的存储空间为4k)，localStorage中一般浏览器支持的是5M大小，这个在不同的浏览器中localStorage会有所不同。

附加内容. 加载动画，输入框自动对焦，HTML标签过滤，锚点，编辑取消，编辑时内容为空则删

功能模块，流程模块弄清楚程序