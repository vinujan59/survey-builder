import React, {Component} from 'react'
import SurveyEditor from './SurveyEditor'

export default class EditSurvey extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return <SurveyEditor/>;
    }
}