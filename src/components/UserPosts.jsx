import api from "../api";
import {createResource} from "solid-js";

const UserPosts = () => {

    const [posts] = createResource(api.fetchPosts)

    return <>
            <Suspense fallback={<p>Loading Posts.....</p>}>
                <h3>Posts</h3>
                <ul>
                    <For each={posts()}>
                        {
                            (post, i) => {
                                return <li>{post.title}</li>
                            }
                        }
                    </For>
                </ul>
            </Suspense>
    </>

}

export default UserPosts;