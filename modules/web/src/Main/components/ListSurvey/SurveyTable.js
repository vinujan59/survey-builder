import React, {Component,PropTypes} from 'react'
import {Table,TableRow,TableHeader, TableHeaderColumn,TableBody} from 'material-ui';
require('bootstrap/dist/css/bootstrap.min.css');

import SurveyTableRow from './SurveyTableRow'
export default class SurveyTable extends Component {
    constructor(props) {
        super(props);

    }
    render () {
        var rows = this.props.surveys.map(function(survey, i) {
            return <SurveyTableRow key={i} survey={survey}/>;
        });

        return (
            <Table className="table survey-table">
                <TableHeader>
                <TableRow>
                    <TableHeaderColumn>Title</TableHeaderColumn>
                    <TableHeaderColumn>Published On</TableHeaderColumn>
                    <TableHeaderColumn>Last Active</TableHeaderColumn>
                    <TableHeaderColumn>Completions</TableHeaderColumn>
                    <TableHeaderColumn>Activity</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody>{rows}</TableBody>
            </Table>
        );
    }
}

SurveyTable.propTypes = {
    surveys: React.PropTypes.array.isRequired
};