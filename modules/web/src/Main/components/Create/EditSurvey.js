import React, {Component,PropTypes} from 'react'
import SurveyEditor from './SurveyEditor'

export default class EditSurvey extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return <SurveyEditor {...this.props}/>;
    }
}
EditSurvey.PropTypes={
    tabToggle: React.PropTypes.func.isRequired
};