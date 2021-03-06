export let MY_ID = localStorage.getItem("my_id");

// LOGGIN PAGE FUNCTION
export const getProfilesLoggin = async (user, callback) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/loggin/${user ? user.userEmail : ""}`);
    const data = await response.json();
    window.localStorage.setItem('my_id', data[0]._id);
    callback(data[0]._id);
  } catch (error) {
    console.log(error);
  }
};

export const getLoggedUser = async (id) => {
  // (4) THIS MUST FIRE ON EVERY REFRESH OF APP.JS!
  try {
    MY_ID = id;
  } catch (err) {
    console.log(err);
  }
};

/* export const postLoggedUser = async (id) => {
  // (3) THIS IS FIRED WHEN WE SUBMIT LOGIN FORM
  try {
    await fetch(`${process.env.REACT_APP_BE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: id }),
    });

    MY_ID = id;
    console.log("SUCCESSFULLY POSTED IDENTIFIER==>", id);
    console.log("MY_ID==>", MY_ID);
    // THIS WORKS NOW BUT ON REFRESH IT IS LOST, SO WE NEED TO PERFORM A GET AT "/SIGNIN" AT APP.JS. MY_ID WILL EQUAL TO WHATEVER ID RESULTS FROM GET SIGNIN
  } catch (error) {
    console.log(error);
  }
}; */


// Profiles functions
export const getProfiles = async (callback) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/profile`);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const getProfileById = async (id, callback, isMe) => {
  try {
    const pageId = isMe ? window.localStorage.getItem("my_id") : id;
    const response = await fetch(
    `${process.env.REACT_APP_BE_URL}/profile/${pageId}`);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (payload, pictureFile = null) => {
  try {
    await fetch(`${process.env.REACT_APP_BE_URL}/profile/${window.localStorage.getItem("my_id")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });
    if (pictureFile) {
      const imgResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/profile/${window.localStorage.getItem("my_id")}/picture`,

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

export const addExperience = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/profile/${window.localStorage.getItem("my_id")}/experiences`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const addEducation = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/profile/${window.localStorage.getItem("my_id")}/education`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      `${process.env.REACT_APP_BE_URL}/profile/${window.localStorage.getItem("my_id")}/experiences/${experienceId}`,
      {
        method: experienceId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();

    if (pictureFile) {
      const imgResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/profile/${window.localStorage.getItem("my_id")}/experiences/${data._id}/picture`,
        {
          method: "POST",
          body: pictureFile,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const addEditEducation= async (
  educationId = "",
  payload,
  pictureFile = null
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/profile/${window.localStorage.getItem("my_id")}/education/${educationId}`,
      {
        method: educationId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();

    if (pictureFile) {
      const imgResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/profile/${window.localStorage.getItem("my_id")}/education/${data._id}/picture`,
        {
          method: "POST",
          body: pictureFile,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getExperiencesById = async (id, callback) => {
  const userId = id === "me" ? window.localStorage.getItem("my_id") : id;
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

export const getEducationById = async (id, callback) => {
  const userId = id === "me" ? window.localStorage.getItem("my_id") : id;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/profile/${userId}/education`,
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
      `${process.env.REACT_APP_BE_URL}/profile/${window.localStorage.getItem("my_id")}/experiences/${experienceId}`,
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

export const deleteEducation = async (educationId) => {
  try {
    await fetch(
      `${process.env.REACT_APP_BE_URL}/profile/${window.localStorage.getItem("my_id")}/education/${educationId}`,
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
