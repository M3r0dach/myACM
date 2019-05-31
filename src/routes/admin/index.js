import React from 'react';
import { connect } from 'dva';
import { Layout} from "antd";
import { Route, Switch, Redirect } from 'dva/router';
import Header from "Components/header/AdminHeader";
import Footer from "Components/Footer";
import UserAdmin from "./users";
import 'antd/dist/antd.css'
import styles from "./index.less";



class IndexPage extends React.Component{
  render() {
      return <Layout className={styles.layout_main}>
        <Layout.Header className={styles.layout_top}>
          <Header/>
        </Layout.Header>
        <Layout className={styles.layout_container}>
            <Switch>
                <Route path='/users' component={UserAdmin}/>
                <Redirect to='/users'/>
            </Switch>
        </Layout>
        <Layout.Footer className={styles.layout_bottom}>
          <Footer/>
      </Layout.Footer>
      </Layout>
  }
}

export default connect()(IndexPage);
