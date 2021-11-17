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
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
import MaxUidContext from '../../agora-rn-uikit/src/MaxUidContext';
import {MaxVideoView} from '../../agora-rn-uikit/Components';
import {
  LocalAudioMute,
  LocalVideoMute,
  SwitchCamera,
} from '../../agora-rn-uikit/Components';
import LocalUserContext from '../../agora-rn-uikit/src/LocalUserContext';
import RtcContext from '../../agora-rn-uikit/src/RtcContext';
// import ColorContext from './ColorContext';
import TextInput from '../atoms/TextInput';
import Error from '../subComponents/Error';
import PrimaryButton from '../atoms/PrimaryButton';

const Precall = (props: any) => {
  // const {primaryColor} = useContext(ColorContext);
  const maxUsers = useContext(MaxUidContext);
  const rtc = useContext(RtcContext);
  rtc.RtcEngine.startPreview();
  const {setCallActive, queryComplete, username, setUsername, error} = props;
  return (
    // <ImageBackground
    //   style={style.full}
    //   resizeMode={'cover'}>
    <View style={style.full}>
      <View style={style.heading}>
        <Text style={style.headingText}>Precall </Text>
      </View>
      <View style={{zIndex: 50, position: 'absolute', width: '100%', left: '18%', top: 10, alignSelf: 'center'}}>
        {error ? <Error error={error} showBack={true} /> : <></>}
      </View>
      <View style={style.full}>
        <MaxVideoView user={maxUsers[0]} key={maxUsers[0].uid} />
      </View>
      {Platform.OS === 'ios' ? (
        <View 
          style={style.textInputHolder}>
          <TextInput
            value={username}
            onChangeText={(text) => {
              if (username !== 'Getting name...') {
                setUsername(text);
              }
            }}
            onSubmitEditing={() => {}}
            placeholder="Display Name"
          />
        </View>
      ) : (
        <View style={style.textInputHolder}>
          <TextInput
            value={username}
            onChangeText={(text) => {
              if (username !== 'Getting name...') {
                setUsername(text);
              }
            }}
            onSubmitEditing={() => {}}
            placeholder="Display Name"
          />
        </View>
      )}
      <View style={{height: 20}} />
      <View style={style.controls}>
        <LocalUserContext>
          <LocalVideoMute />
          <View style={style.width50} />
          <LocalAudioMute />
          <View style={style.width50} />
          <SwitchCamera />
        </LocalUserContext>
      </View>
      <View
        // onPress={() => setCallActive(true)}
        // disabled={!queryComplete}
        style={{marginBottom: 50}}>
        {/* <Text style={style.buttonText}> */}
          {/* {queryComplete ? 'Join Room' : 'Loading...'} */}
        {/* </Text> */}
      {/* </TouchableOpacity> */}
      <PrimaryButton text={"Join Room"} disabled={!queryComplete} onPress={() => setCallActive(true)} />
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

const style = StyleSheet.create({
  full: {flex: 1},
  heading: {flex: 0.1, justifyContent: 'center'},
  headingText: {
    fontSize: 24,
    color: $config.PRIMARY_FONT_COLOR,
    fontWeight: '700',
    alignSelf: 'center',
  },
  textInputHolder: {
    flex: 0.1,
    alignSelf: 'center',
    paddingTop: 20,
    width: '100%',
  },
  textInput: {
    width: '80%',
    paddingLeft: 8,
    borderColor: $config.PRIMARY_COLOR,
    borderWidth: 2,
    color: $config.PRIMARY_FONT_COLOR,
    fontSize: 16,
    // marginBottom: 15,
    // maxWidth: 400,
    minHeight: 45,
    alignSelf: 'center',
  },
  controls: {flex: 0.2, flexDirection: 'row', alignSelf: 'center', padding: 5},
  width50: {width: 50},
  buttonActive: {
    backgroundColor: $config.PRIMARY_COLOR,
    height: 50,
    width: 180,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  buttonDisabled: {
    backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
    height: 50,
    width: 180,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  buttonText: {
    width: '100%',
    height: 45,
    lineHeight: 45,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: $config.SECONDARY_FONT_COLOR,
  },
});

export default Precall;
