const convert = require('xml-js');
const express = require('express');
const request = require('request');


/* 공공기관 API URL 불러오기 */
const HOST = 'https://open.neis.go.kr/hub/mealServiceDietInfo?';
const ATPT_CODE = 'R10'       // 행정코드 (ATPT_OFCDC_SC_CODE)
const SD_CODE = '8750775'   // 학교코드 (SD_SCHUL_CODE)
const MMEAL_CODE = '2'      // 중식 (MMEAL_SC_CODE)
const YMD = '20240923'      // 날짜 (MLSV_YMD)
const $requestURL = `${HOST}ATPT_OFCDC_SC_CODE=${ATPT_CODE}&SD_SCHUL_CODE=${SD_CODE}&MMEAL_SC_CODE=${MMEAL_CODE}&MLSV_YMD=${YMD}`

/* 3000포트로 서버 열기 */
const app = express();
app.listen(3000, ()=> {
    console.log('3000번 포트로 start to listen.')
})

/* 메인 index 파일 호출 */
app.get('/', (req, res) => {
    request.get($requestURL, (err, response, body) => {
        if (err) {
            console.log(`err =>${err}`);
            res.status(500).send('Internet Server Error');
        } else {
            if (response.statusCode == 200) {
                var plantData = [];
                var result = body;
                var data = convert.xml2json(result, {compact : true, space: 4});
                data = JSON.parse(data);
                mmeal = data.mealServiceDietInfo.row.DDISH_NM._cdata;
                mmeal = mmeal.split('<br/>')
                res.send(mmeal)
            }
        }
    })
})