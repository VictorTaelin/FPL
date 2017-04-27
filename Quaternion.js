module.exports = (function(){
  var V3 = require("./Vector3.js");

  function Quaternion(x, y, z, w){
    return {x:x, y:y, z:z, w:w};
  };

  function multiply(a, b){
    // Adapted from three.js
    var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w,
        qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

    return {
      x :  qax * qbw + qay * qbz - qaz * qby + qaw * qbx,
      y : -qax * qbz + qay * qbw + qaz * qbx + qaw * qby,
      z :  qax * qby - qay * qbx + qaz * qbw + qaw * qbz,
      w : -qax * qbx - qay * qby - qaz * qbz + qaw * qbw};
  };

  function fromAxisAngle(axis, angle){
    // Adapted from three.js
    var halfAngle = angle / 2;
    var s = Math.sin(halfAngle);

    return {
      x : axis.x * s,
      y : axis.y * s,
      z : axis.z * s,
      w : Math.cos(halfAngle)};
  };

  function len(q){
    var x = q.x, y=q.y, z=q.z, w=q.w;
    return Math.sqrt(x*x + y*y + z*z + w*w);
  };

  function inverse(q){
    var l = len(q);
    return l === 0
      ? Quaternion(0, 0, 0, 1)
      : Quaternion(-q.x/l, -q.y/l, -q.z/l, q.w/l);
  };

  function conjugate(q){
    return Quaternion(-q.x, -q.y, -q.z, q.w);
  };

  function rotate(q, v){
    // Adapted from three.js
    var ix =  q.w * v.x + q.y * v.z - q.z * v.y;
    var iy =  q.w * v.y + q.z * v.x - q.x * v.z;
    var iz =  q.w * v.z + q.x * v.y - q.y * v.x;
    var iw = -q.x * v.x - q.y * v.y - q.z * v.z;
    return V3.Vector3(
        ix * q.w + iw * - q.x + iy * - q.z - iz * - q.y,
        iy * q.w + iw * - q.y + iz * - q.x - ix * - q.z,
        iz * q.w + iw * - q.z + ix * - q.y - iy * - q.x);
  };

  return {
    Quaternion: Quaternion,
    inverse: inverse,
    multiply: multiply,
    rotate: rotate,
    fromAxisAngle: fromAxisAngle};
})();
