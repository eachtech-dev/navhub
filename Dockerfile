FROM node:12.20.0

WORKDIR /app

ARG PORT=3000
ARG API_URL

ENV PORT=${PORT}
ENV API_URL=${API_URL}

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./

RUN yarn build

CMD "yarn" "start"
