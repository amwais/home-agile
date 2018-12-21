import TicketsView from './TicketsView';
import { connect } from 'react-redux';
import { fetchTickets } from '../../../../actions/ticketActions';
import { fetchUsers } from '../../../../actions/userActions';
import { fetchProjects } from '../../../../actions/projectActions';

const mapStateToProps = ({ auth, ticket, users, ticketsView }) => ({ auth, ticket, users, ticketsView });

export default connect(mapStateToProps, { fetchTickets, fetchUsers, fetchProjects })(TicketsView);
