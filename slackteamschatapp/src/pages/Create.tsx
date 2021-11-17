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
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useHistory} from '../components/Router';
import Checkbox from '../subComponents/Checkbox';
import {gql, useMutation} from '@apollo/client';
import Logo from '../subComponents/Logo';
// import OpenInNativeButton from '../subComponents/OpenInNativeButton';
import Share from '../components/Share';
// import ColorContext from '../components/ColorContext';
// import Illustration from '../subComponents/Illustration';
// import {textInput} from '../../theme.json';
import PrimaryButton from '../atoms/PrimaryButton';
import SecondaryButton from '../atoms/SecondaryButton';
import HorizontalRule from '../atoms/HorizontalRule';
import TextInput from '../atoms/TextInput';
import Error from '../subComponents/Error';
import Toast from '../../react-native-toast-message';

type PasswordInput = {
  host: string;
  view: string;
};

const CREATE_CHANNEL = gql`
  mutation CreateChannel($title: String!, $backendURL: String!, $enablePSTN: Boolean) {
    createChannel(title: $title, backendURL: $backendURL, enablePSTN: $enablePSTN) {
      passphrase {
        host
        view
      }
      channel
      title
      pstn {
        number
        dtmf
      }
    }
  }
`;

const Create = () => {
  // const {primaryColor} = useContext(ColorContext);
  const history = useHistory();
  const [roomTitle, onChangeRoomTitle] = useState('');
  const [pstnCheckbox, setPstnCheckbox] = useState(false);
  const [hostControlCheckbox, setHostControlCheckbox] = useState(true);
  const [urlView, setUrlView] = useState(null);
  const [urlHost, setUrlHost] = useState(null);
  const [pstn, setPstn] = useState(null);
  const [roomCreated, setRoomCreated] = useState(false);
  const [joinPhrase, setJoinPhrase] = useState(null);
  const [createChannel, {data, loading, error}] = useMutation(CREATE_CHANNEL);

  console.log('mutation data', data);

  const createRoom = () => {
    if (roomTitle !== '') {
      console.log('Create room invoked');
      createChannel({
        variables: {
          title: roomTitle,
          backendURL: $config.BACKEND_ENDPOINT,
          enablePSTN: pstnCheckbox,
        },
      })
        .then((res: any) => {
          Toast.show({
            text1: 'Created: ' + roomTitle,
            visibilityTime: 1000,
          });
          console.log('promise data', res);
          setUrlView(res.data.createChannel.passphrase.view);
          setUrlHost(res.data.createChannel.passphrase.host);
          setPstn(res.data.createChannel.pstn);
          setJoinPhrase(res.data.createChannel.passphrase.host);
          setRoomCreated(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  let onLayout = (e: any) => {
    setDim([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };

  return (
    // <ImageBackground
    //   style={style.full}
    //   resizeMode={'cover'}>
    // <KeyboardAvoidingView behavior={'height'} scdtyle={style.main}>
    <View style={style.main}>
      <View style={style.nav}>
        <Logo />
        {error ? <Error error={error} /> : <></>}
        {/* <OpenInNativeButton /> */}
      </View>
      {!roomCreated ? (
        <View style={style.content} onLayout={onLayout}>
          <View style={style.leftContent}>
            <Text style={style.heading}>{$config.APP_NAME}</Text>
            <Text style={style.headline}>{$config.LANDING_SUB_HEADING}</Text>
            <View style={style.inputs}>
              <TextInput
                value={roomTitle}
                onChangeText={(text) => onChangeRoomTitle(text)}
                onSubmitEditing={() => createRoom()}
                placeholder="Name your meeting"
              />
              <View style={{paddingVertical: 10}}>
                <View style={style.checkboxHolder}>
                  <Checkbox
                    value={hostControlCheckbox}
                    onValueChange={setHostControlCheckbox}
                  />
                  <Text style={style.checkboxTitle}>
                    Restrict Host Controls{' '}
                    {!hostControlCheckbox
                      ? '(Everyone is a Host)'
                      : '(Separate host link)'}
                  </Text>
                </View>
                {$config.PSTN ? (
                  <View style={style.checkboxHolder}>
                    <Checkbox
                      value={pstnCheckbox}
                      onValueChange={setPstnCheckbox}
                    />
                    <Text style={style.checkboxTitle}>
                      Use PSTN (Join by dialing a number)
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
              <PrimaryButton
                disabled={roomTitle === '' || loading}
                onPress={() => createRoom()}
                text={loading ? 'Loading...' : 'Create Meeting'}
              />
              <HorizontalRule />
              <SecondaryButton
                onPress={() => history.push('/join')}
                text={'Have a Meeting ID?'}
              />
            </View>
          </View>
        </View>
      ) : (
        <Share
          urlView={urlView}
          urlHost={urlHost}
          pstn={pstn}
          hostControlCheckbox={hostControlCheckbox}
          joinPhrase={joinPhrase}
          roomTitle={roomTitle}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  full: {flex: 1},
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
    flex: 1,
    justifyContent: 'space-evenly',
    marginBottom: '13%',
    marginTop: '7%',
    minHeight: 350,
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
    marginBottom: 40,
  },
  inputs: {
    flex: 1,
    // marginVertical: '2%',
    width: '100%',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  // textInput: textInput,
  checkboxHolder: {
    marginVertical: 0,
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 20,
    // flex: .2,
    // height: 10,
    // justifyContent: 'center',
    // alignContent: 'center',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
  checkboxTitle: {
    color: $config.PRIMARY_FONT_COLOR + '60',
    paddingHorizontal: 5,
    alignSelf: 'center',
    // marginVertical: 'auto',
    // fontWeight: '700',
  },
  checkboxCaption: {
    color: $config.PRIMARY_FONT_COLOR + '60',
    paddingHorizontal: 5,
  },
  checkboxTextHolder: {
    marginVertical: 0, //check if 5
    flexDirection: 'column',
  },
  // urlTitle: {
  //   color: '#fff',
  //   fontSize: 14,
  // },
  urlHolder: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: 'center',
    maxWidth: 400,
    minHeight: 45,
  },
  // url: {
  //   color: '#fff',
  //   fontSize: 18,
  //   fontWeight: '700',
  //   textDecorationLine: 'underline',
  // },
  pstnHolder: {
    flexDirection: 'row',
    width: '80%',
  },
  pstnMargin: {
    marginRight: '10%',
  },
});

export default Create;
