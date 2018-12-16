import TicketsView from './TicketsView';
import { connect } from 'react-redux';
import { fetchTickets } from '../../../../actions/ticketActions';
import { fetchUsers } from '../../../../actions/userActions';
import { fetchProjects } from '../../../../actions/projectActions';

const mapStateToProps = ({ auth, ticket, users }) => ({ auth, ticket, users });

export default connect(mapStateToProps, { fetchTickets, fetchUsers, fetchProjects })(TicketsView);
