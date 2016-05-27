import React, {Component} from 'react'
import render from 'react-dom'
import AltContainer from 'alt-container';

import HomeStore from './../stores/HomeStore'
import Home from './../components/Home'

class ApplicationContainer extends Component {


    render() {
        return (
            <AltContainer
                stores={[HomeStore]}
                inject={{
                        newses: function(props){
                            return HomeStore.getState().newses;
                        },
                        medias: function(props){
                            return HomeStore.getState().medias;
                        },
                        newsState: function(props){
                            return HomeStore.getState().newsState;
                        },
                         newsUpdateState: function(props){
                            return HomeStore.getState().newsUpdateState;
                        },
                        seen:function(props){
                            return HomeStore.getState().seen;
                        }
                }}>
                <Home></Home>
            </AltContainer>
        )
    }
}

export default ApplicationContainer;
