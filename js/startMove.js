// requestAnimationFrame 时间运动版
function startMove(obj, json, interval, method, fn) {
  var iCur = {};
  var startTime = tools.nowTime();
  var arrKeyTween = method.split('.');
  var fnGetValue = null;
  var Tween = Math.tween || window.Tween;

  for (var attr in json) {
    if (attr === 'opacity') {
      iCur[attr] = Math.round(tools.getStyle(obj, attr) * 100);
    } else {
      iCur[attr] = parseInt(tools.getStyle(obj, attr));
    }
  }

  if (arrKeyTween.length == 1) {
      fnGetValue = Tween[arrKeyTween[0]];
  } else if (arrKeyTween.length == 2) {
    fnGetValue = Tween[arrKeyTween[0]] && Tween[arrKeyTween[0]][arrKeyTween[1]];
  }

  var step = function () {
    var changeTime = tools.nowTime();
    var t = interval - Math.max(0, startTime - changeTime + interval);

    for (var attr in json) {
      var value = fnGetValue(t, iCur[attr], json[attr] - iCur[attr], interval);

      if (attr === 'opacity') {
        obj.style.opacity = value / 100;
        obj.style.filter = 'alpha(opacity: '+value+')';
      } else {
        obj.style[attr] = value + 'px';
      }
    }

    if (t === interval) {
      cancelAnimationFrame(step);

      fn && fn.call(obj);
    } else {
      requestAnimationFrame(step);
    }
  };
  step();
};