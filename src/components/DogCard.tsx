// src/components/DogCard.tsx
import React from 'react'
import { Dog } from '@/utils/types'

type DogCardProps = {
  dog: Dog
  isFavorited: boolean
  onToggleFavorite: (id: string) => void
}

const DogCard: React.FC<DogCardProps> = ({ dog, isFavorited, onToggleFavorite }) => {
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white flex flex-col items-center text-center hover:shadow-lg transition duration-200">
      <img
        src={dog.img}
        alt={dog.name}
        className="w-32 h-32 object-cover rounded-full border mb-3"
      />
      <h2 className="text-lg font-bold">{dog.name}</h2>
      <p className="text-sm text-gray-600 mb-1">{dog.breed}</p>
      <p className="text-sm">Age: {dog.age}</p>
      <p className="text-sm">Zip: {dog.zip_code}</p>

      <button
        onClick={() => onToggleFavorite(dog.id)}
        className={`mt-3 px-4 py-1 rounded-full border transition duration-200 ${
          isFavorited
            ? 'bg-pink-500 text-white border-pink-500'
            : 'bg-white text-pink-500 border-pink-500 hover:bg-pink-100'
        }`}
      >
        {isFavorited ? '💖 Favorited' : '🤍 Favorite'}
      </button>
    </div>
  )
}

export default DogCard
