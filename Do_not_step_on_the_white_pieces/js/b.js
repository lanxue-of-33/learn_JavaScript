

window.onload=function(){
	
	var start=$('start');
	start.onclick=Init; //点击时调用函数
	var conti=$('continue');
	conti.onclick=Init();
}
	
	var clock=null;
	var state=0;
	var speed=4;
	
	
	//根据id来获取DOM元素
	function $(id){
		return document.getElementById(id);
	}
	
	
	//初始化Init()
	function Init(){
		for(var i=0;i<4;i++){
			createrow();
		}
		
		//添加onclick（）事件
		$('main').onclick=function(ev){
			judge(ev); //ev代表的是鼠标点击这个事件
		}
		
		//定时器，每30毫秒调用一次move（）
		clock=window.setInterval(move,100);
		
		//点击停止按钮停止定时器，点击开始的话继续吧
		var stop=$('stop');  //var conti=$('continue');
		stop.onclick=function(){
			clearInterval(clock);
		}
	}
	
	//判断是否点击了黒块
	function judge(ev){
	   if(ev.target.className.indexOf('black')!=-1){
		ev.target.className="cell";
		ev.target.parentNode.pass=1;//定义属性pass，表面此行row的黑块已经被点击
		score();
	    }
    } 
    
    //游戏结束
    function fail(){
	   clearInterval(clock);
	   confirm("你的最终得分为："+parseInt($('score').innerHTML));
    }

	//创建div元素，参数className是其类名
    function creatediv(className){
	     var div=document.createElement('div');
	     div.className=className;
	     return div;
    }
    
     // 创造一个<div class="row">并且有四个子节点<div class="cell">
        function createrow(){
            var con = $('con');
            var row = creatediv('row'); //创建div className=row
            var arr = creatcell(); //定义div cell的类名,其中一个为cell black

            con.appendChild(row); // 添加row为con的子节点

            for(var i = 0; i < 4; i++){
                row.appendChild(creatediv(arr[i])); //添加row的子节点 cell
            }

            if(con.firstChild == null){
                con.appendChild(row);
            }else{
                con.insertBefore(row, con.firstChild);
            }
        }
    
     // 创建一个类名的数组，其中一个为cell black, 其余为cell
        function creatcell(){
            var temp = ['cell', 'cell', 'cell', 'cell',];
            var i = Math.floor(Math.random()*4);
            temp[i] = 'cell black';
            return temp;
        }

    //让黑块动起来
        function move(){
            var con = $('con');
            var top = parseInt(window.getComputedStyle(con, null)['top']);

            if(speed + top > 0){
                top = 0;
            }else{
                top += speed;
            }            
            con.style.top = top + 'px';

            if(top == 0){
                createrow();
                con.style.top = '-100px';
                delrow();
            }else if(top == (-100 + speed)){
                var rows = con.childNodes;
                if((rows.length == 5) && (rows[rows.length-1].pass != 1) ){
                    fail();
                }
            }
        }


    //删除div#con的子节点中最后那个<div class="row">，即删除最底下的那行
	function delrow(){
		var con=$('con');
		if(con.childNodes.length==6){
			con.removeChild(con.lastChild);
		}
	}
	
	//加速函数
	function speedup(){
		speed+=2;
		if(speed==6){
			alert("你已经超神了！！!");
		}
	}
	
	//积分函数
	function score(){
		var newscore=parseInt($('score').innerHTML)+1;
		$('score').innerHTML=newscore;
		if(newscore%10==0){
			speedup();
		}
	}

