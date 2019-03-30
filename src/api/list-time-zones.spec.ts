/* tslint:disable no-any completed-docs no-implicit-dependencies no-import-side-effect no-unused-expression function-name */
import { suite, test } from 'mocha-typescript';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import {
  listTimeZones,
} from './list-time-zones';

import * as request from '../request';
import { TZDBConfig } from '../config';

@suite export class ListTimeZones {
  private tzdbRequestStub: sinon.SinonStub;

  private readonly config: TZDBConfig = {
    premium: false,
    https: true,
    apiToken: 'abcd1234',
  };

  private readonly endpoint = 'list-time-zone';

  private readonly exampleResponse = [{ countryCode: 'US', zoneName: 'America/New_York' }];

  // beforeEach
  before() {
    this.tzdbRequestStub = sinon.stub(request, 'tzdbRequest').resolves(<any> this.exampleResponse);
  }

  // afterEach
  after() {
    this.tzdbRequestStub.restore();
  }

  @test async 'should call to API with proper request'() {
    const req = {
      country: 'US',
      zone: 'America/New_York',
    };

    await listTimeZones(this.config, <any> req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      req,
      endpoint: this.endpoint,
    })).to.be.true;
  }

  @test async 'should join fields array'() {
    const req = {
      country: 'US',
      zone: 'America/New_York',
      fields: ['countryCode', 'zoneName'],
    };

    await listTimeZones(this.config, <any> req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      endpoint: this.endpoint,
      req: {
        ...req,
        fields: req.fields.join(','),
      },
    })).to.be.true;
  }

  @test async 'should keep fields as string'() {
    const req = {
      country: 'US',
      zone: 'America/New_York',
      fields: 'countryName,zoneName',
    };

    await listTimeZones(this.config, <any> req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      req,
      endpoint: this.endpoint,
    })).to.be.true;
  }
}
