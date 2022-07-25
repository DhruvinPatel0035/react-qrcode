import cv from "opencv.js";

//Mat previewResizedThresholdImage, testWarpImage;

let previewResizedThresholdImage = new cv.Mat();
let testWarpImage = new cv.Mat();

let diffCount = 0;
let qrArea = 0;

// double* approxArrayTemp[4];
let approxArrayTemp = [];

let isValidTag = false;

//vector<Point2f>barcodeCornerPoints;
let barcodeCornerPoints = [];

//Rect rectROI;

let image_name = "";

let rectangleCh = true;

//Mat roiCropped;
let roiCropped = new cv.Mat();

let isTemplate = false;

//static vector<KeyPoint> keypoints_template_kaze_tag;
const keypoints_template_kaze_tag = [];

//static Mat descriptors_template_kaze_tag;
const descriptors_template_kaze_tag = 0;

let returnValues = "";

//struct timeval tp;

// bool getTagPoints(const Mat& Image, double* cornerPoints[4],vector<Point2f>barcodeCornerPoints,int totalArea,bool readByMlKit,Mat& croppedImgToDisplay);
// const getTagPoints(image='', cornerPoints[4]=0,  barcodeCornerPoints =[], totalArea =0, readByMlKit =false, croppedImgToDisplay ='');

// void cornerDetection(const Mat& Image, double* cornerPoints[4], int threshold, int totalArea,vector<Point2f>barcodeCornerPoints,bool readByMlKit,Mat& croppedImgToDisplay);
// const cornerDetection(image = '', cornerPoints[4]=0, threshold=0, totalArea=0,  barcodeCornerPoints =[], readByMlKit = false,  croppedImgToDisplay='');

// int* getPointsInOrder(int* index, vector<cv::Point> cornerPoints);
// const getPointsInOrder(index =0, cornerPoints=[]);

// bool findNearestPoint(double cornerPoints[], int radius);
// const findNearestPoint(cornerPoints=[], radius=0);

// Rect ROIwrtQR(Mat graySmallImage, vector<Point2f>qrPointsTemp,bool readByMlKit);
// const ROIwrtQR(graySmallImage =0, qrPointsTemp=[], readByMlKit=false);

// void template_matching(Mat &app_img,double* cornerPoints[4],int totalArea,vector<KeyPoint> keypoints_template_kaze_tag,Mat descriptors_template_kaze_tag);
// const template_matching=(app_img='', cornerPoints=[], totalArea =0, keypoints_template_kaze_tag=[],descriptors_template_kaze_tag=0)=>{}

const setDiffCount = (diffCount = 0) => {
  diffCount = diffCount;
};

