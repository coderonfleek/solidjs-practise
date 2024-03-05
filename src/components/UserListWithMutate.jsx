import { createResource } from "solid-js";
import api from "../api";

function UserListWithMutate() {

    const [users, {mutate, refetch}] = createResource(api.fetchUsers);

    setInterval(()=> {
        //refetch();
    }, 3000)

    async function addUser() {

        const update = {
            name: "Fikayo Adepoju",
            email: "fik4christ@yahoo.com",
            username: "Fikky"
        }

        mutate((list) => [...list, {name : "Adding Users...."}])

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
        };

        const response = await fetch('https://jsonplaceholder.typicode.com/users', options);

        const data = await response.json();
        console.log(data);
        // mutate((list) => [...list, data])
        
        mutate((list) => list.map((item) => item.name == "Adding Users...."? data : item))



        return data;
        
    }//addUser
    

    return (
        <div class="container mt-3">
            <h2>Users List</h2>
            <ul class="list-group">
                <For each={users()}>
                    {
                        (user) => <li class="list-group-item">{user.name}</li>
                    }
                </For>
            </ul>
            <br />
            <br />

            <button onClick={addUser}>Add New User</button>
        </div>
    )
    
}

export default UserListWithMutate;