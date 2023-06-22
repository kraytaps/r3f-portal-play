import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { Color, DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Grass() {
    const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/grass.glb');

    useEffect(() => {
        if (!gltf) return;
        
        console.log(gltf.scene.children[0]);

        const grassMat = gltf.scene.children[0].material
        grassMat.alphaToCoverage = true;
        grassMat.map = gltf.scene.children[0].material.emissiveMap;
        grassMat.emissive = new Color(0.5, 0.5, 0.5);
        grassMat.side = DoubleSide;

    }, [gltf]);
    return (
        
        <primitive object={gltf.scene}/>
    )
}