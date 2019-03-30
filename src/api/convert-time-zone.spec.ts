/* tslint:disable no-any completed-docs no-implicit-dependencies no-import-side-effect no-unused-expression function-name */
import { suite, test } from 'mocha-typescript';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import {
  convertTimeZone, ConvertTimeZoneRequest,
} from './convert-time-zone';

import * as request from '../request';
import { TZDBConfig } from '../config';

@suite export class ConvertTimeZone {
  private tzdbRequestStub: sinon.SinonStub;

  private readonly config: TZDBConfig = {
    premium: false,
    https: true,
    apiToken: 'abcd1234',
  };

  private readonly endpoint = 'convert-time-zone';

  private readonly exampleResponse = {
    fromZoneName: 'America/New_York',
    fromAbbreviation: 'EDT',
    fromTimestamp: 1553827498,
    toZoneName: 'Europe/London',
    toAbbreviation: 'GMT',
    toTimestamp: 1553841898,
    offset: 14400,
  };

  // beforeEach
  before() {
    this.tzdbRequestStub = sinon.stub(request, 'tzdbRequest').resolves(<any> this.exampleResponse);
  }

  // afterEach
  after() {
    this.tzdbRequestStub.restore();
  }

  @test async 'should call to API with proper request'() {
    const req: ConvertTimeZoneRequest = {
      from: 'America/New_York',
      to: 'Europe/London',
    };

    await convertTimeZone(this.config, req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      req,
      endpoint: this.endpoint,
    })).to.be.true;
  }

  @test async 'should join fields array'() {
    const req: ConvertTimeZoneRequest = {
      from: 'America/New_York',
      to: 'Europe/London',
      fields: ['toFormatted'],
    };

    await convertTimeZone(this.config, req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      endpoint: this.endpoint,
      req: {
        ...req,
        fields: (<any> req.fields).join(','),
      },
    })).to.be.true;
  }

  @test async 'should keep fields as string'() {
    const req: ConvertTimeZoneRequest = {
      from: 'America/New_York',
      to: 'Europe/London',
      fields: 'toFormatted,offset',
    };

    await convertTimeZone(this.config, req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      req,
      endpoint: this.endpoint,
    })).to.be.true;
  }
}
