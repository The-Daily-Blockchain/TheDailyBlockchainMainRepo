import React from 'react'

interface Props {
  title: string;
}

const ErrorSearch = ({ title }: Props ) => {
  return (
    <div className='h-screen text-center mt-10 font-bold text-xl'>
    <div>{title}</div>
    <div>NONE</div>
    </div>
  )
}

export default ErrorSearch