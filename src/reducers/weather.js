const weatherReducer = (state = 0, action) => {
    switch (action.type) {
        case 'CHANGE_WEATHER':
            return state = action.payload;
        default:
            return state;
    }
}

export default weatherReducer;