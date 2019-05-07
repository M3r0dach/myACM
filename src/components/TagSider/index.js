import React from "react";
import { Card } from "antd";
import Link from "../Link";
import styles from './index.css'

class TagSider extends React.Component{
    render() {
        var {tags} = this.props
        return <Card title="热门标签" className={styles.tagSider}>
            <table>
                {tags.map((tag,idx)=> {
                    var color = idx==0?'#f54545':(
                        idx==1?'#ff8547':(
                            idx==2?'#ffac38':'#8eb9f5'
                        )
                    )
                    return (<tr key={idx} style={{
                        borderBottom: '1px solid',
                        borderColor: 'gray',
                        verticalAlign: 'middle',
                        lineHeight: '32px',
                    }}>
                        <td>
                            <span style={{
                                display:'inline-block',
                                background: color,
                                width: 14,
                                paddingTop: 1,
                                paddingBottom: 1,
                                marginRight: 5,
                                lineHeight: '100%',
                                textAlign: 'center'
                            }}>{idx+1+' '}</span>
                            <Link to='/blog/index' query={{
                                searchMode: 'tag',
                                searchText: tag[0]
                                }}>
                                {tag[0]}
                            </Link>
                        </td>
                        <td className={styles.tagRight}>{tag[1]}</td>
                    </tr>)
                })}
            </table>
        </Card>
    }
}

export default TagSider
