import { Component } from "react";
import { OJ_MAP } from "Models/accounts";
import { Table, Alert } from "antd";
import { connect } from "dva";
import { withRouter } from "dva/router";
import '../../index.css'
const originURL = '/train/total'
const getColumns = () => {
  const columns = [{
    title: '#',
    dataIndex: 'order',
    width: '5%',
  }, {
    title: '用户名',
    dataIndex: 'user_name',
    width: '8%',
    className: 'text-center',
    render: name => <b>{name}</b>
  }];
  const accountsColumns = Object.keys(OJ_MAP).map(ojKey => ({
    title: OJ_MAP[ojKey],
    dataIndex: `accounts.${ojKey}`,
    width: '12%',
    render: (accounts, record) => {
      const account = record.accounts[ojKey] || {};
      return (
        <div>
          {account.solved ? (<b>{ account.solved }&nbsp;/&nbsp;</b>) : null}
          {account.solved ? (<b>{ account.submitted }</b>) : null}
        </div>
      );
    }
  }));
  const lastColumns = [{
    title: 'Rank',
    dataIndex: 'train_rank',
    width: '10%',
    render: rank => <b className="red">{rank}</b>
  }];
  return [...columns, ...accountsColumns, ...lastColumns];
};

class RankList extends Component{
    handleTableChange = (pagination, filters, sorter)=>{
      console.log('pagination')
      console.log(pagination)
      const params = {
        current_page: pagination.current
      }
      this.props.history.replace({
          pathname:this.props.history.location.pathname,
          state: params
      })
    }
    render() {
        console.log('ranklist')
        console.log(this.props.match)
        return <div>
            <Alert type="info" showIcon closable
                style={{fontSize:12}}
                message="帮助信息"
                description={<p>
                  HDU, BNU, POJ, Hust Vjudge ==> <b>Accepted / Submitted</b><br />
                  Codeforces, Bestcoder ==> <b>Rating / MaxRating</b><br />
                </p>}
            />
            <Table columns={getColumns()}
                dataSource={this.props.ranklist}
                size='small'
                rowClassName='row'
                loading={this.props.loading}
                pagination={this.props.pagination}
                onChange = {this.handleTableChange}
            />
        </div>
    }
}
const stateToProps=({ranklist, loading})=>{
  return {
    loading: loading.models.ranklist,
    ranklist: ranklist.list,
    pagination: {
      current: ranklist.current_page,
      pageSize: ranklist.per,
      total: ranklist.total_count,
      showQuickJumper: true,
      showTotal: total => <span>共有 {total}个用户</span>,
  }
  }
}
export default withRouter(connect(stateToProps)(RankList))