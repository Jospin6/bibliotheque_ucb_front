import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { BookFormData } from '../types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const SUPPORTED_PDF_FORMAT = ['application/pdf'];

const BookSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Le titre doit contenir au moins 2 caractères')
    .required('Titre requis'),
  author: Yup.string()
    .min(2, "Le nom de l'auteur doit contenir au moins 2 caractères")
    .required('Auteur requis'),
  category: Yup.string()
    .required('Catégorie requise'),
  description: Yup.string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .required('Description requise'),
  publicationYear: Yup.number()
    .min(1900, 'Année invalide')
    .max(new Date().getFullYear(), 'Année invalide')
    .required('Année de publication requise'),
  coverFile: Yup.mixed()
    .required('Image de couverture requise')
    .test('fileSize', 'Le fichier est trop volumineux. Maximum 10MB', 
      value => !value || value.size <= MAX_FILE_SIZE)
    .test('fileType', 'Format non supporté. Utilisez JPG ou PNG', 
      value => !value || SUPPORTED_IMAGE_FORMATS.includes(value.type)),
  pdfFile: Yup.mixed()
    .required('Fichier PDF requis')
    .test('fileSize', 'Le fichier est trop volumineux. Maximum 10MB',
      value => !value || value.size <= MAX_FILE_SIZE)
    .test('fileType', 'Format non supporté. Utilisez PDF',
      value => !value || SUPPORTED_PDF_FORMAT.includes(value.type)),
});

interface BookFormProps {
  onSubmit: (data: BookFormData) => void;
  initialData?: Partial<BookFormData>;
}

export default function BookForm({ onSubmit, initialData }: BookFormProps) {
  return (
    <Formik
      initialValues={{
        title: initialData?.title || '',
        author: initialData?.author || '',
        category: initialData?.category || '',
        description: initialData?.description || '',
        publicationYear: initialData?.publicationYear || new Date().getFullYear(),
        coverFile: null,
        pdfFile: null,
      }}
      validationSchema={BookSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        try {
          const formData = new FormData();
          Object.keys(values).forEach(key => {
            if (key !== 'coverFile' && key !== 'pdfFile') {
              formData.append(key, values[key]);
            }
          });
          
          if (values.coverFile) {
            formData.append('coverFile', values.coverFile);
          }
          if (values.pdfFile) {
            formData.append('pdfFile', values.pdfFile);
          }

          await onSubmit(formData);
        } catch (error) {
          setStatus("Échec de l'ajout du livre. Veuillez réessayer.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, setFieldValue, status, isSubmitting }) => (
        <Form className="space-y-6">
          {status && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {status}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Titre
            </label>
            <Field
              name="title"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.title && touched.title && (
              <div className="text-red-500 text-xs mt-1">{errors.title}</div>
            )}
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Auteur
            </label>
            <Field
              name="author"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.author && touched.author && (
              <div className="text-red-500 text-xs mt-1">{errors.author}</div>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Catégorie
            </label>
            <Field
              as="select"
              name="category"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Littérature">Littérature</option>
              <option value="Sciences">Sciences</option>
              <option value="Économie">Économie</option>
              <option value="Technologie">Technologie</option>
              <option value="Histoire">Histoire</option>
            </Field>
            {errors.category && touched.category && (
              <div className="text-red-500 text-xs mt-1">{errors.category}</div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.description && touched.description && (
              <div className="text-red-500 text-xs mt-1">{errors.description}</div>
            )}
          </div>

          <div>
            <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Année de publication
            </label>
            <Field
              name="publicationYear"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.publicationYear && touched.publicationYear && (
              <div className="text-red-500 text-xs mt-1">{errors.publicationYear}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image de couverture
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                setFieldValue('coverFile', file);
              }}
              className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                dark:file:bg-gray-700 dark:file:text-gray-300"
            />
            {errors.coverFile && touched.coverFile && (
              <div className="text-red-500 text-xs mt-1">{errors.coverFile}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fichier 
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                setFieldValue('pdfFile', file);
              }}
              className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                dark:file:bg-gray-700 dark:file:text-gray-300"
            />
            {errors.pdfFile && touched.pdfFile && (
              <div className="text-red-500 text-xs mt-1">{errors.pdfFile}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Ajout en cours...' : 'Ajouter le livre'}
          </button>
        </Form>
      )}
    </Formik>
  );
}