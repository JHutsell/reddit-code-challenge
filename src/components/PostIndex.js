import React from 'react';
import Post from './Post'

const REDDIT_ALL = "https://www.reddit.com/r/all/.json"

class PostIndex extends React.Component {
    
    state = {
        allPosts: [],
        adult: false,
        sortTerm: '',
        sortOrder: true,
        subReddit: [],
        subFilterTerm: '',
    }

    componentDidMount() {
        fetch(REDDIT_ALL)
            .then(resp => resp.json())
            .then(posts => {
                this.setState({
                    allPosts: posts.data.children
                })

                posts.data.children.forEach(element => {
                    if (! this.state.subReddit.includes(element.data.subreddit)){
                    this.setState({
                        subReddit:[...this.state.subReddit, element.data.subreddit]
                    })
                }
                });
            })
    }

    filterAdult = (data) => {
        return data.filter((post) => {
            return !post.data.over_18
        })
    }

    sortFunction = (data) => {
        let  sortTerm= this.state.sortTerm
        data = data.sort((el1,el2)=>{           
            return (el1.data[sortTerm] - el2.data[sortTerm])
        })

        if(!this.state.sortOrder){
            data.reverse()
        }
        return data
    }

    filterBySubReddit = (data) => {
        return data.filter((post) => {
            return post.data.subreddit === this.state.subFilterTerm
        })
    }



    render() {

        let data = this.state.allPosts
        if (this.state.adult) {
            data = this.filterAdult(data)
        }
        if(this.state.sortTerm.length > 0){
            data = this.sortFunction(data)
        }

        if(this.state.subFilterTerm.length > 0){
            data = this.filterBySubReddit(data)
        }

        let eachPost = data.map((post) => {
            return <Post post={post}/>
        })

        return(
            <React.Fragment>
                <div class="dropdown2" style={{"margin": "50px"}}>
                    <button class="dropbtn2">Sort By</button>
                    <div class="dropdown-content2" >
                        <a onClick={ ()=>{this.setState({sortTerm:"created"})} } href="#">Creation Date</a>
                        <a onClick={ ()=>{this.setState({sortTerm:"score"})} }href="#">Score</a>
                        <a onClick={()=>{this.setState({sortTerm:"subreddit_subscribers"})} } href="#">SubReddit Subs</a>
                        <a onClick={()=>{this.setState({sortTerm:"ups"})}} href="#">Ups</a>
                        <a onClick={()=>{this.setState({sortTerm:"num_comments"})}} href="#">No of comments</a>
                    </div>
                </div>

                <div class="dropdown1">
                    <button class="dropbtn1">Filter</button>
                    <div class="dropdown-content1" >
                        <a onClick={()=>{this.setState({subFilterTerm: ""})}} href="#">All</a>
                        {this.state.subReddit.map((term)=>{
                            return <a onClick={ ()=>{this.setState({subFilterTerm:term})} } href="#">{term}</a>
                        })}
                    </div>
                </div>
            
                <button onClick={()=>{this.setState({adult:!this.state.adult})}}>Hide 18+ Content</button>
                <button onClick={()=> this.setState({sortOrder:true})}>accending</button>
                <button onClick={()=> this.setState({sortOrder:false})}>decending</button>
                <div  className="posts-container">
                {eachPost}
            </div>
        </React.Fragment>
        )
    }
}

export default PostIndex