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
        default:
            return state;
    }
}