import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  alignRight?: boolean;
  isImage?: boolean;
  isAction?: boolean;
}

interface TableComponentProps<T extends { id: number }> {
  data: T[];
  columns: Column<T>[];
  caption?: string;
  footerData?: { label: string; value: string };
  onRowClick?: (userId: number) => void;
}

export function TableComponent<T extends { id: number }>({
  data,
  columns,
  caption,
  footerData,
  onRowClick,
}: TableComponentProps<T>) {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState<T[]>(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedUser, setDeletedUser] = useState<number | null>(null);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setPaginatedData(data.slice(startIndex, endIndex));
  }, [data, currentPage, rowsPerPage]);

  const handleDelete = (userId: number) => {
    setDeletedUser(userId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletedUser !== null) {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = storedUsers.filter(
        (user: { id: number }) => user.id !== deletedUser
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setPaginatedData(updatedUsers);
      setIsModalOpen(false);
      setDeletedUser(null);
    }
  };

  const handleCloseDialog = () => {
    setIsModalOpen(false);
    setDeletedUser(null);
  };

  return (
    <>
      <Table className="text-primary-foreground">
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow className="border-b-[#EAECF0] bg-muted-foreground font-bold">
            {columns.map((col) => (
              <TableHead
                key={String(col.accessor)}
                className={
                  col.alignRight
                    ? "text-right text-card-title"
                    : "text-card-title"
                }
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className="bg-popover border-b-[#EAECF0] border-b-2"
              onClick={() => onRowClick && onRowClick(row.id)}
            >
              {columns.map((col) => {
                const cellValue = row[col.accessor];
                let cellClass = col.alignRight ? "text-right" : "";

                if (col.isAction) {
                  return (
                    <TableCell key={String(col.accessor)}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="p-2">
                            <Ellipsis />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => navigate(`/profile/${row.id}`)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(row.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  );
                }

                if (col.accessor === "status") {
                  return (
                    <TableCell key={String(col.accessor)} className={cellClass}>
                      {cellValue === "Active" ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          {String(cellValue)}
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                          {String(cellValue)}
                        </span>
                      )}
                    </TableCell>
                  );
                }

                if (col.isImage) {
                  return (
                    <TableCell key={String(col.accessor)} className={cellClass}>
                      <img
                        src={row[col.accessor] as string}
                        alt={String(row[col.accessor])}
                        className="w-8 h-8 rounded-full"
                      />
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={String(col.accessor)} className={cellClass}>
                    {typeof cellValue === "string" ||
                    typeof cellValue === "number"
                      ? cellValue
                      : String(cellValue)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
        {footerData && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length - 1}>
                {footerData.label}
              </TableCell>
              <TableCell className="text-right">{footerData.value}</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>

      <div className="flex justify-between mt-2 px-4">
        <div>
          Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
          {currentPage * rowsPerPage} of {data.length} entries
        </div>
        <div>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="hover:bg-accent text-gray-800 font-bold py-2 px-4 rounded-l mr-4"
          >
            Prev
          </Button>
          <Button
            disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-gray-100 hover:bg-accent text-gray-800 font-bold py-2 px-4 rounded-r"
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px] text-center">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this user?
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
