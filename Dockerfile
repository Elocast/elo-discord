FROM node:12.18

# copy all local files
COPY . /app
WORKDIR /app

RUN npm install

# exposure port
EXPOSE 3000

CMD npm start
