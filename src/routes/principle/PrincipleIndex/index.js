import React,{ Component } from "react";
import { Layout, Row, Col } from "antd";
import PersonalBar from "Components/PersonalBar";
import PersonalContent from 'Components/PersonalContent'
import PersonalProfile from "Components/PersonalProfile";
import 'antd/dist/antd.css'
import { connect } from "dva";

const prizeReducer=(x,y)=>x+y.achievement.score
const blogReducer=(x,y)=>x+y.like_times

class Principle extends Component{

    render() {
        var {blogs, myPrizes, user} = this.props
        const score = myPrizes.reduce(prizeReducer,0)
        const myBlogs = blogs.filter(b=>b.user.id==user.id)
        const like_times = myBlogs.reduce(blogReducer,0)
        user.score = score,
        user.blog_cnt = myBlogs.length
        user.like_times = like_times
        return <Layout>
            <Row>
                <Col span={15}>
                    <PersonalBar user={user}/>
                    <PersonalContent user={user}
                        myBlogs={myBlogs}
                        myPrizes={myPrizes}/>
                </Col>
                <Col span={8} offset={1}>
                    <PersonalProfile user={user}/>
                </Col>
            </Row>
        </Layout>
    }
}

const stateToProps=({users, achievements, blogs})=>({
    user:users.currentUser,
    myPrizes: achievements.myPrizes,
    blogs: blogs.list
})
export default connect(stateToProps)(Principle)