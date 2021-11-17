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
import CheckBox from '@react-native-community/checkbox';

/**
 * A checkbox component for mobile
 */
const Checkbox = (props: any) => {
  const urlCheckbox = props.value;
  const setUrlCheckbox = props.onValueChange;
  return (
    <CheckBox
      value={urlCheckbox}
      onValueChange={setUrlCheckbox}
      tintColors={{
        true: $config.PRIMARY_COLOR,
        false: $config.PRIMARY_FONT_COLOR + 80,
      }}
      tintColor={$config.PRIMARY_FONT_COLOR + 80}
      onCheckColor={$config.PRIMARY_COLOR}
      onTintColor={$config.PRIMARY_COLOR}
    />
  );
};
export default Checkbox;
