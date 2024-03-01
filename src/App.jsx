import React, { useEffect, useState } from "react";
import { emojis } from "./data";
import Credits from "./Credits";
import Msg from "./Msg";

const App = () => {
  const [matches, setMatches] = useState(0);
  const [plays, setPlays] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // recupero emoijs y copio array
  const allEmojis = [...emojis, ...emojis];
  // array dupllicado con valor 0 == oculto
  const prevEmojis = allEmojis.map((emoji) => ({
    image: emoji,
    state: 0,
  }));
  const [myEmojis, setMyEmojis] = useState([]);
  // array de cartas seleccionadas
  const [myPlays, setMyPlays] = useState([]);

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
    backgroundImage: `url(./img/question.png)`,
  };

  const toShow = (e) => {
    // comprobar que no haga click en el mismo objeto
    const exists = myPlays.find((existObject) => existObject.index === e);
    // comprobar que haga click en el objeto ya mostrado
    const isFinded = myEmojis[e].state;
    // condicional para ejecutar solo si jugo una vez (2 clicks)
    if (myPlays.length < 2 && !exists && isFinded === 0) {
      // obtener el valor de myPlays y añadir un objeto
      setMyPlays([
        ...myPlays,
        {
          image: myEmojis[e].image,
          index: e,
        },
      ]);

      //cambiar estado visible sin usar map
      setMyEmojis((prevEmojis) => {
        const updatedEmojis = [...prevEmojis];
        updatedEmojis[e].state = 1;
        return updatedEmojis;
      });
    }
  };

  useEffect(() => {
    // realizo la jugada - click en 2 cards
    if (myPlays.length === 2) {
      setPlays(plays + 1);
      // comparar el campo image del objeto 0 y 1
      if (myPlays[0].image === myPlays[1].image) {
        console.log(myPlays[0].image);
        console.log(myPlays[1].image);
        // acierto - reset jugada
        setMyPlays([]);
        setMatches(matches + 1);
        if (matches + 1 >= myEmojis.length) {
          alert("Game Over");
        }
      } else {
        setTimeout(() => {
          // no acierto - ocultar
          myPlays.map((playObject) => {
            const tempPlay = [...myEmojis];
            tempPlay[playObject.index].state = 0;
            setMyEmojis(tempPlay);
            setMyPlays([]);
            return null;
          });
        }, 1000);
      }
    }
  }, [myPlays]);

  const resetGame = () => {
    const shuffledEmojis = [...prevEmojis];
    for (let i = shuffledEmojis.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledEmojis[i], shuffledEmojis[randomIndex]] = [
        shuffledEmojis[randomIndex],
        shuffledEmojis[i],
      ];
    }

    setMyEmojis([...shuffledEmojis]);
    setMyPlays([]);
    setMatches(0);
    setPlays(0);
  };

  // useEffect Msg componnent
  useEffect(() => {
    if (plays > 0 && matches >= myEmojis.length / 2) {
      setShowModal(true);
      setModalMessage("🎉 🎉 🎉 You finished the game!!");
      resetGame();
    }
  }, [matches, plays]);

  return (
    <>
      <h1>Match & Memory Cards</h1>
      <div className='emojis'>
        {myEmojis.map((emoji, index) =>
          // condicional segun estado 0 === backCard 1 backgroundImage
          emoji.state === 0 ? (
            <div
              className='emoji'
              key={index}
              style={backCard}
              onClick={() => toShow(index)}
            >
              <div className='back'>
                <img src='./img/back-card.png' alt='bg' />
              </div>
            </div>
          ) : (
            <div
              className='emoji'
              key={index}
              style={{ backgroundImage: `url(${myEmojis[index].image})` }}
              onClick={() => toShow(index)}
            >
              <div className='back'>
                <img src='./img/back-card.png' alt='bg' />
              </div>
            </div>
          )
        )}
      </div>
      <div className='counter'>
        {matches} match{matches > 1 && "es"} of {plays} plays
        {plays > 0 && (
          <span className='plays'>
            {" "}
            % {Math.round((matches / plays) * 100)}
          </span>
        )}
        <Credits></Credits>
        {showModal && (
          <Msg message={modalMessage} onClose={() => setShowModal(false)} />
        )}
      </div>
    </>
  );
};

export default App;
