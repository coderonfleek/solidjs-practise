import {createSignal, createResource} from "solid-js";
import UserInfo from "./components/UserInfo";
import UserPosts from "./components/UserPosts";
import UserListWithMutate from "./components/UserListWithMutate";

const AsyncDemo = () => {

    const [userId, setUserId] = createSignal(1);
    const [user] = createResource(userId, fetchUser);

    async function fetchUser() {
        
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId()}`);
        return response.json();
    }

    function fetchNewUser() {
        
        const random = Math.ceil(Math.random() * 10);
        console.log(random)
        setUserId(random);
    }

    return <>
        <button onClick={fetchNewUser}>Fetch New User</button>
        <br />
        <br />
        {/* <Show when={user.loading}>
            <p>Loading....</p>
        </Show>
        <Switch>
            <Match when={user.error}>
                <p>Error: {error()}</p>
            </Match>
            <Match when={user()}>
                <div>
                    {JSON.stringify(user())}
                </div>
            </Match>
        </Switch> */}

        {/* Suspense */}
        {/* <Suspense fallback={<p>Loading....</p>}>
            <Switch>
                <Match when={user.error}>
                    <p>Error: {error()}</p>
                </Match>
                <Match when={user()}>
                    <div>
                        {JSON.stringify(user())}
                    </div>
                </Match>
            </Switch>
        </Suspense> */}

        {/* Cascading Suspense */}
        {/* <Suspense fallback={<p>Loading User Info....</p>}>
            <UserInfo />
            <UserPosts />
        </Suspense> */}

        {/* Mutate */}
        <UserListWithMutate />

    </>

}

export default AsyncDemo;