import { connect } from 'react-redux';
import { fetchFromAPI } from './store/actions/api_actions';
import Home from './Home';

const mapStateToProps = state => {
  return {
    API: state.APIReducer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    startFetch: () => dispatch(fetchFromAPI())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
