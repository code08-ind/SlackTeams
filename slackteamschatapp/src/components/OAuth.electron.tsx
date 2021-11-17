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
import React from 'react';
import {useHistory} from './Router';
import SelectOAuth from '../subComponents/SelectOAuth';
import {url, oAuthSystemType} from './OAuthConfig';

const Oauth = () => {
  const history = useHistory();
  const onSelectOAuthSystem = ({
    oAuthSystem,
  }: {
    oAuthSystem: oAuthSystemType;
  }) => {
    console.log('electron OAuth');
    const oAuthUrl = url({platform: 'desktop'})[`${oAuthSystem}Url`];
    // @ts-ignore
    window.addEventListener(
      'message',
      ({data, origin}: {data: {token: string}; origin: string}) => {
        if (data.token) {
          console.log(data, origin);
          history.push(`/auth-token/${data.token}`);
        }
      },
      false,
    );
    window.open(oAuthUrl, 'modal');
  };
  return <SelectOAuth onSelectOAuth={onSelectOAuthSystem} />;
};
export default Oauth;
