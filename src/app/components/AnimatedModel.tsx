import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";

const AnimatedModel = forwardRef((props, ref) => {
    const model = useGLTF("/models/train.glb"); 
    const { scene, animations } = model;
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);

    useImperativeHandle(ref, () => ({
        getPosition: () => {
            const position = new THREE.Vector3();
            scene.getWorldPosition(position);
            return position;
        }
    }));

    useEffect(() => {
        if (animations.length > 0) {
            mixerRef.current = new THREE.AnimationMixer(scene);
            const action = mixerRef.current.clipAction(animations[0]); 
            action.loop = THREE.LoopRepeat; 
            action.play();
        }
    }, [animations, scene]);

    useFrame((_, delta) => {
        mixerRef.current?.update(delta);
    });

    return <primitive object={scene} rotation={[0, 0, 0]} scale={1.5} />;
});

useGLTF.preload("/models/train.glb");

export default AnimatedModel;