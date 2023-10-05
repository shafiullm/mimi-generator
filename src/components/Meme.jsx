import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import memesData from "../memesData.js";

function Meme() {
  const [meme, setMeme] = useState({
    topText: "top text",
    bottomText: "bottom text",
    randomImage:
      "https://lh3.googleusercontent.com/d/1Lj2P-IloZjSpMAQIeG145pBopfhszoIi",
  });

  const [allMemeImages, setAllMemeImages] = useState(memesData.memes);

  const [fontSize, setFontSize] = useState(1.7);

  // useEffect(() => {
  //   async function getMemes() {
  //     const res = await fetch("https://api.imgflip.com/get_memes");
  //     const data = await res.json();
  //     setAllMemeImages(data.data.memes);
  //   }
  //   getMemes();
  // }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    console.log(allMemeImages[randomNumber]);
    const randomUrl = allMemeImages[randomNumber].url;
    setMeme((prevMeme) => ({ ...prevMeme, randomImage: randomUrl }));
  }

  function saveMeme() {
    const memeImageWrapper = document.querySelector(".meme--image--wrapper");

    if (memeImageWrapper) {
      domtoimage
        .toJpeg(memeImageWrapper)
        .then(function (dataURL) {
          const a = document.createElement("a");
          a.href = dataURL;
          a.download = "meme.jpg";
          a.click();
        })
        .catch(function (error) {
          console.error("Error saving meme:", error);
        });
    }
  }

  function increaseFont() {
    setFontSize((prevFontSize) => prevFontSize + 0.05);
    console.log(fontSize);
  }

  function decreaseFont() {
    setFontSize((prevFontSize) => prevFontSize - 0.05);
    console.log(fontSize);
  }

  return (
    <main className="meme--main">
      <div className="meme--form">
        <input
          type="text"
          placeholder="Top text"
          className="meme--form--input"
          name="topText"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="meme--form--input"
          name="bottomText"
          onChange={handleChange}
        />
        <button onClick={getMemeImage} className="meme--form--button">
          Generate a Random Meme Image
        </button>
      </div>
      <div className="meme--image--wrapper">
        <img src={meme.randomImage} className="meme--image" />
        <h1
          className="meme--image--text top"
          style={{ fontSize: `${fontSize}rem` }}
        >
          {meme.topText}
        </h1>
        <h1
          className="meme--image--text bottom"
          style={{ fontSize: `${fontSize}rem` }}
        >
          {meme.bottomText}
        </h1>
      </div>
      <div className="meme--buttons">
        <div className="font--size">
          <button className="meme--font--size--button" onClick={increaseFont}>
            +
          </button>
          <p>Font Size</p>
          <button className="meme--font--size--button" onClick={decreaseFont}>
            -
          </button>
        </div>
        <button onClick={saveMeme} className="meme--save--button">
          Save Meme
        </button>
      </div>
    </main>
  );
}

export default Meme;
