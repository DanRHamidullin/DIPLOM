import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

function ProductCarousel() {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, products } = productTopRated

    //Это хук - принимает эффект, который запуститься, только если значение dispatch не обновилось между повторными отрисовками.
    //По умолчанию эффекты запускаются после каждого завершённого рендеринга,
    // но вы можете решить запускать их только при изменении определённых значений.
    // Функция, переданная в useEffect, будет запущена после того, как рендер будет зафиксирован на экране.
    //В нашем случае эффект будет запущен, только если изменился dispatch,
    // то есть если изменилось состояние полученное в массиве deps.
    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-dark'>
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{product.name} (${product.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default ProductCarousel
