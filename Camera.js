module.exports = (function(){
  var V3 = require("./Vector3.js");
  var Qt = require("./Quaternion.js");
  var V3_ = V3.Vector3;

  function Camera(pos, rot){
    return {
      pos: pos,  // :: Vector3
      rot: rot}; // :: Quaternion
  };

  function axis(cam){
    return V3_(
      Qt.rotate(cam.rot, V3_(1, 0, 0)),  // right
      Qt.rotate(cam.rot, V3_(0, 1, 0)),  // front
      Qt.rotate(cam.rot, V3_(0, 0, 1))); // up
  };

  // Vector3, Camera -> Vector3 (-1.0 to 1.0)
  function orthoProj_(pos, cam){
    var vec = V3.sub(pos, cam.pos);
    var camAxis = axis(cam);
    var normDist = V3.dot(vec, camAxis.y);
    var normProj = V3.scale(normDist, camAxis.y);
    var posOnPlane = V3.add(vec, V3_(-normProj.x, -normProj.y, -normProj.z));
    var x = V3.dot(posOnPlane, camAxis.x);
    var y = V3.dot(posOnPlane, camAxis.z);
    return V3_(x, y, normDist);
  };

  // Same as above, but fully inlined manually
  // https://gist.github.com/MaiaVictor/6d4b15a496df7c281a0dffef6923d433
  // Vector3, Camera -> Vector3 (-1.0 to 1.0)
  function orthoProj(pos, cam){
    var cp = cam.pos;
    var vx = pos.x - cp.x;
    var vy = pos.y - cp.y;
    var vz = pos.z - cp.z;
    var cr = cam.rot;
    var crx = cr.x;
    var cry = cr.y;
    var crz = cr.z;
    var crw = cr.w;
    var caxx = crw * crw - crx * -crx + crz * - crz + cry * - cry;
    var caxy = crz * crw - crx * -cry - cry * - crx - crw * - crz;
    var caxz = -cry * crw - crx * -crz + crw * - cry - crz * - crx;
    var cayx = -crz * crw - cry * -crx + crw * - crz - crx * - cry;
    var cayy = crw * crw - cry * -cry + crx * - crx + crz * - crz;
    var cayz = crx * crw - cry * -crz - crz * - cry - crw * - crx;
    var cazx = cry * crw - crz * -crx - crx * - crz - crw * - cry;
    var cazy = -crx * crw - crz * -cry + crw * - crx - cry * - crz;
    var cazz = crw * crw - crz * -crz + cry * - cry + crx * - crx;
    var nd = vx * cayx + vy * cayy + vz * cayz;
    var nx = nd * cayx;
    var ny = nd * cayy;
    var nz = nd * cayz;
    var ppx = vx - nx;
    var ppy = vy - ny;
    var ppz = vz - nz;
    var x = ppx * caxx + ppy * caxy + ppz * caxz;
    var y = ppx * cazx + ppy * cazy + ppz * cazz;
    return V3(x, y, nd);
  };

  function tibiaProj(pos, cam){
    var vec = V3.sub(pos, cam.pos); 
    return V3_(vec.x-vec.z*0.7, vec.y-vec.z*0.7, vec.z);
  };

  // Vector3, Camera -> Vector3 (-1.0 to 1.0)
  //function perspProj(pos, cam){
    //var vec = V3.sub(pos, cam.pos);
    //var camAxis = axis(cam);
    //var normProj = V3.scale(V3.dot(vec, camAxis.y), camAxis.y);
    //var posOnPlane = V3.add(vec, V3_(-normProj.x, -normProj.y, -normProj.z));
    //var x = V3.dot(posOnPlane, camAxis.x);
    //var y = V3.dot(posOnPlane, camAxis.z);
    //return V3_(x, y, 0);
  //};

  // type Sign = -1 | 0 | 1
  // type MovePad = { x : Sign, y : Sign, z : Sign } // right, forward, up
  // type RotPad = { x : Sign, y : Sign, z : Sign } // yaw, pitch, roll
  // Camera, MovePad, RotPad -> Camera
  function fly(cam, rotPad, movePad){
    var xRot = Qt.fromAxisAngle(V3_(1, 0, 0), rotPad.x);
    var yRot = Qt.fromAxisAngle(V3_(0, 1, 0), rotPad.y);
    var zRot = Qt.fromAxisAngle(V3_(0, 0, 1), rotPad.z);
    var camX = Qt.rotate(cam.rot, V3_(1, 0, 0));
    var camY = Qt.rotate(cam.rot, V3_(0, 1, 0));
    var camZ = Qt.rotate(cam.rot, V3_(0, 0, 1));
    return Camera(
      V3.add(V3.add(V3.add(
        cam.pos,
        V3.scale(movePad.x, camX)),
        V3.scale(movePad.y, camY)),
        V3.scale(movePad.z, camZ)),
      Qt.multiply(Qt.multiply(Qt.multiply(
        cam.rot,
        xRot), yRot), zRot));
  };

  return {
    Camera: Camera,
    orthoProj: orthoProj,
    tibiaProj: tibiaProj,
    axis: axis,
    fly: fly};
})();
