import { useCallback, useEffect, useState } from "react";
import words from "./word-list.json";
import { HangManDrawing } from "./HangManDrawing";
import { HangManWord } from "./HangManWord";
import { Keyboard } from "./Keyboard";
import "./App.module.css";

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const correctLetters = guessedLetters.filter((letter) =>
    wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return;
      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div
        style={{ fontSize: "1.5rem", textAlign: "center", marginTop: "-25px" }}
      >
        {isWinner && "Winner! - Refresh to try again"}{" "}
        {isLoser && "Nice Try - Refresh to try again"}
      </div>
      <HangManDrawing numberOfGuesses={incorrectLetters.length} />
      <HangManWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={correctLetters}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
