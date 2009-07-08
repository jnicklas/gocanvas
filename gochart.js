var Chart = function(element) {
  var self = Canvas(element);
  
  self.grid = self.pane(self.width - 20, self.height - 20);
  self.grid.move(10, self.height - 10);
  self.grid.flipVertical();
  self.grid.xmax = function() {
    var xmax = Canvas.Utils.map(self.grid.objects, function() {
      return this.points.xmax();
    });
    return Canvas.Utils.max(xmax);
  };
  self.grid.ymax = function() {
    var ymax = Canvas.Utils.map(self.grid.objects, function() {
      return this.points.ymax();
    });
    return Canvas.Utils.max(ymax);
  };
  self.clear = self.grid.clear;
  self.series = function(points) {
    var object = Chart.Series(self.grid, points);
    self.grid.objects.push(object);
    return object;
  };
  return self;
};

Chart.Series = function(grid, points) {
  var self = Canvas.Object();
  self.line = self.shape(function(context) {
    self.points.each(function() {
      context.lineTo(self.xspace(this[0]), self.yspace(this[1]));
    });
  }).stroke(1);
  self.add(function(context) {
    self.points.each(function() {
      var circle = Canvas.Circle(3);
      circle.move(self.xspace(this[0]), self.yspace(this[1])).fill('#ffffff').stroke(1).draw(context);
    });    
  });
  self.xspace = function(x) {
    return x * grid.width / self.xmax();
  };
  self.yspace = function(y) {
    return y * grid.height / self.ymax();
  };
  self.xmax = grid.xmax;
  self.ymax = grid.ymax;
  self.points = Canvas.Points(points);
  return self;
};