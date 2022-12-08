# multiple, build first and then with nginx
# FROM node:16 as builder
FROM node:16

WORKDIR /app

COPY . .

RUN npm ci
EXPOSE 3000

CMD ["npm", "run", "build-prd"]

#
# FROM nginx as production
# ENV NODE_ENV production

# COPY --from=builder /app/.next /usr/share/nginx/html

# # 静态托管,直接使用默认配制就差不多了
# ADD nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]