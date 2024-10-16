import React from 'react'

export default function Category({category}) {
    return <>
            <figcaption className='mx-2 p-4 product rounded'>
                <img style={{height:"250px"}} src={category.image} className='w-100 pb-3' alt={category.name} />
                <figcaption>
                    <h2 className='h6 fw-bold text-center'>{category.name}</h2>
                </figcaption>
            </figcaption>
    </>
}
