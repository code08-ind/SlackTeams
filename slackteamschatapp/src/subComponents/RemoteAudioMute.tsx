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
import { gql, useMutation } from '@apollo/client';
import { useParams } from '../components/Router';

const MUTE_PSTN = gql`
mutation mutePSTN ($uid: Int!, $passphrase: String!, $mute: Boolean!) {
  mutePSTN (uid: $uid, passphrase: $passphrase, mute: $mute) {
      uid
      mute
  }
}
`;

/**
 * Component to mute / unmute remote audio.
 * Sends a control message to another user over RTM if the local user is a host.
 * If the local user is not a host, it simply renders an image
 */
const RemoteAudioMute = (props: {
  uid: number;
  audio: boolean;
  isHost: boolean;
}) => {
  const {primaryColor} = useContext(ColorContext);
  const {sendControlMessageToUid} = useContext(ChatContext);
  const [mutePSTN, {data, loading, error}] = useMutation(MUTE_PSTN);
  const {phrase} = useParams<{phrase: string}>();

  return props.isHost ? (
    <TouchableOpacity
      onPress={() => {
        if(String(props.uid)[0] === '1')
          mutePSTN({variables: {
            uid: props.uid, passphrase: phrase, mute: props.audio
          }})
        else sendControlMessageToUid(controlMessageEnum.muteAudio, props.uid);
      }}>
      <Image
        style={[style.buttonIconMic, {tintColor: primaryColor}]}
        source={{uri: props.audio ? icons.mic : icons.micOff}}
      />
    </TouchableOpacity>
  ) : (
    <View>
      <Image
        style={[style.buttonIconMic, {tintColor: primaryColor}]}
        source={{uri: props.audio ? icons.mic : icons.micOff}}
      />
    </View>
  );
};

const style = StyleSheet.create({
  buttonIconMic: {
    width: 25,
    height: 24,
    tintColor: $config.PRIMARY_COLOR,
  },
});

export default RemoteAudioMute;
