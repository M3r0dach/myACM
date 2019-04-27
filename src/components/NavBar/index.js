import React from 'react'
import { Menu } from "antd";
import Link from "../Link";

const NavBar = ({items, theme='dark', mode='vertical',...rest})=>{
    const menus = items.map(
        m=> <Menu.Item key={m.key}>
            {m.to?<Link to={m.to}>
                    {m.title}
                   </Link>:m.content}
        </Menu.Item>
    )
    return  <Menu theme={theme}
                mode={mode} {...rest}>
                {menus}
            </Menu>
}
export default NavBar;