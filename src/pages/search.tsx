// src/pages/search.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DogCard from '@/components/DogCard';
import { getBreeds } from '@/services/DogService';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const size = 10;

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const res = await getBreeds()
        setBreeds(res)
      } catch (err) {
        console.error('Failed to load breeds:', err)
      }
    }
  
    loadBreeds()
  }, [])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
  
        const searchRes = await searchDogs({
          breeds: selectedBreed ? [selectedBreed] : undefined,
          sort: `breed:${sortOrder}`,
          size: 12,
          from,
        })
  
        const dogDetails = await getDogsByIds(searchRes.resultIds)
        setDogIds(searchRes.resultIds)
        setDogs(dogDetails)
      } catch (err) {
        console.error('Error fetching dogs:', err)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchData()
  }, [selectedBreed, sortOrder, from])
  

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedBreed) params.append('breeds', selectedBreed);
    params.append('sort', `breed:${sortOrder}`);
    params.append('size', String(size));
    params.append('from', String(page * size));

    fetch(`/api/dogs/search?${params.toString()}`, { credentials: 'include' })
      .then((res) => res.json())
      .then(async (data) => {
        const dogRes = await fetch('/api/dogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data.resultIds),
        });
        const dogData = await dogRes.json();
        setDogs(dogData);
      })
      .catch(console.error);
  }, [selectedBreed, sortOrder, page]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const generateMatch = async () => {
    if (favorites.length === 0) return;
    const res = await fetch('/api/dogs/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(favorites),
    });
    const data = await res.json();
    alert(`🎉 Your matched dog ID: ${data.match}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Find Your Perfect Pup 🐶</h1>

      <div className="flex gap-4 mb-4">
        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>

        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
        >
          Sort: {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorited={favorites.includes(dog.id)}
            onToggleFavorite={() => toggleFavorite(dog.id)}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          className="p-2 bg-gray-300 rounded"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </button>

        <button
          className="p-2 bg-gray-300 rounded"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          className="px-6 py-3 bg-pink-600 text-white rounded text-lg"
          onClick={generateMatch}
        >
          ❤️ Generate Match
        </button>
      </div>
    </div>
  );
}
