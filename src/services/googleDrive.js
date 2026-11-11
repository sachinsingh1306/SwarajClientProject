
const API_KEY = "YOUR_GOOGLE_DRIVE_API_KEY";

const DRIVE_FOLDERS = {
  Wedding: "YOUR_WEDDING_FOLDER_ID",
  Event: "YOUR_EVENT_FOLDER_ID",
  Portrait: "YOUR_PORTRAIT_FOLDER_ID",
};

// Shuffle images randomly using Fisher-Yates algorithm
export const shuffleImages = (images) => {
  const shuffled = [...images];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
};

// Fetch images from a Google Drive folder
const fetchFolderImages = async (folderId, category) => {
  let images = [];
  let nextPageToken = "";

  do {
    const params = new URLSearchParams({
      key: API_KEY,
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      pageSize: "1000",
      fields: "nextPageToken,files(id,name,mimeType)",
    });

    if (nextPageToken) {
      params.set("pageToken", nextPageToken);
    }

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?${params}`
    );

    if (!response.ok) {
      throw new Error("Unable to fetch Google Drive images.");
    }

    const data = await response.json();

    const folderImages = (data.files || []).map((file) => ({
      id: file.id,
      name: file.name,
      category,
      image: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1200`,
    }));

    images = [...images, ...folderImages];
    nextPageToken = data.nextPageToken || "";
  } while (nextPageToken);

  return images;
};

// Fetch all portfolio categories
export const fetchPortfolioImages = async () => {
  const categories = Object.entries(DRIVE_FOLDERS);

  const results = await Promise.all(
    categories.map(([category, folderId]) =>
      fetchFolderImages(folderId, category)
    )
  );

  return shuffleImages(results.flat());
};

// Get images by category and shuffle them
export const shuffleCategoryImages = (images, category) => {
  const filteredImages = images.filter(
    (image) => image.category === category
  );

  return shuffleImages(filteredImages);
};
