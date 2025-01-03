import Image from 'next/image'
import React from 'react'

interface ErrorProps {
  error: string;
}

function Error({ error }: ErrorProps) {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/error.png"
            alt="Error occurred"
            width={200}
            height={200}
            className="mb-4 size-full"
          />
          <div className="text-red-500 text-center font-semibold">{error}</div>
        </div>
      </div>
  )
}

export default Error
