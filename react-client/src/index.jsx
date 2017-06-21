import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  //Do Not Change submitEvent function!
  submitEvent(startDate, endDate, location, eventSelected) {
    $.ajax({
      url: '/events',
      type: 'POST', 
      data: {
          eventDateStart: startDate,
          eventDateEnd: endDate,
          eventLocation: location,
          event: eventSelected        //Art or Concerts or Sports 
            },

      success: (data) => {

        this.setState({
          items: data                 //response data in array (coming from server)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });

  }


  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));