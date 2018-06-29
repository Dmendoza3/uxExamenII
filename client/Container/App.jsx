import React, {Component} from 'react'

import {wallContainer} from '../../imports/api/wall'

import PostsList from './PostsList'


export default class App extends Component {

    constructor(){
        super()
        this.state = {
            wall: ""
        }
    }

    handleChange(e){
        var wall = this.refs.input.value
        this.setState({wall: wall})
    }

    handleClick(){
        var wall = this.state.wall
        
        wallContainer.insert({wall},(err,done)=>{
            console.log(err + " id = " + done)
        })
    
       this.setState({wall: ""})
       this.refs.input.value = ""
    
    }

    render(){
        return(
            <div>
                <input onChange={this.handleChange.bind(this)} ref="input"/>
                <h1>{this.state.wall}</h1>
                <button onClick={this.handleClick.bind(this)}>Add</button>
                <PostsList/>
            </div>
        )
    }
}