const express = require("express");
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));
//To parse incoming JSON in POST request body:
app.use(express.json());
//Method override
app.use(methodOverride('_method'));
//make absoluate path
app.set('views', path.join(__dirname, 'views'));
//Make the view engine embedded javascript
app.set('view engine', 'ejs');

//fake database
let posts = [
    {
        id: uuid(),
        username: 'Bob',
        post: 'Hello everyone my name is Bob in case you did not know'
    },
    {
        id: uuid(),
        username: 'Sarah',
        post: 'Hello now'
    },
    {
        id: uuid(),
        username: 'Bill',
        post: 'There are many paintings in a musuem'
    },
    {
        id: uuid(),
        username: 'John',
        post: 'What is up everyone! First day on the job'
    },
]

//Home page
app.get('/', (req, res) => {
    res.render('home');
})

// Render Posts
app.get('/posts', (req, res) => {
    res.render('posts/index', { posts });
})

app.get('/posts/new', (req, res) => {
    res.render('posts/new');
})

//create new posts
app.post('/posts', (req, res) => {
    const { username, post } = req.body;
    posts.push({ username, post, id: uuid() })
    res.redirect('posts');
})

//Show details about post
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render('posts/show', { post })
})

//Edit a comment
app.get('/posts/:id/edit', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render('posts/edit', { post });
})


//update 'database' with new text
app.patch('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);

    //get new text from req.body
    const newPostText = req.body.post;
    //update the post with the data from req.body
    post.post = newPostText;
    //redirect
    res.redirect('/posts');
})

//delete post
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect('/posts');
})

app.listen(3000, () => {
    console.log('on port 3000');
})










