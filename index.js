const express = require('express');
const color = require('colors');
const app = express();
app.use(express.json());
require('dotenv').config();

const mongoose =require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    timeStamp: { type: Date, default: Date.now },
})

const BlogPost = mongoose.model("BlogPost", blogSchema);

mongoose.connect(`mongodb+srv://hegdeadithyak:${process.env.PASSWORD}@blog-api.ecnljxm.mongodb.net/`).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Could not connect to MongoDB;", err)
})

app.post("/api/blog", async (req, res) => {
    let blogPost = new BlogPost({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
    })

    blogPost = await blogPost.save();

    return res.send(blogPost);
})

app.get("/api/blog", async (req, res) => {
    let blogposts = await BlogPost.find();

    return res.status(200).json({
        "message": "Successful",
        "data": blogposts,
    });
})


app.put("/api/blog/:id", async (req, res) => {
    const id = req.params.id;

    const { title, content } = req.body;

    let updatedPost = await BlogPost.findByIdAndUpdate(id, {
        title,
        content
    },
        {
            new: true 
        }
    )

    return res.status(200).json({
        "message": "Post updated successfully",
        "data": updatedPost,
    });
})


app.delete("/api/blog/:id", async (req, res) => {
    const id = req.params.id;

    let deletedPost = await BlogPost.findByIdAndDelete(id);

    return res.status(202).json({
        "message": "Post deleted successfully",
        "data": deletedPost,
    });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(color.green.bold(`Listening on port ${port}`));
})