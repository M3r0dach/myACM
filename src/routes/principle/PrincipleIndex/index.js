import React from "react";
import { Layout, Row, Col } from "antd";
import PersonalBar from "Components/PersonalBar";
import PersonalContent from 'Components/PersonalContent'
import PersonalProfile from "Components/PersonalProfile";
import 'antd/dist/antd.css'

const Principle=()=> {
    return <Layout>
        <Row>
            <Col span={15}>
                <PersonalBar/>
                <PersonalContent/>
            </Col>
            <Col span={8} offset={1}>
                <PersonalProfile/>
            </Col>
        </Row>
    </Layout>
}

export default Principle