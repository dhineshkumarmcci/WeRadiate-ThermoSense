function findBestGateway(g) {
    var rssi = -1000;
    var bestRssi;
    var snr = -1000;
    var bestSnr;

    for (var i in g) {
        if (g[i].rssi > rssi) {
            rssi = g[i].rssi;
            bestRssi = i;
        }
        if (g[i].snr > snr) {
            snr = g[i].snr;
            bestSnr = i;
        }
    }
    
    if (bestRssi == bestSnr)
        return g[bestRssi];
        
    if (rssi < -80)
        return g[bestSnr];
    else
        return g[bestRssi];
}

var g = findBestGateway(msg.metadata.gateways);

var result = 
{
    payload:
[{
    datarate: msg.metadata.data_rate,
    codingrate: msg.metadata.coding_rate,
    rssi: g.rssi,
    snr: g.snr,
    msgID: msg._msgid,
    counter: msg.counter,
},
{
    devEUI: msg.hardware_serial,
    devID: msg.dev_id,
    gatewayEUI: msg.metadata.gateways[0].gtw_id,
    nodeType: msg.local.nodeType,
    platformType: msg.local.platformType,
    radioType: msg.local.radioType,
    applicationName: msg.local.applicationName,
    // we make these tags so we can plot rssi by 
    // channel, etc.
    datarate: msg.metadata.data_rate,
    codingrate: msg.metadata.coding_rate,
}]
};
return result;