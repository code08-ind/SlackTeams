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
import {View, TouchableOpacity, Text, Platform, StyleSheet} from 'react-native';
import ColorContext from '../components/ColorContext';

/**
 * A component to open the meeting using a native application.
 * This component will be rendered only on web
 * WIP. Need to implement deeplinks on native apps.
 */
const OpenInNativeButton = () => {
  const {primaryColor} = useContext(ColorContext);
  const openInNative = () => {};

  return Platform.OS === 'web' ? (
    <View style={{position: 'absolute', right: 0}}>
      <TouchableOpacity
        style={[style.btn, {borderColor: primaryColor}]}
        onPress={() => openInNative()}>
        <Text style={[style.btnText, {color: '#fff'}]}>Open in Desktop</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <></>
  );
};

const style = StyleSheet.create({
  btn: {
    backgroundColor: $config.PRIMARY_COLOR,
    // width: 110,
    flex: 1,
    paddingHorizontal: 10,
    height: 30,
    // borderWidth: 1,
    // borderColor: $config.PRIMARY_COLOR,
    borderRadius: 100,
    // marginTop: 5,
    // marginRight: 10,
  },
  btnText: {
    fontSize: 12,
    lineHeight: 29,
    // fontWeight: '500',
    textAlign: 'center',
    color: $config.SECONDARY_FONT_COLOR,
  },
});

export default OpenInNativeButton;
