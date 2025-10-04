export default function GuaranteeBadge({ size = 'normal' }: { size?: 'small' | 'normal' | 'large' }) {
  const sizeClasses = {
    small: 'p-3 text-sm',
    normal: 'p-4 text-base',
    large: 'p-6 text-lg'
  };

  return (
    <div className={`bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-600 rounded-lg ${sizeClasses[size]} text-center shadow-md`}>
      <div className="flex items-center justify-center gap-3">
        <div className="bg-green-600 text-white rounded-full p-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-left">
          <p className="font-bold text-green-800">30-Day Money-Back Guarantee</p>
          <p className="text-sm text-gray-700">Not satisfied? Get a full refund, no questions asked</p>
        </div>
      </div>
    </div>
  );
}
