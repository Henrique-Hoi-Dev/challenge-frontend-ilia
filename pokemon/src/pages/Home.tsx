import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import '../styles/home.scss'
import PokemonSearch from '../components/PokemonSearch';
import { PokemonCarousel } from '../components/PokemonCarousel';

interface Dados {
  id: string;
  name: string;
  types: [string];
  imageUrl: string;
}

type Pokemos = {
  cards: Dados[];
}

export function Home() {
  const [apiURL, setApiURL] = useState<Pokemos | null>(null)
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.pokemontcg.io/v1/cards`)
      .then(response => response.json())
      .then(date => {
        setLoading(false);
        setApiURL(date) })
  }, []);

  return ( 
    <>
      <PokemonSearch />
      <PokemonCarousel card={apiURL?.cards}/>
      <div className='card-table'>
        {loading && <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>}
        <div className=""></div>
        <Row xs={1} md={4} className="g-4">
          {apiURL?.cards.map(({ name, imageUrl, id, types }) => (
            <Link key={id} to={`/info/${id}`}>
              <Col>
                <Card style={{ width: '18rem' }} className="mb-2" >
                    <Card.Header>{name} / <strong>{id}</strong></Card.Header>
                    <Card.Body>
                      <Card.Title><img src={imageUrl} alt="" /></Card.Title>
                      <Card.Text>Tipo Pokemon / <strong>{types}</strong></Card.Text>
                    </Card.Body>
                </Card>
              </Col>
            </Link>
          ))}
        </Row>
      </div>
    </>
 )
}