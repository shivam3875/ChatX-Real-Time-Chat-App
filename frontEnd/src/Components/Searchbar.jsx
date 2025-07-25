import useConversations from "./hooks/useConversations"

const Searchbar = () => {

  const {conversations}=useConversations();

  const handleChange = (e) =>{
    conversations(e.target.value);
  }

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
            <input onChange={handleChange} type="text" className="grow" placeholder="Search" />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 opacity-70 cursor-pointer">
                <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
        </label>
    </div>
  )
}

export default Searchbar
