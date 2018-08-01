'use strict';
const jsforce = require('jsforce')
     ,fs = require('fs')
     ,jwt = require("salesforce-jwt-bearer-token-flow")

let conn = null;

module.exports.getSession = options =>{
  return = new Promise((resolve,reject) => {
    if(conn !== null) {
      return resolve(conn);
    }
    
    if(!!options.password) {
      conn = new jsforce.Connection({
      loginUrl : options.loginUrl
      });
      conn.login(options.username, options.password, (error, userInfo) => {
        if (error) return reject(error)
        return resolve(conn);
      });
    } else if(!!options.privateKeyPath) {
      jwt.getToken({
        iss: options.consumerKey,
        sub: options.username,
        aud: options.loginUrl,
        privateKey: fs.readFileSync(options.privateKeyPath).toString('utf8')
      },(error,token) => {
        if(error)return reject(error)
        conn = new jsforce.Connection({
          instanceUrl : token.instance_url,
          accessToken : token.access_token
        });
        return resolve(conn);
      });
    } else {
      return reject('options object do not contains information required to authenticate ' + JSON.stringify(options))
    }
  })
}