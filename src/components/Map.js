import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import Pin from './Pin';

export default class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
      api_url: 'https://data.edmonton.ca/resource/87ck-293k.json',
			viewport: {
				width: 1100,
				height: 600,
				zoom: 10,
				latitude: 53.5444,
				longitude: -113.4909
      },
      coords: [
        { latitude: 53.5225, longitude: -113.6242 },
        { latitude: 53.5437, longitude: -113.4947 },
        { latitude: 53.5439, longitude: -113.4914 },
      ],
      data: null
		};
  }

  componentDidMount() {
    const { data, api_url } = this.state;

    if (!data) {
      fetch(api_url, { method: 'GET' })
      .then(response => response.json())
      .then(response => this.setState({ data: response}));
    }
  }
  
	render() {
    const { data } = this.state;

		return (
			<MapGL
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				{...this.state.viewport}
				onViewportChange={viewport => this.setState({ viewport })}>

        {data && data.map((coord, i) => (
          <Marker 
            key={`Marker-${i * (Math.random() * 200 + 1)}`} 
            latitude={parseFloat(coord.location.latitude)} 
            longitude={parseFloat(coord.location.longitude)}>
            x
          </Marker>
        ))}
			</MapGL>
		);
	}
}
