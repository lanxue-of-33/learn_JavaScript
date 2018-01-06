//实现Tab项卡的自动播放效果

function $(id){
	return typeof id==='string'?document.getElementById(id):id;
}

window.onload=tab;

function tab(){
	//当前高亮显示的页签的索引
	var index=0;
	var timer=null;
	
	//获取所有的页签和要切换的内容
	var lis=$('notice-tit').getElementsByTagName('li');
	var divs=$('notice-con').getElementsByTagName('div');
	
	//遍历每一个页签且给他们他们绑定事件
	for(var i=0;i<lis.length;i++){
		lis[i].id=i;
		lis[i].onmouseover=function(){
			clearInterval(timer);//清除定时器
			//清除定时器后，还要将选项卡切换到我们所选择到的选项卡上
			changeOption(this.id);
		}
		lis[i].onmouseout=function(){
			timer=setInterval(autoPlay,2000);
		}
	}
	
	
	//如果先前存在定时器则应该先清除定时器，否则当我们滑的快时会出现卡顿的情况
	if(timer){
		clearInterval(timer);
		timer=null;
	}
	//添加定时器，改变当前高亮的索引
	timer=setInterval(autoPlay,2000);
	
	//自动播放的函数
	function autoPlay(){
		index++;
		if(index>=lis.length){
			index=0;
		}
		changeOption(index);
	}
	
	
	//高亮显示当前页签的函数
	//changeOption=function(curIndex){  函数名这样写不好吧
	function changeOption(curIndex){
		console.log(curIndex);
		for(var j=0;j<lis.length;j++){
			lis[j].className="";
			divs[j].style.display="none";
		}
		lis[curIndex].className="select";
		divs[curIndex].style.display="block";
		index=curIndex; //可以从这里解决切换不同步的情况
	}
}

/*
 代码优化：
 1.可以看出，24-29与41-46这两段高亮显示页签的代码是一样的，所以我们可以将其写成函数进行优化
 * */