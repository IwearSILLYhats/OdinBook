const url = import.meta.env.VITE_API_URL;
import { compressImg } from "../src/util/compressImg";

async function apiFetch(endpoint, method, body, multipart) {
  try {
    const reqUrl = `${url}/${endpoint}`;
    const content = {
      headers: {
        "Content-Type": "application/json",
      },
      method: method,
      credentials: "include",
    };
    if (body !== null) {
      content.body = JSON.stringify(body);
    }
    if (multipart) {
      content.enctype = "multipart/form-data";
    }
    const request = await fetch(reqUrl, content);
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}
async function fileUpload(url, file) {
  try {
    const content = {
      headers: {
        "Content-Type": file.type,
      },
      method: "PUT",
    };
    if (file !== null) {
      content.body = file;
    }
    const request = await fetch(url, content);
    const response = await request.json();
    if (response.error) {
      throw new Error("Error returned from file storage during upload");
    }
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function uploadRequest(type, file) {
  try {
    const [urlReqData, compressedImg] = await Promise.all([
      apiFetch(`upload/${type}`, "GET"),
      compressImg(type, file),
    ]);
    if (urlReqData.error) {
      throw new Error("Failed when requesting signed URL", urlReqData.error);
    }
    if (compressedImg.error) {
      throw new Error("Failed when compressing image", compressedImg.error);
    }
    const upload = await fileUpload(urlReqData.data.signedUrl, type);

    if (upload.error) throw new Error("Upload to storage failed", upload.error);

    return { success: urlReqData.path, error: null };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export { apiFetch, uploadRequest };
