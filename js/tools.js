var tools = (function () {
  return {
    view: function () {
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };
    },

    collision: function (obj1, obj2) {
      var obj1Rect =  tools.getBoundingClientRect(obj1);
      var obj2Rect =  tools.getBoundingClientRect(obj2);

      var obj1Left = obj1Rect.left;
      var obj1Right = obj1Rect.right;
      var obj1Top = obj1Rect.top;
      var obj1Bottom = obj1Rect.bottom;

      var obj2Left = obj2Rect.left;
      var obj2Right = obj2Rect.right;
      var obj2Top = obj2Rect.top;
      var obj2Bottom = obj2Rect.bottom;

      if( obj1Right < obj2Left || obj1Left > obj2Right || obj1Bottom < obj2Top || obj1Top > obj2Bottom ){
        return false;
      } else {
        return true;
      }
    },

    getBoundingClientRect: function (obj) {
      return {
        left: obj.getBoundingClientRect().left,
        top: obj.getBoundingClientRect().top,
        right: obj.getBoundingClientRect().right,
        bottom: obj.getBoundingClientRect().bottom
      };
    },

    addClass: function (obj, cls) {
      var clsName = obj.className;

      if (clsName) {
        var arr_clsName = clsName.split(" ");
        var iIndex = tools.getIndexOf(arr_clsName, cls);

        if (iIndex == -1) {
          obj.className += " " + cls;
        }
      } else {
        obj.className = cls;
      }
    },

    removeClass: function (ele, cls) {
      if (tools.hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,'');
      }
    },

    hasClass: function (obj, cls) {
      var className = obj.className;

      if (className) {
        var cls_split = className.split(' ');

        if (tools.getIndexOf(cls, cls_split) !== -1) {
          return true;
        }

        return false;
      }
    },

    getIndexOf: function (curVal, collection) {
      var result = -1;

      for (var i = 0; i < collection.length; i++) {
        if (curVal === collection[i]) {
          result = i;
        }
      }

      return result;
    },

    toggleClass: function (obj, className) {
      if (tools.hasClass(obj, className)) {
        tools.removeClass(obj, className);
      } else {
        tools.addClass(obj, className);
      }
    },

    getStyle: function (obj, cssName) {
      return obj.currentStyle ? obj.currentStyle[cssName] : getComputedStyle(obj, false)[cssName];
    },

    nowTime: function () {
      return new Date().getTime();
    },

    isHidden: function (obj, key) {
      var cssKey = '';
      var style = tools.getStyle(obj, key);

      if (key == 'visibility') {
        cssKey = 'hidden';
      } else if (key == 'display') {
        cssKey = 'none';
      } else {
        cssKey = '0';
      }

      return style === cssKey ? true : false;
    },
  };
}());