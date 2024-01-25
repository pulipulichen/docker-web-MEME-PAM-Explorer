# BUILD-USING: docker build -t derbyjs/derby-examples .
# RUN-USING: docker run --name derby-examples --rm derbyjs/derby-examples

# specify base docker image
FROM node:20.2.0-bullseye

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
ENV STARTUP_COMMAND="nodemon /opt/app/index.js"
ENV HOMEPAGE_URI=/

# =================================================================

COPY package.json /opt/
RUN npm install
RUN npm install -g nodemon

# =================================================================

COPY ./docker-build/docker-web/startup.sh /startup.sh