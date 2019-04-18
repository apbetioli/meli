const needle = require('needle');
const querystring = require('querystring')

var Meli = function (client_id, client_secret, config = {
	api_root_url: 'https://api.mercadolibre.com',
    api_mercado_pago_url: 'https://api.mercadopago.com',
	auth_url: 'https://auth.mercadolibre.com/authorization',
	oauth_url: 'https://api.mercadolibre.com/oauth/token',  
	site_id : 'MLB'
}) {

  var _parameters = {
    client_id: client_id,
    client_secret: client_secret
  };

  this.getAuthURL = function (redirect_uri) {
    var query = {
      response_type: 'code',
      client_id: _parameters.client_id,
      redirect_uri: redirect_uri
    };
    return config.auth_url + "?" + querystring.stringify(query);
  };

  this.authorize = function (code, redirect_uri) {
    var payload = {
      grant_type: 'authorization_code',
      client_id: _parameters.client_id,
      client_secret: _parameters.client_secret,
      code: code,
      redirect_uri: redirect_uri
    };
    console.debug("post " + config.oauth_url + "?" + querystring.stringify(payload));
    return needle('post', config.oauth_url, payload, { json: true }).then(res => {
      if(res.body.error) 
        throw res.body;
      
      _parameters.redirect_uri = redirect_uri;
      return res.body;
    });
  };

  this.refreshAccessToken = function (refresh_token) {
    var payload = {
      grant_type: 'refresh_token',
      client_id: _parameters.client_id,
      client_secret: _parameters.client_secret,
      refresh_token: refresh_token
    };
    console.debug("post " + config.oauth_url + "?" + querystring.stringify(payload));
    return needle('post', config.oauth_url, payload, { json: true }).then(res => {
      if(res.body.error) 
        throw res.body;
      
      return res.body;
    });
  };

  this.request = function (method, path, query = {}, body, options = {
      json: true,
      headers: {
        "Content-Type": "application/json"
      }
    }) {
    var url = config.api_root_url + (path.charAt(0) == '/' ? '' : '/') + path + "?" + querystring.stringify(query);
    console.debug(method + " " + url);
    if(body)
      console.debug(JSON.stringify(body));
    return needle(method, url, JSON.stringify(body), options).then(res => res.body);
  };

  this.get = function (path, query) {
    return this.request("get", path, query);
  };
  
  this.post = function(path, query, body) {
    return this.request("post", path, query, body);
  };
  
  this.upload = function (path, query, body) {
    return this.request("post", path, query, body, {
      multipart: true
    });
  };

  this.put = function (path, query, body) {
    return this.request("put", path, query, body);
  };

  this.delete = function (path, query) {
    return this.request("put", path, query);
  };

};


exports.Meli = Meli;
