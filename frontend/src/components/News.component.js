import React, { Component } from 'react';
import axios from 'axios';
import DayJS from 'dayjs';

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newsItems: undefined
        }
    }

    componentDidMount() {
        axios.get('/news')
        .then(news => {
            this.setState({
                newsItems: news.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        if(this.state.newsItems) {
            return (
                this.state.newsItems.map((item, i) => {
                    var datetime = item.datetime;
                    var date = DayJS(datetime).format('dddd, MMMM D YYYY')
                    var time = DayJS(datetime).format('HH:mm');
                    return (
                        <div key={i} className="core-cont bg-lightgrey mt-4">
                            <h2>{item.title}</h2>
                            <span className="text-muted h6">Posted by {item.author} on {date} at {time}.</span>
                            <hr className="bg-black" />
                            <p>{item.body}</p>
                        </div>
                    )
                })
            )
        }
        else
        {
            return(
                <div className="core-cont bg-lightgrey mt-4">
                    <h2>Loading...</h2>
                    <hr className="bg-black" />
                    <p>We are attempting to load news items from the database, if this problem persists, please contact a system administrator.</p>
                </div>
            )
        }
    }
}

export default News;