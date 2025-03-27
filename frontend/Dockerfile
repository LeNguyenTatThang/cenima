# Sử dụng Node.js 20 làm base image
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app

# Cài đặt Yarn
RUN corepack enable && yarn set version stable

# Copy package.json và yarn.lock trước để cài dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy toàn bộ code frontend vào container
COPY . .

# Build ứng dụng React
RUN yarn build

# Mở port cho frontend
EXPOSE 3000

# Chạy ứng dụng frontend
CMD ["yarn", "dev"]
