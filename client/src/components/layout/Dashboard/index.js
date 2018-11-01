import Dashboard from './Dashboard';
import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, undefined)(Dashboard);
