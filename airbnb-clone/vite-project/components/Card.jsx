import React from 'react';

function Card(props) {
  let badgeText;
  if (props.data.openSpots === 0) {
    badgeText = 'SOLD OUT';
  } else if (props.data.location === 'Online') {
    badgeText = 'ONLINE';
  }

  return (
    <div className="card">
      {badgeText && <div className="card_badge">{badgeText}</div>}
      <img
        className="card_image"
        src={`./images/${props.data.coverImg}`}
        alt="image of person"
      />
      <div className="card_stats">
        <img className="card_star" src="/images/star.png" alt="star icon" />
        <span>{props.data.stats.rating}</span>
        <span className="grey">({props.data.stats.reviewCount}) &bull;</span>
        <span className="grey">{props.data.location}</span>
      </div>
      <p>{props.data.title}</p>
      <p className="card_price">
        <span className="bold">From ${props.data.price}</span> / person
      </p>
    </div>
  );
}

export default Card;
