//轮播图有很多的做法 有水平轮播 垂直轮播  显示与消失轮播 此处用的是显示与消失 不同的轮播也有不同的方法 
//不用局限这一种轮播思维
//封装了一个获取id的方法
function byId(id){
	return  typeof(id)==="string"?document.getElementById(id):id;
	 
}
//全局
var index =0,//索引 0,1,2
    timer=null,
    pics = byId("banner").getElementsByTagName("div"),//使用id引用元素id是页面内唯一的，而标签名是不唯一的
    //取出的div为数组
    dots = byId("dots").getElementsByTagName("span"),//使用标签名得到的是一个数组
    //圆点个数与div的一样
    prev = byId("prev"),
    next = byId("next"),
    len=pics.length;
   
    
//滑过清除定时器,离开继续
function slideImg(){
	var main=byId("main");
	main.onmouseover =function(){
		//滑过清除定时器
		if(timer) clearInterval(timer);
	}
	main.onmouseout =function(){
		//继续定时器
		timer =setInterval(function(){
			index++;
			if(index>=len){
				index=0;
			}
			
			changeimg();//index全局变量 不用传参
		},3000);
	}
	main.onmouseout();//自动触发定时器  调用前轮播图只有当鼠标滑入在滑出才会进行轮播
	
	//点击圆点切换时间 绑定点击事件 切换图片
	for(var d=0;d<len;d++){
	    //给所有span添加一个id属性 值为d作为当前span的索引
	    dots[d].id = d;//一般情况不使用数字直接作为id名  但是现在html5可以 但还是不推荐 此处是为了方便轮播
		dots[d].onclick =function(){
			//讲当前索引改成 此处index=d;为错误 因为d++后 为d=3
			index = this.id;
			//改变小圆圈的样式 只有一个类 所以直接用classname
			//this.className="active"; 直接写在changeimg里面 便利后直接清除所有的样式
			changeimg();
		}
	}
	
	//下一张 上一张
	next.onclick= function(){
		index++;
		if(index>=len)index=0;
		changeimg();
	}
	prev.onclick= function(){
		index--;
		if(index<0)
		index=len-1;//最后一张的索引 在绕回去 0 1 2 0 1 2 
		changeimg();
	}
}
//封装切换图片  函数 添加索引号的胜利的slide-active类 className属性设置类时原来的类就没了
//所以此处添加的为id
function changeimg(){
	//便利banner下所有的div 将其隐藏
	for(var i=0;i<len;i++){
		//pics[i].className="active" 不可以这样用，否则会清除其他类
		pics[i].style.display='none';
		dots[i].className="";//清除类
	}	
	
	pics[index].style.display='block';	
	//没有类可以用classname  如果像div 有其他类则用 style 否则会清除所有类只留下刚加上去的
	dots[index].className="active";
}
slideImg();
