import React, {Component,PropTypes} from 'react'
import {TableRow, TableRowColumn,FontIcon} from 'material-ui';
import {Link} from 'react-router'
require('bootstrap/dist/css/bootstrap.min.css');
import Sparkline from './Sparkline'
import moment from 'moment'
function integerWithThousandsSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
import SurveyActions from './../../actions/SurveyActions'

export default class SurveyTableRow extends Component {
    constructor(props) {
        super(props);
    }

    openEdit(){
        this.props.openEdit(this.props.survey);
    }

    render() {
        var survey = this.props.survey;

        return (
            <TableRow>
                <TableRowColumn>
                        {survey.title}
                </TableRowColumn>
                <TableRowColumn className='published'>{moment(survey.createdTime).format('DD MMM YYYY, h:mm A')}</TableRowColumn>
                <TableRowColumn className='modified'>{moment(survey.modifiedTime).format('DD MMM YYYY, h:mm A')}</TableRowColumn>
                <TableRowColumn className='total'>{integerWithThousandsSeparator(50)}</TableRowColumn>
                <TableRowColumn>
                    <FontIcon className="fa fa-edit fa-2x" onClick={this.openEdit.bind(this)}></FontIcon>
                </TableRowColumn>
            </TableRow>
        );
    }
}

SurveyTableRow.propTypes = {
    survey: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
    }).isRequired,
    tabToggle: React.PropTypes.func.isRequired
};