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
import RtmEngine from 'agora-react-native-rtm';
import {createContext} from 'react';

export interface channelMessage {
  isLocal: boolean;
  msg: string;
  ts: string;
  uid: string;
}

export interface messageStoreInterface {
  ts: string;
  uid: string;
  msg: string;
}

interface chatContext {
  messageStore: messageStoreInterface | any;
  privateMessageStore: any;
  sendMessage: (msg: string) => void;
  sendMessageToUid: (msg: string, uid: number) => void;
  sendControlMessage: (msg: string) => void;
  sendControlMessageToUid: (msg: string, uid: number) => void;
  engine: RtmEngine;
  localUid: string;
  userList: any;
  // peersRTM: Array<string>;
}

export enum controlMessageEnum {
  muteVideo = '1',
  muteAudio = '2',
  muteSingleVideo = '3',
  muteSingleAudio = '4',
  kickUser = '5',
  cloudRecordingActive = '6',
  cloudRecordingUnactive = '7',
}

const ChatContext = createContext((null as unknown) as chatContext);

export default ChatContext;
