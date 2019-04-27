var api = '/api/v1/articles?page=1&per=10&sort_field=id&sort_order=descend&filters%5Buser_id%5D=2&filters%5Barticle_type%5D=Solution&filters%5Bstatus%5D%5B%5D=1&filters%5Bstatus%5D%5B%5D=2&filters%5Bstatus%5D%5B%5D=3'
var params = {
    page: 1,
    per: 10,
    sort_field: 'id',
    sort_order: 'descend',
    'filters[user_id]': 2,
    'filters[article_type]': 'Solution',
    'filters[status][]': 1,
    'filters[status][]': 2,
    'filters[status][]': 3,
}

const postApi = 'post /api/v1/articles'
const payload = {"title":"title","article_type":"Solution","status":2,"content":"4gq\n# aerga\n1. rareh\n2. 2\n3. rab","tags":["gegag"]}
const data = {"items":[{"id":75,"title":"eag","content":"eaf","status":1,"like_times":0,"article_type":"Solution","summary":"eaf","created_at":"2019-04-12 12:25:55","updated_at":"2019-04-12 12:26:00","user":{"id":2,"name":"admin"},"tags":[]},{"id":71,"title":"一个苹果","content":"1. pen\n2. pen pine apple apple pen","status":1,"like_times":0,"article_type":"Solution","summary":"1. pen\n2. pen pine apple apple pen","created_at":"2019-04-11 09:08:59","updated_at":"2019-04-11 09:08:59","user":{"id":2,"name":"admin"},"tags":[]},{"id":51,"title":"注意事项","content":"如有bug和需求需要反馈\n\n请直接在评论区下留言","status":2,"like_times":7,"article_type":"Solution","summary":"如有bug和需求需要反馈\n\n请直接在评论区下留言","created_at":"2019-01-15 07:48:07","updated_at":"2019-03-28 08:47:07","user":{"id":2,"name":"admin"},"tags":["网站建设"]}],"meta":{"current_page":1,"next_page":null,"prev_page":null,"total_pages":1,"total_count":3}}

module.exports = {
    'GET /api/v1/articles'(req, res) {
        res.json(data)
    },
    'GET /api/v1/articles/:id'(req, res) {
        const id = req.params.id
        const article = data.items.find(
            e=>e.id==id
        )
        res.json({article})
    }
}