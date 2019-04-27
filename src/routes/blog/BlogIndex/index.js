import React from "react";
import {List, Input, Radio, Layout, Select} from "antd";
import BlogItem from "Components/BlogItem";
import {connect} from "dva"
import TagSider from "../../../components/TagSider";
class BlogIndex extends React.Component {
  state = {
    sortField: 'created_at',
    searchText: '',
    searchMode: 'total',
  }
  handleLike = (blog) => {
    console.log(blog.id)
  }
  handleOption = (e) => {
    this.setState({sortField: e.target.value})
  }
  handleSelect = (value) => {
    this.setState({searchMode: value})
  }
  renderSelect = ()=>{
    return <Select defaultValue='total' onChange={this.handleSelect}>
      <Select.Option value='total'>全部</Select.Option>
      <Select.Option value='title'>标题</Select.Option>
      <Select.Option value='author'>作者</Select.Option>
      <Select.Option value='tag'>标签</Select.Option>
      <Select.Option value='content'>正文</Select.Option>
    </Select>
  }
  renderOption = () => {
    return <Radio.Group
             defaultValue={this.state.sortField}
             onChange={this.handleOption}
           >
      <Radio.Button value='created_at'>
        时间
      </Radio.Button>
      <Radio.Button value='like_times'>
        热度
      </Radio.Button>
    </Radio.Group>
  }
  renderTagSider = ()=>{
      const reducer = (o, k)=>
          ({...o, [k]:o[k]?o[k]+1:1})
      let kv = this.props.blogs
            .map(blog=>blog.tags)
            .join()
            .replace(/,+/g,',')
            .replace(/^,/,'')
            .replace(/,$/,'')
      console.log('kv:',kv)
      kv = kv.split(',')
            .reduce(reducer, {})
      const tags = Object.entries(kv)
                    .sort((x,y)=>y[1]-x[1])
      return <TagSider tags={tags}/>
  }
  onSearch = (e) => {
    this.setState({searchText: e.target.value})
  }
  onFilter = (blog) => {
    const filterTitle = searchText => blog.title.includes(searchText)
    const filterContent = searchText => blog.content.includes(searchText)
    const filterAuthor = searchText => blog.user.name.includes(searchText)
    const filterTag = searchText => 
        blog.tags.filter(tag => tag.includes(searchText)).length > 0
    const filter = {
      'total': searchText => (filterTitle(searchText) || filterContent(searchText) || filterAuthor(searchText) || filterTag(searchText)),
      'title': filterTitle,
      'content': filterContent,
      'author': filterAuthor,
      'tag': filterTag
    }
    let {searchText: text, searchMode: mode} = this.state
    return filter[mode](text)
  }
  onSorter = (x, y) => {
    const field = this.state.sortField
    return x[field] <= y[field] ? 1 : -1
  }
  render() {
    console.log(this.state)
    console.log(this.props.blogs)
    let data = this.props.blogs.filter(this.onFilter).sort(this.onSorter)
    console.log(data)
    return (
      <div>
      <Input.Search style={{width:'80%', marginBottom:40}} onPressEnter={this.onSearch}
        addonBefore={this.renderSelect()} addonAfter={this.renderOption()}/>
      <Layout>
        <Layout.Content>
          <List
            itemLayout='vertical'
            loading = {this.props.loading}
            dataSource={data}
            renderItem={blog =>
                    < BlogItem blog = {blog}
                        onLike = {() => this.handleLike(blog)}
                    />}
            pagination={{ pageSize: 7 }}
          />
        </Layout.Content>
        <Layout.Sider theme='light'>
          {this.renderTagSider()}
        </Layout.Sider>
      </Layout>
      </div>
    )
  }
}
const stateToProps = ({blogs, loading}) => ({
  blogs: blogs.list,
  loading: loading.models.blogs,
})
export default connect(stateToProps)(BlogIndex)