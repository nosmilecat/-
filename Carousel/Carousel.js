(function($){
	$.fn.Carousel = function(options){
					var datas = options.datas;
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

			    $(this).css("position","relative");

			    var $list = $("<ul></ul>");
			    $(this).append($list);
			    $list.css("position","relative");
			    for (var i = 0; i < datas.length; i++) {
			    	$list.append("<li><img src='"+datas[i].src+"'/></li>");
			    }

			    var $lis = $list.children();
			    $lis.css({"position":"absolute","left":0,"top":0})
			    $lis.css("opacity", 0);
			    $lis.eq(0).css("opacity", 1);
			    $(this).css("backgroundColor",datas[0].bgccolor);
			    
			   	var ul = $("<ul id='little'></ul>");
			   	ul.css("position","absolute");
			    $(this).append(ul);
			    for (var i = 0; i < datas.length; i++) {
			        var li = $("<li></li>");
			        li.css(little);
			        ul.append(li);
			    }
			    ul.children().eq(0).css("backgroundColor",little.backgroundColor);
			    ul.css({"marginLeft":-ul.innerWidth() / 2 +"px","position":"absolute","bottom":"20px","left":"50%"});
			    $("#little li").click(function () {
			        _this.css("backgroundColor", datas[$(this).index()].bgccolor);
			        $lis.css("opacity", "0").eq($(this).index()).css("opacity", "1");
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

			    $(".rightarr").click(function () {
			        if (count == datas.length - 1) {
			            count = -1;
			        }
			        count++;
			        $lis.css("opacity", "0").eq(count).css("opacity", "1");
			        $("#little li").css("backgroundColor", "#c1c1c1").eq(count).css("backgroundColor", little.backgroundColor);
			        _this.css("backgroundColor", datas[count].bgccolor);
			    });
			    $(".leftarr").click(function () {
			        if (count == 0) {
			            count = datas.length;
			        }
			        count--;
			        $lis.css("opacity", "0").eq(count).css("opacity", "1");
			        $("#little li").css("backgroundColor", "#c1c1c1").eq(count).css("backgroundColor", little.backgroundColor);
			        _this.css("backgroundColor", datas[count].bgccolor);
			    });


			    // 自动轮播
			    var timer = null;
			    timer = setInterval(auto, 2000);
			  $(this).mouseenter(function () {
			        clearInterval(timer);
			    });
			    $(this).mouseleave(function () {
			        timer = setInterval(auto, 2000);
			    });		

			    function auto() {
			            if (count == datas.length - 1) {
			            $lis.eq(count).animate( {"opacity": 0}, function () {
			                _this.css("backgroundColor", datas[0].bgccolor);
			                $lis.eq(0).animate({"opacity": 1});
			                $("#little li").css("backgroundColor", "#c1c1c1").eq(0).css("backgroundColor", little.backgroundColor);
			            });
			            count = 0;
			        } else {
			            $lis.eq(count).animate({"opacity": 0}, function () {
			                count++;
			                _this.css("backgroundColor", datas[count].bgccolor);
			                $lis.eq(count).animate({"opacity": 1});
			                $("#little li").css("backgroundColor", "#c1c1c1").eq(count).css("backgroundColor", little.backgroundColor);
			            });
			        }
			    }
}
})($);