import http from '../index';

const postMessages = (msg) => {
 http
  .post('messages', {
   idCompany: 1,
   idTeam: 1,
   idUserFrom: 1,
   Text: msg,
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
};

const postSMS = (msg, phone) => {
 console.log({ msg, phone });
 http
  .post('messages/sms', {
   idCompany: 1,
   idTeam: 1,
   idUserFrom: 1,
   ladaCountry: 1,
   Phone: phone,
   Text: msg,
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
};

export { postMessages, postSMS };
