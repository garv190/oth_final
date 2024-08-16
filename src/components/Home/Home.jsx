



// Scene: In Three.js, a scene is where you place all the objects you want to render. These objects could be 3D models, lights, backgrounds, etc.

// Camera: The camera defines the viewpoint or perspective from which the scene is viewed. In a 3D world, the camera can be positioned and oriented in different ways to create different views of the scene.

// Rendering: Rendering is the process of taking the 3D scene, as defined by the objects in the scene and their positions, colors, and other properties, and converting it into a 2D image that can be displayed on the screen.






// Camera information

// Field of View (FOV): This is like the viewing angle of the camera. Imagine holding a camera and deciding how much of the scene you want to capture in the photo. The FOV determines the extent of the scene that will be visible on the screen. It's measured in degrees.

// Aspect Ratio: This is about maintaining the correct proportions of the scene. You want things to look normal and not stretched or squished. So, you typically set the aspect ratio to match the width divided by the height of the display area.

// Near and Far Clipping Plane: Imagine you're looking through a window. The near and far clipping planes set the distance from the camera beyond which objects won't be visible. It's like saying, "Ignore anything closer than this or farther than that." This helps optimize performance by not rendering things that are too close or too far away.

// Renderer Size: We need to tell the renderer how big of an area it should render our 3D scene onto. Usually, we want it to fill the whole browser window, so we set the size to match the width and height of the window. This ensures the scene looks good and fits the screen properly.

// Adding Renderer to HTML: Finally, we add the renderer to our webpage by putting it inside a <canvas> element. This canvas acts like a blank sheet of paper where the renderer draws the scene. So, whatever the camera sees and the renderer renders, it gets displayed on this canvas, allowing us to view the 3D scene in our web browser.


//WE USE initThree function to render as  because the JavaScript code is trying to do something with an HTML element (specifically a canvas element with the id homeCanvas), but that HTML element hasn't been created yet. It's like trying to eat a cake before it's been baked!

// To fix this, we need to make sure that the JavaScript code waits until the HTML element exists before trying to do anything with it. We can do this by wrapping the JavaScript code inside a special statement that checks if the element exists before doing anything with it. It's like checking if the cake has finished baking before trying to eat it!




/* <div class="sketchfab-embed-wrapper"> <iframe title="SpaceShip" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/35fcc1a00a1340a295a0d7f8e8be9f1c/embed"> </iframe> <p style="font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;"> <a href="https://sketchfab.com/3d-models/spaceship-35fcc1a00a1340a295a0d7f8e8be9f1c?utm_medium=embed&utm_campaign=share-popup&utm_content=35fcc1a00a1340a295a0d7f8e8be9f1c" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;"> SpaceShip </a> by <a href="https://sketchfab.com/bainjamaing?utm_medium=embed&utm_campaign=share-popup&utm_content=35fcc1a00a1340a295a0d7f8e8be9f1c" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;"> Benjamin Aubert </a> on <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=35fcc1a00a1340a295a0d7f8e8be9f1c" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;">Sketchfab</a></p></div>}*/








// import React, { useEffect ,useRef} from 'react';
// import * as THREE from 'three';
// import spaceImage from  '../Images/space6.jpg';
// import earthimage from  "../Images/earth4.jpg";
// import sunimage from  "../Images/sun3.jpg";
// import "./Home.css"
// // import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// // import { DragControls } from 'three/addons/controls/DragControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import spaceshipModelPath from '../Images/star_war_ship.glb';
// const Home = () => {


//     // const scene = useRef(null);
//     // const camera = useRef(null);
//     // const renderer = useRef(null);
//     const scene = useRef(new THREE.Scene());
//     const camera = useRef(new THREE.PerspectiveCamera(
//         60,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//     ));
   

//     const spaceships = useRef([]);

//     useEffect(() => {
//         // Function to initialize Three.js scene
//         const initThree = () => {
//           const textureLoader = new THREE.TextureLoader();
//           const earthtexture=textureLoader.load(earthimage)
//           const suntexture=textureLoader.load(sunimage)

//           const spaceTexture = textureLoader.load(spaceImage);
//             // const scene = new THREE.Scene();

//             // const scene = useRef(new THREE.Scene());

//             // const camera = new THREE.PerspectiveCamera(
//             //     60,
//             //     window.innerWidth / window.innerHeight,
//             //     0.1,
//             //     1000
//             // );
//             const canvas = document.getElementById("homeCanvas");

//             const renderer = new THREE.WebGLRenderer({ canvas });
//             // const controls = new OrbitControls( camera, renderer.domElement );
            

