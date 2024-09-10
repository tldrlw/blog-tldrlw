import Image from 'next/image';

export default function Header() {
  return (
    <main>
      <div>
        <div className='mx-auto bg-customBlueLogo px-4 pt-4 md:p-8'>
          <Image
            src='/images/png/logo-no-background.png' // Replace with your actual image URL
            alt='tldrlw logo'
            className='h-auto w-1/2 md:w-1/4'
            width={1500}
            height={512}
          />
        </div>
      </div>
    </main>
  );
}

// Use Tailwind’s w- and h- classes to define the width and height of the image.
// You can also use percentage values like w-1/2 for half the width, or specific pixel sizes like w-32 for 128px width.
// w-32: Sets the width of the image to 128px.
// h-auto: Automatically adjusts the height to maintain the aspect ratio of the image.
// You can adjust the w-32 class to other values like w-24 (96px), w-48 (192px), or even use percentage values like w-1/2 to make it 50% of the container width.
