import { useEffect, useRef, useState } from "react";

// Reveals text progressively, word by word, quickly — similar
// to how ChatGPT streams its replies onto the screen.
const useTypewriter = (fullText = "", enabled = false, onTick) => {
  const [displayedText, setDisplayedText] = useState(
    enabled ? "" : fullText
  );

  const doneRef = useRef(!enabled);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(fullText);
      doneRef.current = true;
      return undefined;
    }

    doneRef.current = false;

    const tokens = fullText.split(/(\s+)/);
    let index = 0;
    let frameId;
    let timeoutId;

    const step = () => {
      index += 3;

      const next = tokens.slice(0, index).join("");
      setDisplayedText(next);

      if (typeof onTick === "function") {
        onTick();
      }

      if (index < tokens.length) {
        timeoutId = setTimeout(() => {
          frameId = requestAnimationFrame(step);
        }, 15);
      } else {
        doneRef.current = true;
      }
    };

    setDisplayedText("");
    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullText, enabled]);

  return { displayedText, isTyping: enabled && !doneRef.current };
};

export default useTypewriter;
