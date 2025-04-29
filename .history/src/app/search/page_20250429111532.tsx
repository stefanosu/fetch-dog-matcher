'use client'

import { useEffect, useState } from 'react'
import DogCard from '@/components/DogCard'
import {
  getBreeds,
  searchDogs,
  getDogsByIds,
  matchDog,
} from '@/services/DogService'
import { Dog } from '@/utils/types'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import EmptyState from '@/components/EmptyState'
import toast from 'react-hot-toast'

export default function SearchPage() {
  const [breeds, setBreeds] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState('')
  const [dogs, setDogs] = useState<Dog[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const size = 12

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
    const fetchDogs = async () => {
      try {
        setIsLoading(true)
        const offset = page * size

        const searchRes = await searchDogs({
          breeds: selectedBreed ? [selectedBreed] : undefined,
          sort: `breed:${sortOrder}`,
          size,
          from: offset,
        })

        const dogDetails = await getDogsByIds(searchRes.resultIds)
        setDogs(dogDetails)
      } catch (err) {
        console.error('Error fetching dogs:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDogs()
  }, [selectedBreed, sortOrder, page])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    )
  }

  const generateMatch = async () => {
    if (favorites.length === 0) return

    try {
      const res = await matchDog(favorites)
      toast.success(`🎉 You matched with dog ID: ${res.match}`)
    } catch (err) {
      toast.error('Failed to generate match')
      console.error('Match error:', err)
    }
  }

  return (
    <div className="px-4">
      <div className="max-w-6xl mx-auto">
  
        <h1 className="text-2xl font-bold mb-4">Find Your Perfect Pup 🐶</h1>
  
        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <select
            value={selectedBreed}
            onChange={(e) => {
              setPage(0)
              setSelectedBreed(e.target.value)
            }}
            className="p-2 border rounded"
          >
            <option value="">All Breeds</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
  
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => {
              setPage(0)
              setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
            }}
          >
            Sort: {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
          </button>
        </div>
  
        {/* Dog Grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : dogs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavorited={favorites.includes(dog.id)}
                onToggleFavorite={() => toggleFavorite(dog.id)}
              />
            ))}
          </div>
        </div>        
        )}
  
        {/* Pagination */}
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
      </div>
  
      {/* Sticky Match Button */}
      {favorites.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={generateMatch}
            className="px-6 py-3 bg-pink-600 text-white rounded text-lg shadow-lg hover:bg-pink-700 transition"
          >
            ❤️ Generate Match
          </button>
        </div>
      )}
    </div>
  )  
}
