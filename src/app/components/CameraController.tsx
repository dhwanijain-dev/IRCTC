
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useMousePosition } from './MousePositionProvider';

const CameraController = () => {

    const mousePosition = useMousePosition();

    // Leva UI controls for camera position, rotation, and look-at target
    const { x, y, z, rotX, rotY, rotZ, lookAtX, lookAtY, lookAtZ } = useControls("Camera Controls", {
        x: { value: 53.8, min: -10, max: 100, step: 0.1 },
        y: { value: 50.3, min: -10, max: 100, step: 0.1 },
        z: { value: -10, min: -10, max: 200, step: 0.1 },
        rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        lookAtX: { value: -100, min: -100, max: 100, step: 0.1 },
        lookAtY: { value: 41, min: -100, max: 100, step: 0.1 },
        lookAtZ: { value: -90, min: -100, max: 100, step: 0.1 },
    });

    useFrame(({ camera }) => {
        const parallaxX = (mousePosition.x / window.innerWidth - 0.5) * 2;
        const parallaxY = (mousePosition.y / window.innerHeight - 0.5) * 2;
        camera.position.set(x + parallaxX * 5, y + parallaxY * 5, z);
        camera.rotation.set(rotX, rotY, rotZ);
        camera.lookAt(lookAtX, lookAtY, lookAtZ);
    });

    return null;
};

export default CameraController;