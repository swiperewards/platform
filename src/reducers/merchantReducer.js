export default function (state = {}, action) {
    switch (action.type) {
        case 'ONBOARD_MERCHANT':
            return {
                ...state, data: action.payload
            }
        default:
            return state;
    }
}
