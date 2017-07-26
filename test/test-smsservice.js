const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;
const mod = require('../index');
const testConfig = require('./test-config');
chai.use(chaiHttp);

describe('SMS Service Tests', () => {
  let sms = new mod({twilioSID: testConfig.TWILIO_SID, twilioAuthToken: testConfig.TWILIO_AUTH_TOKEN, twilioNumber: testConfig.TWILIO_NUMBER})
  it('it should send a single sms text successfully', (done) => {
    sms.sendSingleMessage('test', testConfig.VALID_SMS_NUMBER)
    .then(result => {
      done();
    })
    .catch(err => {
      expect.fail('Got err', 'Not to get an error');
    });
  });

  it('it should fail to send to an invalid number', (done) => {
    sms.sendSingleMessage('test', testConfig.INVALID_SMS_NUMBER)
    .then(result => {
      expect.fail('Successfully sent to an invalid phone', 'Failure');
    })
    .catch(err => {
      expect(err).to.not.be.null;
      done();
    });
  });

  it('should fail to send to non-sms capable device', (done) => {
    sms.sendSingleMessage('test', testConfig.SEND_TO_NOT_CAPABLE_SMS_DEVICE)
    .then(result => {
      expect.fail('Successfully sent to an invalid phone', 'Failure');
    })
    .catch(err => {
      expect(err).to.not.be.null;
      done();
    });
  });

  it('should send to multiple valid numbers', (done) => {
    sms.sendMessages('test', [testConfig.VALID_SMS_NUMBER, testConfig.VALID_SMS_NUMBER])
    .then(results => {
      expect(results.length).to.equal(2);
      results.forEach(result => {
        expect(result.state).to.equal('fullfilled');
      });
      done();
    })
    .catch(err => {
      expect.fail('Got an error', 'expected no errors');
      done();
    });
  });

  it('should send to multiple mixed numbers', (done) => {
    sms.sendMessages('test', [testConfig.VALID_SMS_NUMBER, testConfig.INVALID_SMS_NUMBER])
    .then(results => {
      expect(results.length).to.equal(2);
      expect(results[0]).to.have.property('state');
      expect(results[0]).to.have.property('value');
      expect(results[0].state).to.equal('fullfilled');
      expect(results[1]).to.have.property('state');
      expect(results[1]).to.have.property('value');
      expect(results[1].state).to.equal('rejected');
      done();
    })
    .catch(err => {
      expect.fail('got an error', 'was not expecting an error')
    });
  });

});