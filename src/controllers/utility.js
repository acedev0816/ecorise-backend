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
/////////////////////////
// nft mint
/////////////////////////
export const mintnft = async (req, res)=>{
  const {media_file, title, description, category, tags, duration, chain} = req.body;
  const apiKey        = process.env.API_KEY;
  const is_compressed = true, is_reuploadLinkedFiles = true; // true, false available
  const animation_url = '', trait_type = 'trait_type', attr_value = 'attr_test';
  const display_type  = 'boost_number'; // boost_number, boost_percentage, number string available
  const url           = `https://${process.env.PLATFORM}.crossmint.com/api/2022-06-09/collections/${process.env.COLLECTION_ID}/nfts`;
  const recipient     = `email:${process.env.RECIPIENT_EMAIL}:${chain}`;
  const options = {
    method: 'POST',
    headers: {'X-API-KEY': apiKey, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      compressed: is_compressed,
      metadata: {
        animation_url: animation_url,
        attributes: [
          {
            display_type: display_type, trait_type: trait_type, value: attr_value, category: category, tags: tags, duration: duration
          }
        ],
        description: description,
        image: media_file,
        name: title
      },
      recipient: recipient,
      reuploadLinkedFiles: is_reuploadLinkedFiles
    }),
  };
  fetch(url, options)
    .then(response => response.json())
    .then(response => {mintStatus(apiKey, process.env.PLATFORM, response.actionId)})
    .catch(err => console.error(err));
}
function mintStatus(apiKey, env, actionId){
  const url = `https://${env}.crossmint.com/api/2022-06-09/actions/${actionId}`;
  const options = {
    method: "GET",
    headers: { "X-API-KEY": apiKey },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
export const mintnftwithID = async (req, res)=>{
  const {media_file, title, description, category, tags, duration, chain} = req.body;
  const apiKey        = process.env.API_KEY;
  const is_compressed = true, is_reuploadLinkedFiles = true; // true, false available
  const animation_url = '', trait_type = 'trait_type', attr_value = 'attr_test';
  const display_type  = 'boost_number'; // boost_number, boost_percentage, number string available
  const idempotencyKey = '';
  const url           = `https://${process.env.PLATFORM}.crossmint.com/api/2022-06-09/collections/${process.env.COLLECTION_ID}/nfts/${idempotencyKey}`;
  const recipient     = `email:${process.env.RECIPIENT_EMAIL}:${chain}`;
  const options = {
    method: 'POST',
    headers: {'X-API-KEY': apiKey, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      compressed: is_compressed,
      metadata: {
        animation_url: animation_url,
        attributes: [
          {
            display_type: display_type,
            trait_type: trait_type,
            value: attr_value,
            category: category,
            tags: tags,
            duration: duration
          }
        ],
        description: description,
        image: media_file,
        name: title
      },
      recipient: recipient,
      reuploadLinkedFiles: is_reuploadLinkedFiles
    }),
  };
  fetch(url, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

export const editNFT = async (req, rest)=>{
  const {media_file, title, description, action_id, is_reuploadLinkedFiles} = req.body;
  const animation_url = '';
  const display_type = 'boost_number', trait_type = 'trait_type', attr_value = 'attr_test';

  const options = {
    method: 'PATCH',
    headers: {'X-API-KEY': process.env.API_KEY, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      metadata: {
        animation_url: animation_url,
        attributes:[
          {
            display_type: display_type, trait_type: trait_type, value: attr_value, category: category, tags: tags, duration: duration
          }
        ],
        description: description,
        image: media_file,
        name: title
      },
      reuploadLinkedFiles:is_reuploadLinkedFiles
    }),
  };
  
  fetch(`https://${process.env.PLATFORM}.crossmint.com/api/2022-06-09/collections/${process.env.COLLECTION_ID}/nfts/${action_id}`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}