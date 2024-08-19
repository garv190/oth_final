



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