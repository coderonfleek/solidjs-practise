const PageLayout = (props) => {

    return <>
        <h1>The Awesome App</h1>

        <div>
            {props.children}
        </div>

        <p>
            <b>Page Footer</b>
        </p>
    </>
}

export default PageLayout;