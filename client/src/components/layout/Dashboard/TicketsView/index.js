import TicketsView from './TicketsView';
import { connect } from 'react-redux';
import { fetchTickets } from '../../../../actions/ticketActions';
import { fetchUsers } from '../../../../actions/userActions';

const mapStateToProps = ({ auth, ticket, users }) => ({ auth, ticket, users });

export default connect(mapStateToProps, { fetchTickets, fetchUsers })(TicketsView);
