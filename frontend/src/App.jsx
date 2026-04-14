import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState({
    instagram: true,
    facebook: true,
    x: false,
    youtube: false
  });

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
    });
  };

  const publishPlatform = (postId, platform) => {
    fetch(`/posts/${postId}/platforms/${platform}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'published' })
    }).then(loadPosts);
  };

  const publishAll = (postId) => {
    fetch(`/posts/${postId}/publish`, { method: 'POST' })
      .then(loadPosts);
  };

  return (
    <div style={{ padding: '2rem' }}>
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
        <div key={post.id} style={{ marginBottom: '2rem' }}>
          <strong>{post.content}</strong>

          <div>
            <button onClick={() => publishAll(post.id)}>
              Publicar todo
            </button>
          </div>

          <ul>
            {Object.entries(post.platformStatus).map(([platform, status]) => (
              <li key={platform}>
                {platform}: {status}
                <button
                  style={{ marginLeft: '1rem' }}
                  onClick={() => publishPlatform(post.id, platform)}
                >
                  Publicar
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;