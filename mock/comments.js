const API = "/api/v1/articles/51/comments?page=1&per=10&sort_field=created_at&sort_order=descend"
const comments = [{
    "id":3,
    "description":"测试一下",
    "user_id":2,
    "user_name":"admin",
    "user_avatar":"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    "commentable_id":51,
    "commentable_type":"Article",
    "like_times":0,
    "created_at":"2019-04-03 10:29",
    "updated_at":"2019-04-03 10:29",
    "parent_comment":{
        "id":1,
        "description":"父评论",
        "user_id":2,
        "user_name":"admin",
        "user_avatar":"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        "commentable_id":51,
        "commentable_type":"Article",
        "like_times":0,
        "created_at":"2019-04-03 04:16",
        "updated_at":"2019-04-03 04:16"
    }
},{
    "id":2,
    "description":"测试一下",
    "user_id":2,
    "user_name":"admin",
    "user_avatar":"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    "commentable_id":51,
    "commentable_type":"Article",
    "like_times":0,
    "created_at":"2019-04-03 04:26",
    "updated_at":"2019-04-03 04:26",
    "parent_comment":null
},{
    "id":1,
    "description":"测试一下",
    "user_id":2,
    "user_name":"admin",
    "user_avatar":"/uploads/avatar/thumb_user_2.jpg",
    "commentable_id":51,
    "commentable_type":"Article",
    "like_times":0,
    "created_at":"2019-04-03 04:16",
    "updated_at":"2019-04-03 04:16",
    "parent_comment":null
}]
module.exports ={
    'GET /api/v1/articles/:id/comments'(req, res) {
        const id = req.params.id
        const data = comments.filter(
            e=>e.commentable_id==id
        )
        const response = {
            items: data,
            meta: {}
        }
        res.json(response)
    },
}