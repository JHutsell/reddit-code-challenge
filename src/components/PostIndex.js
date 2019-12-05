import React from 'react';

const REDDIT_ALL = "https://www.reddit.com/r/all/.json"

class PostIndex extends React.Component {
    
    state = {
        allPosts: []
    }

    componentDidMount() {
        fetch(REDDIT_ALL)
            .then(resp => resp.json())
            .then(posts => {
                this.setState({
                    allPosts: posts.data.children
                })
            })
    }



    render() {
        console.log(this.state)
        return <p>hi</p>
    }
}

export default PostIndex