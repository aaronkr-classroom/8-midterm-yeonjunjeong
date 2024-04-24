// main.js
// Capstone 2: Express
"use strict";

const express = require('express'), // express를 요청
    layouts = require('express-ejs-layouts'), // express-ejs-layout의 요청
    homeController = require('./controllers/homeController'),
    errorController = require('./controllers/errorController'),
    app = express(); // express 애플리케이션의 인스턴스화

app.set("port", process.env.PORT || 3000);

/**
 * Listing 12.7 (p. 179)
 * ejs 레이아웃 렌더링
 */
app.set("view engine", "ejs"); // ejs를 사용하기 위한 애플리케이션 세팅
app.use(layouts); // layout 모듈 사용을 위한 애플리케이션 세팅
app.use(express.static("public"));

/**
 * Listing 12.4 (p. 177)
 * body-parser의 추가
 */
app.use(
    express.urlencoded({ // URL 인코드와 JSON 파라미터 처리를 위한 body-parser의 사용을 Express.js에 선언
        extended: false
    })
);
app.use(express.json());

/**
 * Listing 12.6 (p. 178)
 * 각 페이지 및 요청 타입을 위한 라우트 추가
 */
app.get('/', homeController.showHome);
app.get('/courses', homeController.showCourses); // 코스 페이지 위한 라우트 추가
app.get('/contact', homeController.showSignUp); // 연락처 페이지 위한 라우트 추가
//app.post('/contact', homeController.postedSignUp); // 연락처 제출 양식을 위한 라우트 추가
app.get('/thanks',homeController.postedContactForm);//thanks 페이지

/**
 * Listing 12.12 (p. 184)
 * 에러 처리 라우트 
 */
app.use(errorController.pageNotFoundError); // 미들웨어 함수로 에러 처리 추가
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => { // 3000번 포트로 리스닝 설정
    console.log(`Server running at http://localhost:${app.get("port")}`);
});