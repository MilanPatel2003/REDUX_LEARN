import { useAppDispatch, useAppSelector } from '@/app/hooks'
import Button from '@/components/Button/Button'
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  setStep,
} from './counterSlice'

function Counter() {
  // useAppSelector reads a specific piece of state from the store
  // selector function receives the FULL state, you pick what you need
  const count = useAppSelector((state) => state.counter.value)
  const step = useAppSelector((state) => state.counter.step)

  // useAppDispatch gives you the dispatch function
  const dispatch = useAppDispatch()

  const countColorClass =
    count > 0
      ? 'text-green-600'
      : count < 0
        ? 'text-red-600'
        : 'text-gray-500'

  return (
    <div className="flex flex-col items-center gap-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700">Redux Counter</h2>

      {/* Display current state from store */}
      <span className={`text-5xl font-bold ${countColorClass}`}>
        {count}
      </span>

      {/* Dispatch actions on click */}
      <div className="flex items-center gap-3">
        <Button
          label="−"
          variant="secondary"
          onClick={() => dispatch(decrement())}
        />
        <Button
          label="+"
          variant="primary"
          onClick={() => dispatch(increment())}
        />
      </div>

      {/* Dispatch action with a payload */}
      <div className="flex items-center gap-3">
        <Button
          label="+10"
          variant="ghost"
          onClick={() => dispatch(incrementByAmount(10))}
        />
        <Button
          label="Reset"
          variant="danger"
          size="sm"
          onClick={() => dispatch(reset())}
        />
      </div>

      {/* Step control */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600">Step:</label>
        {[1, 5, 10].map((s) => (
          <button
            key={s}
            onClick={() => dispatch(setStep(s))}
            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
              step === s
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400">
        Current step: <span className="font-semibold">{step}</span>
      </p>
    </div>
  )
}

export default Counter