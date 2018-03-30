//这里是对先前的js代码进行优化，有以下方面可以优化
/*
 1.缩写document.getElementById();
 2.优化绑定事件方式
 3.使用事件冒泡优化代码
 * */
window.onload=function(){
	var tooltipBoxClass="tooltip-box";

	//判别浏览器
	//这个方法不能判别IE11
	var isIE=navigator.userAgent.indexOf("MSIE")>-1;
	
	//优化1
	var getEl=function(id){
		return document.getElementById(id);
	}
	
	//优化2，改变事件绑定方式，一开始的是最简单的，现在我们要该成符合W3C标准的事件绑定方式
	
	function addEvent(element,event,callbackFunction){
		if(element.addEventListener){  //符合W3C标准的写法
			element.addEventListener(event,callbackFunction,false);
		}else if(element.attachEvent){ //IE浏览器的写法
			element.attachEvent('on'+event,callbackFunction);
		}
	}
	
	
	function showToolTip(obj,id,html,width,height){
	//obj - ToolTip超链接元素
	//id  - ToolTip提示框id
	//html - ToolTip提示框内的HTML内容
	//width和height都是可选的元素
	if(getEl(id)==null){
		//创建 <div class="tooltip-box">xxxxxx</div>
		var toolTipBox;
		toolTipBox=document.createElement("div");
		toolTipBox.className=tooltipBoxClass;
		toolTipBox.innerHTML=html;
		obj.appendChild(toolTipBox);
		
		//为toolTipBox提示框添加宽度
		toolTipBox.style.width=width?width+"px":"auto";
		toolTipBox.style.height=height?height+"px":"auto";
		
		//如果是IE浏览器
		if(!width&&isIE){
			toolTipBox.style.width=toolTipBox.offsetWidth;
		}
		
		//设置toolTip提示框的位置
		toolTipBox.style.position="absolute";
		toolTipBox.style.display="block";
		//获取toolTip超链接的left和top值
		var left=obj.offsetLeft;
		var top=obj.offsetTop+20;
		//设置left的值，防止toolTip提示框超出浏览器
		if(left+toolTipBox.offsetWidth>document.body.clientWidth){
			var demoLeft=getEl("dome").offsetLeft;
			left=document.body.clientWidth-toolTipBox.offsetWidth-demoLeft;
			if(left<0){
				left=0;
			}
		}
		toolTipBox.style.left=left+"px";
		toolTipBox.style.top=top+"px";
		
		
		addEvent(obj,"mouseleave",function(){
			//这里不能直接用下面的方式，否则会出错，因为我们的前提条件就是document.getElementById(id)==null
//			document.getElementById(id).style.display="none";

			//延迟隐藏
			setTimeout(function(){
				toolTipBox.style.display="none"; 	
			},300);
			
		});
		
	}else{
		//显示
		getEl(id).style.display="block";
	}
}

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


}
