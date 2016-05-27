import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Action extends PactResource {
  constructor(pactAPI) {
    const path = '/actions';

    const methods = {
      create: pactMethod({
        method: methodTypes.POST,
      }),
    };

    super({pactAPI, path, methods});
  }
}
