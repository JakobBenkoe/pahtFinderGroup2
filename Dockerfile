FROM node:13-alpine
EXPOSE 8000

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm install

COPY . /home/app

RUN npm run build

CMD npm run start