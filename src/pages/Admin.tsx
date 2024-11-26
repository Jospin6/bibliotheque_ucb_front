import React, { useState } from 'react';
import { Book, User } from '../types';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import TeacherForm from '../components/TeacherForm';
import DashboardSummary from '../components/DashboardSummary';
import { Users, BookOpen, Plus, X } from 'lucide-react';

const SAMPLE_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Introduction à la Littérature Africaine',
    author: 'Chinua Achebe',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    category: 'Littérature',
    description: 'Un guide complet de la littérature africaine et son développement à travers les âges.',
    publicationYear: 2020,
    available: true,
    reads: 145,
    lastRead: '2024-03-15',
    pdfUrl: '/sample.pdf'
  },
  {
    id: '2',
    title: 'Introduction à la Littérature Africaine',
    author: 'Chinua Achebe',
    coverUrl: '../src/assets/images/datahouse.png',
    category: 'Littérature',
    description: 'Un guide complet de la littérature africaine et son développement à travers les âges.',
    publicationYear: 2021,
    available: true,
    reads: 14,
    lastRead: '2024-03-15',
    pdfUrl: '../../src/assets/books/EntrepotsDeDonnees_1pp.pdf'
  },
];

const SAMPLE_USERS: User[] = [
  { id: '1', name: 'John Doe', role: 'teacher', email: 'john@ucb.ac.cd', department: 'Informatique' },
  { id: '2', name: 'Jane Smith', role: 'teacher', email: 'jane@ucb.ac.cd', department: 'Littérature' }
];

type ModalContent = 'addBook' | 'addTeacher' | null;

function Admin() {
  const [activeTab, setActiveTab] = useState<'books' | 'users'>('books');
  const [modal, setModal] = useState<ModalContent>(null);
  const [books, setBooks] = useState(SAMPLE_BOOKS);
  const [teachers, setTeachers] = useState(SAMPLE_USERS);

  const totalBooks = books.length;
  const totalTeachers = teachers.length;
  const totalStudents = 150;
  const totalReads = books.reduce((sum, book) => sum + book.reads, 0);

  const handleAddBook = (formData: FormData) => {
    // Handle book addition with FormData
    setModal(null);
  };

  const handleAddTeacher = (teacherData: Omit<User, 'id' | 'role'>) => {
    const newTeacher: User = {
      ...teacherData,
      id: (teachers.length + 1).toString(),
      role: 'teacher'
    };
    setTeachers([...teachers, newTeacher]);
    setModal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
            Tableau de Bord Administrateur
          </h1>
          
          <DashboardSummary
            totalBooks={totalBooks}
            totalTeachers={totalTeachers}
            totalStudents={totalStudents}
            totalReads={totalReads}
          />

          <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab('books')}
              className={`px-4 py-2 border-b-2 font-medium transition-colors duration-200 ${
                activeTab === 'books'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Livres
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 border-b-2 font-medium transition-colors duration-200 ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Enseignants
            </button>
          </div>

          {activeTab === 'books' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                  Bibliothèque
                </h2>
                <button
                  onClick={() => setModal('addBook')}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5" />
                  <span>Ajouter un Livre</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map(book => (
                  <BookCard key={book.id} book={book} isAdmin />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                  Enseignants
                </h2>
                <button
                  onClick={() => setModal('addTeacher')}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5" />
                  <span>Ajouter un Enseignant</span>
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Département
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {teachers.map(teacher => (
                      <tr key={teacher.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{teacher.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">{teacher.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">{teacher.department}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {modal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 transition-colors duration-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-200">
                  {modal === 'addBook' ? 'Ajouter un Livre' : 'Ajouter un Enseignant'}
                </h3>
                <button
                  onClick={() => setModal(null)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              {modal === 'addBook' ? (
                <BookForm onSubmit={handleAddBook} />
              ) : (
                <TeacherForm onSubmit={handleAddTeacher} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;