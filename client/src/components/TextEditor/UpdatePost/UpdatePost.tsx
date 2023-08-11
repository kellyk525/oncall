import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
  FormEvent,
} from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ReactQuill, { Quill } from "react-quill-with-table";
import QuillBetterTable from "quill-better-table";
import "shared/quill/katex";

import { Post } from "shared/types/appTypes";
import { ActionTypes } from "shared/types/storeTypes";
import { TOOLBAR_OPTIONS, formats } from "shared/utils/quillConfigs";
import { GlobalContext } from "store/globalContext";
import "react-quill-with-table/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/obsidian.css";

Quill.register({ "modules/better-table": QuillBetterTable });

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

  const insertTable = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const tableModule = editor.getModule("better-table");
      tableModule.insertTable(3, 3);
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const toolbar = editor.getModule("toolbar");
      toolbar.addHandler("table", () => {
        insertTable();
      });

      editor.root.innerHTML = post.description as string;
    }
  }, []);

  const handlePostUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remove all hljs language selector options
    document.querySelectorAll("select.ql-ui").forEach((el) => {
      el.parentNode?.removeChild(el);
    });
    // Get quill editor inner html
    const editor = quillRef?.current?.getEditor();
    const innerHTML = (editor?.root.innerHTML as string) || "";

    const updatedPost = {
      ...post,
      title: postInfo.title,
      description: innerHTML,
    };

    updatePost(updatedPost, userData?._id as string);
  };

  const modules = useMemo(
    () => ({
      syntax: true,
      table: false,
      "better-table": {
        operationMenu: {
          items: {
            unmergeCells: {
              text: "Another unmerge cells name",
            },
          },
        },
      },
      keyboard: {
        bindings: QuillBetterTable.keyboardBindings,
      },
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
