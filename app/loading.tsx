import './globals.css'

  const Loader = ()=> {
    return (
 <div className = "flex-center min-h-screen  h-full " >
           <div className="flex flex-row gap-2">
     <div className="w-4 h-4 rounded-full bg-dark-green animate-bounce"></div>
     <div className="w-4 h-4 rounded-full bg-dark-green animate-bounce [animation-delay:-.3s]"></div>
     <div className="w-4 h-4 rounded-full bg-dark-green animate-bounce [animation-delay:-.5s]"></div>
    </div>
 </div>
    )
}

export default Loader