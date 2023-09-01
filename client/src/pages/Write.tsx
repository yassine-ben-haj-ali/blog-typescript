import { ChangeEvent, useState } from "react";
import { FormSubmit, InputChange } from "../utils/TypeScript";
import { customRequest } from "../config/Api";

type Post = {
  title: string;
  desc: string;
  photo?: string;
};

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>();
  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    const newPost: Post = {
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      customRequest
        .post("upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    customRequest
      .post("post", newPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit} id="ss">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const selectedFile = e.target.files;
              if (selectedFile) {
                setFile(selectedFile[0]);
              }
            }}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            className="writeInput writeText"
            onChange={(e: InputChange) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};
export default Write;
