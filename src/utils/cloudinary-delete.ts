import cloudinary from "../config/cloudinary";

export async function deleteFromCloudinary(public_id: string) {
  try {
    await cloudinary.uploader.destroy(public_id);
    console.log(`🧹 Deleted Cloudinary asset: ${public_id}`);
  } catch (err) {
    console.error("Cloudinary delete error:", err);
  }
}
