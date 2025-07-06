import MainHeader from '@/components/main-header';

export default function MarketingLayout({ children }) {
  return (
    <div id="page">
      <MainHeader />
      <div id="marketing">
        {children}
      </div>
    </div>
  );
}
