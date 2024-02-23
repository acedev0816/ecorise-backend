import {API_KEY, NET_ENV, POLYGON_COLLECTION_ID} from '../constant.js';

/// /// /// /// /// ///
/// Upload file to $root/uploads folder
/// /// /// /// /// ///

export const mint = async (req, res) => {
  try {
    const dest_path = req.file.path;
    console.log("req", req.body);

    const {title, description, category, tags, duration} = req.body;
    const ret = await crossMint(title, description, category, tags, duration);
    
    console.log("mint nft response:", ret);

    res.status(200).json({ message: "Upload file successful.", path: dest_path });
  } catch (error) {
    
    res.status(500).json({ message: "Upload file failed.", error});
  }
};


/// /// /// /// /// ///s
/// Mint nft using crossmint api
/// /// /// /// /// ///

const crossMint = async (title, description, category, tags, duration) => {
    const collection_id = POLYGON_COLLECTION_ID;
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
      .then((json) => {
        console.log("res:", json);
        return true;
      })
      .catch((err) => {
        console.error("error:", err);
        return false;
      });
    return true;
};
