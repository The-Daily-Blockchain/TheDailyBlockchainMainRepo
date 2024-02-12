import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

interface Props {
  apiEndpoint: any;
}

const Pagination = ({ apiEndpoint }: Props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`${apiEndpoint}?page=${currentPage + 1}`);
        const responseData = await result.json();
        console.log(responseData);
        setData(responseData.results);
        setPageCount(Math.ceil(responseData.count / 10));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchData();
  }, [apiEndpoint, currentPage]);

  const handlePageChange = (data: any) => {
    const selectedPage = data.selected;
    if (selectedPage < pageCount) {
      console.log(pageCount);
      setCurrentPage(data.selected);
    }
  };

  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
