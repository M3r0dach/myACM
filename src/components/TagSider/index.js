import React from "react";
import { PageHeader } from "antd";
import Link from "../Link";
import styles from './index.css'

class TagSider extends React.Component{
    render() {
        var {tags} = this.props
        return <div className={styles.tagSider}>
            <PageHeader title='热门标签'/>
            <table>
                {tags.map((tag,idx)=> (
                    <tr key={idx}>
                        <td>
                            <Link to='/blog/index' query={{
                                searchMode: 'tag',
                                searchText: tag[0]
                                }}>
                                {idx+1+'. '+tag[0]}
                            </Link>
                        </td>
                        <td className={styles.tagRight}>{tag[1]}</td>
                    </tr>
                    )
                )}
            </table>
        </div>
    }
}
const View = ()=>{
    var tags = [["good",13],["perfect",15],["unb",5]]
    return <TagSider tags={tags}/>
}
export default TagSider
export {View}
