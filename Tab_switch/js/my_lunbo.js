window.onload=lunbo;

function lunbo(){
	var list=document.getElementById("pic_wrap").getElementsByTagName("img");
	var num_list=document.getElementById("num_wrap").getElementsByTagName("li");
	var timer;
	var index=0;
	
	//（2）碰到容器时停止轮播，离开后继续轮播
	var wrap=document.getElementById("wrap");
	wrap.onmouseover=function(){
		//清除定时器
		clearInterval(timer);
	}
	wrap.onmouseout=function(){
		//设置定时器
		timer=setInterval(autoplay,2000);
	}
	
	
	//（3）点击数字切换到相应的图片之上
	for(var i=0;i<num_list.length;i++){//遍历所有的数字
		num_list[i].id=i;
		num_list[i].onmouseover=function(){
			change(this.id);
			index=this.id;
		}
		num_list[i].onmouseout=function(){
			timer=setInterval(autoPlay,2000);
		}
	}
	
	
	//(4)向前向后按钮的点击
	var prev=document.getElementById("prev");
	var next=document.getElementById("next");
	prev.onclick=function(){
		index--;
		if(index<0){
			index=4;
		}
        change(index);
        if(timer){
        	clearInterval(timer);
        	timer=null;
        }
        timer=setInterval(autoPlay,2000);
	}
	next.onclick=function(){
		index++;
		if(index>4){
			index=0;
		}
		change(index);
		 if(timer){
        	clearInterval(timer);
        	timer=null;
        }
        timer=setInterval(autoPlay,2000);
	}
	
	//（1）设置轮播
	timer=setInterval(autoplay,2000);
	
	//轮播函数
	function autoplay(){
		index++;
		if(index>=5){
			index=0;
		}
		change(index);
	}
	//图片切换及高亮显示数字的函数
	function change(curIndex){
		for (var i=0;i<list.length;i++) {
			list[i].className="";
			num_list[i].className="";
		}
		list[curIndex].className="selected";
		num_list[curIndex].className="on";
	}
}
