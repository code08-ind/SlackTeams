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
import {Platform} from 'react-native';

const styles = {
  temp: {
    width: '100%',
    height: '100%',
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    borderRadius: 15,
  },
  bottomBar: {
    flex: Platform.OS === 'web' ? 1.3 : 1.6,
    paddingHorizontal: Platform.OS === 'web' ? '20%' : '1%',
    backgroundColor: $config.SECONDARY_FONT_COLOR + 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'relative',
    margin: 0,
    bottom: 0,
  },
  localButton: {
    backgroundColor: $config.SECONDARY_FONT_COLOR, //'#fff',
    borderRadius: 23,
    borderColor: $config.PRIMARY_COLOR,
    borderWidth: 0,
    width: 40,
    height: 40,
    padding: 3,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  endCall: {
    backgroundColor: $config.SECONDARY_FONT_COLOR, //'#fff',
    borderRadius: 23,
    borderColor: $config.PRIMARY_COLOR,
    borderWidth: 0,
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  remoteButton: {
    width: 25,
    height: 25,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginHorizontal: 0,
    backgroundColor: $config.SECONDARY_FONT_COLOR, //'#fff',
  },
  minCloseBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    borderRadius: 0,
    position: 'absolute',
    right: 5,
    top: 5,
  },
};

export default styles;
