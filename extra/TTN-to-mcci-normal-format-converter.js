// move things around.
// since some TTN things are not portable,
// in future we might not want to use them.

var result = {};
var payload = msg.payload;


// save original data
result.network_payload = msg;

// app_id: TTN concept, not portable.
//  query a database to pick this up.
result.app_id = "app-id-" + payload.app_id;

// dev_id: TTN concept, not portable
//  use "device-*" notation, later query a
//  database to pick this up.
result.dev_id = payload.dev_id.startsWith("device-") ? payload.dev_id : "device-" + payload.dev_id;

// hardware_serial: TTN name; we ought to use DevEUI.
result.hardware_serial = payload.hardware_serial;

// port: this is the uplink port.
result.port = parseInt(payload.port);

// counter: this is FCntUp
result.counter = parseInt(payload.counter);

result.payload = payload.payload_raw;

// metadata
var metadata = {};
result.metadata = metadata;
metadata.network = "TTN";
metadata.time = new Date(payload.Time);
// this might be FSK, but..
metadata.modulation = "LORA";
// this might be BW250 but...
metadata.data_rate =  payload.metadata.data_rate;
metadata.coding_rate = payload.metadata.coding_rate;

//  database to pick frequency as actility do not provide.
metadata.frequency = payload.metadata.frequency;
metadata.gateways = [];
metadata.gateways[0] = {};
metadata.gateways[0].gtw_id = payload.metadata.gateways[0].gtw_id;
metadata.gateways[0].rssi = payload.metadata.gateways[0].rssi;
metadata.gateways[0].snr = payload.metadata.gateways[0].snr;
metadata.gateways[0].rf_chain = payload.metadata.gateways[0].rf_chain;
// this is wrong, but looks like data is region-specific
metadata.gateways[0].channel = payload.metadata.gateways[0].channel;
metadata.gateways[0].latitude = payload.metadata.gateways[0].latitude;
metadata.gateways[0].longitude =payload.metadata.gateways[0].longitude;

return result;