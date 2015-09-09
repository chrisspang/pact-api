import HTTPRequestable from '../modules/HTTPRequestable';
import superagent from 'superagent';

const fakeUrl = 'The human torch was denied a bank loan';
const fakeToken = 'The arsonist had oddly shaped feet';
const fakePayload = 'Unique New York';
const fakeCallback = sinon.spy();

describe('HTTPRequestable', () => {

  let instance;

  const reqMethods = {};

  const typeSpy = sinon.stub().returns(reqMethods);
  const sendSpy = sinon.stub().returns(reqMethods);
  const authSpy = sinon.stub().returns(reqMethods);
  const endSpy = sinon.stub().returns(reqMethods);

  reqMethods.type = typeSpy;
  reqMethods.send = sendSpy;
  reqMethods.auth = authSpy;
  reqMethods.end = endSpy;

  ['get', 'put', 'post', 'del'].forEach((method) => {
    sinon.stub(superagent, method).returns(reqMethods);
  });

  beforeEach(() => {
    instance = new HTTPRequestable();
    typeSpy.reset();
    sendSpy.reset();
    authSpy.reset();
    endSpy.reset();
    fakeCallback.reset();
  });

  describe('_get', () => {
    it(`GETs the given URL`, () => {
      instance._get(fakeUrl);
      assert.ok(superagent.get.calledOnce);
      assert.ok(superagent.get.calledWith(fakeUrl));
    });

    it(`Sets authentication when a token is present`, () => {
      instance.setToken(fakeToken);
      instance._get(fakeUrl, fakeCallback);
      assert.ok(authSpy.calledWith(fakeToken, ''));
    });

    it(`Does not use auth when there's no token present`, () => {
      instance._get(fakeUrl, fakeCallback);
      assert.notOk(authSpy.calledOnce);
    });

    it(`Has it's callback called when the request ends`, () => {
      instance._get(fakeUrl, fakeCallback);
      assert.ok(endSpy.calledWith(fakeCallback));
    });
  });

  describe('_post', () => {
    it(`POSTs to the given URL`, () => {
      instance._post(fakeUrl);
      assert.ok(superagent.post.calledOnce);
      assert.ok(superagent.post.calledWith(fakeUrl));
    });

    it(`Sets authentication when a token is present`, () => {
      instance.setToken(fakeToken);
      instance._post(fakeUrl);
      assert.ok(authSpy.calledWith(fakeToken, ''));
    });

    it(`Does not use auth when there's no token present`, () => {
      instance._post(fakeUrl);
      assert.notOk(authSpy.calledOnce);
    });

    it('Sets the payload type to "form"', () => {
      instance._post(fakeUrl);
      assert.ok(typeSpy.calledWith('form'));
    });

    it('Sends the given payload', () => {
      instance._post(fakeUrl, fakePayload);
      assert.ok(sendSpy.calledWith(fakePayload));
    });

    it(`Has it's callback called when the request ends`, () => {
      instance._post(fakeUrl, fakePayload, fakeCallback);
      assert.ok(endSpy.calledWith(fakeCallback));
    });
  });

  describe('_put', () => {
    it(`PUTs to the given URL`, () => {
      instance._put(fakeUrl);
      assert.ok(superagent.put.calledOnce);
      assert.ok(superagent.put.calledWith(fakeUrl));
    });

    it(`Sets authentication when a token is present`, () => {
      instance.setToken(fakeToken);
      instance._post(fakeUrl);
      assert.ok(authSpy.calledWith(fakeToken, ''));
    });

    it(`Does not use auth when there's no token present`, () => {
      instance._post(fakeUrl);
      assert.notOk(authSpy.calledOnce);
    });

    it('Sends the given payload', () => {
      instance._post(fakeUrl, fakePayload);
      assert.ok(sendSpy.calledWith(fakePayload));
    });

    it(`Has it's callback called when the request ends`, () => {
      instance._post(fakeUrl, fakePayload, fakeCallback);
      assert.ok(endSpy.calledWith(fakeCallback));
    });
  });

  describe('_del', () => {
    it(`DELETEs at the given URL`, () => {
      instance._del(fakeUrl);
      assert.ok(superagent.del.calledOnce);
      assert.ok(superagent.del.calledWith(fakeUrl));
    });

    it(`Sets authentication when a token is present`, () => {
      instance.setToken(fakeToken);
      instance._post(fakeUrl);
      assert.ok(authSpy.calledWith(fakeToken, ''));
    });

    it(`Does not use auth when there's no token present`, () => {
      instance._post(fakeUrl);
      assert.notOk(authSpy.calledOnce);
    });

    it(`Has it's callback called when the request ends`, () => {
      instance._post(fakeUrl, fakePayload, fakeCallback);
      assert.ok(endSpy.calledWith(fakeCallback));
    });
  });
});