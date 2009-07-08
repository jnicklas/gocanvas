GoCanvas
========

GoCanvas is a library for drawing on HTML5 "canvas" elements in an object-centric
way. It is inspired by (and for now depends on) the jQuery library.

It's *extremely* experimental, untested and generally unfinished. It's basically
just a proof of concept.

You'll need to add a div that has the desired size for the canvas:

    <div id="my_canvas" style="width: 200px; height: 300px">

(It doesn't have to be an inline style, in fact it shouldn't be)

you can add a canvas and draw to it like this:

    var canvas = Canvas('#my_canvas');
    
    canvas.circle(20).move(50, 50).fill('#cccccc).stroke('#eeeeee');
    canvas.pane(40, 40).move(100, 100).fill('#ff0000');
    
    canvas.add(function(context) {
      context.anyCanvasFunctionHere();
    });
    
    canvas.redraw();

Whenever anything is changed on the canvas, you'll need to call redraw() in
order for the changes to take effect. You can also nest objects within other
objects. The following code creates a blue planet with a moon circling around
it and an asteroid circling around the moon, slowly leaving orbit.

    var canvas = Canvas('#my_canvas');

    var earth = canvas.circle(20).position(100, 100).fill('#0000ff');
    var moon = earth.circle(5).fill('#cccc00').move(50, 0);
    var asteroid = moon.circle(2).fill('#000000').move(15, 0);

    canvas.redraw();

    setInterval(function() {
      earth.rotate(1);
      moon.rotate(3);
      asteroid.move(0.1,0);
      canvas.redraw();
    }, 50);

GoChart
=======

GoChart is a library for drawing charts using the HTML canvas API and the
GoCanvas library. It's even more experimental :P