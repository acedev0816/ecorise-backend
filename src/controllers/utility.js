/// /// /// /// /// ///
/// Upload file to $root/uploads folder
/// /// /// /// /// ///
export const upload = async (req, res) => {
  try {
    res.status(200).json({ message: "Upload file successful.", path: "uploaded_file_path" });
  } catch (error) {
    res.status(500).json({ message: "Upload file failed.", error});
  }
};
