import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="bg-slate-800 flex items-center justify-center gap-4 p-4 rounded-md">
      <FaSearch />
      <input
        type="text"
        placeholder="Search for people"
        className="bg-inherit"
      />
    </div>
  );
};

export default Searchbar;
