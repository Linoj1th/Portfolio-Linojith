document.addEventListener("DOMContentLoaded", () => {
  const phrases = ["startups.", "digital brands.", "businesses."];
  const target = document.getElementById("animated-text");

  const typingSpeed = 100;
  const erasingSpeed = 60;
  const delayBetween = 2000;
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];
    
    if (!isDeleting && charIndex < current.length) {
      target.textContent += current.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } 
    else if (isDeleting && charIndex > 0) {
      target.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, erasingSpeed);
    } 
    else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(type, delayBetween);
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, typingSpeed);
      }
    }
  }

  type();
});