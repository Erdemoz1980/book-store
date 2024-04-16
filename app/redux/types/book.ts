interface Book {
  id: string,
  name: string,
  category: string,
  price: string,
  description:string
};

interface BookState {
  booklist: Book[],
  currentBook: Book | null,
  isAddBookModalOpen:boolean,
  isUpdateBookModalOpen:boolean,
}

export type { Book, BookState };