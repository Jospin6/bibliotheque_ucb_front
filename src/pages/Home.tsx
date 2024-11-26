import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import FilterBar from '../components/FilterBar';
import { Book } from '../types';

const SAMPLE_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Introduction à la Littérature Africaine',
    author: 'Chinua Achebe',
    coverUrl: '../src/assets/images/datahouse.png',
    category: 'Littérature',
    description: 'Un guide complet de la littérature africaine et son développement à travers les âges.',
    publicationYear: 2020,
    available: true,
    reads: 145,
    lastRead: '2024-03-15',
    pdfUrl: '../../src/assets/books/EntrepotsDeDonnees_1pp.pdf'
  },
  {
    id: '2',
    title: 'Physique Moderne',
    author: 'Marie Curie',
    coverUrl: 'https://images.unsplash.com/photo-1514474959185-1472d4c4e0d4?auto=format&fit=crop&q=80&w=800',
    category: 'Science',
    description: 'Explorer les fondamentaux de la physique moderne et de la mécanique quantique.',
    publicationYear: 2021,
    available: false,
    reads: 89,
    lastRead: '2024-03-10',
    pdfUrl: '/physics.pdf'
  }
];

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'most-read'>('recent');
  const navigate = useNavigate();

  const categories = useMemo(() => 
    Array.from(new Set(SAMPLE_BOOKS.map(book => book.category))),
    []
  );

  const authors = useMemo(() => 
    Array.from(new Set(SAMPLE_BOOKS.map(book => book.author))),
    []
  );

  const years = useMemo(() => 
    Array.from(new Set(SAMPLE_BOOKS.map(book => book.publicationYear.toString()))),
    []
  );

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = SAMPLE_BOOKS.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      const matchesAuthor = selectedAuthor === 'all' || book.author === selectedAuthor;
      const matchesYear = selectedYear === 'all' || book.publicationYear.toString() === selectedYear;
      return matchesSearch && matchesCategory && matchesAuthor && matchesYear;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime();
      }
      return b.reads - a.reads;
    });
  }, [searchTerm, selectedCategory, selectedAuthor, selectedYear, sortBy]);

  const handleReadBook = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
            Bibliothèque Numérique de l'Université Catholique de Bukavu
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-200">
            Découvrez notre collection de ressources académiques et de littérature
          </p>
        </div>

        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedAuthor={selectedAuthor}
          setSelectedAuthor={setSelectedAuthor}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
          authors={authors}
          years={years}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredAndSortedBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onRead={handleReadBook}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;