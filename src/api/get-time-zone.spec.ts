/* tslint:disable no-any completed-docs no-implicit-dependencies no-import-side-effect no-unused-expression function-name */
import { suite, test } from 'mocha-typescript';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import {
  getTimeZoneByZone,
  getTimeZoneByPosition,
} from './get-time-zone';

import * as request from '../request';
import { TZDBConfig } from '../config';

@suite export class GetTimeZoneByZone {
  private tzdbRequestStub: sinon.SinonStub;

  private readonly config: TZDBConfig = {
    premium: false,
    https: true,
    apiToken: 'abcd1234',
  };

  private readonly endpoint = 'get-time-zone';

  private readonly exampleResponse = {
    countryCode: 'US',
    countryName: 'United States',
    zoneName: 'America/New_York',
    abbreviation: 'EDT',
    gmtOffset: -14400,
    zoneStart: 1552201200,
    zoneEnd: 1572760799,
    timestamp: 1553811304,
    formatted: '2019-03-28 22:15:04',
    dst: false,
  };

  // beforeEach
  before() {
    this.tzdbRequestStub = sinon.stub(request, 'tzdbRequest').resolves(<any> this.exampleResponse);
  }

  // afterEach
  after() {
    this.tzdbRequestStub.restore();
  }

  @test async 'should call to API with proper request, adding by:zone'() {
    const req = { zone: 'America/New_York' };

    await getTimeZoneByZone(this.config, req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      endpoint: this.endpoint,
      req: {
        by: 'zone',
        ...req,
      },
    })).to.be.true;
  }

  @test async 'should join fields array'() {
    const req = {
      zone: 'America/New_York',
      fields: ['countryCode', 'zoneName'],
    };

    await getTimeZoneByZone(this.config, <any> req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      endpoint: this.endpoint,
      req: {
        by: 'zone',
        ...req,
        fields: req.fields.join(','),
      },
    })).to.be.true;
  }

  @test async 'should keep fields as string'() {
    const req = {
      zone: 'America/New_York',
      fields: 'countryCode,zoneName',
    };

    await getTimeZoneByZone(this.config, <any> req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      endpoint: this.endpoint,
      req: {
        by: 'zone',
        ...req,
      },
    })).to.be.true;
  }

  @test async 'should map result'() {
    const req = { zone: 'America/New_York' };

    const actual: any = await getTimeZoneByZone(this.config, req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(actual).to.not.be.undefined;

    // the "status" and "message" properties should be absent
    expect(actual.status).to.be.undefined;
    expect(actual.message).to.be.undefined;

    // the other properties should be present
    expect(actual.countryCode).to.equal(this.exampleResponse.countryCode);
    expect(actual.countryName).to.equal(this.exampleResponse.countryName);
  }
}

@suite export class GetTimeZoneByPosition {
  private tzdbRequestStub: sinon.SinonStub;

  private readonly config: TZDBConfig = {
    premium: false,
    https: true,
    apiToken: 'abcd1234',
  };

  private readonly endpoint = 'get-time-zone';

  private readonly exampleResponse = {
    countryCode: 'US',
    countryName: 'United States',
    zoneName: 'America/New_York',
    abbreviation: 'EDT',
    gmtOffset: -14400,
    zoneStart: 1552201200,
    zoneEnd: 1572760800,
    timestamp: 1553811222,
    formatted: '2019-03-28 22:13:42',
    dst: false,
  };

  // beforeEach
  before() {
    this.tzdbRequestStub = sinon.stub(request, 'tzdbRequest').resolves(<any> this.exampleResponse);
  }

  // afterEach
  after() {
    this.tzdbRequestStub.restore();
  }

  @test async 'should call to API with proper request, adding by:position'() {
    const req = {
      lat: '40.9009',
      lng: '-80.8568',
    };

    await getTimeZoneByPosition(this.config, req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      endpoint: this.endpoint,
      req: {
        by: 'position',
        ...req,
      },
    })).to.be.true;
  }

  @test async 'should join fields array'() {
    const req = {
      lat: '40.9009',
      lng: '-80.8568',
      fields: ['countryCode', 'zoneName'],
    };

    await getTimeZoneByPosition(this.config, <any> req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      endpoint: this.endpoint,
      req: {
        by: 'position',
        ...req,
        fields: req.fields.join(','),
      },
    })).to.be.true;
  }

  @test async 'should keep fields as string'() {
    const req = {
      lat: '40.9009',
      lng: '-80.8568',
      fields: 'countryCode,zoneName',
    };

    await getTimeZoneByPosition(this.config, <any> req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(this.tzdbRequestStub.calledWith(this.config, {
      endpoint: this.endpoint,
      req: {
        by: 'position',
        ...req,
      },
    })).to.be.true;
  }

  @test async 'should map result'() {
    const req = {
      lat: '40.9009',
      lng: '-80.8568',
    };

    const actual: any = await getTimeZoneByPosition(this.config, req);

    expect(this.tzdbRequestStub.called).to.be.true;

    expect(actual).to.not.be.undefined;

    // the "status" and "message" properties should be absent
    expect(actual.status).to.be.undefined;
    expect(actual.message).to.be.undefined;

    // the other properties should be present
    expect(actual.countryCode).to.equal(this.exampleResponse.countryCode);
    expect(actual.countryName).to.equal(this.exampleResponse.countryName);
  }
}
