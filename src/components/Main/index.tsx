import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { getSolution } from '../../lib/getSolution';
import Wordle from '../Wordle';
import WinnerScreen from '../WinnerScreen';
import NavBar from '../NavBar';

const Main = () => {
  const [solution, setSolution] = useState({ word: '', quantity: 0 });
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(0);
  console.log(
    `Main states are initialized. solution=${solution} streak=${streak} round=${round}`
  );
  console.log(solution);

  useEffect(() => {
    console.log(
      `Running the first useEffect, run setStreak(${getSolution().streak})`
    );
    setStreak(getSolution().streak);
  }, []);

  useDidMountEffect(() => {
    const solution = getSolution();
    console.log(
      `Running useEffect with 'round' dependency. solution=${getSolution()}, setSolution(${solution})`
    );
    setSolution({ word: solution.word, quantity: solution.quantity });
  }, [round]);

  return (
    <Box as="main">
      <NavBar streak={streak} quantity={solution.quantity} />
      <Box height="calc(100vh - 10vh)">
        {solution && (
          <Wordle
            solution={solution.word}
            setStreak={setStreak}
            setRound={setRound}
          />
        )}
        {streak === solution.quantity && (
          <WinnerScreen
            quantity={solution.quantity}
            setStreak={setStreak}
            setRound={setRound}
          />
        )}
      </Box>
    </Box>
  );
};

export default Main;
