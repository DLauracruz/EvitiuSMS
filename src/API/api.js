import http from './index';

// Basic CRUD:
// index  <- GET all items
// single <- GET single item by id
// create <- POST an item
// update <- PUT data to an item
// remove <- DELETE an item

const EPMessages = {
 createMessage: (msg) =>
  http
   .post('messages', {
    idCompany: 1,
    idTeam: 1,
    idUserFrom: 1,
    Text: msg,
   })
   .then(() => true)
   .catch(() => false),
};

const EPSms = {
 createSms: (msg, phone) =>
  http
   .post('messages/sms', {
    idCompany: 1,
    idTeam: 1,
    idUserFrom: 1,
    ladaCountry: 1,
    Phone: 9096841019,
    Text: msg,
   })
   .then(() => true)
   .catch(() => false),
};

const EPCompanies = {
 singleCompany: (user = 4) =>
  http(`companies/user/${user}`)
   .then(() => true)
   .catch(() => false),
 indexCompanies: () =>
  http('companies/1')
   .then(() => true)
   .catch(() => false),
};

export { EPMessages, EPSms, EPCompanies };
