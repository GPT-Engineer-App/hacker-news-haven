import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const fetchHackerNewsStories = async () => {
  const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100');
  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }
  return response.json();
};

const HackerNewsList = ({ searchQuery }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hackerNewsStories'],
    queryFn: fetchHackerNewsStories,
  });
  const [filteredStories, setFilteredStories] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredStories(
        data.hits.filter((story) =>
          story.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [data, searchQuery]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <ul className="space-y-4">
      {filteredStories.map((story) => (
        <li key={story.objectID} className="border p-4 rounded-lg">
          <Link to={`/story/${story.objectID}`} className="block hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Upvotes: {story.points}</span>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  {story.num_comments}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">View story</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HackerNewsList;
