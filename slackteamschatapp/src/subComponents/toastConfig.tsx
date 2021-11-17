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
import {Platform} from 'react-native';
import Toast, { BaseToast }  from '../../react-native-toast-message';
import mobileAndTabletCheck from '../utils/mobileWebTest';

const toastConfig = {
    /* 
      overwrite 'success' type, 
      modifying the existing `BaseToast` component
    */
    success: ({ text1, text2, props, ...rest }) => (
        <BaseToast
            {...rest}
            //BaseToast is modified to have zIndex: 100
            style={{ borderLeftColor: $config.PRIMARY_COLOR, backgroundColor: $config.SECONDARY_FONT_COLOR, width: !mobileAndTabletCheck() ? '40%' : '95%'}}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
                color: $config.PRIMARY_FONT_COLOR,
            }}
            text1={text1}
            text2={text2}
            // text2={props.uuid}
        />
    ),
};

export default toastConfig;