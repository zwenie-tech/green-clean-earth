import React from 'react'

type PageTitleProps = {
  title: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <h2 className='text-2xl font-medium text-center my-3 pt-4'>{title}</h2>
  )
}

export default PageTitle