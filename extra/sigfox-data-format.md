# Understanding WeRadiate Catena data sent on Sigfox

<!-- TOC depthFrom:2 updateOnSave:true -->

- [Overall Message Format](#overall-message-format)
- [Data fields and associated fields](#data-fields-and-associated-fields)
	- [Message format & flags (field 0)](#message-format-and-flags-field-0)
	- [Battery Voltage (field 1)](#battery-voltage-field-1)
	- [Boot counter (field 2)](#boot-counter-field-2)
	- [Temperature (field 3)](#temperature-field-3)
- [Data Formats](#data-formats)
	- [uint16](#uint16)
	- [int16](#int16)
	- [uint8](#uint8)
- [Node-RED Decoding Script](#node-red-decoding-script)

<!-- /TOC -->

## Overall Message Format

WeRadiate use MCCI Catena 4612 to measure temperature from Compost sensor. The data from Catena are sent over Sigfox network.

Each message has the data.

## Data fields and associated fields

The data byte has the following interpretation. `int16`, `uint8` are defined after the table.

Offset | Length of corresponding field (bytes) | Data format |Description
:---:|:---:|:---:|:----
0 | 1 | [uint8](#uint8) | [Message format & flags](#message-format-and-flags-field-0)
1 | 2 | [int16](#int16) | [Battery voltage](#battery-voltage-field-1)
3 | 1 | [uint8](#uint8) | [Boot counter](#boot-counter-field-2)
4 | 2 | [int16](#int16) | [Temperature](#temperature-field-3)

### Message Format and Flags (field 0)

This byte allows for future expansion or changes in the data format. It is always `0x00`.  All other values are reserved for future use. The device shall transmit as zero; decoders shall check that the value is zero, and treat the message as unrecognized if any other value is received. Decoders should save unrecognized messages, because an unrecognized message probably means that the firmware has been updated but the decoder has not yet been updated, rather than meaning that a data communication error has occured. CRCs and what not provide protection against data corruption.

### Battery Voltage (field 1)

Field 0, if present, carries the current battery voltage. To get the voltage, extract the int16 value, and divide by 4096.0. (Thus, this field can represent values from -8.0 volts to 7.998 volts.)

### Boot counter (field 2)

Field 1, if present, is a counter of number of recorded system reboots, modulo 256.

### Temperature (field 3)

Field 2, if present, has two bytes are a [`int16`](#int16) representing the temperature (divide by 256 to get degrees Celsius).

## Data Formats

All multi-byte data is transmitted with the most significant byte first (big-endian format).  Comments on the individual formats follow.

### int16

a signed integer from -32,768 to 32,767, in two's complement form. (Thus 0..0x7FFF represent 0 to 32,767; 0x8000 to 0xFFFF represent -32,768 to -1).

### uint8

an integer from 0 to 255.

## Node-RED Decoding Script

A Node-RED script to decode this data is part of this repository. You can download the latest version from github:

- in raw form: https://gitlab-x.mcci.com/dhineshkumar/weradiate-thermosense/-/raw/master/extra/weradiate-sigfox-data-decoder.js
- or view it: https://gitlab-x.mcci.com/dhineshkumar/weradiate-thermosense/-/blob/master/extra/weradiate-sigfox-data-decoder.js
