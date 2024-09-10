import CodeBlock from '@/components/codeBlock';

const yamlCode = `
version: "3"
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
`;

const hclCode = `
resource "aws_instance" "example" {
  ami           = "ami-123456"
  instance_type = "t2.micro"
}
`;

export default function Home() {
  return (
    <main>
      <CodeBlock
        filePath={'hello.tf'}
        fileExtension={'yaml'}
        codeBlock={yamlCode}
      ></CodeBlock>
      <CodeBlock
        filePath={'hello.tf'}
        fileExtension={'yaml'}
        codeBlock={hclCode}
      ></CodeBlock>
    </main>
  );
}
