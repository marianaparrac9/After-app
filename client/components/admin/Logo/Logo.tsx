export const Logo = ({ size = 'lg' }: { size?: 'lg' | 'sm' }) => {
  const src =
    size === 'sm' ? '/images/brand/logo-after-sm.png' : '/images/brand/logo-after.png';

  return (
    <div className={size === 'sm' ? 'logo-mark sm' : 'logo-mark'}>
      <img src={src} alt="After" />
      {size === 'lg' ? <p className="tagline">Discover after dark</p> : null}
    </div>
  );
};
