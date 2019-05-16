import LoginForm from "../form/LoginForm";
import ProfileForm from "../form/ProfileForm";
import AccountForm from "../form/AccountForm";
import BlogForm from "../form/BlogForm";
import CodeBlock from "../CodeBlock";
import createModal from "./createModal";

const LoginComponent=createModal(LoginForm)
const LoginModal = ({hint='登录',title='请登录', anchor='span'})=>{
    return <LoginComponent hint={hint} title={title} anchor={anchor}/>
}

const ProfileComponent=createModal(ProfileForm)
const ProfileModal = ({hint='编辑',title='修改用户信息', anchor='span'})=>{
    return <ProfileComponent hint={hint} title={title} anchor={anchor}/>
}

const CodeComponent=createModal(CodeBlock)
const CodeModal = ({hint='代码',title='查看代码', anchor='span', code})=>{
    return <CodeComponent hint={hint} title={title} anchor={anchor} code={code}/>
}

const AccountComponent=createModal(AccountForm)
const AccountModal = ({hint='编辑',title='账号修改', anchor='span', account={}})=>{
    return <AccountComponent hint={hint} title={title} anchor={anchor} account={account}/>
}

const BlogComponent=createModal(BlogForm)
const BlogModal = ({hint='博客', title='创建博客', anchor='span', blog={}})=>{
    return <BlogComponent hint={hint} title={title} anchor={anchor} blog={blog}/> 
}
export {LoginModal, ProfileModal, CodeModal, AccountModal, BlogModal}
