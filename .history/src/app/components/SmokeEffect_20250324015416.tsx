"use client"
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SmokeEffectProps {
    position: [number, number, number];
}

interface Particle {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    life: number;
    opacity: number;
}

export default function SmokeEffect({ position }: SmokeEffectProps) {
    const count = 100; // Number of smoke particles
    const meshRef = useRef<THREE.InstancedMesh>(null);

    // Store particle data in an array
    const particles: Particle[] = useMemo(() => {
        return new Array(count).fill(null).map(() => ({
            position: new THREE.Vector3(0, 0, 0),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.2,
                0.5 + Math.random() * 0.3,
                (Math.random() - 0.5) * 0.2
            ),
            life: Math.random() * 1.5, // Random lifespan
            opacity: 1,
        }));
    }, [count]);

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        const temp = new THREE.Object3D();

        particles.forEach((p, i) => {
            p.position.addScaledVector(p.velocity, delta);
            p.life -= delta;
            p.opacity = Math.max(p.life / 1.5, 0); // Fades out over time

            // Reset particle when it fades out
            if (p.life <= 0) {
                p.position.set(position[0], position[1], position[2]);
                p.velocity.set(
                    (Math.random() - 0.5) * 5,
                    0.5 + Math.random() * 8,
                    (Math.random() - 0.5) * 5
                );
                p.life = Math.random() * 1.5;
                p.opacity = 1;
            }

            temp.position.copy(p.position);
            temp.updateMatrix();
            meshRef.current!.setMatrixAt(i, temp.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[5, 16, 16]} />
            <meshStandardMaterial transparent opacity={0.5} color="gray" />
        </instancedMesh>
    );
}