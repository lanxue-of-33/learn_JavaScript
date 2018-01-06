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
			for(var i=0;i<lis.length;i++){
				lis[i].className="";
				divs[i].style.display="none";
			}
			lis[this.id].className="select";
			divs[this.id].style.display="block";//如果少了style就会出错
			index=this.id;//这是为了修改bug，即显示顺序问题
		}
		lis[i].onmouseout=function(){
			timer=setInterval(function(){
		        index++;           //直接这样写会有bug，显示的顺序有问题
		        if(index>=lis.length){
	          		index=0;
	         	}
	        	//高亮显示当前页签
	        	for(var j=0;j<lis.length;j++){
		      	lis[j].className="";
		      	divs[j].style.display="none";
		    }
		        lis[index].className="select";
		        divs[index].style.display="block";
	        },2000);
		}
		lis[i].onmouseout=function(){
			timer=setInterval(function(){
				index++;
				if(index>=lis.length){
					index=0;
				}
				for(var i=0;i<lis.length;i++){
					lis[j].className="";
					divs[j].style.display="none";
				}
				lis[this.id].className="select";
				divs[this.id].style.display="block";
			},2000)
		}
	}
	//添加定时器，改变当前高亮的索引
	timer=setInterval(function(){
		index++;
		if(index>=lis.length){
			index=0;
		}
		//高亮显示当前页签
		for(var j=0;j<lis.length;j++){
			lis[j].className="";
			divs[j].style.display="none";
		}
		lis[index].className="select";
		divs[index].style.display="block";
	},2000);
}
