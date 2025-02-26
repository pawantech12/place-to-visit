export const getSlugType = async (slug) => {
  try {
    const response = await fetch(
      `https://api.placestovisitindia.com/api/checkSlug/${slug}`
    );
    const data = await response.json();
    return data.type;
  } catch (error) {
    console.error("Error checking slug type:", error);
    return null; // Return null if there's an error
  }
};
