import React from 'react';
import { connect } from 'dva';
import { Layout} from "antd";
import { Route, Switch, Redirect } from 'dva/router';
import AchievementLayout from "./achievement";
import BlogLayout from "./blog";
import TrainLayout from "./train";
import Header from "Components/Header";
import Footer from "Components/Footer";
import 'antd/dist/antd.css'
import styles from "./index.less";
import Loadable from "react-loadable";
const LoadingComponent = ({pastDelay})=>{
  if(pastDelay) {
    return <div>Loading</div>
  }else {
    return null
  }
}
const PrincipleLayout = Loadable({
  loading: LoadingComponent,
  loader: ()=>import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "principle" */
      './principle'
    )
})

class IndexPage extends React.Component{
  render() {
      return <Layout className={styles.layout_main}>
        <Layout.Header className={styles.layout_top}>
          <Header/>
        </Layout.Header>
        <Layout className={styles.layout_container}>
          <Switch>
            <Route path='/train' component={TrainLayout}/>
            <Route path='/blog' component={BlogLayout}/>
            <Route path='/achievement' component={AchievementLayout}/>
            <Route path='/principle' component={PrincipleLayout}/>
            <Redirect to='/blog'/>
          </Switch>
        </Layout>
        <Layout.Footer className={styles.layout_bottom}>
          <Footer/>
      </Layout.Footer>
      </Layout>
  }
}

export default connect()(IndexPage);
