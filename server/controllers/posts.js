import PostMessage from "../models/postMessage.js";
import mongoose, { connect } from "mongoose";


export const getPost = async (req, res) => { 
    const { id } = req.params;
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5); 

    try {
        const post = await PostMessage.findById(id);

        const postsByTags = await PostMessage.find({ tags: { $in: post.tags } })
        const postsByTagsShuffled = shuffle(postsByTags)

        const postsByCreator = await PostMessage.find({ creator: post.creator }).limit(7)
        const postsByCreatorShuffled = shuffle(postsByCreator)

        const randomPosts = await PostMessage.aggregate(
            [ { $sample: { size: 4 } } ])

        res.status(200).json({ data: post, postsByTags: postsByTagsShuffled,
            randomData: randomPosts, postsByCreator: postsByCreatorShuffled });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getUserPosts = async (req, res) => {
    const { id } = req.params;

    try { 
        const currentUserPosts = await PostMessage.find({ creator: id })

        res.status(200).json({ data: currentUserPosts });

    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log('that')
    }
}

export const getUserSavedPosts = async (req, res) => {
    const { id } = req.params; 

    try { 
        const currentUserSavedPosts = await PostMessage.find({ saved: id })

        res.status(200).json({ data: currentUserSavedPosts });

    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log('that')
    }
}

export const getPostsBySearch = async (req, res) => {
    const {searchQuery, tags} = req.query
    
    try {
        const title = new RegExp(searchQuery, 'i'); //Test test TEST = test

        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: posts });

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    } 
}

export const updatePost = async (req, res) => {
    const{ id: _id } = req.params;
    const post = req.body; 

    if(!mongoose.Types.ObjectId.isValid(_id)) 
    return res.status(404).send(`No post with that id`);

    const updatedPost = await 
    PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true });

    res.json(updatedPost); 
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).send(`No post with that id`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' })
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.status(200).json(updatedPost);
}

export const savePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.saved.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.saved.push(req.userId);
    } else {
      post.saved = post.saved.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);
    
    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};
