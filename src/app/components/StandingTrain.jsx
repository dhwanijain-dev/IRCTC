"use client"
import { useGLTF } from "@react-three/drei";
import {  forwardRef,useEffect  } from "react";
import * as THREE from 'three'
const StandingTrain = forwardRef((props, ref) => {
    const model = useGLTF("/models/trainModel.glb"); 
    const { scene } = model;

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ color: child.material.color });
            }
        });
    }, [scene]);
    return <primitive object={scene} rotation={[0, 0, 0]} scale={1.5} />;
});

useGLTF.preload("/models/trainModel.glb");

export default StandingTrain;