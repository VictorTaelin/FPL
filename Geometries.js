module.exports = (function(){
  // type AtomsCList = ∀ a . (#Vector3, #Vector3, a -> a), a -> a
  // Vector3 values are expanded (splat) on the callback function call
//   Example: box(8,8,8)(function(x,y,z,nx,ny,nz,init){ ... }, init);

  // Number, Number, Number, Number -> AtomsCList
  function sphere(cx, cy, cz, r){
    var sqrt = Math.sqrt;
    var round = Math.round;
    return function(cons, nil){
      for (var y = -r; y < r; ++y){
        var xl = round(sqrt(r*r - y*y));
        for (var x = -xl; x < xl; ++x){
          if (x*x + y*y < r*r){
            var z = round(sqrt(r*r - x*x - y*y));
            nil = cons(cx+x, cy+y, cz-z, nil);
            nil = cons(cx+x, cy+y, cz+z, nil);
          };
        };
      };
      return nil;
    };
  };

  // Number, Number, Number -> AtomsCList
  // Every grid position of the box with dimensions (w,h,d).
  function box(w, h, d){
    return function(cons, nil){
      function register(x, y, z){
        var nx = x === -w ? -1 : x === w ? 1 : 0;
        var ny = y === -h ? -1 : y === h ? 1 : 0;
        var nz = z === -d ? -1 : z === d ? 1 : 0;
        var nl = Math.sqrt(nx*nx+ny*ny+nz*nz);
        nil = cons(x, y, z, nx/nl, ny/nl, nz/nl);
      };
      for (var y=-h; y<=h; ++y)
        for (var x=-w; x<=w; ++x)
          register(x, y,  d),
          register(x, y, -d);
      for (var z=-d+1; z<d; ++z)
        for (var x=-w; x<=w; ++x)
          register(x,  h, z),
          register(x, -h, z);
      for (var z=-d+1; z<d; ++z)
        for (var y=-h+1; y<h; ++y)
          register( w, y, z),
          register(-w, y, z);
      return nil;
    };
  };

  // Number, Number, Number -> AtomsCList
  function block(w, h, d){
    return function(cons, nil){
      for (var z=-d; z<=d; ++z)
        for (var y=-h; y<=h; ++y)
          for (var x=-w; x<=w; ++x)
            nil = cons(x, y, z),
            nil = cons(x, y, z);
      return nil;
    };
  };


  // Number, Number, Number, Number, RGBA8 -> Voxels
  function sphereVoxels(cx, cy, cz, r, col){
    return function(cons, nil){
      sphere(cx, cy, cz, r)(function(x, y, z, res){
        return cons(x, y, z, col, res);
      }, nil);
    };
  };

  return {
    sphere: sphere,
    box: box,
    block: block,
    sphereVoxels: sphereVoxels};
})();
