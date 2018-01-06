//js的延迟切换

//通过id取得标题栏和内容栏,故可以先封装一个取id的函数
function $(id){
	return typeof id=='string'?document.getElementById(id):id;
}

//加载函数
window.onload=function(){
	//标签的索引
	var index=0;
	var timer=null;
	
	var lis=$('notice-tit').getElementsByTagName('li');
	var divs=$('notice-con').getElementsByTagName('div');
	if(lis.length!=divs.length)   return ;
	
	//遍历所有的页签
	for(var i=0;i<lis.length;i++){
		lis[i].id=i;//添加索引
		lis[i].onmouseover=function(){
			//用that变量来表示this，即我们当前所滑过的li
			var that=this;
			//如果存在准备执行的定时器，立即清除定时器，只有当前时间大于500毫秒的时候，才开始执行函数
		    //这是为了应对快速划过标签时，其该显示停下来时所指向的标签
		    if(timer){
		    	clearTimeout(timer);
		    	timer=null;
		    }
		    //延迟半秒执行函数
		    timer=window.setTimeout(function(){
		    	for(var j=0;j<lis.length;j++){
		    		lis[j].className="";
		    		divs[j].style.display="none";
		    	}
		    	lis[that.id].className="select";
		    	divs[that.id].style.display="block";
//		    	alert(this);
//		    	alert(this.id);
/*
 * 会出现undefined，有一下可能性
 * 1，它真的不知道this的id是多少（错误原因是id出错了）
 * 2.我们的id是对的，但当浏览器找到this后，发现这个this上没有id，（this出错了，这个this不是我们所要找的对象）
 * 
 * 我们到控制台上可以看到有id，所以可以确定的是我们的this出错了，它根本没有指向当前滑过的li
 * 用alert(this);测试一下，可以知道this指向的是[object Window],出现这个错误的原因是定时器的清除和设置方法都是属于
 * window对象的。
 */
		    },500);
		}
	}
	
}