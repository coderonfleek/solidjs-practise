import {useParams} from "@solidjs/router";

function User() {

    const params = useParams();

    return <h2>The Used ID is: {params.id}</h2>
    
}

export default User;