/**
 * Twilio testing numbers "from value":
 * +15005550001	This phone number is invalid.	21212
 *  +15005550007	This phone number is not owned by your account or is not SMS-capable.	21606
 * +15005550008	This number has an SMS message queue that is full.	21611
 * +15005550006	This number passes all validation.	No error
 * All Others	This phone number is not owned by your account or is not SMS-capable.	21606
 * 
 * Twilio testing numbers "to value"
 * +15005550001	This phone number is invalid.	21211
 * +15005550002	Twilio cannot route to this number.	21612
 * +15005550003	Your account doesn't have the international permissions necessary to SMS this number.	21408
 * +15005550004	This number is blacklisted for your account.	21610
 * +15005550009	This number is incapable of receiving SMS messages.	21614
 * All Others	Any other phone number is validated normally.	Input-dependent
 */
module.exports = {
  VALID_SMS_NUMBER: '15005550006',
  QUEUE_FULL: '15005550008',
  NOT_OWNED: '15005550007',
  INVALID_SMS_NUMBER: '15005550001',
  SEND_TO_NOT_CAPABLE_SMS_DEVICE: '15005550009',
  TWILIO_SID: process.env.TWILIO_SID || 'ACf196fa8a98647c24401598d84205a7b5',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '1b132a872a8bfa064ed753afc823c999',
  TWILIO_NUMBER: process.env.TWILIO_NUMBER || '+15005550006'
}