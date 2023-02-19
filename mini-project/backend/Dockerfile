FROM node:14

WORKDIR /myfolder/
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
RUN yarn install --network-timeout=600000

COPY . /myfolder/

CMD yarn dev