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
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import ChatContainer from '../subComponents/ChatContainer';
import ChatInput from '../subComponents/ChatInput';
import {MinUidConsumer} from '../../agora-rn-uikit/src/MinUidContext';
import {MaxUidConsumer} from '../../agora-rn-uikit/src/MaxUidContext';
import icons from '../assets/icons';
import ColorContext from './ColorContext';
import chatContext from './ChatContext';
import {UserType} from './RTMConfigure';

const Chat = (props: any) => {
  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  const isSmall = dim[0] < 700;

  const {userList, localUid} = useContext(chatContext);
  const {
    setChatDisplayed,
    pendingPrivateNotification,
    pendingPublicNotification,
    lastCheckedPrivateState,
    privateMessageCountMap,
    setPrivateMessageLastSeen,
  } = props;
  const {primaryColor} = useContext(ColorContext);
  const [groupActive, setGroupActive] = useState(true);
  const [privateActive, setPrivateActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState({uid: null});
  useEffect(() => {
    if (privateActive) {
      setPrivateMessageLastSeen({
        userId: selectedUser.uid,
        lastSeenCount: privateMessageCountMap[selectedUser.uid],
      });
    }
  }, [pendingPrivateNotification]);

  const selectGroup = () => {
    setPrivateActive(false);
    setGroupActive(true);
  };
  const selectPrivate = () => {
    setGroupActive(false);
  };
  const selectUser = (user: any) => {
    setSelectedUser(user);
    setPrivateActive(true);
  };
  return (
    <View
    style={Platform.OS === 'web' ? !isSmall ? style.chatView : style.chatViewNative: style.chatViewNative}>
      {/* <View style={style.heading}>
        <TouchableOpacity
          style={style.backButton}
          onPress={() => setChatDisplayed(false)}>
          <Image
            resizeMode={'contain'}
            style={style.backIcon}
            source={{uri: icons.backBtn}}
          />
          <Text style={style.headingText}>Chats</Text>
        </TouchableOpacity>
      </View> */}
      <View style={style.chatNav}>
        <TouchableOpacity
          onPress={selectGroup}
          style={
            groupActive
              ? [style.groupActive, {borderColor: primaryColor}]
              : [
                  style.group,
                  {
                    borderColor: primaryColor,
                    borderTopColor: primaryColor + '80',
                  },
                ]
          }>
          {pendingPublicNotification !== 0 ? (
            <View style={style.chatNotification}>
              <Text>{pendingPublicNotification}</Text>
            </View>
          ) : null}
          <Text style={groupActive ? style.groupTextActive : style.groupText}>
            Group
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={selectPrivate}
          style={
            !groupActive
              ? [style.privateActive, {borderColor: primaryColor}]
              : [
                  style.private,
                  {
                    borderColor: primaryColor,
                    borderTopColor: primaryColor + '80',
                  },
                ]
          }>
          {pendingPrivateNotification !== 0 ? (
            <View style={style.chatNotification}>
              {pendingPrivateNotification}
            </View>
          ) : null}
          <Text style={!groupActive ? style.groupTextActive : style.groupText}>
            Private
          </Text>
        </TouchableOpacity>
      </View>
      {groupActive ? (
        <>
          <ChatContainer privateActive={privateActive} />
          <View
            style={{
              backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
              width: '100%',
              height: 1,
              marginHorizontal: -20,
              alignSelf: 'center',
              opacity: 0.5,
            }}
          />
          {Platform.OS === 'ios' ? (
            <View>
              <View style={{backgroundColor: $config.SECONDARY_FONT_COLOR, paddingBottom: 10}}>
                <View
                  style={{
                    backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
                    width: '100%',
                    height: 1,
                    marginHorizontal: -20,
                    alignSelf: 'center',
                    opacity: 0.3,
                    marginBottom: 10,
                  }}
                />
                <ChatInput privateActive={privateActive} />
              </View>
            </View>
          ) : (
            <View style={{backgroundColor: $config.SECONDARY_FONT_COLOR, paddingBottom: 10}}>
              <View
                style={{
                  backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
                  width: '100%',
                  height: 1,
                  marginHorizontal: -20,
                  alignSelf: 'center',
                  opacity: 0.5,
                  marginBottom: 10,
                }}
              />
              <ChatInput privateActive={privateActive} />
            </View>
          )}
        </>
      ) : (
        <>
          {!privateActive ? (
            <ScrollView>
            <MinUidConsumer>
              {(minUsers) => (
                <MaxUidConsumer>
                  {(maxUser) =>
                    [...minUsers, ...maxUser].map((user) => {
                      if (
                        user.uid !== 'local' &&
                        user.uid !== 1 &&
                        userList[user.uid]?.type !== UserType.ScreenShare
                      ) {
                        return (
                          <TouchableOpacity
                            style={style.participantContainer}
                            key={user.uid}
                            onPress={() => {
                              selectUser(user);
                              setPrivateMessageLastSeen({
                                userId: user.uid,
                                lastSeenCount: privateMessageCountMap[user.uid],
                              });
                            }}>
                            {(privateMessageCountMap[user.uid] || 0) -
                              (lastCheckedPrivateState[user.uid] || 0) !==
                            0 ? (
                              <View style={style.chatNotification}>
                                {(privateMessageCountMap[user.uid] || 0) -
                                  (lastCheckedPrivateState[user.uid] || 0)}
                              </View>
                            ) : null}
                            <Text style={style.participantText}>
                              {userList[user.uid]
                                ? userList[user.uid].name + ' '
                                : 'User '}
                            </Text>
                            <Text style={{color: $config.PRIMARY_FONT_COLOR}}>{`>`}</Text>
                          </TouchableOpacity>
                        );
                      }
                    })
                  }
                </MaxUidConsumer>
              )}
            </MinUidConsumer>
            </ScrollView>
          ) : (
            <>
              <ChatContainer
                privateActive={privateActive}
                setPrivateActive={setPrivateActive}
                selectedUser={selectedUser}
                selectedUsername={
                  userList[selectedUser.uid]
                    ? userList[selectedUser.uid].name + ' '
                    : 'User '
                }
              />
                <View>
                <View style={{backgroundColor: $config.SECONDARY_FONT_COLOR, paddingBottom: 10}}>
                  <View
                    style={{
                      backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
                      width: '100%',
                      height: 1,
                      marginHorizontal: -20,
                      alignSelf: 'center',
                      opacity: 0.3,
                      marginBottom: 10,
                    }}
                  />
                  <ChatInput
                    privateActive={privateActive}
                    selectedUser={selectedUser}
                  />
                </View>
              </View>
            </>
          )}
        </>
      )}
    </View>
    // </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  chatView: {
    width: '20%',
    minWidth: 200,
    maxWidth: 300,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    flex: 1,
    // paddingTop: 20,
    shadowColor: $config.PRIMARY_FONT_COLOR + '80',
    shadowOpacity: 0.5,
    shadowOffset: {width: -2, height: 1},
    shadowRadius: 3,
  },
  chatViewNative: {
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    height: '100%',
    // flex: 1,
    right: 0,
    // top: 0,
    bottom: 0,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
  },
  heading: {
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    width: 150,
    height: '7%',
    paddingLeft: 20,
    flexDirection: 'row',
  },
  headingText: {
    flex: 1,
    paddingLeft: 5,
    marginVertical: 'auto',
    fontWeight: '700',
    color: $config.PRIMARY_FONT_COLOR,
    fontSize: 25,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  chatNav: {
    flexDirection: 'row',
    height: '6%',
    // marginBottom: 15,
  },
  groupActive: {
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    flex: 1,
    height: '100%',
    textAlign: 'center',
  },
  group: {
    backgroundColor: $config.PRIMARY_FONT_COLOR + 22,
    flex: 1,
    height: '100%',
    textAlign: 'center',
    borderBottomRightRadius: 10,
  },
  privateActive: {
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    flex: 1,
    height: '100%',
    textAlign: 'center',
  },
  private: {
    backgroundColor: $config.PRIMARY_FONT_COLOR + 22,
    flex: 1,
    height: '100%',
    textAlign: 'center',
    borderBottomLeftRadius: 10,
  },
  groupTextActive: {
    marginVertical: 'auto',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
    color: $config.PRIMARY_FONT_COLOR,
    justifyContent: 'center',
    paddingVertical: 5,
  },
  groupText: {
    marginVertical: 'auto',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 5,
    justifyContent: 'center',
    color: $config.PRIMARY_FONT_COLOR + 50,
  },
  participantContainer: {
    flexDirection: 'row',
    // flex: 1,
    height: 20,
    marginTop: 10,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    // height: '15%',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  participantText: {
    flex: 1,
    fontSize: 18,
    fontWeight: Platform.OS === 'web' ? '500' : '700',
    flexDirection: 'row',
    color: $config.PRIMARY_FONT_COLOR,
    lineHeight: 20,
    paddingLeft: 10,
    alignSelf: 'center',
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
    left: 25,
    top: -5,
  },
});

export default Chat;
