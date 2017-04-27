module.exports = (function(){

  // Number, Number, Number -> Vector
  function Vector3(x, y, z){
    return {x: x, y: y, z: z};
  };

  // Vector -> Number
  function x(v){
    return v.x;
  };

  // Vector -> Number
  function y(v){
    return v.y;
  };

  // Vector -> Number
  function z(v){
    return v.z;
  };

  // Vector -> Float
  function len(a){
    return Math.sqrt(a.x*a.x+a.y*a.y+a.z*a.z);
  }

  // Vector, Vector -> Float
  function dot(a, b){
    return a.x*b.x + a.y*b.y + a.z*b.z;
  };

  // Vector, Vector -> Vector
  function cross(a, b){
    var ax = x(a), ay = y(a), az = z(a);
    var bx = y(a), by = y(b), bz = z(b);
    return Vector3(
      ay*bz-az*by,
      az*bx-bz*ax,
      ax*by-ay*bx);
  };

  // Double, Vector -> Vector
  function scale(s, v){
    return Vector3(v.x*s, v.y*s, v.z*s);
  };

  // Vector, Vector -> Vector
  function add(a, b){
    return Vector3(a.x+b.x, a.y+b.y, a.z+b.z);
  };

  // Vector, Vector -> Vector
  function sub(a, b){
    return Vector3(a.x-b.x, a.y-b.y, a.z-b.z);
  };

  // Vector, Vector -> Vector
  function mul(a, b){
    return Vector3(a.x*b.x, a.y*b.y, a.z*b.z);
  };

  // Vector -> {rad: Float, inc: Float, ang: Float}
  function sphericalCoordinates(pos){
    var rad = len(pos);
    var inc = Math.acos(pos.z / rad) / Math.PI;
    var ang = Math.atan2(pos.y, pos.x) / (Math.PI*2);
    return {rad: rad, ang: ang, inc: inc};
  };

  return {
    Vector3: Vector3,
    x: x,
    y: y,
    z: z,
    sphericalCoordinates: sphericalCoordinates,
    len: len,
    add: add,
    sub: sub,
    mul: mul,
    dot: dot,
    scale: scale,
    cross: cross};
})();
