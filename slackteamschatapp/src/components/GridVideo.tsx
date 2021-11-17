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
import React, {useMemo, useContext, useState} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import MinUidContext from '../../agora-rn-uikit/src/MinUidContext';
import MaxUidContext from '../../agora-rn-uikit/src/MaxUidContext';
import {MaxVideoView} from '../../agora-rn-uikit/Components';
import chatContext from './ChatContext';
import icons from '../assets/icons';
import styles from './styles';
import ColorContext from './ColorContext';
import FallbackLogo from '../subComponents/FallbackLogo';
import Layout from '../subComponents/LayoutEnum';
import RtcContext, {DispatchType} from '../../agora-rn-uikit/src/RtcContext';

const layout = (len: number, isDesktop: boolean = true) => {
  const rows = Math.round(Math.sqrt(len));
  const cols = Math.ceil(len / rows);
  let [r, c] = isDesktop ? [rows, cols] : [cols, rows];
  return {
    matrix:
      len > 0
        ? [
            ...Array(r - 1)
              .fill(null)
              .map(() => Array(c).fill('X')),
            Array(len - (r - 1) * c).fill('X'),
          ]
        : [],
    dims: {r, c},
  };
};

// const isDesktop = Platform.OS === 'web';

interface GridVideoProps {
  setLayout: React.Dispatch<React.SetStateAction<Layout>>;
}

const GridVideo = (props: GridVideoProps) => {
  const {dispatch} = useContext(RtcContext);
  const max = useContext(MaxUidContext);
  const min = useContext(MinUidContext);
  const {primaryColor} = useContext(ColorContext);
  const {userList, localUid} = useContext(chatContext);
  const users = [...max, ...min];
  let onLayout = (e: any) => {
    setDim([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };
  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  const isDesktop = dim[0] > dim[1] + 100;
  let {matrix, dims} = useMemo(
    () => layout(users.length, isDesktop),
    [users.length, isDesktop],
  );
  return (
    <View
      style={[style.full, {paddingHorizontal: isDesktop ? 50 : 0}]}
      onLayout={onLayout}>
      {matrix.map((r, ridx) => (
        <View style={style.gridRow} key={ridx}>
          {r.map((c, cidx) => (
            <Pressable
              onPress={() => {
                if (!(ridx === 0 && cidx === 0)) {
                  dispatch({
                    type: 'SwapVideo',
                    value: [users[ridx * dims.c + cidx]],
                  });
                }
                props.setLayout(Layout.Pinned);
              }}
              style={{
                flex: Platform.OS === 'web' ? 1 / dims.c : 1,
                marginHorizontal: 'auto',
              }}
              key={cidx}>
              <View style={style.gridVideoContainerInner}>
                <MaxVideoView
                  fallback={() => {
                    if (users[ridx * dims.c + cidx].uid === 'local') {
                      return FallbackLogo(userList[localUid]?.name);
                    } else if (String(users[ridx * dims.c + cidx].uid)[0] === '1') {
                      return FallbackLogo('PSTN User');
                    } else {
                      return FallbackLogo(
                        userList[users[ridx * dims.c + cidx]?.uid]?.name,
                      );
                    }
                  }}
                  user={users[ridx * dims.c + cidx]}
                  key={users[ridx * dims.c + cidx].uid}
                />
                <View
                  style={{
                    marginTop: -30,
                    backgroundColor: $config.SECONDARY_FONT_COLOR + 'bb',
                    alignSelf: 'flex-end',
                    paddingHorizontal: 8,
                    height: 30,
                    borderTopLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    // marginHorizontal: 'auto',
                    maxWidth: '100%',
                    flexDirection: 'row',
                    // alignContent: 'flex-end',
                    // width: '100%',
                    // alignItems: 'flex-start',
                  }}>
                  {/* <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}> */}
                  <View style={[style.MicBackdrop]}>
                    <Image
                      source={{
                        uri: users[ridx * dims.c + cidx].audio
                          ? icons.mic
                          : icons.micOff,
                      }}
                      style={[
                        style.MicIcon,
                        {
                          tintColor: users[ridx * dims.c + cidx].audio
                            ? primaryColor
                            : 'red',
                        },
                      ]}
                      resizeMode={'contain'}
                    />
                  </View>
                  <Text
                    textBreakStrategy={'simple'}
                    style={{
                      color: $config.PRIMARY_FONT_COLOR,
                      lineHeight: 30,
                      fontSize: 18,
                      fontWeight: '600',
                      // width: '100%',
                      // alignSelf: 'stretch',
                      // textAlign: 'center',
                    }}>
                    {users[ridx * dims.c + cidx].uid === 'local'
                      ? userList[localUid]
                        ? userList[localUid].name.slice(0, 20) + ' '
                        : 'You '
                      : userList[users[ridx * dims.c + cidx].uid]
                        ? userList[users[ridx * dims.c + cidx].uid].name.slice(
                          0,
                          20,
                        ) + ' '
                        : users[ridx * dims.c + cidx].uid === 1
                          ? (userList[localUid]?.name + "'s screen ").slice(0, 20)
                          : String(users[ridx * dims.c + cidx].uid)[0] === '1' ?
                            'PSTN User ' : 'User '}
                  </Text>
                  {/* </View> */}
                  {/* {console.log(
                    '!nax',
                    userList,
                    userList[users[ridx * dims.c + cidx].uid],
                    userList[localUid],
                    users[ridx * dims.c + cidx].uid,
                  )} */}
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  full: {
    flex: 1,
    // padding: 20,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
  },
  gridVideoContainerInner: {
    // borderColor: '#fff',
    // borderWidth:2,
    // width: '100%',
    borderRadius: 15,
    flex: 1,
    overflow: 'hidden',
    // margin: 1,
    paddingHorizontal: 10,
  },
  MicBackdrop: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: 10,
    marginRight: 20,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    display: 'flex',
    justifyContent: 'center',
  },
  MicIcon: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
});
export default GridVideo;
