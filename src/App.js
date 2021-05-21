import './App.css';
import React from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';

const token =process.env.REACT_APP_API_KEY

const CardList = (props) => (
  <div>
    {props.profiles.map(profile =>
      <Card key={profile.id}{...profile} />)}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div class="github-profile">
        <img
          class="img"
          src={profile.avatar_url}
          alt="Avatar.Logo"
          style={{ width: 100, height: 100, position: 'relative' }} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: '' };
  handleSubmit = async (event) => {
    event.preventDefault();
    
    await axios
      .get(`https://api.github.com/users/${this.state.userName}`,{
        headers: {
          'Authorization': `token ${token}` 
        }
      })
      .then((response)=>{
        this.props.onSubmit(response.data);
        console.log(response.data);
       })
       .catch(function (error){
        if(error.response) {
          alert("That user doesnt exist.Try again")
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
       });
    
    this.setState({ userName: '' });
  };

  render() {

    return (
      
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="Github username"
          required
        />
        <button className="btn-add">Add Card</button>
      </form>
      
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };

  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData],
    }));
  };
  render() {

    return (
      <div>
        <div className="header"
        >{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
        <footer>Page By Maureen Nduta</footer>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
export default App;
