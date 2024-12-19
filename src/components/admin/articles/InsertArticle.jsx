import axios from 'axios';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

const InsertArticle = () => {
  const [article, setArticle] = useState({

  });
  const [scategories, setScategories] = useState([]);
  const navigate = useNavigate();

  const getScategories = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/scategories');
      setScategories(res.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des sous-catégories:', error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/articles', article);
      navigate('/articles');
    } catch (error) {
      console.error('Erreur lors de l’enregistrement de l’article:', error);
    }
  };

  useEffect(() => {
    getScategories();
  }, []);

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h1>Insérer un article</h1>
      <Form onSubmit={handleSave}>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Référence</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Référence"
              value={article.reference}
              onChange={(e) => setArticle({ ...article, reference: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Désignation</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Désignation"
              value={article.designation}
              onChange={(e) => setArticle({ ...article, designation: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Marque</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Marque"
              value={article.marque}
              onChange={(e) => setArticle({ ...article, marque: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Prix"
              value={article.prix}
              onChange={(e) => setArticle({ ...article, prix: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Qté stock</Form.Label>
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
          <Form.Group as={Col} md="12">
            <Form.Label>Sous-catégorie</Form.Label>
            <Form.Control
              as="select"
              required
              value={article.scategorieID}
              onChange={(e) => setArticle({ ...article, scategorieID: e.target.value })}
            >
              <option value="">---- Sélectionner une sous-catégorie ----</option>
              {scategories.map((scat, index) => (
                <option key={index} value={scat._id}>
                  {scat.nomscategorie}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
        <div className="button-container mt-3">
          <button type="submit" className="btn btn-success">
            <i className="fa-solid fa-save"></i> Enregistrer
          </button>
          <Link to="/articles" className="btn btn-danger ms-2">
            <i className="fa-solid fa-times"></i> Annuler
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default InsertArticle;
