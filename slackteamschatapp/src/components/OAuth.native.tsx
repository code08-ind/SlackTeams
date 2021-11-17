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
import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useHistory} from './Router';
import SelectOAuth from '../subComponents/SelectOAuth';

import {url, oAuthSystemType} from './OAuthConfig';

const processUrl = (url: string): string => {
  return url
    .replace(`${$config.PRODUCT_ID.toLowerCase()}://my-host`, '')
    .replace($config.FRONTEND_ENDPOINT, '');
};

const Oauth = () => {
  let history = useHistory();

  const onSelectOAuthSystem = async ({
    oAuthSystem,
  }: {
    oAuthSystem: oAuthSystemType;
  }) => {
    try {
      // const url = `https://deep-link-tester.netlify.app`;
      const oAuthUrl = url({platform: 'mobile'})[`${oAuthSystem}Url`];
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.openAuth(oAuthUrl, oAuthUrl);
        console.log(JSON.stringify(result));
        if (result.type === 'success') {
          console.log('success', Linking.canOpenURL(result.url));
          history.push(processUrl(result.url));
        }
      } else {
        Linking.openURL(oAuthUrl);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return <SelectOAuth onSelectOAuth={onSelectOAuthSystem} />;
};

export default Oauth;
