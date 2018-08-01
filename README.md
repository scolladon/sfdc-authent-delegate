# sfdc-authent-delegate

Authentication delegate for Salesforce

## Setup

```
$ npm init
$ npm install sfdc-authent-delegate
```

## How to use

```javascript
const sad = require('sfdc-authent-delegate');

// Username password
sad.getSession({
  username: process.env.SF_USERNAME,
  password: process.env.SF_PASSWORD,
  loginUrl: process.env.SF_SERVERURL
})
.then(conn => {conn.describeGlobal((err, res) => {
  if (err) { return console.error(err); }
  console.log('Num of SObjects : ' + res.sobjects.length);
})})

// Or JWT :
sad.getSession({
  username: process.env.SF_USERNAME,
  loginUrl: process.env.SF_SERVERURL,
  consumerKey: process.env.SF_CONSUMERKEY,
  privateKeyPath: process.env.SF_PRIVATEKEYPATH
})
.then(conn => {conn.describeGlobal((err, res) => {
  if (err) { return console.error(err); }
  console.log('Num of SObjects : ' + res.sobjects.length);
})})
```
