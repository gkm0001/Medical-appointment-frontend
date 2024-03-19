import React, { useState, useEffect } from 'react';

function Carousel({ autoSlide = false, autoSlideInterval = 5000, children }) {
  const [currIndex, setCurrIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const prevIndex = () => {
    setTransitioning(true);
    setCurrIndex(prevIndex => (prevIndex === 0 ? children.length - 1 : prevIndex - 1));
  };

  const nextIndex = () => {
    setTransitioning(true);
    setCurrIndex(prevIndex => (prevIndex + 1) % children.length);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const intervalId = setInterval(() => {
      nextIndex();
    }, autoSlideInterval);

    return () => clearInterval(intervalId);
  }, []);

  const handleTransitionEnd = () => {
    setTransitioning(false);
  };

  return (
    <div className='absolute top-0 overflow-hidden  w-full h-64  image-slider'>
      <div className='flex' style={{ transform: `translateX(-${currIndex * 100}%)`, transition: transitioning ? 'transform 0.5s ease-in-out' : 'none' }}>
        {React.Children.map(children, (child, index) => (
          React.cloneElement(child, {
            className: `${child.props.className} w-full h-full object-cover`,
            onTransitionEnd: handleTransitionEnd
          })
        ))}
      </div>
      <div className='absolute inset-0 flex items-center justify-between'>
        <button onClick={prevIndex} className='absolute top-1/2 left-0 transform -translate-y-1/2 p-1 rounded-full'>
                <img width="64" height="64" src="https://img.icons8.com/pastel-glyph/64/circled-chevron-left.png" alt="circled-chevron-left"/>
        </button>
        <button onClick={nextIndex} className='absolute top-1/2 right-0 transform -translate-y-1/2 p-1 rounded-full '>
                   <img width="64" height="64" src="https://img.icons8.com/pastel-glyph/64/circled-chevron-right.png" alt="circled-chevron-right"/>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
