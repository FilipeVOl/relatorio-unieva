
import * as XLSX from "xlsx";

export const exportToExcel = (tableRef: React.RefObject<HTMLTableElement>) => {
  if (tableRef.current) {
    const wb = XLSX.utils.table_to_book(tableRef.current);
    XLSX.writeFile(wb, "table_data.xlsx");
  }
};