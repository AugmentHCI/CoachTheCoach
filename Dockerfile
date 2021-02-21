#https://mherman.org/blog/dockerizing-a-react-app/
# pull official base image
FROM node:14.5.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
#install react-script globally
RUN npm install react-scripts@4.0.1 -g

# add app
COPY . ./

# start app
CMD ["npm", "start"]

