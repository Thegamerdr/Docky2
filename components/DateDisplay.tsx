interface DateDisplayProps {
  date: Date | string
}

export function DateDisplay({ date }: DateDisplayProps) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return <span>{formattedDate}</span>
}

