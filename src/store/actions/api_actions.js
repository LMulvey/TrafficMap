import {
	FETCH_API_START,
	FETCH_API_SUCCESS,
	FETCH_API_FAILURE
} from "./action_types";

const api_url = 'https://data.edmonton.ca/resource/87ck-293k.json';

function createFeatureCollection(data) {
  let features = [];
  data.forEach(point => {
    features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 
          parseFloat(point.location.longitude),
          parseFloat(point.location.latitude)
         ]
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

export function fetchAPIStart() { 
  return {
    type: FETCH_API_START
  }
}

export function fetchAPISuccess(data) {
  return {
    type: FETCH_API_SUCCESS,
    payload: data
  }
}

export function fetchAPIFailure() {
  return {
    type: FETCH_API_FAILURE
  }
}

export function fetchFromAPI() {
  return dispatch => {
    dispatch(fetchAPIStart());
    fetch(api_url, { method: 'GET' })
      .then(response => response.json())
      .then(response => createFeatureCollection(response))
      .then(response => dispatch(fetchAPISuccess(response)))
      .catch(e => dispatch(fetchAPIFailure()));
  }
}
