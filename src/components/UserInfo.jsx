
import api from "../api";
import {createResource} from "solid-js";

const UserInfo = () => {

    const [user] = createResource(() => api.fetchUser(2))

    return <>
        <h3>User Info</h3>
        <p>{user()?.name}</p>
    </>

}

export default UserInfo;