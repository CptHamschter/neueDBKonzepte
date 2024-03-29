import express from 'express';
import Post from '../models/post.mjs';
import authorize from '../middleware/authorize.mjs';

const router = express.Router();

// Post erstellen (nur Journalisten und Admins) ---- NUR Journalisten
router.post('/post-erstellen', authorize(['journalist', 'admin']), async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({
      title,
      content,
      author: req.user._id, // Angenommen, req.user wird durch die Authentifizierungsmiddleware gesetzt
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Fehler beim Erstellen des Posts', error: error });
  }
});

// Alle Posts abrufen (für alle Benutzer zugänglich)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author','email');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Posts', error: error });
  }
});

// Post aktualisieren (nur Journalisten und Admins) ---- NUR JOURNALISTEN
router.put('/:id', authorize(['journalist', 'admin']), async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post nicht gefunden' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Fehler beim Aktualisieren des Posts', error: error });
  }
});

// Post löschen (nur Admins) UND JOURNA
router.delete('/:id', authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post nicht gefunden' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Löschen des Posts', error: error });
  }
});

// Like hinzufügen/entfernen (für alle Benutzer zugänglich)
router.post('/:id/like', authorize(['user', 'journalist', 'admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post nicht gefunden' });
    }
    const index = post.likes.indexOf(req.user._id);
    if (index === -1) {
      post.likes.push(req.user._id);
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Fehler beim Liken/Entliken des Posts', error: error });
  }
});

// Kommentar hinzufügen (für alle Benutzer zugänglich) ----- NUR FÜR NUTZER
router.post('/:id/comment', authorize(['user', 'journalist', 'admin']), async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post nicht gefunden' });
    }
    post.comments.push({ body: comment, date: new Date(), author: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Fehler beim Hinzufügen des Kommentars', error: error });
  }
});

export default router;



