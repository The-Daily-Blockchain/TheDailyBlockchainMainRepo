"use client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";

function SearchComponent() {
  const [title, setTitle] = useState("");
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    router.replace(`/searched?title=${title}`);
  };

  const handleClick = () => {
    setSearching((e) => !e);
    setTitle("");
  };

  return (
    <>
      <div className="fixed right-10">
        <div className="flex">
          {searching && (
            <form onSubmit={handleSubmit}>
              <input
                className="border-black border-2 rounded mr-2 p-1"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                className="border-2 border-solid rounded bg-[#e3e3e3] mr-3"
                type="submit"
              >
                GO
              </button>
            </form>
          )}
          <IoSearch
            onClick={handleClick}
            size={18}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </>
  );
}

export default SearchComponent;
