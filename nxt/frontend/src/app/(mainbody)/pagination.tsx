import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import { fetcher } from "../(components)/utils/fetcher";

interface Props {
  apiEndpoint: any;
  onDataUpdate: (data: any) => void;
}

const Pagination = ({ apiEndpoint, onDataUpdate }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useSWR(
    `${apiEndpoint}?page=${currentPage + 1}`,
    fetcher,
    {}
  );

  useEffect(() => {
    if (data) {
      onDataUpdate(data.results);
    }
    console.log(data);
  }, [data, onDataUpdate]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={data?.count ? Math.ceil(data.count / 10) : 0}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
