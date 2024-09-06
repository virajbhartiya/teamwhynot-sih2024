import { IUser } from '@/types/interface'
import { getRequest } from '@/utility/generalServices'
import React, { useState, useEffect } from 'react'

function KisanConnect() {
  const [users, setUsers] = useState<IUser[]>([])
  // const [sortField, setSortField] = useState<keyof IUser>('firstName')
  // const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await getRequest('/users')
    setUsers(response.data.data)
  }

  // const sortUsers = (field: keyof IUser) => {
  //   const isAsc = sortField === field && sortDirection === 'asc'
  //   setSortField(field)
  //   setSortDirection(isAsc ? 'desc' : 'asc')
  //   setUsers(
  //     [...users].sort((a, b) => {
  //       const comparison = (a[field] as string).localeCompare(
  //         b[field] as string
  //       )
  //       return isAsc ? -comparison : comparison
  //     })
  //   )
  // }

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.emailId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Kisan Connect</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200"></thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{user.firstName}</td>
                <td className="p-3">{user.lastName}</td>
                <td className="p-3">{user.emailId}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleCall(user.phone)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                  >
                    Call
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredUsers.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No users found</p>
      )}
    </div>
  )
}

export default KisanConnect
