const storageUrl = import.meta.env.VITE_SUPABASE_URL;

function formatAvatar(userId) {
  return `${storageUrl}/avatars/${userId}.webp`;
}
function formatBanner(userId) {
  return `${storageUrl}/banners/${userId}.webp`;
}
function formatAttachment(path) {
  return `${storageUrl}/attachments/${path}.webp`;
}

export { formatAvatar, formatBanner, formatAttachment };
