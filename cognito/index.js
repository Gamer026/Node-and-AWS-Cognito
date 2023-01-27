const AwsConfig = require('./../lib/AwsConfig');
function signUp(email, password, name) {
  return new Promise((resolve) => {
    // AwsConfig.initAWS ();
    AwsConfig.setCognitoAttributeList(name);
    AwsConfig.getUserPool().signUp(email, password, AwsConfig.getCognitoAttributeList(), null, function (err, result) {
      if (err) {
        return resolve({ statusCode: 400, response: err });
      }
      const response = {
        Status: 'UserCreated Successfully',
        username: result.user.username,
        userConfirmed: result.userConfirmed,
      }
      return resolve({ statusCode: 200, response: response });
    });
  });
}

function verify(email, code) {
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).confirmRegistration(code, true, (err, result) => {
      if (err) {
        return resolve({ statusCode: 401, response: err });
      }
      return resolve({ statusCode: 200, response: result });
    });
  });
}

function signIn(email, password) {
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).authenticateUser(AwsConfig.getAuthDetails(email, password), {
      onSuccess: (result) => {
        const token = {
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        }
        return resolve({ statusCode: 200, response: AwsConfig.decodeJWTToken(token) });
      },

      onFailure: (err) => {
        return resolve({ statusCode: 400, response: err.message || JSON.stringify(err) });
      },
    });
  });
}
function forgotPassword(email) {
  return new Promise(resolve => {
    AwsConfig.getCognitoUser(email).forgotPassword({
      onSuccess: (result) => {
        return resolve({ status: 200, response: result })
      },
      onFailure: (err) => {
        return resolve({ statusCode: 400, response: err.message || JSON.stringify(err) });
      },
    })
  })
}
const confirmPassword = () => {
  return new Promise(resolve => {
    AwsConfig.getCognitoUser(email).confirmPassword(confirmationCode, password, {
       onSuccess: (result) =>{
        return resolve({ status: 200, response: result })
      },
      onFailure: (err) =>{
        return resolve({ statusCode: 400, response: err.message || JSON.stringify(err) });
      },
    })
  })
}

module.exports = {
  signUp,
  verify,
  signIn,
  forgotPassword,
  confirmPassword
}