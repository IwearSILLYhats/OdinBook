import Compressor from "compressorjs";

async function compressImg(file, type) {
  let options = {
    convertSize: 5000,
    mimeType: "image/webp",
  };
  if (type === "avatar") {
    options = { ...options, ...avatarDims };
  }
  if (type === "banner") {
    options = { ...options, ...bannerDims };
  }
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      ...options,
      success(result) {
        resolve(result);
      },
      error(error) {
        console.log(error);
        reject(error);
      },
    });
  });
}
const bannerDims = {
  height: 500,
  width: 1500,
};
const avatarDims = {
  height: 400,
  width: 400,
};

export { compressImg };
