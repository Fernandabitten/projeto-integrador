// src/components/ScrollToTop.jsx
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // ícone do botão (instale abaixo se precisar)

// Se ainda não tiver o pacote de ícones, rode no terminal:
 // npm install lucide-react

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostra o botão quando o usuário rola pra baixo
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
