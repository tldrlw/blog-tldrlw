import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  base16AteliersulphurpoolLight,
  coy,
  dark,
  okaidia,
  solarizedlight,
  // ^ has a nice beige background
  tomorrow,
} from "react-syntax-highlighter/dist/cjs/styles/prism"; // You can choose other themes if you prefer

export default function codeBlock({
  filePath,
  filePathStyle = "text-base",
  fileExtension,
  codeBlock,
}) {
  return (
    <div className={filePathStyle}>
      <p>{filePath}</p>
      <SyntaxHighlighter
        language={fileExtension}
        style={base16AteliersulphurpoolLight}
        customStyle={{
          fontSize: "10px", // This changes the container's font size
          padding: "10px", // Adjust padding if needed
        }}
        codeTagProps={{
          style: { fontSize: "12px" }, // This directly changes the code font size
        }}
      >
        {codeBlock}
      </SyntaxHighlighter>
    </div>
  );
}
