import { Component } from "react";
import { Menu, Row, Col, Dropdown, Avatar, Icon, Layout} from "antd";
import { connect } from "dva";
import styles from './index.less'
import ModalFactory from "../ModalFactory";
import NavBar from "../NavBar";

const LoginModal = ModalFactory.LoginModal

const menu = [
    {key: 1, title:'排行榜', to:'/train'},
    {key: 2, title:'题解', to:'/blog'},
    {key: 3, title:'成就', to:'/achievement'},
    {key: 4, title:'我的主页', to:'/principle'},
    {key: 5, content:<a href='http://wiki.duxy.me' target='_black'>WIKI</a>},
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
        return <NavBar items={menu} mode='horizontal' theme='light'/>
    }
    
    render() {
        const {user} = this.props
        return (
          <Row type='flex' align='middle' justify='space-between' className={styles.header}>
            <Col span={4} align='start'>CUIT ACM 校队训练</Col>
            <Col>{this.renderNavbar()}</Col>
            <Col span={4} align='end'>
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