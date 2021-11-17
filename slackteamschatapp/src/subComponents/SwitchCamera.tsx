import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import RtcContext, {DispatchType} from '../../agora-rn-uikit/src/RtcContext';
import BtnTemplate from '../../agora-rn-uikit/src/Controls/BtnTemplate';

function SwitchCamera() {
  const {RtcEngine} = useContext(RtcContext);
  return (
    <BtnTemplate
      name={'switchCamera'}
      btnText={'Switch'}
      style={{
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
      }}
      onPress={() => {
        RtcEngine.switchCamera();
      }}
    />
  );
}

export default SwitchCamera;
