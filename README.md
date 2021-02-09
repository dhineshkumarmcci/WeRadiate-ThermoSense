# weradiate-thermosense
<!-- TOC depthFrom:2 updateOnSave:true -->

- [Introduction](#introduction)
- [Getting Started](#getting-started)
    - [Clone this repository into a suitable directory on your system](#clone-this-repository-into-a-suitable-directory-on-your-system)
    - [Install the MCCI STM32 board support library](#install-the-mcci-stm32-board-support-library)
    - [Set the identity of your Catena 4612](#set-the-identity-of-your-catena-4612)
    - [Select your desired band](#select-your-desired-band)
    - [Installing the required libraries](#installing-the-required-libraries)
        - [List of required libraries](#list-of-required-libraries)
    - [Build and Download](#build-and-download)
    - [Load the sketch into the Catena](#load-the-sketch-into-the-catena)
- [Notes](#notes)
    - [Setting up DFU on a Linux or Windows PC](#setting-up-dfu-on-a-linux-or-windows-pc)

<!-- /TOC -->
## Introduction

This repository is for WeRadiate Thermosense application using Catena 4612, sending data over Sigfox network.
The Catena 4612 is a single-board IoT-enabled sensor device attached with Compost sensor

## Getting Started

In order to use this code, you must do several things:

1. Clone this repository into a suitable directory on your system.
2. Install the MCCI Arduino board support package (BSP).
3. Install the required Arduino libraries using `git`.
4. Build the sketch and download to your Catena 4612.

After you have loaded the firmware, you have to set up the Catena 4612.

This sketch uses the Catena-Arduino-Platform library to store critical information on the integrated FRAM. There are several kinds of information. Entering this information this involves entering USB commands via the Arduino serial monitor.

- We call information about the 4612 that (theoretically) never changes "identity".
- We call information about the Sigfox "configuring".

### Clone this repository into a suitable directory on your system

This is best done from a command line. You can use a number of techniques, but since you'll need a working git shell, we recommend using the command line.

On Windows, we strongly recommend use of "git bash", available from [git-scm.org](https://git-scm.com/download/win). Then use the "git bash" command line system that's installed by the download.

The goal of this process is to create a directory called `{somewhere}/weradiate-thermosense`. You get to choose `{somewhere}`. Everyone has their own convention; the author typically has a directory in his home directory called `sandbox`, and then puts projects there.

Once you have a suitable command line open, you can enter the following commands. In the following, change `{somewhere}` to the directory path where you want to put `weradiate-thermosense`.

```console
$ cd {somewhere}
$ git clone https://github.com/ezraundag/weradiate-thermosense.git
Cloning into 'weradiate-thermosense'...
...

$ # get to the right subdirectory
$ cd weradiate-thermosense

$ # confirm that you're in the right place.
$ ls
extra/  git-boot.sh*  git-repos.dat  README.md  WeRadiate-ThermoSense.ino
```

### Install the MCCI STM32 board support library

Open the Arduino IDE. Go to `File>Preferences>Settings`. Add `https://github.com/mcci-catena/arduino-boards/raw/master/BoardManagerFiles/package_mcci_index.json` to the list in `Additional Boards Manager URLs`.

If you already have entries in that list, use a comma (`,`) to separate the entry you're adding from the entries that are already there.

Next, open the board manager. `Tools>Board:...`, and get up to the top of the menu that pops out -- it will give you a list of boards. Search for `MCCI` in the search box and select `MCCI Catena STM32 Boards`. An `[Install]` button will appear to the right; click it.

Then go to `Tools>Board:...` and scroll to the bottom. You should see `MCCI Catena 4612`; select that.

## Set the identity of your Catena 4612

The identity for device are `DeviceId`, `PAC`, and `Key`.
Identity for device can be done by using the API(constructor) `MCCI_Sigfox Sigfox()` in the application sketch during build. Configure the identity in application sketch as following:

```MCCI_Sigfox Sigfox( "<DeviceId>", "<PAC>", "<Key>", REGION_RC2, 0x8080008, false);```

### Select your build options

When you select a board, you can select the desired System clock.
WIth current developemt of Catena-Sigfox, the default region is set to US-915 (`REGION_RC2`), which is used in North America and much of South America. If you're elsewhere, you need to change your target region. You can do it by editing in following constructor call from the application Sketch.

```MCCI_Sigfox Sigfox( "<DeviceId>", "<PAC>", "<Key>", <Region>, 0x8080008, false);```

The list of Region definition and their band are listed below:
```
REGION_RC1 - LORAWAN_REGION_EU868
REGION_RC2 - LORAWAN_REGION_US915
REGION_RC3 - LPWAN_REGION_JP923
REGION_RC4 - LPWAN_REGION_AU915
REGION_RC5 - LPWAN_REGION_KR920
```

### Installing the required libraries

This sketch uses several sensor libraries.

The script `git-boot.sh` in the top directory of this repo will get all the things you need.

It's easy to run, provided you're on Windows, macOS, or Linux, and provided you have `git` installed. We tested on Windows with git bash from https://git-scm.org, on macOS 10.11.3 with the git and bash shipped by Apple, and on Ubuntu 16.0.4 LTS (64-bit) with the built-in bash and git from `apt-get install git`.

```console
$ $ ./git-boot.sh
Cloning into 'Adafruit_BME280_Library'...
remote: Enumerating objects: 134, done.
remote: Total 134 (delta 0), reused 0 (delta 0), pack-reused 134
Receiving objects: 100% (134/134), 39.31 KiB | 263.00 KiB/s, done.
Resolving deltas: 100% (68/68), done.
...
...
...
Cloning into 'MCCI_Sigfox_Image'...
remote: Enumerating objects: 322, done.
remote: Counting objects: 100% (322/322), done.
remote: Compressing objects: 100% (200/200), done.
Receiving objects:  75% (242/322)remote: Total 322 (delta 163), reused 260 (delta 101), pack-reused 0
Receiving objects: 100% (322/322), 248.97 KiB | 372.00 KiB/s, done.
Resolving deltas: 100% (163/163), done.

==== Summary =====
*** No repos with errors ***

*** No existing repos skipped ***

*** No existing repos were updated ***

New repos cloned:
Adafruit_BME280_Library                 Catena-Arduino-Platform                 MCCI_Sigfox_Image
Adafruit_Sensor                         Catena-mcciadk                          OneWire
Arduino-Temperature-Control-Library     MCCI_FRAM_I2C
```

The `git-boot.sh` script has a number of advanced options. Use `git-boot.sh -h` to get help.

**Beware of issue #18**.  If you happen to already have libraries installed with the same names as any of the libraries in `git-repos.dat`, `git-boot.sh` will silently use the versions of the library that you already have installed. (We hope to soon fix this to at least tell you that you have a problem.)

#### List of required libraries

This sketch depends on the following libraries.

*  https://github.com/mcci-catena/Adafruit_BME280_Library
*  https://github.com/mcci-catena/Catena-Arduino-Platform
*  https://github.com/mcci-catena/Catena-mcciadk
*  https://github.com/mcci-catena/MCCI_Sigfox_Image
*  https://github.com/mcci-catena/MCCI_FRAM_I2C
*  https://github.com/mcci-catena/Adafruit_Sensor
*  https://github.com/mcci-catena/Arduino-Temperature-Control-Library
*  https://github.com/mcci-catena/OneWire

With current version of BSP, we suggest you to follow [BUILD_NOTE.md](https://github.com/mcci-catena/MCCI_Sigfox_Image/blob/master/BUILD_NOTE.md) from Sigfox library.

### Build and Download

Shutdown the Arduino IDE and restart it, just in case.

Ensure selected board is 'MCCI Catena 4612' (in the GUI, check that `Tools`>`Board "..."` says `"MCCI Catena 4612"`.

Open the application sketch `weradiate-thermosense.ino` in Arduino IDE.

Follow normal Arduino IDE procedures to build the sketch: `Sketch`>`Verify/Compile`. If there are no errors, go to the next step.

### Load the sketch into the Catena

Make sure the correct port is selected in `Tools`>`Port`.

Load the sketch into the Catena using `Sketch`>`Upload`.

## Notes

### Setting up DFU on a Linux or Windows PC

Early versions of the MCCI BSP do not include an INF file (Windows) or sample rules (Linux) to teach your system what to do. The procedures posted here show how to set things up manually: https://github.com/vpowar/LoRaWAN_SensorNetworks-Catena#uploading-code.

You may also refer to the detailed procedures that are part of the Catena 4612 user manual. Please see:

- [Catena 4612 User Manual](https://github.com/mcci-catena/HW-Designs/blob/master/Boards/Catena-4611_4612/234001173a_(Catena-4612-User-Manual).pdf).
