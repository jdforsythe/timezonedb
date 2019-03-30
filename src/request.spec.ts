/* tslint:disable no-any completed-docs no-implicit-dependencies no-import-side-effect no-unused-expression function-name */
import { suite, test } from 'mocha-typescript';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import { tzdbRequest } from './request';
import { TZDBConfig } from './config';

import * as got from 'got';
import { NoapiTokenError, ApiRequestError, HttpRequestError } from './error';

@suite export class TZDBRequest {

  private gotGetStub: sinon.SinonStub<any>;

  private readonly config: TZDBConfig = {
    apiToken: 'abc123',
    https: true,
    host: 'abc.host.com',
    port: 1234,
    basePath: '/v9.9',
  };

  private readonly req = {
    endpoint: 'get-time-zone',
    req: { zone: 'America/New_York' },
  };

  private readonly exampleResponse: any = {
    body: {
      status: 'OK',
      message: '',
    },
  };

  before() {
    this.gotGetStub = sinon.stub(got, 'get').resolves(this.exampleResponse);
  }

  after() {
    this.gotGetStub.restore();
  }

  @test async 'should throw NoapiTokenError if apiToken is absent'() {
    const cfg = { };

    try {
      await tzdbRequest(cfg, this.req);

      expect('Should have failed').to.be.false;
    }
    catch (ex) {
      expect(ex instanceof NoapiTokenError).to.be.true;
    }
  }

  @test async 'should calculate proper default baseUrl for HTTPS'() {
    await tzdbRequest(this.config, this.req);

    const expected = `https://${this.config.host}:${this.config.port}${this.config.basePath}`;

    expect(this.gotGetStub.getCall(0).args[1].baseUrl).to.equal(expected);
  }

  @test async 'should calculate proper default baseUrl for HTTP'() {
    await tzdbRequest({ ...this.config, https: false }, this.req);

    const expected = `http://${this.config.host}:${this.config.port}${this.config.basePath}`;

    expect(this.gotGetStub.getCall(0).args[1].baseUrl).to.equal(expected);
  }

  @test async 'should throw ApiRequestError if request returns failure'() {
    this.gotGetStub.restore();
    const res: any = { body: { status: 'FAILED' } };
    this.gotGetStub = sinon.stub(got, 'get').resolves(res);

    try {
      await tzdbRequest(this.config, this.req);

      expect('Should have failed').to.be.false;
    }
    catch (ex) {
      expect(ex instanceof ApiRequestError).to.be.true;
    }
  }

  @test async 'should throw ApiRequestError if request throws'() {
    this.gotGetStub.restore();
    this.gotGetStub = sinon.stub(got, 'get').rejects(new HttpRequestError(new Error('Fake error')));

    try {
      await tzdbRequest(this.config, this.req);

      expect('Should have failed').to.be.false;
    }
    catch (ex) {
      expect(ex instanceof HttpRequestError).to.be.true;
    }
  }
}
