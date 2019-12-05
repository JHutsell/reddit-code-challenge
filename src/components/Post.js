import React from 'react';
import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdbreact';


class Post extends React.Component{

    render() {
        console.log(this.props.data)
        let date = new Date(this.props.post.data.created).toLocaleDateString("en-US")
        let time = new Date(this.props.post.data.created).toLocaleTimeString("en-US") 
        const {thumbnail, title, subreddit_name_prefixed, score, ups, num_comments} = this.props.post.data
        return(
            <MDBCol >
                <MDBCard style={{ width: "22rem", height: "28rem", background:"white", border:"solid" }}>
                    <MDBCardImage className="img-fluid" src={thumbnail ? thumbnail : null} style={{ width: "12rem", height: "12rem" }} waves />
                    <MDBCardBody>
                        <MDBCardTitle>{title}</MDBCardTitle>
                        <p>Date Created: {date} @ {time}</p>
                        <p>Subreddit: {subreddit_name_prefixed}</p>
                        <p>Score: {score}</p>
                        <p>Ups: {ups} </p>
                        <p># of Comments: {num_comments}</p>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}

export default Post