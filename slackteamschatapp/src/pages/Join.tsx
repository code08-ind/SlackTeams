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
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useHistory} from '../components/Router';
import SessionContext from '../components/SessionContext';
// import OpenInNativeButton from '../subComponents/OpenInNativeButton';
import Logo from '../subComponents/Logo';
import LogoutButton from '../subComponents/LogoutButton';
import ColorContext from '../components/ColorContext';
// import Illustration from '../subComponents/Illustration';
// import {secondaryBtn} from '../../theme.json';
import PrimaryButton from '../atoms/PrimaryButton';
import SecondaryButton from '../atoms/SecondaryButton';
import HorizontalRule from '../atoms/HorizontalRule';
import TextInput from '../atoms/TextInput';
import Error from '../subComponents/Error';
import shouldAuthenticate from '../utils/shouldAuthenticate';
// const joinFlag = 0;
interface joinProps {
  phrase: string;
  onChangePhrase: (text: string) => void;
}
const Join = (props: joinProps) => {
  const history = useHistory();
  const {primaryColor} = useContext(ColorContext);
  const {joinSession} = useContext(SessionContext);
  const [error, setError] =
    useState<null | {name: string; message: string}>(null);
  // const [dim, setDim] = useState([
  //   Dimensions.get('window').width,
  //   Dimensions.get('window').height,
  //   Dimensions.get('window').width > Dimensions.get('window').height,
  // ]);
  // let onLayout = (e: any) => {
  //   setDim([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  // };
  const createMeeting = () => {
    history.push('/create');
  };

  const phrase = props.phrase;
  const onChangePhrase = props.onChangePhrase;
  const startCall = async () => {
    joinSession({phrase});
  };
  // throw new Error("My first Sentry error!");
  return (
    // <ImageBackground
    //   // onLayout={onLayout}
    //   style={style.full}
    //   resizeMode={'cover'}>
    <View style={style.main}>
      {/* <KeyboardAvoidingView behavior={'height'} style={style.main}> */}
      <View style={style.nav}>
        <Logo />
        {error ? <Error error={error} /> : <></>}
        {/* <OpenInNativeButton /> */}
      </View>
      <View style={style.content}>
        <View style={style.leftContent}>
          <Text style={style.heading}>{$config.APP_NAME}</Text>
          <Text style={style.headline}>{$config.LANDING_SUB_HEADING}</Text>
          <View style={style.inputs}>
            <TextInput
              value={phrase}
              onChangeText={(text) => onChangePhrase(text)}
              onSubmitEditing={() => startCall()}
              placeholder="Enter Meeting ID"
            />
            <View style={{height: 10}} />
            <PrimaryButton
              disabled={phrase === ''}
              onPress={() => startCall()}
              text={'Enter Meeting'}
            />
            <HorizontalRule />
            <SecondaryButton
              onPress={() => createMeeting()}
              text={'Create a meeting'}
            />
            {shouldAuthenticate ? (
              <LogoutButton setError={setError} /> //setError not available in logout?
            ) : (
              <></>
            )}
          </View>
        </View>
        {/* {dim[0] > dim[1] + 150 ? (
            <View style={style.full}>
              <Illustration />
            </View>
          ) : (
            <></>
          )} */}
      </View>
      {/* </KeyboardAvoidingView> */}
    </View>
    // </ImageBackground>
  );
};

const style = StyleSheet.create({
  full: {flex: 1},
  illustration: {flex: 1, alignSelf: 'flex-end'},
  main: {
    flex: 2,
    justifyContent: 'space-evenly',
    marginHorizontal: '8%',
    marginVertical: '2%',
  },
  nav: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  content: {flex: 6, flexDirection: 'row'},
  leftContent: {
    width: '100%',
    minHeight: 300,
    flex: 1,
    justifyContent: 'space-evenly',
    marginBottom: '15%',
    marginTop: '8%',
    // marginRight: '5%',
    marginHorizontal: 'auto',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: $config.PRIMARY_FONT_COLOR,
    marginBottom: 20,
  },
  headline: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: $config.PRIMARY_FONT_COLOR,
    marginBottom: 20,
  },
  inputs: {
    flex: 1,
    width: '100%',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default Join;
