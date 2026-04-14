import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Social Publisher</h1>

      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.content}</strong>
            <pre>{JSON.stringify(post.platformStatus, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;