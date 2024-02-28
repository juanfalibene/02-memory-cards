import React, { useEffect, useState } from "react";
import { emojis } from "./data";

const App = () => {
  // recupero emoijs y copio array
  const allEmojis = [...emojis, ...emojis];
  // array dupllicado con valor 0 == oculto
  const prevEmojis = allEmojis.map((emoji) => ({
    image: emoji,
    state: 0,
  }));
  const [myEmojis, setMyEmojis] = useState([]);

  useEffect(() => {
    // orden al azar algoritmo Fisher-Eyes
    // recorrer prevEmojis y obtener
    // recorreer cuadros previos comenzando por ultimo valor
    for (let i = prevEmojis.length - 1; i > 0; i--) {
      // random entre valores +1 para que incluya el propio valor en que esta
      const azar = Math.floor(Math.random() * (i + 1));
      // intercambiar el ultimo valor por azar
      [prevEmojis[i], prevEmojis[azar]] = [prevEmojis[azar], prevEmojis[i]];
    }
    setMyEmojis([...prevEmojis]);
  }, []);

  const backCard = {
    backgroundImage: `url(./../img/question.png)`,
  };

  return (
    <>
      <div className='emojis'>
        {myEmojis.map((emoji, index) => (
          <div className='emoji' key={index} style={backCard}>
            <div className='back'>
              <img src='https://www.html6.es/img/naranja.png' alt='bg' />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
