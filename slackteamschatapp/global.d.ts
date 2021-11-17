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
// import statements are not allowed in global configs
type VideoProfile =
  | '120p_1'
  | '120p_3'
  | '180p_1'
  | '180p_3'
  | '180p_4'
  | '240p_1'
  | '240p_3'
  | '240p_4'
  | '360p_1'
  | '360p_3'
  | '360p_4'
  | '360p_6'
  | '360p_7'
  | '360p_8'
  | '360p_9'
  | '360p_10'
  | '360p_11'
  | '480p_1'
  | '480p_2'
  | '480p_3'
  | '480p_4'
  | '480p_6'
  | '480p_8'
  | '480p_9'
  | '480p_10'
  | '720p_1'
  | '720p_2'
  | '720p_3'
  | '720p_5'
  | '720p_6';

interface ConfigInterface {
  PRODUCT_ID: string;
  APP_NAME: string;
  LOGO: string;
  APP_ID: string;
  PRIMARY_COLOR: string;
  FRONTEND_ENDPOINT: string;
  BACKEND_ENDPOINT: string;
  PSTN: boolean;
  PRECALL: boolean;
  CHAT: boolean;
  CLOUD_RECORDING: boolean;
  SCREEN_SHARING: boolean;
  CLIENT_ID: string;
  LANDING_SUB_HEADING: string;
  BG: string;
  ENCRYPTION_ENABLED: boolean;
  PROFILE: VideoProfile;
  PRIMARY_FONT_COLOR: string;
  SECONDARY_FONT_COLOR: string;
  SENTRY_DSN: string;
  ENABLE_GOOGLE_OAUTH: boolean;
  ENABLE_SLACK_OAUTH: boolean;
  ENABLE_MICROSOFT_OAUTH: boolean;
  ENABLE_APPLE_OAUTH: boolean;
  GOOGLE_CLIENT_ID: string;
  MICROSOFT_CLIENT_ID: string;
  SLACK_CLIENT_ID: string;
  APPLE_CLIENT_ID: string;
}
declare var $config: ConfigInterface;
