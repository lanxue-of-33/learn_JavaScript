//通过id取得标题栏和内容栏,故可以先封装一个取id的函数
function $(id){
	return typeof id=='string'?document.getElementById(id):id;
}

/*
 function $(id){  return typeof id==='string'?document.getElementsById(id):id;  }
$  函数名。
id 参数
如果传入的id是字符串类型的。返回 document.getElementById(id)
如果不是 直接返回 id
 * */
//加载函数
window.onload=function(){
	//获取鼠标滑过或点击的标签和要切换内容的元素
	var titles=$('notice-tit').getElementsByTagName('li');//划过的标签,titles是一个数组，里面包含的是所以的li标签
	var divs=$('notice-con').getElementsByTagName('div');//要切换到的内容，divs是一个数组，里面包含的是所有的div
	if(titles.length!=divs.length)
	    return ;
	//遍历titles数组下的所有li标签
	for(var i=0;i<titles.length;i++){
		titles[i].id=i;//为其添加索引值id，这个添加的id只在控制台中能够看到，在我们所写的源代码中是没有的
		titles[i].onclick=function(){ //为鼠标滑过添加绑定事件,当想点击切换时，只需要将onmouseover换成onclick即可
//			alert(this.id);  //测试我们所滑过的li的索引值id
//this代表我们当前所获取到的对象，加入我们当前所指向的是”论坛“这个li，那么this代表的便是“论坛”这个li
            //清除所有的li的select，即清除所有的高亮显示
            for(var j=0;j<titles.length;j++){
            	titles[j].className="";
            	divs[j].style.display="none";
            }
            //设置当前li标签为高亮显示
            this.className='select';
            divs[this.id].style.display="block";
		}
	}
}
