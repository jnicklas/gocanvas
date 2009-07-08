var Chart = function(element) {
  var self = Canvas(element);
  
  self.grid = self.pane(self.height, self.width).fill('#cccccc');
  self.grid.xmax = function() {
    var xmax = Canvas.Utils.map(self.grid.objects, function() {
      return this.points.xmax();
    });
    return Canvas.Utils.max(xmax);
  };
  
  self.series = function(points) {
    var object = Chart.Series(self.grid, points);
    object.move(0, self.height);
    object.flipVertical();
    self.grid.objects.push(object);
    return object;
  };
  return self;
};

Chart.Series = function(grid, points) {
  var self = Canvas.Shape(function(context) {
    context.moveTo(self.xspace(self.points.xstart()), self.points.ystart());
    self.points.each(function() {
      context.lineTo(self.xspace(this[0]), this[1]);
    });
  });
  self.xspace = function(x) {
    return x * grid.width / self.xmax();
  };
  self.xmax = grid.xmax;
  self.points = Canvas.Points(points);
  return self.stroke(2);
};