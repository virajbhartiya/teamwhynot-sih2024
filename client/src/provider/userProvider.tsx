/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '@/types/interface'
import { getRequest } from '@/utility/generalServices'
import { getcookie } from '@/utility/helper'
import { useState, useEffect, useCallback, ReactNode } from 'react'
import { createContext, useContext } from 'react'

interface UserProviderProps {
  children: ReactNode
  userId?: string
}

const UserProvider: React.FC<UserProviderProps> = ({ children, userId }) => {
  const [user, setUser] = useState<IUserContext['user'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  const triggerRefetch = useCallback(() => {
    setUser(null)
    setLoading(true)
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const token = getcookie('jwt')
        if (!token) {
          setUser(null)
          return
        }

        const response = await getRequest('/users/me')
        if (response.status !== 200)
          throw new Error('Failed to fetch current user data')
        if ('user' in response) {
          setUser(response.user as IUserContext['user'])
        } else {
          throw new Error('Failed to fetch user data')
        }
      } catch (e: any) {
        console.error('Error fetching user data:', e)
        setUser(null)
        setError(e.message || 'An error occurred while fetching user data')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [triggerRefetch, userId])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>{error}</h1>
      </div>
    )
  }

  return (
    <UserContext.Provider value={{ user, triggerRefetch, error }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

export const useUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)

  const refreshData = useCallback(async () => {
    setLoading(true)
    try {
      const token = getcookie('jwt')
      const mockIsLoggedIn = !!token
      setIsLoggedIn(mockIsLoggedIn)

      if (mockIsLoggedIn) {
        const response = await getRequest('/users/me')
        if ('user' in response) setUser(response.user)
      }
    } catch (error) {
      console.error('Error fetching authentication data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshData()
  }, [refreshData])

  return { isLoggedIn, user, loading, refreshData }
}

interface IUserContext {
  user: IUser | null
  triggerRefetch: () => void
  error: string
}

export const UserContext = createContext<IUserContext>({
  user: null,

  triggerRefetch: function (): void {
    throw new Error('Function not implemented.')
  },
  error: '',
})

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within an EmployeeProvider')
  }
  return context
}
