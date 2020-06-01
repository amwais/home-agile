import TicketsView from "./TicketsView";
import { connect } from "react-redux";
import {
	fetchTickets,
	editTicketStatus,
	fetchTicket,
	clearTicket,
	toggleEditTicket,
	clearDoneTickets,
	toggleDisplayTicket,
} from "../../../../actions/ticketActions";

import { fetchUsers } from "../../../../actions/userActions";
import { fetchProjects } from "../../../../actions/projectActions";

const mapStateToProps = ({ auth, ticket, users, ticketsView, navbar }) => ({
	auth,
	ticket,
	users,
	ticketsView,
	navbar,
});

export default connect(mapStateToProps, {
	fetchTickets,
	fetchUsers,
	fetchProjects,
	editTicketStatus,
	fetchTicket,
	clearTicket,
	toggleEditTicket,
	toggleDisplayTicket,
	clearDoneTickets,
})(TicketsView);
