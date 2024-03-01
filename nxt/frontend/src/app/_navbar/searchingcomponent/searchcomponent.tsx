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
    if (title.trim() !== "") {
      router.replace(`/search?title=${title}`);
      setSearching((e) => !e);
    }
  };

  const handleClick = () => {
    setSearching((e) => !e);
    setTitle("");
  };

  return (
    <>
      <div>
        <div className="flex">
          {searching && (
            <div className="flex mt-[5px]">
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    className="border-2 rounded pb-1 p-[2px] mr-1"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder=" Search here"
                    style={{ borderColor: "#D4D4D4 !important" }}
                  />
                  <button
                    className="text-[8px] rounded bg-[#e3e3e3] mr-2 text-black p-[7px]"
                    type="submit"
                  >
                    GO
                  </button>
                </form>
              </div>
              <div className="flex items-center justify-center">
                <IoSearch
                  onClick={handleClick}
                  size={18}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          )}
        </div>
        {!searching && (
          <div className="mt-[10px]">
            <IoSearch
              onClick={handleClick}
              size={18}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default SearchComponent;
