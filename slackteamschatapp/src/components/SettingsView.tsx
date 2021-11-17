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
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import SelectDevice from '../subComponents/SelectDevice';
import HostControlView from './HostControlView';
import ColorContext from './ColorContext';
import {SidePanelType} from '../subComponents/SidePanelEnum';

const SettingsView = (props: any) => {
  const {isHost} = props;
  return (
    <View
      style={
        Platform.OS === 'web' ? style.settingsView : style.settingsViewNative
      }>
      <View style={style.main}>
        <Text style={style.heading}>Select Input Device</Text>
        <View style={style.popupPickerHolder}>
          <SelectDevice />
        </View>
        {isHost ? <HostControlView /> : <></>}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    paddingVertical: 5,
    flexGrow: 1,
    shadowColor: $config.PRIMARY_FONT_COLOR + '80',
    shadowOpacity: .5,
    shadowOffset: {width:-2, height: 0},
    shadowRadius: 3,
    paddingHorizontal: 20,
  },
  popupPickerHolder: {
    // height: '40%',
    justifyContent: 'space-around',
    // paddingHorizontal: '8%',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: $config.PRIMARY_FONT_COLOR,
    // marginBottom: 20,
    alignSelf: 'center',
  },
  settingsView: {
    width: '20%',
    minWidth: 200,
    maxWidth: 300,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    flex: 1,
  },
  settingsViewNative: {
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    height: '100%',
    right: 0,
    top: 0,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
  },
});

export default SettingsView;
