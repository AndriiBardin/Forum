import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import Divider from '@material-ui/core/Divider';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>loading </h2>;
  }

  const [selectedPost, setSelectedPost] = useState(-1);

  return (
    <li>
      {posts.map((post) => (
        <TableContainer>
          <TableRow>
            Post#{post.id} {post.title} posted by {post.postUser.name}
          </TableRow>
          <Divider />
          <TableRow>
            <TableCell>{post.body}</TableCell>
          </TableRow>
          <TableRow>
            {selectedPost == -1 && (
              <button onClick={() => setSelectedPost(post.id)}>
                comments {post.comments.length}
              </button>
            )}
          </TableRow>
          {selectedPost == post.id &&
            post.comments.map((comment) => (
              <>
                <TableRow>
                  <TableCell>
                    #{comment.id} {comment.name} posted by {comment.email} {}
                  </TableCell>
                </TableRow>
                <TableRow>{comment.body}</TableRow>
              </>
            ))}
          {selectedPost == post.id && (
            <TableCell>
              <button onClick={() => setSelectedPost(-1)}>
                close comments
              </button>
            </TableCell>
          )}
        </TableContainer>
      ))}
    </li>
  );
};

export default Posts;
