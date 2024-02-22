import {API_KEY, NET_ENV} from '../constant.js';

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

export const nftMint = async (req, res) => {
  try {
    const {title, description, category, tags, duration} = req.body;
    const collection_id = 'be12b4b4-9c6f-42c2-ad57-6df8fa67c173';
    const chain = 'polygon';
    // recipient address format for our website: <chain>:<address>
    const recipient_address = `${chain}:0x7a228ec130865d0c064005887B0227a83776F403`;
    const url = `https://${NET_ENV}.crossmint.com/api/2022-06-09/collections/${collection_id}/nfts`;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        recipient: recipient_address,
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
