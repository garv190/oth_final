// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import spaceImage from '../Images/space6.jpg';
// import earthimage from "../Images/earth4.jpg";
// import sunimage from "../Images/sun3.jpg";
// import asteroidimage from "../Images/asteroid.jpg"; // Import the asteroid texture image
// import "./Home.css";

// const Home = () => {
//     const scene = useRef(new THREE.Scene());
//     const camera = useRef(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000));
//     const gunPointer = useRef(); // Ref for gun pointer

//     const [bullets, setBullets] = useState([]);
//     const [asteroids, setAsteroids] = useState([]);

//     useEffect(() => {
//         const textureLoader = new THREE.TextureLoader();
//         const earthtexture = textureLoader.load(earthimage);
//         const suntexture = textureLoader.load(sunimage);
//         const spaceTexture = textureLoader.load(spaceImage);
//         const asteroidTexture = textureLoader.load(asteroidimage); // Load the asteroid texture image
        
//         const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("homeCanvas") });

//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(window.devicePixelRatio);

//         spaceTexture.minFilter = THREE.LinearFilter;
//         spaceTexture.magFilter = THREE.LinearFilter;

//         const earthgeometry = new THREE.SphereGeometry(4, 64, 64);
//         const earthmaterial = new THREE.MeshBasicMaterial({ map: earthtexture });

//         const sungeometry = new THREE.SphereGeometry(4.5, 64, 64);
//         const sunmaterial = new THREE.MeshBasicMaterial({ map: suntexture });

//         const light1 = new THREE.PointLight(0xffffff, 1);
//         light1.position.set(4, -7, 0);
//         const light2 = new THREE.AmbientLight(0xffffff);

//         const earth = new THREE.Mesh(earthgeometry, earthmaterial);
//         const sun = new THREE.Mesh(sungeometry, sunmaterial);

//         sun.position.set(11, 7, 0);
//         earth.position.set(4, -7, 0);

//         scene.current.add(earth);
//         scene.current.add(light1);
//         scene.current.add(light2);
//         scene.current.add(sun);
//         scene.current.background = spaceTexture;

//         camera.current.position.z = 10;
//         const ambientLight = new THREE.AmbientLight(0x202020);
//         scene.current.add(ambientLight);

//         // Create the gun pointer object
//         const pointerGeometry = new THREE.BoxGeometry(0.1, 0.1, 1);
//         const pointerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//         const pointerMesh = new THREE.Mesh(pointerGeometry, pointerMaterial);
//         pointerMesh.position.set(0, 0, -5);

//         // Create a group to contain the pointer mesh
//         const pointerGroup = new THREE.Group();
//         pointerGroup.add(pointerMesh);

//         // Add the pointer group to the scene
//         scene.current.add(pointerGroup);

//         // Assign the pointer group to the gunPointer ref
//         gunPointer.current = pointerGroup;

//         // Start creating asteroids
//         createAsteroids(asteroidTexture); // Pass the asteroid texture to the createAsteroids function

//         function animate() {
//             requestAnimationFrame(animate);
//             updateBullets();
//             updateAsteroids();
//             renderer.render(scene.current, camera.current);
//             earth.rotation.y += 0.003;
//         }

//         animate();

//         // Clean up function to remove event listener
//         return () => {
//             window.removeEventListener('mousemove', onMouseMove);
//         };
//     }, []);

//     const shootBullet = () => {
//         if (gunPointer.current) {
//             const bullet = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
//             bullet.position.copy(gunPointer.current.position);
//             bullet.userData.velocity = new THREE.Vector3(0, 0, -0.1); // Adjust bullet speed
//             scene.current.add(bullet);
//             setBullets(prevBullets => [...prevBullets, bullet]);
//         } else {
//             console.error("Gun pointer reference is not properly initialized.");
//         }
//     };

//     const updateBullets = () => {
//         setBullets(prevBullets => {
//             const newBullets = prevBullets.filter(bullet => bullet.position.z > -100); // Remove bullets that go too far
//             newBullets.forEach(bullet => {
//                 bullet.position.add(bullet.userData.velocity);
//                 checkBulletCollision(bullet);
//             });
//             return newBullets;
//         });
//     };

//     const createAsteroids = (asteroidTexture) => { // Receive the asteroid texture as a parameter
//         const numAsteroids = 5; // Initial number of asteroids
//         for (let i = 0; i < numAsteroids; i++) {
//             const asteroid = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), new THREE.MeshBasicMaterial({ map: asteroidTexture })); // Apply the texture to the asteroid material
//             asteroid.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * -100);
//             scene.current.add(asteroid);
//             setAsteroids(prevAsteroids => [...prevAsteroids, asteroid]);
//         }

