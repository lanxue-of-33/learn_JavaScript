### ToolTip效果展示

- 第一步：先定义好提示框及提示链接的样式
- 第二步：写showTooltip函数
	1. 想法就是当我们点击链接时，将我们的提示框显示出来，移开链接时就隐藏；
	我们给该函数传递的参数有链接、提示框id、提示框内容、宽高；
	2. 利用绝对定位设置提示框的位置
	3. 利用offsetLeft和offsetTop的值来设置绝对定位的位置
	5. 判断当窄屏时图片是否会超出浏览器的宽度
	4. 为每个toolTip超链接添加onmouseenter事件
---


--- 代码优化
1. 简化元素的获取；
```
var getEl=function(id){
		return document.getElementById(id);
	}
```
2. 事件绑定的优化
```
//优化2，改变事件绑定方式，一开始的是最简单的，现在我们要该成符合W3C标准的事件绑定方式
	function addEvent(element,event,callbackFunction){
		if(element.addEventListener){  //符合W3C标准的写法
			element.addEventListener(event,callbackFunction,false);
		}else if(element.attachEvent){ //IE浏览器的写法
			element.attachEvent('on'+event,callbackFunction);
		}
	}
```
3. 使用事件冒泡优化代码
```
//使用冒泡方法时，我们移动到demo这个父元素的子元素上时触发事件，如果我们仍然使用mouseenter就会出错
addEvent(demo,"mouseover",function(e){
	
	//很经典的跨浏览器的获取事件的写法
	var event=e||window.event;
	var target=event.target||event.srcElement;
	
	if(target.className=="tooltip"){
		var _html;
		var id;
		var _width=200;
		
		switch(target.id){
			case "tooltip1":
				_id="t1";
				_html="中华人民共和国";
				break;
			case "tooltip2":
				_id="t2";
				_html="美国职业篮球赛";
				break;
			case "tooltip3":
				_id="t3";
				_html="<h2>春晓</h2><p>春眠不知晓</p><p>处处闻啼鸟</p>";
				break;
			case "tooltip4":
				_id="t4";
				_html='<img src="../img/1.jpg" width="500" />';
				break;
			case "tooltip5":
				_id="t5";
				_html='<div id="mycard"><img src="../img/2.jpg" alt="" /><p><strong>昵称一定要长</strong></p><p>我的简介</p></div>';
				break;
			case "tooltip6":
				_id="t6";
				_html='<iframe src="http://www.imooc.com/" width="480" height="300"><ifame>';
		}
		
		showToolTip(target,_id,_html,_width);
	}
});

```
### 知识点
1. [clientwidth和offsetwidth的区别](https://www.cnblogs.com/mfc-itblog/p/5684464.html)
2. [补充理解](http://blog.csdn.net/u010874036/article/details/50953044)
---
### 出现的错误
1. 为元素添加类名时，将'.className'错写成了'.classname';
2. js中链接的图片一直显示不了，可能时路径的问题吧，自己还没能解决。
