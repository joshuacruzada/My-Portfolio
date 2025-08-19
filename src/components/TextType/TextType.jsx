import React, { useState, useEffect } from 'react';

/**
 * A custom component that creates a typing and deleting animation effect.
 * It types out a given string, pauses, deletes it, and then repeats the loop.
 *
 * @param {object} props - The component props.
 * @param {string[]} props.text - An array of strings to be typed out.
 * @param {number} props.typingSpeed - The speed of typing (in milliseconds).
 * @param {number} props.deletingSpeed - The speed of deleting (in milliseconds).
 * @param {number} props.pauseDuration - The duration to pause after typing a full string (in milliseconds).
 * @param {string} props.cursorCharacter - The character to use for the blinking cursor.
 */
export default function TextType({ text, typingSpeed, deletingSpeed, pauseDuration, cursorCharacter }) {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [speed, setSpeed] = useState(typingSpeed);

  useEffect(() => {
    // This function handles the core animation logic.
    const tick = () => {
      // Get the full text for the current loop.
      const fullText = text[loopNum % text.length];
      let updatedText = '';

      if (isDeleting) {
        // If we are deleting, remove the last character.
        updatedText = fullText.substring(0, currentText.length - 1);
      } else {
        // If we are typing, add the next character.
        updatedText = fullText.substring(0, currentText.length + 1);
      }

      // Update the state with the new text.
      setCurrentText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        // If the text is fully typed, pause for the specified duration.
        setIsDeleting(true);
        setSpeed(pauseDuration);
      } else if (isDeleting && updatedText === '') {
        // If the text is fully deleted, move to the next string and reset.
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setSpeed(typingSpeed);
      } else {
        // If still typing or deleting, maintain the set speed.
        setSpeed(isDeleting ? deletingSpeed : typingSpeed);
      }
    };

    // Use a timer to control the animation's tick rate.
    const ticker = setTimeout(() => {
      tick();
    }, speed);

    // Clean up the timer when the component unmounts or the state changes.
    return () => {
      clearTimeout(ticker);
    };
  }, [currentText, isDeleting, loopNum, speed, text, typingSpeed, deletingSpeed, pauseDuration]);

  // Render the current text and a blinking cursor.
  return (
    <>
      {currentText}
      <span className="inline-block animate-pulse">{cursorCharacter}</span>
    </>
  );
}
