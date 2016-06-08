import React, {Component} from 'react'
import render from 'react-dom'
import AltContainer from 'alt-container';

import SurveyStore from './../stores/SurveyStore'
import EditSurvey from './../components/Create/EditSurvey'
import UserStore from './../stores/UserStore'

export default class EditSurveyContainer extends Component {
    render() {
        return (
            <AltContainer
                stores={[SurveyStore]}
                inject={{
                    questions: function(props){
                        return SurveyStore.getState().questions;
                    }
                }}>
                <EditSurvey tabToggle={this.props.tabToggle.bind(this)}></EditSurvey>
            </AltContainer>
        );
    }
}