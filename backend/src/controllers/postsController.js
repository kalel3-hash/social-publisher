const posts = require('../data/posts');

exports.createPost = (req, res) => {
  const { content, platforms } = req.body;

  const platformStatus = {};
  platforms.forEach(p => {
    platformStatus[p] = 'pending';
  });

  const post = {
    id: String(posts.length + 1),
    content,
    platforms,
    platformStatus
  };

  posts.push(post);
  res.json(post);
};

exports.updatePlatformStatus = (req, res) => {
  const { postId, platform } = req.params;
  const { status } = req.body;

  const post = posts.find(p => p.id === postId);
  post.platformStatus[platform] = status;

  res.json(post);
};

exports.publishPost = (req, res) => {
  const { postId } = req.params;
  const post = posts.find(p => p.id === postId);

  Object.keys(post.platformStatus).forEach(p => {
    if (p === 'instagram' || p === 'facebook') {
      post.platformStatus[p] = 'published';
    } else {
      post.platformStatus[p] = 'manual';
    }
  });

  res.json(post);
};

exports.getPostById = (req, res) => {
  const { postId } = req.params;
  const post = posts.find(p => p.id === postId);
  res.json(post || null);
};