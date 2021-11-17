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
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {MinUidConsumer} from '../../agora-rn-uikit/src/MinUidContext';
import {MaxUidConsumer} from '../../agora-rn-uikit/src/MaxUidContext';
import LocalAudioMute from '../subComponents/LocalAudioMute';
import LocalVideoMute from '../subComponents/LocalVideoMute';
import LocalUserContext from '../../agora-rn-uikit/src/LocalUserContext';
import CopyJoinInfo from '../subComponents/CopyJoinInfo';
import RemoteAudioMute from '../subComponents/RemoteAudioMute';
import RemoteVideoMute from '../subComponents/RemoteVideoMute';
import RemoteEndCall from '../subComponents/RemoteEndCall';
import chatContext from './ChatContext';
import Clipboard from '../subComponents/Clipboard';
import ColorContext from './ColorContext';
import {gql, useQuery} from '@apollo/client';
import icons from '../assets/icons';
import platform from '../subComponents/Platform';
import {SidePanelType} from '../subComponents/SidePanelEnum';
import {UserType} from './RTMConfigure';

const ParticipantView = (props: any) => {
  const {userList, localUid} = useContext(chatContext);
  const {primaryColor} = useContext(ColorContext);
  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  const isSmall = dim[0] < 700;
  
  return (
    <View
      style={
        Platform.OS === 'web'
          ? isSmall ? style.participantViewNative : style.participantView
          : style.participantViewNative
      }>
      <TouchableOpacity style={style.backButton}>
        {/* onPress={() => props.setSidePanel(SidePanelType.None)}> */}
        {/* <Image
          resizeMode={'contain'}
          style={style.backIcon}
          source={{uri: icons.backBtn}}
        /> */}
        <Text style={style.heading}>Participants</Text>
      </TouchableOpacity>
      <ScrollView style={{flex: 1}}>
        <MinUidConsumer>
          {(minUsers) => (
            <MaxUidConsumer>
              {(maxUser) =>
                [...minUsers, ...maxUser].map((user) =>
                  user.uid === 'local' ? (
                    <View style={style.participantContainer} key={user.uid}>
                      <Text style={style.participantText}>
                        {userList[localUid]
                          ? userList[localUid].name + ' '
                          : 'You '}
                      </Text>
                      <View style={style.participantButtonContainer}>
                        <LocalUserContext>
                          <LocalAudioMute />
                          <LocalVideoMute />
                        </LocalUserContext>
                      </View>
                    </View>
                  ) : user.uid === 1 ? (
                    <View style={style.participantContainer} key={user.uid}>
                      <Text style={style.participantText}>
                        {userList[localUid]
                          ? userList[localUid].name + "'s screenshare "
                          : 'Your screenshare '}
                      </Text>
                    </View>
                  ) : (
                    <View style={style.participantContainer} key={user.uid}>
                      <Text style={style.participantText}>
                        {userList[user.uid]
                          ? userList[user.uid].name + ' '
                          : String(user.uid)[0] === '1'
                            ? 'PSTN User ' : 'User '}
                      </Text>
                      {userList[user.uid]?.type !== UserType.ScreenShare ? (
                        <View style={style.participantButtonContainer}>
                          <RemoteEndCall uid={user.uid} isHost={props.isHost} />
                          <RemoteAudioMute
                            uid={user.uid}
                            audio={user.audio}
                            isHost={props.isHost}
                          />
                          <RemoteVideoMute
                            uid={user.uid}
                            video={user.video}
                            isHost={props.isHost}
                          />
                        </View>
                      ) : (
                        <></>
                      )}
                    </View>
                  ),
                )
              }
            </MaxUidConsumer>
          )}
        </MinUidConsumer>
      </ScrollView>
      <View style={{width: '100%', height: 50, alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <CopyJoinInfo showText={true}/>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  participantView: {
    width: '20%',
    minWidth: 200,
    maxWidth: 300,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    flex: 1,
    paddingTop: 20,
    shadowColor: $config.PRIMARY_FONT_COLOR + '80',
    shadowOpacity: 0.5,
    shadowOffset: {width: -2, height: 0},
    shadowRadius: 3,
    // borderLeftWidth: 1
  },
  participantViewNative: {
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    height: '100%',
    right: 0,
    top: 0,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: $config.PRIMARY_FONT_COLOR,
  },
  participantContainer: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 2,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    // height: 10,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  participantText: {
    flex: 1,
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: '500',
    flexDirection: 'row',
    color: $config.PRIMARY_FONT_COLOR,
    lineHeight: 20,
    paddingLeft: 10,
    alignSelf: 'center',
  },
  participantButtonContainer: {
    // flex: 0.3,
    flexDirection: 'row',
    paddingRight: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  secondaryBtn: {
    alignSelf: 'center',
    width: '60%',
    borderColor: $config.PRIMARY_COLOR,
    borderWidth: 3,
    maxWidth: 400,
    minHeight: 42,
    minWidth: 200,
    marginTop: 'auto',
  },
  secondaryBtnText: {
    width: '100%',
    height: 45,
    lineHeight: 45,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    textAlignVertical: 'center',
    color: $config.PRIMARY_COLOR,
  },
  backButton: {
    // marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backIcon: {
    width: 20,
    height: 12,
    alignSelf: 'center',
    justifyContent: 'center',
    tintColor: $config.PRIMARY_FONT_COLOR,
  },
});

export default ParticipantView;
