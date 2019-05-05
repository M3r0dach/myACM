import Link from "../Link";

const UserLink = ({user_name, user_id})=>{
    return <Link to={`/principle/${user_id}`}>
        {user_name}
    </Link>
}

export default UserLink