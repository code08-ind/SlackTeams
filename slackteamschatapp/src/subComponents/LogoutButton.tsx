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
import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import StorageContext from '../components/StorageContext';
import {useHistory} from '../components/Router';
import {gql, useMutation} from '@apollo/client';

const LOGOUT = gql`
  mutation logoutSession($token: String!) {
    logoutSession(token: $token)
  }
`;
/**
 * Sends a logout request to the backend and logs out the user from the frontend.
 */
const LogoutButton = () => {
  const {store, setStore} = useContext(StorageContext);
  const {token} = store;
  const history = useHistory();
  const [logoutQuery] = useMutation(LOGOUT);

  const logout = () => {
    if (setStore) {
      setStore({token: null});
    }
    logoutQuery({variables: {token}}).catch((e) => {
      console.log(e);
    });
  };

  const login = () => {
    history.push('/authenticate');
  };

  return (
    <>
      {token === null ? (
        <TouchableOpacity style={style.btn} onPress={() => login()}>
          <Text style={style.btnText}>Login using OAuth</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={style.btn} onPress={() => logout()}>
          <Text style={style.btnText}>Logout</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const style = StyleSheet.create({
  btn: {
    width: '60%',
    maxWidth: 400,
    minHeight: 45,
    marginBottom: 15,
  },
  btnText: {
    width: '100%',
    height: 45,
    lineHeight: 45,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: $config.PRIMARY_FONT_COLOR,
    textDecorationLine: 'underline',
  },
});

export default LogoutButton;
