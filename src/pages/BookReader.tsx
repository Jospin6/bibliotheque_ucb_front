import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Book } from '../types';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

export default function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const zoomPluginInstance = zoomPlugin();

  React.useEffect(() => {
    const fetchBook = async () => {
      try {
        // Fetch book details from API
        const response = await fetch(`/api/books/${id}`);
        const bookData = await response.json();
        setBook(bookData);

        // Create a blob URL for the PDF
        const pdfResponse = await fetch(bookData.pdfUrl);
        const pdfBlob = await pdfResponse.blob();
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error loading book:', error);
      }
    };

    fetchBook();

    // Cleanup
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [id]);

  if (!book || !pdfUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour à la bibliothèque
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full md:w-48 h-64 object-cover rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">par {book.author}</p>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>Catégorie: {book.category}</p>
                <p>Publié en: {book.publicationYear}</p>
                <p>Nombre de lectures: {book.reads}</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none dark:prose-invert">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Contenu du livre
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{book.description}</p>
            
            <div className="pdf-viewer border border-gray-300 dark:border-gray-600 rounded-lg" style={{
              height: '750px',
              overflow: 'auto',
            }}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={pdfUrl}
                  plugins={[zoomPluginInstance]}
                />
              </Worker>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}