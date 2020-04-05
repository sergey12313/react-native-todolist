

export const reducer = (state: Array<StateItem>, action: Actions): Array<StateItem>=>{
    switch (action.type) {
        case Types.add:
            return [action.payload, ...state]
        case Types.remove:
            return state.filter(({id})=> id!== action.payload)
        case Types.toogle: 
            return state.map(el=> {
                if(el.id !== action.payload) {
                    return {...el};
                }
                else return {...el, ...{isComplete: !el.isComplete}}
            })
    }
}