//             spaceTexture.minFilter = THREE.LinearFilter; // or other filtering options
//             spaceTexture.magFilter = THREE.LinearFilter; // or other filtering options
        


           
//             // const renderer = new THREE.WebGLRenderer({ canvas });
//             // const controls = new OrbitControls( camera, renderer.domElement );
           

//             const earthgeometry = new THREE.SphereGeometry( 4, 64, 64 ); 
//             const earthmaterial = new THREE.MeshStandardMaterial( { map:earthtexture} ); 

//             const sungeometry = new THREE.SphereGeometry( 4.5,64, 64 ); 
//             const sunmaterial = new THREE.MeshBasicMaterial( { map:suntexture} );

//             //BASIC MATERIAL IS THE SOUCE OF LIGHT THROUGH WHICH POINT LIGHT IS ON THE EARTH

//             const light1 = new THREE.PointLight( 0xFAF9F6, 375);
//             light1.position.set(0, 0, 10);
//             const light2 = new THREE.PointLight( 0xFAF9F6, 375);
//             light2.position.set(0, 0, -10);
           

// //mesh standard material respond to light so we need to add light material too

//             const earth = new THREE.Mesh( earthgeometry, earthmaterial ); 
//             const sun = new THREE.Mesh( sungeometry, sunmaterial ); 


           
//             const loader = new GLTFLoader();
//     const numberOfSpaceships = 5;
//     for (let i = 0; i < numberOfSpaceships; i++) {
//       loader.load(
//         spaceshipModelPath,
//         function (glb) {
//           console.log("model loaded");
//           const spaceship = glb.scene;
//           spaceship.position.set(Math.random() * 20 - 10, Math.random() * 10 - 5, Math.random() * 10 - 5);
//           scene.current.add(spaceship)
//           spaceships.current.push(spaceship); // Store reference to the spaceship
//         },
//         undefined,
//         function (error) {
//           console.error('Error loading spaceship model:', error);
//         }
//       );
//     }

            
            
            
//             scene.current.add( earth);
//             scene.current.add( light1 );
//             scene.current.add( light2 );
//             scene.current.add(sun)
//             scene.background = spaceTexture;

//             sun.position.set(13,7,0)
//             earth.position.set(4,-7,0)
           


         
//             camera.position.z = 10;

//             // const airplaneGeometry = new THREE.BoxGeometry(1, 0.5, 0.5);
//             // const airplaneMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
//             // const airplanes = [];

//             // for (let i = 0; i < 5; i++) {
//             //     const airplane = new THREE.Mesh(airplaneGeometry, airplaneMaterial);
//             //     airplane.position.set(Math.random() * 20 - 10, Math.random() * 10 - 5, Math.random() * 10 - 5);
//             //     scene.add(airplane);
//             //     airplanes.push(airplane);
//             // }

//                              //
//                                                 //  const controls = new DragControls( airplanes, camera, renderer.domElement );

//                                                 //  // add event listener to highlight dragged objects
                                                 
//                                                 //  controls.addEventListener( 'dragstart', function ( event ) {
                                                 
//                                                 //      event.object.material.emissive.set( 0xaaaaaa );
                                                 
//                                                 //  } );
                                                 
//                                                 //  controls.addEventListener( 'dragend', function ( event ) {
                                                 
//                                                 //      event.object.material.emissive.set( 0x000000 );
                                                 
//                                                 //  } );
//                              //




            
//           function animate() {
//             requestAnimationFrame( animate );
          
//             // spaceship.forEach(airplane => {
//             //   airplane.position.x -= 0.10; // Adjust speed as needed
//             //   if (airplane.position.x < -10) {
//             //       airplane.position.x=10;
//             //   }
//             //   if (airplane.position.distanceTo(earth.position) < 2) {
//             //     airplane.position.x += 1; // Move it away from the earth
//             // }

//             // }
//             // )


//             spaceships.current.forEach(spaceship => {
//                 spaceship.position.x += Math.random() * 0.1 - 0.05; // Randomly move along x-axis
//                 spaceship.position.y += Math.random() * 0.1 - 0.05; // Randomly move along y-axis
//                 spaceship.position.z += Math.random() * 0.1 - 0.05; // Randomly move along z-axis
//               });


//             earth.rotation.z += 0.003;



            
           
            
          
//             renderer.render( scene, camera );
//           }
          
//           animate();


            
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             renderer.render(scene, camera);
//         };

//         // Call the initialization function
//         initThree();
//     }, []);

//     return (
//         <div className='home'>
//             <canvas id='homeCanvas'></canvas>

