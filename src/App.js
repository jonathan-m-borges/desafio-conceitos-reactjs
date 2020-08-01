import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    refreshRepositories();
  }, []);

  function refreshRepositories() {
    api.get('/repositories')
      .then(response => {
        setRepositories(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  async function handleAddRepository() {
    const data = { url, title, techs: techs.split(/ *, */) };
    const response = await api.post('/repositories', data);
    setRepositories([...repositories, response.data]);
    setUrl('');
    setTitle('');
    setTechs('');
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(x => x.id != id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}

      </ul>

      <p>
        <label htmlFor="url">URL:</label><br />
        <input type="text" name="url" value={url} onChange={e => setUrl(e.target.value)}></input>
      </p>
      <p>
        <label htmlFor="title">Title:</label><br />
        <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}></input>
      </p>
      <p>
        <label htmlFor="techs">Techs:</label><br />
        <input type="text" name="techs" value={techs} onChange={e => setTechs(e.target.value)}></input>
      </p>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
