import Carousel from 'react-bootstrap/Carousel'

import '../styles/carousel.scss'

interface Dados {
  id?: string;
  name?: string;
  types?: [string];
  imageUrl?: string;
}

type Pokemos = {
  card?: Dados[];
}

export function PokemonCarousel({card}: Pokemos) {
  
  return (
    <div className='carousel'>
      <Carousel >
        {card?.map((res) => (
        <Carousel.Item key={res.id}>
          <img
            className="d-block w-100"
            src={res.imageUrl}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{res.name} / <strong>{res.id}</strong></h3>
            <h2>{res.types}</h2>
          </Carousel.Caption>
        </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}