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
import {Redirect, useParams} from './Router';
import StorageContext from './StorageContext';
import {Text} from 'react-native';
import useMount from './useMount';

const Authenticated = () => {
  return <Text> Authenticated Successfully! </Text>;
};

const StoreToken = () => {
  const [ready, setReady] = useState(false);
  const {token}: {token: string} = useParams();
  const {setStore} = useContext(StorageContext);
  console.log('store token api', token);

  useMount(() => {
    setStore && setStore((store) => ({...store, token}));
    setReady(true);
  });
  return ready ? <Redirect to={'/'} /> : <Authenticated />;
};

export default StoreToken;
