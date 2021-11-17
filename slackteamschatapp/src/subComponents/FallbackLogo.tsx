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
import React from 'react';
import {Image, Text, View} from 'react-native';

export default function FallbackLogo(name: string) {
  // console.log('!', name);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 15,
      }}>
      {/* <Image
        source={{uri: $config.LOGO}}
        style={{
          height: '15%',
        }}
        resizeMode="contain"
      /> */}
      <View
        style={{
          width: 80,
          height: 80,
          backgroundColor: $config.PRIMARY_COLOR,
          alignSelf: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          shadowColor: $config.PRIMARY_COLOR,
          shadowRadius: 20,
        }}>
        <Text
          style={{
            color: $config.SECONDARY_FONT_COLOR,
            fontSize: 20,
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          {name ? name[0]?.toUpperCase() : 'U'}
        </Text>
      </View>
    </View>
  );
}
