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
  submitEvent(dateSelected, location, eventSelected) {
    $.ajax({
      url: '/events',
      type: 'POST', 
      data: {
          eventDate: dateSelected,
          eventLocation: location,
          eventSelected: eventSelected        //Art or Concerts or Sports 
            },

      success: (data) => {

        this.setState({
          items: JSON.parse(data)                //response data in array (coming from server)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });

  };

  saveEvent(userName, saveDate, saveSelections) {       //saveSelections is an ARRAY (saving in the DB)
    $.ajax({
      url: '/selected',
      type: 'POST', 
      data: {
          saveDate: saveDate,                   //date entered
          userName: userName,
          saveSelections: saveSelections        //selected Events user interested and want to save in the DB
            },
      success: (data) => {
        console.log(data);                       //Successfully saved in the DB

      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  showSavedEvents() {       //retrieve list of events from DB
    $.ajax({
      url: '/retrieve',
      type: 'GET', 
      success: (data) => {

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



