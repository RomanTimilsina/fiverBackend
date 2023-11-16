import axios from "axios";
import newRequest from "./newRequest";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);

  try {
    // data.append('userInfo', JSON.stringify(userInfo));

    await axios.post(
      "http://localhost:8800/upload",
      data,
      {
        headers: {
          'Content-Type':'multipart/form-data',
        }
      }
    )

  } catch (err) {
    console.log(err)
  }
}

export default upload;