import React, {Component,PropTypes} from 'react'
import {Table,TableRow,TableHeader, Dialog,TableHeaderColumn,TableBody,FlatButton} from 'material-ui';
require('bootstrap/dist/css/bootstrap.min.css');
import SurveyTableRow from './SurveyTableRow'
import SurveyActions from './../../actions/SurveyActions'

export default class SurveyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openEdit: false,
            survey: {}
        }
    }

    deleteSurvey() {
        console.log(this.state.survey);
        SurveyActions.deleteSurvey(this.state.survey.id);
        this.setState({openEdit: false});
    }

    editSurvey() {
        SurveyActions.updateSurvey(this.state.survey);
        this.setState({openEdit: false});
        this.props.tabToggle(1);
    }

    openEdit(survey) {
        if(this.props.user.role === 'admin') {
            this.setState({openEdit: true, survey: survey});
        }else{
            this.props.tabToggle(1);
            SurveyActions.updateSurvey(survey);
        }
    }

    render() {
        var rows = this.props.surveys.map(function (survey, i) {
            return (<SurveyTableRow tabToggle={this.props.tabToggle.bind(this)} key={i} survey={survey}
                                    openEdit={this.openEdit.bind(this)} editSurvey={this.editSurvey.bind(this)}
                                    deleteSurvey={this.deleteSurvey.bind(this)}/>);
        }.bind(this));

        return (
            <Table className="table survey-table">
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Published On</TableHeaderColumn>
                        <TableHeaderColumn>Modified On</TableHeaderColumn>
                        <TableHeaderColumn>Completions</TableHeaderColumn>
                        <TableHeaderColumn>
                            {this.props.user.role === 'admin' &&
                                <Dialog
                                    title="Select an Action!"
                                    actions={[
                                              <FlatButton
                                                label="Later"
                                                secondary={true}
                                                onTouchTap={()=> {this.setState({openEdit:false})}}
                                              />,
                                              <FlatButton
                                                label="Delete"
                                                secondary={true}
                                                onTouchTap={this.deleteSurvey.bind(this)}
                                              />,
                                              <FlatButton
                                                label="Edit"
                                                primary={true}
                                                keyboardFocused={true}
                                                onTouchTap={this.editSurvey.bind(this)}
                                              />
                                            ]}
                                    modal={false}
                                    open={this.state.openEdit}
                                    onRequestClose={()=> {this.setState({openEdit:false})}}
                                ></Dialog>
                            }
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>{rows}</TableBody>
            </Table>
        );
    }
}

SurveyTable.propTypes = {
    surveys: React.PropTypes.array.isRequired,
    tabToggle: React.PropTypes.func.isRequired
};