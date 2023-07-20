import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { PiTrash } from "react-icons/pi";
import moment from "moment";
import hljs from "highlight.js";
import "highlight.js/styles/obsidian.css";

import useHttp from "hooks/useHttp";
import { GlobalContext } from "store/globalContext";
import { ActionTypes } from "shared/types/storeTypes";
import { Post as PostType } from "shared/types/appTypes";
import UpdatePost from "components/TextEditor/UpdatePost/UpdatePost";
import AddPostToCollection from "components/Collections/AddPostToCollection/AddPostToCollection";

const Post: React.FC = () => {
  let { postId } = useParams();
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttp();
  const [post, setPost] = useState<PostType | null>(null);
  const { openUpdatePostModal, handleUpdatePostModal } =
    useContext(GlobalContext);
  const { userData } = useContext(GlobalContext);
  const postRef = useRef();

  const handlePostDeletion = async () => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        `Bearer ${JSON.parse(localStorage.getItem("profile") as string).token}`
      );

      const resp = await fetch(
        `https://kellyoncall.onrender.com/posts/${postId}`,
        {
          method: "DELETE",
          headers,
          body: JSON.stringify({
            categoryId: post?.categoryId,
            subCategoryId: post?.subCategoryId,
            creatorId: post?.creatorId,
          }),
        }
      );

      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleFetchedPost = (response: { data: PostType }) => {
    setPost(response.data);
  };

  const fetchPost = async (postId: string) => {
    // const params = new URLSearchParams();
    // params.append("postId", postId as string);
    const request = {
      headers: {},
      url: `https://kellyoncall.onrender.com/${postId}`,
    };

    sendRequest(request, handleFetchedPost);
  };

  useEffect(() => {
    fetchPost(postId as string);
  }, [postId]);

  useEffect(() => {
    if (post) {
      document.querySelectorAll(".ql-syntax").forEach((el) => {
        el.classList.add("!font-medium");
        hljs.highlightElement(el as HTMLElement);
      });
    }
  }, [post]);

  return (
    <main className="	ml-60 bg-background text-base p-6 max-w-5xl min-h-screen font-text2">
      {isLoading && <div>Loading ...</div>}
      {post && (
        <>
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center">
              <div className="font-medium mr-4">{post.title}</div>
              <div className="text-sm">{moment(post.createdAt).fromNow()}</div>
            </div>
            {userData ? (
              <div className="flex">
                <button
                  onClick={() =>
                    handleUpdatePostModal(ActionTypes.OPEN_UPDATE_POST_MODAL)
                  }
                  className="flex items-center rounded bg-white p-2 px-3 text-sm mr-4"
                >
                  <div className="mr-2">Edit Post</div>
                  <FiEdit3 />
                </button>
                <button
                  className="flex items-center rounded bg-red-400 text-white p-2 text-sm"
                  onClick={handlePostDeletion}
                >
                  <div className="mr-2">Delete Post</div>
                  <PiTrash />
                </button>
              </div>
            ) : null}
          </div>
          <div className="ql-snow">
            <div
              dangerouslySetInnerHTML={{ __html: post.description }}
              className="text-sm mb-6 ql-editor"
            />
          </div>
          <AddPostToCollection postId={post._id} />
          {openUpdatePostModal && <UpdatePost post={post} />}
        </>
      )}
    </main>
  );
};

export default Post;
