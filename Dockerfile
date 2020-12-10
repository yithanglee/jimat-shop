# Stage 1
FROM node:12 as react-build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
ENV PORT 80

COPY --from=react-build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
