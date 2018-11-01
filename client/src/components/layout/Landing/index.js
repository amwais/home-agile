import Landing from './Landing';
import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({
	auth
});

export default connect(mapStateToProps, undefined)(Landing);
