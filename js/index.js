/**
 * 轮播图
 */
(function () {
    var step = 0;
    var oDiv = document.getElementById("banner"),
        oImgWrap = document.getElementById("imgWrap"),
        oList = document.getElementById("list"),
        oLis = oList.getElementsByTagName("li"),
        omask = oList.getElementsByTagName("i"),
        tip = oList.getElementsByTagName("em")[0];
    var oDivs = oImgWrap.getElementsByTagName("div");
    utils.setCss(omask[0], "display", "none");
    var timer = setInterval(autoMove, 3000);

    function autoMove() {
        if (step >= oDivs.length - 1) {
            step = -1;
        }
        step++;
        for (var i = 0, len = omask.length; i < len; i++) {
            if (i === step) {
                utils.setCss(omask[i], "display", "none");
            } else {
                utils.setCss(omask[i], "display", "block");
            }
        }
        myAnimate(oImgWrap, {top: -step * 160}, 200);
        myAnimate(tip, {top: step * 53}, 200);
    }

    changeTip();
    function changeTip() {
        for (var i = 0, len = oLis.length; i < len; i++) {
            oLis[i].index = i;
            oLis[i].onmouseover = function () {
                step = this.index - 1;
                autoMove();
            }
        }
    }

    startStop();
    function startStop() {
        oDiv.onmouseover = function () {
            clearInterval(timer);
        };
        oDiv.onmouseout = function () {
            timer = setInterval(autoMove, 3000);
        };
    }
})();

/**
 * 穿墙
 */
(function(){
    function maskMove(obj) {
        var oS = obj.children[1];
        obj.onmouseenter = function (ev) {
            ev = ev || window.event;
            var dir = maskDir(obj, ev);
            switch (dir) {
                case 0:
                    oS.style.left = oS.offsetWidth+'px';
                    oS.style.top = 0;
                    break;
                case 1:
                    oS.style.left = 0;
                    oS.style.top = oS.offsetWidth+'px';
                    break;
                case 2:
                    oS.style.left = -oS.offsetWidth+'px';
                    oS.style.top = 0;
                    break;
                case 3:
                    oS.style.left = 0;
                    oS.style.top = -oS.offsetWidth+'px';
                    break;
            }
            myAnimate(oS, {top: 0, left: 0});
        };
        obj.onmouseleave = function (ev) {
            ev = ev || event;
            var dir = maskDir(obj, ev);
            switch (dir) {
                case 0:
                    myAnimate(oS, {left: oS.offsetWidth, top: 0});
                    break;
                case 1:
                    myAnimate(oS, {left: 0, top: oS.offsetWidth});
                    break;
                case 2:
                    myAnimate(oS, {left: -oS.offsetWidth, top: 0});
                    break;
                case 3:
                    myAnimate(oS, {left: 0, top: -oS.offsetWidth});
                    break;
            }
        };
        function maskDir(obj, ev) {
            var curL=utils.offset(obj).left;
            var curR=utils.offset(obj).top;
            var x = curL + obj.offsetWidth / 2 - ev.pageX;
            var y = curR + obj.offsetHeight / 2 - ev.pageY;
            return Math.round(((Math.atan2(y, x)* 180 / Math.PI) + 180) / 90) % 4;
        }
    }
    var next=document.getElementById("nextList");
    var aLi = next.getElementsByTagName('li');

    for (var i = 0; i < aLi.length; i++) {
        maskMove(aLi[i]);
    }
})();

/**
 * 底部固定
 */
(function(){
    var footer=document.getElementById("footerBox");
    //console.log(footer);
    var last=document.getElementById("lastlast");
    var toTop=document.getElementById("toTop");
    var fkBox=document.getElementById("fkBox");
    document.onscroll=function(){
        var scroll=utils.win("scrollTop");
        var height=utils.win("scrollHeight");
        var clientHeight=utils.win("clientHeight");
        if(scroll>=height-clientHeight){
            footer.style.bottom=68+"px";
            toTop.style.bottom=208+"px";
            fkBox.style.bottom=148+"px";
        }else{
            footer.style.bottom=0+"px";
            toTop.style.bottom=140+"px";
            fkBox.style.bottom=80+"px";
        }
    }
})();

/**
 * input
 */
(function(){
    var input=document.getElementById("firInp");
    input.onfocus=function(){
        this.placeholder="搜索公司、职位或地点";
    };
    input.onblur=function(){
        this.placeholder="Java";
    }
})();

/**
 * 热门职位 最新职位选项卡切换
 */
(function () {
    var jobBtn = document.getElementById("jobBtn");
    var oLis = jobBtn.getElementsByTagName("li");
    var jobContent = document.getElementById("jobContent");
    var oDivs = utils.getByClass(jobContent, "job_content");

    var changTab = function () {
        for (var i = 0, len = oLis.length; i < len; i++) {
            oLis[i].index = i;
            //console.log(oLis.length);
            oLis[i].onclick = function () {
                changDiv(this.index);
            }
        }
    };
    var changDiv = function (n) {
        for (var i = 0, len = oLis.length; i < len; i++) {
            utils.removeClass(oDivs[i], "selectJobList");
            utils.removeClass(oLis[i], "job_current");
            console.log(oDivs[i].className);
        }

        utils.addClass(oDivs[n], "selectJobList");
        utils.addClass(oLis[n], "job_current");
        //console.log(oDivs[n].className);
    };
    changTab();
})();

/**
 * 左侧列表选项卡
 */
(function () {
    var oBox = document.getElementById("leftTop");
    var oList=utils.getByClass(oBox,"leftList");
    var oMenu=utils.getByClass(oBox,"menu");

    for (var i = 0, len = oList.length; i < len; i++) {
        oList[i].index=i;
        oMenu[i].index=i;
        oList[i].onmouseenter=function(){
            changeMenu(this.index);
        };
        oMenu[i].onmouseenter=function(){
            changeMenu(this.index);
        };
        oList[i].onmouseleave=function(){
            displayNone(this.index);
        };
        oMenu[i].onmouseleave=function(){
            displayNone(this.index);
        };
    }
    function changeMenu(n) {
        for (var i = 0; i < oList.length; i++) {
            utils.removeClass(oList[i],"thisList");
            utils.removeClass(oMenu[i],"thisMenu");
        }
        utils.addClass(oList[n],"thisList");
        utils.addClass(oMenu[n],"thisMenu");
    }
    function displayNone(n){
        for(var i=0;i<oList.length;i++){
            utils.removeClass(oList[n],"thisList");
            utils.removeClass(oMenu[n],"thisMenu");
        }
    }
})();

/**
 * 回到顶部
 */
(function(){
    var oBtn=document.getElementById("toTop");
    window.onscroll=computedDisplay;
    function computedDisplay(){
        if(utils.win('scrollTop')>10){
            oBtn.style.display='block';
        }else{
            oBtn.style.display='none';
        }
    }
    oBtn.onclick=function(){
        this.style.display='none';
        var target=utils.win('scrollTop');
        var duration=120;
        var interval=10;
        var step=target/duration*interval;
        clearInterval(timer);
        var timer=window.setInterval(function(){
            var curT=utils.win("scrollTop");
            if(curT<=0){
                clearInterval(timer);
                window.onscroll=computedDisplay;
            }
            curT-=step;
            utils.win("scrollTop",curT);
        },interval);
    }
})();


