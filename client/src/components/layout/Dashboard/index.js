import Dashboard from './Dashboard';
import { connect } from 'react-redux';

const mapStateToProps = ({ auth, navbar }) => ({ auth, navbar });

export default connect(mapStateToProps, {})(Dashboard);
