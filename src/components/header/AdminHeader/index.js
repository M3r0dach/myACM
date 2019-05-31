import { Component } from "react";
import { Menu, Row, Col, Dropdown, Avatar, Icon } from "antd";
import { connect } from "dva";
import styles from './index.less'
import {LoginModal} from "Components/ModalFactory";
import NavBar from "Components/NavBar";

const menu = [
    {key: 1, title:'用户管理', to:'/users'},
    {key: 2, title:'题解管理', to:'/blogs'},
    {key: 3, title:'成就管理', to:'/achievements'},
]
class Header extends Component{
    renderDropDownMenu = ()=>{
        const handleClick = ({key})=>{
            console.log(key);
            switch(key) {
                case 'logout':
                    this.props.dispatch({type:'users/logout'})
                    break
            }
        }
        return <Menu onClick={handleClick}>
            {this.props.isLogin?<Menu.Item key='logout'>注销</Menu.Item>:<Menu.Item key='login'><LoginModal/></Menu.Item>}
        </Menu>
    }
    renderNavbar = ()=>{
        return <NavBar items={menu} mode='horizontal' theme='dark'/>
    }
    
    render() {
        const {user} = this.props
        return (
          <Row type='flex' align='middle' justify='space-between' className={styles.header}>
            <Col span={6} align='start'>
                <b>CUIT ACM 管理后台</b>
            </Col>
            <Col>{this.renderNavbar()}</Col>
            <Col span={6} align='end'>
                <Dropdown overlay={this.renderDropDownMenu}>
                    <span className="ant-dropdown-link" href="#" style={{cursor:'pointer'}}>
                    <Avatar src={user.avatar.origin} alt='aaa'/> {user&&user.nickname}<Icon type="down" />
                    </span>
                </Dropdown>
            </Col>
          </Row>
        )
    }
}
const stateToProps = ({users}) =>{
    console.log('users:')
    console.log(users)
    return ({
        user: users.currentUser,
        isLogin: users.isLogin,
    })
}
export default connect(stateToProps)(Header);