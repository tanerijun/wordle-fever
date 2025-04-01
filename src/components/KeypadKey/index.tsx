import { useState, useEffect } from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import { AiOutlineEnter, AiOutlineRollback } from "react-icons/ai";

interface KeypadKeyProps {
  keysColor: {
    [key: string]: string;
  };
  letter: {
    key: string;
  };
  handleKeyup: ({
    key,
  }:
    | KeyboardEvent
    | {
        key: string;
      }) => void;
}

const KeypadKey = ({ keysColor, letter, handleKeyup }: KeypadKeyProps) => {
  const { colorMode } = useColorMode();
  const [keypadKeyColor, setKeypadKeyColor] = useState("");

  useEffect(() => {
    colorMode === "dark" ? setKeypadKeyColor("whiteAlpha") : setKeypadKeyColor("gray");
  }, [colorMode]);

  useEffect(() => {
    if (keysColor[letter.key]) {
      const setColor = setTimeout(() => {
        if (keysColor[letter.key] === "green") {
          setKeypadKeyColor("green");
        } else if (keysColor[letter.key] === "yellow") {
          setKeypadKeyColor("yellow");
        } else if (keysColor[letter.key] === "gray" && colorMode === "light") {
          setKeypadKeyColor("blackAlpha");
        } else if (keysColor[letter.key] === "gray" && colorMode === "dark") {
          setKeypadKeyColor("gray");
        }
      }, 1300);

      return () => clearTimeout(setColor);
    }
  });

  return (
    <Button
      key={letter.key}
      colorScheme={keypadKeyColor}
      color={keypadKeyColor === "blackAlpha" && colorMode === "light" ? "black" : undefined}
      size={["sm", "md", "md"]}
      onClick={() => handleKeyup(letter)}
    >
      {letter.key === "Enter" ? (
        <AiOutlineEnter />
      ) : letter.key === "Backspace" ? (
        <AiOutlineRollback />
      ) : (
        letter.key.toUpperCase()
      )}
    </Button>
  );
};

export default KeypadKey;