//             {/* <div className="crawl-container">
//                 <div className="crawl-content">
//                     <h1 className="crawl-text">Entrepreneurship Cell IIITP</h1>
//                     <h2 className='crawl-text'>Presents......</h2>
//                     <h1 className='crawl-text'>ONLINE TREASURE HUNT</h1>
//                 </div>
//             </div> */}

//         </div>
//     );
// }

// export default Home;



//mesh standard material respond to light so we need to add light material too


 //BASIC MATERIAL IS THE SOUCE OF LIGHT THROUGH WHICH POINT LIGHT IS ON THE EARTH


// camera.position.x = -10;
            

          //SINCE WE NEED TO GIVE ANIMATION, HENCE WE NEED A RECURSIVE FUNCTION 


 //CAMERA POSITION IS REQUIRED AS INITIALLY WE WERE CONSIDERING CAMERA INSIDE FIGURE HENCE COULD NOT SEE THE FIGURE


            //if property and value same then we can paas onnly one thing i.e instead of canvas canvas:document.get element by id






            


   
            
            import React, { useEffect, useRef,useState } from 'react';
            import * as THREE from 'three';
            
            
            
            import spaceImage from '../Images/space6.jpg';
            import earthimage from "../Images/earth4.jpg";
            import sunimage from "../Images/sun3.jpg";
            import "./Home.css";
            
            const Home = () => {
                const scene = useRef(new THREE.Scene());
                const camera = useRef(new THREE.PerspectiveCamera(
                    60,
                    window.innerWidth / window.innerHeight,
                    0.1,
                    1000
                ));
            
                const [asteroidsHit, setAsteroidsHit] = useState(0);
            
                    
            
                useEffect(() => {
                    // Function to initialize Three.js scene
                    const initThree = () => {
                        const textureLoader = new THREE.TextureLoader();
                        const earthtexture = textureLoader.load(earthimage);
                        const suntexture = textureLoader.load(sunimage);
                        const spaceTexture = textureLoader.load(spaceImage);
                        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("homeCanvas") },{antialiaa:true},);
            
            
                        renderer.setSize(window.innerWidth, window.innerHeight);
                        renderer.setPixelRatio(window.devicePixelRatio)
            
                        //important device pixel ratio important to provide smooth and high resolution texture of object
            
            
                        spaceTexture.minFilter = THREE.LinearFilter;
                        spaceTexture.magFilter = THREE.LinearFilter;
            
                        const earthgeometry = new THREE.SphereGeometry(4, 64, 64);
                        const earthmaterial = new THREE.MeshBasicMaterial({ 
                            
                            // color:0xff0000 
                         map:earthtexture
                        
                        });
            
                        const sungeometry = new THREE.SphereGeometry(4.5, 64, 64);
                        const sunmaterial = new THREE.MeshBasicMaterial({ map: suntexture });
            
                   
            
                        const light1 = new THREE.PointLight(0xffffff, 1); // Adjust light color and intensity
                        light1.position.set(4, -7, 0); // Position light to focus on Earth
                        const light2 = new THREE.AmbientLight(0xffffff); 
            
            
                        const earth = new THREE.Mesh(earthgeometry, earthmaterial);
                        const sun = new THREE.Mesh(sungeometry, sunmaterial);
            
                        // Set positions only after objects are created
                        sun.position.set(11, 7, 0);
                        earth.position.set(4, -7, 0);
            
            
                    
            
                        scene.current.add(earth);
                        scene.current.add(light1);
                        scene.current.add(light2);
                        scene.current.add(sun);
                        scene.current.background = spaceTexture;
            
                        camera.current.position.z = 10;
                        const ambientLight = new THREE.AmbientLight(0x202020); // Decreased intensity
                        scene.current.add(ambientLight);
            
                       
            
            
            
                        function animate() {
                            requestAnimationFrame(animate);
            
                        
            
                            earth.rotation.y += 0.003;
            
                            renderer.render(scene.current, camera.current);
                        }
            
                        animate();
            
                        renderer.setSize(window.innerWidth, window.innerHeight);
                        renderer.render(scene.current, camera.current);
                    };
            
                    // Call the initialization function
                    initThree();
                }, []);
                
            
                const handleHitAsteroid = () => {
                    setAsteroidsHit(prevCount => prevCount + 1);
                };
            
                return (
                    <div className='home'>
                        <div className="counter">Asteroids Hit: {asteroidsHit}</div>
                        <canvas id='homeCanvas'>
            
                           
            
                        </canvas>
            
            
                       
                    </div>
                );
            }
            
            export default Home;