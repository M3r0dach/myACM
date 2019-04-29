import { Link } from "dva/router";
import React from "react";
import {LinkRefresh} from '../../config'
import queryString from "querystring";

const MyLink=({to, target, children, query})=>{
    if(LinkRefresh) 
        return <a href={'/#'+to}>{children}</a>
    else if(target)
        return <a href={to} target={target}>{children}</a>
    else if(query) {
        const search = `?${queryString.stringify(query)}`
        return <Link to={{pathname:to, search:search}}>{children}</Link>
    }
    else 
        return <Link to={to}>{children}</Link>
}
export default MyLink
export const View = ()=>(
    <MyLink to='www.baidu.com' refresh>
    <h1>hello</h1>
    </MyLink>
)