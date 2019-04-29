import BaseModal from "../BaseModal";
import LoginForm from "../form/LoginForm";
import ProfileForm from "../form/ProfileForm";
import AccountForm from "../form/AccountForm";
import BlogForm from "../form/BlogForm";
import CodeBlock from "../CodeBlock";

const ModalFactory = {
    LoginModal() {
        return <BaseModal hint='登录'
                    title='请登录'
                    form={LoginForm}
                />
    },
    ProfileModal() {
        return <BaseModal hint='编辑'
                    title='修改用户信息'
                    form={ProfileForm}
                />
    },
    CodeModal({hint='代码', code=null}) {
        return <BaseModal hint={hint}
                    title='查看代码'
                    form={
                        props=>(
                            <CodeBlock {...props}
                                code={code}
                            />
                        )
                    }
                />
    },
    AccountModal({hint='编辑', type, account={}}) {
        return <BaseModal hint={hint}
                    title='账号修改'
                    form={
                        props=>(
                            <AccountForm {...props}
                                account={account}
                            />
                        )
                    }
                    type={type}
                />
    },
    BlogModal({hint='编辑', type}) {
        return <BaseModal hint={hint}
                    title='创建博客'
                    form={BlogForm}
                    type={type}
                />
    }
}
export default ModalFactory
