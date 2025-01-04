import { FaClipboardList } from "react-icons/fa";
import { useState , useEffect } from "react";
import Card from "../components/Card";

function Home(){
    const [blogs, setBlogs] = useState([]);


    const fetchAllBlogs = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/getBlogs`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const result = await response.json();

    
          setBlogs(
            result.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          );
        } catch (err) {
          console.log("error in fetching all blogs :", err.message);
        }
      };

      useEffect(()=>
        {fetchAllBlogs();
        }
        ,[blogs.length])
    return(
        <div className="w-full flex justify-center min-h-screen h-4/5 items-center">
            {
                blogs.length > 0 ? 
                ( 
                    <div className="w-11/12 sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 mt-16 gap-4 h-fit">
                        {
                            blogs.map((blog,index)=>(
                                <Card key={index} setBlogs={setBlogs} _id={blog._id} title={blog.title} summary={blog.summary} content={blog.content} createdAt={blog.createdAt}/>
                            ))
                        }
                    </div>
                ) :
                (
                    <div className="flex  my-12 sm:my-16 md:my-20 lg:my-24 pt-8 w-11/12 sm:w-3/4 md:w-3/5 mx-auto py-10  border border-slate-700 rounded-lg flex-col bg-slate-900 gap-4 items-center">
                        <div>
                            <FaClipboardList className="h-10 w-10" />
                        </div>
                        <div className="text-xl font-serif font-semibold">No tasks yet</div>
                        <p className="text-center mx-2">Add your first Blog to get started</p>
                    </div>
                )
            }
        </div>
    );
}

export default Home;