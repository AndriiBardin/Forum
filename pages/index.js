import React, { useState, useEffect } from "react";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";
import TableContainer from "@material-ui/core/TableContainer";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      ).then((response) => response.json());

      const postsWithComments = await Promise.all(
        posts.map(async (post) => {
          const comments = await getComments(post.id);
          return { ...post, comments };
        })
      );

      const postsWithUserName = await Promise.all(
        postsWithComments.map(async (post) => {
          const users = await getUsers();

          const postUser = users.find((user) => user.id == post.userId);

          return { ...post, postUser };
        })
      );

      setPosts(postsWithUserName);

      setLoading(false);
    };

    const getComments = async (id) => {
      const comment = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      ).then((response) => response.json());
      return comment;
    };

    const getUsers = async () => {
      const user = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((response) => response.json());
      return user;
    };

    getPosts();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <TableContainer>
      <h1>Forum</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </TableContainer>
  );
}

export default App;
