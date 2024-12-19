import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListArticles = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/articles');
      setArticles(res.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await axios.delete(`http://localhost:3001/api/articles/${id}`);
        setArticles(articles.filter((article) => article._id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'article:', error);
      }
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <center><h1>ListArticles</h1></center>
      <td>
        <Link to="/articles/add">
          <button className="btn btn-success add-button">
            <i className="fa-solid fa-square-plus"></i> Nouveau
          </button>
        </Link>
      </td>

      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">Référence</th>
            <th scope="col">Désignation</th>
            <th scope="col">Marque</th>
            <th scope="col">Stock</th>
            <th scope="col">Prix</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Image</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((art, index) => (
            <tr key={index}>
              <td>{art.reference}</td>
              <td>{art.designation}</td>
              <td>{art.marque}</td>
              <td>{art.qtestock}</td>
              <td>{art.prix}</td>
              <td>{art.categorie}</td>
              <td>
                <img src={art.imageart} alt="Article" width={80} height={80} />
              </td>
              <td>
                <Link to={`/articles/edit/${art._id}`}>
                  <button className="btn btn-warning btn-sm">
                    <i className="fa-solid fa-pencil-alt"></i> Update
                  </button>
                </Link>
              </td>
              <td>
                <button className="btn btn-danger mx-2" onClick={() => handleDelete(art._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListArticles;
