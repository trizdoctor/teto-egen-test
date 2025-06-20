export const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Personality test illustration 1"
  },
  {
    url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Psychology and mind illustration"
  },
  {
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Self discovery journey"
  },
  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Personality and character"
  },
  {
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Human connection and understanding"
  }
];

export function getRandomHeroImage() {
  return heroImages[Math.floor(Math.random() * heroImages.length)];
}