import React from "react";
import {List, Input, Radio, Layout, Select} from "antd";
import BlogItem from "Components/BlogItem";
import {connect} from "dva"
import TagSider from "Components/TagSider";
import queryString from "querystring";
class BlogIndex extends React.Component {
  state = {
    sort_field: 'created_at',
    searchText: '',
    searchMode: 'total',
    blogs: []
  }
  componentWillReceiveProps(nextProps) {
    console.log('Component WILL RECEIVE PROPS!')
    const search = nextProps.history.location.search
    const query = search?queryString.parse(search.substr(1)):{}
    this.setState({...query, blogs: nextProps.blogs||[]})
  }

  handleLike = (blog) => {
    console.log(blog.id)
  }
  handleOption = (e) => {
    this.props.history.replace({
      pathname: this.props.history.location.pathname,
      search: `?${queryString.stringify({
        searchText: this.state.searchText,
        searchMode: this.state.searchMode,
        sort_field: e.target.value,
      })}`
    })
  }
  handleSelect = (value) => {
    this.props.history.replace({
      pathname: this.props.history.location.pathname,
      search: `?${queryString.stringify({
        searchText: this.state.searchText,
        searchMode: value,
        sort_field: this.state.sort_field,
      })}`
    })
  }
  handleSearch = (e) => {
    this.props.history.replace({
      pathname: this.props.history.location.pathname,
      search: `?${queryString.stringify({
        searchText: e.target.value,
        sort_field: this.state.sort_field,
        searchMode: this.state.searchMode,
      })}`
    })
  }
  handleChange = (e)=> {
    this.setState({searchText: e.target.value})
  }
  renderSelect = ()=>{
    return <Select value={this.state.searchMode} onChange={this.handleSelect}>
      <Select.Option value='total'>全部</Select.Option>
      <Select.Option value='title'>标题</Select.Option>
      <Select.Option value='author'>作者</Select.Option>
      <Select.Option value='tag'>标签</Select.Option>
      <Select.Option value='content'>正文</Select.Option>
    </Select>
  }
  renderOption = () => {
    return <Radio.Group
             value={this.state.sort_field}
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
      let kv = this.state.blogs
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
    const field = this.state.sort_field
    return x[field] <= y[field] ? 1 : -1
  }
  render() {
    console.log('blog state', this.state)
    let data = this.state.blogs.filter(this.onFilter).sort(this.onSorter)
    console.log(data)
    return (
      <div>
      <Input.Search value={this.state.searchText}
        style={{width:'80%', marginBottom:40}}
        onChange={this.handleChange}
        onPressEnter={this.handleSearch}
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