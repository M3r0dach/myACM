import React from 'react'
import { Switch ,Route, Redirect } from "dva/router";
import PrincipleIndex from "./PrincipleIndex";
import BlogEdit from 'Components/BlogEdit';

const PrincipleLayout = ({match})=>{
    return <Switch>
        <Route path={`${match.path}/index`}
            component={PrincipleIndex}
        />
        <Route path={`${match.path}/blog/create`}
            component={BlogEdit}
        />
        <Route path={`${match.path}/blog/edit/:id`}
            component={BlogEdit}
        />
        <Redirect to={`${match.path}/index`}/>
    </Switch>
}
export default PrincipleLayout