//bool crop(Mat& src,vector<Point2f>barcodeCornerPoints ,int areaImage,bool readByMlKit,Mat& croppedImgToDisplay,std::string* name,long* contourTime,long* templateTime) {
export const crop = (
  src = "",
  barcodeCornerPoints = [],
  areaImage = 0,
  readByMlKit = false,
  croppedImgToDisplay = 0,
  name = "",
  contourTime = 0,
  templateTime = 0
) => {
  isTemplate = false;
  //	bool contourFailed = false;
  let contourFailed = false;
  returnValues = "";

  //	vector<vector<Point>> contoursPent, approxNormal;
  let contoursPent = [];
  let approxNormal = [];

  //	vector<cv::String> fn;
  let fn = [];

  //    Mat image=src;
  //	cv::Mat image = src.clone();
  // 	let image = src.clone();
  let image = src.clone();
  //	double* cornerPoints[4];
  let cornerPoints = [];
  for (let i1 = 0; i1 < 4; i1++) {
    cornerPoints[i1] = [[], []];
  }
  cornerPoints[0][0] = 0;
  cornerPoints[0][1] = 0;
  cornerPoints[1][0] = 0;
  cornerPoints[1][1] = 0;

  for (let i = 0; i < 4; ++i) {
    approxArrayTemp[i] = [[], []];
  }
  console.log("cornerPoints  -.1", cornerPoints);
  // Image processing
  //  auto start = high_resolution_clock::now();
  let start = Date.now();

  // getTagPoints(image, cornerPoints,barcodeCornerPoints,areaImage,readByMlKit,croppedImgToDisplay);

  //  auto stop = high_resolution_clock::now();
  let stop = Date.now();

  //    auto duration = duration_cast<milliseconds>(stop - start);
  let duration = stop - start;

  //    long val1 = duration.count();
  let val1 = duration.count();
  console.log("val1 ==.", val1);
  // *contourTime = val1;
  contourTime = val1;

  //	imwrite("/storage/emulated/0/Android/media/com.transpacks.Checko1/Frames/ROI"+to_string(rand())+".png",roiCropped);
  console.log("cornerDetction call end ===>", roiCropped);
  for (let k = 0; k < 4; k++) {
    console.log(cornerPoints[k][0], "---", cornerPoints[k][1]);
  }

  if (
    cornerPoints[0] === null ||
    cornerPoints[0][0] === 0 ||
    cornerPoints[0][0] === 1
  ) {
    console.log("Corners not detected ===>");

    // start = high_resolution_clock::now();
    start = Date.now();

    //  template_matching(roiCropped  , cornerPoints,areaImage,keypoints_template_kaze_tag,descriptors_template_kaze_tag);
    image.release();

    // stop = high_resolution_clock::now();
    stop = Date.now();

    // duration = duration_cast<milliseconds>(stop - start);
    duration = stop - start;

    // val1 = duration.count();
    val1 = duration.count();

    // *templateTime = val1;
    templateTime = val1;
    contourFailed = true;
    isTemplate = true;

    if (
      cornerPoints[0] === null ||
      cornerPoints[0][0] === 0 ||
      cornerPoints[0][1] === 0
    ) {
      return false;
    }
  } else {
    // *templateTime = 0L;
    templateTime = 0;
  }

  console.log(
    "corner points ===>",
    cornerPoints[0][0],
    "-",
    cornerPoints[0][1],
    "-",
    cornerPoints[3][0],
    "-",
    cornerPoints[3][1]
  );

  const disX = 360;
  const disY = 200;
  let wD1 = (86 * disX) / 100;
  let wD2 = (72 * disY) / 100;
  wD2 = disY; //266;
  wD1 = disX; //658;

  //	vector<Point2f> points1, points2;
  let points1 = [];
  let points2 = [];

  for (let i = 0; i < 4; i++) {
    // points1.push_back(Point2f(cornerPoints[i][0], cornerPoints[i][1]));
    // points1.push();
  }

  // points2.push_back(Point2f(0, 0));
  // points2.push_back(Point2f(disX, 0));
  // points2.push_back(Point2f(disX, disY));
  // points2.push_back(Point2f(0, disY));
  // points2.push();
  // points2.push();
  // points2.push();
  // points2.push();

  image = src.clone();
  if (image.channels() === 3)
    if (isTemplate) {
      cv.cvtColor(image, image, cv.COLOR_BGR2GRAY);
      let istemp = isTemplate;
      image = roiCropped;
    }

  console.log("ROTPainted =====>", image);

  returnValues +=
    "#" +
    cornerPoints[0][0] +
    "-" +
    cornerPoints[0][1] +
    "-" +
    cornerPoints[1][0] +
    "-" +
    cornerPoints[1][1] +
    "-" +
    cornerPoints[2][0] +
    "-" +
    cornerPoints[2][1] +
    "-" +
    cornerPoints[3][0] +
    "-" +
    cornerPoints[3][1];

  if (contourFailed) {
    returnValues += "#1";
  } else {
    returnValues += "#0";
  }

  // *name = returnValues;
  name = returnValues;

  //  Mat h(2, 4, CV_32FC1), warped_image;
  //  h = Mat::zeros(image.rows, image.cols, image.type());
  //  h = getPerspectiveTransform(points1, points2);

  // warpPerspective(image, warped_image, h, Size(disX, disY));

  //	Mat testWarpImage = warped_image.clone();

  // Setup a rectangle to define your region of interest
  //	cv::Rect cropRect((disX - wD1) / 2, (disY - wD2) / 2, wD1, wD2);

  // Crop the full image to that image contained by the rectangle myROI
  // Note that this doesn't copy the data
  //	cv::Mat croppedRef(warped_image, cropRect);

  //	Mat croppedImage = croppedRef.clone();

  // testWarpImage.copyTo(src);

  // image.release();
  // croppedRef.release();

  return true;
};
