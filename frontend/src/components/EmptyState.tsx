import type { EmptyStateProps } from '../interfaces/empty-state-props.interface'

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="h-[500px] border rounded-md shadow flex items-center justify-center">
      <p className="text-gray-500">{message}</p>
    </div>
  )
}

export default EmptyState
