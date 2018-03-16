window.onload=function(){
	var lis=document.getElementsByTagName("li");
	for(var i=0;i<lis.length;i++){
		lis[i].i=i; //这里运用的是闭包的概念
		lis[i].onmousemove=function(){
			this.className="lihover";
			
			var h0=(this.i-1)*30+42; //一级菜单的高度
			var y=this.getElementsByTagName("div")[0].offsetHeight;
			var h=this.getElementsByTagName("div")[0].style.top+y; //二级带单加上了底部的高度
			
			/*
			 .offsetHeight代表的是boder及之内可见内容的高度
			 .style.top代表的是顶部或距离定位元素顶部的高度
			 * */
			
			if(h<h0){
				this.getElementsByTagName("div")[0].style.top=h0+"px";
			}
			
			if(y>550){
				this.getElementsByTagName("div")[0].style.top="3px"
			}
		}
		lis[i].onmouseout=function(){
			this.className="";
		}
	}
}
