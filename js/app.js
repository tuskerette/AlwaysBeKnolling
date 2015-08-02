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

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this is used later in the resizing demo
window.dragMoveListener = dragMoveListener;


// Multi-touch rotation (interactjs)
// var angle = 0;

// interact('#rotate-area').gesturable({
//   onmove: function (event) {
//     var arrow = document.getElementById('search2');

//     angle += event.da;

//     arrow.style.webkitTransform =
//     arrow.style.transform =
//       'rotate(' + angle + 'deg)';

//     // document.getElementById('angle-info').textContent =
//     //   angle.toFixed(2) + '°';
//   }
// });



// Rotate
$(document).ready(function() {

  function rotateOnMouse(e, pw) {
      var offset = pw.offset();
      var center_x = (offset.left) + ($(pw).width() / 2);
      var center_y = (offset.top) + ($(pw).height() / 2);
      var mouse_x = e.pageX;
      var mouse_y = e.pageY;
      var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
      var degree = (radians * (180 / Math.PI) * -1) + 100;
      $(pw).css('-moz-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-webkit-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-o-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-ms-transform', 'rotate(' + degree + 'deg)');
  }

  $('.drop div').mousedown(function(e) {
    e.preventDefault(); // prevents the dragging of the image.
    $(document).bind('mousemove.rotateImg', function(e2) {
      rotateOnMouse(e2, $('.drop div'));
    });
  });

  $(document).mouseup(function(e) {
    $(document).unbind('mousemove.rotateImg');
  });
});


