var ApiBuilder = require('claudia-api-builder'), api = new ApiBuilder(),
    twilio = require('twilio')('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

module.exports = api;

api.post('/sms-updates', function(req) {
  // This logic is just here to handle if a location was not included with your
  // tracking number that you are requesting.
	var body = req.body,
	    trackingStatus = body.tracking_status,
      trackingLocation = '';
      
  if (trackingStatus.location) {
    if (trackingStatus.location.city) {
      trackingLocation = trackingStatus.location.city + ', ' |
          trackingStatus.location.state
    }
  } else {
    trackingLocation = 'UNKNOWN';
  }

  return twilio
      .sendMessage({
        to: '+1-TEST_NUMBER',      // This should be your destination number
        from: '+1-TWILIO_NUMBER',  // This is your Twilio number in your account
        body: 'Tracking #: ' + body.tracking_number +
              '\nStatus: ' + trackingStatus.status +
              '\nLocation: ' + trackingLocation
      })
      .then(function(
          success) {  // We are using a promise here to help Claudiajs
                      //  make sure the request is executed, otherwise
                      //  our function will exit before it executes
        console.log(success);
      })
      .catch(function(error) {
        console.log(error);
      });
});
