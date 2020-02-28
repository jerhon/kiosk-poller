FROM node:latest as build

ADD . /app/src
WORKDIR /app/src
RUN npm install \
    && npm run build

FROM nginx:latest
COPY --from=build /app/src/dist/pi-plate /usr/share/nginx/html

EXPOSE 80