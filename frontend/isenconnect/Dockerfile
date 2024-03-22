FROM node:alpine

WORKDIR /src/app

COPY . /src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["node", "--max-old-space-size=4096", "node_modules/@angular/cli/bin/ng", "build"]