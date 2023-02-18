import { Router } from 'express';
// import {auth} from '../middlewares/auth.middleware.js';
import {sessionMiddleware} from '../middlewares/session.middleware.js';

const router = Router();

// Views Routes
router.get('/', sessionMiddleware, (req, res) => {
    res.render('login');
  });
  
  router.get('/register', sessionMiddleware, (req, res) => {
    res.render('register');
  });
  
  router.get('/profile', auth, (req, res) => {
    const user = req.user;
    res.render('profile', { user });
  });

export default router;