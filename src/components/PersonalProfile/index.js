import React from 'react'
import { Icon, Card } from "antd";
import ModalFactory from "../ModalFactory";
import { connect } from "dva";

const ProfileModal = ModalFactory.ProfileModal
const PersonalProfile=({user, guest})=>{
    return <div>
        <Card title='个人简介' extra={guest?[]:[<ProfileModal/>]}>
            <p>{user.description}</p>
            <p><Icon type='environment'/>:
                {user.user_info.school+" "+user.user_info.college}
            </p>
        </Card>
        <Card title='相关链接'>
            <p><Icon type='github'/>:
                <a href={'//'+user.user_info.phone}>
                    {user.user_info.phone}
                </a>
            </p>
            <p><Icon type='mail'/>:
                <a href={'mailto://'+user.user_info.email}>
                    {user.user_info.email}
                </a>
            </p>
            <p><Icon type='book'/>:
                <a href={'//'+user.user_info.situation}>
                    {user.user_info.situation}
                </a>
            </p>
        </Card>
    </div>
}
const stateToProps = ({users})=>{
    return {
        guest: users.displayUser.id!=users.currentUser.id,
        user: users.displayUser,
    }
}
export default connect(stateToProps)(PersonalProfile)