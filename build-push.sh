#!/bin/bash

ng build  --configuration production

docker login --username  cfaife --password Codecode@1

docker image build -t mtoca-web-admin:latest .
 
docker image tag mtoca-web-admin:latest cfaife/mtoca-web-admin:latest

docker image push cfaife/mtoca-web-admin:latest

