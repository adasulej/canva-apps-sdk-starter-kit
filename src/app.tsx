import React, { useEffect, useState } from "react";
import {
  Alert,
  ArrowRightIcon,
  Box,
  Button,
  ChevronDownIcon,
  FormField,
  Link,
  ReloadIcon,
  SegmentedControl,
  Slider,
  Text,
  Title,
  tokens,
} from "@canva/app-ui-kit";
import { useSelection } from "utils/use_selection_hook";
import { getTemporaryUrl, requestFontSelection,Font } from "@canva/asset";
import * as styles from "styles/components.css";
import * as customStyles from "styles/custom.css";
<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.5.0/fabric.min.js"></script>;

import {
  AltText,
  NativeShapeElement,
  NativeSimpleElementWithBox,
  NativeTextElement,
  NativeTextElementWithBox,
addElementAtPoint,
} from "@canva/design";
import { fabric } from 'fabric';
import { requestOpenExternalUrl } from "@canva/platform";
import { check } from "yargs";
import { svg } from "@cloudinary/url-gen/qualifiers/format";
let imageDataSize;
let distanceRStartHardcodedValue=0.2;
 let rotation=0;
 type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

 class Logger {
     private levels: LogLevel[] = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
     private level: LogLevel;
 
     constructor(level: LogLevel = 'INFO') {
         this.level = level;
     }
 
     public setLevel(level: LogLevel): void {
         if (this.levels.includes(level)) {
             this.level = level;
         } else {
             console.warn(`Invalid log level: ${level}`);
         }
     }
 
     private log(level: LogLevel, ...args: any[]): void {
         if (this.levels.indexOf(level) >= this.levels.indexOf(this.level)) {
             switch (level) {
                 case 'DEBUG':
                     console.debug(...args);
                     break;
                 case 'INFO':
                     console.info(...args);
                     break;
                 case 'WARN':
                     console.warn(...args);
                     break;
                 case 'ERROR':
                     console.error(...args);
                     break;
                 default:
                     console.log(...args);
             }
         }
     }
 
     public debug(...args: any[]): void {
         this.log('DEBUG', ...args);
     }
 
     public info(...args: any[]): void {
         this.log('INFO', ...args);
     }
 
     public warn(...args: any[]): void {
         this.log('WARN', ...args);
     }
 
     public error(...args: any[]): void {
         this.log('ERROR', ...args);
     }
 }
 
 const logger = new Logger('ERROR'); // Set initial log level
