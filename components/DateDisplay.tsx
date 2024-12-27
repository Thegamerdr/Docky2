import { format } from 'date-fns'

interface DateDisplayProps {
  date: Date | string
}

export function DateDisplay({ date }: DateDisplayProps) {
  const formattedDate = format(new Date(date), 'MMMM dd, yyyy')

  return <span>{formattedDate}</span>
}

