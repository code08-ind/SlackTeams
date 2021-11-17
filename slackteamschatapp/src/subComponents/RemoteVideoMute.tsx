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
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import ChatContext, {controlMessageEnum} from '../components/ChatContext';
import icons from '../assets/icons';
import ColorContext from '../components/ColorContext';

/**
 * Component to mute / unmute remote video.
 * Sends a control message to another user over RTM if the local user is a host.
 * If the local user is not a host, it simply renders an image
 */
const RemoteVideoMute = (props: {
  uid: number;
  video: boolean;
  isHost: boolean;
}) => {
  const {primaryColor} = useContext(ColorContext);
  const {sendControlMessageToUid} = useContext(ChatContext);
  return String(props.uid)[0] !== '1'
    ? props.isHost
      ? (
        <TouchableOpacity
          onPress={() => {
            sendControlMessageToUid(controlMessageEnum.muteVideo, props.uid);
          }}>
          <Image
            style={[style.buttonIconCam, {tintColor: primaryColor}]}
            source={{uri: props.video ? icons.videocam : icons.videocamOff}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ) : (
        <View>
          <Image
            style={[style.buttonIconCam, {tintColor: primaryColor}]}
            source={{uri: props.video ? icons.videocam : icons.videocamOff}}
            resizeMode={'contain'}
          />
        </View>
      )
    :
    (<></>);
};

const style = StyleSheet.create({
  buttonIconCam: {
    width: 28,
    height: 25,
    marginHorizontal: 2,
    tintColor: $config.PRIMARY_COLOR,
  },
});

export default RemoteVideoMute;
