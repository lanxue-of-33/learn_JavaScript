
//创建div元素，参数className是其类名
function creatediv(className){
	var div=document.createElement('div');
	div.className=className;
	return div;
}

//创建一个<div class="row">并且有四个子节点<div class="cell">
function createrow(){
	var con=$('con');
	var row=creatediv('row');//创建一个<div className='row'>
	var arr=creatcell(); //定义div cell的类名，其中一个为cell black
	
	con.appendChild(row);//添加row为con的子节点
	
	for(var i=0;i<4;i++){
		row.appendChild(creatediv(arr[i]));//添加row的子节点 cell
	}
	
	if(con.firstChild==null){
		con.appendChild(row);
	}else{
		con.insertBefore(row,con.firstChild);//在您指定的已有子节点之前插入新的子节点。
	}
	
	//删除div#con的子节点中最后那个<div class="row">
	function delrow(){
		var con=$('con');
		if(con.childNodes.length==6){
			con.removeChild(con.lastChild);
		}
	}
	
	//创建一个类名的数组，其中一个为cell black ，其余为cell
	function createll(){
		var temp=['cell','cell','cell','cell'];
		var i=Math.floor(Math.random()*4);//随机生成黑快的位置，即随机将temp[i]设置为黑块
		temp[i]='cell black';
		return temp; //将类名数组返回给调用函数
	}
	

/*
 在可以通过 js 来创造和销毁 div 后，我们就要让黑块动起来，这个时候我们就用到了之前css提到的设定 <div id="con"> 隐藏了一行的 <div id="row">，
 我们通过 js 的 DOM 操作使其向下方移动，并设置定时器每30毫秒移动一次，这样就实现了黑块的平滑移动，在黑块移动的同时，我们要判断黑块是否已经触底，
 触底则游戏失败，停止调用 move()，触底后调用函数 fail() 游戏失败，具体方法如下
 * */
//使黑块向下移动
function move(){
	var con=$('con');
	var top=parseInt(window.getComputedStyle(con,null)['top']);//window.getComputedStyle(id,null)这种方式不能设置样式，只能获取
	
	if(speed+top>0){
		top=0;
	}else{
		top+=speed;
	}
	con.style.top=top+'px';
	
	if(top==0){
		createrow();
		con.style.top='-100px';
		delrow();
	}else if(top==(-100+speed)){
		var rows=con.childNodes;
		if((rows.length==5)&&(rows[rows.length-1].pass!==1)){
			fail();
		}
	}
}

function fail(){
	clearInterval(clock);
	confirm("你的最终得分为："+parseInt($('score').innerHTML));
}

//点击黒块事件
function judge(ev){
	if(ev.target.className.indexOf('black')!=-1){
		ev.target.className="cell";
		ev.target.parentNode.pass=1;//定义属性pass，表面此行row的黑块已经被点击
		score();
	}
}
