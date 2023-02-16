FROM node:14

WORKDIR /myfolder/
COPY ./pakage.json /myfolder/
COPY ./yarn.lock /myfolder/
RUN yarn install

COPY . /myfolder/
CMD yarn dev