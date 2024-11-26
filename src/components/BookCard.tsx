import React from 'react';
import { Book as BookType } from '../types';
import { BookOpen, Eye } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface BookCardProps {
  book: BookType;
  isAdmin?: boolean;
  onEdit?: (book: BookType) => void;
  onRead?: (bookId: string) => void;
}

export default function BookCard({ book, isAdmin, onEdit, onRead }: BookCardProps) {
  const user = useAuthStore(state => state.user);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={book.coverUrl}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">par {book.author}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{book.publicationYear}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              book.available
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {book.available ? 'Disponible' : 'Emprunté'}
          </span>
        </div>
        <p className="text-gray-700 text-sm mt-2 line-clamp-2">
          {book.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-blue-600">{book.category}</span>
            <div className="flex items-center text-gray-500 text-sm">
              <Eye className="h-4 w-4 mr-1" />
              <span>{book.reads} lectures</span>
            </div>
          </div>
          <div className="flex space-x-2">
            {user && onRead && (
              <button
                onClick={() => onRead(book.id)}
                className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800"
              >
                <Eye className="h-4 w-4" />
                <span>Lire</span>
              </button>
            )}
            {isAdmin && onEdit && (
              <button
                onClick={() => onEdit(book)}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <BookOpen className="h-4 w-4" />
                <span>Modifier</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}