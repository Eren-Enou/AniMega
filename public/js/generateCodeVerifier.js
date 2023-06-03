const crypto = require('crypto');
const axios = require('axios');

// Generate a random code verifier
const codeVerifier = base64URLEncode(crypto.randomBytes(32));

// Generate code challenge from code verifier
const codeChallenge = base64URLEncode(sha256(codeVerifier));

// URL-encode a string
function urlEncode(string) {
  return encodeURIComponent(string);
}

// Base64 URL-encode a string
function base64URLEncode(string) {
  let encoded = Buffer.from(string).toString('base64');
  encoded = encoded.replace(/=/g, '');
  encoded = encoded.replace(/\+/g, '-');
  encoded = encoded.replace(/\//g, '_');
  return encoded;
}

// Compute the SHA-256 hash of a string
function sha256(string) {
  const hash = crypto.createHash('sha256');
  hash.update(string);
  return hash.digest();
}

// Send GET request to authorization endpoint
const clientId = '08f98958d2597bdfffd7c596066a527c';
const redirectUri = 'https://animega.tv';
const state = crypto.randomBytes(16).toString('hex');

const authorizationUrl = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${urlEncode(clientId)}&state=${urlEncode(state)}&redirect_uri=${urlEncode(redirectUri)}&code_challenge=${urlEncode(codeChallenge)}&code_challenge_method=plain`;

axios.get(authorizationUrl)
  .then(response => {
    // Handle the response from MyAnimeList
    console.log(response.data);
    const authorizationCode = response.data;
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
