### 回到顶部效果
- 回到顶部按钮制作
	1. 引入背景图片
	```
	/*background-image: url(../img/top_bg.png);
	background-repeat: no-repeat;*/
	/*
	 【背景图片链接】【平铺方式（无平铺）】【距左边边距（数值或left或百分比）】【距顶端边距（数值或top或百分比）】
	 * */
	background: url(../img/top_bg.png) no-repeat left -40px;
	```
- js实现滚动效果
	1. 首先，我们应根据'document.documentElement.scrollTop'这个属性获取滚动条距离顶部的距离
	2. 设置滚动速度，（即我们每次减少滚动条距离顶部的数值），'var ispeed=Math.floor(-osTop/6);'
	3. 进行滚动（即用滚动条距离顶部的数值减去我们设置的滚动速度），'document.documentElement.scrollTop=document.body.scrollTop=osTop+ispeed;';
    4. 设置定时器，当我们距离顶部的距离为0时就清除定时器
    
- js实现滚动条的停止功能
	1. 其实所谓的停止并没有实现点击页面停止，而是滚动滚动条进行停止。
	2. 首先设一个变量'isTop'用来判断是否进行滚动停止。
	3. 运动的事件是'window.onscroll',该事件再页面滚动时触发。
	4. 代码如下：
	```
	window.onscroll=function(){
		if(!isTop){
			clearInterval(timer);
		}
		isTop=false;
	}
	```
	同时，我们在定时器中应该设置'isTop=true';
	5. 其实现逻辑如下：当我们进行页面滚动时，isTop是true，清除定时器，然后设值为false，当没有点击按钮时，一直清除定时器。
	当我们点击了按钮时，isTop的值设为了true，页面滚动事件随定时器一直触发，而isTop一直为true;如果我们转动了滚动时，会先于
	定时器设置true值，此时isTop的值为false，这是执行清除定时器功能，就实现了滚轮事件的一直触发。
	
- js实现按钮的显示和隐藏
	1. 首先将按钮的display设置为none；
	2. 利用'document.document.clientHeight'属性获取页面的可视化高度；
	3. 将其放入页面滚动事件之中，将页面可视化高度同滚轮距离顶部的距离进行对比
	如果页面可视化高度小于后者，则将按钮显示；反之则将按钮隐藏；

- 注意
	1. 按钮是用链接制作的，所以我们应该如下写，防止出现一点击就回到顶部的意外。
	```
	<!--下面的代码是用来阻止浏览器的默认行为，即点击不会直接回到顶部-->
	<a href="javascript:;" id="btn" title="回到顶部"></a>
	```
	
