// variants.js
export const slideVariants = {
    enter: direction => ({
      x: direction === 'forward' ? 100 : -100,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        willChange: "transform, opacity"
      }
    },
    exit: direction => ({
      x: direction === 'forward' ? -100 : 100,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };
  