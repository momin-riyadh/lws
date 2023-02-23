//Select DOM Element
const counterEL = document.querySelector('.lws-singleResult');
const incrementEL = document.querySelector('.lws-increment');
const decrementEL = document.querySelector('.lws-decrement');
const resetEL = document.querySelector('.lws-reset');

//Action Creators
const increment = (value) => {
    return {
        type: 'increment',
        payload: value
    }
}

const decrement = (value) => {
    return {
        type: 'decrement',
        payload: value
    }
}

const resetValue = () => {
    return {type: 'reset'}
}

//Initial State
const initialState = {
    totalValue: 0,
    incrementValue: 0,
    decrementValue: 0,
}


// Create Reducer Function
function scoreReducer(state = initialState, action) {
    if (action.type === 'increment') {
        return {
            ...state,
            totalValue: state.totalValue + action.payload,
        }
    } else if (action.type === 'decrement') {
        const updatedTotal = state.totalValue - action.payload;
        const newTotal = updatedTotal < 0 ? 0 : updatedTotal;
        return {
            ...state,
            totalValue: newTotal,
        };
    } else if (action.type === 'reset') {
        return {...initialState, totalValue: 0}
    } else {
        return state;
    }
}


// Create store
const store = Redux.createStore(scoreReducer);
const render = () => {
    const state = store.getState();
    counterEL.textContent = state.totalValue;
}

//Update UI Initially
render();
store.subscribe(render);

//Event Listener

incrementEL.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        const value = Number(incrementEL.value);
        store.dispatch(increment(value));
    }
})
decrementEL.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        const value = Number(decrementEL.value);
        store.dispatch(decrement(value));
    }
})

resetEL.addEventListener('click', () => {
    store.dispatch(resetValue());
    incrementEL.value = '';
    decrementEL.value = '';
    counterEL.textContent = 0;
});
