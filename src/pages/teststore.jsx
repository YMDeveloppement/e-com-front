// src/App.js

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/features/counter/counterSlice';

function TestStore() {
  // ✅ READ from store
  const count = useSelector(function (globalstate){
    return globalstate.counterres.val_countter
  });

  // ✅ GET dispatch function
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>

      <button onClick={() => dispatch(increment())}>
        + Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        - Decrement
      </button>

      <button onClick={() => dispatch(incrementByAmount(5))}>
        + Add 5
      </button>
    </div>
  );
}

export default TestStore;

// ```

// ---

// ## 🔄 Full Flow Recap
// ```
// User clicks "+ Increment"
//         ↓
// dispatch(increment())        → sends action to store
//         ↓
// counterSlice reducer runs    → state.value += 1
//         ↓
// Store updates                → value is now 1
//         ↓
// useSelector detects change   → component re-renders
//         ↓
// UI shows: Count: 1 ✅