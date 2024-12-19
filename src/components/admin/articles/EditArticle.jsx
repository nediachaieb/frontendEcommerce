import axios from 'axios';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditArticle = () => {
  const [article, setArticle] = useState({})
  const [scategories, setScategories] = useState([])
  const navigate = useNavigate()
  ///

  const { id } = useParams()

  const fetcharticle = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/articles/${id}`);
      setArticle(res.data)

    } catch (error) {
      console.log(error)

    }


  }
  const getscategories = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/scategories');
      setScategories(res.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des scategories:', error);
    }

  }
  const handleSave = async (e) => {
    e.preventDefault()
    try {

      await axios.put(`http://localhost:3001/api/articles/${id}`, article)
      navigate("/articles")

    }
    catch (error) {
      console.log(error)
    }


  }
  useEffect(() => {
    getscategories()
    fetcharticle(id)
  }, []);
  return (
    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
      <h1>insert un article</h1>
      <Form>

        <Row>
          <Form.Group as={Col} md="6" >
            <Form.Label>Reference</Form.Label>
            <Form.Control required type="text" placeholder="Référence" value={article.reference} onChange={(e) => setArticle({ ...article, reference: e.target.value })} />
          </Form.Group>


          <Form.Group as={Col} md="6" >
            <Form.Label>Désignation</Form.Label>
            <Form.Control required type="text" placeholder="Désignation" value={article.Designation} onChange={(e) => setArticle({ ...article, Designation: e.target.value })} />
          </Form.Group>

        </Row>

        <Row>
          <Form.Group as={Col} md="6" >
            <Form.Label>Marque</Form.Label>
            <Form.Control required type="text" placeholder="Marque" value={article.marque} onChange={(e) => setArticle({ ...article, marque: e.target.value })} />
          </Form.Group>


          <Form.Group as={Col} md="6" >
            <Form.Label>Prix</Form.Label>
            <Form.Control required type="text" placeholder="Prix" value={article.prix} onChange={(e) => setArticle({ ...article, prix: e.target.value })} />
          </Form.Group>

        </Row >
        <Row>
          <Form.Group className="col-md-6 ">
            <Form.Label>
              Qté stock<span className="req-tag">*</span>
            </Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Qté stock"
              value={article.qtestock}
              onChange={(e) => setArticle({ ...article, qtestock: e.target.value })}
            />

          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image"
              value={article.imageart}
              onChange={(e) => setArticle({ ...article, imageart: e.target.value })}

            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md='12'>
            <Form.Label>Scategorie</Form.Label>
            <Form.Control type="text"
              as={"select"}
              placeholder="S/categorie"
              value={article.scategorieID} onChange={(e) => setArticle({ ...article, scategorieID: e.target.value })} >
              <option>----Selectionner une sous categories----</option>
              {
                scategories.map((scat, index) =>
                  <option value={scat._id} key={index}>{scat.nomscategorie}</option>
                )
              }
            </Form.Control>
          </Form.Group>
        </Row>

        <div className="button-container">
          <button className="btn btn-success" onClick={(e) => handleSave(e)} >
            <i className="fa-solid fa-save"></i> Enregistrer
          </button>
          <Link to="/articles"><button className="btn btn-danger" >
            <i className="fa-solid fa-times"></i> Annuler
          </button></Link>
        </div>
      </Form>

    </div >
  )
}
export default EditArticle

