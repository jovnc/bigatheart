export default function Container({ children }) {
  return (
    <div className="w-full p-5 shadow-md rounded-lg p-8 bg-stone-50 bg-opacity-50">
      {children}
    </div>
  );
}
