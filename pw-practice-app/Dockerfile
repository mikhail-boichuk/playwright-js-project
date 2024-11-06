FROM mcr.microsoft.com/playwright:v1.48.0-noble

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install --force && npx playwright install