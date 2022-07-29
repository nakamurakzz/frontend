import React, { useState } from "react";
import { Book } from "../pages";
import { DeleteButton } from "./Button/DeleteButton";
import { DoneButton } from "./Button/DoneButton";
import { EditButton } from "./Button/EditButton";
import { NewPageButton } from "./Button/NewPageButtopn";
import { ServiceLogo } from "./Button/ServiceLogo";

type Props = {
  books: Book[];
  setSelectedBook: (book:Book | null) => void;
}

const useBookList = (setSelectedBook:(book:Book | null) => void) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onSelectBook = (book:Book) => {
    setSelectedBook(book);
  }

  const onDeleteClick = (book:Book) => {
    const deleteBook = async () => {
      const res = await fetch(`http://localhost:3000/content/${book.id}`, {
        method: "DELETE",
      });
      if(res.status == 204){
        console.log("delete success");
        console.log({res})
        setSelectedBook(null);
      }
    }
    deleteBook();
  }
  return {onSelectBook,setIsEdit,isEdit,onDeleteClick}
}

export const BookList = ({ books , setSelectedBook}: Props) => {
  const {onSelectBook,setIsEdit,isEdit,onDeleteClick} = useBookList(setSelectedBook);
  return (
    <>
      <div className="border-r-2">
        <ServiceLogo />
        <div className="mt-5 p-[10px] w-[240px] h-[874px]">
          <table className="table-fixed">
            {books.map(book => (
              <tbody key={book.id}>
                <tr className="h-[44px]">
                  <td onClick={()=>onSelectBook(book)}>{book.title}</td>
                  <td>
                    {isEdit &&
                      <span onClick={()=>onDeleteClick(book)}>
                        <DeleteButton />
                      </span>
                    }
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className="w-[240px] h-[60px] flex justify-end p-[10px]">
          {!isEdit ? 
            <div className="flex justify-right" onClick={()=>setIsEdit(!isEdit)}>
              <EditButton />
            </div>
            : 
            <table>
              <tr>
                <td><NewPageButton /></td>          
                <td onClick={()=>setIsEdit(!isEdit)}>
                  <DoneButton />
                </td>
              </tr>
            </table>
          }
        </div>
      </div>
    </>
  );
};