import React, {Component} from 'react'
import render from 'react-dom'
import AltContainer from 'alt-container';

import SurveyStore from './../stores/SurveyStore'
import ListSurveys from './../components/ListSurvey/ListSurveys'
import UserStore from './../stores/UserStore'

export default class ListSurveyContainer extends Component {
    render() {
        return (
            <AltContainer
                stores={[SurveyStore]}
                inject={{
                    surveys: function(props){
                        return SurveyStore.getState().surveys;
                    },
                    user:function(props){
                        return UserStore.getState().user;
                    },
                    surveysState: function(props){
                        return SurveyStore.getState().surveysState;
                    }
                }}>
                <ListSurveys tabToggle={this.props.tabToggle}></ListSurveys>
            </AltContainer>
        );
    }
}