//         // Add new asteroids at regular intervals
//         setInterval(() => {
//             const asteroid = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), new THREE.MeshBasicMaterial({ map: asteroidTexture })); // Apply the texture to the asteroid material
//             asteroid.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * -100);
//             scene.current.add(asteroid);
//             setAsteroids(prevAsteroids => [...prevAsteroids, asteroid]);
//         }, 2000); // Adjust the interval time as needed (in milliseconds)
//     };

//     const updateAsteroids = () => {
//         setAsteroids(prevAsteroids => {
//             return prevAsteroids.map(asteroid => {
//                 asteroid.position.z += Math.random() * 0.05; // Move asteroid randomly
//                 return asteroid;
//             });
//         });
//     };

//     const checkBulletCollision = bullet => {
//         setAsteroids(prevAsteroids => {
//             return prevAsteroids.filter(asteroid => {
//                 const distance = bullet.position.distanceTo(asteroid.position);
//                 if (distance < 1) {
//                     scene.current.remove(bullet);
//                     return false; // Remove asteroid
//                 }
//                 return true; // Keep asteroid
//             });
//         });
//     };

//     const onMouseMove = (event) => {
//         if (gunPointer.current) {
//             const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
//             const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

//             const raycaster = new THREE.Raycaster();
//             raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera.current);

//             const intersects = raycaster.intersectObjects(asteroids);

//             if (intersects.length > 0) {
//                 const intersection = intersects[0];
//                 const asteroid = intersection.object;

//                 // Move asteroid in x or y direction
//                 const randomDirection = Math.random() > 0.5 ? 1 : -1;
//                 const moveAmount = randomDirection * 0.1; // Adjust the amount of movement
//                 asteroid.position.x += moveAmount;
//                 asteroid.position.y += moveAmount;
//             }

//             gunPointer.current.position.x = mouseX * 5;
//             gunPointer.current.position.y = mouseY * 5;
//         }
//     };

//     // Add event listener for mouse move
//     useEffect(() => {
//         window.addEventListener('mousemove', onMouseMove);
//         return () => {
//             window.removeEventListener('mousemove', onMouseMove);
//         };
//     }, []);

//     return (
//         <div className='home'>
//             <canvas id='homeCanvas'></canvas>
//             <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
//                 <button onClick={shootBullet}>Shoot</button>
//             </div>
//         </div>
//     );
// }

// export default Home;


import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import spaceImage from '../Images/space6.jpg';
import earthimage from "../Images/earth4.jpg";
import sunimage from "../Images/sun3.jpg";
import asteroidimage from "../Images/asteroid.jpg"; // Import the asteroid texture image
import Heading from '../Heading/Heading';
import "./Home.css";

