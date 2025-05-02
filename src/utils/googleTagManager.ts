import TagManager from 'react-gtm-module';
import { environment } from '../environments/environment';

export const googleTagManagerInitializer = () => {
  const tagManagerArgs = {
    gtmId: environment.GTM_ID
  };

  TagManager.initialize(tagManagerArgs);
}