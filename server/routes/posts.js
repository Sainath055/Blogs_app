import  express  from "express";
 
import auth from "../middleware/auth.js";
import { getPostsBySearch ,getPosts, createPost, getUserPosts, 
    updatePost, deletePost, getPost, commentPost,
    likePost, savePost, getUserSavedPosts} from "../controllers/posts.js";

const router = express.Router(); 

router.get('/search', getPostsBySearch);
router.get('/', getPosts); 
router.get('/:id', getPost);
router.get('/myPosts/:id', getUserPosts);
router.get('/saved/:id', getUserSavedPosts);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.patch('/:id/savePost', auth, savePost);
router.post('/:id/commentPost', commentPost);

export default router