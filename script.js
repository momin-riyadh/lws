//Select DOM ELEMENT
const counterEL = document.getElementById('counter');
const incrementEL = document.getElementById('increment');
const decrementEL = document.getElementById('decrement');

//Action Creators
const increment = (value) => {
    return {
        type: 'INCREMENT',
        payload: value
    }
}

const decrement = (value) => {
    return {
        type: 'DECREMENT',
        payload: value
    }
}

// Action Identifiers
const INCREMENT = 'increment';
const DECREMENT = 'decrement';


//Initial State
const initialState = {
    value: 0,
};

// Create Reducer Function
function counterReducer(state = initialState, action) {
    if (action.type === 'INCREMENT') {
        return {
            ...state,
            value: state.value + action.payload,
        }
    } else if (action.type === 'DECREMENT') {
        return {
            ...state,
            value: state.value - action.payload,
        }
    } else {
        return state;
    }
}

//Create store
const store = Redux.createStore(counterReducer);
const render = () => {
    const state = store.getState();
    counterEL.innerText = state.value.toString();
}

//Update UI Initially
render();

store.subscribe(render);

//Event Lisntener
incrementEL.addEventListener('click', () => {
    store.dispatch(increment(100))
})

decrementEL.addEventListener('click', () => {
    store.dispatch(decrement(50))
})
