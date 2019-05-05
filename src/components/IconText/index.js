import React from 'react'
import {Icon} from "antd";

const IconText = ({text, onClick, ...rest})=>{
    return <div onClick={onClick}><Icon  {...rest}/>{text}</div>
}

export default IconText