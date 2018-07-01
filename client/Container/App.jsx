import React, {Component} from 'react'

import {wallContainer} from '../../imports/api/wall'
import {counts} from '../../imports/api/countedPosts';

import PostsList from './PostsList'
import AccountsUIWrapper from './AccountsUIWrapper';


export default class App extends Component {

    constructor(){
        super()
        this.state = {
            user: "",
            publicCount: 0,
            privateCount: 0
        }
    }

    componentWillMount(){
        Tracker.autorun(()=>{
            var user = 0
            this.setState({
                user: Meteor.userId(),
                publicCount: this.state.publicCount,
                privateCount: this.state.privateCount
            })
            if(Meteor.userId()){
                var userUp = counts.find({owner: Meteor.userId()}).fetch();
                if(userUp.length > 0){
                    this.setState({
                        user: this.state.user,
                        publicCount: userUp[0].publicCount,
                        privateCount: userUp[0].privateCount
                    })
                }
            }else{
                this.setState({
                    user: this.state.user,
                    publicCount: 0,
                    privateCount: 0
                })
            }
        })
    }

    handleSubmit(){
        var wall = this.refs.input.value
        var publicMsg = (this.refs.publicMsg.checked)?"public":"private"

        if(wall==""){
            alert("El mensaje no puede estar vacio.")
            return;
        }

        wallContainer.insert({
            wall:wall,
            owner: Meteor.userId(),
            username: Meteor.user().profile.name,
            type: publicMsg
        })

        Meteor.call("countPosts", Meteor.userId(), function(error, result){
            if(error){
                console.log(error.reason);
                return;
            }
        })
        this.refs.input.value = ""
    }

    render(){
        return(
            <div>
                <AccountsUIWrapper/>
                <p/>
                { Meteor.userId() ?
                    <div>
                        <span className="countedPosts">
                            Publicos: {this.state.publicCount}
                        </span>
                        <span className="countedPosts"> 
                            Privados: {this.state.privateCount}
                        </span>

                        <input ref="input" placeholder="Mensaje"/>
                        <label htmlFor="publicChk">Publico</label><input type="checkbox" id="publicChk" ref="publicMsg" defaultChecked="true"/>
                        <button onClick={this.handleSubmit.bind(this)}>Add</button>
                        <PostsList uid={Meteor.userId()}/>
                    </div> : ''
                }
            </div>
        )
    }
}