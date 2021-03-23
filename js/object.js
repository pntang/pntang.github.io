function Contextmenu(obj, ev, contextmenu) {
  this.obj = obj;
  this.ev = ev;
  this.contextmenu = contextmenu;
  this.item = this.contextmenu.querySelectorAll('li');
  this.renderValue = {};

  return this.inital();
}
Contextmenu.prototype = {
  stopBubble: function () {
    var self = this;

    document.onclick = function () {
      self.contextmenu.style.display = 'none';
    };
    
    self.contextmenu.oncontextmenu = function (ev) {
      ev.stopPropagation();
      return false;
    };
  },

  initalContextmenu: function () {
    this.contextmenu.style.display = 'block';
    this.contextmenu.style.left = this.ev.clientX - 15 + 'px';
    this.contextmenu.style.top = this.ev.clientY + 7 + 'px';

    for (var i = 0; i < this.item.length; i++) {
      var dataValue = this.item[i].getAttribute('data-value');

       this.item[i].style.display = 'none';

      if (this.renderValue[dataValue]) {
        this.item[i].style.display = 'block';
      }

    }

    this.stopBubble();
  },

  inital: function () {
    if (this.obj.nodeType === 9) {
      this.renderValue = {create: true, edit: false, refresh: true, trash: false, cancel: true};
    } else {
      this.renderValue = {create: false, edit: true, refresh: false, trash: true, cancel: true};
    }

    this.initalContextmenu();
  },

  constructor: Contextmenu
};

function Dialog(method) {
  this.desktop = document.querySelector('#desktop');
  this.dialog = desktop.querySelector('.dialog');
  this.dialogInput = this.dialog.querySelectorAll('input');
  this.dialogCont = this.dialog.querySelector('.cont');
  this.dialogControl = this.dialog.querySelectorAll('span');
  this.appList = this.desktop.querySelector('.list');
  this.appItem = this.appList.querySelectorAll('li');
  this.contextmenu = this.desktop.querySelector('.contextmenu');

  this.method = method;

  return this.inital();
};
Dialog.prototype = {
  createFile: function (title, imgUrl, linkUrl) {
    var self = this;
    var appItem = this.appList.querySelectorAll('li');
    var lastL = 0;
    var lastT = 0;
    var createElem = document.createElement('li');
    var _html = '<img src="'+imgUrl+'" alt="#"><span>'+title+'</span>';
    var appItem_w = appItem[0].offsetWidth;
    var appItem_h = appItem[0].offsetHeight;
    

    createElem.innerHTML = _html;
    createElem.setAttribute('data-href', linkUrl);
    this.appList.appendChild(createElem);

    lastL = parseInt(tools.getStyle(appItem[appItem.length - 1], 'left'));
    lastT = parseInt(tools.getStyle(appItem[appItem.length - 1], 'top')) + appItem_h + 20;

    if (appItem.length % 5 === 0) {
      for (var i = 0; i < appItem.length; i++) {
        var column = appItem.length / 5;

        lastL = column * appItem_w + 10;
        lastT = 0;
      }
    }

    createElem.style.left = lastL + 'px';
    createElem.style.top = lastT + 'px';

    createElem.onmousedown = function (ev) {
      ev.stopPropagation();
      return false;
    };

    createElem.onclick = function () {
      tools.toggleClass(this, 'hover');
    };

    createElem.ondblclick = function () {
        var appLink = this.getAttribute('data-href');
        appLink && window.open(appLink);
      };

    createElem.oncontextmenu = function (ev) {
      if (tools.hasClass(this, 'hover')) {
        var fnContextmenu = new Contextmenu(this, ev, self.contextmenu);
      }

      ev.stopPropagation();
      return false;
    };
  },

  control: function () {
    var title = this.dialogInput[0].value || 'Default title';
    var imgUrl = this.dialogInput[1].value || 'images/tip.png';
    var linkUrl = this.dialogInput[2].value || 'https://github.com/EzrealY';

    if (this.method === 'edit') {
      for (var j = 0; j < this.appItem.length; j ++) {
        var appItem_title = this.appItem[j].querySelector('span');

        if (tools.hasClass(this.appItem[j], 'hover')) {
          appItem_title.innerHTML = title;
        }
      }
    } else {
      this.createFile(title, imgUrl, linkUrl);
    }

    for (var i = 0; i < this.dialogInput.length; i++) {
      this.dialogInput[i].value = '';
    }
  },

  moving: function () {
    var self = this;
    var viewW_half = tools.view().w / 2;
    var viewH_half = tools.view().h / 2;
    var targetW = 400, targetH = 200;

    this.dialog.style.left = viewW_half + 'px';
    this.dialog.style.top = viewH_half + 'px';

    var targetL = viewW_half - targetW / 2;
    var targetT = viewH_half - targetH / 2;

    startMove(this.dialog, {opacity: 100, width: targetW, height: targetH, left: targetL, top: targetT}, 600, 'Expo.easeInOut', function () {
      startMove(self.dialogCont, {opacity: 100}, 400, 'Linear');
    });

    for (var i = 0; i < this.dialogControl.length; i++) {
      this.dialogControl[i].index = i;
      this.dialogControl[i].onclick = function () {
        self.dialogCont.style.opacity = 0;

        startMove(self.dialog, {opacity: 0, width: 0, height: 0, left: viewW_half, top: viewH_half}, 600, 'Expo.easeInOut', function () {
          self.dialog.style.opacity = 0;
        });

        this.index === 0 && self.control();
      };
    }

    document.onkeyup = function (ev) {
      if (ev.keyCode === 13 || ev.keyCode === 27) {
        self.dialogCont.style.opacity = 0;

        startMove(self.dialog, {opacity: 0, width: 0, height: 0, left: viewW_half, top: viewH_half}, 600, 'Expo.easeInOut', function () {
          self.dialog.style.opacity = 0;
        });
      }

      if (ev.keyCode === 13) {
        self.control();
      }
    };
  },

  inital: function () {
    var self = this;

    if (this.method === 'edit') {
      this.dialogInput[1].style.display = 'none';
      this.dialogInput[2].style.display = 'none';
    } else {
      this.dialogInput[1].style.display = 'block';
      this.dialogInput[2].style.display = 'block';
    }

    for (var i = 0; i < this.dialogInput.length; i++) {
      this.dialogInput[i].onfocus = function () {
        this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, .175)';
      };
      this.dialogInput[i].onblur = function () {
        this.style.boxShadow = '';
      };
    }

    this.dialogInput[0].focus();

    this.dialog.onmousedown = function (ev) {
      ev.stopPropagation();
    };
    this.dialog.oncontextmenu = function (ev) {
      ev.stopPropagation();
      return false;
    };

    this.moving();
  },

  constructor: Dialog
};
