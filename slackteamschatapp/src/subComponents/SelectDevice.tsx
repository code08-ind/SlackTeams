/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
import React, {useContext} from 'react';
import {Picker, StyleSheet} from 'react-native';
import DeviceContext from '../components/DeviceContext';
import ColorContext from '../components/ColorContext';
// import {dropdown} from '../../theme.json';
/**
 * A component to diplay a dropdown and select a device.
 * It will add the selected device to the device context.
 */
const SelectDevice = () => {
  const {primaryColor} = useContext(ColorContext);
  const {selectedCam, setSelectedCam, selectedMic, setSelectedMic, deviceList} =
    useContext(DeviceContext);

  return (
    <>
      <Picker
        selectedValue={selectedCam}
        style={[{borderColor: primaryColor}, style.popupPicker]}
        onValueChange={(itemValue) => setSelectedCam(itemValue)}>
        {deviceList.map((device: any) => {
          if (device.kind === 'videoinput') {
            return (
              <Picker.Item
                label={device.label}
                value={device.deviceId}
                key={device.deviceId}
              />
            );
          }
        })}
      </Picker>
      <Picker
        selectedValue={selectedMic}
        style={[{borderColor: primaryColor}, style.popupPicker]}
        onValueChange={(itemValue) => setSelectedMic(itemValue)}>
        {deviceList.map((device: any) => {
          if (device.kind === 'audioinput') {
            return (
              <Picker.Item
                label={device.label}
                value={device.deviceId}
                key={device.deviceId}
              />
            );
          }
        })}
      </Picker>
    </>
  );
};

const style = StyleSheet.create({
  popupPicker: {
    height: 30,
    marginBottom: 10,
    borderRadius: 50,
    paddingHorizontal: 15,
    fontSize: 15,
    minHeight: 35,
  },
});

export default SelectDevice;
