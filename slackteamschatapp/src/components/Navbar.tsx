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
  TouchableOpacity,
  Image,
  Text,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
// import {MinUidConsumer} from '../../agora-rn-uikit/src/MinUidContext';
// import PropsContext from '../../agora-rn-uikit/src/PropsContext';
import icons from '../assets/icons';
import Settings from './Settings';
import ColorContext from './ColorContext';
import CopyJoinInfo from '../subComponents/CopyJoinInfo';
import {SidePanelType} from '../subComponents/SidePanelEnum';
import {navHolder} from '../../theme.json';
import Layout from '../subComponents/LayoutEnum';
import ChatContext from '../components/ChatContext';
import mobileAndTabletCheck from '../utils/mobileWebTest';

const {participantIcon, gridLayoutIcon, pinnedLayoutIcon, recordingIcon} =
  icons;

const Navbar = (props: any) => {
  const {primaryColor} = useContext(ColorContext);
  const {messageStore} = useContext(ChatContext);
  const {
    // participantsView,
    // setParticipantsView,
    recordingActive,
    sidePanel,
    setSidePanel,
    layout,
    setLayout,
    pendingMessageLength,
    setLastCheckedPublicState,
    // setChatDisplayed,
    // chatDisplayed,
    isHost,
    title,
  } = props;
  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  let onLayout = (e: any) => {
    setDim([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };
  const isDesktop = dim[0] > 1224;
  return (
    <View
      onLayout={onLayout}
      style={[Platform.OS === 'web' ? style.navHolder : style.navHolderNative, {backgroundColor: $config.SECONDARY_FONT_COLOR + 80}, Platform.OS === 'web' ? {justifyContent: mobileAndTabletCheck() ? 'space-between' : 'flex-end'} : {}]}>
      {recordingActive && !mobileAndTabletCheck() ? (
        <View style={[style.recordingView, {backgroundColor: $config.SECONDARY_FONT_COLOR}]}>
          <Image source={{uri: icons.recordingActiveIcon}} style={{
            width: 20,
            height: 20,
            margin: 1,
            resizeMode: 'contain', tintColor: '#FD0845'}} />
          <Text
              style={{
                fontSize: Platform.OS === 'web' ? 16 : 12,
                color: '#FD0845',
                fontWeight: '400',
                alignSelf: 'center',
                textAlign: 'center',
                flex: 1,
              }}>
              Recording
            </Text>
        </View>
      ) : (
        <></>
      )}
      <View style={[style.roomNameContainer, Platform.OS === 'web' && !mobileAndTabletCheck() ? {transform: [{translateX: '50%'}]} : {}]}>
        {Platform.OS === 'web' ? (
          <View
            style={{flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 5}}>
            <Text style={style.roomNameText}>{mobileAndTabletCheck() ? title.length > 13 ? title.slice(0,13) + '..' : title : title}</Text>
            <View
              style={{
                backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
                width: 1,
                height: 'auto',
                marginHorizontal: 10,
              }}
            />
            <CopyJoinInfo />
          </View>
        ) : (
          <Text style={style.roomNameText}>{title}</Text>
        )}  
        
      </View>
      <View
        style={{
          width: '50%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          zIndex: 9,
          // flex: 1,
          // minWidth: Platform.OS === 'web' ? (isDesktop ? 400 : 280) : 40,
          // backgroundColor: '#f00',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:
              Platform.OS === 'web'
                ? $config.SECONDARY_FONT_COLOR
                : $config.SECONDARY_FONT_COLOR + '00',
            padding: 4,
            minHeight: 35,
            // height: 40,
            // backgroundColor: '#f0f',
            // paddingHorizontal: 16,
            borderRadius: 10,
            minWidth: Platform.OS === 'web' && isDesktop ? 300 : mobileAndTabletCheck() ? 150 : 200,
            // borderTopLeftRadius: 10,
            // borderBottomLeftRadius: 10,
            justifyContent: 'space-evenly',
          }}>
          <View style={{width: '20%', height: '100%'}}>
            <TouchableOpacity
              onPress={() => {
                sidePanel === SidePanelType.Participants
                  ? setSidePanel(SidePanelType.None)
                  : setSidePanel(SidePanelType.Participants);
              }}
              style={style.btnHolder}>
              <Image
                source={{uri: participantIcon}}
                style={[style.participantBtnIcon, {tintColor: primaryColor}]}
              />
              {/* <MinUidConsumer>
                {(minUsers) => (
                  <Text style={[style.participantText, {color: primaryColor}]}>
                    {minUsers.length + 1}
                  </Text>
                )}
              </MinUidConsumer> */}
            </TouchableOpacity>
          </View>
          {$config.CHAT ? (
            <>
              {Platform.OS === 'web' && isDesktop ? (
                <View
                  style={{
                    backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
                    width: 1,
                    height: '100%',
                    marginHorizontal: 10,
                    alignSelf: 'center',
                    opacity: 0.8,
                  }}
                />
              ) : (
                <></>
              )}
              <View style={{width: '25%', height: '120%'}}>
                <View
                  style={{alignSelf: 'center', width: '100%', height: '110%'}}>
                  <TouchableOpacity
                    style={style.btnHolder}
                    onPress={() => {
                      setLastCheckedPublicState(messageStore.length);
                      sidePanel === SidePanelType.Chat
                        ? setSidePanel(SidePanelType.None)
                        : setSidePanel(SidePanelType.Chat);
                    }}>
                    {sidePanel !== SidePanelType.Chat &&
                    pendingMessageLength !== 0 ? (
                      <View style={style.chatNotification}>
                        <Text style={{color: $config.SECONDARY_FONT_COLOR}}>
                          {pendingMessageLength}
                        </Text>
                      </View>
                    ) : (
                      <></>
                    )}
                    <Image
                      source={{
                        uri: sidePanel !== SidePanelType.Chat &&
                          pendingMessageLength !== 0 ? icons.chatIconFilled : icons.chatIcon
                      }}
                      resizeMode={'contain'}
                      style={[
                        {
                          width: '100%',
                          height: '100%',
                          tintColor: $config.PRIMARY_COLOR,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <></>
          )}
          {Platform.OS === 'web' && isDesktop ? (
            <View
              style={{
                backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
                width: 1,
                height: '100%',
                marginHorizontal: 10,
                alignSelf: 'center',
                opacity: 0.8,
              }}
            />
          ) : (
            <></>
          )}
          <View style={{width: '18%', height: '105%'}}>
            <View style={{alignSelf: 'center', width: '100%', height: '105%'}}>
              <TouchableOpacity
                style={style.btnHolder}
                onPress={() => {
                  setLayout((l: Layout) =>
                    l === Layout.Pinned ? Layout.Grid : Layout.Pinned,
                  );
                }}>
                <Image
                  // source={{uri: layout ? gridLayoutIcon : pinnedLayoutIcon}}
                  source={{uri: gridLayoutIcon}}
                  resizeMode={'contain'}
                  style={{
                    width: '100%',
                    height: '100%',
                    tintColor: $config.PRIMARY_COLOR,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {Platform.OS === 'web' && isDesktop ? (
            <>
              <View
                style={{
                  backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
                  width: 1,
                  height: '100%',
                  marginHorizontal: 10,
                  alignSelf: 'center',
                  opacity: 0.8,
                }}
              />
              <View style={{width: '20%', height: '100%'}}>
                <Settings
                  sidePanel={sidePanel}
                  setSidePanel={setSidePanel}
                  isHost={isHost}
                />
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  navHolder: navHolder,
  navHolderNative: {
    position: 'relative',
    width: '100%',
    height: '8%',
    backgroundColor: $config.SECONDARY_FONT_COLOR + '80',
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  recordingView: {
    // flex: 0.25,
    // maxWidth: 150,
    // paddingHorizontal: 2,
    height: 35,
    maxHeight: 30,
    position: 'absolute',
    left: 10,
    // alignSelf: 'center',
    paddingHorizontal: 5,
    // marginVertical: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // marginHorizontal: 5,
  },
  recordingIcon: {
    width: 20,
    height: 20,
    margin: 1,
    resizeMode: 'contain',
  },
  btnHolder: {padding: mobileAndTabletCheck() ? 2 : 5, width: '100%', height: '100%'},
  // participantBtnHolder: {
  //   backgroundColor: '#fff',
  //   // flex: 0.5,
  //   width: 90,
  //   paddingHorizontal: 5,
  //   // marginHorizontal: 5,
  //   height: 30,
  //   alignSelf: 'center',
  //   // borderWidth: 2,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   alignContent: 'center',
  //   borderRadius: 3,
  // },
  // participantBtn: {
  //   height: '100%',
  //   // width: '100%',
  //   flexDirection: 'row',
  //   alignContent: 'center',
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  //   flex: 1,
  // },
  participantBtnIcon: {
    height: '100%',
    width: '100%',
    // margin: 1,
    tintColor: $config.PRIMARY_COLOR,
    resizeMode: 'contain',
  },
  // participantText: {
  //   fontSize: Platform.OS === 'web' ? 20 : 18,
  //   fontWeight: '400',
  //   alignSelf: 'center',
  //   textAlign: 'center',
  //   flex: 1,
  // },
  roomNameContainer: {
    paddingHorizontal: 1,
    marginHorizontal: 1,
    height: 35,
    maxHeight: 30,
    flexDirection: 'row',
    // width: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 10,
    maxWidth: '50%',
  },
  roomNameText: {
    fontSize: 18,
    // flex: 10,
    // width: 50,
    // color: '#fff',
    color: $config.PRIMARY_FONT_COLOR,
    fontWeight: '500',
  },
  // layoutBtnHolder: {
  //   width: 30,
  //   height: 30,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   // marginLeft: 'auto',
  //   // marginRight: 1,
  // },
  // layoutBtn: {
  //   height: 30,
  //   alignSelf: 'center',
  //   width: 30,
  //   // marginRight: 5,
  // },
  // localButton: {
  //   // backgroundColor: '#f0f',
  //   height: 30,
  //   alignSelf: 'center',
  //   width: 30,
  //   // marginRight: 5,
  // },
  // layoutBtnIcon: {
  //   flex: 1,
  //   height: 30,
  //   alignSelf: 'center',
  //   width: 30,
  //   resizeMode: 'contain',
  // },
  chatNotification: {
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: $config.PRIMARY_COLOR,
    color: $config.SECONDARY_FONT_COLOR,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
    borderRadius: 10,
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'web' ? -8 : 18,
  },
});

export default Navbar;
