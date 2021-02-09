// JavaScript source code
// This Node-RED decoding function translates Sigfox-specific
// parameters into MCCI code-specific parameters (MCCI normal form)
//
// 2021-02-05 created.

var result = {};
var payload = msg.payload;

// frequency
var frequency = "unknown";

// save original data
result.network_payload = msg.payload;

result.app_id = payload.deviceTypeId;

//  use "device-*" notation, later query a
//  database to pick this up.
result.dev_id = "device-" + payload.device;

// hardware_serial: we ought to use the parameter with DevEUI.
result.hardware_serial = "unknown";

// port: this is the uplink port.
result.port = "unknown";

// counter:
result.counter = parseInt(payload.seqNumber);

result.payload_raw = payload.data;

// metadata
var metadata = {};
result.metadata = metadata;
metadata.network = "Sigfox";
metadata.time = new Date(payload.time);
metadata.frequency = frequency;
metadata.data_rate =  "unknown";
metadata.coding_rate = "unknown";
metadata.frequency = "unknown";
metadata.gateways = [];
metadata.gateways[0] = {};
metadata.gateways[0].gtw_id = payload.station;
metadata.gateways[0].rssi = parseFloat(payload.rssi);
metadata.gateways[0].snr = parseFloat(payload.snr);
metadata.gateways[0].rf_chain = "unknown";
metadata.gateways[0].channel = "unknown";
return result;
