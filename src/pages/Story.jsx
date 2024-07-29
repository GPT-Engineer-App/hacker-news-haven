import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const fetchStory = async (id) => {
  const response = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch story');
  }
  return response.json();
};

const Story = () => {
  const { id } = useParams();
  const { data: story, isLoading, error } = useQuery({
    queryKey: ['story', id],
    queryFn: () => fetchStory(id),
  });

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="flex items-center text-blue-500 hover:underline mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to list
      </Link>
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-sm text-gray-600">By: {story.author}</span>
        <span className="text-sm text-gray-600">Points: {story.points}</span>
        <Button variant="ghost" size="sm" className="flex items-center">
          <MessageSquare className="mr-1 h-4 w-4" />
          {story.children.length}
        </Button>
      </div>
      {story.url && (
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:underline mb-6"
        >
          Read full story <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      )}
      <h2 className="text-xl font-semibold mb-4">Comments:</h2>
      <ul className="space-y-4">
        {story.children.map((comment) => (
          <li key={comment.id} className="border p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">By: {comment.author}</p>
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Story;
