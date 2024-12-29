import { useSearchParams } from 'next/navigation'

function BrowseContent() {
  const searchParams = useSearchParams()
  // Use searchParams as needed in your component logic
  console.log(searchParams) //Example usage: log the search parameters

  return (
    <div>
      {/* Rest of your BrowseContent component */}
    </div>
  );
}

export default BrowseContent;

