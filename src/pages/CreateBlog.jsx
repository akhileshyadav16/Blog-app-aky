import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function CreateBlog() {
  const navigate = useNavigate();
  const {_id} = useParams();
  const [formData, setFormData] = useState({ title: "", summary: "", content: "" });


  useEffect(() => {
    if (_id) {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/getBlog/${_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setFormData(data.data); 
          } else {
            toast.error("Failed to fetch blog data");
          }
        })
        .catch((error) => {
          console.error("Error fetching blog data:", error);
          toast.error("Error fetching blog data");
        });
    }
  }, [_id]);

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const method = _id ? "PUT" : "POST"; // Use PUT for editing and POST for creating
      const url = _id
        ? `${process.env.REACT_APP_BASE_URL}/api/v1/updateBlog/${_id}`
        : `${process.env.REACT_APP_BASE_URL}/api/v1/createBlog`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const successMessage = _id
          ? "Blog updated successfully"
          : "Blog created successfully";
        toast.success(successMessage);
        navigate("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error in submitHandler:", error.message);
      toast.error("Error while submitting the form");
    }
  };

  return (
    <div className="my-12 md:my-20 h-fit py-4">
      <div className="h-full w-11/12 sm:w-3/4 md:w-3/5 mx-auto bg-slate-900 px-1 rounded-md py-8">
        <div className="text-center text-3xl font-serif font-semibold">
          {_id ? "Edit Blog Post" : "Create New Post"}
        </div>
        <form onSubmit={submitHandler} className="flex flex-col gap-4 md:gap-6 h-full w-full">
          <div className="flex flex-col sm:flex-row mt-6 gap-2 justify-center mx-1 sm:mx-auto w-11/12">
            <label
              className="text-md sm:text-lg w-fit my-auto font-semibold font-serif"
              htmlFor="title"
            >
              Title Name:
            </label>
            <input
              className="bg-slate-950 bg-opacity-20 w-full sm:w-3/4 h-12 pl-2 border border-slate-800 rounded-lg flex-grow outline-none"
              type="text"
              name="title"
              id="title"
              onChange={changeHandler}
              value={formData.title}
              placeholder="Enter post title"
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-6 gap-2 justify-center mx-1 sm:mx-auto w-11/12">
            <label
              className="text-md sm:text-lg w-fit my-auto font-semibold font-serif"
              htmlFor="summary"
            >
              Summary:
            </label>
            <input
              className="bg-slate-950 bg-opacity-20 w-full sm:w-3/4 h-12 pl-2 border border-slate-800 rounded-lg flex-grow outline-none"
              type="text"
              name="summary"
              id="summary"
              onChange={changeHandler}
              value={formData.summary}
              placeholder="Enter summary"
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-6 justify-center mx-1 sm:mx-auto w-11/12 gap-2">
            <label
              className="text-md sm:text-lg w-fit font-semibold font-serif pt-1"
              htmlFor="content"
            >
              Content:
            </label>
            <textarea
              className="bg-slate-950 bg-opacity-20 pt-2 flex-grow pl-2 rounded-lg w-full sm:w-3/4 border border-slate-800 h-28 sm:h-32 md:h-44 outline-none"
              name="content"
              id="content"
              value={formData.content}
              onChange={changeHandler}
              placeholder="Enter content of the Post"
            />
          </div>
          <button
            className="w-28 mt-10 text-slate-100 mx-auto h-10 rounded-md bg-blue-600 hover:bg-blue-700 duration-200 font-medium px-1 py-1"
          >
            {_id ? "Update Post" : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
