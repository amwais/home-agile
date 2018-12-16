import Project from './Project';
import { connect } from 'react-redux';
import { fetchProject, toggleEditProject } from '../../actions/projectActions';

const mapStateToProps = ({ projects }) => ({
	projects
});

export default connect(mapStateToProps, { fetchProject, toggleEditProject })(Project);
