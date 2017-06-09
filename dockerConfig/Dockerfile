FROM node:6.2

# Set a varaible for the directory the application lies in
ENV HOMEDIR=/home/app

RUN npm install -g nodemon

RUN mkdir -p $HOMEDIR/filesharing
WORKDIR $HOMEDIR/filesharing

# Copy package.json so we can run npm install
COPY package.json $HOMEDIR/filesharing/


# Install all dependencies
RUN npm install

# Ports generic
#EXPOSE 80:80
#EXPOSE 443:443

# Port 3000 for MEAN.JS server
#EXPOSE 3232:3232

# Port 35729 for livereload
#EXPOSE 35729:35729


#RUN ls

ENV NODE_ENV development # production for staging