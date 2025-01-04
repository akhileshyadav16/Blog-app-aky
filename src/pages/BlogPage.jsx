import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegCalendarDays } from "react-icons/fa6";



function BlogPage(){
    const [blog,setBlog] = useState({title:"",summary:"",content:"",createdAt:""});
    const {_id} = useParams();

    const fetchPost = async(_id)=>{
        fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/getBlog/${_id}`)
        .then((response) => response.json())
        .then((data) => setBlog(data.data))
        .catch((error) => {
          console.error("Error fetching blog data:", error);
        });
    }


    useEffect(()=>{
        fetchPost(_id);
    },[])

    return(
        <div className="h-fit py-8 w-full my-12 sm:my-16 md:my-20">
            <div className="flex flex-col gap-6 rounded-md py-6 h-fit  mx-auto px-2 sm:px-4 md:px-6 w-4/5 sm:w-3/5 md:w-1/3 border border-slate-800 bg-slate-900">
                <div className="text-3xl text-center font-serif font-bold">{blog.title}</div>
                <div className="text-slate-400"><span className="font-xl font-serif font-semibold">Summary :  </span> {blog.summary}</div>
                <div className="text-slate-400 flex gap-1"><span className="font-xl w-fit mx-1 font-serif whitespace-nowrap font-semibold">Content :</span> <p>{blog.content}</p></div>
                <div className="flex gap-3 text-slate-400 items-center"><FaRegCalendarDays /><span className="font-xl font-serif font-semibold">Created At : </span> {blog.createdAt.split("T")[0]}</div>
                
            </div>
        </div>
    );
}

export default BlogPage;