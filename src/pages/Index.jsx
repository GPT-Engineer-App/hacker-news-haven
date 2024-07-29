import { useState } from 'react';
import { Input } from "@/components/ui/input";
import HackerNewsList from '../components/HackerNewsList';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Top 100 Hacker News Stories</h1>
      <Input
        type="text"
        placeholder="Search stories..."
        className="mb-6"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <HackerNewsList searchQuery={searchQuery} />
    </div>
  );
};

export default Index;
