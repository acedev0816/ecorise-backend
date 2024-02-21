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


/// /// /// /// /// ///
/// Mint nft using crossmint api
/// /// /// /// /// ///

import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.apiKey;
const chain = process.env.chain;
const env = process.env.env;
const collectionId = process.env.collectionId;
const recipientEmail = process.env.recipientEmail;
const recipientAddress = `email:${recipientEmail}:${chain}`;

export const nftMint = async (req, res) => {
  try {
    const {title, description, category, tags, duration} = req.body;

    const url = `https://${env}.crossmint.com/api/2022-06-09/collections/${collectionId}/nfts`;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        recipient: recipientAddress,
        metadata: {
          name: title,
          image: "https://bafkreiexjl6kw4khdxkrt6dojgacscnzvrys47t472l2t7d6r2ss65kifq.ipfs.nftstorage.link/",
          description: description,
          attributes: [
            {
              "trait_type" : "category",
              "value" : category,
            },
            {
              "trait_type" : "tags",
              "value" : tags,
            },
            {
              "trait_type" : "duration",
              "value" : duration,
            },
          ],
        },
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("error:" + err));
    res.status(200).json({ message: "Minted nft successful.", path: "uploaded_file_path" });
  } catch (error) {
    res.status(500).json({ message: "Nft mint failed.", error});
  }
};
