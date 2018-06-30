import React from 'react'

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
      this.setState({list: posts})
    })
  }

  render(){
    return (
        <div>
          { this.state.list.map((val, index)=>{
              return(
                <div key={index}>{val.wall}
                </div>
              )
            }) 
          }
        </div>
    )
  }
}