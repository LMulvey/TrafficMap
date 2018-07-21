import React, { Component } from "react";
import MapboxGL from "mapbox-gl";

export default class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			api_url: "https://data.edmonton.ca/resource/87ck-293k.json",
			map: false,
			viewport: {
				zoom: 10,
				center: [-113.4909, 53.5444],
			},
			coords: [
				{ latitude: 53.5225, longitude: -113.6242 },
				{ latitude: 53.5437, longitude: -113.4947 },
				{ latitude: 53.5439, longitude: -113.4914 }
			],
			data: null
		};
	}

	initializeMap() {
		MapboxGL.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
		let map = new MapboxGL.Map({
			container: "map",
			style: "mapbox://styles/mapbox/light-v9",
			...this.state.viewport
		});

		map.on("load", () => {
      map.addLayer({
        "id": "points",
        "type": "circle",
        "source": {
          "type": "geojson",
          "data": this.state.data
        },
        "paint": {
          "circle-radius": 5,
          "circle-color": "#b4d455"
        }
      })
    });

    map.on("click", "points", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const { details, description, impact, duration } = e.features[0].properties;
        
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new MapboxGL.Popup()
            .setLngLat(coordinates)
            .setHTML(`
            <strong>${description}</strong><br/>
            <em>${impact}</em><br />
            <em>${duration}</em><br />
            <p>${details}</p>
            `)
            .addTo(map);
    });

    map.on('mouseenter', 'places',  () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
    });

    this.setState({ map });
	}

	createFeatureCollection(data) {
		let features = [];
		data.forEach(point => {
			features.push({
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [parseFloat(point.location.longitude), parseFloat(point.location.latitude)]
				},
				"properties": {
          "description": point.description,
          "details": point.details,
          "duration": point.duration,
          "impact": point.impact
        }
			});
    });
    
    return {
      "type": "FeatureCollection",
      "features": features
    }
	}


	componentDidMount() {
		const { data, api_url } = this.state;

		if (!data) {
			fetch(api_url, { method: "GET" })
				.then(response => response.json())
				.then(response => this.createFeatureCollection(response))
				.then(response => this.setState({ data: response }));
    }
  }
  
  componentDidUpdate() {
    const { data, map } = this.state;
    if (data && !map) this.initializeMap();
  }

	render() {
		return <div style={{ width: 1100, height: 600 }} id="map" />;
	}
}
