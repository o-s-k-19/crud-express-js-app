import  express  from "express";
import { db } from "../config/db.config";
import dotenv from "dotenv";
import { router } from "../routes/post.routes";
import { postService } from "../services/post.service";


const app = express();
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const data = [
    {
        title: 'Post 1',
        content: 'Content 1',
        author: 'Author 1',
        published: true,
        date: new Date()
    },
    {
        title: 'Post 2',
        content: 'Content 2',
        author: 'Author 2',
        published: false,
        date: new Date()
    },
    {
        title: 'Post 3',
        content: 'Content 3',
        author: 'Author 3',
        published: true,
        date: new Date()
    }
]; 

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/posts', router);

// routes
 
db.then(() => {
  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
   
    data.forEach(async (post) => {
      await postService.createPost(post);
      console.log(`post ${post.title} created`);
    });

  });
}).catch((error) => {
  console.error('Error on server', error);
});