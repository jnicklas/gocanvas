var Canvas = function(element) {
  var self = Canvas.Object();

  self.element = $(element);

  self.width = self.element.width();
  self.height = self.element.height();

  self.canvas = $('<canvas width="' + self.width + '" height="' + self.height + '"></canvas>');
  self.element.append(self.canvas);
  self.context = self.canvas.get(0).getContext('2d');

  self.clear = function() {
    self.context.clearRect(0,0,self.width,self.height);
  };

  self.redraw = function() {
    self.clear();
    self.draw(self.context);
  };
  return self;
};

Canvas.Object = function(draw) {
  var self = {};
  self.x = 0;
  self.y = 0;
  self.xscale = 1;
  self.yscale = 1;
  self.objects = [];
  self.rotate = 0;
  self.angle = 0;
  self.xflip = 1;
  self.yflip = 1;
  self.draw = function(context) {
    context.save();
    context.translate(self.x, self.y);
    context.scale(self.xflip * self.xscale, self.yflip * self.yscale);
    context.rotate((self.angle % 360) / 180 * Math.PI);    
    if(draw) { draw.call(self, context); };
    $(self.objects).each(function() {
      this.draw(context);
    });
    context.restore();
  };
  self.move = function(x, y) {
    self.x += x;
    self.y += y;
    return self;
  };
  self.flipHorizontal = function() {
    self.xflip = -1;
  };
  self.flipVertical = function() {
    self.yflip = -1;
  };
  self.position = function(x, y) {
    self.x = x;
    self.y = y;
    return self;
  };
  self.scale = function(x, y) {
    self.xscale *= x;
    self.yscale *= y;
    return self;
  };
  self.size = function(x, y) {
    self.xscale = x;
    self.yscale = y;
    return self;
  };
  self.rotate = function(degrees) {
    self.angle += degrees;
    return self;
  };
  self.rotation = function(degrees) {
    self.angle = degrees;
    return self;
  };
  self.add = function(draw) {
    var object = Canvas.Object(draw);
    self.objects.push(object);
    return object;
  };
  self.shape = function(draw) {
    var object = Canvas.Shape(draw);
    self.objects.push(object);
    return object;
  };
  self.circle = function(r) {
    var object = Canvas.Circle(r);
    self.objects.push(object);
    return object;
  };
  self.pane = function(width, height) {
    var object = Canvas.Pane(width, height);
    self.objects.push(object);
    return object;
  };
  self.line = function(points) {
    var object = Canvas.Line(points);
    self.objects.push(object);
    return object;
  };
  return self;
};

Canvas.Pane = function(width, height) {
  var self = Canvas.Object(function(context) {
    context.save();
    if(self.strokeWidth) context.lineWidth = self.strokeWidth;
    if(self.strokeStyle) context.strokeStyle = self.strokeStyle;
    if(self.fillStyle) context.fillStyle = self.fillStyle;
    
    if(self.useStroke) context.strokeRect(0, 0, self.width, self.height);
    if(self.useFill) context.fillRect(0, 0, self.width, self.height);
    context.restore();
  });
  self.width = width;
  self.height = height;
  self.stroke = function(width, style) {
    self.strokeWidth = width;
    self.strokeStyle = style;
    self.useStroke = true;
    return self;
  };
  self.fill = function(style) {
    self.fillStyle = style;
    self.useFill = true;
    return self;
  };
  self.space = function(x, y) {
    self.xspace = x;
    self.yspace = y;
  };
  return self;
};

Canvas.Shape = function(draw) {
  var self = Canvas.Object(function(context) {
    context.save();
    if(self.strokeWidth) context.lineWidth = self.strokeWidth;
    if(self.strokeStyle) context.strokeStyle = self.strokeStyle;
    if(self.fillStyle) context.fillStyle = self.fillStyle;
    context.beginPath();
    draw.call(this, context);
    if(self.useStroke) context.stroke();
    if(self.useFill) context.fill();
    context.closePath();
    context.restore();
  });
  self.strokeWidth = 0;
  self.stroke = function(width, style) {
    self.strokeWidth = width;
    self.strokeStyle = style;
    self.useStroke = true;
    return self;
  };
  self.fill = function(style) {
    self.fillStyle = style;
    self.useFill = true;
    return self;
  };
  return self;
};

Canvas.Circle = function(radius) {
  var self = Canvas.Shape(function(context) {
    context.arc(0, 0, self.radius, 0, Math.PI*2, true);
  });
  self.radius = radius;
  return self;
};

Canvas.Line = function(points) {
  var self = Canvas.Shape(function(context) {
    context.moveTo(self.points[0][0], self.points[0][1]);
    $(self.points).each(function() {
      context.lineTo(this[0], this[1]);
    });
  });
  self.points = points;
  return self;
};