const Home = () => {
    const scene = useRef(new THREE.Scene());
    const camera = useRef(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000));
    const gunPointer = useRef(); // Ref for gun pointer

    const [bullets, setBullets] = useState([]);
    const [asteroids, setAsteroids] = useState([]);

    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();
        const earthtexture = textureLoader.load(earthimage);
        const suntexture = textureLoader.load(sunimage);
        const spaceTexture = textureLoader.load(spaceImage);
        const asteroidTexture = textureLoader.load(asteroidimage); // Load the asteroid texture image
        
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("homeCanvas") });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        spaceTexture.minFilter = THREE.LinearFilter;
        spaceTexture.magFilter = THREE.LinearFilter;

        const earthgeometry = new THREE.SphereGeometry(4, 64, 64);
        const earthmaterial = new THREE.MeshBasicMaterial({ map: earthtexture });

        const sungeometry = new THREE.SphereGeometry(4.5, 64, 64);
        const sunmaterial = new THREE.MeshBasicMaterial({ map: suntexture });

        const light1 = new THREE.PointLight(0xffffff, 1);
        light1.position.set(4, -7, 0);
        const light2 = new THREE.AmbientLight(0xffffff);

        const earth = new THREE.Mesh(earthgeometry, earthmaterial);
        const sun = new THREE.Mesh(sungeometry, sunmaterial);

        sun.position.set(11, 7, 0);
        earth.position.set(4, -7, 0);

        scene.current.add(earth);
        scene.current.add(light1);
        scene.current.add(light2);
        scene.current.add(sun);
        scene.current.background = spaceTexture;

        camera.current.position.z = 10;
        const ambientLight = new THREE.AmbientLight(0x202020);
        scene.current.add(ambientLight);

        // Create the gun pointer object
        const pointerGeometry = new THREE.BoxGeometry(0.1, 0.1, 1);
        const pointerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const pointerMesh = new THREE.Mesh(pointerGeometry, pointerMaterial);
        pointerMesh.position.set(0, 0, -5);

        // Create a group to contain the pointer mesh
        const pointerGroup = new THREE.Group();
        pointerGroup.add(pointerMesh);

        // Add the pointer group to the scene
        scene.current.add(pointerGroup);

        // Assign the pointer group to the gunPointer ref
        gunPointer.current = pointerGroup;

        // Start creating asteroids
        createAsteroids(asteroidTexture); // Pass the asteroid texture to the createAsteroids function

        function animate() {
            requestAnimationFrame(animate);
            updateBullets();
            updateAsteroids();
            renderer.render(scene.current, camera.current);
            earth.rotation.y += 0.003;
        }

        animate();

        // Clean up function to remove event listener
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', shootOnMouseClick);
            window.removeEventListener('keydown', shootOnSpacebarPress);
        };
    }, []);

    const shootOnMouseClick = () => {
        shootBullet();
    };

    const shootOnSpacebarPress = (event) => {
        if (event.code === 'Space') {
            shootBullet();
        }
    };

    const shootBullet = () => {
        if (gunPointer.current) {
            const bullet = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
            bullet.position.copy(gunPointer.current.position);
            bullet.userData.velocity = new THREE.Vector3(0, 0, -0.1); // Adjust bullet speed
            scene.current.add(bullet);
            setBullets(prevBullets => [...prevBullets, bullet]);
        } else {
            console.error("Gun pointer reference is not properly initialized.");
        }
    };

    const updateBullets = () => {
        setBullets(prevBullets => {
            const newBullets = prevBullets.filter(bullet => bullet.position.z > -100); // Remove bullets that go too far
            newBullets.forEach(bullet => {
                bullet.position.add(bullet.userData.velocity);
                checkBulletCollision(bullet);
            });
            return newBullets;
        });
    };

    const createAsteroids = (asteroidTexture) => { // Receive the asteroid texture as a parameter
        const numAsteroids = 5; // Initial number of asteroids
        for (let i = 0; i < numAsteroids; i++) {
            const asteroid = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), new THREE.MeshBasicMaterial({ map: asteroidTexture })); // Apply the texture to the asteroid material
            asteroid.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * -100);
            scene.current.add(asteroid);
            setAsteroids(prevAsteroids => [...prevAsteroids, asteroid]);
        }

        // Add new asteroids at regular intervals
        setInterval(() => {
            const asteroid = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), new THREE.MeshBasicMaterial({ map: asteroidTexture })); // Apply the texture to the asteroid material
            asteroid.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * -100);
            scene.current.add(asteroid);
            setAsteroids(prevAsteroids => [...prevAsteroids, asteroid]);
        }, 2000); // Adjust the interval time as needed (in milliseconds)
    };

    const updateAsteroids = () => {
        setAsteroids(prevAsteroids => {
            return prevAsteroids.map(asteroid => {
                asteroid.position.z += Math.random() * 0.05; // Move asteroid randomly
                return asteroid;
            });
        });
    };

    const checkBulletCollision = bullet => {
        setAsteroids(prevAsteroids => {
            return prevAsteroids.filter(asteroid => {
                const distance = bullet.position.distanceTo(asteroid.position);
                if (distance < 1) {
                    scene.current.remove(bullet);
                    scene.current.remove(asteroid); // Remove the asteroid
                    return false; // Remove asteroid from the array
                }
                return true; // Keep asteroid
            });
        });
    };
    

    const onMouseMove = (event) => {
        if (gunPointer.current) {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera.current);

            const intersects = raycaster.intersectObjects(asteroids);

            if (intersects.length > 0) {
                const intersection = intersects[0];
                const asteroid = intersection.object;

                // Move asteroid in x or y direction
                const randomDirection = Math.random() > 0.5 ? 1 : -1;
                const moveAmount = randomDirection * 0.1; // Adjust the amount of movement
                asteroid.position.x += moveAmount;
                asteroid.position.y += moveAmount;
            }

            gunPointer.current.position.x = mouseX * 15;
            gunPointer.current.position.y = mouseY * 15;
        }
    };
   


    // Add event listener for mouse move
    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', shootOnMouseClick);
        window.addEventListener('keydown', shootOnSpacebarPress);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', shootOnMouseClick);
            window.removeEventListener('keydown', shootOnSpacebarPress);
        };
    }, []);

    return (
        <div className='home'>
            <Heading/>
            <canvas id='homeCanvas'></canvas>
        </div>
    );
}

export default Home;