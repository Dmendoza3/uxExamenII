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
      var todos = todoContainer.find({}).fetch()
      this.setState({list: todos})
    })
  }

  render(){
    return (
        <div>
        </div>
    )
  }
}