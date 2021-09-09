export let MY_ID;

export const getLoggedUser = async () => {
  try {
  } catch (err) {
    console.log(err);
  }
};

export const postLoggedUser = async (id) => {
  try {
    const resp = await fetch(`${process.env.REACT_APP_BE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: id }),
    });
    console.log(id);
    if (resp.ok) {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/signin`);
      const data = response.json();
      const userId = data;
      MY_ID = userId;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProfilesLoggin = async (user, callback) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/loggin/${user ? user.userEmail : ""}`,
      {
        // headers: {
        //   Authorization: `Bearer ${TOKEN}`,
        // },
      }
    );
    const data = await response.json();
    // callback(data);
    const [userData] = data;
    callback(userData._id);

    // console.log(MY_ID);
  } catch (error) {
    console.log(error);
  }
  // console.log(MY_ID);
};

// Profiles functions
export const getProfiles = async (callback) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/profile`);
    console.log("get profiles response ->", response);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const getProfileById = async (id, callback) => {
  try {
    const pageId = id === "me" ? MY_ID : id;
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/profile/${pageId}`,
      {
        // headers: {
        //   Authorization: `Bearer ${TOKEN}`,
        // },
      }
    );
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (payload, pictureFile = null) => {
  try {
    await fetch(`${process.env.REACT_APP_BE_URL}/profile/${MY_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });
    if (pictureFile) {
      const imgResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/profile/${MY_ID}/picture`,

        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          //   Authorization: `Bearer ${TOKEN}`,
          // },
          body: pictureFile,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

// Experiences functions
export const addExperience = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/profile/${MY_ID}/experiences`,
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${TOKEN}`,
        // },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const addEditExperience = async (
  experienceId = "",
  payload,
  pictureFile = null
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/profile/${MY_ID}/experiences/${experienceId}`,
      {
        method: experienceId ? "PUT" : "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${TOKEN}`,
        // },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();

    if (pictureFile) {
      const imgResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/profile/${MY_ID}/experiences/${data._id}/picture`,
        {
          method: "POST",
          // headers: {
          //   Authorization: `Bearer ${TOKEN}`,
          // },
          body: pictureFile,
        }
      );
      console.log(imgResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getExperiencesById = async (id, callback) => {
  const userId = id === "me" ? MY_ID : id;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/profile/${userId}/experiences`,
      {
        // headers: {
        //   Authorization: `Bearer ${TOKEN}`,
        // },
      }
    );
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteExperience = async (experienceId) => {
  try {
    await fetch(
      `${process.env.REACT_APP_BE_URL}/profile/${MY_ID}/experiences/${experienceId}`,
      {
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${TOKEN}`,
        // },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Posts functions
export const addPost = async (textPayload, imgPayload = null, userId) => {
  try {
    const text = textPayload;
    const textResponse = await fetch(`${process.env.REACT_APP_BE_URL}/posts`, {
      method: "POST",
      body: JSON.stringify({
        ...text,
        user: userId,
      }),
      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data = await textResponse.json();
    const id = data._id;
    if (imgPayload) {
      const imgResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/${id}`,
        {
          method: "POST",
          // headers: {
          //   Authorization: `Bearer ${TOKEN}`,
          // },
          body: imgPayload,
        }
      );
      console.log(imgResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (callback) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/posts`, {
      // headers: {
      //   Authorization: `Bearer ${TOKEN}`,
      // },
    });
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId, callback) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/posts/${postId}`,
      {
        // headers: {
        //   Authorization: `Bearer ${TOKEN}`,
        // },
      }
    );
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};
export const editPost = async (postId, payload, imgFile = null) => {
  try {
    await fetch(`${process.env.REACT_APP_BE_URL}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });
    if (imgFile) {
      const imgResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/${postId}`,
        {
          method: "POST",
          // headers: {
          //   Authorization: `Bearer ${TOKEN}`,
          // },
          body: imgFile,
        }
      );
      console.log(imgResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId) => {
  try {
    await fetch(`${process.env.REACT_APP_BE_URL}/posts/${postId}`, {
      method: "DELETE",
      // headers: {
      //   Authorization: `Bearer ${TOKEN}`,
      // },
    });
  } catch (error) {
    console.log(error);
  }
};
