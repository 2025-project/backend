# Node.js 이미지를 베이스로 사용
FROM node:18

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 앱 실행
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
