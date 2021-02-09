// JavaScript source code
// This Node-RED decoding function decodes the record sent by the
// Sigfox network.
//
// 2021-02-05 created.

// an empty table to which we'll add result fields:
//
// result.vBat: the battery voltage
// result.boot: the system boot counter, modulo 256
// result.tWater: temperature of water in degrees C
// result.tSoil: soil temperature in degrees C
// result.rhSoil: relative humidity of soil(in %)
// result.tSoilDew: temperature dew of soil
var result = {};

function parseHexString(str) 
{ 
	var data = [];
	// Ignore any trailing single digit; I don't know what your needs
	// are for this case, so you may want to throw an error or convert
	// the lone digit depending on your needs.
	while (str.length >= 2) 
		{ 
		data.push(parseInt(str.substring(0, 2), 16));
		str = str.substring(2, str.length);
		}

	return data;
}

if(msg.payload_raw)
{
    var bytes;

    bytes = msg.payload_raw;
    var bytearray = parseHexString(bytes);

	var i = 0;
	
	var uFormat = bytearray[i];
	if(!(uFormat === 0x00))
	{
	    // not one of ours.
        node.error("not ours! " + uFormat.toString());
        return null;
	}
	
	i += 1;
	// set vRaw to a uint16, and increment pointer
	var vRaw = (bytearray[i] << 8) + bytearray[i + 1];
	i += 2;
	// interpret uint16 as an int16 instead.
	if (vRaw & 0x8000)
		vRaw += -0x10000;
	// scale and save in decoded.
	result.vBat = vRaw / 4096.0;

	var iBoot = bytearray[i];
	i += 1;
	result.boot = iBoot;

	// onewire temperature
	var tempRaw = (bytearray[i] << 8) + bytearray[i + 1];
	
	if (tempRaw & 0x8000)
		tempRaw = -0x10000 + tempRaw;
		
	result.tWater = tempRaw / 256;
}

// now update msg with the new payload and new .local field
// the old msg.payload is overwritten.
//msg.payload.vBat = result.vBat;
//msg.payload.boot = result.boot;
//msg.payload.tWater = result.tWater;
msg.payload = result
msg.local =
    {
        nodeType: "Catena 4612",
        platformType: "Catena 461x",
        radioType: "Murata",
        applicationName: "Compost sensor"
    };

return msg;