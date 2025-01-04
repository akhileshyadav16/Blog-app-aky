import { FaRegCalendarDays } from "react-icons/fa6";
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

function Card({_id,title,summary,content,createdAt,setBlogs}){

  const navigate = useNavigate();

  const handleEditClick = (_id) => {
    navigate(`/update-blog/${_id}`); 
  };

    const deleteHandler = async (_id) => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/v1/deleteBlog/${_id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
    
          if (response.ok) {
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== _id));
            toast.success("Task Deleted successfully");
          } else {
            toast.error("Something went wrong");
          }
        } catch (err) {
          console.log("Something went wrong in deleting :" + err.message);
        }
      };

      const viewHandler = (_id)=>{
        navigate(`/blog-details/${_id}`);
      }

    return(
        <div className="flex flex-col gap-4 rounded-md px-4 py-4 h-fit  mx-auto w-4/5 sm:w-64 md:w-[300px] lg:w-[360px] border border-slate-800 bg-slate-900">
            <div className="text-2xl font-bold">{title}</div>
            <div className="text-slate-400">{summary}</div>
            <div className="flex gap-3 text-slate-400 items-center"><FaRegCalendarDays />{createdAt.split("T")[0]}</div>
            <div className="flex justify-end text-md font-medium gap-10 mr-2 pb-2 pt-4">
                <button onClick={()=>viewHandler(_id)}  className="text-green-400 hover:text-green-500 duration-300">View</button>
                <button onClick={()=>handleEditClick(_id)}  className="text-blue-400 hover:text-blue-500 duration-300">Edit</button>
                <button onClick={()=>{deleteHandler(_id)}} className="text-red-400 hover:text-red-500 duration-300">Delete</button>
            </div>
        </div>
    );
 }

 export default Card;