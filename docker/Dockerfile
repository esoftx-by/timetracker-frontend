FROM node:17-alpine as build
WORKDIR /
COPY ./ ./
RUN npm install --omit=dev
RUN npm run build

FROM nginx:1.21.6-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]