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
import {TextInputProps, StyleSheet, TextInput, Platform} from 'react-native';
import {textInput} from '../../theme.json';
import ColorContext from '../components/ColorContext';

const PrimaryButton = (props: TextInputProps) => {
  const {primaryColor} = useContext(ColorContext);
  const {style, ...otherProps} = props;
  return (
    <TextInput
      style={[styles.textInput, style, styles.noOutline, {borderColor: primaryColor, color: $config.PRIMARY_FONT_COLOR}]}
      placeholderTextColor={$config.PRIMARY_FONT_COLOR + '70'}
      {...otherProps}
      autoCorrect={false}
    />
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  textInput,
  noOutline: Platform.OS === 'web' ? { outlineStyle: "none" } : {},
});
