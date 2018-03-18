window.onload=function(){
	
	function showTime(){
		
		//输出年月日
	var myDate=new Date();
	var year=myDate.getFullYear();
	var month=myDate.getMonth()+1;
	var date=myDate.getDate();
	//输出星期几
	var weekday=new Array(7);
	weekday[0]="星期日";
	weekday[1]="星期一";
	weekday[2]="星期二";
	weekday[3]="星期三";
	weekday[4]="星期四";
	weekday[5]="星期五";
	weekday[6]="星期六";
	var d=myDate.getDay();
	//小时分钟秒
	var h=myDate.getHours();
	var m=myDate.getMinutes();
	var s=myDate.getSeconds();
	m=checkTime(m);
	s=checkTime(s);
	
	document.getElementById("show").innerHTML=year+'年'+month+'月'+date+'日'+weekday[d]+h+":"+m+":"+s;
	
	
	
	//限时抢时间的制作
	var endTime=new Date("2018/5/15,12:20:12");
	var nowTime=new Date();
	//parseInt()是用力啊取整的
	var leftTime=parseInt((endTime.getTime()-nowTime.getTime())/1000);//结束到秒
	
	var dd=parseInt(leftTime/(24*60*60));
	var hh=parseInt(leftTime/(60*60)%24);//先算总共的小时数，在取余24得到剩下的小时数，在取整
	var mm=parseInt(leftTime/60%60);//先算总共的分钟数，在取余60得到剩下的分钟数，再取整
	var ss=parseInt(leftTime%60);//总共的秒数取余60得到剩下的秒数，再取整
	document.getElementById("LeftTime").innerHTML=dd+"天"+hh+"小时"+mm+"分"+ss+"秒";
	
	if(leftTime<=0){
		document.getElementById("LeftTime").innerHTML="团购结束";
	}
		
	}
	function checkTime(i){
		if(i<10){
			i="0"+i;
		}
		return i;
	}
	
	setInterval(showTime,500);
	
	
	//倒计时效果制作
	var curtime=new Date(); //当前时间
	var endtime=new Date("2018,6,6"); //结束时间
	//Date.getTime()返回的是毫秒数
	var lefttime=endtime.getTime()-curtime.getTime(); //得到的是相差的毫秒数
	lefttime=Math.ceil(lefttime/(24*60*60*1000));
	document.getElementById("timeshow").innerHTML="离高考还剩"+lefttime+"天";
	
	
	
	
}
