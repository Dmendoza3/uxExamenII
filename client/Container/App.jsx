import React, {Component} from 'react'
import 'bulma/css/bulma.css'

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
                <section className="hero is-info is-bold">
                    <div className="hero-body">
                        <div className="container title">
                           <AccountsUIWrapper/>
                         </div>
                    
                
                        { Meteor.userId() ?
                        <div>
                            <div className="container">
                                <h1 className="title">
                                    <div className="field has-addons">
                                        <input ref="input" placeholder="Mensaje" className="input is-info control"/>
                                        <button className="button is-outlined is-light control" onClick={this.handleSubmit.bind(this)}>Add</button>
                                    </div>
                                </h1>
                                <h2 className="subtitle">
                                    <label htmlFor="publicChk" className="">Publico:&nbsp;</label><input type="checkbox" id="publicChk" ref="publicMsg" defaultChecked="true" className=""/>
                                </h2>
                                <h2 className="subtitle">
                                    <span className="countedPosts">
                                        Publicos: {this.state.publicCount}
                                    </span>&nbsp;
                                    <span className="countedPosts"> 
                                        Privados: {this.state.privateCount}
                                    </span>
                                </h2>
                            </div>
                            <PostsList uid={Meteor.userId()}/>
                        </div> : ''
                        }
                    </div>
                </section>
            </div>
        )
    }
}