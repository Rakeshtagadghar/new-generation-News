export default function NewsDetailsLayout({ children, modal }) {
  return (
    <div>
      {modal}
      {children}
    </div>
  );
}
