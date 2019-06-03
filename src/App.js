import React, { Component } from 'react';
import './App.css';
import BBAppBar from './BBAppBar';
import PunchList from './PunchList';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends Component {
    onSearch(value) {
        // would route to search page 
    }

    render() {
        return (
            <Router>
                <div>
                    <BBAppBar onSearch={this.onSearch} />
                    {/* This would be the actual home page, if there was one */}
                    <Route exact path="/" render={() => (
                        <Redirect to="/punch-list" />
                    )} />
                    <Route exact path="/punch-list" component={PunchList} />
                    <Route path="/punch-list/:discipline" component={PunchList} />
                </div >
            </Router>
        );
    }
}

export default App;
