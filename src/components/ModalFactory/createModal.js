import React from "react";
import { Modal, Button} from "antd";

const createModal= SubComponent =>class extends React.Component {
            state = {
                visible: false,
            }
            showModal = (e)=>{
                this.setState({visible:true})
            }
            handleClose = ()=>{
                this.setState({visible:false})
            }
            renderAnchor = (hint, anchor)=>{
                if(anchor=='button') {
                    return <Button type='primary' onClick={this.showModal}>
                        {hint}
                        </Button>
                } 
                return <span style={{ color :'blue'}} onClick={this.showModal}>
                    {hint}
                    </span>
            }
            render() {
                const {hint, title, anchor, ...rest} = this.props
                return (
                    <span>
                        {this.renderAnchor(hint, anchor)}
                        <Modal title={title} visible={this.state.visible}
                            footer={null}
                            onOk={this.handleClose}
                            onCancel={this.handleClose}>
                            <SubComponent onSubmit={this.handleClose} {...rest}/>
                        </Modal>
                    </span>
                )
            }
        }
export default createModal