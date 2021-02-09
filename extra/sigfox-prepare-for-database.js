var result =
{
    payload:
[{
        msgID: msg._msgid,
        counter: msg.counter,
        // time: new Date(msg.metadata.time).getTime(),
},
{
    devEUI: msg.hardware_serial,
    devID: msg.dev_id,
    // displayName: msg.display_id,
    // displayKey: msg.display_key,
    nodeType: msg.local.nodeType,
    platformType: msg.local.platformType,
    radioType: msg.local.radioType,
    applicationName: msg.local.applicationName,
}]
};

var t = result.payload[0];
var tags = result.payload[1];

// copy the fields we want as values to the database slot 0.
var value_keys = [ 
            "vBat", "vBus", "vSys", "boot", "tempC", "tDewC", "tWater", "tHeatIndexF", "TVOC", "p", "p0", "rh", "pm", "dust", "aqi", "aqi_partial"
            ];

// copy the fields we want as tags to the database slot 1
var tag_keys = [
    /* none */
    ];

function insert_value(pOutput, sInKey, inValue)
    {
    if (typeof inValue == "object" )
        {
        for (var i in inValue)
            insert_value(pOutput, sInKey + "." + i, inValue[i]);
        }
    else
        pOutput[sInKey] = inValue;
    }

for (var i in value_keys)
    {
    var key = value_keys[i];
    if (key in msg.payload)
        {
        // if we get an object generate an entry for each
        insert_value(t, key, msg.payload[key]);
        }
    }

for (var i in tag_keys)
    {
    var key = tag_keys[i];
    if (key in msg.payload)
        tags[key] = msg.payload[key];
    }

return result;
