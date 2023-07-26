const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      const newStateGood = { ...state };
      newStateGood.good += 1;
      console.log('new state is', newStateGood);
      return newStateGood;
    case 'OK':
      const newStateOk = { ...state };
      newStateOk.ok += 1;
      console.log('new state is', newStateOk);

      return newStateOk;
    case 'BAD':
      const newStateBad = { ...state };
      newStateBad.bad += 1;
      console.log('new state is', newStateBad);
      return newStateBad;
    case 'ZERO':
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
