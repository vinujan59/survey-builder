import React, {Component} from 'react'
import AltContainer from 'alt-container';

import {Card,
    FontIcon, Snackbar,DropDownMenu, MenuItem} from 'material-ui';
import {ContentAdd} from 'material-ui';

import HomeActions from './../actions/HomeActions';

var moment = require('moment');

String.prototype.toProperCase = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
};


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 1};
    }

    componentDidMount() {
        setTimeout(HomeActions.getAllMedia.bind(this), 0);
        setTimeout(HomeActions.getAllNewses.bind(this), 0);
        if (this.pollInterval) {
            clearInterval(this.pollInterval)
        }
        this.pollInterval = setInterval(this.poll.bind(this), 15000);

        $(document).ready(function () {

            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('.scrollup').fadeIn();
                } else {
                    $('.scrollup').fadeOut();
                }
            });

            $('.scrollup').click(function () {
                $("html, body").animate({scrollTop: 0}, 600);
                return false;
            });

        });
    }

    componentWillUnmount() {
        clearInterval(this.pollInterval)
    }

    poll() {
        var req;
        if (this.state.value != 1)
            req = {mediaName: this.state.value};
        HomeActions.updateAllNewses(req);
    }

    handleChange(event, index, value) {
        this.setState({value});
        var req;
        if (this.state.value != 1)
            req = {mediaName: value};
        HomeActions.getAllNewses(req);
    }

    clickMe(newsId) {
        HomeActions.clickMe(newsId);
        var req;
        if (this.state.value != 1)
            req = {mediaName: this.state.value};
        setTimeout(HomeActions.updateAllNewses.bind(this, req), 5000);
    }

    descriptionRemoveHref(description) {
        if (description) {
            var start = description.indexOf('<a ');
            var end = description.indexOf('/a>');
            if (start > -1 && end > -1) {
                description = description.substring(0, start)
            }
        }
        return description;
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">

                        <div className="media-select">
                            <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)}>
                                <MenuItem value={1} primaryText="."/>
                                <MenuItem value={1} primaryText="All News"/>
                                {this.props.medias.map((media) => {
                                    return (
                                        <MenuItem value={media.name} primaryText={media.name.toProperCase()}/>
                                    )
                                })
                                }
                            </DropDownMenu>
                        </div>

                        {
                            this.props.newsState.isLoading() &&
                            <div className="la-ball-scale-multiple la-3x loading-absolute">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        }

                        {this.props.newses.map((news) => {
                                return (
                                    <a href={news.link} target="new" onClick={this.clickMe.bind(this, news.id)}>
                                        <Card
                                            className={ this.props.seen.indexOf(news.id) >-1 ? 'col-md-8 col-md-offset-2 margin-top-20 news-card-done' :'col-md-8 col-md-offset-2 margin-top-20 '}>
                                            <div className="col-md-12 margin-top-10 news-text">
                                                <h4>
                                                    {news.text}
                                                </h4>
                                            </div>
                                            <div className="col-md-12 margin-top-10 news-description">
                                                {this.descriptionRemoveHref(news.description)}
                                                <div className="margin-top-10 ">
                                                    {news.tags.map((tag) => {
                                                        return (
                                                            tag !== 'common' &&
                                                            <span>
                                                                <span
                                                                    className="label label-default">{tag}</span>&nbsp;&nbsp;
                                                            </span>
                                                        )
                                                    })
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <hr/>
                                            </div>
                                            <div className="col-md-6 margin-10">
                                                <span
                                                    className="label label-default">{news.mediaName.toProperCase()}</span>&nbsp;&nbsp;
                                                {moment(news.createdTime).format('MMM Do, h:mm A')}
                                            </div>
                                            <div className="col-md-6 margin-10 text-right">
                                                <strong>{news.webReach}</strong>&nbsp;Views
                                            </div>
                                        </Card>
                                    </a>
                                )
                            }
                        )
                        }
                        <div className="btn btn-default scrollup"><span className="text">New at top</span></div>
                    </div>
                    {/*<Snackbar
                     open={this.props.newsState.isSuccess()}
                     message={"Hi!, Welcome to MyNews"}
                     autoHideDuration={2000}
                     />*/}
                </div>
            </div>
        )
    }
}

export default Home;