import React, { Component } from 'react';
import Header from '../components/Headers';
// Import widgets being used in this component
import NumberWidgetContainer from '../components/NumberWidgetContainer';
import ListWidgetContainer from '../components/ListWidgetContainer';
import GraphWidgetContainer from '../components/GraphWidgetContainer';

// Add in styles
import '../styles/App2.css';

class App2 extends Component {
    render() {
        return (
            <div>
            <Header /> 
            <div className="App2">
                {/* Add Widgets to display */}
                <ListWidgetContainer href="http://localhost:3001/stats/top" heading="Top Ticket Answerers" rowspan={3} />
                <NumberWidgetContainer href="http://localhost:3001/tickets/open" heading="Open Ticket Total" />
                <GraphWidgetContainer href="http://localhost:3001/tickets/progression" heading="Tickets Over Time" colspan={2} rowspan={2} />
                <NumberWidgetContainer href="http://localhost:3001/tickets/today" heading="Tickets Opened Today" />
                <NumberWidgetContainer href="http://localhost:3001/tickets/urgent" heading="Tickets Marked 'Urgent'" />
                <NumberWidgetContainer href="http://localhost:3001/stats/response" heading="4 Hour Response %" />
                <NumberWidgetContainer href="http://localhost:3001/stats/solved" heading="7 Day Solved %" />
            </div>
            </div>
        );
    }
}

export default App2;