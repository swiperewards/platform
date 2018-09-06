export default function (state = {}, action) {
    switch (action.type) {
        case 'VALIDATE_USER':
            return { ...state, user: action.payload };
        case 'REGISTER_USER':
            return { registerUser: action.payload };    
        default:
            return state;
    }
}