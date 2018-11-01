import TicketsView from './TicketsView';
import { connect } from 'react-redux';
import { fetchTickets } from '../../../../actions/ticketActions';

const mapStateToProps = ({ auth, ticket }) => ({ auth, ticket });

export default connect(mapStateToProps, { fetchTickets })(TicketsView);
