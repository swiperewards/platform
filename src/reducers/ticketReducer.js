export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_QUERY_TYPE':
            return {
                ...state, queryType: action.payload
            }
        case 'GENERATE_TICKET':
            return{
                generateTicket: action.payload
            }    
        case 'GET_TICKET_TYPE_LIST':
            return{
                ...state, ticketTypeList: action.payload
            }    
        case 'DELETE_TICKETTYPE':
            return{
                deleteTicketType: action.payload
            } 
        case 'ADD_TICKETTYPE':
            return{
                createTicketType: action.payload
            }     
        case 'UPDATE_TICKETTYPE':
            return{
                updateTicketType : action.payload
            }     
        case 'GET_TICKET_TYPE_DETAILS':
            return{
                ...state, ticketTypeDetails: action.payload
            }        
        default:
            return state;
    }
}