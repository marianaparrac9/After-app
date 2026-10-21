import Link from 'next/link';

// Tarjeta de abajo del mapa cuando no hay ningún evento seleccionado
export const CurrentLocationCard = ({ backHref }: { backHref: string }) => {
  return (
    <div className="map-card">
      <div className="map-card__row">
        <span className="map-card__dot" />
        <div>
          <p className="map-card__small">Current location detected</p>
          <p className="map-card__big">Cali, Colombia</p>
        </div>
      </div>
      <Link href={backHref} className="map-card__button">
        Location Selected
      </Link>
    </div>
  );
};
