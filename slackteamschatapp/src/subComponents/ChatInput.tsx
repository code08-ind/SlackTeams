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
import React, {useState, useContext, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput as Ti,
  UIManager,
} from 'react-native';
import ChatContext from '../components/ChatContext';
import ColorContext from '../components/ColorContext';
import TextInput from '../atoms/TextInput';
import icons from '../assets/icons';

/**
 * Input component for the Chat interface
 */
const ChatInput = (props: any) => {
  const {primaryColor} = useContext(ColorContext);
  const [message, onChangeMessage] = useState('');
  // const [height, setHeight] = useState(0);
  const {privateActive, selectedUser} = props;
  const {sendMessage, sendMessageToUid} = useContext(ChatContext);

  return (
    <View
      style={[
        style.inputView,
        {borderColor: primaryColor, height: 40}
      ]}>
      <TextInput
        value={message}
        // onContentSizeChange={(event) => {
        // causes infinite react state update on ctrl+A -> delete
        // setHeight(event.nativeEvent.contentSize.height);
        // }}
        onChangeText={(text) => onChangeMessage(text)}
        style={{
          borderRadius: 10,
          backgroundColor: $config.PRIMARY_FONT_COLOR + '10',
          borderWidth: 1,
          color: $config.PRIMARY_FONT_COLOR,
          textAlign: 'left',
          height: 40,
          paddingVertical: 10,
          flex: 1,
          alignSelf: 'center',
        }}
        blurOnSubmit={false}
        onSubmitEditing={() => {
          // console.log('!click');
          if (!privateActive) {
            sendMessage(message);
            onChangeMessage('');
            // setHeight(40);
          } else {
            sendMessageToUid(message, selectedUser.uid);
            onChangeMessage('');
            // setHeight(40);
          }
          // UIManager.focus(inputRef.current);
        }}
        placeholder="Type your message.."
        placeholderTextColor={$config.PRIMARY_FONT_COLOR}
        autoCorrect={false}
      />
      <TouchableOpacity
        style={style.chatInputButton}
        onPress={() => {
          if (!privateActive) {
            sendMessage(message);
            onChangeMessage('');
            // setHeight(40);
          } else {
            sendMessageToUid(message, selectedUser.uid);
            onChangeMessage('');
            // setHeight(40);
          }
        }}>
        <Image
          source={{
            uri: icons.send,
          }}
          style={style.chatInputButtonIcon}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  inputView: {
    width: '95%',
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 15,
  },
  chatInput: {
    flex: 1,
    width: '100%',
    backgroundColor: $config.PRIMARY_FONT_COLOR,
    color: $config.PRIMARY_FONT_COLOR,
  },
  chatInputButton: {
    width: 30,
    // width: '10%',
    marginRight: 0,
    height: 30,
    borderRadius: 30,
    alignSelf: 'center',
    marginHorizontal: 10,
    backgroundColor: $config.PRIMARY_COLOR,
    display: 'flex',
    justifyContent: 'center',
  },
  chatInputButtonIcon: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    transform: [
      {
        translateX: -2,
      },
    ],
  },
});
export default ChatInput;
