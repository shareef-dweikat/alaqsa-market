import firebase from '../../config/firebase';

const uploadSlideAPI = async (categoryName, uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase.storage().ref(`/slides/`).child(categoryName);

  return ref.put(blob);
};

const addSlide = async (name, desc, url) => {
  return firebase
    .database()
    .ref('slider/home-slide')
    .set({
      slide_name: name,
      slide_desc: desc,
      image: url,
    })
    .catch((e) => console.log('createCategoryAPI', e));
};

export function uploadSlide(name, desc, image) {
  return (dispatch) => {
    dispatch({
      type: 'SLIDE_ADDED',
      // payload: TOKEN,
    });
    uploadSlideAPI(name, image).then(async (snapshot) => {
      let url = await snapshot.ref.getDownloadURL();
      addSlide(name, desc, url).then(() => {
        dispatch({
          type: 'SLIDE_ADDED_SUCCESS',
          payload: url,
        });
      });
    });
  };
}

export function fetchSlideImage() {
  return (dispatch) => {
    firebase
      .database()
      .ref('slider/home-slide/')
      .once('value', function (data) {
        let myImage = data.val().image;
        let desc = data.val().slide_desc
        dispatch({
          type: 'FETCH_SLIDE_IMAGE',
          payload: {myImage,desc},
        });
      })
      .catch((e) => console.log(e, 'errrrrr'));
  };
}
