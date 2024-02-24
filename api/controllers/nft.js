import {API_KEY, ENVIRONMENT, NET_ENV, POLYGON_COLLECTION_ID} from '../constant.js';

// example: public\\uploads\\1708716266555-1.jpg
const normalizePath = (path) => {
  let l = path.split("\\");
  if (l.length == 1) 
    l = path.split("/");  
  return l[l.length-1];
}

/// /// /// /// /// ///
/// Upload file to $root/uploads folder
/// /// /// /// /// ///
const DEFAULT_IMAGE_URL = "https://bafkreiexjl6kw4khdxkrt6dojgacscnzvrys47t472l2t7d6r2ss65kifq.ipfs.nftstorage.link/";

export const mint = async (req, res) => {
  try {
    var full_url = req.protocol + '://' + req.get('host');
    console.log("req: fullUrl", full_url);

    const file_name = req.file.filename;
    console.log("req.file", req.file);
    const image_url = `${full_url}/uploads/${file_name}`;
    console.log("req.body", req.body);

    console.log("image_url", image_url);
    const {title, description, category, tags, duration} = req.body;
    const image = ENVIRONMENT === "develop" ? DEFAULT_IMAGE_URL: image_url;
    const ret = await crossMint(title, description, category, tags, duration, image);
    
    console.log("mint nft response:", ret);

    res.status(200).json({ message: "Upload file successful.", path: image_url });
  } catch (error) {
    
    res.status(500).json({ message: "Upload file failed.", error});
  }
};


/// /// /// /// /// ///s
/// Mint nft using crossmint api
/// /// /// /// /// ///

const crossMint = async (title, description, category, tags, duration, image) => {
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
          image,
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
