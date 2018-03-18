window.onload=function(){
	
	var btn=document.getElementById("btn");
	//获取页面可视区域的高度
	var clientHeight=document.documentElement.clientHeight;
	var timer=null;
	var isTop=true;
	
	//滚动条滚动时触发，（进行判断是否清除定时器）
	//我们这实现的不是点击停止，而是滚动滚轮停止
	window.onscroll=function(){
		
		//获取滚动条距离顶部的距离
		var osTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(osTop>=clientHeight){
			btn.style.display="block";
		}else{
			btn.style.display="none";
		}
		
		if(!isTop){
			clearInterval(timer);
		}
		isTop=false;
	}
	
	btn.onclick=function(){
		
		timer=setInterval(function(){
			//获取滚动条距离顶部的距离
			var osTop=document.documentElement.scrollTop||document.body.scrollTop;
			/*
			 Math.floor()是个向下舍入的函数，即10.5得到10，10.9也得到10
			 
			 速度为正时，会出现距离顶部始终有一部分距离而不能得到0，造成不能清除定时器，所以我们将其定义为负数，然后再后面加上速度
			 * */
			var ispeed=Math.floor(-osTop/6);
			document.documentElement.scrollTop=document.body.scrollTop=osTop+ispeed;
			
			isTop=true;
			
			console.log(osTop-ispeed);
			if(osTop==0){
				clearInterval(timer);
			}
			
		},50);
		
	}
	
}
