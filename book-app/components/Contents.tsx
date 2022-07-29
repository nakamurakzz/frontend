import React, { useEffect, useState } from "react";
import { Book } from "../pages";

type Props = {
  book: Book | null;
}

export const Contents = ({ book }: Props) => {
  return (
    <>
      <div className="p-[30px] bg-blue-50">
        {book && (
          <>
            <div className="mx-[30px]">
              <h1>{book.title}</h1>
            </div>
            <div className="mt-[20px] p-[30px] overflow-auto bg-white">
              <p>{book.body}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};