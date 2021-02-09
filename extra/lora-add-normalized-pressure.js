//
// calculate sealevel pressure given altitude of sensor and station
// pressure.
//
var h = 305; // meters
if ("p" in msg.payload)
    {
    var p = msg.payload.p;
    var L = -0.0065;
    var Tb = 288.15;
    var ep = -5.2561;
    
    var p0 = p * Math.pow(1 + (L * h)/Tb, ep);
    msg.payload.p0 = p0;
    }
return msg;
