//Select DOM Element
const counterEL = document.querySelectorAll('.lws-singleResult');
const incrementEL = document.querySelector('.lws-increment');
const decrementEL = document.querySelector('.lws-decrement');
const resetEL = document.querySelector('.lws-reset');
const addrowEL = document.querySelector(".lws-addMatch");
const allMatchesContainer = document.querySelector('.all-matches');

//Action Identifiers

const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const RESET = 'reset';

//Action Creators
const increment = (value) => {
    return {
        type: INCREMENT,
        payload: value
    }
}

const decrement = (value) => {
    return {
        type: DECREMENT,
        payload: value
    }
}

const resetValue = () => {
    return {type: RESET}
}

//Initial State
const initialState = {
    totalValue: 0,
    incrementValue: 0,
    decrementValue: 0,
}


// Create Reducer Function
function scoreReducer(state = initialState, action) {
    if (action.type === INCREMENT) {
        return {
            ...state,
            totalValue: state.totalValue + action.payload,
        }
    } else if (action.type === DECREMENT) {
        const updatedTotal = state.totalValue - action.payload;
        const newTotal = updatedTotal < 0 ? 0 : updatedTotal;  // Validation for negative value
        return {
            ...state,
            totalValue: newTotal,
        };
    } else if (action.type === RESET) {
        return {...initialState, totalValue: 0}
    } else {
        return state;
    }
}


// Create store
const store = Redux.createStore(scoreReducer);
const render = () => {
    const state = store.getState();
    for (singleCounter of counterEL) {
        singleCounter.textContent = state.totalValue;
    }

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

addrowEL.addEventListener('click', function () {
    const newMatchDiv = document.createElement('div');
    newMatchDiv.classList.add('match');

    newMatchDiv.innerHTML = `
    <div class="wrapper">
      <button class="lws-delete">
        <img src="./image/delete.svg" alt=""/>
      </button>
      <h3 class="lws-matchName">Match ${allMatchesContainer.children.length + 1}</h3>
    </div>
    <div class="inc-dec">
      <form class="incrementForm" onsubmit="return false">
        <h4>Increment</h4>
        <input
          type="number"
          name="increment"
          class="lws-increment"
        />
      </form>
      <form class="decrementForm" onsubmit="return false">
        <h4>Decrement</h4>
        <input
          type="number"
          name="decrement"
          class="lws-decrement"
        />
      </form>
    </div>
    <div class="numbers">
      <h2 class="lws-singleResult">0</h2>
    </div>
  `;
    allMatchesContainer.appendChild(newMatchDiv);
})
