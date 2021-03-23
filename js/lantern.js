;(function (window, undefined) {
  var lantern = document.querySelector('.lantern');
  var lanternItem = null;

  var now;
  var then = Date.now();
  var fps = 60;
  var interval = 200;
  var delta;
  var range = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  var step = function () {
    requestAnimationFrame(step);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);

      draw();
    }
  };
  step();

  function draw() {
    var createElem = document.createElement('span');
    var rotateRange = range(-45, 45);

    createElem.style.transform = 'rotateZ('+rotateRange+'deg) scale('+(range(0, 1))+')';
    createElem.style.left = range(0, tools.view().w) + 'px';
    createElem.style.top = range(tools.view().h / 2, tools.view().h) + 'px';
    createElem.style.opacity = 0;
    lantern.appendChild(createElem);

    lanternItem = lantern.querySelectorAll('span');

    for (var i = 0; i < lanternItem.length; i++) {
      $(lanternItem[i]).velocity({opacity: 1}, {duration: 400});
      $(lanternItem[i]).velocity({top: 0, opacity: 0}, {duration: 5000, complete: function () {
        $(this).remove();
      }});
    }
  };
})(window);