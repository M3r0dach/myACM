import React from "react";
import { Switch, Route, Redirect } from "dva/router";
import BlogIndex from "./BlogIndex"
import BlogDetail from "./detail"

const BlogLayout = ({match})=>{
    console.log('match:')
    console.log(match)
    return <Switch>
        <Route path={`${match.path}/index`} exact component={BlogIndex}/>
        <Route path={`${match.path}/detail/:id`} component={BlogDetail}/>
        <Redirect to={`${match.path}/index`}/>
    </Switch>
}
export default BlogLayout;