FROM nodejs:latest as build

ADD * /app/src
WORKDIR /app/src
RUN npm install
    && npm run build

FROM nginx:latest
COPY --from /app/src/dist/kisok-nameplate /usr/share/nginx/html

EXPOSE 80