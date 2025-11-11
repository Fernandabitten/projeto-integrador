import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = ({ scrollRef }) => {
  console.log('scrollRefff', scrollRef);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = scrollRef?.current;

    if (!target) return;

    const toggleVisibility = () => {
      setIsVisible(target.scrollTop > 300);
    };

    target.addEventListener('scroll', toggleVisibility);
    return () => target.removeEventListener('scroll', toggleVisibility);
  }, [scrollRef]);

  const scrollToTop = () => {
    scrollRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg z-50 transition-all duration-500 transform hover:bg-emerald-400 hover:scale-110 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
      >
        <ArrowUp size={22} />
      </button>
    )
  );
};

export default ScrollToTop;
