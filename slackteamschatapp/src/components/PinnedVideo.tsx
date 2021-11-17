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
import React, {useState, useContext} from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  Pressable,
} from 'react-native';
import {MinUidConsumer} from '../../agora-rn-uikit/src/MinUidContext';
import RtcContext from '../../agora-rn-uikit/src/RtcContext';
import {MaxVideoView} from '../../agora-rn-uikit/Components';
import {MaxUidConsumer} from '../../agora-rn-uikit/src/MaxUidContext';
import chatContext from './ChatContext';
import ColorContext from './ColorContext';
import icons from '../assets/icons';
import {layoutProps} from '../../theme.json';
import FallbackLogo from '../subComponents/FallbackLogo';

const {topPinned} = layoutProps;

const PinnedVideo = () => {
  const {primaryColor} = useContext(ColorContext);
  const [collapse, setCollapse] = useState(false);
  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  let onLayout = () => {
    setTimeout(() => {
      let {height, width} = Dimensions.get('window');
      let isLandscape = width > height;
      setDim([width, height, isLandscape]);
    }, 20);
  };
  const isSidePinnedlayout = topPinned === true ? false : dim[2]; // if either explicity set to false or auto evaluation
  const {userList, localUid} = useContext(chatContext);
  return (
    <View
      style={{
        flexDirection: isSidePinnedlayout ? 'row' : 'column',
        flex: 1,
        padding: 4,
      }}
      onLayout={onLayout}>
      {isSidePinnedlayout && (
        <Pressable
          onPress={() => setCollapse(!collapse)}
          style={{
            position: 'absolute',
            zIndex: 50,
            marginTop: 5,
            width: 35,
            height: 35,
            marginLeft: collapse ? 5 : '20.1%',
            backgroundColor: $config.SECONDARY_FONT_COLOR + 'aa',
            borderRadius: 50,
            justifyContent: 'center',
          }}>
          {/* <Image
            source={{
              uri: icons.micOff,
            }}
            style={[style.MicIcon]}
            resizeMode={'contain'}
          /> */}
          <Text
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              color: $config.PRIMARY_COLOR,
              fontWeight: '500',
              fontSize: 20,
            }}>
            {collapse ? '>' : '<'}
          </Text>
        </Pressable>
      )}
      {!collapse && (
        <ScrollView
          horizontal={!isSidePinnedlayout}
          decelerationRate={0}
          // snapToInterval={
          //   dim[2] ? dim[0] * 0.1125 + 2 : ((dim[1] / 3.6) * 16) / 9
          // }
          // snapToAlignment={'center'}
          style={
            isSidePinnedlayout
              ? {width: '20%', paddingHorizontal: 8}
              : {flex: 1}
          }>
          <RtcContext.Consumer>
            {(data) => (
              <MinUidConsumer>
                {(minUsers) =>
                  minUsers.map((user) => (
                    <Pressable
                      style={
                        isSidePinnedlayout
                          ? {
                              width: '100%',
                              height: dim[0] * 0.1125 + 2, // width * 20/100 * 9/16 + 2
                              zIndex: 40,
                              paddingBottom: 8,
                            }
                          : {
                              width: ((dim[1] / 3) * 16) / 9 / 2 + 12, //dim[1] /4.3
                              height: '100%',
                              zIndex: 40,
                              paddingRight: 8,
                              paddingVertical: 4,
                            }
                      }
                      key={user.uid}
                      onPress={() => {
                        data.dispatch({type: 'SwapVideo', value: [user]});
                      }}>
                      <View style={style.flex1}>
                        <MaxVideoView
                          fallback={() => {
                            if (user.uid === 'local') {
                              return FallbackLogo(userList[localUid]?.name);
                            } else if (String(user.uid)[0] === '1') {
                              return FallbackLogo(
                                'PSTN User'
                              );
                            } else {
                              return FallbackLogo(
                                userList[user.uid]?.name,
                              );
                            }
                          }}
                          user={user}
                          key={user.uid}
                        />
                        <View style={style.nameHolder}>
                          <View style={[style.MicBackdrop]}>
                            <Image
                              source={{
                                uri: user.audio ? icons.mic : icons.micOff,
                              }}
                              style={[
                                style.MicIcon,
                                {
                                  tintColor: user.audio ? primaryColor : 'red',
                                },
                              ]}
                              resizeMode={'contain'}
                            />
                          </View>
                          <Text style={style.name}>
                            {user.uid === 'local'
                              ? userList[localUid]
                                ? userList[localUid].name.slice(0, 20) + ' '
                                : 'You '
                              : userList[user.uid]
                                ? userList[user.uid].name.slice(0, 20) + ' '
                                : user.uid === 1
                                  ? (userList[localUid]?.name + "'s screen ").slice(0, 20)
                                  : String(user.uid)[0] === '1' ?
                                    'PSTN User ' : 'User '}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))
                }
              </MinUidConsumer>
            )}
          </RtcContext.Consumer>
        </ScrollView>
      )}
      <View
        style={
          isSidePinnedlayout
            ? collapse
              ? style.width100
              : style.width80
            : style.flex4
        }>
        <MaxUidConsumer>
          {(maxUsers) => (
            <View style={style.flex1}>
              <MaxVideoView
                fallback={() => {
                  if (maxUsers[0].uid === 'local') {
                    return FallbackLogo(userList[localUid]?.name);
                  } else if (String(maxUsers[0].uid)[0] === '1') {
                    return FallbackLogo('PSTN User');
                  } else {
                    return FallbackLogo(userList[maxUsers[0].uid]?.name);
                  }
                }}
                user={maxUsers[0]}
                key={maxUsers[0].uid}
              />
              <View style={style.nameHolder}>
                <View style={[style.MicBackdrop]}>
                  <Image
                    source={{
                      uri: maxUsers[0].audio ? icons.mic : icons.micOff,
                    }}
                    style={[
                      style.MicIcon,
                      {
                        tintColor: maxUsers[0].audio ? primaryColor : 'red',
                      },
                    ]}
                    resizeMode={'contain'}
                  />
                </View>
                <Text style={style.name}>
                  {maxUsers[0].uid === 'local'
                    ? userList[localUid]
                      ? userList[localUid].name.slice(0,20) + ' '
                      : 'You '
                    : userList[maxUsers[0].uid]
                    ? userList[maxUsers[0].uid].name.slice(0,20) + ' '
                    : maxUsers[0].uid === 1
                    ? (userList[localUid].name + "'s screen ").slice(0,20)
                    : 'User '}
                </Text>
              </View>
            </View>
          )}
        </MaxUidConsumer>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  width80: {width: '80%'},
  width100: {width: '100%'},
  flex2: {flex: 2},
  flex4: {flex: 4, backgroundColor: '#ffffff00'},
  flex1: {flex: 1},
  nameHolder: {
    marginTop: -25,
    backgroundColor: $config.SECONDARY_FONT_COLOR + 'aa',
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    height: 25,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
  },
  name: {color: $config.PRIMARY_FONT_COLOR, lineHeight: 25, fontWeight: '700'},
  MicBackdrop: {
    width: 20,
    height: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  MicIcon: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
});

export default PinnedVideo;
