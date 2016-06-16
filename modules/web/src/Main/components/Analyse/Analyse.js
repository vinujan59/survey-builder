import React, {Component,PropTypes} from 'react'

import AnalyseYesNo from './types/AnalyseYesNo'
import AnalyseMultipleChoice from './types/AnalyseMultipleChoice'
import AnalyseDropDown from './types/AnalyseDropDown'
//import AnalyseRatingScale from './types/AnalyseRatingScale'

export default class Analyse extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="container">
                <AnalyseYesNo question="question"/>
                <br/>
                <AnalyseMultipleChoice question="question"/>
                <br/>
                <AnalyseDropDown question="question"/>
                <br/>
            </div>
        );
    }
}