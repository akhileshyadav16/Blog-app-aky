import { CgAdd } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate();

    const clickHandler = ()=>{
        navigate("/create-blog");
    }


    return(
        <div className="w-full bg-slate-900 border-b border-slate-800 rounded-b-sm h-16 sm:h-20 md:h-24">
            <div className="flex justify-between h-full whitespace-nowrap items-center px-1 sm:px-2 gap-2 sm:gap-1  w-4/5 sm:w-3/4 md:w-3/5 mx-auto">
                <div onClick={()=>navigate("/")} className="text-xl cursor-pointer sm:text-3xl md:text-4xl font-semibold sm:font-bold font-serif">Simple Blog</div>

                    <button onClick={clickHandler} className="bg-blue-600 flex flex-row items-center justify-center gap-1 text-md sm:text-lg font-medium sm:font-semibold hover:bg-blue-700 duration-200 text-center h-10 sm:h-12 text-slate-50 px-1  py-1 sm:py-2 rounded-lg whitespace-nowrap">
                        <CgAdd className="text-center h-5 w-full"/>
                        <div>New Post</div>
                    </button>

            </div>
        </div>
    );
}

export default Navbar;