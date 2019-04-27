import React from 'react'
import {Icon} from "antd";

const IconText = ({text, onClick, ...rest})=>{
    return <div onClick={onClick}><Icon  {...rest}/>{text}</div>
}
const IconFont = Icon.createFromIconfontCN({
    scriptUrl:'//at.alicdn.com/t/font_1136037_l8422sroj9.js'
})
const View = ()=>{
    return <div>
        <IconText type='like'
            text='12'
            onClick={()=>alert(123)}/>
        <IconFont type='icon-male'/>
    </div>
}
export default IconText
export {View, IconFont}