import React from "react";
import { Tag, Input, Icon, message } from "antd";
import styles from "./index.css";
class TagInput extends React.Component {
    state = {
        tags:[],
        inputVisible: false,
        inputValue: ''
    }
    static getDerivedStateFromProps(nextProps, preState) {
        var {value} = nextProps;
        value = value||[]
        if(value.toString()!=preState.toString()) {
            return {tags: value}
        }
        return null
  }
    handleClose = tag => {
        const tags = this.state.tags.filter(t=>t!=tag)
        this.setState({tags})
    }

    renderTagInput = ()=>{
        const {inputVisible, inputValue} = this.state
        const handleInputChange= e=>{
            console.log(e.target.value)
            this.setState({inputValue:e.target.value})
        }
        const showInput=()=>{
            this.setState({inputVisible:true}, ()=>this.input.focus())
        }
        const handleInputConfirm= e=>{
            const tag = this.state.inputValue
            if(this.state.tags.includes(tag)) {
                message.error('请不要重复添加')
                return
            }
            console.log(tag)
            this.setState(old=>({
                tags:[...old.tags, tag],
                inputVisible: false,
                inputValue: ''
            }))
            this.props.onChange([...this.state.tags, tag])
        }
        if(inputVisible) {
            return <Input
                        ref={input=>this.input=input}
                        size='small'
                        style={{width:78}}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
        }else {
            return  <Tag key='add' onClick={showInput}>
                        <Icon type='plus'/>
                    </Tag>
        }
    }
    render() {
        console.log(this.state)
        return <div className={styles['tag-input']}>
            {this.state.tags.map(
                tag=>(
                    <Tag key={tag} color='blue'
                        closable onClose={
                            ()=>this.handleClose(tag)
                    }> {tag} </Tag>
                )
            )}
            {this.renderTagInput()}
        </div>
    }
}
export default TagInput