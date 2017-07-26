const twilio = require('twilio');
const Promise = require('bluebird');

class TwilioInterface {
  /**
   * 
   * @param {{twilioSID:string, twilioAuthToken:string, twilioNumber:string}} options 
   */
  constructor(options) {
    if(!options.twilioSID) {
      let err = new Error('Need twilio SID');
      throw err;
    }
    if(!options.twilioAuthToken) {
      let err = new Error('Need twilio Auth Token');
      throw err;
    }
    if(!options.twilioNumber) {
      let err = new Error('Need twilio number');
      throw err;
    }
    this.twilioNumber = options.twilioNumber;
    this.client = new twilio(options.twilioSID, options.twilioAuthToken);
  }
  /**
   * Sends multiple sms messages given an array of sms capable device numbers.  Will return an array of passing and failing objects.
   * @param {String} body the content of the sms message
   * @param {Array<String>} to list of phone numbers to send message too
   * @returns {Array<<state:string, value:any>>} array of objects that have properties state and value of 'fullfilled' or 'rejected'
   */
  sendMessages(body, to) {
    // array of promises to execute.  Twilio doesn't have batch sms operations.
    return new Promise((resolve, reject) => {
      var que = new Array();
      to.forEach((number, index) => {
        let op = this.client.messages.create({
          body: body,
          to: number,
          from: this.twilioNumber     
        });
        que.push(op);
      });
      
      Promise.all(que.map(promise => {
        return promise.then(
          value => ({state: 'fullfilled', value}),
          value => ({state: 'rejected', value})
        )
      }))
      .then(results => {
        return resolve(results);
      })
      .catch(err => {
        return reject(err);
      });
    });
  }

  sendSingleMessage(body, to) {
    return new Promise((resolve, reject) => {
      this.client.messages.create({
        body: body,
        to: to,
        from: this.twilioNumber
      })
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        return reject(err);
      });
    });
  }
}

module.exports = TwilioInterface;
