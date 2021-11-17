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
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';
import {primaryButton, primaryButtonText} from '../../theme.json';
import ColorContext from '../components/ColorContext';

export interface ButtonProps extends PressableProps {
  text?: string;
}

export default function PrimaryButton(props: ButtonProps) {
  const {primaryColor} = useContext(ColorContext);
  const {children, ...otherProps} = props;
  return (
    <Pressable
      style={[
        styles.primaryButton,
        {backgroundColor: props.disabled ? primaryColor + '80' : primaryColor},
      ]}
      {...otherProps}>
      {props.text ? (
        <Text style={[styles.primaryButtonText as StyleProp<TextStyle>, {color: '#fff'}]}>
          {props.text}
        </Text>
      ) : (
        <></>
      )}
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton,
  primaryButtonText,
});
