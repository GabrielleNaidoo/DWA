import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card from './components/Card';
import dataSet from './data.js';

function App() {
  const cardData = dataSet.map((data) => {
    return (
      <Card
        key={data.id}
        data={data}

        // Shorten the below by passing an object as props
        // image={`./images/${data.coverImg}`}
        // rating={data.stats.rating}
        // reviewCount={data.stats.reviewCount}
        // location={data.location}
        // title={data.location}
        // price={data.price}
        // openSpots={data.openSpots}
      />
    );
  });

  return (
    <div>
      <Navbar />
      <Hero />
      <section className="cards_list">{cardData}</section>
    </div>
  );
}

export default App;
