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
import React, {useContext, useEffect} from 'react';
import {Image, TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import icons from '../assets/icons';
import ChatContext, {controlMessageEnum} from '../components/ChatContext';
import ColorContext from '../components/ColorContext';
import {gql, useMutation} from '@apollo/client';
import {useParams} from '../components/Router';
import PropsContext from '../../agora-rn-uikit/src/PropsContext';
import Toast from '../../react-native-toast-message';

const START_RECORDING = gql`
  mutation startRecordingSession($passphrase: String!, $secret: String) {
    startRecordingSession(passphrase: $passphrase, secret: $secret)
  }
`;

const STOP_RECORDING = gql`
  mutation stopRecordingSession($passphrase: String!) {
    stopRecordingSession(passphrase: $passphrase)
  }
`;

/**
 * Component to start / stop Agora cloud recording.
 * Sends a control message to all users in the channel over RTM to indicate that
 * Cloud recording has started/stopped.
 */
const Recording = (props: any) => {
  const {rtcProps} = useContext(PropsContext);
  const {primaryColor} = useContext(ColorContext);
  const setRecordingActive = props.setRecordingActive;
  const recordingActive = props.recordingActive;
  const {phrase} = useParams();
  const [startRecordingQuery] = useMutation(START_RECORDING);
  const [stopRecordingQuery] = useMutation(STOP_RECORDING);
  const {sendControlMessage} = useContext(ChatContext);

  useEffect(()=>{
    if(recordingActive)
      Toast.show({text1: 'Recording Started', visibilityTime: 1000})
    // else if(!recordingActive)
      // Toast.show({text1: 'Recording Finished', visibilityTime: 1000})
  },[recordingActive])

  return (
    <TouchableOpacity
      onPress={() => {
        if (!recordingActive) {
          // If recording is not going on, start the recording by executing the graphql query
          startRecordingQuery({
            variables: {
              passphrase: phrase,
              secret:
                rtcProps.encryption && rtcProps.encryption.key
                  ? rtcProps.encryption.key
                  : '',
            },
          })
            .then((res) => {
              console.log(res.data);
              if (res.data.startRecordingSession === 'success') {
                // Once the backend sucessfuly starts recording,
                // send a control message to everbody in the channel indicating that cloud recording is now active.
                sendControlMessage(controlMessageEnum.cloudRecordingActive);
                // set the local recording state to true to update the UI
                setRecordingActive(true);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // If recording is already going on, stop the recording by executing the graphql query.
          stopRecordingQuery({variables: {passphrase: phrase}})
            .then((res) => {
              console.log(res.data);
              if (res.data.stopRecordingSession === 'success') {
                // Once the backend sucessfuly stops recording,
                // send a control message to everbody in the channel indicating that cloud recording is now inactive.
                sendControlMessage(controlMessageEnum.cloudRecordingUnactive);
                // set the local recording state to false to update the UI
                setRecordingActive(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }}>
      <View style={[style.localButton, { borderColor: primaryColor }]}>
        <Image
          source={{
            uri: recordingActive
              ? icons.recordingActiveIcon
              : icons.recordingIcon,
          }}
          style={[style.buttonIcon, { tintColor: recordingActive ? '#FD0845' : primaryColor }]}
          resizeMode={'contain'}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 5,
          color: recordingActive ? '#FD0845' : $config.PRIMARY_COLOR,
        }}>
        {recordingActive ? 'Recording' : 'Record'}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  localButton: {
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    borderRadius: 23,
    borderColor: $config.PRIMARY_COLOR,
    borderWidth: 0,
    width: 40,
    height: 40,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: '100%',
    height: '100%',
    tintColor: $config.PRIMARY_COLOR,
  },
});

export default Recording;
