import React from 'react';

function Meme() {
  const [allMemes, setAllMemes] = React.useState([]);
  const [meme, setMeme] = React.useState({
    topText: '',
    bottomText: '',
    randomImage: 'https://i.imgflip.com/1g8my4.jpg',
  });

  React.useEffect(function () {
    console.log('Effect ran');
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const itemNumber = Math.floor(Math.random() * allMemes.length - 1);

    setMeme((prevMeme) => {
      return { ...prevMeme, randomImage: allMemes[itemNumber].url };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  return (
    <main>
      <div className="form">
        <div className="input-container">
          <input
            className="input firstInput"
            type="text"
            placeholder="top text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          ></input>
          <input
            className="input secondInput"
            type="text"
            placeholder="bottom text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          ></input>
        </div>
        <button onClick={getMemeImage} className="submitButton" type="submit">
          Get a new meme image
        </button>
      </div>
      <div className="meme">
        <div className="memeImageContainer">
          <img
            className="meme-image"
            src={meme.randomImage}
            alt="meme image"
          ></img>
        </div>
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default Meme;
