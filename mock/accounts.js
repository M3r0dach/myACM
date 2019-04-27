const api = 'http://acm.duxy.me/api/v1/spiders/accounts?page=1&per=10&sort_field=id&sort_order=ascend&filters%5Buser_id%5D=2'
const accounts = [{
    "id":7,
    "nickname":"musashiheart",
    "oj_name":"hdu",
    "solved":198,
    "submitted":214,
    "status":1,
    "user":{
        "id":2,
        "name":"admin"
    },
    "updated_at":"2019-04-11 09:50:58"
},{
    "id":9,
    "nickname":"Merodach",
    "oj_name":"cf",
    "solved":1914,
    "submitted":1914,
    "status":1,
    "user":{
        "id":2,
        "name":"admin"
    },
    "updated_at":"2019-04-11 09:42:59"
}]
const modifyApi = '/api/v1/spiders/accounts/7'
const payload = {"oj_name":"bnu","nickname":"musashiheart","password":"123456"}

module.exports ={
    'GET /api/v1/spiders/accounts'(req, res) {
        console.log(req)
        const response = {
            items: accounts,
            meta: {}
        }
        res.json(response)
    }
}