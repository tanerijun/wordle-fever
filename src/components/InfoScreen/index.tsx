import { useEffect, useRef } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Text,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { FaLightbulb } from 'react-icons/fa';
import { Tile } from '../Tile';

interface InfoScreenProps {
  quantity: number;
}

const InfoScreen = ({ quantity }: InfoScreenProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const notFirstVisit = JSON.parse(
      localStorage.getItem('notFirstVisit') || 'null'
    );
    localStorage.setItem('notFirstVisit', JSON.stringify(true));
    if (!notFirstVisit) btnRef?.current?.click();
  }, []);

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} size={['xs', 'sm', 'md']}>
        <FaLightbulb />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={['sm', 'md', 'lg']}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How To Play</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="flex-start">
              <Text>
                <b>Wordle Fever</b> is Wordle for the true hardcore. You beat
                the game by guessing all the correct Wordles consecutively.
              </Text>
              <Text>
                In other words, you win by accumulating {quantity} win streaks.
              </Text>
              <Text>
                You can rest assured that the same Wordle won&apos;t show up
                twice. The game will get easier the longer you play as the
                solution pool get smaller and smaller.
              </Text>
              <Text>
                You have 6 tries to guess each Wordle. Type the Wordle with your
                Keyboard or Keypad, and press ENTER to submit.
              </Text>
              <Divider />
              <Text>Examples</Text>
              <HStack>
                <Tile letter="L" color="green" />
                <Tile letter="U" color="transparent" />
                <Tile letter="C" color="transparent" />
                <Tile letter="K" color="transparent" />
                <Tile letter="Y" color="transparent" />
              </HStack>
              <Text>
                The letter <b>L</b> is in the Wordle and in the correct spot.
              </Text>
              <HStack>
                <Tile letter="S" color="transparent" />
                <Tile letter="N" color="transparent" />
                <Tile letter="A" color="transparent" />
                <Tile letter="I" color="transparent" />
                <Tile letter="L" color="yellow" />
              </HStack>
              <Text>
                The letter <b>L</b> is in the Wordle but in the wrong spot.
              </Text>
              <HStack>
                <Tile letter="A" color="transparent" />
                <Tile letter="L" color="gray" />
                <Tile letter="G" color="transparent" />
                <Tile letter="A" color="transparent" />
                <Tile letter="E" color="transparent" />
              </HStack>
              <Text>
                The letter <b>L</b> is not in the Wordle.
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Text fontSize="xs">
              Tips: You can close the game and come back anytime. Your progress
              is autosaved.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoScreen;
