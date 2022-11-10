import { useState, useEffect } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Pagination from "./Pagination";

export default function Table({dataList}) {
  const limit = 5
  const columns = [
    { label: "First Name", accessor: "firstName" },
    { label: "Last Name", accessor: "lastName" },
    { label: "Role", accessor: "role" },
    { label: "Email", accessor: "email" },
    { label: "Phone", accessor: "phone" },
    { label: "Avatar", accessor: "avatar" },
    { label: "Created At", accessor: "createdAt" },
    { label: "Updated At", accessor: "updatedAt" },
  ];

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
       return (
        a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
         numeric: true,
        }) * (sortOrder === "asc" ? 1 : -1)
       );
      });
      setTableData(sorted);
      setCurrentPage(1)
    }
  };
  
  const [tableData, setTableData] = useState(dataList);
  const [currentPage, setCurrentPage] = useState(1)
  const [pageData, setPageData] = useState([]);
  const pageDataSlice = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };
  useEffect(() => {
    const pageSlice = pageDataSlice(tableData, currentPage, limit)
    setPageData([...pageSlice])
  }, [tableData, limit, currentPage, setPageData]);

  useEffect(() => {
    setTableData(dataList)
    setCurrentPage(1)
  }, [dataList]);
  
  return (
    <div>
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody columns={columns} tableData={pageData} />
      </table>
      <Pagination
        currentPage={currentPage}
        total={tableData.length}
        limit={limit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}