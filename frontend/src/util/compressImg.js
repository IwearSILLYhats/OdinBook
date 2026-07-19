import Compressor from "compressorjs";

async function compressImg(file, type) {
  let options = {
    convertTypes: mimeTypes,
    mimeType: "image/webp",
    success(result) {
      return result;
    },
    error(error) {
      console.log(error);
      return { error };
    },
  };
  if (type === "avatar") {
    options = { ...options, ...avatarDims };
  }
  if (type === "banner") {
    options = { ...options, ...bannerDims };
  }
  return new Compressor(file, options);
}
const bannerDims = {
  height: 500,
  width: 1500,
};
const avatarDims = {
  height: 400,
  width: 400,
};
const mimeTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export { compressImg };
