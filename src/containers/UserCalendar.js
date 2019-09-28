import React from 'react';
import Calendar from 'react-calendar';



class UserCalendar extends React.Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })
 
  render() {
    return (
      <div id="user-calendar">
        <h2 id="your-calendar" >YOUR CALENDAR</h2>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default UserCalendar