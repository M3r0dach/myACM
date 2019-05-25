import React from 'react'
import { Switch ,Route, Redirect } from "dva/router";
import PrincipleIndex from "./PrincipleIndex";
import BlogEdit from './BlogEdit';

const PrincipleLayout = ({match})=>{
    return <Switch>
        <Route path={`${match.path}/blog/create`}
            component={BlogEdit}
        />
        <Route path={`${match.path}/blog/edit/:id`}
            component={BlogEdit}
        />
        <Route path={`${match.path}/:id`}
            component={PrincipleIndex}
        />
        <Redirect to='/principle/index'/>
    </Switch>
}
export default PrincipleLayout