export function App() {
  const imageSelection = useSelection("image");
  const textSelection = useSelection("plaintext");
  const [imageSelected, setImageSelected] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState(1); // Default selected pattern to 0
  const [number, setNumber] = useState(0);
  const [angle, setAngle] = useState(0);
  const [columns, setColumns] = useState(2);
  const [rows, setRows] = useState(2);
  const [circleNumber, setCircleNumber] = useState(0);
  const [circleOffsetAngle, setCircleOffsetAngle] = useState(0);
  const [circleRadiusK, setCircleRadiusK] = useState(0);
  const [circleDistanceR, setCircleDistanceR] = useState(0);
  const [distanceR, setDistanceR] = useState(0);
  const [hDistanceR, setHDistanceR] = useState(0);
  const [vDistanceR, setVDistanceR] = useState(0);
  const [hOffsetR, setHOffsetR] = useState(0);
  const [distanceK, setDistanceK] = useState(0);
  const [sizeK, setSizeK] = useState(1);
  const [imageAngle, setImageAngle] = useState(0);
  const [spiralAngleElement, setSpiralAngleElement] = useState(0);
  const [coordinates, setCoordinates] = useState([]);
  const [imageRatio, setImageRatio] = useState(0); // State to store the image width-to-height ratio
  const [hoveredBox, setHoveredBox] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showMoreSliders, setShowMoreSliders] = useState(false);
  const [showMoreButtonClicked, setShowMoreButtonClicked] = useState(false);
  const [oneSelected, setOneSelected] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [totalRotation, setTotalRotation] = useState(0);
  const [imageCoordinates, setImageCoordinates] = useState([]);
  const [dataUrl, setDataUrl] = useState("");
  const [isTextMode, setIsTextMode] = useState(false);
  const [loadingSign, setLoadingSign] = useState(false);
  const [circleSliceAngle, setCircleSliceAngle] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [waveCount, setWaveCount] = useState(0);
  const [waveAmplitude, setWaveAmplitude] = useState(0);
  const [waveLength, setWaveLength] = useState(0);
  const [branchCount, setBranchCount] = useState(0);
  const [branchAngle, setBranchAngle] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [showLimitAlert, setShowLimitAlert] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showAddingLimit, setShowAddingLimit] = useState(false);
  const [showSkewAlert, setShowSkewAlert] = useState(false);
  const [disableAddButton, setDisableAddButton] = useState(false);
  const [disableFromLimit, setDisableFromLimit] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [selectedFont, setSelectedFont] = React.useState<Font | undefined>();
  const [reachedLimit, setReachedLimit] = useState(false);
  const [changedOnce,setChangedOnce]=useState(false);
  const [loading, setLoading] = useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);
  const [svgWidth, setSvgWidth] = useState(0);
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [svgHeight, setSvgHeight] = useState<number | null>(null);
  const [topMargin, setTopMargin] = useState(0);

  // Calculated variables
  let fontResponse;
  let ref;
  let firstImageWidth;

  let firstImageHeight;

  let firstImageSmallestSize; // used by grid patterns only

  let images;
  let firstCircleRadius;

  let runwayLength;
  const maxElementQuantities = 1000;
  const maxElementDataSizes = 30; // MB
  let skewXTan = 0;
  let skewYTan = 0;
  let skewWidthRatio;
  let skewHeightRatio;

  const svgUrl = "http://www.w3.org/2000/svg";
  const canvasWidth = 1000;
  const canvasHeight = 750;
  const canvasUnit = canvasWidth / 100;
  const [count, setCount] = useState(1);

  // useEffect(() => {
  //   if (!oneSelected) {
  //     if (imageSelection.count === 0) {
  //       setCount(count + 1);
  //       setImageSelected(false);
  //       return;
  //     }

  //     if (imageSelection.count > 0) {
  //       async function getDraft() {
  //         const draft = await imageSelection.read();
  //         for (const content of draft.contents) {
  //           const { url } = await getTemporaryUrl({
  //             type: "IMAGE",
  //             ref: content.ref,
  //           });
  //           setImageUrl(url);
  //           setOneSelected(true);
  //           setShowAlert(false);
  //           let dataUrl = await generateDataURL(url);
  //           if (dataUrl) {
  //             setDataUrl(dataUrl.toString());
  //             findImageSizeAndRatio(dataUrl)
  //               .then((size) => {
  //                 setImageRatio(roundIt(size.width / size.height));
  //                 if (dataUrl) {
  //                   imageDataSize = dataUrl.length / 1024 / 1024;
               
               
  //                 }
  //               })
  //               .catch(
                  
  //                 (error) => {console.error("Failed to load image:", error)
  //               setShowErrorAlert(true);
  //               }
  //               );
  //           }
  //         }
  //         setImageSelected(true);
  //       }
  //       getDraft();
    
  //       initiateData();
  //     }
  //   }
  // }, [imageSelection]);

  useEffect(() => {
    if (skewX != 0 || skewY! - 0) {
      setShowSkewAlert(true);
      setImageAngle(0);
    }
  }, [imageAngle]);
  
  useEffect(() => {
    if (imageAngle != 0) {
      setShowSkewAlert(true);
      setSkewX(0);
    }
  }, [skewX]);
  useEffect(() => {
    if (imageAngle != 0) {
      setShowSkewAlert(true);
      setSkewY(0);
    }
  }, [skewY]);

  useEffect(() => {
    if(showSkewAlert){
      if(imageAngle==0&&skewX==0&&skewY==0){
        setShowSkewAlert(false);
      }
    }
  }, [imageAngle,skewX,skewY]);

  const checkSelection = async () => {
    setLoading(true);
    // If no selection is made
    if (!oneSelected) {
      if (textSelection.count === 0 && imageSelection.count === 0) {
       setShowAlert(true);
        setLoading(false);
        return;
      }
  
      // If text is selected
      if (textSelection.count > 0) {

        try {
          const draft = await textSelection.read();
          for (const content of draft.contents) {
            const { text } = content;
            setIsTextMode(true);
            setTextValue(text);
            setOneSelected(true);
            setShowAlert(false);
            setShowText(true);
          }
          setImageSelected(false); // Ensure image selection state is reset
          initiateTextData();
          setLoading(false);
        } catch (error) {
          console.error("Failed to process text selection:", error);
          setShowErrorAlert(true);
        }
        return;
      }
  
      // If image is selected
      if (imageSelection.count > 0) {
        try {
          const draft = await imageSelection.read();
          for (const content of draft.contents) {
            const { url } = await getTemporaryUrl({
              type: "image",
              ref: content.ref,
            });
  
            setImageUrl(url);
            setOneSelected(true);
            setShowAlert(false);
  
            const dataUrl = await generateDataURL(url);
            if (dataUrl) {
              setDataUrl(dataUrl.toString());
              findImageSizeAndRatio(dataUrl)
                .then((size) => {
                  setImageRatio(roundIt(size.width / size.height));
                  imageDataSize = dataUrl.length / 1024 / 1024; // Calculate image size in MB
                })
                .catch((error) => {
                  console.error("Failed to load image:", error);
                  setShowErrorAlert(true);
                });
            }
          }
          setImageSelected(true);
          initiateData();
          setLoading(false);
        } catch (error) {
          console.error("Failed to process image selection:", error);
          setShowErrorAlert(true);
        }
      }
    }
  };
  
  // useEffect(() => {
  //   if (!oneSelected) {
  //     if (textSelection.count === 0) {
  //       setIsTextMode(false);
  //       // setCount(count+1);
  //       return;
  //     }
  //     if (textSelection.count > 0) {
  //       async function getDraft() {
  //         const draft = await textSelection.read();
  //         for (const content of draft.contents) {
  //           const { text } = content;

  //           setIsTextMode(true);
  //           setTextValue(text);
  //           setOneSelected(true);
  //           setShowAlert(false);
  //           setShowText(true);
  //         }
  //       }
  //       getDraft();
  //       setImageSelected(false);
  //       initiateTextData();
  //     }
  //   }
  // }, [textSelection]);

  // useEffect(() => {
  //   if (count > 3) {
  //     setShowAlert(true);
  //   }
  // }, [count]);

  const checkLimit = () => {
    const response = elementLimitsExceeded();

    if(response&&selectedPattern==4&&number==8&&changedOnce==false){
      setNumber(6);
      setChangedOnce(true);
    }
      if (response) {
        setShowAddingLimit(true);
        setDisableFromLimit(true);
      }
      else {
        setShowAddingLimit(false);
        setDisableFromLimit(false);
      }
    };

  useEffect(() => {
   checkLimit();
  }, [number, rows, columns, circleNumber, branchCount, waveCount,circleSliceAngle,selectedPattern]);

  useEffect(() => {
  setChangedOnce(false);

  },[selectedPattern]);
  useEffect(() => {
    if (isTextMode) {
      initiateTextData();
    } else {
      initiateData();
    }
    setShowMoreButtonClicked(false);
    setShowMoreSliders(false);
  }, [selectedPattern]);

  // Call initiateTextRatio() whenever textValue or isTextMode changes
  useEffect(() => {
    if (isTextMode) {
      initiateTextRatio();
      // Call redraw after initiating text ratio
    } else {
      //  initiateImageRatio();
    }
  }, [textValue, isTextMode, imageSelected, imageSelection, selectedPattern]);

  // Call redraw whenever selectedPattern changes
  useEffect(() => {
    redraw();
  }, [
    imageRatio,
    selectedPattern,
    imageSelected,
    number,
    angle,
    distanceR,
    distanceK,
    sizeK,
    imageAngle,
    columns,
    rows,
    hDistanceR,
    vDistanceR,
    hOffsetR,
    circleSliceAngle,
    circleNumber,
    circleDistanceR,
    circleOffsetAngle,
    circleRadiusK,
    spiralAngleElement,
    waveCount,
    waveAmplitude,
    waveLength,
    branchCount,
    branchAngle,
    skewX,
    skewY,
  ]);

  const pattern1ImageSliders1 = [
    {
      label: "Count",
      state: number,
      setState: setNumber,
      min: 3,
      max: 50,
      step: 1,
    },
    {
      label: "Space",
      state: distanceR,
      setState: setDistanceR,
      min: -1,
      max: 1.5,
      step: 0.025,
    },
    {
      label: "Slope",
      state: angle,
      setState: setAngle,
      min: 0,
      max: 90,
      step: 1,
     
    },
  ];
  const pattern1ImageSliders2 = [
    {
      label: "Rotation",
      state: imageAngle,
      setState: setImageAngle,
      min: 0,
      max: 360,
      step: 1,
    },
    {
      label: "Size ratio",
      state: sizeK,
      setState: setSizeK,
      min: 0.3,
      max: 1.5,
      step: 0.025,
    },
    {
      label: "Space ratio",
      state: distanceK,
      setState: setDistanceK,
      min: 1,
      max: 1.4,
      step: 0.025,
    },
    {
      label: "Horizontal skew",
      state: skewX,
      setState: setSkewX,
      min: -50,
      max: 50,
      step: 1,
    },
    {
      label: "Vertical skew",
      state: skewY,
      setState: setSkewY,
      min: -50,
      max: 50,
      step: 1,
    },

  

 
  ];
  const pattern2ImageSliders1 = [
    {
      label: "Columns",
      state: columns,
      setState: setColumns,
      min: 2,
      max: 40,
      step: 1,
    },
    {
      label: "Rows",
      state: rows,
      setState: setRows,
      min: 2,
      max: 40,
      step: 1,
    },
    {
      label: "Horizontal space",
      state: hDistanceR,
      setState: setHDistanceR,
      min: -1,
      max: 1.5,
      step: 0.025,
    },
    {
      label: "Vertical space",
      state: vDistanceR,
      setState: setVDistanceR,
      min: -1,
      max: 1.5,
      step: 0.025,
    },

  ];
  const pattern2ImageSliders2 = [
 
  

    {
      label: "Slide",
      state: hOffsetR,
      setState: setHOffsetR,
      min: 0,
      max: 1,
      step: 0.025,
    },

    {
      label: "Rotation",
      state: imageAngle,
      setState: setImageAngle,
      min: 0,
      max: 360,
      step: 1,
    },
    {
      label: "Horizontal skew",
      state: skewX,
      setState: setSkewX,
      min: -50,
      max: 50,
      step: 1,
    },
    {
      label: "Vertical skew",
      state: skewY,
      setState: setSkewY,
      min: -50,
      max: 50,
      step: 1,
    },
  ];
  const pattern3ImageSliders1 = [
    {
      label: "Count",
      state: number,
      setState: setNumber,
      min: 3,
      max: 50,
      step: 1,
    },
    {
      label: "Slice",
      state: circleSliceAngle,
      setState: setCircleSliceAngle,
      min: 10,
      max: 360,
      step: 10,
    },
    {
      label: "Ring count",
      state: circleNumber,
      setState: setCircleNumber,
      min: 0,
      max: 20,
      step: 1,
    },
    ...(circleNumber > 1
      ? [
          {
            label: "Ring space",
            state: circleDistanceR,
            setState: setCircleDistanceR,
            min: 0.8,
            max: 1.8,
            step: 0.025,
          },
          {
            label: "Ring slide",
            state: circleOffsetAngle,
            setState: setCircleOffsetAngle,
            min: 0,
            max: 45,
            step: 1,
          },
          {
            label: "Radius ratio",
            state: circleRadiusK,
            setState: setCircleRadiusK,
            min: 1,
            max: 1.5,
            step: 0.025,
          },
          {
            label: "Size ratio",
            state: sizeK,
            setState: setSizeK,
            min: 0.3,
            max: 1.5,
            step: 0.025,
          },
        ]
      : []),
    ...(circleNumber > 3
      ? [
          {
            label: "Spiral effect",
            state: spiralAngleElement,
            setState: setSpiralAngleElement,
            min: 0,
            max: 90,
            step: 5,
          },
        ]
      : []),
    {
      label: "Rotation",
      state: imageAngle,
      setState: setImageAngle,
      min: 0,
      max: 360,
      step: 1,
    },
  ];

  const pattern1TextSliders = [
    {
      label: "Count",
      state: number,
      setState: setNumber,
      min: 3,
      max: 50,
      step: 1,
    },
    {
      label: "Space",
      state: distanceR,
      setState: setDistanceR,
      min: -0.95,
      max: 1.1,
      step: 0.025,
    },
    {
      label: "Slope",
      state: angle,
      setState: setAngle,
      min: 0,
      max: 90,
      step: 1,
    },
 
  ];
  const pattern1TextSliders1 = [
    {
      label: "Rotation",
      state: imageAngle,
      setState: setImageAngle,
      min: 0,
      max: 360,
      step: 1,
    },
    {
      label: "Size ratio",
      state: sizeK,
      setState: setSizeK,
      min: 0.3,
      max: 1.5,
      step: 0.025,
    },
    {
      label: "Space ratio",
      state: distanceK,
      setState: setDistanceK,
      min: 1,
      max: 1.4,
      step: 0.025,
    },
 
  ];
  const pattern2TextSliders1 = [
    {
      label: "Columns",
      state: columns,
      setState: setColumns,
      min: 2,
      max: 40,
      step: 1,
    },
    {
      label: "Rows",
      state: rows,
      setState: setRows,
      min: 2,
      max: 40,
      step: 1,
    },
    {
      label: "Horizontal space",
      state: hDistanceR,
      setState: setHDistanceR,
      min: 0.5,
      max: 8,
      step: 0.05,
    },
    {
      label: "Vertical space",
      state: vDistanceR,
      setState: setVDistanceR,
      min: -0.6,
      max: 3,
      step: 0.025,
    },
  ];
  const pattern2TextSliders2 = [
   
    {
      label: "Slide",
      state: hOffsetR,
      setState: setHOffsetR,
      min: 0,
      max: 1,
      step: 0.025,
    },
    {
      label: "Rotation",
      state: imageAngle,
      setState: setImageAngle,
      min: 0,
      max: 360,
      step: 1,
    },
  ];
  const pattern3TextSliders1 = [
    {
      label: "Count",
      state: number,
      setState: setNumber,
      min: 3,
      max: 50,
      step: 1,
    },
    {
      label: "Slice",
      state: circleSliceAngle,
      setState: setCircleSliceAngle,
      min: 30,
      max: 360,
      step: 10,
    },
    {
      label: "Ring count",
      state: circleNumber,
      setState: setCircleNumber,
      min: 0,
      max: 10,
      step: 1,
    },
    ...(circleNumber > 1
      ? [
          {
            label: "Ring space",
            state: circleDistanceR,
            setState: setCircleDistanceR,
            min: 0.2,
            max: 1.8,
            step: 0.025,
          },
          {
            label: "Ring slide",
            state: circleOffsetAngle,
            setState: setCircleOffsetAngle,
            min: 0,
            max: 45,
            step: 1,
          },
          {
            label: "Radius ratio",
            state: circleRadiusK,
            setState: setCircleRadiusK,
            min: 1,
            max: 1.3,
            step: 0.025,
          },
          // {
          //   label: "Size ratio",
          //   state: sizeK,
          //   setState: setSizeK,
          //   min: 0.3,
          //   max: 2,
          //   step: 0.025,
          // },
        ]
      : []),
    ...(circleNumber > 2
      ? [
          {
            label: "Spiral effect",
            state: spiralAngleElement,
            setState: setSpiralAngleElement,
            min: 0,
            max: 90,
            step: 5,
          },
        ]
      : []),
    {
      label: "Rotation",
      state: imageAngle,
      setState: setImageAngle,
      min: 0,
      max: 360,
      step: 1,
    },
  ];
  const pattern4ImageSliders1 = [
    {
      label: "Count",
      state: number,
      setState: setNumber,
      min: 6,
      max: 30,
      step: 1,
    },
    {
      label: "Wave count",
      state: waveCount,
      setState: setWaveCount,
      min: 2,
      max: 10,
      step: 1,
    },
    {
      label: "Amplitude",
      state: waveAmplitude,
      setState: setWaveAmplitude,
      min: 0,
      max: 40,
      step: 1,
    },
    {
      label: "Length",
      state: waveLength,
      setState: setWaveLength,
      min: 20,
      max: 150,
      step: 1,
    },
  ];
  const pattern4ImageSliders2 = [
    {
      label: "Size ratio",
      state: sizeK,
      setState: setSizeK,
      min: 0.3,
      max: 2,
      step: 0.005,
    },

    {
      label: "Rotation",
      state: imageAngle,
      setState: setImageAngle,
      min: 0,
      max: 360,
      step: 1,
    },
    {
      label: "Branch count",
      state: branchCount,
      setState: setBranchCount,
      min: 1,
      max: 10,
      step: 1,
    },
    ...(branchCount > 1
      ? [
          {
            label: "Branch angle",
            state: branchAngle,
            setState: setBranchAngle,
            min: 2,
            max: 45,
            step: 2,
          },
        ]
      : []),
    {
      label: "Horizontal skew",
      state: skewX,
      setState: setSkewX,
      min: -50,
      max: 50,
      step: 1,
    },
    {
      label: "Vertical skew",
      state: skewY,
      setState: setSkewY,
      min: -50,
      max: 50,
      step: 1,
    },

 
   
  ];
  const pattern4TextSliders1 = [
    {
      label: "Count",
      state: number,
      setState: setNumber,
      min: 6,
      max: 20,
      step: 1,
    },
    {
      label: "Wave count",
      state: waveCount,
      setState: setWaveCount,
      min: 2,
      max: 10,
      step: 1,
    },
    {
      label: "Amplitude",
      state: waveAmplitude,
      setState: setWaveAmplitude,
      min: 0,
      max: 40,
      step: 1,
    },
    {
      label: "Length",
      state: waveLength,
      setState: setWaveLength,
      min: 20,
      max: 150,
      step: 2,
    },
  ];
  const pattern4TextSliders2 = [
    {
      label: "Size ratio",
      state: sizeK,
      setState: setSizeK,
      min: 0.3,
      max: 2,
      step: 0.005,
    },
    {
      label: "Rotation",
      state: imageAngle,
      setState: setImageAngle,
      min: 0,
      max: 360,
      step: 1,
    },
    {
      label: "Branch count",
      state: branchCount,
      setState: setBranchCount,
      min: 1,
      max: 10,
      step: 1,
    },
    ...(branchCount > 1
      ? [
          {
            label: "Branch angle",
            state: branchAngle,
            setState: setBranchAngle,
            min: 2,
            max: 45,
            step: 2,
          },
        ]
      : []),
   
 
  ];

  
  useEffect(() => {
    if (circleNumber === 1) {
      if (isTextMode) {
        setCircleDistanceR(1.2);
        setCircleOffsetAngle(0);
        setCircleRadiusK(1);
        setSizeK(1);
        setSpiralAngleElement(0);
      } else {
        setSizeK(1);
        setCircleRadiusK(1);
        setCircleOffsetAngle(0);
        setSpiralAngleElement(0);
        setCircleDistanceR(1.2);
      }
    }
  }, [circleNumber]);
  const handleShowMoreSliders = () => {
    setShowMoreSliders(true);
    setShowMoreButtonClicked(true);
  };

  function isSkewed() {
    return skewX != 0 || skewY != 0;
  }

  function resetInitVariables() {
    images = []; // clear the array
    skewXTan = 0;
    skewYTan = 0;
    setSkewX(0);
    setSkewY(0);
  }
  async function generateDataURL(imageUrl: string): Promise<string | null> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const dataUrl = await new Promise<string | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string | null);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      return dataUrl;
    } catch (error) {
      logger.error("Replicator: Error generating data URL:", error);
      return null;
    }
  }

  const svgElement = document.getElementById("simulator");

  if (svgElement) {
    svgElement.setAttribute(
      "viewBox",
      "0 0 " + canvasWidth + " " + canvasHeight
    );
  }
  const initiateData = () => {
    resetInitVariables();
    if (selectedPattern === 1) {
      setNumber(4);
      setAngle(0);
      setDistanceR(0.2);
      setDistanceK(1);
      setSizeK(1);
      setImageAngle(0);
      setSkewX(0);
      setSkewY(0);
   
    } else if (selectedPattern === 2) {
      setColumns(2);
      setRows(2);
      setHDistanceR(0.3);
      setVDistanceR(0.3);
      setHOffsetR(0);
      setSizeK(1);
      setImageAngle(0);
      setDistanceK(1);
      setSkewX(0);
      setSkewY(0);
    } else if (selectedPattern === 3) {
      setNumber(6);
      setSizeK(1);
      setCircleRadiusK(1);
      setCircleNumber(1);
      setCircleOffsetAngle(0);
      setImageAngle(0);
      setSpiralAngleElement(0);
      setSizeK(1);
      setDistanceK(1);
      setCircleDistanceR(1.2);
      setCircleSliceAngle(360);
    } else if (selectedPattern === 4) {
      setNumber(8);
      setWaveCount(2);
      setWaveAmplitude(10);
      setWaveLength(40);
      setBranchCount(1);
      setBranchAngle(5);
      setSizeK(1);
      setImageAngle(0);
      setSkewX(0);
      setSkewY(0);
      setAngle(0);
    }
  };
  const initiateTextData = () => {
    resetInitVariables();
    if (selectedPattern === 1) {
      setNumber(4);
      setAngle(90);
      setDistanceR(-0.7);
      setDistanceK(1);
      setSizeK(1);
      setImageAngle(0);
    } else if (selectedPattern === 2) {
      setColumns(2);
      setRows(2);
      setHDistanceR(1.5);
      setVDistanceR(0.7);
      setHOffsetR(0);
      setSizeK(1);
      setImageAngle(0);
      setDistanceK(1);
      setDistanceK(1);
    } else if (selectedPattern === 3) {
      setNumber(6);
      setSizeK(1);
      setCircleRadiusK(1);
      setCircleNumber(1);
      setCircleOffsetAngle(0);
      setImageAngle(0);
      setSpiralAngleElement(0);
      setCircleDistanceR(1.2);
      setCircleSliceAngle(360);
    } else if (selectedPattern === 4) {
      setNumber(6);
      setWaveCount(3);
      setWaveAmplitude(10);
      setWaveLength(40);
      setBranchCount(1);
      setBranchAngle(5);
      setSizeK(1);
      setImageAngle(0);
      setAngle(90);
    }
    resetInitVariables();
  };
  function addCenteredText(lines) {
    const svg = document.getElementById("simulator");
    let viewBox = `0 0 ${canvasWidth} ${canvasHeight}`;

    const xCenter = canvasWidth / 2;
    const yCenter = canvasHeight / 2;
    const lineHeight = 70; // Adjust based on your font size

    lines.forEach((line, index) => {
      const textElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      textElement.setAttribute("x", xCenter.toString());
      // Adjust y position based on number of lines to maintain vertical centering
      const yPosition = yCenter + (index - (lines.length - 1) / 2) * lineHeight;
      textElement.setAttribute("y", yPosition.toString());
      textElement.setAttribute("text-anchor", "middle"); // Horizontally center the text
      textElement.setAttribute("font-family", "Arial");
      textElement.setAttribute("fill", tokens.colorNeutralFore);
      textElement.setAttribute("font-size", "55"); // Set the font size (consistent with lineHeight)
      textElement.textContent = line;
      if (svg) {
        svg.appendChild(textElement);
      }
    });
  }
  async function handleOpenLink() {
    const response = await requestOpenExternalUrl({
      url: "https://hlabels.com",
    });
  }
  async function handleOpenFeedbackLink() {
    const response = await requestOpenExternalUrl({
      url: "https://ecardify.io/apps/print-your-own-labels-stickers/canva-app/feedback",
    });
  }

  // TODO  use this
  function elementLimitsExceeded() {
    const quantities = currentElementQuantities();
    if (quantities === null || quantities === undefined) {
      return false; // or handle the null case as appropriate
    }
  
    if (isTextMode) {
      return quantities > maxElementQuantities / 2;
    } else {
      if (quantities > maxElementQuantities) {
        return true;
      }
  
      if (!isTextMode) {
        let currentDataSizes = quantities * imageDataSize;
        return currentDataSizes > maxElementDataSizes;
      }
    }
  
    return false; // Default return if no conditions are met
  }
  
  function currentElementQuantities() {
    if (selectedPattern == 1) {
      return number;
    } else if (selectedPattern == 2) {
      return columns * rows;
    } else if (selectedPattern == 3) {
      let currentQuantity = number;
      if (circleNumber > 0) {
        currentQuantity = currentQuantity * circleNumber;
      }
      // reduce it be the slice factor
      return currentQuantity * (circleSliceAngle / 360);
    }
    if (selectedPattern) {
      return number * waveCount * branchCount;
    }
  }

 async function redraw() {

            clearSVG();
            if (!imageSelected && !isTextMode) {
              // If no image is selected, render text instead
              addCenteredText([
                "Select a photo, graphic",
                "or text element",
                "from your design.",
              ]);
              //if an element is aleready selected, please unselect and select again
        
              return;
            }
        
            setDisableAddButton(true);

            if (selectedPattern==1) {
               
                adjustLinearSizeToFit();
             
                const startPoint = await pullStartCenterPoint();
                //console.log(`Start point : x=${startPoint.x}, y=${startPoint.y}`);

                // Navigate through coordinates and add rectangles 
                images = linearDrawingCoordinates(startPoint.x, startPoint.y);
           
                if (recalculationIsRequired()) {
                 
                  images = linearDrawingCoordinates(startPoint.x, startPoint.y);
               
              }
                setImageCoordinates(images);
                setDisableAddButton(false);
               let  index = 0;
                images.forEach(img => {
                    /* Retired as replaced with images
                    let fill;
                    if (index == 0) fill = rectColor;
                    else fill = 'none';
                    addRectangle(img.x, img.y, img.width, img.height, fill);
                    */

                    img.a = -imageAngle;
                    if (isTextMode) {
                        addTextIntoSVG(svgElement, svgUrl, textValue, img.height, img.x, img.y, img.a);
                    }
                    else {
                    
                      if(img.height){
          
                        addImageIntoSVG(svgElement, svgUrl, img);
                      }
                    }
                    index++;
                });
            }
            else if (selectedPattern==2) {
           
                    adjustGridSizeToFit();
              
                const startPoint = await pullStartCenterPoint();
                images = gridDrawingCoordinates(startPoint.x, startPoint.y);
                if (recalculationIsRequired()) {
                  images = gridDrawingCoordinates(startPoint.x, startPoint.y);
              }
                setImageCoordinates(images);
                setDisableAddButton(false);

                images.forEach(img => {
                    img.a = -imageAngle;
                    if (isTextMode) {
                        addTextIntoSVG(svgElement, svgUrl, textValue, img.height, img.x, img.y, img.a);
                    }
                    else {
                        // addImageIntoSVG(svgElement, svgUrl, img.x, img.y, img.width, img.height, img.a);
                        addImageIntoSVG(svgElement, svgUrl, img);
                    }
                });
            }
            else if (selectedPattern==3) {
                 
                    adjustCircleSizeToFit();
                

                images = circleDrawingCoordinates();
                if (recalculationIsRequired()) {
                  images = circleDrawingCoordinates();
              }
                setImageCoordinates(images);
                setDisableAddButton(false);
                let totalRotation;
                images.forEach(img => {
                    totalRotation = -(imageAngle - img.a);
                    img.a = totalRotation;

                    if (isTextMode) {
                        addTextIntoSVG(svgElement, svgUrl, textValue, img.height, img.x, img.y, img.a);
                    }
                    else {
                        // addImageIntoSVG(svgElement, svgUrl, img.x, img.y, img.width, img.height, img.a);
                        addImageIntoSVG(svgElement, svgUrl, img);
                    }
                });
            }
            else if (selectedPattern===4) {
             
                adjustWaveSizeToFit();
            
              let collectedCoordinates = [];
              const startPoint = await pullStartCenterPoint();
              let theAngle = angle;
        
              let currentBranchAngle = theAngle;
              for (let i = 0; i < branchCount; i++) {
                  drawWaveBranch(startPoint.x, startPoint.y, -currentBranchAngle);
        
                collectedCoordinates = collectedCoordinates.concat(images);
                  currentBranchAngle = currentBranchAngle + branchAngle;
              }
              setImageCoordinates(collectedCoordinates);
              setDisableAddButton(false);
          }
      
        }

  function drawWaveBranch(branchStartX, branchStartY, theAngle) {
    images = waveDrawingCoordinates(branchStartX, branchStartY, theAngle);

    let index = 0;
    images.forEach((img) => {
      img.a = -imageAngle;
      if (isTextMode) {
        addTextIntoSVG(
          svgElement,
          svgUrl,
          textValue,
          img.height,
          img.x,
          img.y,
          img.a
        );
      } else {
        addImageIntoSVG(svgElement, svgUrl, img);
      }
      index++;
    });
  }

  function linearDrawingCoordinates(originX, originY) {
    let toReturn: {
      //  id: string;
      x: number;
      y: number;
      a: number;
      width: number;
      height: number;
    }[] = [];

    let reSizedWidth = firstImageWidth;

    let reSizedHeight = firstImageHeight;
    let centerPoints = linearCenterCoordinates(
      originX,
      originY,
      number,
      angle,
      distanceR,
      distanceK,
      runwayLength
    );

    for (let i = 0; i < centerPoints.length; i++) {
      let centerPoint = centerPoints[i];

      toReturn.push({
        //  id: `rect${i}`, // Dynamic ID
        x: centerPoint.x,
        y: centerPoint.y,
        a: 0,
        width: reSizedWidth,
        height: reSizedHeight,
      });

      reSizedWidth = reSizedWidth * sizeK;

      reSizedHeight = reSizedHeight * sizeK;
    }

    return toReturn;
  }
  function recalculationIsRequired() {
  
  
    let furtherstX = Math.abs(images[images.length-1].x);
    let furtherstY = Math.abs(images[images.length-1].y);
   // console.log("The furthest point is: " + furtherstX + " | " + furtherstY);

    let overflowX = furtherstX/canvasWidth;
    let overflowY = furtherstY/canvasHeight;
    let overflow = Math.max(overflowX, overflowY);

    // Apply second adjustment
    if (overflow > 1) {
        firstImageWidth = firstImageWidth/overflow;
        firstImageHeight = firstImageWidth/imageRatio;
    //  console.log("RECALCULATION required");
        return true;
    }
  

    return false;
}
  function gridDrawingCoordinates(originX, originY) {
    let toReturn: {
      // id: string;
      x: number;
      y: number;
      a: number;
      width: number;
      height: number;
    }[] = [];

    let reSizedWidth = firstImageWidth;

    let reSizedHeight = firstImageHeight;

    let centerPoints = gridCenterCoordinates(
      originX,
      originY,
      distanceK,
      runwayLength
    );

    for (let i = 0; i < centerPoints.length; i++) {
      let centerPoint = centerPoints[i];

      toReturn.push({
        //  id: `rect${i}`, // Dynamic ID

        x: centerPoint.x,

        y: centerPoint.y,

        a: 0,

        width: reSizedWidth,

        height: reSizedHeight,
      });

      reSizedWidth = reSizedWidth * sizeK;

      reSizedHeight = reSizedHeight * sizeK;
    }

    return toReturn;
  }
  function circleDrawingCoordinates() {
    let toReturn: {
      //  id: string;
      x: number;
      y: number;
      width: number;
      height: number;
      a: number;
    }[] = [];

    let reSizedWidth;

    let reSizedHeight;

    const centerPoints = multiCircleCenterCoordinates();
    // When radius is zero

    if (centerPoints.length == 1 && centerPoints[0].length == 1) {
      toReturn.push({
        // id: `rect00`, // Dynamic ID

        x: centerPoints[0][0].x,

        y: centerPoints[0][0].y,

        a: centerPoints[0][0].a,

        width: firstImageWidth,

        height: firstImageHeight,
      });

      return toReturn;
    }

    // Loop through each ring

    let centerPointsOfOneCircle;

    for (let ring = 0; ring < centerPoints.length; ring++) {
      if (ring == 0) {
        // first smallest ring

        reSizedWidth = firstImageWidth;

        reSizedHeight = firstImageHeight;
      } else {
        reSizedWidth = reSizedWidth * sizeK;

        reSizedHeight = reSizedHeight * sizeK;
      }

      // loop through each point of this ring

      for (let j = 0; j < centerPoints[ring].length; j++) {
        centerPointsOfOneCircle = centerPoints[ring][j];

        toReturn.push({
          //    id: `rect${ring}-${j}`, // Dynamic ID

          x: centerPointsOfOneCircle.x,

          y: centerPointsOfOneCircle.y,

          a: centerPointsOfOneCircle.a,

          width: reSizedWidth,

          height: reSizedHeight,
        });
      }
    }
    return toReturn;
  }
  function adjustWaveSizeToFit() {

    if (isTextMode) {
        adjustWaveSizeToFitText();
    }
    else {
        adjustLinearSizeToFitImage();

        // Adjust a bit from the linear one
        firstImageWidth = roundIt(firstImageWidth/2); // just me
        firstImageHeight = roundIt(firstImageWidth / imageRatio);
    }
}

  function adjustWaveSizeToFitText() {
    firstImageHeight = roundIt(canvasHeight / 35);
    firstImageWidth = roundIt(firstImageHeight * imageRatio);
}

