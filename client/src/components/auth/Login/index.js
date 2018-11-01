import Login from './Login';
import { loginUser } from '../../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ auth, errors }) => ({
	auth,
	errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
