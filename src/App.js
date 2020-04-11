import React , { useState, useEffect }from 'react';
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])
  
  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data)
      setRepositories(response.data)
    })
  },[])

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {             
      title: `Novo projeto ${Date.now()}`,
      owner: "Diego"
    })

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repository => repository.id !== id))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => (
          <div key={repository.id} style={{ display: 'flex' }}>          
            <li>
              
              <p>{repository.title}</p>

              <button style={{ marginRight: '15px' }} onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
          
            </li>
          </div>
        ))}        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
