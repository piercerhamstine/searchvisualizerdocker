FROM node:lts as APP

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY /src ./src
COPY /public ./public

RUN npm ci
RUN npm run build

####################################################
FROM nginx:1.21.0-alpine
COPY --from=APP /app/build /user/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]