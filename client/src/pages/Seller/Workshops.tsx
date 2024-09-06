import React from 'react'
import { useNavigate } from 'react-router-dom'
interface Workshop {
  id: string
  title: string
  videoId: string
}

const workshopData: Workshop[] = [
  {
    id: '1',
    title: 'लाख की नौकरी छोड आज करोड़ों कमा रहा ह',
    videoId: 'JwZc0eYYNUI',
  },
  {
    id: '2',
    title: 'Organic Agriculture Kya hota hai?',
    videoId: 'wougJaN_Ha0',
  },
  {
    id: '3',
    title: 'जॉब छोड़कर केले से लाखों कमाई',
    videoId: 'I1uTbS3Nw9Y',
  },
  {
    id: '4',
    title: 'Mango Farming Techniques',
    videoId: 'FEZY3uLLGBA',
  },
]

export const Workshops: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
      >
        ← Back
      </button>
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Workshops
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workshopData.map((workshop) => (
          <div
            key={workshop.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:-translate-y-2"
          >
            <h2 className="text-xl font-semibold p-4 bg-gray-800 text-white">
              {workshop.title}
            </h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${workshop.videoId}`}
                title={workshop.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
