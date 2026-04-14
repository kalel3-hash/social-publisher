import { useEffect, useState } from 'react';
import './styles.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState({
    instagram: true,
    facebook: true,
    x: false,
    youtube: false
  });
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const loadPosts = () => {
    fetch('/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const togglePlatform = (name) => {
    setPlatforms(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const createPost = () => {
    const selectedPlatforms = Object.keys(platforms).filter(p => platforms[p]);

    if (!content || selectedPlatforms.length === 0) {
      showToast('Completá contenido y plataformas', 'warn');
      return;
    }

    fetch('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        platforms: selectedPlatforms
      })
    }).then(() => {
      setContent('');
      loadPosts();
      showToast('Post creado', 'success');
    });
  };

  const publishPlatform = (postId, platform) => {
    fetch(`/posts/${postId}/platforms/${platform}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'published' })
    }).then(() => {
      loadPosts();
      showToast(`${platform} publicado`, 'success');
    });
  };

  const publishAll = (postId) => {
    fetch(`/posts/${postId}/publish`, { method: 'POST' })
      .then(() => {
        loadPosts();
        showToast('Publicación automática realizada', 'info');
        showToast('YouTube y X requieren acción manual', 'warn');
      });
  };

  return (
    <div className="container">
      <h1>Social Publisher</h1>

      <h2>Nuevo Post</h2>
      <input
        placeholder="Contenido..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <div>
        {Object.keys(platforms).map(p => (
          <label key={p} style={{ marginRight: '1rem' }}>
            <input
              type="checkbox"
              checked={platforms[p]}
              onChange={() => togglePlatform(p)}
            />
            {p}
          </label>
        ))}
      </div>

      <button onClick={createPost}>Crear post</button>

      <hr />

      <h2>Posts</h2>

      {posts.map(post => (
        <div key={post.id} className="post">
          <strong>{post.content}</strong>

          <div>
            <button
              onClick={() => publishAll(post.id)}
              disabled={Object.values(post.platformStatus).every(s => s === 'published')}
            >
              Publicar todo
            </button>
          </div>

          <ul>
            {Object.entries(post.platformStatus).map(([platform, status]) => (
              <li key={platform}>
                {platform}:{' '}
                <span className={`status ${status}`}>{status}</span>
                <button
                  disabled={status === 'published'}
                  onClick={() => publishPlatform(post.id, platform)}
                >
                  Publicar
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;