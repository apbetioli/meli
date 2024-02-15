# Meli

Mercado Libre SDK for Node.js that supports promises.

[![npm version](https://img.shields.io/npm/v/meli.svg)](https://www.npmjs.com/package/meli)
[![npm downloads](https://img.shields.io/npm/dt/meli.svg)](https://www.npmjs.com/package/meli)

## Install  
`npm install meli`

## Usage
```
import meli from 'meli';
...

var client = new meli.Meli(client_id, client_secret, [access_token], [refresh_token]);

const categories = await client.get('sites/MLA/categories');

console.log(categories);

/** prints to the console:
[ 
	{ id: 'MLA5725', name: 'Accesorios para Vehículos' },
	{ id: 'MLA1071', name: 'Animales y Mascotas' },
	{ id: 'MLA1367', name: 'Antigüedades' },
	{ id: 'MLA1368', name: 'Arte y Artesanías' },
	{ id: 'MLA1743', name: 'Autos, Motos y Otros' },
	{ id: 'MLA1384', name: 'Bebés' },
	...
]
*/

```

## API

|Field|Type|Required|Description|
|-----|----|--------|-----------|
|client_id|int|yes|ID provided when creating a MELI APP (link to create app guide)|
|client_secret|	string|	yes|	Hash string key provided when creating a MELI APP (link to create app guide)|
|access_token	|string|	optional|	Used to talk to our API resources that require credentials (eg: POST to /items).|
|refresh_token|	string|	optional|	Hash string provided when a user authorizes an A P. Used to get a new valid access_token (only available when offline_access scope in APP settings is checked).|

### Authorization
#### getAuthURL
```
meliObject.getAuthURL(redirect_uri)
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
redirect_uri|string|yes|Callback URL to which the user will be redirected after granting permission to the Meli APP. The code required to obtain the first access_token (required in Authorize method) will be appended to this URL when making this redirect.|
returns `string`
#### authorize
```
meliObject.authorize(code, redirect_uri) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
code|string|yes|Code received at redirect_uri when user granted permission to the Meli APP.|
redirect_uri|string|yes|Callback URL to which the API will send the access & refresh tokens. It must be the same as the one configured in the Meli APP settings.|
#### refreshAccessToken
```
meliObject.refreshAccessToken() 
```

### Request
#### get
```
meliObject.get(path, [params,]) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the GET request will be sent.|
params|object|optional|Additional params (if required).|
#### post
```
meliObject.post(path, body, [params,]) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the POST request will be sent.|
body|object|yes|Body to be sent when executing the POST request.
params|object|optional|Additional params (if required).|
#### upload (post with multipart)
```
meliObject.upload(path, body, [params,]) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the POST request will be sent.|
body|object|yes|Body to be sent when executing the POST request.
params|object|optional|Additional params (if required).|
#### put
```
meliObject.put(path, body, [params,]) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the PUT request will be sent.|
body|object|yes|Body to be sent when executing the PUT request.
params|object|optional|Additional params (if required).|
#### delete
```
meliObject.delete(path, [params,]) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the DELETE request will be sent.|
params|object|optional|Additional params (if required).|

