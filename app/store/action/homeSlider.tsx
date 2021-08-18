import firebase from '../../config/firebase';
import Alert from '../../screens/Alert';

const uploadSlideAPI = async (categoryName, uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase.storage().ref(`/slides/`).child(categoryName);

  return ref.put(blob);
};

const changeSlide = async (name, desc, url,imageId) => {
  return firebase
    .database()
    .ref(`slider/home-slide/${imageId}`)
    .set({
      slide_name: name,
      slide_desc: desc,
      image: url,
    })
    .catch((e) => console.log('createCategoryAPI', e));
};

export function uploadSlide(name, desc, image, imageId) {
  return (dispatch) => {
    uploadSlideAPI(name, image).then(async (snapshot) => {
      let url = await snapshot.ref.getDownloadURL();
      changeSlide(name, desc, url,imageId).then(() => {
        alert('تم')

      });
    });
  };
}
export function changeImage(slides,image, uri) {
  return (dispatch) => {
    dispatch(uploadSlide(image.slide_name, image.slide_desc, uri, image.imageId))
  };
}
export function fetchSlideImage() {
  return (dispatch) => {
    firebase
      .database()
      .ref('slider/home-slide/')
      .once('value', function (data) {
        const tempSlides = data.val();
        const slides = []
        for(let slideIndex in tempSlides) {
          if(slideIndex !== 'image' && slideIndex !== 'slide_desc' && slideIndex !== 'slide_name')
            slides.push({imageId:slideIndex ,...tempSlides[slideIndex]})
        }
        // let myImage = data.val().image;
        // let desc = data.val().slide_desc
        dispatch({
          type: 'FETCH_SLIDE_IMAGES',
          payload: slides,
        });
      })
      .catch((e) => console.log(e, 'errrrrr'));
  };
}

export const deleteAPI = async (imageId) => {
  return firebase
    .database()
    .ref(`slider/home-slide/${imageId}`)
    .set({
      slide_desc: '',
      image: '',
      slide_name: 'homeSlider1',
    })
    .catch((e) => console.log('createCategoryAPI', e));
};

export function deleteSlide(imageId) {
  return (dispatch) => {
    deleteAPI(imageId).then(()=> {
      alert('تم الحذف')
      dispatch({
        type: 'SLIDE_DELETED',
      });
    })
  };
}