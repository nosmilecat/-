(function($){
	$.fn.Carousel = function(options){
					var datas = options.datas;
					datas.push(datas[0]);
					var little = {   // 小圆圈默认样式
								"width":"8px",
								"height":"8px",
								"borderRadius":"4px",
								"margin": "10px",
								"float":"left",
								"backgroundColor":"#c40c0c"
							};
					var arr = {   // 左右按钮样式
						width: "40px",
						height:"60px",
						position: "absolute",
						top: 0,
						display:"block",
						backgroundColor:"#666"
					};

					if(options.little){
						$.extend(little,options.little); //调用传入参数
					}
					if(options.arr){
						$.extend(arr,options.arr); //调用传入参数
					}

				// 结构样式的创建
			    var _this = $(this);

			    $(this).css({"position":"relative","overflow":"hidden"});

			    var $list = $("<ul></ul>");
			    $(this).append($list);
			    $list.css({"position":"relative","width":"9999px"});
			    for (var i = 0; i < datas.length; i++) {
			    	$list.append("<li><img src='"+datas[i].src+"'/></li>");
			    }

			    var $lis = $list.children();
			    $lis.css({"float":"left"});
			    
			   	var ul = $("<ul id='little'></ul>");
			   	ul.css("position","absolute");
			    $(this).append(ul);
			    for (var i = 0; i < datas.length-1; i++) {
			        var li = $("<li></li>");
			        li.css(little);
			        ul.append(li);
			    }
			    $("#little li").css("backgroundColor","#c1c1c1").eq(0).css("backgroundColor",little.backgroundColor);
			    ul.css({"marginLeft":-ul.innerWidth() / 2 +"px","position":"absolute","bottom":"20px","left":"50%"});
			    $("#little li").click(function () {
			        $list.animate({"left":-$(this).index()*_this.innerWidth()+"px"});
			        $("#little li").css("backgroundColor", "#c1c1c1").eq($(this).index()).css("backgroundColor", little.backgroundColor);
			        count = $(this).index();
			    });
			    var count = 0;


				 // 左右点播
			    $(this).append($('<div class="arr"><span class="rightarr"></span><span class="leftarr"></span></div>'));
			    var arr1,arr2;
			    $(".leftarr").css($.extend(arr1,arr,{left:0}));
			    $(".rightarr").css($.extend(arr2,arr,{right:0}));
			    $(".arr").css({width: "100%",position: "absolute",top: "50%",marginTop: -$(".leftarr").innerHeight()/2});

			    var flag = true;
			    $(".rightarr").click(function () {
			    	if(!flag) return;   // 防止快速点击bug
			    	flag = false;
			        if (count == datas.length - 1) {
			            count = 0;
			            $list.css({"left":0});
			        }
			        count++;
			        $list.animate({"left":-count*_this.innerWidth()+"px"},function(){
			        	flag = true;
			        });
			        if (count == datas.length - 1) {
			      		$("#little li").css("backgroundColor", "#c1c1c1").eq(0).css("backgroundColor", little.backgroundColor);
			        }else{
			        	$("#little li").css("backgroundColor", "#c1c1c1").eq(count).css("backgroundColor", little.backgroundColor);
			        }

			    });
			    $(".leftarr").click(function () {
			    	if(flag) return;
			    	flag = false;
			        if (count == 0) {
			            count = datas.length-1;
			            $list.css({"left":-count*_this.innerWidth()+"px"});
			        }
			        count--;
			        $list.animate({"left":-count*_this.innerWidth()+"px"},function(){
			        	flag = true;
			        });
			        $("#little li").css("backgroundColor", "#c1c1c1").eq(count).css("backgroundColor", little.backgroundColor);
			    });


			    // 自动轮播
			    var timer = null;
			    timer = setInterval(auto, 2000);
			    _this.mouseenter(function () {
			        clearInterval(timer);
			    });
			    _this.mouseleave(function () {
			        timer = setInterval(auto, 2000);
			    });		

			    function auto() {
			        if (count == datas.length - 1) {
			            count = 0;
			            $list.css({"left":0});
			        } 
			        count++;
			        $list.css({"left":-count*_this.innerWidth()+"px"});
			       	$("#little li").css("backgroundColor", "#c1c1c1").eq(count).css("backgroundColor", little.backgroundColor);
			        
			    }
}
})($);