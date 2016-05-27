import React, {Component,PropTypes} from 'react'
import {TableRow, TableRowColumn} from 'material-ui';
import {Link} from 'react-router'
require('bootstrap/dist/css/bootstrap.min.css');
import Sparkline from './Sparkline'

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var formatDate = function (date) {
    return MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
};

function integerWithThousandsSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default class SurveyTableRow extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        var survey = this.props.survey;

        var total = survey.activity.reduce(function (memo, n) {
            return memo + n;
        }, 0);

        return (
            <TableRow>
                <TableRowColumn>
                    <Link to='take' surveyId={survey.id} className='title'>
                        {survey.title}
                    </Link>
                </TableRowColumn>
                <TableRowColumn className='published'>{formatDate(survey.publishedDate)}</TableRowColumn>
                <TableRowColumn className='modified'>{formatDate(survey.modifiedDate)}</TableRowColumn>
                <TableRowColumn className='total'>{integerWithThousandsSeparator(total)}</TableRowColumn>
                <TableRowColumn className='activity'>
                    <Sparkline points={survey.activity} />
                </TableRowColumn>
                <TableRowColumn>
                    <Link to='edit' surveyId={survey.id} className="btn btn-link btn-editSurvey edit">
                        <i className="glyphicon glyphicon-pencil"></i>
                    </Link>
                </TableRowColumn>
            </TableRow>
        );
    }
}

SurveyTableRow.propTypes = {
    survey: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        publishedDate: React.PropTypes.instanceOf(Date).isRequired,
        modifiedDate: React.PropTypes.instanceOf(Date).isRequired,
        activity: React.PropTypes.array.isRequired
    }).isRequired
};