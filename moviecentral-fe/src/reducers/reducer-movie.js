export default function(state=null, action){
    switch(action.type){
        case "SELECTED_MOVIE":
            console.log(action.payload);
            return action.payload;
    }

    return state;
}
