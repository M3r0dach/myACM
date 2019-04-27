import { Link } from "dva/router";
import React from "react";
import {LinkRefresh} from '../../config'

const MyLink=({to, children})=>{
    if(LinkRefresh) {
        return <a href={'/#'+to}>{children}</a>
    }else {
        return <Link to={to}>{children}</Link>
    }
}
export default MyLink
export const View = ()=>(
    <MyLink to='www.baidu.com' refresh>
    <h1>hello</h1>
    </MyLink>
)