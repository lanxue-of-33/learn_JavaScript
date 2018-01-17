
//通过匿名函数封装一个Tab类,里面的属性方法全部自己进行定义
;(function($){//这里使用$符号进行接收
	
	//测试一下该函数能否正确执行
//	alert("弹出这个页面说明'a.js'调用成功！！！");
	
	//(1)定义Tab的一个构造函数,tab是形参
	var Tab=function(tab){  
		
//		alert("弹出这个页面说明Tab类new成功了！！！");

        //首先把Tab类的自身保存一下
        var _this_=this;
        //保存单个Tab组建
        this.tab=tab;
        //默认配置参数
        this.config={
        	"triggerType":"mouseover", //用来定义鼠标的触发类型.是click还是mouseover这类的
	        "effect":"default",       //用来定义内容切换效果是直接切换还是淡入淡出
	       	"invoke":1,            //默认显示选项卡中的哪一个页面
          	"auto":false            //我们的选项卡要不要自动切换，当指定了时间间隔时，表示自动切换，并且切换时间为指定时间间隔
        };
        //如果配置参数存在，就拓展掉默认的配置参数
        if(this.getConfig()){
        	$.extend(this.config,this.getConfig());//通过后面的值来拓展前面的值
        };
        //console.log(this.config);//返回的是对象，不能在函数里打印进行查看，好像必须这样吧
        
        //(3)绑定事件
        //保存tab标签列表、以及对应的内容列表
        this.tabItems=this.tab.find("ul.tab-nav li");//我们首先获取了这个容器，然乎我们只需在它里面查找ul为.tab-nav下的li
        this.contentItems=this.tab.find("div.content-wrap div.content-item");//查找相应的内容列表
        
        //保存配置参数
        var config=this.config;
        if(config.triggerType==="click"){
        	
        	this.tabItems.bind(config.triggerType,function(){
        		//_this_就是我们一开始所定义的this，这样写是为了防止出错 
        		_this_.invoke($(this));//该方法是我们写好用来进行标签及内容进行显示和隐藏的操作，
        		//我们这里传递的this是我们当前所选中的li
        	});
        }else if(config.triggerType==="mouseover"||config.triggerType!="click"){
        	
        	this.tabItems.mouseover(function(){
        		_this_.invoke($(this));//该方法是我们写好用来进行标签及内容进行显示和隐藏的操作，
        		//我们这里传递到this是我们当前所选中的li
        	})

         };
        
        //（5）自动切换功能，当指定了时间间隔时，我们就根据时间间隔进行自动切换
        if(config.auto){
        	
        	//定义一个全局定时器
        	this.timer=null;
        	//计数器
        	this.loop=0;
        	
        	this.autoPlay();
        	
        	//鼠标的移入移出
        	this.tab.hover(function(){
        		window.clearInterval(_this_.timer);//鼠标放入时清除定时器
        	},function(){
        		_this_.autoPlay(); //鼠标移除时又从新设置定时器
        	})
        };
        
        //设置默认显示第几个tab
         if(_this_.config.invoke>1){
         	
//       	this.invoke(_this_.config.invoke);  这样写没用
            this.invoke(this.tabItems.eq(_this_.config.invoke-1));
         }
	};
	Tab.prototype={
		
		//(5)自动间隔时间切换
		autoPlay(){
			
			var _this_   =this,  
			    tabItems =this.tabItems,  //临时保存tab列表
			    tabLength=tabItems.length;//tab的个数,当使用.size（）方法时会出错，不能完整的继续循环
			    config   =this.config;
			this.timer=window.setInterval(function(){
				
				_this_.loop++;
				
				if(_this_.loop>=tabLength){
					_this_.loop=0;
				};
//				console.log(tabItems);
//				console.log(tabLength);
				tabItems.eq(_this_.loop).trigger(config.triggerType);//配饰了什么我们就trigger什么
				/*
				 *trigger() 方法触发被选元素的指定事件类型。
				 * 这里表示当我们的自动播放函数选到了一个li时，就触发上面的"config.triggerType"事件
				 * 而这就是我们先前定义好的”click“或”mouseover“事件，所以实现了自动播放效果
				 * */
				
			},config.auto);
		},
		
	    //（4）事件驱动函数
	    invoke:function(currentTab){
	    	
	    	var _this_=this;//为了防止后面的函数要使用到当前的对象时出错
	    	/*
	    	 *要执行Tab的选中状态，当前选中的加上actived（标记为白底）
	    	 * 切换对应的tab内容，要根据配置参数的effect是default还是fade
	    	 * */
	    	
	    	//获取我们所要切换便签的索引值
	    	var index=currentTab.index();
	    	//console.log(index);
	    	
	    	//tab选中状态
	    	currentTab.addClass("actived").siblings().removeClass("actived");
	    	//切换对应的内容区域
	    	var effect=this.config.effect;
	    	var conItems=this.contentItems;
//	    	alert(effect);
            if(effect==="default"||effect!="fade"){///加上后面的是为了防止写错的情况发生的
//	    	    conItems[index].addClass("current").siblings().removeClass("current");
                //这里和js有点不同，js直接如上，而jQuery是用eq（）方法来取值的
                conItems.eq(index).addClass("current").siblings().removeClass("current");
            	
            }else if(effect==="fade"){
//	    	    conItems[index].addClass("current").siblings().removeClass("current");
                //这里和js有点不同，js直接如上，而jQuery是用eq（）方法来取值的
//              conItems.eq(index).addClass("current").siblings().removeClass("current");
                //这里的话找到了就用淡入淡出的效果，而不用添加删除类名，（默认的切换效果时会使用）
                conItems.eq(index).fadeIn().siblings().fadeOut();
            };
            
            //如果配置了自动切换，记得把当前的loop值设置为当前的index值
            if(this.config.auto){
            	this.loop=index;
            };

	    	
	    }, //注意，两个函数之间是用逗号隔开的，写错了真的让人崩溃的！！！！！
		
        
		// (2)获取配置参数
		getConfig: function(){
			
			//拿一下tab elem节点上的data-config
			var config=this.tab.attr("data-config");//attr是jQuery中获取结点属性值的方法
			
			//打印一下看有没有获取成功
			//console.log(config);
			
			//确保有配置参数，然后将其转义成对象形式并返回出去
			if(config&&config!=""){
				return $.parseJSON(config); //用于格式化完好的JSON字符,转换为与之对应的javascript对象
			}else{
				return null; //返回空，表明我们自己没有配置参数，使用的是默认配置参数
			};
		}
	};
	
	//初始化函数
	Tab.init=function(tabs){
		
		var _this_=this;
		tabs.each(function(){
		     //_this_代表的表示我们这个Tab类
		     //$(this)表示的是第几个所要创建的，这里的this就是each里面的每一个tab
		     new _this_($(this));
		     
		});
		
	};
	
	
	//注册成一个jQuery方法
	$.fn.extend({  //这是在jQuery中拓展一个自己的的方法出来，我们将这个方法取名为tab
	    tab:function(){
	    	//this就是我们的"$"获取到的集合（即我们前面所拥有的参数）
	    	this.each(function(){
	    		
	    		new Tab($(this));//这里的this是我们each里的每一个tab（即集合里面的每一个tab）
	    		
	    	});
	    	return this;//要实现jQuery的链式调用就必须要返回这个this，否则出错
	    }
	});
	
	
	
	window.Tab=Tab;//将Tab注册到window对象上，使得在匿名函数的匿名空间之下依旧能够访问到这个匿名函数
})(jQuery);//通过匿名函数自定义的形式将jQuery给过去
//刚刚试了下，好像没加jQuery和$也成功了，不太清除中间的差别呀