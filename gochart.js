var Chart = function(element) {
  var self = Canvas(element);
  
  self.series = function(points) {
    var object = Chars.Series(points);
    self.objects.push(object);
    return object;
  };
  return self;
};

Chart.Series = function(points) {
  var self = Canvas.Object(function() {
    
  });
  return self;
};