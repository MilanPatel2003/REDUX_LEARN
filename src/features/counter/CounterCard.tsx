import Button from '@/components/Button/Button'
import { useState } from 'react'

interface CounterCardProps {
  step?: number
}

function CounterCard({ step = 1 }: CounterCardProps) {
  const [count, setCount] = useState(0)

  const handleDecrement = () => setCount((prev) => prev - step)
  const handleIncrement = () => setCount((prev) => prev + step)
  const handleReset = () => setCount(0)

  // Extracted to a helper — keeps JSX clean and easy to read
  const countColorClass =
    count > 0 ? 'text-green-600' : count < 0 ? 'text-red-600' : 'text-gray-500'

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold text-gray-700">Counter</h2>

      {/* Count display */}
      <span className={`text-4xl font-bold ${countColorClass}`}>
        {count}
      </span>

      {/* +/- controls */}
      <div className="flex items-center gap-3">
        <Button label="−" onClick={handleDecrement} variant="secondary" />
        <Button label="+" onClick={handleIncrement} variant="primary" />
      </div>

      {/* Reset */}
      <Button label="Reset" onClick={handleReset} variant="danger" size="sm" />
    </div>
  )
}

export default CounterCard