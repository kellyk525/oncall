import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useMemo,
  useContext,
} from "react";
import ReactQuill from "react-quill";
import hljs from "highlight.js";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/obsidian.css";

import Categories from "components/Categories/Categories";
import { GlobalContext } from "store/globalContext";
import { TOOLBAR_OPTIONS, formats } from "shared/utils/quillConfigs";

const AddPost: React.FC = () => {
  const [postInfo, setPostInfo] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const quillRef = useRef<ReactQuill>(null);
  const { categoryId, subCategoryId, userData } = useContext(GlobalContext);
  hljs.configure({ languages: ["javascript", "typescript", "html"] });

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

  const handlePostCreation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const form = e.target as HTMLFormElement;
      // const formData = new FormData(form);
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        `Bearer ${JSON.parse(localStorage.getItem("profile") as string).token}`
      );

      const newPost = await fetch(
        "https://kellyoncall.onrender.com/posts/add-post",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            title: postInfo.title,
            description: postInfo.description,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            creatorId: userData?._id,
          }),
        }
      );
    } catch (error) {}
  };

  const imageHandler = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const input = document.createElement("input") as HTMLInputElement;
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      const index = editor.getSelection()?.index as number;

      input.onchange = async () => {
        if (!input.files) return;
        const file = input.files[0];
        if (/^image\//.test(file.type)) {
          const formData = new FormData();
          formData.append("image", file);
          const imgUrl = await s3ImageUpload(formData);
          editor.insertEmbed(index, "image", imgUrl);
        }
      };
    }
  };

  const s3ImageUpload = async (form: FormData) => {
    const headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");

    let imgUrl = "";
    try {
      const { url } = await fetch("/s3Url").then((res) => res.json());

      // post the image directly to the s3 bucket
      await fetch(url, {
        method: "PUT",
        headers,
        body: form.get("image"),
      });

      imgUrl = url.split("?")[0];
    } catch (e) {
      console.log(e);
    }

    return imgUrl;
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: TOOLBAR_OPTIONS,
        handlers: {
          image: imageHandler,
        },
      },
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
    }),
    []
  );

  return (
    <div className="ml-60 max-w-5xl h-screen text-base p-6 bg-background text-sm">
      <div className="font-semibold mb-4">Create a New Post:</div>
      <form onSubmit={handlePostCreation} className="bg-white p-4 rounded-lg">
        <div className="mb-3">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={postInfo.title}
            onChange={handleTitleChange}
            placeholder="Title"
            className="ml-3 p-1 px-2 rounded-lg border border-slate-300"
            required
          />
        </div>
        <Categories />
        <div className="mb-3">
          <label htmlFor="quill-editor">Post Content:</label>
          <ReactQuill
            id="quill-editor"
            ref={quillRef}
            theme="snow"
            value={postInfo.description}
            onChange={handleDescriptionChange}
            placeholder="Write something awesome..."
            className="mt-3"
            modules={modules}
            formats={formats}
          />
        </div>
        <button
          className="bg-black text-white p-2 px-3 rounded-lg hover:bg-zinc-800 mt-2"
          type="submit"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
