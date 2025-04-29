import { render, screen, fireEvent } from '@testing-library/react'
import DogCard from '../DogCard'

const mockDog = {
  id: '1',
  name: 'Buddy',
  breed: 'Labrador',
  age: 3,
  zip_code: '12345',
  img: 'https://example.com/dog.jpg'
}

describe('DogCard', () => {
  it('renders dog information correctly', () => {
    render(
      <DogCard
        dog={mockDog}
        isFavorited={false}
        onToggleFavorite={() => {}}
      />
    )

    expect(screen.getByText('Buddy')).toBeInTheDocument()
    expect(screen.getByText('Labrador')).toBeInTheDocument()
    expect(screen.getByText('3 years old • 12345')).toBeInTheDocument()
  })

  it('calls onToggleFavorite when favorite button is clicked', () => {
    const handleToggleFavorite = jest.fn()
    
    render(
      <DogCard
        dog={mockDog}
        isFavorited={false}
        onToggleFavorite={handleToggleFavorite}
      />
    )

    fireEvent.click(screen.getByText('❤️ Favorite'))
    expect(handleToggleFavorite).toHaveBeenCalledTimes(1)
  })

  it('shows correct button text based on isFavorited prop', () => {
    const { rerender } = render(
      <DogCard
        dog={mockDog}
        isFavorited={false}
        onToggleFavorite={() => {}}
      />
    )

    expect(screen.getByText('❤️ Favorite')).toBeInTheDocument()

    rerender(
      <DogCard
        dog={mockDog}
        isFavorited={true}
        onToggleFavorite={() => {}}
      />
    )

    expect(screen.getByText('💔 Unfavorite')).toBeInTheDocument()
  })
}) 