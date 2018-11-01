import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Register from './Register';
import { registerUser } from '../../../actions/authActions';

const mapStateToProps = ({ auth, errors }) => ({
	auth,
	errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
