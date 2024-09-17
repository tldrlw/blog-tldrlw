const InfoBlock = ({ component, textBlocks }) => {
  return (
    <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
      <h2 className='mb-1 font-semibold text-customRed'>{component}</h2>
      {textBlocks.map((text, index) => (
        <p
          key={index}
          className={`text-gray-700 ${index !== 0 ? 'mt-2' : ''}`}
          dangerouslySetInnerHTML={{ __html: text }}
        ></p>
      ))}
    </div>
  );
};

const Overview = ({ heading, description, components, closing }) => {
  return (
    <div className='container mx-auto my-2 bg-gray-100 p-4 shadow-sm'>
      <h1 className='mb-2 text-customRed'>{heading}</h1>
      <p className='mb-4 text-gray-700'>{description}</p>
      {components.map((item, index) => (
        <InfoBlock
          key={index}
          component={item.component}
          textBlocks={item.textBlocks}
        />
      ))}
      <p
        className='mt-4 text-gray-700'
        dangerouslySetInnerHTML={{ __html: closing }}
      ></p>
    </div>
  );
};

export default Overview;
