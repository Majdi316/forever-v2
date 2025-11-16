const normalizeHero = (heroDetails) => {
  const heroDetailsForServer = {
    title: heroDetails.title,
    subTitle: heroDetails.subTitle,
    description: heroDetails.description,
    image: {
      url: heroDetails.url,
      alt: heroDetails.alt,
    },
  };

  return heroDetailsForServer;
};

export default normalizeHero;
