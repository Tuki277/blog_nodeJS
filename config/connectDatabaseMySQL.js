var mysql = require('mysql')

const connect = mysql.createConnection ({
    host : 'btafswnvrgvg5w36jdyp-mysql.services.clever-cloud.com',
    user : 'usobgfarxiif13wo',
    port : 3306,
    password : 'YR2sFyHrGXEHoQnPD1Gq',
    database : 'btafswnvrgvg5w36jdyp'
})

connect.connect((err) => {
    if (err){
        console.log('connect MySQL database error')
    }
    else {
        console.log('connect MySQL database success')
    }
})

module.exports = connect