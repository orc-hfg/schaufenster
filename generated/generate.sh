#!/bin/sh

rm swagger.json
wget localhost:3104/swagger.json
#swagger-typescript-api -p swagger.json -o ./ -n API_fetch.ts --patch
swagger-typescript-api -p swagger.json -o ./ -n API_fetch_xeio.ts --patch --extract-enums --extract-request-params --extract-request-body --extract-response-body --modular
swagger-typescript-api -p swagger.json -o ./ -n API_fetch_xeio.ts --patch --extract-enums --extract-request-body
#--extract-response-body 
#--disable-throw-on-error 
#--modular
#--unwrap-response-data 
