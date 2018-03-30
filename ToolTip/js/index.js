window.onload=function(){

var tooltipBoxClass="tooltip-box";

//判别浏览器
//这个方法不能判别IE11
var isIE=navigator.userAgent.indexOf("MSIE")>-1;

function showToolTip(obj,id,html,width,height){
	//obj - ToolTip超链接元素
	//id  - ToolTip提示框id
	//html - ToolTip提示框内的HTML内容
	//width和height都是可选的元素
	if(document.getElementById(id)==null){
		//创建 <div class="tooltip-box">xxxxxx</div>
		var toolTipBox;
		toolTipBox=document.createElement("div");
		toolTipBox.className=tooltipBoxClass;
//		toolTipBox.className="tooltip-box";
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
			var demoLeft=document.getElementById("dome").offsetLeft;
			left=document.body.clientWidth-toolTipBox.offsetWidth-demoLeft;
			if(left<0){
				left=0;
			}
		}
		toolTipBox.style.left=left+"px";
		toolTipBox.style.top=top+"px";
		console.log(left);
		console.log(top);
		
		
		obj.onmouseleave=function(){
			//这里不能直接用下面的方式，否则会出错，因为我们的前提条件就是document.getElementById(id)==null
//			document.getElementById(id).style.display="none";

			//延迟隐藏
			setTimeout(function(){
				toolTipBox.style.display="none"; 	
			},300);
			
		}
		
	}else{
		//显示
		document.getElementById(id).style.display="block";
	}
}

var t1=document.getElementById("tooltip1");
var t2=document.getElementById("tooltip2");
var t3=document.getElementById("tooltip3");
var t4=document.getElementById("tooltip4");
var t5=document.getElementById("tooltip5");
var t6=document.getElementById("tooltip6");

t1.onmouseenter=function(){
	showToolTip(this,"t1","中华人民共和国",200);
};
t2.onmouseenter=function(){
	showToolTip(this,"t2","美国职业篮球赛",200);
};
t3.onmouseenter=function(){
	showToolTip(this,"t3","<h2>春晓</h2><p>春眠不知晓</p><p>处处闻啼鸟</p>",100);
};
t4.onmouseenter=function(){
	_html='<img src="../img/1.jpg" width="500" />';
	showToolTip(this,"t4",_html,520);
};
t5.onmouseenter=function(){
	var _html='<div id="mycard"><img src="../img/2.jpg" alt="" /><p><strong>昵称一定要长</strong></p><p>我的简介</p></div>';
	showToolTip(this,"t5",_html,300);
};
t6.onmouseenter=function(){
	var _html='<iframe src="http://www.imooc.com/" width="480" height="300"><ifame>';
	showToolTip(this,"t6",_html,600);
}


}