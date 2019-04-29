import React from 'react'
import { Menu } from "antd";
import Link from "../Link";

const NavBar = ({items, theme='dark', mode='vertical',...rest})=>{
    const menus = items.map(
        m=> <Menu.Item key={m.key}>
            <Link {...m}>
                    {m.title}
            </Link>
        </Menu.Item>
    )
    return  <Menu theme={theme}
                mode={mode} {...rest}>
                {menus}
            </Menu>
}
export default NavBar;