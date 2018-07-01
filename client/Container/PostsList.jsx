import React from 'react'
import { Meteor } from 'meteor/meteor';

import {wallContainer} from '../../imports/api/wall'

export default class PostsList extends React.Component {
  constructor(){
    super()
    this.state = {
        list: []
    }
  }

  componentWillMount(){
    Tracker.autorun(()=>{
      var posts = wallContainer.find({}).fetch()
      this.setState({
        list: posts
      })
    })
  }

  render(){
    return (
        <div>
          { this.state.list.map((val, index)=>{
            if (this.props.uid==val.owner || val.type == "public"){
              return(
                <div key={index} className="post-container">
                  <span className="post-user">{val.username}:</span>
                  <span className="post-content">{val.wall}</span>
                  <span className="post-type"> type: {val.type}</span>
                </div>
              )
            }
            }) 
          }
        </div>
    )
  }
}