import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import { BookList } from '../components/BookList'
import { Contents } from '../components/Contents';


export type Book = {
  id:number,
  title:string,
  body:string,
}

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // 初期表示時にContentを取得する
  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch("http://localhost:3000/content");
      const books = await res.json() as Book[];
      setBooks(books);
      setSelectedBook(books[0]);
    }
    getBooks();    
  }, []);

  return {books, selectedBook, setSelectedBook}
}

const Home: NextPage = () => {
  const {books, selectedBook, setSelectedBook} = useBooks();

  return (
    <>
      <div className="my-[30px] mx-[40px]" >
        <div className="flex">
          <div className="w-[240px] h-[935px]">
            <BookList books={books} setSelectedBook={setSelectedBook}/>
          </div>
          <div className="w-[1080px] ml-[40px]">
            <Contents book={selectedBook} {...{ selectedBook }}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
