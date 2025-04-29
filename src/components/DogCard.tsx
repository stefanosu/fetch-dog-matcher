'use client'

import { Dog } from '@/utils/types'

interface DogCardProps {
  dog: Dog
  isFavorited: boolean
  onToggleFavorite: () => void
}

export default function DogCard({ dog, isFavorited, onToggleFavorite }: DogCardProps) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between h-full">
      <img
        src={dog.img}
        alt={`Photo of ${dog.name}`}
        className="rounded-lg w-full h-48 object-cover mb-4"
      />

      <div className="flex-1">
        <h3 className="font-bold text-xl mb-1 text-gray-800">{dog.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{dog.breed}</p>
        <p className="text-sm text-gray-400">{dog.age} years old • {dog.zip_code}</p>
      </div>

      <button
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        onClick={onToggleFavorite}
        className={`mt-4 w-full px-4 py-2 rounded-md text-white text-sm font-semibold ${
          isFavorited ? 'bg-pink-600 hover:bg-pink-700' : 'bg-blue-500 hover:bg-blue-600'
        } focus:outline-none focus:ring-2 focus:ring-pink-400 transition`}
      >
        {isFavorited ? '💔 Unfavorite' : '❤️ Favorite'}
      </button>
    </div>
  )
}
