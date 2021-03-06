import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class PasswordReset extends PactResource {
  constructor(pactAPI) {
    const path = '/password_reset';

    const methods = {
      sendEmail: pactMethod({
        method: methodTypes.POST,
        payloadParams: ['email'],
      }),
      setNewPassword: pactMethod({
        method: methodTypes.PATCH,
        payloadParams: ['password_reset_token', 'new_password'],
      }),
    };

    super({pactAPI, path, methods});
  }
}
