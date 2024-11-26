import React from 'react';
import { Book, BookOpen, Users } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

function SummaryCard({ title, count, icon, color }: SummaryCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-3xl font-semibold text-gray-700">{count}</p>
        </div>
      </div>
    </div>
  );
}

interface DashboardSummaryProps {
  totalBooks: number;
  totalTeachers: number;
  totalStudents: number;
  totalReads: number;
}

export default function DashboardSummary({
  totalBooks,
  totalTeachers,
  totalStudents,
  totalReads,
}: DashboardSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <SummaryCard
        title="Total Books"
        count={totalBooks}
        icon={<Book className="h-8 w-8 text-blue-600" />}
        color="border-blue-600"
      />
      <SummaryCard
        title="Total Teachers"
        count={totalTeachers}
        icon={<Users className="h-8 w-8 text-green-600" />}
        color="border-green-600"
      />
      <SummaryCard
        title="Total Students"
        count={totalStudents}
        icon={<Users className="h-8 w-8 text-purple-600" />}
        color="border-purple-600"
      />
      <SummaryCard
        title="Total Reads"
        count={totalReads}
        icon={<BookOpen className="h-8 w-8 text-orange-600" />}
        color="border-orange-600"
      />
    </div>
  );
}