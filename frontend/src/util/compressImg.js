import Compressor from "compressorjs";

async function compressImg(file, type) {
  let options = {
    convertSize: 5000,
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
  const img = await new Compressor(file, options);
  return img.result;
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
