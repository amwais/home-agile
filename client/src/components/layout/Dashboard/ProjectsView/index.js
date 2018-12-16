import ProjectsView from './ProjectsView';
import { connect } from 'react-redux';
import { fetchProjects } from '../../../../actions/projectActions';

const mapStateToProps = ({ auth, projects }) => ({ auth, projects });

export default connect(mapStateToProps, { fetchProjects })(ProjectsView);
