
export default function (state = null, action) {
    switch (action.type) {
        case "USER_SUBSCRIPTION":
            console.log(action.payload);
            return action.payload;
        default: break;
    }
    return state;
}
