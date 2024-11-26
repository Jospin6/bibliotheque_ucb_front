import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { addTeacher } from '../services/api';

const TeacherSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .required('Nom requis'),
  email: Yup.string()
    .email('Adresse email invalide')
    .required('Email requis'),
  department: Yup.string()
    .required('Département requis'),
});

interface TeacherFormValues {
  name: string;
  email: string;
  department: string;
}

interface TeacherFormProps {
  onSubmit: (data: TeacherFormValues) => void;
}

export default function TeacherForm({ onSubmit }: TeacherFormProps) {
  const handleSubmit = async (values: TeacherFormValues, { setSubmitting, setStatus }: any) => {
    try {
      await addTeacher(values);
      onSubmit(values);
    } catch (error) {
      setStatus("Échec de l'ajout de l'enseignant. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        department: '',
      }}
      validationSchema={TeacherSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, status, isSubmitting }) => (
        <Form className="space-y-6">
          {status && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {status}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nom complet
            </label>
            <Field
              name="name"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.name && touched.name && (
              <div className="text-red-500 text-xs mt-1">{errors.name}</div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Département
            </label>
            <Field
              as="select"
              name="department"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Sélectionner un département</option>
              <option value="Informatique">Informatique</option>
              <option value="Littérature">Littérature</option>
              <option value="Économie">Économie</option>
              <option value="Sciences">Sciences</option>
              <option value="Histoire">Histoire</option>
            </Field>
            {errors.department && touched.department && (
              <div className="text-red-500 text-xs mt-1">{errors.department}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Ajout en cours...' : 'Ajouter l\'enseignant'}
          </button>
        </Form>
      )}
    </Formik>
  );
}