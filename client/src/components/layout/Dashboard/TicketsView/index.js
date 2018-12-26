import TicketsView from './TicketsView';
import { connect } from 'react-redux';
import {
	fetchTickets,
	editTicketStatus,
	fetchTicket,
	clearTicket,
	toggleEditTicket,
	toggleDisplayTicket
} from '../../../../actions/ticketActions';

import { fetchUsers } from '../../../../actions/userActions';
import { fetchProjects } from '../../../../actions/projectActions';

const mapStateToProps = ({ auth, ticket, users, ticketsView }) => ({ auth, ticket, users, ticketsView });

export default connect(mapStateToProps, {
	fetchTickets,
	fetchUsers,
	fetchProjects,
	editTicketStatus,
	fetchTicket,
	clearTicket,
	toggleEditTicket,
	toggleDisplayTicket
})(TicketsView);
