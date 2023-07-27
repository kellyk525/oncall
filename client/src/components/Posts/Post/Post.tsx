import React, { useEffect, useContext } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useParams } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { PiTrash } from "react-icons/pi";
import moment from "moment";
import hljs from "highlight.js";
import "highlight.js/styles/obsidian.css";

import { GlobalContext } from "store/globalContext";
import { ActionTypes } from "shared/types/storeTypes";
import UpdatePost from "components/TextEditor/UpdatePost/UpdatePost";
import AddPostToCollection from "components/Collections/AddPostToCollection/AddPostToCollection";

const Post: React.FC = () => {
  let { postId } = useParams();
  const { openUpdatePostModal, handleUpdatePostModal } =
    useContext(GlobalContext);
  const {
    userData,
    post,
    fetchPost,
    fetchingPost,
    fetchingPostError,
    removePost,
    removingPost,
    removingPostError,
  } = useContext(GlobalContext);

  const handlePostDeletion = async () => {
    removePost(
      post?.categoryId as string,
      post?.subCategoryId as string,
      postId as string,
      userData?._id as string
    );
  };

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
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
      {!fetchingPost && post ? (
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
                  <div className="mr-2">
                    {removingPost ? (
                      <PulseLoader
                        size={5}
                        color={"grey"}
                        loading={removingPost}
                        aria-label="Removing Post"
                      />
                    ) : (
                      "Delete Post"
                    )}
                  </div>
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
      ) : (
        <div className="flex items-center text-base">
          <p className="mr-2">Loading Post</p>
          <PulseLoader
            size={4}
            color={"grey"}
            loading={fetchingPost}
            aria-label="Fetching Post"
          />
        </div>
      )}
      {fetchingPostError && <div>{fetchingPostError}</div>}
      {removingPostError && <div>{removingPostError}</div>}
    </main>
  );
};

export default Post;
