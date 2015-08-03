// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of its parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    onmove: dragMoveListener,
  });

interact('.rotate')
  .draggable({
    inertia : true,
    onmove: rotateMoveListener
  });

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  if(Array.prototype.indexOf.call(target.classList, 'draggable') === -1) return;

  // translate the element
  // target.style.webkitTransform =

  if(!target.style.transform) target.style.transform = 'translate(0px, 0px) rotate(0deg)';
  target.style.transform = target.style.transform.replace(/translate\([\-\.\d]+px, [\-\.\d]+px\)/, 'translate(' + x + 'px, ' + y + 'px)');

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}
function rotateMoveListener (event) {
  var target = event.target;

  if(Array.prototype.indexOf.call(target.classList, 'rotate') === -1) return;

  var offset = [target.offsetLeft, target.offsetTop];
  var bounds = target.getBoundingClientRect();
  var center_x = bounds.left + (bounds.right - bounds.left) / 2;
  var center_y = bounds.top + (bounds.bottom - bounds.top) / 2;
  var mouse_x = event.pageX;
  var mouse_y = event.pageY;
  var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
  var degree = (radians * (180 / Math.PI) * -1) + 100;

  if(!target.style.transform) target.style.transform = 'translate(0px, 0px) rotate(0deg)';
  target.style.transform = target.style.transform.replace(/rotate\([\-\.\d]+deg\)/, 'rotate(' + degree + 'deg)');
}

// this is used later in the resizing demo
window.dragMoveListener = dragMoveListener;


$('#rotateitem').on('click', function (event) {
    $('.glyphicon').toggleClass('rotate draggable');
  });



