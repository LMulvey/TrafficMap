import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header from './components/Header';
import Map from './components/Map';


import './App.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicationName: 'TrafficMap',
    }
  }

  componentDidMount() {
    const { startFetch, API: { data } } = this.props;
    if (!data) startFetch();
  }

  render() {
    return (
      <div>
        <Header appName={this.state.applicationName} />

        <Container>
          <Map data={this.props.API.data} />
        </Container>
      </div>
    );
  }
}

export default Home;
