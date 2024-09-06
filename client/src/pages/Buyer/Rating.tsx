import React, { useState } from 'react'
import { postRequest } from '@/types/generalServices'

const Rating = () => {
  const [quality, setQuality] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [rating, setRating] = useState<number>(0)

  const handleQualityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuality(event.target.value)
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('rating', rating.toString())
    formData.append('quality', quality || '')
    formData.append('quantity', quantity || '')
    if (image) {
      formData.append('image', image)
    }

    try {
      const response = await postRequest('/ratings', formData)
      if (response.status !== 200) {
        throw new Error('Failed to submit rating')
      }
      console.log('Rating submitted successfully')
    } catch (error) {
      console.error('Error submitting rating:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Feedback Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate your experience:
          </label>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star}>
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  className="hidden"
                  onClick={() => setRating(star)}
                />
                <span
                  className={`text-3xl cursor-pointer transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  &#9733;
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Have you received good quality?
          </label>
          <div className="flex space-x-4">
            {['yes', 'no'].map((value) => (
              <label key={value} className="inline-flex items-center">
                <input
                  type="radio"
                  name="quality"
                  value={value}
                  checked={quality === value}
                  onChange={handleQualityChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 capitalize">{value}</span>
              </label>
            ))}
          </div>
        </div>

        {quality === 'no' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload an image:
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Have you received the expected quantity?
          </label>
          <div className="flex space-x-4">
            {['yes', 'no'].map((value) => (
              <label key={value} className="inline-flex items-center">
                <input
                  type="radio"
                  name="quantity"
                  value={value}
                  checked={quantity === value}
                  onChange={handleQuantityChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 capitalize">{value}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  )
}

export default Rating
