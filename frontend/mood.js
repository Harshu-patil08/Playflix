// const video = document.getElementById('video');
// const moodBox = document.getElementById('moodBox');

// async function startCamera() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: { facingMode: 'user' } // 'user' selects the front camera
//     });
//     video.srcObject = stream;
//   } catch (error) {
//     console.error('Error accessing the webcam:', error);
//     moodBox.innerHTML = `<span>Camera not accessible 😞</span>`;
//     moodBox.style.color = '#ccc';
//   }
// }

// async function loadModels() {
//   const modelURL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
//   await faceapi.nets.tinyFaceDetector.loadFromUri(modelURL);
//   await faceapi.nets.faceExpressionNet.loadFromUri(modelURL);
// }

// function moodColor(mood) {
//   switch (mood) {
//     case 'happy': return '#6EF542';
//     case 'sad': return '#5DCEFF';
//     case 'angry': return '#FF3E3E';
//     case 'surprised': return '#FFB340';
//     case 'neutral': return '#E0E0E0';
//     case 'fearful': return '#C96AFF';
//     case 'disgusted': return '#C8A220';
//     default: return '#A0A0A0';
//   }
// }

// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video);
//   document.querySelector('.video-wrapper').append(canvas);

//   const displaySize = {
//     width: video.videoWidth,
//     height: video.videoHeight
//   };
//   canvas.width = displaySize.width;
//   canvas.height = displaySize.height;
//   faceapi.matchDimensions(canvas, displaySize);

//   setInterval(async () => {
//     const detections = await faceapi
//       .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//       .withFaceExpressions();

//     const resized = faceapi.resizeResults(detections, displaySize);

//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//     faceapi.draw.drawDetections(canvas, resized);

//     if (detections.length > 0) {
//       const expressions = detections[0].expressions;
//       const mood = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0][0];
//       moodBox.innerHTML = `<span>Your mood: ${mood}</span>`;
//       moodBox.style.color = moodColor(mood);
//     } else {
//       moodBox.innerHTML = `<span>No face detected 😢</span>`;
//       moodBox.style.color = '#ccc';
//     }
//   }, 1000);
// });

// (async () => {
//   await loadModels();
//   await startCamera();
// })();


const video = document.getElementById('video');
const moodBox = document.getElementById('moodBox');

let moodDetected = false; // To prevent repeated redirects

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' }
    });
    video.srcObject = stream;
  } catch (error) {
    console.error('Error accessing the webcam:', error);
    moodBox.innerHTML = `<span>Camera not accessible 😞</span>`;
    moodBox.style.color = '#ccc';
  }
}

async function loadModels() {
  const modelURL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
  await faceapi.nets.tinyFaceDetector.loadFromUri(modelURL);
  await faceapi.nets.faceExpressionNet.loadFromUri(modelURL);
}

function moodColor(mood) {
  switch (mood) {
    case 'happy': return '#6EF542';
    case 'sad': return '#5DCEFF';
    case 'angry': return '#FF3E3E';
    case 'surprised': return '#FFB340';
    case 'neutral': return '#E0E0E0';
    case 'fearful': return '#C96AFF';
    case 'disgusted': return '#C8A220';
    default: return '#A0A0A0';
  }
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.querySelector('.video-wrapper').append(canvas);

  const displaySize = {
    width: video.videoWidth,
    height: video.videoHeight
  };
  canvas.width = displaySize.width;
  canvas.height = displaySize.height;
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    const resized = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resized);

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const mood = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0][0];
      moodBox.innerHTML = `<span>Your mood: ${mood}</span>`;
      moodBox.style.color = moodColor(mood);

      if (!moodDetected) {
        localStorage.setItem('userMood', mood); // Save mood
        moodDetected = true;

        setTimeout(() => {
          window.location.href = 'content.html'; // Redirect after 1s
        }, 1000);
      }
    } else {
      moodBox.innerHTML = `<span>No face detected 😢</span>`;
      moodBox.style.color = '#ccc';
    }
  }, 1000);
});

(async () => {
  await loadModels();
  await startCamera();
})();
