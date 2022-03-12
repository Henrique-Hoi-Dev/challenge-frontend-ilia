import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import '../styles/infoPokemon.scss'
import { Header } from "../components/Header";

interface Value {
  type: string;
  value: string;
}

interface Dano {
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: string;
}

interface Dados {
  id: string;
  name: string;
  types: [string];
  imageUrl: string;
 resistances: Value[];
 weaknesses: Value[];
 attacks: Dano[];
}

type Pokemos = {
  card: Dados;
}

export function InfoPokemon() {
  const [api, setApi] = useState<Pokemos>();
  const { id } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch(`https://api.pokemontcg.io/v1/cards/${id}`)
      .then(response => response.json())
      .then(date => { setApi(date) })
  }, [id]);

  return (
      <>
        <Header />
        <div className="info-table" >
          <div >
            <Card style={{ width: '18rem' }} >
              <Card.Img variant="top" src={api?.card.imageUrl} lang="Imagem"/>
              <Card.Body >
                <Card.Title>{api?.card.name} - <strong>{api?.card.id}</strong></Card.Title>
                {api?.card.resistances?.map((res) => (
                  <Card.Text key={res.type}>
                    Resistencia = Tipo - {res.type} / Valor {res.value} 
                  </Card.Text>
                ))}
                {api?.card.weaknesses?.map((res) => (
                  <Card.Text key={res.type}>
                    Fraqueza = Tipo - {res.type} / Valor {res.value} 
                  </Card.Text>
                ))}
                <Button variant="primary" onClick={handleShow}>
                  Informação ataques 
                </Button>
              </Card.Body>
            </Card>

            <Modal style={{ 
              fontWeight: '700',
              color: '#494D4B' 
              }} 
              show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Lista ataques</Modal.Title>
              </Modal.Header>
              {api?.card.attacks?.map((res) => (
                <Modal.Body key={res.name} style={{ padding: '2rem'}}>
                  <h3>Descrição Ataque</h3>
                  <table className="modal-info">
                    <thead>
                      <tr>
                        <td>Nome</td>
                        <td>Dano</td>
                        <td>Custo de energia</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{res.name}</td>
                        <td>{res.damage}</td>
                        <td>{res.convertedEnergyCost}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3>Descrição Pokemon</h3>
                  {res.text}
                </Modal.Body>
              ))}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
      </div>
    </>
  )
}