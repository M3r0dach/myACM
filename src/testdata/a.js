var getSolutions =  "/api/v1/solutions?"
    +"page=1&per=10&sort_field=created_at&sort_order=descend&filters[status][]=2&filters[status][]=3"
var response1 = {
    "items":[{
            "id":51,
            "title":"??бз??????иж??",
            "content":"??????bug???иж???б└?иж??ии?????иж??\n\nии?бд????????бзии??ии???????????иибз?",
            "status":2,
            "like_times":7,
            "article_type":"Solution",
            "summary":"??????bug???иж???б└?иж??ии?????иж??\n\nии?бд????????бзии??ии???????????иибз?",
            "created_at":"2019-01-15 07:48:07",
            "updated_at":"2019-03-28 08:47:07",
            "user":{
                "id":2,
                "name":"admin"
            },
            "tags":["?????????ии??"]
        }],
    "meta":{
        "current_page":1,
        "next_page":null,
        "prev_page":null,
        "total_pages":1,
        "total_count":1
    }
}

var getSelfSolutions2 = "http://acm.duxy.me/meter/principal/profile"
var response2 = {
    "items":[],
    "meta":{
        "current_page":1,
        "next_page":null,
        "prev_page":null,
        "total_pages":0,
        "total_count":0
    }
}