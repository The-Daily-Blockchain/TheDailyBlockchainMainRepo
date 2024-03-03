import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import { fetcher } from "../_components/utils/fetcher";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

interface Props {
  apiEndpoint: any;
  onDataUpdate: (data: any) => void;
  onLoadingUpdate: (isLoading: any) => void;
  onErrorUpdate: (error: any) => void;
}

const Pagination = ({
  apiEndpoint,
  onDataUpdate,
  onLoadingUpdate,
  onErrorUpdate,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, error } = useSWR(
    () => `${apiEndpoint}page=${currentPage + 1}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      onDataUpdate(data);
      onLoadingUpdate(isLoading);
      onErrorUpdate(error);
    }
  }, [data, error, isLoading, onDataUpdate, onErrorUpdate, onLoadingUpdate]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={data?.count ? Math.ceil(data.count / 10) : 0}
        renderOnZeroPageCount={null}
        containerClassName={"flex items-center justify-center mt-8 mb-4"}
        activeClassName={"bg-[#F4F0DB] text-black"}
        pageClassName={
          "border-dotted border-2 border-[#F4F0DB] rounded-full hover:bg-[#F4F0DB] w-10 h-10 flex items-center justify-center rounded-full mr-4"
        }
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-[#F4F0DB] rounded-full">
            <BsChevronRight />
          </span>
        }
        previousLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-[#F4F0DB] rounded-full mr-4">
            <BsChevronLeft />
          </span>
        }
      />
    </div>
  );
};

export default Pagination;
