import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaCheck } from "react-icons/fa";

const CodeBlock = ({ language, codeText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
    } catch (error) {
      // Fallback for browsers without clipboard API access
      const textarea = document.createElement("textarea");
      textarea.value = codeText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
      } catch (e) {
        // ignore
      }
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-lang">{language || "code"}</span>

        <button
          type="button"
          className="code-copy-btn"
          onClick={handleCopy}
        >
          {copied ? <FaCheck /> : <FaCopy />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        {codeText}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