function adjustLinearSizeToFit() {
  if (isTextMode) {
      adjustLinearSizeToFitText();
  }
  else {
      adjustLinearSizeToFitImage();
  }
}
function adjustLinearSizeToFitImage() {

  function adjustWidth() {
      let angleFactor;
      if (angle < 20 || angle > 70) {
          angleFactor = 6;
      }
      else if (angle < 30 || angle > 60) {
          angleFactor = 7;
      }
      else { // around 45 degrees
          angleFactor = 8;
      }

      let widthByCanvas = canvasWidth / 8; // I came up with nr 8, this just to fit about 7 items
      let widthByQuantity = (widthByCanvas * angleFactor) / number;
      let smallest = Math.min(widthByCanvas, widthByQuantity);
      let extraDistanceR = Number(distanceR) - distanceRStartHardcodedValue; // distanceRDefault
      
      if (extraDistanceR > 0) {
          // make it smaller becaue of extra distance
          return smallest * (1 - extraDistanceR / 3); // I came up with nr 3
      }

      return smallest;
  }

  firstImageWidth = roundIt(adjustWidth());

  if (selectedPattern==1) { // I check this because I use this method for wave as well - BAD design fix it
      if (number <= 4) {
          // Increase the size
          firstImageWidth = roundIt(canvasWidth * 0.19); //  just me
      }

      // No matter the number
      if (distanceR < -0.7) { // images are almost one above the other
          // Increase the size
          firstImageWidth = roundIt(canvasWidth * 0.6); //  just me
      }
  }
  
  firstImageHeight = roundIt(firstImageWidth / imageRatio);

  // In case any of the if-s above have increased the width, make sure height fits the canvas
  if (firstImageHeight > canvasHeight * 0.7) { // height is too big
      firstImageHeight = roundIt(canvasHeight * 0.7);
      firstImageWidth = roundIt(firstImageHeight * imageRatio);
  }
}


  //
  function adjustLinearSizeToFitText() {
    firstImageHeight = roundIt(canvasHeight / 20);
    firstImageWidth = roundIt(firstImageHeight * imageRatio);
  }

  function adjustGridSizeToFit() {
    if (isTextMode) {
      adjustGridSizeToFitText();
    } else {
      adjustGridSizeToFitImage();
    }
  }
  function adjustGridSizeToFitImage() {

    // Detemine width by the number of columns
    let colsToConsider = Math.max(columns, 4);

    firstImageWidth = 0.8 * canvasWidth / colsToConsider;
    // Adjust besed on hDistanceR.value - not ready for this yet
    //firstImageWidth = firstImageWidth - (firstImageWidth * Number(hDistanceR.value));
    firstImageHeight = roundIt(firstImageWidth / imageRatio)

    // Check if height is within the canvas, 
    let heightToFit = 0.8 * canvasHeight / rows;
    // Adjust besed on vDistanceR.value - not ready for this yet
    //heightToFit = heightToFit - (heightToFit * Number(vDistanceR.value));

    if (heightToFit < firstImageHeight) {
        // I should reduce size, so that height can fit as well
        firstImageHeight = heightToFit;
        firstImageWidth = heightToFit * imageRatio;
    }

    firstImageSmallestSize = Math.min(firstImageWidth, firstImageHeight);
}

  //
  function adjustGridSizeToFitText() {

    // Detemine width by the number of columns
    let colsToConsider = Math.max(columns, 4);

    firstImageWidth = roundIt(canvasWidth / colsToConsider);
    firstImageHeight = roundIt(firstImageWidth / imageRatio)

    firstImageSmallestSize = Math.min(firstImageWidth, firstImageHeight);
}


  //

  function adjustCircleSizeToFit() {
    if (isTextMode) {
      adjustCircleSizeToFitText();
    } else {
      adjustCircleSizeToFitImage();
    }
  }

  //
  function adjustCircleSizeToFitImage() {

    if (circleNumber == 0) {
        if (imageRatio > 1) { // width is bigger than height        
            firstImageWidth = canvasWidth / 2; // was 3
            firstImageHeight = firstImageWidth / imageRatio;
        }
        else {
            firstImageHeight = canvasHeight / 2; // was 3
            firstImageWidth = firstImageHeight * imageRatio;
        }
        return;
    }

    // more circles smaller the size
    firstCircleRadius = roundIt(canvasHeight / (circleNumber * 3));
    let factor = 5;
    if (firstCircleRadius < canvasHeight / factor) {
        firstCircleRadius = canvasHeight / factor;
    }
    if (circleNumber > factor) {
        firstCircleRadius = canvasHeight / circleNumber;
    }

    // Detemine image height by canvasHeight
    let imageMaxSize = firstCircleRadius / 1.5;
    if (imageRatio > 1) { // width is bigger than height        
        firstImageWidth = imageMaxSize;
        firstImageHeight = firstImageWidth / imageRatio;
    }
    else {
        firstImageHeight = imageMaxSize;
        firstImageWidth = firstImageHeight * imageRatio;
    }
}
function adjustCircleSizeToFitText() {

  if (circleNumber == 0) {
      firstImageWidth = canvasWidth / 3.2; // just me
      firstImageHeight = firstImageWidth / imageRatio;
      return;
  }

  // more circles smaller the size
  firstCircleRadius = roundIt(canvasHeight / (circleNumber* 3));

  if (firstCircleRadius < canvasHeight / 8) {
      firstCircleRadius = canvasHeight / 8;
  }

  firstImageWidth = firstCircleRadius * 0.9;
  firstImageHeight = firstImageWidth / imageRatio;
}


  //

  // async function initiateImageRatio() {
  //   try {
  //     const img = new Image();
  //     img.onload = function () {
  //       // Calculate the width-to-height ratio
  //       const ratio =roundIt(img.width / img.height);

  //       setImageRatio(ratio);
  //       setImageLoaded(true);

  //     };
  //     // Set the image source to the URL
  //     img.src = imageUrl;
  //     return img;
  //   } catch (error) {
  //     console.error("Error loading image:", error);
  //   }
  // }
  const findImageSizeAndRatio = (
    dataUrl
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = dataUrl;
    });
  };

  async function initiateTextRatio() {
    const textLength = textValue.length;
    if (textLength > 0) {
      if (textLength / 2.2 < 2.5) {
        setShowText(true);
        setImageRatio(2.5);
      } else {
        setShowText(true);
        setImageRatio(textLength / 2.2);
      }
    }
  }
  //
  async function getFont() {
    fontResponse = await requestFontSelection();
    if (fontResponse.type === "COMPLETED") {
      ref = fontResponse.font.ref;
      setSelectedFont(fontResponse.font);
    } else {
      setLoadingSign(false);
    }
  }

  function handleDontShowSkewAlert() {
    setShowSkewAlert(false);
  }

  async function pullStartCenterPoint() {
    let xCenter;
    let yCenter;

    if (selectedPattern==1) { // I came up with 0.05 and 0.95

        if (isTextMode) {
            // They are not centers here, but top-right
            xCenter = canvasWidth * 0.05;
            yCenter = canvasHeight * 0.95 - firstImageHeight / 2;
        }
        else {
            xCenter = canvasWidth * 0.05 + firstImageWidth / 2;
            yCenter = canvasHeight * 0.8 - firstImageHeight / 2;

            if (distanceR < -0.7) { // iI have already applied big size
                yCenter = canvasHeight/2;
            }
        }


    }
    else if (selectedPattern==2) {

        let horSpaces = (firstImageSmallestSize * Number(hDistanceR)) * (columns - 1);
        let horWidths = columns * firstImageWidth;
        const totalHorDistance = horSpaces + horWidths;

        let vertSpaces = (firstImageSmallestSize * Number(vDistanceR)) * (rows - 1);
        let vertHeights = rows* firstImageHeight;
        const totalVertDistance = vertSpaces + vertHeights;

        if (isTextMode) {
            xCenter = (canvasWidth - totalHorDistance) / 2;
            yCenter = (canvasHeight - totalVertDistance) / 2 + firstImageHeight / 2;
        }
        else {
            xCenter = (canvasWidth - totalHorDistance) / 2 + firstImageWidth / 2;
            yCenter = (canvasHeight - totalVertDistance) / 2 + firstImageHeight / 2;
        }
    }
    else if (selectedPattern==3) {
        xCenter = canvasWidth / 2;
        yCenter = canvasHeight / 2;
    }
    if (selectedPattern==4) { 
        if (isTextMode) {
            // They are not centers here, but top-right
            //xCenter = canvasWidth * 0.05;
            xCenter = canvasWidth/2 - firstImageWidth / 2;
            yCenter = canvasHeight * 0.98 - firstImageHeight / 2;
        }
        else {
            xCenter = canvasWidth * 0.05 + firstImageWidth / 2;
            yCenter = canvasHeight * 0.55 - firstImageHeight / 2;
        }
    }

    return {
        x: roundIt(xCenter),
        y: roundIt(yCenter)
    };
}

  useEffect(() => {
    skewXTan = degreesToTan(skewX);
    skewYTan = degreesToTan(skewY);
  }, [skewX, skewY]);

  function addImageIntoSVG(svgHtmlElement, svgUrlString, imgObject) {

    const centerX = imgObject.x;
    const centerY = imgObject.y;
    const width = imgObject.width;
    const height = imgObject.height;

    if(skewX == 0 && skewY == 0){
    rotation = imgObject.a;
    }

    const svgImage = document.createElementNS(svgUrlString, "image");
    svgImage.setAttributeNS(null, "href", imageUrl);
    svgImage.setAttribute("width", width);
    svgImage.setAttribute("height", height);

    // Set the rotation transform around the center of the image
    if (rotation != 0) {
      // Find the normal top-left corner
      const x = centerX - width / 2;
      const y = centerY - height / 2;

      svgImage.setAttribute("x", x.toString());
      svgImage.setAttribute("y", y.toString());
      svgImage.setAttributeNS(
        null,
        "transform",
        `rotate(${rotation}, ${centerX}, ${centerY})`
      );
    } else if (isSkewed()) {
      // ---- Do all this down to preserve the center of the image when applying the skew ------
      // set this image's top-left corner to 0, 0
      svgImage.setAttribute("x", "0"); // Set initial position at 0,0 to simplify transformations
      svgImage.setAttribute("y", "0");

      /* 
      Skew-ing moves the center of the image
      To ensure that after the skew the center remains the same, we calculate that move, and move center of coordinates
      so that when after the skew the center of image ends up being on the same physical place.
      */
      const skewXAdjustment = (width * skewXTan) / 2; // Calculate horizontal shift due to skewX
      const skewYAdjustment = (height * skewYTan) / 2; // Calculate horizontal shift due to skewY
      const newXCenterOfCoordinates = centerX - width / 2 - skewXAdjustment;
      const newYCenterOfCoordinates = centerY - height / 2 - skewYAdjustment;

      // Apply transformations on my svgImage
      svgImage.setAttribute(
        "transform",
        `translate(${newXCenterOfCoordinates}, ${newYCenterOfCoordinates})` + // change the x,y center of coordinates
          `skewX(${skewX})` + // skew horizontally first
          `skewY(${skewY})`
      );

      // // Version with rotation
      // const rota = 20;
      // svgImage.setAttribute('transform',
      //     `rotate(${rota}, ${centerX}, ${centerY})` + // Rotate around a specific center first
      //     `translate(${newXCenterOfCoordinates}, ${newYCenterOfCoordinates})` + // Then change the x,y center of coordinates
      //     `skewX(${skewX.value}) ` + // Apply horizontal skew
      //     `skewY(${skewY.value})` // Finally apply vertical skew
      // );
    } else {
      /*
        No transformations
        Find the normal top-left corner
      */
      const x = centerX - width / 2;
      const y = centerY - height / 2;
      svgImage.setAttribute("x", x.toString());
      svgImage.setAttribute("y", y.toString());
    }

    // Append image to SVG element
    if(svgHtmlElement){
    svgHtmlElement.appendChild(svgImage);
    }
  }

  // first width, second height
  function calculateTheSkewedSize(width, height, tanX, tanY) {
    return [width + height * tanX, height + width * tanY]; //return [newWidth, newHeight];
  }

  function generateSkewedAndAddToDesign() {
    let rightCanvasWidth: number;
    let rightCanvasHeight: number;

    var canvas = new fabric.Canvas("canvas");

    // Create a Promise to handle the asynchronous operation
    new Promise<void>((resolve, reject) => {


      fabric.Image.fromURL(
        imageUrl,
        function (img) {
          canvas.setWidth(img.width * 3); // to make sure it fits..
          canvas.setHeight(img.height * 3);

          // Skew the image
          img.set({
            left: 0,
            top: 0,
            skewX: skewX,
            skewY: skewY,
          });
          canvas.add(img);
          canvas.renderAll();

          // Get the bounding box of the skewed image
          var boundingRect = img.getBoundingRect();
          // console.log('Bounding rectangle:', boundingRect);

          // Set skew size ratios that will be used when adding images to Canva
          skewWidthRatio = roundIt(boundingRect.width / img.width, 4);
          skewHeightRatio = roundIt(boundingRect.height / img.height, 4);
          //  console.log('skewWidthRatio:' + skewWidthRatio + " skewHeightRatio:" + skewHeightRatio);

          // Set size of the next canvas
          rightCanvasWidth = boundingRect.width;
          rightCanvasHeight = boundingRect.height;

          resolve(); // Resolve the promise after setting the values
        },
        { crossOrigin: "Anonymous" }
      );
    })
      .then(() => {
        // Draw again on the right canvas size
        canvas.clear();
        fabric.Image.fromURL(
          imageUrl,
          function (img) {
            canvas.setWidth(rightCanvasWidth);
            canvas.setHeight(rightCanvasHeight);

            // Scale and skew the image
            img.set({
              left: 0,
              top: 0,
              skewX: skewX,
              skewY: skewY,
            });
            canvas.add(img);
            canvas.renderAll();

            // Get the data URL of the canvas after rendering the skewed image
            var dataURL = canvas.toDataURL({
              format: "png",
              quality: 1.0, // Maximum quality
            });
            // console.log("Skewed Canvas image - width: " + canvas.width + " height: " + canvas.height + " and ratio: " + canvas.width / canvas.height);
            addSkewedImagesToDesign(dataURL);
          },
          { crossOrigin: "Anonymous" }
        );
      })
      .catch((error) => {
        
      logger.error("Replicator: Error processing the image:", error); // Will be logged
 

      });
  }

  function degreesToTan(degrees) {
    return Math.tan((degrees * Math.PI) / 180);
  }

  // useEffect(() => {
  //   if (!isTextMode) {
  //     if (imageAngle !== 0) {

  //         skewXTan = roundIt(degreesToTan(0));
  //         skewYTan = roundIt(degreesToTan(0));

  //     }
  // }

  // }, [imageAngle]);
  //
  function draw() {
    if (isSkewed()) {
      generateSkewedAndAddToDesign();
    } else {
      handleAddToDesign();
    }
  }

  let altText: AltText | undefined ;

  async function addSkewedImagesToDesign(skewedDataUrl) {
    try {
      setLoadingSign(true);
      let coefficientOfDivision = 1; // Initialize coefficientOfDivision

      // Calculate coefficientOfDivision if necessary
      let i=imageCoordinates.length-1;

        const { x, y, width, height } = imageCoordinates[i];

        if (
          (Math.abs(x) > 20000 ||
            Math.abs(y) > 20000 ||
            Math.abs(width) > 20000 ||
            Math.abs(height) > 20000)
        ) {
          coefficientOfDivision = Math.max(
            Math.abs(x) / 10000,
            Math.abs(y) / 10000,
            Math.abs(width) / 10000,
            Math.abs(height) / 10000
          );
        }
      

      const children: NativeSimpleElementWithBox[] = []; // Array to store the embed objects
   
      for (let i = 0; i < imageCoordinates.length; i++) {
        const { x, y, width, height, a } = imageCoordinates[i]; // Destructure x and y from each object in the array
        const left = x - (width * skewWidthRatio) / 2;
        const top = y - (height * skewHeightRatio) / 2;
        // Create an embed object for each image
        const embed: NativeSimpleElementWithBox = {
          type: "image",
          dataUrl: skewedDataUrl,
          width: (width * skewWidthRatio) / coefficientOfDivision,
          height: (height * skewHeightRatio) / coefficientOfDivision,
          top: top / coefficientOfDivision,
          left: left / coefficientOfDivision,
          rotation: a,
          altText:altText
        };
        children.push(embed); // Add the embed object to the children array
      }

      // Create a group with the children
      await addElementAtPoint({
        type: "group",
        children: children,
      });
      setLoadingSign(false);
    } catch (error) {
      setShowErrorAlert(true);
      logger.error("Replicator: Error adding images to design:", error);
      if (isTextMode) {
        initiateTextData();
      } else {
        initiateData();
      }

      setLoadingSign(false);
    }
  }

  function linearCenterCoordinates(
    firstX,
    firstY,
    quantity,
    slope,
    relativeDistance,
    spaceFactor,
    maxRunwayLength
  ) {
    let space;

    if (maxRunwayLength) {
      /*

      This will keep the space between items, such that the whole does not streach outside the maxRunwayLength

      This opton might not be good for user perception of what is happening, especially with distance and size factors.

      Better use resizing of elements

      */

      /*

      Assuming d is 0 degrees for the calculation of s to ensure horizontal distribution

      Calculate s considering the growth factor k and ensuring all points fit within the canvas width

      */

      if (Number(distanceK) === 1) {
        // When k is 1, all distances are equal, so we divide the canvas width by (n - 1) to fit all points

        space = maxRunwayLength / (quantity - 1);
      } else {
        // When k is not 1, calculate s based on the geometric series sum formula adjusted for canvas width

        space =
          (maxRunwayLength * (1 - spaceFactor)) /
          (1 - Math.pow(spaceFactor, quantity));
      }
    } else {
      space = firstImageWidth * (1 + Number(relativeDistance));
    }

    // Initialize array of points

    const points = [{ x: firstX, y: firstY }];

    /*

  Generate each point using the calculated space and considering the angle

  */

    // Convert angle from degrees to radians for coordinate calculation

    const angleRad = slope * (Math.PI / 180);

    let lastX = firstX;

    let lastY = firstY;

    let currentDistance = space;

    for (let i = 1; i < quantity; i++) {
      const newX = roundIt(lastX + currentDistance * Math.cos(angleRad));

      const newY = roundIt(lastY - currentDistance * Math.sin(angleRad));

      points.push({ x: newX, y: newY });

      // Prepare for next point

      lastX = newX;

      lastY = newY;

      currentDistance *= spaceFactor; // Increase the distance by the factor k for the next point
    }

    return points;
  }

  //
  function addTextIntoSVG(
    svgHtmlElement,
    svgUrlString,
    text,
    fontSize,
    x,
    y,
    rotation
  ) {
    // Create a new text element
    const textElement = document.createElementNS(svgUrlString, "text");
    textElement.setAttribute("x", x);
    textElement.setAttribute("y", y);

    // here I'm rotating against the insertion point
    if (rotation != 0) {
      textElement.setAttribute("transform", `rotate(${rotation}, ${x}, ${y})`);
    }

    textElement.setAttribute("font-family", "Arial");
    textElement.setAttribute("font-size", fontSize);
    textElement.setAttribute("fill", tokens.colorTypographyPrimary);
    textElement.textContent = text;

    // Append text to SVG element
    if(svgHtmlElement){
    svgHtmlElement.appendChild(textElement);
    }
  }

  function gridCenterCoordinates(firstX, firstY, spaceFactor, maxRunwayLength) {
    let colSpace;

    let rowSpace;

    if (maxRunwayLength) {
      //
    } else {
      colSpace = firstImageWidth + firstImageSmallestSize * Number(hDistanceR);

      rowSpace = firstImageHeight + firstImageSmallestSize * Number(vDistanceR);
    }

    // Initialize array of points and set its first one

    const points = [{ x: firstX, y: firstY }];

    let currentHorDistance;

    let currentVertDistance;

    let lastX;

    let lastY;

    let oneY;

    let oneX;

    for (let row = 0; row < rows; row++) {
      // loop horizontally on this row

      for (let col = 0; col < columns; col++) {
        if (row == 0 && col == 0) {
          lastX = firstX;

          lastY = firstY;

          currentHorDistance = colSpace;

          currentVertDistance = rowSpace;

          continue; // skip the first one as it is added already
        }

        if (col == 0) {
          // it is the first item (column) of this row

          if (isOdd(row)) {
            // Apply horizontal offset if there

            oneX = firstX + hOffsetR * firstImageWidth;
          } else {
            oneX = firstX;
          }

          oneY = roundIt(lastY + currentVertDistance); // increase Y

          // Set distance for the next one

          currentHorDistance = colSpace;
        } else {
          oneX = roundIt(lastX + currentHorDistance); // increase X

          oneY = lastY; // keep the same Y

          // Increase the distance by the factor for the next point

          currentHorDistance *= spaceFactor;
        }

        // Store this point for calculating the next one

        lastX = oneX;

        lastY = oneY;

        // Record this point

        points.push({ x: oneX, y: oneY });
      }

      // Increase vertical distance by the factorfor the next point

      currentVertDistance *= spaceFactor;
    }

    return points;
  }

  //

  function circleCenterCoordinates(
    quantity,
    r,
    circleOriginX,
    circleOriginY,
    startAngleDegrees
  ) {
    const endAngleDegrees = startAngleDegrees + circleSliceAngle;
    const endAngleRadians = endAngleDegrees * (Math.PI / 180);
    let points: { x: number; y: number; a: number }[] = [];

    const startAngleRadians = startAngleDegrees * (Math.PI / 180); // Convert degrees to radians

    let theta;
    let x;
    let y;
    let a;

    for (let i = 0; i < quantity; i++) {
      theta = startAngleRadians - (2 * Math.PI * i) / quantity;
      // no more, because the slice angle is reached

      if (Math.abs(theta) > Math.abs(endAngleRadians)) {
        break;
      }
      x = roundIt(circleOriginX + r * Math.cos(theta));
      y = roundIt(circleOriginY + r * Math.sin(theta));

      a = radiansToDegrees(theta) + 90;

      points.push({ x: x, y: y, a: a });
    }

    return points;
  }

  function multiCircleCenterCoordinates() {
    const centX = canvasWidth / 2;
    const centY = canvasHeight / 2;
    let toReturn: { x: number; y: number; a: number }[][] = [];
    let centerPoints;
    let radius;
    let angleOfFirstCenter;
    const defaultAngleOfFirstCenter = 0;
    if (circleNumber == 0) {
      radius = 0;

      centerPoints = circleCenterCoordinates(
        number,
        radius,
        centX,
        centY,
        defaultAngleOfFirstCenter
      );

      toReturn.push(centerPoints);
      return toReturn;
    }
    const baseRadiusDifference = (firstCircleRadius / 2) * circleDistanceR;
    let previousRadiusDifference;
    let lastRadius;
    let lastRadiusDifference;
    for (let i = 1; i <= circleNumber; i++) {
      if (i == 1) {
        radius = firstCircleRadius;
        previousRadiusDifference = baseRadiusDifference;
        lastRadius = radius;
      } else {
        radius = lastRadius + previousRadiusDifference * circleRadiusK;
        previousRadiusDifference = radius - lastRadius;
        lastRadius = radius;
      }

      angleOfFirstCenter = defaultAngleOfFirstCenter;

      if (isEven(i)) {
        if (circleOffsetAngle != 0) {
          // Apply angle offset
          angleOfFirstCenter = angleOfFirstCenter + circleOffsetAngle;
        }
      }

      angleOfFirstCenter = angleOfFirstCenter + i * spiralAngleElement;
      centerPoints = circleCenterCoordinates(
        number,
        radius,
        centX,
        centY,
        angleOfFirstCenter
      );

      toReturn.push(centerPoints);
    }

    return toReturn;
  }
  function waveBranchCenterCoordinates(startX, startY, theAngle) {

    let coordinates: { x: number, y: number }[] = [];
    let radians = theAngle * Math.PI / 180;
    let numPointsPerCycle = number;

    let totalPoints = waveCount * numPointsPerCycle; // Total number of points to cover full cycles
    // RETIRED let xStep = waveLength.value*canvasUnit * (waveCount.value-1) / totalPoints; 
    let xStep = waveLength*canvasUnit * 2.2 / totalPoints; // Adjust xStep to ensure full cycle completion within the preview

    for (let i = 0; i < totalPoints; i++) {
        let x = roundIt(i * xStep);
        let y = roundIt(waveAmplitude*canvasUnit * Math.sin((2 * Math.PI * i) / numPointsPerCycle));

        // Apply rotation matrix
        let rotatedX = roundIt(x * Math.cos(radians) - y * Math.sin(radians));
        let rotatedY = roundIt(x * Math.sin(radians) + y * Math.cos(radians));

        // Translate the rotated coordinates by the start position
        x = startX + rotatedX;
        y = startY + rotatedY;

        coordinates.push({ x, y });
    }

    return coordinates;
}

  //
  function waveDrawingCoordinates(originX, originY, theAngle) {
    let toReturn: {
      // id: string;
      x: number;
      y: number;
      a: number;
      width: number;
      height: number;
    }[] = [];
    let reSizedWidth = firstImageWidth;
    let reSizedHeight = firstImageHeight;

    let centerPoints = waveBranchCenterCoordinates(originX, originY, theAngle);
    for (let i = 0; i < centerPoints.length; i++) {
      let centerPoint = centerPoints[i];

      toReturn.push({
        //  id: `wave${i}`,
        x: centerPoint.x,
        y: centerPoint.y,
        a: 0,
        width: reSizedWidth,
        height: reSizedHeight,
      });

      reSizedWidth = reSizedWidth * sizeK;
      reSizedHeight = reSizedHeight * sizeK;
    }

    return toReturn;
  }
  function roundIt(num: number, fractions?: number): number {
    if (fractions === undefined) {
      return Number(num.toFixed(3));
    }

    return Number(num.toFixed(fractions));
  }

  function isOdd(number) {
    return number % 2 !== 0;
  }

  function isEven(number) {
    return number % 2 == 0;
  }

  function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  const handleAddToDesign = async () => {
    // console.log("Add to design");
    try {
      setLoadingSign(true);
      let coefficientOfDivision = 1; // Initialize coefficientOfDivision
      // Calculate coefficientOfDivision if necessary

      let i=imageCoordinates.length-1;
    
        const { x, y, width, height } = imageCoordinates[i];

        if (
     
          (Math.abs(x) > 20000 ||
            Math.abs(y) > 20000 ||
            Math.abs(width) > 20000 ||
            Math.abs(height) > 20000)
        ) {
          coefficientOfDivision = Math.max(
            Math.abs(x) / 20000,
            Math.abs(y) / 20000,
            Math.abs(width) / 20000,
            Math.abs(height) / 20000
          );
        }
      

      const children: NativeSimpleElementWithBox[] = []; // Array to store the embed objects
     
      if (isTextMode) {
        const font = await getFont();

        for (let i = 0; i < imageCoordinates.length; i++) {
          const { x, y, width, height, a } = imageCoordinates[i]; // Destructure x and y from each object in the array

          const left = x;
          const top = y;

        
          let fontSize=height/ coefficientOfDivision;
          if (height/ coefficientOfDivision>1000) {
            fontSize = 1000;
          } else if(height/ coefficientOfDivision<1){ {
            fontSize = 1;
          }
        }
          const embed: NativeSimpleElementWithBox = {
            type: "text",
            children: [textValue], // Wrap textValue in an array
            fontSize: fontSize,
            top: top / coefficientOfDivision,
            left: left / coefficientOfDivision,
            rotation: a,
            fontRef: fontResponse.font.ref,
          };
      
          children.push(embed); // Add the embed object to the children array
        }
      } else {
        for (let i = 0; i < imageCoordinates.length; i++) {
          const { x, y, width, height, a } = imageCoordinates[i]; // Destructure x and y from each object in the array
          const left = x - width / 2;
          const top = y - height / 2;
          // Create an embed object for each image
          const embed: NativeSimpleElementWithBox = {
            type: "image",
            dataUrl: dataUrl,
            width: width / coefficientOfDivision,
            height: height / coefficientOfDivision,
            top: top / coefficientOfDivision,
            left: left / coefficientOfDivision,
            rotation: a,
            altText:altText
         
          };
          children.push(embed); // Add the embed object to the children array
        }
      }

      // Create a group with the children
      await addElementAtPoint({
        type: "group",
        children: children,
      });
      setLoadingSign(false);
    } catch (error) {
      logger.error("Replicator: Error adding images to design:", error);
      if (isTextMode) {
        if (!fontResponse.font.ref) {
          setShowAlert(false);
          setLoadingSign(false);
          return;
        }
      }
      setShowErrorAlert(true);
      if (isTextMode) {
        initiateTextData();
      } else {
        initiateData();
      }
      setLoadingSign(false);
    }
  };

  const clearSVG = () => {
    const svgElement = document.getElementById("simulator");
    if (!svgElement) {
      setImageSelected(false);
      setIsTextMode(false);
      return;
    }
    while (svgElement.firstChild) {
      svgElement.removeChild(svgElement.firstChild);
    }
  };


  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        const buttonElement = divRef.current.querySelector('button');
        if (buttonElement) {
          setSvgWidth(buttonElement.offsetWidth);
        }
      }
    };
  
    const handleHeightResize = () => {
      if (svgRef.current) {
        const svgElement = svgRef.current;
        const height = svgElement.getBoundingClientRect().height;
        if (height) {
          setSvgHeight(height);
          setTopMargin(height + 16);
        }
      }
    };
    handleResize();
  
  
    // Use interval to check for svgRef.current
    const intervalId = setInterval(() => {
      if (svgRef.current) {
        handleHeightResize();
        clearInterval(intervalId);  // Once svgRef is available, clear the interval
      }
    }, 100);  // Check every 100ms (adjust this delay if needed)
  
    // Call the function to get the initial width

    // Add event listener for resize events
    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleHeightResize);
  
    // Cleanup function to remove the event listener and interval
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleHeightResize);
      clearInterval(intervalId);
    };
  }, []);
  
  const startOver = () => {
    setSelectedPattern(1);
    setShowBorder1(true);
    setShowBorder2(false);
    setShowBorder3(false);
    setShowBorder4(false);
    setImageRatio(1);
    setImageSelected(false);
    setIsTextMode(false);
    setOneSelected(false);
    setShowMoreButtonClicked(false);
    setShowMoreSliders(false);
    setShowAlert(false);
    setShowErrorAlert(false);
    setShowAddingLimit(false);
    setShowLimitAlert(false);
    setShowSkewAlert(false);


  };
  const handleResetToDefault = () => {
    scrollToTop();
    setChangedOnce(false);
    checkLimit();
    isTextMode ? initiateTextData() : initiateData();
    setShowMoreButtonClicked(false);
    setShowMoreSliders(false);
  };
  const [showBorder1, setShowBorder1] = useState(true);
  const [showBorder2, setShowBorder2] = useState(false);
  const [showBorder3, setShowBorder3] = useState(false);
  const [showBorder4, setShowBorder4] = useState(false);
  const toggleBorder1 = () => {
    setShowBorder1(true);
    setShowBorder2(false);
    setShowBorder3(false);
    setShowBorder4(false);
    setSelectedPattern(1);
    scrollToTop();
  };
  const toggleBorder2 = () => {
    setShowBorder2(true);
    setShowBorder1(false);
    setShowBorder3(false);
    setShowBorder4(false);
    setSelectedPattern(2);
    scrollToTop();
  };
  const toggleBorder3 = () => {
    setShowBorder3(true);
    setShowBorder1(false);
    setShowBorder2(false);
    setShowBorder4(false);
    setSelectedPattern(3);
    scrollToTop();
  };
  const toggleBorder4 = () => {
    setShowBorder4(true);
    setShowBorder1(false);
    setShowBorder2(false);
    setShowBorder3(false);
    setSelectedPattern(4);
    scrollToTop();
  };
  function handleDontShowAlert() {
    setShowAlert(false);
  }
  function handleDontShowLimitAlert() {
    setShowAddingLimit(false);
  }
  function handleDontShowErrorAlert() {
    setShowErrorAlert(false);
  }
  const handleSegmentedControlChange = (value) => {
    setSelectedPattern(parseInt(value)); // Update the selectedPattern state
    scrollToTop();
  };


  // useEffect(() => {
  //   if (showSkewAlert) {
  //     const timer = setTimeout(() => {
  //       setShowSkewAlert(false);
  //     }, 5000); // Change the duration as needed (5000ms = 5 seconds)

  //     // Cleanup the timer if the component unmounts or showSkewAlert changes
  //     return () => clearTimeout(timer);
  //   }
  // }, [showSkewAlert]);
 
  // useEffect(() => {
  //   if (showAlert) {
  //     const timer = setTimeout(() => {
  //       setShowAlert(false);
  //     }, 5000); // Change the duration as needed (5000ms = 5 seconds)

  //     // Cleanup the timer if the component unmounts or showAlert changes
  //     return () => clearTimeout(timer);
  //   }
  // }, [showAlert]);


  // useEffect(() => {
  //   if (showAddingLimit) {
  //     const timer = setTimeout(() => {
  //       setShowAddingLimit(false);
  //     }, 4000);

  //     // Cleanup the timer if the component unmounts or showAddingLimit changes
  //     return () => clearTimeout(timer);
  //   }
  // }, [showAddingLimit]);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Make sure you have the correct import and the useRef is correctly typed.
  
  const scrollToTop = () => {
    // Check if scrollContainerRef.current exists and is not null
    if (scrollContainerRef.current) {
      // Explicitly cast to HTMLElement or HTMLDivElement, depending on your use case
      (scrollContainerRef.current as HTMLDivElement).scrollTo({
        top: 0,
     
      });
    }
  };

  return (
    <div className={styles.scrollContainer} ref={scrollContainerRef}>
      {showAlert && (
        <div style={{ marginTop: tokens.space2, marginBottom: tokens.space2 }}>
          <Alert tone="critical" title="Select a photo, graphic, or text element in your design." onDismiss={handleDontShowAlert}>
          If something is already selected, it means the element isn’t supported. Try converting it to a PNG or JPG image first.
          </Alert>
        </div>
      )}
  
   
   
        <div>
          
        
   
  
          {imageSelected || isTextMode ? (
        <div
        style={{
          ...(imageSelected || isTextMode || !showLimitAlert
            ? { position: "fixed" }
            : {}),
          top: "40",
          left: "5",
          zIndex: "1000",
          background: tokens.colorSurface,
          marginTop:'-16px',
          width: (svgWidth)+"px",
        }}
      >
             {showAddingLimit && (
          <div style={{ marginTop: tokens.space2 }}>
            <Alert
              tone="warn"
              onDismiss={handleDontShowLimitAlert}
              title= {'Replication limit reached'}
            >
         Try adjusting the settings or manually reducing the size of the original image.
            </Alert>
          </div>
        )}
  
  {showSkewAlert && (
            <div style={{ marginTop: tokens.space2 }}>
              <Alert tone="warn" onDismiss={handleDontShowSkewAlert}>
                You cannot apply both rotation and skew at the same time
              </Alert>
            </div>
          )}
  
          {showErrorAlert && (
            <div style={{ marginTop: tokens.space2 }}>
              <Alert tone="critical" onDismiss={handleDontShowErrorAlert}>
                Error while processing the elements. Please try again possibly with fewer replications or select another one.
              </Alert>
            </div>
          )}
              <svg
                ref={svgRef}
                id="simulator"
                width="100%"
                height="100%"
                viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
                style={{
                  border: `1px solid ${tokens.colorBorder}`,
                  borderRadius: "8px",
                  backgroundColor: tokens.colorNeutralLow,
                  marginTop:'16px',
                }}
              ></svg>
  
       
            
            </div>
          ) : (
            <div style={{ marginBottom: tokens.space2 }}>
              <Text size='medium'>Select a photo, graphic, or text element in your design</Text>
            </div>
          )}
  
          {!imageSelected && !isTextMode && (
            <div>
              <div ref={divRef} style={{ marginTop: tokens.space2, marginBottom: tokens.space2 }}>
                <Button  variant="primary"  onClick={checkSelection} stretch loading={loading} >Replicate</Button>
              </div>
  
              <div className={customStyles.footer} onClick={handleOpenLink}>
            <Text size="small" alignment="center">
              A product by <span style={{ fontWeight: 'bold' }}>hLabels.com</span>
            </Text>
          </div>
          <div className={customStyles.text} >
              <Text size="small" alignment="center"  >
         We appreciate your        <Link
                  href={"https://ecardify.io/apps/print-your-own-labels-stickers/canva-app/feedback"}
                  id="id"
                  requestOpenExternalUrl={handleOpenFeedbackLink}
                  title="Feedback"
                >feedback</Link>
              </Text>
            </div>
            </div>
          )}
        </div>
      
  
      {(imageSelected || isTextMode) && (
       <div style={{marginTop:topMargin}}>
          
          <div >
            
            {/* Rendering sliders based on selected pattern */}
            {selectedPattern === 1 ? (
              
              <div>
                   <div>
                  <SegmentedControl
                    options={[
                      { label: 'Linear', value: '1' },
                      { label: 'Grid', value: '2' },
                      { label: 'Circular', value: '3' },
                      { label: 'Wave', value: '4' }
                    ]}
                    onChange={handleSegmentedControlChange}
                    defaultValue="1"
                  />
              </div>
                {(isTextMode ? pattern1TextSliders : pattern1ImageSliders1).map(
                  (slider, index) => (
                    <div style={{marginBottom:tokens.space2,marginTop:tokens.space2}}>
                    <FormField
                      key={index}
                      label={slider.label}
                      control={(props) => (
                        <Box paddingStart="2u">
                        <Slider
                          defaultValue={slider.state}
                          max={slider.max}
                          min={slider.min}
                          step={slider.step}
                          value={slider.state}
                          onChange={(value) => slider.setState(value)}
                        />
                        </Box>
                      )}
                    />
                    </div>
                  )
                )}
                {showMoreSliders && (
                  <div>
                    {(isTextMode
                      ? pattern1TextSliders1
                      : pattern1ImageSliders2
                    ).map((slider, index) => (
                      <div style={{marginBottom:tokens.space2,marginTop:tokens.space2}}>
                      <FormField
                        key={index}
                        label={slider.label} 
                        control={(props) => (
                          <Box paddingStart="2u">
                          <Slider
                            defaultValue={slider.state}
                            max={slider.max}
                            min={slider.min}
                            step={slider.step}
                            value={slider.state}
                            onChange={(value) => slider.setState(value)}
                          />
                          </Box>
                        )}
                      />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : selectedPattern === 2 ? (
              <div>
              <div>
             <SegmentedControl
               options={[
                 { label: 'Linear', value: '1' },
                 { label: 'Grid', value: '2' },
                 { label: 'Circular', value: '3' },
                 { label: 'Wave', value: '4' }
               ]}
               onChange={handleSegmentedControlChange}
               defaultValue="1"
             />
         </div>
                {(isTextMode
                  ? pattern2TextSliders1
                  : pattern2ImageSliders1
                ).map((slider, index) => (
                  <div style={{marginBottom:tokens.space2,marginTop:tokens.space2}}>
                  <FormField
                    key={index}
                    label={slider.label}
                    control={(props) => (
                      <Box paddingStart="2u">
                      <Slider
                        defaultValue={slider.state}
                        max={slider.max}
                        min={slider.min}
                        step={slider.step}
                        value={slider.state}
                        onChange={(value) => slider.setState(value)}
                      />
                      </Box>
                    )}
                  />
                  </div>
                ))}
  
       
  
                {showMoreSliders && (
                  <div>
                    {(isTextMode
                      ? pattern2TextSliders2
                      : pattern2ImageSliders2
                    ).map((slider, index) => (
                      <div style={{marginBottom:tokens.space2,marginTop:tokens.space2}}>
                      <FormField
                        key={index}
                        label={slider.label}
                        control={(props) => (
                          <Box paddingStart="2u">
                          <Slider
                            defaultValue={slider.state}
                            max={slider.max}
                            min={slider.min}
                            step={slider.step}
                            value={slider.state}
                            onChange={(value) => slider.setState(value)}
                          />
                          </Box>
                        )}
                      />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : selectedPattern === 3 ? (
              <div>
              <div>
             <SegmentedControl
               options={[
                 { label: 'Linear', value: '1' },
                 { label: 'Grid', value: '2' },
                 { label: 'Circular', value: '3' },
                 { label: 'Wave', value: '4' }
               ]}
               onChange={handleSegmentedControlChange}
               defaultValue="1"
             />
         </div>
                {(isTextMode
                  ? pattern3TextSliders1
                  : pattern3ImageSliders1
                ).map((slider, index) => (
                  <div style={{marginBottom:tokens.space2,marginTop:tokens.space2}}>
                  <FormField
                    key={index}
                    label={slider.label}
                    control={(props) => (
                      <Box paddingStart="2u">
                      <Slider
                        defaultValue={slider.state}
                        max={slider.max}
                        min={slider.min}
                        step={slider.step}
                        value={slider.state}
                        onChange={(value) => slider.setState(value)}
                      />
                      </Box>
                    )}
                  />
                  </div>
                ))}
                
              </div>
            ) : selectedPattern === 4 ? (
              <div>
              <div>
             <SegmentedControl
               options={[
                 { label: 'Linear', value: '1' },
                 { label: 'Grid', value: '2' },
                 { label: 'Circular', value: '3' },
                 { label: 'Wave', value: '4' }
               ]}
               onChange={handleSegmentedControlChange}
               defaultValue="1"
             />
         </div>
              {(isTextMode
                ? pattern4TextSliders1
                : pattern4ImageSliders1
              ).map((slider, index) => (
                <div style={{marginBottom:tokens.space2,marginTop:tokens.space2}}>
                <FormField
                  key={index}
                  label={slider.label}
                  control={(props) => (
                    <Box paddingStart="2u">
                    <Slider
                      defaultValue={slider.state}
                      max={slider.max}
                      min={slider.min}
                      step={slider.step}
                      value={ slider.state}
                      onChange={(value) => slider.setState(value)}
                    />
                    </Box>
                  )}
                />
                </div>
              ))}

                {showMoreSliders && (
                  <div>
                   {(isTextMode
                      ? pattern4TextSliders2
                      : pattern4ImageSliders2
                    ).map((slider, index) => (
                      <div style={{marginBottom:tokens.space2,marginTop:tokens.space2}}>
                      <FormField
                        key={index}
                        label={slider.label}
                        control={(props) => (
                          <Box paddingStart="2u">
                          <Slider
                            defaultValue={slider.state}
                            max={slider.max}
                            min={slider.min}
                            step={slider.step}
                            value={slider.state}
                            onChange={(value) => slider.setState(value)}
                          />
                          </Box>
                        )}
                      />
                      </div>
                    ))}
                  </div>

                )}
              
            </div>
            
            ) : null}
          </div>
  
          <div>
          <div style={{ marginTop: tokens.space2, marginBottom: tokens.space2 }}>
          {!showMoreButtonClicked &&selectedPattern!==3&& (

<Button variant='tertiary' 
icon={ChevronDownIcon } 
onClick={handleShowMoreSliders}
stretch
iconPosition="end"
alignment="start"
>
More options
</Button>


)}
</div>
<div style={{  marginTop: tokens.space2 }}>
<Button
    variant="tertiary"
    stretch
    icon={ReloadIcon} 
    onClick={handleResetToDefault}
  >
    Reset to defaults
  </Button>
  </div>
          <div  ref={divRef} style={{  marginBottom: tokens.space1,marginTop:tokens.space1}}>
          
  <Button
    variant="primary"
    stretch
    loading={loadingSign}
    onClick={draw}
    disabled={disableAddButton || disableFromLimit}
  >
    {isTextMode ? 'Continue' : 'Add to design'}
  </Button>
</div>

  <div style={{  marginBottom: tokens.space2 }}>
            <Button variant="secondary" onClick={startOver} stretch>
              {/* Select another element */}
              Go back
            </Button>
            </div>
          </div>
  
          <div className={customStyles.footer} onClick={handleOpenLink}>
            <Text size="small" alignment="center">
              A product by <span style={{ fontWeight: 'bold' }}>hLabels.com</span>
            </Text>
          </div>
        </div>
      )}
    </div>
  );
  
}