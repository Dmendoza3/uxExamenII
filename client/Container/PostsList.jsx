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
                <section key={index} className="hero is-info is-bold">
                  <div className="hero-body">
                      <div className="container">
                          <h1 className="title">
                            {val.username}:
                          </h1>
                          <h2 className="subtitle">
                            {val.wall}
                          </h2>
                          
                          {val.type=="public"?
                            <span className="tag is-success is-medium">Publico</span>:
                            <span className="tag is-link is-medium">Privado</span>
                          }
                      </div>
                  </div>
                </section>
              )
            }
            }) 
          }
        </div>
    )
  }
}