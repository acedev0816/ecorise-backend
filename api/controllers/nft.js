import {
  API_KEY,
  ENVIRONMENT,
  NET_ENV,
  POLYGON_COLLECTION_ID,
} from "../constant.js";
import { CHAIN, RECIPIENT_TYPE } from "../types.js";
import axios from "axios";
/// /// /// /// /// ///
/// Upload file to $root/uploads folder
/// /// /// /// /// ///
const DEFAULT_IMAGE_URL =
  "https://bafkreiexjl6kw4khdxkrt6dojgacscnzvrys47t472l2t7d6r2ss65kifq.ipfs.nftstorage.link/";

export const upload = async (req, res) => {
  try {
    console.log("upload start");
    const protocol = ENVIRONMENT === "develop" ? "http" : "https";
    var full_url = protocol + "://" + req.get("host");
    console.log("2", req.file);
    const file_name = req.file.filename;
    console.log("1", req.file);
    // console.log("req.file", req.file);
    const image_url = `${full_url}/uploads/${file_name}`;
    // console.log("req.body", req.body);
    console.log("image_url", image_url);

    res
      .status(200)
      .json({ message: "Upload file successful.", data: image_url });
  } catch (error) {
    res.status(500).json({ message: "Upload file failed.", error });
  }
};

export const mint = async (req, res) => {
  try {
    const { title, description, category, tags, duration, recipient, img } =
      req.body;
    /// /// /// /// /// /// /// /// /// /// ///
    /// Calculate image path
    /// /// /// /// /// /// /// /// /// /// ///

    const image = ENVIRONMENT === "develop" ? DEFAULT_IMAGE_URL : img;

    /// /// /// /// /// /// /// /// /// /// ///
    /// Call crossMint
    /// /// /// /// /// /// /// /// /// /// ///

    console.log("recipient", recipient);
    const ret = await crossMint(
      CHAIN.POLYGON,
      RECIPIENT_TYPE.WALLET,
      recipient,
      title,
      description,
      category,
      tags,
      duration,
      image
    );
    ret.image_url = image;
    res.status(200).json({ message: "Mint nft successful.", data: ret });
  } catch (error) {
    res.status(500).json({ message: "Mint nft failed.", error });
  }
};

/// /// /// /// /// /// /// /// /// ///
/// Mint nft using crossmint api
/// /// /// /// /// /// /// /// /// ///
export const status = async (req, res) => {
  try {
    const collection_id = POLYGON_COLLECTION_ID;
    const { id } = req.query;
    console.log("status api: id", id);
    const ret = await nftStatus(id);
    res.status(200).json({ message: "Get status successful.", data: ret });
  } catch (error) {
    res.status(500).json({ message: "Get status of nft failed.", error });
  }
};

/// /// /// /// /// /// /// /// /// ///
/// Mint nft using crossmint api
/// /// /// /// /// /// /// /// /// ///
const crossMint = async (
  chain,
  recipient_type,
  recipient,
  title,
  description,
  category,
  tags,
  duration,
  image
) => {
  const collection_id = POLYGON_COLLECTION_ID;
  // recipient address format for our website: <chain>:<address>
  const recipient_address = `${chain}:${recipient}`;
  const url = `https://${NET_ENV}.crossmint.com/api/2022-06-09/collections/${collection_id}/nfts`;

  const params = {
    recipient: recipient_address,
    metadata: {
      name: title,
      image,
      description: description,
      attributes: [
        {
          trait_type: "category",
          value: category,
        },
        {
          trait_type: "tags",
          value: tags,
        },
        {
          trait_type: "duration",
          value: duration,
        },
      ],
    },
  };

  // const options = {
  //   method: "POST",
  //   headers: {
  // accept: "application/json",
  // "content-type": "application/json",
  // "x-api-key": API_KEY,
  //   },
  //   body: JSON.stringify(params),
  // };
  try {
    const ret = await axios.post(url, params, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
    });
    console.log("crossMint ret", ret.data);
    return ret.data;
  } catch (error) {
    console.log("crossMint error", error);
    return null;
  }
};

/// /// /// /// /// /// /// ///
/// get nft status
/// /// /// /// /// /// /// ///
const nftStatus = async (id) => {
  const collection_id = POLYGON_COLLECTION_ID;
  const url = `https://${NET_ENV}.crossmint.com/api/2022-06-09/collections/${collection_id}/nfts/${id}`;
  const options = {
    method: "GET",
  };

  try {
    const ret = await axios.get(url, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    console.log("nftStatus ret", ret.data);
    return ret.data;
  } catch (error) {
    console.log("nftStatus error", error);
    return null;
  }
};
// nftStatus("309dbcdd-e5ac-43c7-86a4-12c81c98f03e");
