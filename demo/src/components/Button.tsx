export default function Button({ children, variant, onClick, loading }: { children: any; variant: 'primary' | 'secondary'; onClick?: React.MouseEventHandler; loading?: boolean }) {
  const bgColor = variant === 'primary' ? 'bg-white hover:bg-gray-300' : 'bg-white bg-opacity-5 hover:bg-opacity-10'
  const textColor = variant === 'primary' ? 'text-black' : 'text-gray-300'
  return <button disabled={loading} onClick={onClick} className={`${bgColor} ${textColor} ${loading ? 'pointer-events-none' : 'cursor-pointer'} relative duration-200 flex items-center justify-center px-8 py-3 text-base font-medium no-underline border border-transparent rounded-md md:py-3 md:text-lg md:px-10 md:leading-6`}>
    <span className={loading ? 'opacity-0' : ''}>{children}</span>
    {loading &&
      <span className="absolute w-full h-full flex items-center justify-center">
        <svg className={`${textColor} animate-spin h-5 w-5`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
    }
  </button>
}
