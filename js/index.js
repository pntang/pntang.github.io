/**
 * Coder: Summer
 * Date: 2017.08.24
 * Email: 1005526074@qq.com
 * Website: www.summerstarry.com
 * More: http://www.jq22.com/mem310935
 * 请在转载时保留作者信息，多谢！
 */



NProgress.configure({ showSpinner: false });
NProgress.start();


window.onload = function () {
  var desktop = document.querySelector('#desktop');
  var appList = desktop.querySelector('.list')
  var appItem = appList.querySelectorAll('li');
  var contextmenu = desktop.querySelector('.contextmenu');
  var dragSelect = desktop.querySelector('.dragSelect');
  var dateWrapper = desktop.querySelector('.date');

  var publicFn = {
    appColumn: function () {}
  };

  // 竖向排列
  ;(function (window, undefined) {
    publicFn.appColumn = function () {
      var appItem = appList.querySelectorAll('li');
      var appItem_h = appItem[0].offsetHeight + 20;
      var appItem_w = appItem[0].offsetWidth + 10;

      for (var i = 0; i < appItem.length; i++) {
        var column = (i - i % 5) / 5;

        appItem[i].style.left = column * appItem_w + 'px';
        appItem[i].style.top = i % 5 * appItem_h + 'px';
      }
    };
    publicFn.appColumn();
  })(window);

  // 日期容器事件
  ;(function (window, undefined) {
    var close = dateWrapper.querySelector('.close');

    var disX = 0;
    var disY = 0;

    dateWrapper.onmouseover = function () {
      if (this.className !== 'date date-hide' && tools.isHidden(dragSelect, 'visibility')) {
        this.className = 'date date-hover';
      }
    };

    dateWrapper.onmouseout = function () {
      if (this.className !== 'date date-hide') {
        this.className = 'date';
      }
    };

    dateWrapper.onmousedown = function (ev) {
      var oEvent = ev || window.event;
      disX = oEvent.clientX;
      disY = oEvent.clientY - this.offsetTop;

      var offsetRight = tools.view().w - this.offsetLeft - this.offsetWidth;

      this.setCapture && this.setCapture();

      if (this.className === 'date date-hide') {
        startMove(dateWrapper, {width: 180, top: 0, right: 0, padding: 8}, 400, 'Expo.easeInOut', function () {
          dateWrapper.className = 'date';
        });
      }

      document.onmousemove = function (ev) {
        var oEvent = ev || window.event;
        var R = disX - oEvent.clientX + offsetRight;
        var T = oEvent.clientY - disY;
        var maxL = tools.view().w - dateWrapper.offsetWidth;
        var maxT = tools.view().h - dateWrapper.offsetHeight;

        R <= 0 && (R = 0);
        R >= maxL && (R = maxL);
        T <= 0 && (T = 0);
        T >= maxT && (T = maxT);

        dateWrapper.style.right = R + 'px';
        dateWrapper.style.top = T + 'px';
      };

      document.onmouseup = function () {
        this.onmousemove = null;
        this.onmouseup = null;

        this.releaseCapture && this.releaseCapture();
      };

      ev.stopPropagation();
      return false;
    };

    dateWrapper.oncontextmenu = function (ev) {
      ev.stopPropagation();
      return false;
    };

    close.onclick = function () {
      startMove(dateWrapper, {width: 64, top: 0, right: 0, padding: 0}, 400, 'Expo.easeInOut', function () {
        dateWrapper.className = 'date date-hide';
      });
    };
  })(window);

  // 日期
  ;(function (window, undefined) {
    var rightControl = dateWrapper.querySelectorAll('p');

    showDate();
    setInterval(showDate, 1000);
    function showDate() {
      var nowTime = new Date();
      var year = nowTime.getFullYear();
      var month = nowTime.getMonth();
      var day = fn(nowTime.getDate());
      var week = nowTime.getDay();
      var hour = fn(nowTime.getHours());
      var minute = fn(nowTime.getMinutes());
      var second = fn(nowTime.getSeconds());
      var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var weekArr = ["Sunday", 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      rightControl[0].innerHTML = hour + ' : ' + minute + ' : ' + second;
      rightControl[1].innerHTML = monthArr[month] + '  ' + day + ', ' + year;
      rightControl[2].innerHTML = weekArr[week];
    };

    function fn(num) {
      return num > 9 ? num : '0' + num;
    };
  })(window);

  // 右下角琴弦文字
  ;(function (window, undefined) {
    var about = desktop.querySelector('.about');
    var aLi = about.querySelectorAll('li');
    var close = about.querySelector('.close');

    renderText();
    animateString();

    close.onclick = function (ev) {
      startMove(about, {bottom: -200}, 800, 'Expo.easeInOut', function () {
        for (var i = 0; i < aLi.length; i++) {
          aLi[i].style.top = '20px';
          aLi[i].style.opacity = 0;
        }
      });

      ev.stopPropagation();
      return false;
    };

    function renderText() {
      var _html = '';
      var aSpan = null;

      for (var i = 0; i < aLi.length; i++) {
        aLi[i].posArr = [];

        _html = aLi[i].innerHTML;
        aLi[i].innerHTML = '';

        for (var j = 0; j < _html.length; j ++) {
          aLi[i].innerHTML += '<span>'+(_html[j])+'</span>';
        }

        aSpan = aLi[i].querySelectorAll('span');
        for (var j = 0; j < aSpan.length; j ++) {
          aLi[i].posArr.push({left: aSpan[j].offsetLeft, top: aSpan[j].offsetTop});

          aSpan[j].style.left = aSpan[j].offsetLeft + 'px';
          aSpan[j].style.top = aSpan[j].offsetTop + 'px';
        }
        for (var j = 0; j < aSpan.length; j ++) {
          aSpan[j].style.position = 'absolute';
        }
      }
    };

    function animateString() {
      var aSpan = null;
      var maxOffset = 30;
      var recline = 0.3;

      for (var i = 0; i < aLi.length; i++) {
        var startY = 0;

        aLi[i].onmouseover = function (ev) {
          startY = ev.clientY - about.offsetTop - this.offsetTop;
          aSpan = this.querySelectorAll('span')
        };

        aLi[i].onmousemove = function (ev) {
          var changingX = ev.clientX - about.offsetLeft - this.offsetLeft;
          var changingY = ev.clientY - about.offsetTop - this.offsetTop;
          var offsetY = changingY - startY;
          var ifDown = false;

          if (Math.abs(offsetY) > maxOffset) return;
          ifDown = offsetY > 0 ? true : false;

          for (var j = 0; j < aSpan.length; j++) {
            var position = this.posArr[j];
            var reclineNum = Math.abs(changingX - position.left) * recline;
            reclineNum *= ifDown ? 1 : (-1);
            var disY = position.top + offsetY - reclineNum;

            if (ifDown && disY < position.top) {
              disY = position.top;
            }
            if (!ifDown && disY > position.top) {
              disY = position.top;
            }

            aSpan[j].style.top = disY + 'px';
          }
        };

        aLi[i].onmouseout = function () {
          for (var j = 0; j < aSpan.length; j++) {
            aSpan[j].style.top = this.posArr[j].top + 'px';
          }
        };
      }
    };
  })(window);

  // 框选APP
  ;(function (window, undefined) {
    var startX = 0, startY = 0;
    var ifLeft = false, ifTop = false;
    var offsetL = 0, offsetT = 0;

    desktop.onmousedown = function (ev) {
      var appItem = appList.querySelectorAll('li');

      if (ev.which === 1) {
        var startX = ev.clientX;
        var startY = ev.clientY;

        dragSelect.style.left = startX + 'px';
        dragSelect.style.top = startY + 'px';

        offsetL = dragSelect.offsetLeft;
        offsetT = dragSelect.offsetTop;

        document.onmousemove = function (ev) {
          var iL = ev.clientX - startX;
          var iT = ev.clientY - startY;

          dragSelect.style.visibility = 'visible';

          if (iL > 0 && iT > 0) { // rightBottom
            dragSelect.style.width = iL + 'px';
            dragSelect.style.height = iT + 'px';
          } else if (iL > 0 && iT < 0) { // rightTop
            dragSelect.style.width = iL + 'px';
            dragSelect.style.height = -iT + 'px';
            dragSelect.style.top = offsetT + iT + 'px';
          } else if (iL < 0 && iT > 0) { // leftBottom
            dragSelect.style.width = -iL + 'px';
            dragSelect.style.height = iT + 'px';
            dragSelect.style.left = offsetL + iL + 'px';
          } else {
            dragSelect.style.width = -iL + 'px';
            dragSelect.style.height = -iT + 'px';
            dragSelect.style.left = offsetL + iL + 'px';
            dragSelect.style.top = offsetT + iT + 'px';
          }

          for (var i = 0; i < appItem.length; i++) {
            var creash = tools.collision(dragSelect, appItem[i]);

            creash && (appItem[i].className = 'hover');
          }
        };

        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;

          dragSelect.style.visibility = 'hidden';
          dragSelect.style.width = 0;
          dragSelect.style.height = 0;
        };

        ev.stopPropagation();
        return false;
      }
    };
  })(window);

  // APP 事件 && document 事件
  ;(function (window, undefined) {
    var during = 30;
    var clickNum = 0;
    var about = desktop.querySelector('.about');
    var aboutItem = about.querySelectorAll('li');

    for (var i = 0; i < appItem.length; i++) {
      appItem[i].onmousedown = function (ev) {
        ev.stopPropagation();
        return false;
      };

      appItem[i].onclick = function () {
        tools.toggleClass(this, 'hover');
      };

      appItem[i].ondblclick = function () {
        var appLink = this.getAttribute('data-href');
        var appEvent = this.getAttribute('data-event');

        appLink && window.open(appLink);

        if (appEvent === 'about') {
          startMove(about, {bottom: 0}, 800, 'Expo.easeInOut');

          for (var i = 0; i < aboutItem.length; i++) {
            startMove(aboutItem[i], {top: 0, opacity: 100}, (200 * (i + 1)), 'Quad.easeIn');
          }
        }
      };

      appItem[i].oncontextmenu = function (ev) {
        if (tools.hasClass(this, 'hover')) {
          var fnContextmenu = new Contextmenu(this, ev, contextmenu);
        }

        ev.stopPropagation();
        return false;
      };
    }

    document.oncontextmenu = function (ev) {
      var fnContextmenu = new Contextmenu(this, ev, contextmenu);

      return false;
    };
  })(window);

  // 右键菜单点击
  ;(function (window, undefined) {
    var appItem = null;
    var menuItem = contextmenu.querySelectorAll('li');
    var dialog = desktop.querySelector('.dialog');
    var dialogControl = dialog.querySelectorAll('span');

    for (var i = 0; i < menuItem.length; i++) {
      menuItem[i].onclick = function () {
        var dataVal = this.getAttribute('data-value');

        switch(dataVal) {
          case 'create':
            if (tools.isHidden(dialog, 'opacity')) {
              var fnDialog = new Dialog('create');
            }
          break;
          case 'edit':
            if (tools.isHidden(dialog, 'opacity')) {
              var fnDialog = new Dialog('edit');
            }
          break;
          case 'refresh':
            history.go();
          break;
          case 'cancel':
            appItem = appList.querySelectorAll('li');

            for (var j = 0; j < appItem.length; j ++) {
              tools.hasClass(appItem[j], 'hover') && (appItem[j].className = '');
            }
          break;
          case 'trash':
            appItem = appList.querySelectorAll('li');

            for (var j = 0; j < appItem.length; j ++) {
              if (tools.hasClass(appItem[j], 'hover')) {
                appItem[j].remove();

                publicFn.appColumn();
              }
            }
          break;
        }
      };
    }
  })(window);

  NProgress.done();
};