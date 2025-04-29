'use client'

import { Dog } from '@/utils/types'
import Image from 'next/image'

interface DogCardProps {
  dog: Dog
  isFavorited: boolean
  onToggleFavorite: () => void
}

export default function DogCard({ dog, isFavorited, onToggleFavorite }: DogCardProps) {
  return (
    <div className="max-w-[200px] w-full border rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between h-full bg-white/90 backdrop-blur-sm hover:scale-105">
    <div className="aspect-[4/3] overflow-hidden rounded-[20px] mb-4">
      <Image
        src={dog.img}
        alt={`Photo of ${dog.name}`}
        className="w-full h-full object-cover transform hover:scale-110 transition duration-300"
        width={200}
        height={150}
      />
    </div>
  
    <div className="flex-1">
      <h3 className="font-bold text-lg mb-1 text-gray-800">{dog.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{dog.breed}</p>
      <p className="text-sm text-gray-500">
        {dog.age} years old • {dog.zip_code}
      </p>
    </div>
  
    <button
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      onClick={onToggleFavorite}
      className={`mt-4 w-full px-4 py-2 rounded-xl text-white text-sm font-semibold ${
        isFavorited
          ? 'bg-pink-500 hover:bg-pink-600'
          : 'bg-blue-500 hover:bg-blue-600'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-all duration-200`}
    >
      {isFavorited ? '💔 Unfavorite' : '❤️ Favorite'}
    </button>
  </div>
  
  )
}
