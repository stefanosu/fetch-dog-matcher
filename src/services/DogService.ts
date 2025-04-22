// src/services/dogService.ts
import { Dog, MatchResponse, SearchResponse } from '@/utils/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE

const fetchWithCreds = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export const login = (name: string, email: string) =>
  fetchWithCreds('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ name, email }),
  })

export const logout = () =>
  fetchWithCreds('/auth/logout', { method: 'POST' })

export const getBreeds = (): Promise<string[]> =>
  fetchWithCreds('/dogs/breeds')

export const searchDogs = (params: {
  breeds?: string[]
  zipCodes?: string[]
  ageMin?: number
  ageMax?: number
  sort?: string // e.g., "breed:asc"
  size?: number
  from?: number
}): Promise<SearchResponse> => {
  const query = new URLSearchParams()

  if (params.breeds) params.breeds.forEach(b => query.append('breeds', b))
  if (params.zipCodes) params.zipCodes.forEach(z => query.append('zipCodes', z))
  if (params.ageMin) query.append('ageMin', params.ageMin.toString())
  if (params.ageMax) query.append('ageMax', params.ageMax.toString())
  if (params.sort) query.append('sort', params.sort)
  if (params.size) query.append('size', params.size.toString())
  if (params.from) query.append('from', params.from.toString())

  return fetchWithCreds(`/dogs/search?${query.toString()}`)
}

export const getDogsByIds = (ids: string[]): Promise<Dog[]> =>
  fetchWithCreds('/dogs', {
    method: 'POST',
    body: JSON.stringify(ids),
  })

export const matchDog = (favoriteIds: string[]): Promise<MatchResponse> =>
  fetchWithCreds('/dogs/match', {
    method: 'POST',
    body: JSON.stringify(favoriteIds),
  })
