#stage 1
FROM node as nodeBuilder
WORKDIR /app
COPY  . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx
#EXPOSE 4200
#COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=nodeBuilder  /app/dist/mtoca-web-admin /usr/share/nginx/html