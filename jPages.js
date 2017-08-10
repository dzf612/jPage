//分页插件
/**
 Create By dongzhifeng On 2017-06-30
**/
(function($){
    var ms = {
        init:function(obj,args){
            return (function(){
                ms.createPages(obj,args);
                ms.bindEvent(obj,args);
            })();
        },
        //填充html
        createPages:function(obj,args){
            return (function(){
                obj.off("click","a.pageNumber");
                obj.off("click","a.prevPage");
                obj.off("click","a.nextPage");
                obj.off("click","a.firstpage");
                obj.off("click","a.lastpage");
                obj.off("click",".gobutton");
                obj.empty();
                if(args.pageCount<1){
                    return;
                }

                obj.append('<p class="fr"></p>');
                //页码大小选择
                var selected100 = "";
                var selected200 = "";
                var selected500 = "";
                if(args.pageSize == 100){
                    selected100 = "selected";
                }
                if(args.pageSize == 200){
                    selected200 = "selected";
                }
                if(args.pageSize == 500){
                    selected500 = "selected";
                }
                obj.append('<div class="new-sel-box"><div class="sel-value">'+ args.pageSize +'</div><select class="new-select"><option value="100" '+ selected100 +'>100</option><option value="200" '+ selected200 +'>200</option><option value="500" '+ selected500 +'>500</option></select></div>');
                obj.append('<p class="txt">共'+ args.totalCount +'项，每页显示</p>');

                var frObj = $(".page-div .fr");
                frObj.append('项');
                //首页
                if(args.current > 1) {
                    frObj.append('<a href="#" class="firstpage"><i></i></a>');
                }else{
                    frObj.append('<a href="javascript:;" class="firstpage no"><i></i></a>');
                }
                //上一页
                if(args.current > 1){
                    frObj.append('<a href="javascript:;" class="prev prevPage">&lt;</a> ');
                }else{
                    frObj.append('<a href="javascript:;" class="prev no">&lt;</a> ');
                }
                //中间页码
                var min=args.current-4;
                var max=args.current+4;
                var start=min>=1?min:1;
                var end=max>args.pageCount?args.pageCount:max;
                for (;start <= end; start++) {
                    if(start != args.current){
                        frObj.append('<a href="javascript:;" class="pageNumber">'+ start +'</a> ');
                    }else{
                        frObj.append('<span class="current">'+ start +'</span> ');
                    }
                }
                //下一页
                if(args.current < args.pageCount){
                    frObj.append('<a href="javascript:;" class="next nextPage">&gt;</a>');
                }else{
                    frObj.append('<a href="javascript:;" class="next no">&gt;</a>');
                }
                //最后一页
                if(args.current < args.pageCount) {
                    frObj.append('<a href="javascript:;" class="lastpage"><i></i></a>');
                }else{
                    frObj.append('<a href="javascript:;" class="lastpage no"><i></i></a>');
                }
                //跳转页
                frObj.append('跳转到<input type="text" class="pageinput" value="'+ args.current +'">页<a href="javascript:;" class="gobutton">确定</a>');

            })();
        },
        //绑定事件
        bindEvent:function(obj,args){
            return (function(){
                //页大小选择
                obj.on("change",".new-select",function(){
                    $(".sel-value").text($(this).val());
                    ms.createPages(obj,{"current":args.current,"pageCount":args.pageCount});
                    if(typeof(args.callback)=="function"){
                        args.callback(args.current, $(this).val());
                    }
                });
                //可选页码
                obj.on("click","a.pageNumber",function(){
                    var current = parseInt($(this).text());
                    var pageSize = parseInt($(".sel-value").text());
                    ms.createPages(obj,{"current":current,"pageCount":args.pageCount});
                    if(typeof(args.callback)=="function"){
                        args.callback(current,pageSize);
                    }
                });
                //上一页
                obj.on("click","a.prevPage",function(){
                    var current = parseInt(obj.find("span.current").text());
                    var pageSize = parseInt($(".sel-value").text());
                    ms.createPages(obj,{"current":current-1,"pageCount":args.pageCount});
                    if(typeof(args.callback)=="function"){
                        args.callback(current-1, pageSize);
                    }
                });
                //下一页
                obj.on("click","a.nextPage",function(){
                    var current = parseInt(obj.find("span.current").text());
                    var pageSize = parseInt($(".sel-value").text());
                    ms.createPages(obj,{"current":current+1,"pageCount":args.pageCount});
                    if(typeof(args.callback)=="function"){
                        args.callback(current+1, pageSize);
                    }
                });
                //首页
                obj.on("click","a.firstpage",function(){
                    var pageSize = parseInt($(".sel-value").text());
                    if(args.pageCount > 1){
                        ms.createPages(obj,{"current":1,"pageCount":args.pageCount});
                        if(typeof(args.callback)=="function"){
                            args.callback(1, pageSize);
                        }
                    }
                });
                //尾页
                obj.on("click","a.lastpage",function(){
                    var pageSize = parseInt($(".sel-value").text());
                    if(args.pageCount > 1){
                        ms.createPages(obj,{"current":args.pageCount,"pageCount":args.pageCount});
                        if(typeof(args.callback)=="function"){
                            args.callback(args.pageCount, pageSize);
                        }
                    }
                });
                //跳转页
                obj.on("click",".gobutton",function(){
                    var current = parseInt(obj.find(".pageinput").val());
                    if(current < 1){
                        current = 1;
                    }
                    if(current > args.pageCount){
                        current = args.pageCount;
                    }
                    var pageSize = parseInt($(".sel-value").text());
                    ms.createPages(obj,{"current":current,"pageCount":args.pageCount});
                    if(typeof(args.callback)=="function"){
                        args.callback(current, pageSize);
                    }
                });

            })();
        }
    }
    $.fn.jPages = function(options){
        var args = $.extend({
            pageSize : 100,
            totalCount : 0,
            pageCount : 10,
            current : 1,
            callback : function(){}
        },options);
        ms.init(this,args);
    }
})(jQuery);