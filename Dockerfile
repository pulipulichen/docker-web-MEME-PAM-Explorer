# BUILD-USING: docker build -t derbyjs/derby-examples .
# RUN-USING: docker run --name derby-examples --rm derbyjs/derby-examples

# specify base docker image
FROM node:21.2.0-bullseye

# =================================================================
# For docker web

RUN apt-get update
RUN apt-get install -y curl wget nano rsync mlocate vim

CMD ["bash", "/startup.sh"]
WORKDIR /opt/

# =================================================================
# For docker web

ENV LOCAL_PORT=80
ENV LOCAL_VOLUMN_PATH=/opt/app/
ENV WAIT_FOR_SERVICE="echo 'Server is up'"
ENV STARTUP_COMMAND="nodemon -L /opt/app/index.js"
ENV HOMEPAGE_URI=/

# =================================================================

RUN npm install -g nodemon

COPY package.json /opt/
RUN npm install

# =================================================================

COPY ./docker-build/docker-web/wait-for-it.sh /wait-for-it.sh
COPY ./docker-build/docker-web/startup.sh /startup.sh