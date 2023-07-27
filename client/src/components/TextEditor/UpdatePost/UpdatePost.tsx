import React, {
  useContext,
  useRef,
  useState,
  useMemo,
  ChangeEvent,
  FormEvent,
} from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Post } from "shared/types/appTypes";
import { ActionTypes } from "shared/types/storeTypes";
import { TOOLBAR_OPTIONS, formats } from "shared/utils/quillConfigs";
import { GlobalContext } from "store/globalContext";

const UpdatePostModal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { handleUpdatePostModal } = useContext(GlobalContext);
  return (
    <div
      onClick={() => handleUpdatePostModal(ActionTypes.CLOSE_UPDATE_POST_MODAL)}
      className="w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-gray-500/[.3]"
    >
      <div
        className="w-fit max-w-4xl max-h-modal overflow-auto bg-background p-10 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const UpdatePost: React.FC<{ post: Post }> = ({ post }) => {
  const {
    userData,
    updatePost,
    updatingPost,
    updatingPostError,
    handleUpdatePostModal,
  } = useContext(GlobalContext);
  const quillRef = useRef<ReactQuill>(null);
  const [postInfo, setPostInfo] = useState({
    id: post._id,
    title: post.title,
    description: post.description,
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPostInfo((prev) => {
      return {
        ...prev,
        title: newTitle,
      };
    });
  };

  const handleDescriptionChange = (value: string) => {
    setPostInfo((prev) => {
      return {
        ...prev,
        description: value,
      };
    });
  };

  const handlePostUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      title: postInfo.title,
      description: postInfo.description,
    };

    updatePost(updatedPost, userData?._id as string);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: TOOLBAR_OPTIONS,
      },
    }),
    []
  );

  return (
    <UpdatePostModal>
      <button
        onClick={() =>
          handleUpdatePostModal(ActionTypes.CLOSE_UPDATE_POST_MODAL)
        }
      >
        <IoIosCloseCircleOutline size={20} />
      </button>
      <form className="text-sm" onSubmit={handlePostUpdate}>
        <div className="mt-4 mb-3">
          <label htmlFor="title" className="mr-3">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={postInfo.title}
            onChange={handleTitleChange}
            className="py-1 px-2 rounded"
            placeholder="Title"
            required
          />
        </div>
        <ReactQuill
          id="quill-editor"
          ref={quillRef}
          theme="snow"
          value={postInfo.description as string}
          onChange={handleDescriptionChange}
          placeholder="Write something awesome..."
          modules={modules}
          formats={formats}
        />
        <button
          type="submit"
          className="mt-3 p-2 px-3 bg-white hover:bg-gray-50 rounded-xl"
        >
          {updatingPost ? (
            <PulseLoader
              size={5}
              color={"grey"}
              loading={updatingPost}
              aria-label="Adding New Post"
            />
          ) : (
            "Update Post"
          )}
        </button>
      </form>
      {updatingPostError && <div>{updatingPostError}</div>}
    </UpdatePostModal>
  );
};

export default UpdatePost;
